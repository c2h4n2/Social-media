export const metadata = {
  title: "Terms of Use",
};

export default function TermsPage() {
  return (
    <main className="legalShell">
      <a className="legalBack" href="/">← Back to Post Doctor</a>
      <article className="legalCard">
        <p className="eyebrow">LEGAL</p>
        <h1>Terms of Use</h1>
        <p className="legalUpdated">Last updated: August 2026</p>

        <h2>Beta service</h2>
        <p>
          Post Doctor is currently a beta tool. Features, usage limits, model
          behavior, and availability may change.
        </p>

        <h2>AI-generated suggestions</h2>
        <p>
          Post Doctor provides automated suggestions for social-media content.
          Results may be incomplete, inaccurate, or unsuitable for a particular
          audience. You are responsible for reviewing content before publishing it.
        </p>

        <h2>No performance guarantee</h2>
        <p>
          Post Doctor scores are content-quality estimates. They are not
          predictions or guarantees of views, engagement, follower growth,
          sales, virality, or platform performance.
        </p>

        <h2>Your content</h2>
        <p>
          Only submit content you have the right to use. You remain responsible
          for the posts you create and publish.
        </p>

        <h2>Acceptable use</h2>
        <p>
          Do not abuse the service, attempt to bypass usage limits, interfere
          with service operation, or use Post Doctor to violate applicable law
          or third-party rights.
        </p>

        <h2>Availability</h2>
        <p>
          The beta is provided on an as-available basis and may be changed,
          suspended, or discontinued.
        </p>
      </article>
    </main>
  );
}
