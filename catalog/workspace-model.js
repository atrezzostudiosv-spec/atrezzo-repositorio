// Discovery metadata only. Never modifies the registry or a component.
export const categories=[['heroes','Heroes'],['navigation','Navegación'],['galleries','Galerías y portfolios'],['scroll','Scroll & Sticky'],['type','Tipografía'],['services','Servicios y composiciones'],['cards','Tarjetas'],['micro','Microinteracciones'],['ui','Elementos funcionales'],['transitions','Transiciones']];
export const collectionNames={atrezzo:'ATREZZO',codrops:'Codrops',trionn:'TRIONN','gsap-vault':'GSAP Vault'};
export function collection(e){return e.source_collection||(String(e.family).startsWith('codrops-')?'codrops':'atrezzo')}
export function collectionName(e){const c=collection(e);return collectionNames[c]||c}
const groupMap={heroes:['heroes'],navegacion:['navigation'],galerias:['galleries'],sticky:['scroll','cards'],narrativa:['scroll'],tipografia:['type'],servicios:['services'],microinteracciones:['micro'],transiciones:['transitions'],'transiciones-paginas':['transitions'],'transiciones-creativas':['transitions']};
const overrides={'ATZ-SEC-010':['galleries','scroll'],'ATZ-SEC-011':['galleries','micro'],'ATZ-SEC-012':['galleries','scroll'],'ATZ-SEC-013':['scroll','galleries'],'ATZ-SEC-014':['transitions'],'ATZ-GSV-001':['heroes','micro'],'ATZ-GSV-002':['cards','galleries'],'ATZ-GSV-003':['galleries','scroll'],'ATZ-GSV-004':['micro','navigation'],'ATZ-GSV-005':['ui'],'ATZ-GSV-006':['ui'],'ATZ-GSV-007':['navigation','scroll'],'ATZ-GSV-008':['ui'],'ATZ-GSV-009':['ui'],'ATZ-GSV-010':['ui','navigation']};
export function categoryIds(e){const v=e.visual||{}, ids=new Set(overrides[e.id]||groupMap[e.discovery_group]||[]);if(v.views?.includes('Heroes'))ids.add('heroes');if(v.views?.includes('Galerías y proyectos'))ids.add('galleries');if(v.views?.includes('Elementos funcionales'))ids.add('ui');if(v.views?.includes('Experiencias de scroll'))ids.add('scroll');if(!ids.size)ids.add('ui');return [...ids]}
export const normalize=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const synonymGroups=[
 ['imagen','imagenes','foto','fotos','fotografia','fotografias','image','images','photo','photos','picture'],
 ['flotar','flota','flotan','flotante','flotacion','floating','float','levitar','suspendidas'],
 ['juntar','junta','juntan','unir','unen','converge','convergente','convergencia','convergen','agrupar','agrupan','merge','assemble'],
 ['expandir','expande','expanden','expansion','expand','crece','crecen','agrandar','ampliar','scale','zoom'],
 ['revelar','revelado','revela','revelan','reveal','aparicion','aparece','mostrar','descubrir'],
 ['scroll','desplazamiento','desplazar','bajar','subir','scrollear','scrolling','desplazarse'],
 ['texto','textos','text','tipografia','typography','letras','titular','titulares','headline'],
 ['tarjeta','tarjetas','card','cards','flipcard'],
 ['giro','giran','gira','rotacion','rotation','rotate','flip','voltear'],
 ['menu','menus','navigation','navegacion','navbar','header','cabecera'],
 ['boton','botones','button','buttons','cta'],
 ['raton','mouse','cursor','puntero','hover','sobrevolar','foco'],
 ['preguntas','pregunta','faq','acordeon','accordion'],
 ['pestanas','pestana','tabs','tab'],
 ['carga','loader','loading','skeleton','preloader'],
 ['fondo','fondos','background','backgrounds'],
 ['mascara','mascaras','mask','clip','recorte'],
 ['galeria','galerias','gallery','portfolio','portfolios','proyectos','projects'],
 ['profundidad','depth','3d','tridimensional','perspectiva'],
 ['transicion','transiciones','transition','transitions'],
 ['pasos','paso','stepper','step','steps','etapas'],
 ['progreso','progress','avance','indicador'],
 ['anuncio','anuncios','announcement','banner','aviso'],
 ['linea','lineas','underline','subrayado','subrayar'],
 ['luz','luces','lighting','spotlight','focos','iluminacion'],
 ['servicio','servicios','service','services','bento'],
 ['onda','ondas','wave','waves','ondulacion']
];
const aliases=new Map(synonymGroups.flatMap(g=>g.map(x=>[x,g[0]])));
const stop=new Set('que se de al en el la los las un una unos unas por y o con para del a al hacer como cuando donde quiero busco necesito efecto efectos animacion animaciones componente componentes the a an of for with on and to when'.split(' '));
const tokens=s=>normalize(s).match(/[\p{L}\p{N}-]+/gu)||[];
const words=s=>tokens(s).filter(w=>!stop.has(w)).map(w=>aliases.get(w)||w);
const set=s=>new Set(words(s));
const cache=new WeakMap();
function fields(e){if(cache.has(e))return cache.get(e);const v=e.visual||{}, cats=categoryIds(e).map(id=>categories.find(x=>x[0]===id)?.[1]||id),primary=[e.title,e.variant,e.id,collectionName(e)].join(' '),secondary=[e.description,e.discovery_trigger,...(e.discovery_tags||[]),...(v.search_aliases||[]),...cats].join(' '),context=[e.recommended_for,...(v.roles||[]),...(v.styles||[]),...(v.views||[]),...(v.industries||[])].join(' ');const f={primary:set(primary),secondary:set(secondary),context:set(context),literal:normalize(primary+' '+secondary+' '+context)};cache.set(e,f);return f}
export function searchScore(e,q){const raw=normalize(q).trim();if(!raw)return 1;if(/^atz-[a-z]{3}-\d{3}$/.test(raw))return normalize(e.id)===raw?1000:0;const ws=[...new Set(words(q))];if(!ws.length)return 1;const f=fields(e);let found=0,score=0;for(const w of ws){let weight=f.primary.has(w)?12:f.secondary.has(w)?6:f.context.has(w)?2:0;if(!weight&&w.length>=4&&f.literal.includes(w))weight=2;if(weight){found++;score+=weight}}const coverage=found/ws.length;if(!found||coverage<(ws.length<=2?1:.6))return 0;return Math.round(coverage*100)+score+(normalize(e.title).includes(raw)?40:0)+(normalize(e.id).includes(raw)?50:0)}
export function sortItems(items,sort,query,recent){const ordered=[...items];if(sort==='name')return ordered.sort((a,b)=>a.title.localeCompare(b.title,'es')||a.id.localeCompare(b.id));if(sort==='id')return ordered.sort((a,b)=>a.id.localeCompare(b.id));if(sort==='recent')return ordered.sort((a,b)=>(recent.get(b.id)||0)-(recent.get(a.id)||0));if(sort==='last')return ordered.reverse();if(query.trim())return ordered.sort((a,b)=>searchScore(b,query)-searchScore(a,query));return ordered}
