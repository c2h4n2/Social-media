export const metadata = {
  title: "How It Works",
  description:
    "See how Post Doctor analyzes images and post descriptions to create a social-media posting package.",
};

export default function HowItWorksPage() {
  return (
    <main className="legalShell">
      <a className="legalBack" href="/">← Back to Post Doctor</a>
      <article className="legalCard">
        <p className="eyebrow">HOW IT WORKS</p>
        <h1>From idea to stronger post.</h1>

        <h2>1. Upload or describe</h2>
        <p>
          Start with the photo you plan to publish or describe the post you have
          in mind. When you upload an image, you can also add optional context
          such as the story behind it or what you want the audience to feel.
        </p>

        <h2>2. Choose your platform</h2>
        <p>
          Select Instagram, TikTok, Facebook, X, LinkedIn, or Pinterest.
          Platform choice matters because a strong LinkedIn post often needs a
          different opening and tone than an Instagram caption.
        </p>

        <h2>3. Choose a goal and tone</h2>
        <p>
          Tell Post Doctor whether you care most about followers, views,
          comments, brand building, or selling something. Then choose a tone
          such as casual, bold, professional, funny, inspirational, or minimal.
        </p>

        <h2>4. Get the report</h2>
        <p>
          The report includes three caption options, a hook, CTA, keywords,
          hashtags, strengths, improvement notes, and category-level scoring.
        </p>

        <h2>5. Use your judgment</h2>
        <p>
          AI suggestions are a starting point, not a replacement for your own
          voice. Review the output, edit what does not sound like you, and make
          sure the final post accurately reflects the image and message you want
          to share.
        </p>

        <h2>What Post Doctor does not do</h2>
        <p>
          It does not guarantee reach or virality, and it does not know the
          future behavior of a social platform's recommendation system. Its job
          is simply to help improve the quality and clarity of the post itself.
        </p>
      </article>
    </main>
  );
}
