export const runtime = "nodejs";

export async function GET() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";
  const publisherId = client.replace(/^ca-/, "");

  if (!publisherId.startsWith("pub-")) {
    return new Response(
      "# AdSense publisher ID not configured yet.\n",
      {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=300",
        },
      }
    );
  }

  return new Response(
    `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`,
    {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
}
