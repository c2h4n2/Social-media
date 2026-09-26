import { notFound } from 'next/navigation';
import { getGuide, guides } from '../data';

export function generateStaticParams(){ return guides.map(g=>({slug:g.slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){ const {slug}=await params; const g=getGuide(slug); return g?{title:g.title,description:g.description}:{}; }

export default async function GuidePage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const guide=getGuide(slug); if(!guide) notFound();
 return <main className="legalShell resourceShell">
  <a className="legalBack" href="/guides">← All social media guides</a>
  <article className="legalCard guideArticle">
   <p className="eyebrow">POST DOCTOR GUIDE</p><h1>{guide.title}</h1><p className="resourceIntro">{guide.intro}</p>
   {guide.sections.map(s=><section key={s.heading}><h2>{s.heading}</h2>{s.paragraphs.map((p,i)=><p key={i}>{p}</p>)}</section>)}
   <section className="takeawayBox"><h2>Quick checklist</h2><ul>{guide.takeaways.map(t=><li key={t}>{t}</li>)}</ul></section>
   <section><h2>Use this with Post Doctor</h2><p>Apply these principles before or after running an analysis. Post Doctor can surface possible improvements, but you should review every suggestion for accuracy, tone, and fit with your audience before publishing.</p><p><a className="textLink" href="/">Analyze a post with Post Doctor →</a></p></section>
  </article>
 </main>
}
