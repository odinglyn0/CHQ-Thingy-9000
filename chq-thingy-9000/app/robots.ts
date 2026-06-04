import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: "https://chqthingy.odinglynn.com/sitemap.xml",
    host: "https://chqthingy.odinglynn.com",
  }
}
