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

  // 2. Aapki Custom Domain (maslan: https://mailstream.cfd)
  domain: "https://ustream.cfd",

  // 3. Discord Support Link
  discordUrl: "https://discord.gg/gmKmhVKF4G",

  // 4. Site Title (Browser Tab & Google Search Title - Max 60 chars for SEO)
  title: "MethStreams - Free NFL Broadcast & HD Live Sports Streams",

  // 5. Meta Description (Google Search Snippet - Max 160 chars)
  description: "Stream free NFL broadcast games and live sports in HD on MethStreams. Access lag-free feeds, match schedules, and real-time scores across all your devices.",

  // 6. Social Share Image (OG Image)
  ogImage: "https://ustream.cfd/methstreams-nfl-streams.jpg",

  // 7. Primary SEO Keywords (1st: MethStreams, 2nd: NFL broadcast)
  keywords: "MethStreams, NFL broadcast, free NFL broadcast, live NFL streams, NFL streams, MethStreams live, NBA streams, UFC streams, CFB streams, live sports schedules, ustream.cfd"
};

// Export for Node.js scripts if running in terminal
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SITE_CONFIG;
}
