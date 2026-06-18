import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.siteUrl, priority: 1 },
    { url: `${siteConfig.siteUrl}/privacidade`, priority: 0.3 },
  ];
}
