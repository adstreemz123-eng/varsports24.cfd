/**
 * ============================================================================
 * ⚡ METHSTREAMS 1-CLICK ALL-IN-ONE DOMAIN & SEO UPDATER
 * ============================================================================
 * Is script ko run karein ya "update-domain.bat" par double-click karein:
 * - Sirf apni new domain paste karein aur Enter dabayein.
 * - Yeh khud-ba-khud:
 *    1. config.js
 *    2. index.html (Canonical URL, OG tags, Twitter tags, JSON-LD Schema, Dates, Article mentions)
 *    3. robots.txt
 *    4. sitemap.xml
 *    5. sitemap.xsl
 *    6. package.json
 *    7. dist/ (Cloudflare Pages build)
 *   ko ek hi second mein auto-update kar dega!
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const configPath = path.join(__dirname, 'config.js');
const indexPath = path.join(__dirname, 'index.html');
const robotsPath = path.join(__dirname, 'robots.txt');
const sitemapPath = path.join(__dirname, 'sitemap.xml');
const sitemapXslPath = path.join(__dirname, 'sitemap.xsl');
const packagePath = path.join(__dirname, 'package.json');
const buildDistPath = path.join(__dirname, 'build-dist.js');

// Helper to format clean domain URL
function formatDomain(input) {
  let clean = input.trim();
  // Strip protocol and trailing slashes
  clean = clean.replace(/^https?:\/\//i, '').replace(/^\/+/, '').replace(/\/+$/, '');
  return {
    fullUrl: `https://${clean}`,
    host: clean
  };
}

// Read current config
let config = {};
try {
  config = require(configPath);
} catch (e) {
  config = { domain: 'https://mailstream.cfd', siteName: 'MethStreams' };
}

const currentDomain = config.domain || 'https://mailstream.cfd';

async function getNewDomain() {
  // If passed via command line argument (e.g. node update-domain.js newdomain.com)
  if (process.argv[2] && process.argv[2].trim()) {
    return process.argv[2].trim();
  }

  // Interactive prompt
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    console.log('========================================================');
    console.log('       ⚡ METHSTREAMS 1-CLICK DOMAIN UPDATER');
    console.log('========================================================');
    console.log(`📌 Current Domain: ${currentDomain}\n`);
    rl.question('👉 Apni NEW Domain yahan paste karein (e.g. mailstream.cfd):\n(Ya sirf Enter dabayein current domain ko re-sync karne k liye):\n> ', (answer) => {
      rl.close();
      resolve(answer.trim() || currentDomain);
    });
  });
}

async function run() {
  const inputDomain = await getNewDomain();
  const { fullUrl: newDomain, host: newHost } = formatDomain(inputDomain);

  console.log('\n--------------------------------------------------------');
  console.log(`🚀 Updating site with: ${newDomain} (${newHost})`);
  console.log('--------------------------------------------------------');

  const siteName = config.siteName || 'MethStreams';
  const newOgImage = `${newDomain}/methstreams-nfl-streams.png`;
  const todayDate = new Date().toISOString().split('T')[0];

  // 1. UPDATE config.js
  if (fs.existsSync(configPath)) {
    let configCode = fs.readFileSync(configPath, 'utf8');
    configCode = configCode.replace(/domain:\s*["'][^"']*["']/i, `domain: "${newDomain}"`);
    configCode = configCode.replace(/ogImage:\s*["'][^"']*["']/i, `ogImage: "${newOgImage}"`);
    // Add new host to keywords if not present
    if (!configCode.includes(newHost)) {
      configCode = configCode.replace(/(keywords:\s*["'][^"']*)(["'])/i, `$1, ${newHost}$2`);
    }
    fs.writeFileSync(configPath, configCode, 'utf8');
    console.log('  [1/6] ✅ config.js updated!');
  }

  // 2. UPDATE robots.txt
  const robotsContent = `User-agent: *
Allow: /

# Sitemap Location
Sitemap: ${newDomain}/sitemap.xml
`;
  fs.writeFileSync(robotsPath, robotsContent, 'utf8');
  console.log('  [2/6] ✅ robots.txt updated!');

  // 3. UPDATE sitemap.xml
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${newDomain}/</loc>
    <lastmod>${todayDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${newDomain}/methstreams-watch/</loc>
    <lastmod>${todayDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
`;
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
  console.log('  [3/6] ✅ sitemap.xml updated (with / and /methstreams-watch/)!');

  // 3b. UPDATE methstreams-watch/index.html
  const watchIndexPath = path.join(__dirname, 'methstreams-watch', 'index.html');
  if (fs.existsSync(watchIndexPath)) {
    let watchHtml = fs.readFileSync(watchIndexPath, 'utf8');
    watchHtml = watchHtml.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${newDomain}/" />`);
    watchHtml = watchHtml.replace(/<meta http-equiv="refresh" content="0;\s*url=[^"]*"\s*\/?>/i, `<meta http-equiv="refresh" content="0; url=${newDomain}/" />`);
    watchHtml = watchHtml.replace(/window\.location\.replace\(["'][^"']*["']\);/i, `window.location.replace("${newDomain}/");`);
    fs.writeFileSync(watchIndexPath, watchHtml, 'utf8');
    console.log('  [+] ✅ methstreams-watch/index.html redirects updated!');
  }

  // 4. UPDATE sitemap.xsl
  if (fs.existsSync(sitemapXslPath)) {
    let xsl = fs.readFileSync(sitemapXslPath, 'utf8');
    xsl = xsl.replace(/<title>XML Sitemap - [^<]*<\/title>/i, `<title>XML Sitemap - ${newHost}</title>`);
    xsl = xsl.replace(/<h1><span>⚡ [^<]*<\/span> XML Sitemap<\/h1>/i, `<h1><span>⚡ ${newHost}</span> XML Sitemap</h1>`);
    xsl = xsl.replace(/generated for <strong>[^<]*<\/strong>/gi, `generated for <strong>${newHost}</strong>`);
    fs.writeFileSync(sitemapXslPath, xsl, 'utf8');
    console.log('  [4/6] ✅ sitemap.xsl updated!');
  }

  // 5. UPDATE package.json
  if (fs.existsSync(packagePath)) {
    let pkg = fs.readFileSync(packagePath, 'utf8');
    pkg = pkg.replace(/"build":\s*"node update-domain\.js [^"&]*\s*&&/i, `"build": "node update-domain.js ${newHost} &&`);
    fs.writeFileSync(packagePath, pkg, 'utf8');
    console.log('  [5/6] ✅ package.json updated!');
  }

  // 6. UPDATE index.html
  if (fs.existsSync(indexPath)) {
    let html = fs.readFileSync(indexPath, 'utf8');

    // Canonical tag
    if (html.includes('<link rel="canonical"')) {
      html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${newDomain}/" />`);
    } else {
      html = html.replace(/<\/title>/i, `</title>\n  <link rel="canonical" href="${newDomain}/" />`);
    }

    // Dates for SEO
    html = html.replace(/<meta property="article:modified_time" content="[^"]*"/i, `<meta property="article:modified_time" content="${todayDate}T00:00:00+00:00"`);
    html = html.replace(/<meta property="og:updated_time" content="[^"]*"/i, `<meta property="og:updated_time" content="${todayDate}T00:00:00+00:00"`);

    // OG Tags
    html = html.replace(/<meta property="og:url" content="[^"]*"/i, `<meta property="og:url" content="${newDomain}/"`);
    html = html.replace(/<meta property="og:image" content="[^"]*"/i, `<meta property="og:image" content="${newOgImage}"`);
    html = html.replace(/<meta property="og:image:secure_url" content="[^"]*"/i, `<meta property="og:image:secure_url" content="${newOgImage}"`);

    // Twitter Tags
    html = html.replace(/<meta name="twitter:url" content="[^"]*"/i, `<meta name="twitter:url" content="${newDomain}/"`);
    html = html.replace(/<meta name="twitter:image" content="[^"]*"/i, `<meta name="twitter:image" content="${newOgImage}"`);

    // JSON-LD Schema
    html = html.replace(/"@id":\s*"https?:\/\/[^"\/]+(?:\/[^"]*)?#website"/gi, `"@id": "${newDomain}/#website"`);
    html = html.replace(/"url":\s*"https?:\/\/[^"\/]+(?:\/[^"]*)?"/gi, `"url": "${newDomain}/"`);
    html = html.replace(/"@id":\s*"https?:\/\/[^"\/]+(?:\/[^"]*)?#faq"/gi, `"@id": "${newDomain}/#faq"`);
    html = html.replace(/The primary official portal is [a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi, `The primary official portal is ${newHost}`);

    // Bookmark bar domain text
    html = html.replace(/<b id="bookmark-domain">[^<]*<\/b>/i, `<b id="bookmark-domain">${newHost}</b>`);

    // Article domain mentions
    html = html.replace(/at <strong>[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}<\/strong>/gi, `at <strong>${newHost}</strong>`);
    html = html.replace(/is <strong>[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}<\/strong>/gi, `is <strong>${newHost}</strong>`);

    fs.writeFileSync(indexPath, html, 'utf8');
    console.log('  [6/6] ✅ index.html (Canonical, Schema, OG, Twitter, Dates, Article) updated!');
  }

  // 7. Auto rebuild dist if build-dist.js exists
  if (fs.existsSync(buildDistPath)) {
    try {
      require(buildDistPath);
      console.log('  [+] 🚀 dist/ folder successfully refreshed with new domain & assets!');
    } catch (e) {
      console.warn('Warning syncing dist:', e.message);
    }
  }

  console.log('\n========================================================');
  console.log('🎉 MUBARAK! TAMAM FILES AUTO-UPDATE HO GAYI HAIN!');
  console.log(`🌐 Active Domain: ${newDomain}`);
  console.log(`🖼️ OG Image: ${newOgImage}`);
  console.log('========================================================\n');
}

run();
