export const metadata = { title: "How Post Doctor Works" };

export default function HowPage() {
  return (
    <main className="legalShell">
      <a className="legalBack" href="/">← Back to Post Doctor</a>
      <article className="legalCard">
        <p className="eyebrow">POST DOCTOR</p><h1>How Post Doctor Works</h1>
        <p>Post Doctor accepts either an uploaded image or a written description of a planned social post. You also choose the target platform, goal, and tone so the analysis has useful context.</p>
        <h2>1. Review the hook</h2><p>The analyzer considers whether the post gives a viewer a clear reason to pay attention and whether the opening accurately sets up the content.</p>
        <h2>2. Review the caption</h2><p>Caption guidance considers clarity, readability, relevance, and whether the copy adds useful context instead of simply repeating the visual.</p>
        <h2>3. Check platform fit</h2><p>Different social platforms have different formats and audience expectations. Suggestions adapt to the selected platform instead of treating every channel identically.</p>
        <h2>4. Check the call to action</h2><p>A useful call to action tells an interested viewer what to do next without relying on empty engagement bait.</p>
        <h2>5. Return editable suggestions</h2><p>The report provides caption options, a hook, call to action, keywords or hashtags, strengths, and suggested improvements. The creator decides which recommendations to use.</p>
        <h2>What Post Doctor cannot predict</h2><p>The report does not predict virality or guarantee performance. Audience behavior, timing, distribution, competition, platform changes, and many other variables affect what happens after publishing.</p>
      </article>
    </main>
  );
}
