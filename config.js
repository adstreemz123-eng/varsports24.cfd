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

  // 2. Aapki Custom Domain (maslan: https://gazinfonet.cfd)
  domain: "https://gazinfonet.cfd",

  // 3. Discord Support Link
  discordUrl: "https://discord.gg/gmKmhVKF4G",

  // 4. Site Title (Browser Tab & Google Search Title - Max 60 chars for SEO)
  title: "MethStreams - Live NFL Broadcast & HD Sports Streaming",

  // 5. Meta Description (Google Search Snippet - Max 160 chars)
  description: "Stream live NFL broadcast games and sports in 1080p HD on MethStreams. Fast kickoff schedules, real-time box scores, and clean feeds for NBA, UFC, and CFB.",

  // 6. Social Share Image (OG Image)
  ogImage: "https://gazinfonet.cfd/MethStreams-NFL-broadcast-map.png",

  // 7. Primary SEO Keywords (1st: MethStreams, 2nd: NFL broadcast)
  keywords: "MethStreams, NFL broadcast, free NFL broadcast, live NFL broadcast, methstreams nfl, NFL streams, MethStreams live, NBA streams, UFC streams, CFB streams, live sports schedules, gazinfonet.cfd"
};

// Export for Node.js scripts if running in terminal
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SITE_CONFIG;
}
