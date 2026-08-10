import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Post Doctor",
    short_name: "Post Doctor",
    description: "Improve your social media post before you publish it.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f7fb",
    theme_color: "#111827"
  };
}
