export const metadata = { title: "About Post Doctor" };

export default function AboutPage() {
  return (
    <main className="legalShell">
      <a className="legalBack" href="/">← Back to Post Doctor</a>
      <article className="legalCard">
        <p className="eyebrow">POST DOCTOR</p><h1>About Post Doctor</h1>
        <p>Post Doctor is a social-media editing assistant built to help creators review a post before publishing it. Instead of promising virality, it focuses on practical content fundamentals: clarity, hook strength, caption quality, platform fit, calls to action, engagement opportunities, and alignment between a visual and its message.</p>
        <h2>Why it exists</h2><p>Post Doctor focuses on the editing moment between having an idea and pressing publish. That is where a clearer opening, tighter caption, better platform fit, or more useful call to action can make a post easier for an audience to understand.</p>
        <h2>What the score means</h2><p>The Post Doctor score is a heuristic content-quality assessment. It is not a forecast of reach, impressions, followers, sales, or engagement. Real performance depends on audience history, timing, distribution, competition, platform algorithms, and other factors.</p>
        <h2>Human judgment still matters</h2><p>AI suggestions are starting points. Creators should review generated text, verify factual claims, preserve their own voice, and decide whether a recommendation fits their audience. Post Doctor is an editing aid, not a substitute for authorship or judgment.</p>
      </article>
    </main>
  );
}
