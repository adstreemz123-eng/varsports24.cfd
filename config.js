/**
 * ============================================================================
 * ⚡ SOCCER STREAMS SITE CONFIGURATION
 * ============================================================================
 * Yahan aap apni Domain aur Site Name change kar sakte hain.
 * Change karne k baad "update-domain.bat" par double click karein,
 * to Sitemap, Robots.txt, Canonical URL aur index.html khud update ho jayenge!
 */

const SITE_CONFIG = {
  // 1. Aapki Website Ka Naam
  siteName: "MethStreams",

  // 2. Aapki Custom Domain (maslan: https://varsports24.cfd)
  domain: "https://varsports24.cfd",

  // 3. Discord Support Link
  discordUrl: "https://discord.gg/gmKmhVKF4G",

  // 4. Site Title (Browser Tab & Google Search Title - Max 60 chars for SEO)
  title: "Varsports24 - Live Sports Streams, NFL, NBA & MethStreams HD",

  // 5. Meta Description (Google Search Snippet - Max 160 chars)
  description: "Watch free live sports on Varsports24 & MethStreams. Fast, buffer-free NFL broadcast feeds, NBA games, UFC fight nights & soccer streams in 1080p HD.",

  // 6. Social Share Image (OG Image)
  ogImage: "https://varsports24.cfd/methstreams.png",

  // 7. Primary SEO Keywords (1st: MethStreams, 2nd: NFL broadcast)
  keywords: "Varsports24, MethStreams, CrackStreams, CrackStreams alternative, NFL broadcast, free NFL broadcast, live NFL broadcast, methstreams nfl, NFL streams, MethStreams live, NBA streams, UFC streams, CFB streams, live sports schedules, varsports24.cfd"
};

// Export for Node.js scripts if running in terminal
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SITE_CONFIG;
}
