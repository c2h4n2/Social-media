export const metadata = {
  title: "About",
  description:
    "Learn what Post Doctor does and how it helps creators improve social posts before publishing.",
};

export default function AboutPage() {
  return (
    <main className="legalShell">
      <a className="legalBack" href="/">← Back to Post Doctor</a>
      <article className="legalCard">
        <p className="eyebrow">ABOUT POST DOCTOR</p>
        <h1>A second opinion for your next post.</h1>

        <p>
          Post Doctor is a creator tool built to help people improve social-media
          posts before they publish them. Instead of only generating a caption,
          it looks at the full post idea: the visual, the opening hook, the
          caption, the call to action, platform fit, and audience engagement.
        </p>

        <h2>Why we built it</h2>
        <p>
          Creators often know what they want to post but still wonder whether
          the caption is too long, the opening is too weak, or the message fits
          the platform. Post Doctor turns that last-minute uncertainty into a
          quick review.
        </p>

        <h2>Two ways to use Post Doctor</h2>
        <p>
          You can upload the image you plan to share, or describe a post that is
          still only an idea. Then choose the platform, goal, and tone. The tool
          produces three caption options, a hook, CTA, keywords, hashtags,
          practical notes, and a Post Doctor score.
        </p>

        <h2>What the score means</h2>
        <p>
          The score is a heuristic content-quality estimate. It is designed to
          help compare areas of the post such as hook strength, caption quality,
          platform fit, CTA quality, engagement potential, and visual alignment.
          It is not a forecast of views, followers, sales, or virality.
        </p>

        <h2>Built for creators, not algorithms</h2>
        <p>
          The goal is not to promise a viral post. It is to help creators
          communicate more clearly, make stronger creative choices, and publish
          with more confidence.
        </p>
      </article>
    </main>
  );
}
