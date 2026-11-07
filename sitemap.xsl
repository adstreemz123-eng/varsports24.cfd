<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap - treetun.cfd</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #1e293b;
            background: #0b0e14;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 960px;
            margin: 0 auto;
            background: #121722;
            padding: 32px;
            border-radius: 12px;
            border: 1px solid #1e293b;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          }
          h1 {
            color: #f1f5f9;
            font-size: 24px;
            margin: 0 0 8px;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          h1 span {
            color: #d81f26;
          }
          p.desc {
            color: #94a3b8;
            font-size: 14px;
            margin-bottom: 24px;
            line-height: 1.5;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th {
            background: #1a2233;
            color: #cbd5e1;
            text-align: left;
            padding: 12px 16px;
            font-size: 13px;
            font-weight: 600;
            border-bottom: 2px solid #334155;
          }
          td {
            padding: 14px 16px;
            border-bottom: 1px solid #1e293b;
            font-size: 13px;
            color: #e2e8f0;
          }
          tr:hover td {
            background: #172033;
          }
          a {
            color: #38bdf8;
            text-decoration: none;
            font-weight: 500;
          }
          a:hover {
            text-decoration: underline;
            color: #7dd3fc;
          }
          .badge {
            background: rgba(216, 31, 38, 0.15);
            color: #f87171;
            border: 1px solid rgba(216, 31, 38, 0.3);
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
          }
          .count {
            color: #64748b;
            font-size: 12px;
            margin-top: 16px;
            text-align: right;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1><span>⚡ treetun.cfd</span> XML Sitemap</h1>
          <p class="desc">This is a search-engine optimized XML Sitemap generated for <strong>treetun.cfd</strong>. It provides Google, Bing, and other web crawlers with the structure of active pages on this portal.</p>
          <table>
            <thead>
              <tr>
                <th>Page URL</th>
                <th>Priority</th>
                <th>Change Frequency</th>
                <th>Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                  </td>
                  <td><span class="badge"><xsl:value-of select="sitemap:priority"/></span></td>
                  <td><xsl:value-of select="sitemap:changefreq"/></td>
                  <td><xsl:value-of select="sitemap:lastmod"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
          <div class="count">
            Total URLs indexed: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
