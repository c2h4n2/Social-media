export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <main className="legalShell">
      <a className="legalBack" href="/">← Back to Post Doctor</a>
      <article className="legalCard">
        <p className="eyebrow">LEGAL</p>
        <h1>Privacy Policy</h1>
        <p className="legalUpdated">Last updated: August 2026</p>

        <h2>Advertising and analytics</h2>
        <p>Post Doctor uses Google Analytics to understand aggregate website usage and may use Google AdSense to display advertising. Google and its partners may use cookies or similar technologies to measure usage, deliver ads, limit repeated ads, and, where permitted by consent and applicable law, personalize advertising.</p>
        <p>Visitors in regions where consent is required may be shown a consent message with choices for advertising and measurement.</p>
        <h2>What Post Doctor processes</h2>
        <p>
          When you use Post Doctor, you may provide an image, a written
          description, a selected platform, goal, and tone. This information is
          processed to generate your Post Doctor report.
        </p>

        <h2>Uploaded images</h2>
        <p>
          The current beta does not intentionally save uploaded images to a
          Post Doctor database. Images are processed in memory and sent to the
          AI service used to generate your report.
        </p>

        <h2>AI processing</h2>
        <p>
          Content you submit may be sent to an AI service provider for
          processing. Do not upload content you do not have permission to use,
          or highly sensitive information that is unnecessary for the analysis.
        </p>

        <h2>Technical information</h2>
        <p>
          The service may process limited technical information such as IP
          address-derived rate-limit identifiers, request timestamps, and error
          logs for security, abuse prevention, and service reliability.
        </p>

        <h2>Rate limiting</h2>
        <p>
          The beta uses a one-way hashed identifier derived from network
          information to enforce basic usage limits. The beta is not designed
          to use that identifier as an account or advertising profile.
        </p>


        <h2>Advertising and cookies</h2>
        <p>
          Post Doctor may use third-party advertising services such as Google
          AdSense. Advertising providers may use cookies, local storage, device
          information, and similar technologies to deliver, measure, and improve
          advertising. Where required, consent choices may be presented before
          personalized advertising technologies are used.
        </p>

        <h2>Advertising partners</h2>
        <p>
          If advertising is enabled, third-party advertising providers may
          process information according to their own privacy policies and the
          choices available to you through applicable consent controls.
        </p>

        <h2>Changes</h2>
        <p>
          This policy may be updated as Post Doctor adds accounts, analytics,
          subscriptions, or other features.
        </p>
      </article>
    </main>
  );
}
