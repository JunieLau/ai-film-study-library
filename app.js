'use strict';
const L={
zh:{skip:'跳至学习目录',eyebrow:'独立学习索引',dek:'把 JBOOGXCREATIVE 的教程、工作流与技能资源整理成一份随时能查的学习目录。',browse:'浏览目录',creator:'原作者 Patreon',indexCount:'已索引 Patreon 帖子',skillCount:'可识别技能条目',doneCount:'此设备已学',collection:'学习资料库',library:'学习目录',labNote:'循原始出处学习。会员内容须在 Patreon 登录并以你的会员权益为准。',allLessons:'全部条目',skills:'Skills 技能',completed:'已学',searchLabel:'搜索目录',search:'搜索标题、技能或工具',categoryLabel:'内容类别',accessLabel:'访问权限',allCategories:'全部类别',allAccess:'所有访问状态',clear:'清除筛选',sourceNote:'来源说明',coverage:'核验范围',resourceList:'原始索引与合集',loading:'正在载入已核实的目录…',missing:'目录文件暂时无法读取，请稍后再试。',empty:'没有符合当前条件的条目。',doneEmpty:'当前没有符合条件的已学条目。',notAffiliated:'独立学习索引，非官方 Patreon 网站。',public:'公开可看',member:'会员内容',unverified:'访问待核实',view:'打开原帖',viewMember:'去 Patreon 查看会员帖',viewUnverified:'查看原帖权限',mark:'标为已学',undo:'✓ 已学',linkedSkills:'关联技能',sourcePost:'出处',noCover:'未核实原封面',feature:'精选封面',resource:'查看官方资料',original:'原始发布',update:'更新发布',overview:'公开简介',skillNoFile:'原帖未核实有独立可下载的技能文件。',summaryMissing:'当前仅索引标题和出处；未编写未经核实的摘要。',coverageDefault:'目录仅索引经核实可见的公开元数据，并链接到 Patreon 原帖；不镜像课程、文件或会员正文。页面标为待核实的访问状态以 Patreon 原帖为准。',viewing:'显示',results:'条',privacy:'学习进度仅保存在当前浏览器，不会上传。'},
en:{skip:'Skip to learning index',eyebrow:'Independent study index',dek:'A searchable index of JBOOGXCREATIVE tutorials, workflows and skills, with links to the original Patreon posts.',browse:'Browse the index',creator:'Creator on Patreon',indexCount:'Patreon posts indexed',skillCount:'Identifiable skill entries',doneCount:'Completed on this device',collection:'The study library',library:'Learning library',labNote:'Learn from the originals. Member posts are available on Patreon according to your account and membership.',allLessons:'All entries',skills:'Skills',completed:'Completed',searchLabel:'Search the index',search:'Search titles, skills or tools',categoryLabel:'Category',accessLabel:'Access',allCategories:'All categories',allAccess:'All access states',clear:'Clear filters',sourceNote:'About the sources',coverage:'What was verified',resourceList:'Source indexes and collections',loading:'Loading the verified index…',missing:'The catalog could not be loaded. Please try again later.',empty:'No entries match these filters.',doneEmpty:'There are no matching completed entries.',notAffiliated:'Independent learning index. Not an official Patreon site.',public:'Public',member:'Members',unverified:'Access unverified',view:'Open original post',viewMember:'Open member post on Patreon',viewUnverified:'Check access on Patreon',mark:'Mark complete',undo:'✓ Completed',linkedSkills:'Related skills',sourcePost:'Source',noCover:'Original cover not verified',feature:'Featured cover',resource:'View official resource',original:'Original release',update:'Updated release',overview:'Public overview',skillNoFile:'No separate downloadable skill file was verified in the original post.',summaryMissing:'Title and source only. An unverified summary has not been added.',coverageDefault:'The index lists verified visible metadata and links to the original Patreon posts. It does not mirror lessons, files or members-only text. Check the original Patreon page where access could not be verified.',viewing:'Showing',results:'entries',privacy:'Your study progress is stored only in this browser.'}};
const CAT={
 image:['图像','Image'],video:['视频','Video'],general:['综合','General'],prompts:['提示词','Prompting'],prompt:['提示词','Prompting'],workflow:['工作流','Workflow'],tool:['工具','Tools'],tools:['工具','Tools'],asset:['素材','Assets'],assets:['素材','Assets'],series:['系列课程','Series'],skill:['技能','Skills'],skills:['技能','Skills'],editing:['剪辑','Editing'],automation:['自动化','Automation'],audio:['声音','Audio'],business:['创意商业','Creative business'],community:['社群','Community'],update:['动态','Updates'],other:['其他','Other'],design:['设计','Design'],creative:['创意','Creative'],tutorial:['教程','Tutorials'],templates:['模板','Templates'],motion:['动态设计','Motion'],interview:['访谈','Interviews'],breakdown:['制作拆解','Breakdowns'],case:['案例','Case studies'],guide:['指南','Guides'],filmmaking:['影视制作','Filmmaking'],branding:['品牌视觉','Branding'],characters:['角色','Characters'],style:['风格','Style'],lighting:['灯光','Lighting'],uncategorized:['待分类','Uncategorized']
};
const SRC={
 patreon:{file:'catalog.json',title:'JBOOGXCREATIVE / PATREON',dek:['把 JBOOGXCREATIVE 的教程、工作流与技能资源整理成一份随时能查的学习目录。','A searchable index of JBOOGXCREATIVE tutorials, workflows and skills, with links to the original Patreon posts.'],count:['已索引 Patreon 帖子','Patreon posts indexed'],profile:['原作者 Patreon','Creator on Patreon']},
 higgsfield:{file:'higgsfield.json',title:'HIGGSFIELD',dek:['找到 Higgsfield 的制作拆解、工具示范和课程；沿着原始链接继续学习。','Find Higgsfield production breakdowns, demonstrations and tutorials, with direct links to the originals.'],count:['已索引 Higgsfield 条目','Higgsfield entries indexed'],profile:['Higgsfield 原始频道','Original Higgsfield channel']},
 pjace:{file:'pjace.json?v=pj-followup-1',title:'PJ ACE',dek:['查找 PJ Ace 的 AI 影像与创作教程；按主题筛选，打开原视频或教程。','Browse PJ Ace’s creative AI and filmmaking tutorials by topic and open the original lessons.'],count:['已索引 PJ Ace 条目','PJ Ace entries indexed'],profile:['PJ Ace 原始频道','Original PJ Ace channel']}
};
function route(){const s=new URL(location.href).searchParams.get('source');return Object.hasOwn(SRC,s)?s:'patreon'}
const q=s=>document.querySelector(s);
const qa=s=>[...document.querySelectorAll(s)];
const make=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt)e.textContent=txt;return e};
const pick=(...v)=>v.find(x=>typeof x==='string'&&x.trim())?.trim()||'';
const translate=(zh,en)=>state.lang==='zh'?zh:state.lang==='en'?en:zh===en?zh:zh+' / '+en;
const T=k=>translate(L.zh[k]||k,L.en[k]||k);
const read=(k,f)=>{try{return JSON.parse(localStorage.getItem('jboog-index:'+k))??f}catch{return f}};
const put=(k,v)=>{try{localStorage.setItem('jboog-index:'+k,JSON.stringify(v))}catch{}};
const first=read('lang','zh');
const doneSaved=read('done',[]);
const state={section:route(),seq:0,lang:['zh','en','both'].includes(first)?first:'zh',tab:'all',query:'',cat:'',access:'',entries:[],skillEntries:[],done:new Set(Array.isArray(doneSaved)?doneSaved.filter(x=>typeof x==='string'):[]),loading:true,error:false,site:{}};
function sourceURL(raw){
 try{const u=new URL(raw);return u.protocol==='https:'&&!u.username&&!u.password?u.href:''}catch{return ''}
}
function imageURL(raw){
 if(typeof raw!=='string')return '';
 const v=raw.trim();
 if(/^(?:\.\/)?(?:images|assets|covers|media)\/[a-zA-Z0-9_./%-]+$/i.test(v)&&!v.split('/').some(x=>x==='..')&&!/%2e|%2f|%5c/i.test(v))return v;
 return sourceURL(v);
}
function patreonURL(raw){
 const v=sourceURL(raw);
 if(!v)return '';
 const h=new URL(v).hostname.toLowerCase();
 return h==='patreon.com'||h.endsWith('.patreon.com')?v:'';
}
const field=(o,k,x)=>pick(o?.[k+(x==='en'?'En':'Zh')],o?.[k+(x==='en'?'_en':'_zh')],o?.[k]?.[x],typeof o?.[k]==='string'?o[k]:'');
function dual(el,zh,en){
 const prim=state.lang==='en'?pick(en,zh):pick(zh,en);
 el.textContent=prim;
 if(state.lang==='both'&&zh&&en&&zh!==en){const other=make('span','secondary',en);other.lang='en';el.append(other)}
}
function categoryLabel(k){
 const native=CAT[k];
 if(native)return translate(...native);
 return k.split(/[-_/]/).filter(Boolean).map(x=>x.charAt(0).toUpperCase()+x.slice(1)).join(' ');
}
function accessToken(x){
 x=String(x||'').toLowerCase().replaceAll('_','-');
 if(['public','free','open','free-public'].includes(x))return'public';
 if(['member','members','member-only','members-only','locked','paid','patron','paid-member','patron-only'].includes(x))return'member';
 return'unverified';
}
function startEntry(o,i){
 if(!o||typeof o!=='object')return null;
 const validate=state.section==='patreon'?patreonURL:sourceURL;
 const url=validate(pick(o.url,o.originalUrl,o.original_url,o.canonicalUrl,o.patreonUrl,o.href,o.videoUrl,o.sourceUrl));
 const en=field(o,'title','en'),zh=field(o,'title','zh');
 if(!url||(!en&&!zh))return null;
 const solid=String(o.id??new URL(url).pathname??i).replace(/[^A-Za-z0-9._/-]/g,'-');
 return {id:state.section+':post:'+solid,titleEn:en,titleZh:zh,url,category:pick(o.category,o.categorySlug,o.type,'uncategorized').toLowerCase(),access:accessToken(o.access??o.accessStatus??o.visibility),date:pick(o.date,o.publishedAt,o.published_at),summaryEn:field(o,'summary','en'),summaryZh:field(o,'summary','zh'),image:imageURL(pick(o.imageUrl,o.image_url,o.coverUrl,o.cover_url,o.thumbnailUrl,o.thumbnail,o.image?.url)),imageKind:o.imageKind,imageAltZh:field(o,'imageAlt','zh'),imageAltEn:field(o,'imageAlt','en'),tags:Array.isArray(o.tags)?o.tags.filter(t=>typeof t==='string').slice(0,10):[],skills:Array.isArray(o.skills)?o.skills:[],aliases:Array.isArray(o.titleAliases)?o.titleAliases:[],resources:Array.isArray(o.resources)?o.resources:[],isSkill:false};
}
function skillCover(s,parent){
 const image=imageURL(pick(s.imageUrl,s.image_url,s.coverUrl,s.thumbnailUrl,s.image?.url));
 if(!image&&state.section==='pjace'&&parent.image) return {image:parent.image,imageKind:parent.imageKind==='illustration'?'illustration':'related',imageAltZh:parent.imageAltZh,imageAltEn:parent.imageAltEn};
 return {image,imageKind:s.imageKind,imageAltZh:field(s,'imageAlt','zh'),imageAltEn:field(s,'imageAlt','en')};
}
function startSkill(s,parent,i){
 if(!s)return null;
 if(typeof s==='string')s={label:s};
 const en=pick(field(s,'title','en'),field(s,'label','en'),s.name),zh=pick(field(s,'title','zh'),field(s,'label','zh'));
 if(!en&&!zh)return null;
 return {id:parent.id+':skill:'+String(s.id??i),titleEn:en,titleZh:zh,url:(state.section==='patreon'?patreonURL:sourceURL)(pick(s.url,s.sourceUrl))||parent.url,category:parent.category,access:accessToken(s.access||parent.access),date:parent.date,summaryEn:field(s,'summary','en'),summaryZh:field(s,'summary','zh'),tags:[...parent.tags,...(s.tier?[s.tier]:[])].slice(0,10),skills:[],isSkill:true,parent,...skillCover(s,parent),originalRelease:patreonURL(s.originalUrl),updatedRelease:patreonURL(s.updateUrl),publicOverview:patreonURL(s.publicOverviewUrl),originalFile:sourceURL(pick(s.fileUrl,s.downloadUrl)),resource:sourceURL(pick(s.resourceUrl,s.documentationUrl))};
}
// ISO dates sort chronologically as text. Unknown dates go last; equal dates retain the source order.
const dateKey=(value)=>typeof value==='string' ? (value.match(/^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])(?=$|[T ])/u)?.[0]??'') : '';
const newestFirst=(a,b)=>{
 const first=dateKey(a.date),second=dateKey(b.date);
 return first===second?0:first>second?-1:1;
};
function hydrate(data){
 state.site=Array.isArray(data)?{}:data;
 const raw=Array.isArray(data)?data:data.entries??data.posts??data.items??[];
 const seen=new Set();
 state.entries=Array.isArray(raw)?raw.map(startEntry).filter(x=>x&&!seen.has(x.url)&&seen.add(x.url)):[];
 const standalone=state.site.skills;
 if(Array.isArray(standalone)&&standalone.length){
   const parentMap=new Map(state.entries.map(e=>[e.url,e]));
   state.skillEntries=standalone.map((s,i)=>{
     const url=(state.section==='patreon'?patreonURL:sourceURL)(pick(s.sourceUrl,s.url,s.originalUrl,s.updateUrl));
     if(!url)return null;
     const parent=parentMap.get(url)||{id:state.section+':standalone',titleEn:field(s,'label','en'),titleZh:field(s,'label','zh'),url,category:'skills',access:accessToken(s.access),date:pick(s.date,s.addedAt),tags:[]};
     const skill=startSkill(s,parent,i);
     if(skill){skill.id=state.section+':skill:'+String(s.id??i);if(s.addedAt)skill.date=s.addedAt}
     return skill;
   }).filter(Boolean);
 }else state.skillEntries=state.entries.flatMap(e=>e.skills.map((s,i)=>startSkill(s,e,i)).filter(Boolean));
 state.entries.sort(newestFirst);
 state.skillEntries.sort(newestFirst);
 const validate=state.section==='patreon'?patreonURL:sourceURL;
 const creator=validate(pick(state.site.creatorUrl,state.site.creator_url,state.site.creator?.url,state.site.patreonUrl,state.site.channelUrl,state.site.sourceUrl));
 if(creator){const a=q('#creator-link');a.href=creator;a.hidden=false}
}
function decorateStatic(){
 document.documentElement.lang=state.lang==='en'?'en':'zh-Hans';
 qa('[data-t]').forEach(e=>e.textContent=T(e.dataset.t));
 qa('[data-lang]').forEach(e=>e.setAttribute('aria-pressed',String(e.dataset.lang===state.lang)));
 qa('[data-source]').forEach(e=>{if(e.dataset.source===state.section)e.setAttribute('aria-current','page');else e.removeAttribute('aria-current')});
 const kit=SRC[state.section];q('#hero-section').textContent=kit.title;
 paintHero();
 q('[data-t="dek"]').textContent=translate(...kit.dek);
 q('[data-t="indexCount"]').textContent=translate(...kit.count);
 q('#creator-link').textContent=translate(...kit.profile);
 if(state.section!=='patreon'){
   q('[data-t="labNote"]').textContent=translate('按主题筛选或直接搜索。教程与视频均从原出处打开。','Filter by topic or search directly. Tutorials and videos open at the original source.');
   q('[data-t="notAffiliated"]').textContent=translate('独立学习索引，非任何平台或创作者的官网。','Independent learning index, not an official site of any platform or creator.');
 }
 document.title=kit.title+' · AI Film Study Library';
 q('#search').placeholder=T('search');
 q('#category').setAttribute('aria-label',T('categoryLabel'));q('#access').setAttribute('aria-label',T('accessLabel'));
 const cov=state.site.coverage;
 const c=q('#coverage-body');c.replaceChildren();
 const zh=pick(cov?.zh,cov?.zhHans,state.site.coverageZh),en=pick(cov?.en,state.site.coverageEn);
 const p=make('p');const fallback=state.section==='patreon'?[L.zh.coverageDefault,L.en.coverageDefault]:['只展示已核实的公开元数据或原创摘要，不镜像原视频、课程全文或受保护资料。','Only verified public metadata or original summaries are shown. Original videos, complete lesson text and protected materials are not mirrored.'];dual(p,zh||fallback[0],en||fallback[1]);c.append(p,make('p','',T('privacy')));
 const resourceItems=Array.isArray(state.site.resources)?state.site.resources:[];
 const verified=resourceItems.map(r=>({...r,href:sourceURL(r.url)})).filter(r=>r.href);
 if(verified.length){
   c.append(make('h3','resource-head',T('resourceList')));
   const list=make('ul','resource-list'); const visited=new Set();
   for(const r of verified){
     if(visited.has(r.href))continue;visited.add(r.href);
     const n=make('li');const a=make('a');dual(a,pick(field(r,'label','zh'),field(r,'title','zh'),r.label,r.href),pick(field(r,'label','en'),field(r,'title','en'),r.label,r.href));a.href=r.href;a.target='_blank';a.rel='noopener noreferrer';n.append(a);list.append(n);
   }
   c.append(list)
 }
}
function options(el,rows,active){
 const f=document.createDocumentFragment();
 for(const [v,l] of rows){const o=make('option','',l);o.value=v;f.append(o)}
 el.replaceChildren(f);el.value=active;
}
function indexed(r){
 return [r.titleEn,r.titleZh,r.summaryEn,r.summaryZh,r.category,categoryLabel(r.category),r.date,...r.tags,...(r.aliases??[]),...r.skills.flatMap(x=>typeof x==='string'?[x]:[field(x,'label','zh'),field(x,'label','en'),x.title,x.summaryZh,x.summaryEn]),r.parent?.titleEn,r.parent?.titleZh].join(' ').normalize('NFKC').toLowerCase();
}
const LOOKS={
 film:{keys:/^video|motion|film|edit|breakdown|cinema|animat/,glyph:'M 11 18 H 77 Q 81 18 81 22 V 68 Q 81 72 77 72 H 11 Q 7 72 7 68 V 22 Q 7 18 11 18 Z M 26 18 V 72 M 61 18 V 72 M 26 31 H 61 M 26 59 H 61 M 11 34 H 19 M 69 34 H 77 M 11 56 H 19 M 69 56 H 77'},
 image:{keys:/image|photo|design|fashion|character|lighting|style/,glyph:'M 8 17 H 82 V 72 H 8 Z M 8 65 L 33 39 L 49 56 L 63 42 L 82 62 M 43 30 A 6 6 0 1 0 43 30.1'},
 workflow:{keys:/work|automation|pipeline|guide|tool|tutorial/,glyph:'M 23 44 H 40 M 50 39 V 24 H 66 M 50 49 V 64 H 66 M 12 37 H 23 V 51 H 12 Z M 40 36 H 54 V 52 H 40 Z M 66 17 H 80 V 31 H 66 Z M 66 57 H 80 V 71 H 66 Z'},
 text:{keys:/prompt|skill|asset|template|script|series/,glyph:'M 26 17 H 62 L 75 30 V 73 H 26 Z M 61 17 V 31 H 75 M 34 43 H 64 M 34 53 H 61 M 34 63 H 56 M 18 60 V 27 H 21'},
 audio:{keys:/audio|sound|music|voice/,glyph:'M 11 48 V 40 M 21 57 V 31 M 32 64 V 24 M 43 77 V 11 M 54 66 V 22 M 65 57 V 31 M 77 51 V 37'},
 index:{keys:/.*/,glyph:'M 19 18 H 72 V 72 H 19 Z M 17 34 H 75 M 17 52 H 75 M 34 16 V 74 M 54 16 V 74 M 29 62 L 63 28'}
};
function look(cat){
 return Object.entries(LOOKS).find(([,a])=>a.keys.test(cat||''))?.[0]||'index';
}
function plate(container,category){
 const key=look(category); container.dataset.look=key;
 const item=make('div','plate');item.setAttribute('aria-hidden','true');
 const NS='http://www.w3.org/2000/svg';
 const svg=document.createElementNS(NS,'svg');svg.setAttribute('viewBox','0 0 90 90');svg.setAttribute('role','presentation');
 const path=document.createElementNS(NS,'path');path.setAttribute('d',LOOKS[key].glyph);svg.append(path);item.append(svg);
 item.append(make('span','plate-cat',categoryLabel(category||'general')));container.append(item);
 container.append(make('span','no-cover',T('noCover')));
}
function cover(container,r,hero=false){
 container.replaceChildren();container.dataset.look=look(r.category);
 container.classList.toggle('has-photo',Boolean(r.image));
 if(r.url){container.href=r.url;container.setAttribute('aria-label',T('view')+': '+(state.lang==='en'?pick(r.titleEn,r.titleZh):pick(r.titleZh,r.titleEn)));}else{container.removeAttribute('href');container.removeAttribute('aria-label');}
 if(!r.image){plate(container,r.category);return}
 const img=make('img');img.loading=hero?'eager':'lazy';img.decoding='async';if(hero)img.fetchPriority='high';
 img.alt=state.lang==='en'?pick(r.imageAltEn,r.imageAltZh):pick(r.imageAltZh,r.imageAltEn);
 img.addEventListener('error',()=>{if(!container.contains(img))return;container.replaceChildren();container.classList.remove('has-photo');plate(container,r.category);if(hero)q('#hero-visual-meta').textContent=T('noCover')},{once:true});
 img.src=r.image;container.append(img);
 if(r.imageKind==='illustration') container.append(make('span','no-cover cover-credit',translate('教程主题配图','Tutorial illustration')));
 if(r.imageKind==='related') container.append(make('span','no-cover cover-credit',translate('关联教程封面','Related tutorial cover')));
}
function paintHero(){
 const frame=q('#hero-frame');const visual=q('#hero-visual');if(!frame||!visual)return;
 const lead=state.entries.find(r=>r.image&&r.access==='public')||state.entries.find(r=>r.image);
 const custom=imageURL(pick(state.site.heroImageUrl,state.site.hero_image_url,state.site.hero?.imageUrl,state.site.hero?.image));
 const title=SRC[state.section].title;
 const item=custom?{image:custom,url:sourceURL(pick(state.site.heroUrl,state.site.hero?.url))||lead?.url||sourceURL(state.site.creatorUrl),titleEn:pick(field(state.site,'heroTitle','en'),lead?.titleEn,title),titleZh:pick(field(state.site,'heroTitle','zh'),lead?.titleZh,title),imageAltZh:field(state.site,'heroImageAlt','zh'),imageAltEn:field(state.site,'heroImageAlt','en'),category:lead?.category||'film'}:
   lead||{image:'',url:'',titleEn:title,titleZh:title,category:({higgsfield:'video',pjace:'workflow',patreon:'image'})[state.section]};
 visual.dataset.section=state.section;
 cover(frame,item,true);
 q('#hero-visual-meta').textContent=item.image?(item.imageKind==='illustration'?translate('教程主题配图','Tutorial illustration'):T('feature')):T('noCover');
 dual(q('#hero-visual-title'),item.titleZh,item.titleEn);
}
function card(r){
 const el=q('#card-template').content.firstElementChild.cloneNode(true);
 cover(el.querySelector('.card-cover'),r);
 el.querySelector('.cat').textContent=r.isSkill?T('skills'):categoryLabel(r.category);
 const a=el.querySelector('.access');a.classList.add(r.access);a.textContent=T(r.access);
 const info=el.querySelector('.card-meta');
 if(r.date)info.textContent=/^\d{4}-\d{2}-\d{2}/.test(r.date)?r.date.slice(0,10):r.date;
 const headline=el.querySelector('h3');dual(headline,r.titleZh,r.titleEn);
 const desc=el.querySelector('.summary');
 if(r.summaryZh||r.summaryEn)dual(desc,r.summaryZh,r.summaryEn);else desc.textContent=T('summaryMissing');
 r.tags.forEach(t=>el.querySelector('.tags').append(make('li','',t)));
 const extras=el.querySelector('.extras');
 const entryLink=(url,label)=>{const a=make('a','',label);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a};
 const fileText=translate('原作者文件','Original creator file');
 const resourceText=state.section==='pjace'?translate('完整拆解与原帖','Full breakdown and original posts'):translate('作者资源','Creator resources');
 if(r.isSkill&&r.originalFile&&state.section==='higgsfield'){
   const p=make('p');p.append(entryLink(r.originalFile,fileText));extras.append(p);
 }
 if(!r.isSkill&&r.resources?.length&&state.section!=='patreon'){
   const seen=new Set([r.url]);const d=make('details');const ul=make('ul');
   for(const x of r.resources){const h=sourceURL(x.url);if(!h||seen.has(h))continue;seen.add(h);
     const name=translate(pick(field(x,'label','zh'),resourceText),pick(field(x,'label','en'),resourceText));
     const li=make('li');li.append(entryLink(h,name));ul.append(li);
   }
   if(ul.children.length){d.append(make('summary','',resourceText),ul);extras.append(d)}
 }
 if(r.isSkill&&r.parent){
   const p=make('p');p.textContent=T('sourcePost')+': ';const z=make('a','',state.lang==='zh'?pick(r.parent.titleZh,r.parent.titleEn):pick(r.parent.titleEn,r.parent.titleZh));z.href=r.parent.url;z.target='_blank';z.rel='noopener noreferrer';p.append(z);extras.append(p);if(r.resource&&r.access==='public'){const ref=make('a','',T('resource'));ref.href=r.resource;ref.target='_blank';ref.rel='noopener noreferrer';extras.append(ref)}for(const [url,label] of [[r.originalRelease,'original'],[r.updatedRelease,'update'],[r.publicOverview,'overview']])if(url){const p=make('p');const a=make('a','',T(label));a.href=url;a.target='_blank';a.rel='noopener noreferrer';p.append(a);extras.append(p)}
   if(!r.originalFile&&state.section==='patreon')extras.append(make('p','',T('skillNoFile')));
 }else if(r.skills.length){
   const d=make('details');d.append(make('summary','',T('linkedSkills')+' · '+r.skills.length));
   const list=make('ul');r.skills.forEach((s,i)=>{const x=startSkill(s,r,i);if(x){const li=make('li');if(r.url!==x.url)li.append(entryLink(x.url,translate(pick(x.titleZh,x.titleEn),pick(x.titleEn,x.titleZh))));else dual(li,x.titleZh,x.titleEn);list.append(li)}});d.append(list);extras.append(d);
 }
 const link=el.querySelector('.source');link.href=r.url;link.textContent=T(state.section!=='patreon'?'view':r.access==='member'?'viewMember':r.access==='public'?'view':'viewUnverified');
 const done=el.querySelector('.check');done.textContent=T(state.done.has(r.id)?'undo':'mark');done.setAttribute('aria-pressed',String(state.done.has(r.id)));
 done.addEventListener('click',()=>{
   if(state.done.has(r.id))state.done.delete(r.id);else state.done.add(r.id);
   put('done',[...state.done]);
   if(state.tab==='done'){render();q('[data-tab="done"]').focus()}
   else{done.textContent=T(state.done.has(r.id)?'undo':'mark');done.setAttribute('aria-pressed',String(state.done.has(r.id)));updateCounts()}
 });
 return el;
}
function updateCounts(){
 q('#count-entries').textContent=state.loading||state.error?'—':String(state.entries.length);
 q('#count-skills').textContent=state.loading||state.error?'—':String(state.skillEntries.length);
 q('#count-done').textContent=state.loading||state.error?'—':String([...state.entries,...state.skillEntries].filter(e=>state.done.has(e.id)).length);
}
function render(){
 qa('[data-tab]').forEach(e=>e.setAttribute('aria-pressed',String(e.dataset.tab===state.tab)));
 const set=[...new Set([...state.entries,...state.skillEntries].map(x=>x.category))].sort((a,b)=>categoryLabel(a).localeCompare(categoryLabel(b),state.lang==='en'?'en':'zh'));
 options(q('#category'),[['',T('allCategories')],...set.map(c=>[c,categoryLabel(c)])],state.cat);
 options(q('#access'),[['',T('allAccess')],...['public','member','unverified'].map(x=>[x,T(x)])],state.access);
 updateCounts();
 let base=state.tab==='skills'?state.skillEntries:state.tab==='done'?[...state.entries,...state.skillEntries].filter(r=>state.done.has(r.id)):state.entries;
 const words=state.query.normalize('NFKC').toLowerCase().trim().split(/\s+/u).filter(Boolean);
 let rows=base.filter(e=>(!state.cat||e.category===state.cat)&&(!state.access||e.access===state.access)&&words.every(w=>indexed(e).includes(w))).sort(newestFirst);
 q('#cards').replaceChildren();
 if(rows.length){const f=document.createDocumentFragment();rows.forEach(e=>f.append(card(e)));q('#cards').append(f)}
 const msg=q('#catalog-state');msg.hidden=rows.length>0&&!state.error&&!state.loading;
 msg.textContent=T(state.loading?'loading':state.error?'missing':state.tab==='done'?'doneEmpty':'empty');
 q('#result-count').textContent=state.loading||state.error?'':translate('显示 '+rows.length+' / '+base.length+' 条','Showing '+rows.length+' of '+base.length+' entries');
 q('#clear').hidden=!(state.query||state.cat||state.access);
}
qa('[data-lang]').forEach(e=>e.addEventListener('click',()=>{state.lang=e.dataset.lang;put('lang',state.lang);decorateStatic();render()}));
qa('[data-tab]').forEach(e=>e.addEventListener('click',()=>{state.tab=e.dataset.tab;render()}));
q('#search').addEventListener('input',e=>{state.query=e.target.value;render()});
q('#category').addEventListener('change',e=>{state.cat=e.target.value;render()});
q('#access').addEventListener('change',e=>{state.access=e.target.value;render()});
q('#clear').addEventListener('click',()=>{state.query=state.cat=state.access='';q('#search').value='';render();q('#search').focus()});
function loadSection(section){
 const id=++state.seq;state.section=section;state.tab='all';state.query=state.cat=state.access='';state.site={};state.entries=[];state.skillEntries=[];state.loading=true;state.error=false;q('#search').value='';q('#creator-link').hidden=true;
 decorateStatic();render();
 fetch(new URL(SRC[section].file,document.baseURI)).then(r=>{if(!r.ok)throw Error('Missing catalog');return r.json()}).then(x=>{if(id===state.seq)hydrate(x)}).catch(()=>{if(id===state.seq)state.error=true}).finally(()=>{if(id===state.seq){state.loading=false;decorateStatic();render()}});
}
qa('[data-source]').forEach(a=>a.addEventListener('click',e=>{if(!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&e.button===0){e.preventDefault();const s=a.dataset.source;if(s!==state.section){history.pushState({},'',a.href);loadSection(s)}}}));
window.addEventListener('popstate',()=>{if(route()!==state.section)loadSection(route())});
loadSection(route());
