import Link from 'next/link';
import { guides } from './data';

export const metadata = { title:'Social Media Guides', description:'Practical, original guides to captions, hooks, calls to action, hashtags, content ideas, and platform-specific writing.' };

export default function GuidesPage(){
 return <main className="legalShell resourceShell">
  <a className="legalBack" href="/">← Back to Post Doctor</a>
  <section className="legalCard">
   <p className="eyebrow">POST DOCTOR RESOURCES</p>
   <h1>Social Media Guides</h1>
   <p className="resourceIntro">Practical editing guidance for creators who want clearer posts, stronger openings, and more useful audience experiences. These guides explain the principles behind Post Doctor's suggestions so you can make the final decision yourself.</p>
   <div className="resourceGrid">{guides.map(g=><article className="resourceCard" key={g.slug}><h2>{g.title}</h2><p>{g.description}</p><Link href={`/guides/${g.slug}`}>Read guide →</Link></article>)}</div>
  </section>
 </main>
}
