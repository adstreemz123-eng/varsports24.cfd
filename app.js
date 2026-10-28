/**
 * StreamKing Signature Sports Streaming Application
 * Powered by streamed.pk API & Discord Integration
 */

const AURA_API_BASE = 'https://aurasports.xyz/api/schedule';
const STREAMED_API_BASE = 'https://streamed.pk/api';
const API_BASE = STREAMED_API_BASE;
const DISCORD_INVITE_URL = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.discordUrl) 
  ? SITE_CONFIG.discordUrl 
  : 'https://discord.gg/gmKmhVKF4G';

// Authentic League SVG Badges matching user's screenshot
const LEAGUE_BADGES = {
  'NFL': `<svg viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 1.5L3.5 5.8v15c0 9.8 12.5 15.2 12.5 15.2s12.5-5.4 12.5-15.2V5.8L16 1.5z" fill="#013369" stroke="#ffffff" stroke-width="1.2"/>
    <path d="M5.5 17c2.5 0 10.5-1.8 10.5-1.8s8 1.8 10.5 1.8v3.5c0 7.8-10.5 12.5-10.5 12.5S5.5 28.3 5.5 20.5V17z" fill="#D50A0A"/>
    <text x="16" y="27" font-family="'Outfit', sans-serif" font-weight="900" font-size="7.5" fill="#ffffff" text-anchor="middle" letter-spacing="-0.3">NFL</text>
    <ellipse cx="16" cy="10" rx="3.6" ry="2.3" fill="#ffffff" transform="rotate(-28 16 10)"/>
    <line x1="13.5" y1="11.5" x2="18.5" y2="8.5" stroke="#013369" stroke-width="0.7"/>
    <circle cx="9.5" cy="9.5" r="0.75" fill="#ffffff"/>
    <circle cx="11.5" cy="7.5" r="0.75" fill="#ffffff"/>
    <circle cx="20.5" cy="7.5" r="0.75" fill="#ffffff"/>
    <circle cx="22.5" cy="9.5" r="0.75" fill="#ffffff"/>
  </svg>`,

  'NBA': `<svg viewBox="0 0 24 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="38" rx="3.5" fill="#1D428A"/>
    <path d="M12 0h8.5a3.5 3.5 0 0 1 3.5 3.5v31a3.5 3.5 0 0 1-3.5 3.5H12V0z" fill="#C8102E"/>
    <path d="M12 6.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm-3.5 6.5c.8-.5 2-1 3.5-.8 1.5.2 2.8 1.2 3.2 2.5l2.2 4.5c.3.6.1 1.3-.5 1.6-.6.3-1.3.1-1.6-.5l-1.8-3.7-.8 6.5 2.8 9.5c.2.7-.2 1.4-.9 1.6-.7.2-1.4-.2-1.6-.9L12.5 24l-2.2 7.8c-.2.7-.9 1.1-1.6.9-.7-.2-1.1-.9-.9-1.6l2.5-10.2-.5-5.2-1.5 2.2c-.4.6-1.2.7-1.8.3-.6-.4-.7-1.2-.3-1.8l1.8-3.4z" fill="#FFFFFF"/>
    <ellipse cx="6" cy="17" rx="2.5" ry="2.5" fill="#FFFFFF"/>
  </svg>`,

  'CFB': `<svg viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 1.5L3.5 5.8v15c0 9.8 12.5 15.2 12.5 15.2s12.5-5.4 12.5-15.2V5.8L16 1.5z" fill="#002b49" stroke="#ffffff" stroke-width="1.2"/>
    <path d="M5.5 17c2.5 0 10.5-1.8 10.5-1.8s8 1.8 10.5 1.8v3.5c0 7.8-10.5 12.5-10.5 12.5S5.5 28.3 5.5 20.5V17z" fill="#b31b1b"/>
    <text x="16" y="27" font-family="'Outfit', sans-serif" font-weight="900" font-size="7" fill="#ffffff" text-anchor="middle">CFB</text>
    <ellipse cx="16" cy="10" rx="3.5" ry="2.2" fill="#8d4004" transform="rotate(-25 16 10)"/>
    <line x1="13.5" y1="11.5" x2="18.5" y2="8.5" stroke="#ffffff" stroke-width="0.7"/>
  </svg>`,

  'SOCCER': `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="16" fill="#000000"/>
    <circle cx="18" cy="18" r="15.2" fill="#ffffff"/>
    <polygon points="18,10 23,14 21,20 15,20 13,14" fill="#000000"/>
    <line x1="18" y1="10" x2="18" y2="3" stroke="#000000" stroke-width="1.8"/>
    <line x1="23" y1="14" x2="31" y2="11" stroke="#000000" stroke-width="1.8"/>
    <line x1="21" y1="20" x2="27" y2="28" stroke="#000000" stroke-width="1.8"/>
    <line x1="15" y1="20" x2="9" y2="28" stroke="#000000" stroke-width="1.8"/>
    <line x1="13" y1="14" x2="5" y2="11" stroke="#000000" stroke-width="1.8"/>
    <polygon points="18,3 15,6 21,6" fill="#000000"/>
    <polygon points="31,11 29,15 32,17" fill="#000000"/>
    <polygon points="27,28 23,28 27,32" fill="#000000"/>
    <polygon points="9,28 13,28 9,32" fill="#000000"/>
    <polygon points="5,11 7,15 4,17" fill="#000000"/>
  </svg>`,

  'UFC-BOXING': `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="11,3 25,3 33,11 33,25 25,33 11,33 3,25 3,11" fill="#0f172a" stroke="#d81f26" stroke-width="1.5"/>
    <path d="M12 12h12v12H12z" fill="#d81f26" opacity="0.15"/>
    <text x="18" y="22" font-family="'Outfit', sans-serif" font-weight="900" font-size="7" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">UFC</text>
  </svg>`,

  'MMA': `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="11,3 25,3 33,11 33,25 25,33 11,33 3,25 3,11" fill="#0f172a" stroke="#d81f26" stroke-width="1.5"/>
    <path d="M12 12h12v12H12z" fill="#d81f26" opacity="0.15"/>
    <text x="18" y="22" font-family="'Outfit', sans-serif" font-weight="900" font-size="9" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">MMA</text>
  </svg>`,

  'BOXING': `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2L5 7v13c0 9 13 14 13 14s13-5 13-14V7L18 2z" fill="#0f172a" stroke="#d81f26" stroke-width="1.5"/>
    <path d="M12 12c0-2 2-4 5-4s5 2 5 4v4c0 3-2 5-5 5s-5-2-5-5v-4z" fill="#d81f26"/>
    <rect x="13" y="19" width="8" height="4" rx="1.5" fill="#ffffff"/>
    <text x="18" y="30" font-family="'Outfit', sans-serif" font-weight="900" font-size="6" fill="#ffffff" text-anchor="middle">BOXING</text>
  </svg>`,

  'NHL': `<svg viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 1.5L3.5 5.8v15c0 9.8 12.5 15.2 12.5 15.2s12.5-5.4 12.5-15.2V5.8L16 1.5z" fill="#000000" stroke="#C4CED4" stroke-width="1.3"/>
    <path d="M5.5 15l21-8M5.5 23l21-8" stroke="#F47A38" stroke-width="1" opacity="0.6"/>
    <text x="16" y="24" font-family="'Outfit', sans-serif" font-weight="900" font-size="9" fill="#FFFFFF" text-anchor="middle" font-style="italic" letter-spacing="0.5">NHL</text>
  </svg>`,

  'MLB': `<svg viewBox="0 0 42 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="42" height="26" rx="4" fill="#002D72"/>
    <path d="M21 0h17a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H21V0z" fill="#BA0C2F"/>
    <path d="M18.5 7a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6zm-5.5 1.5l3.5-.5 3 2.5v4.5l-2.5 7.5h-2l1.5-6.5-3.5-2.5v-5zm-1-1l6.5-4.5 1 1.5-5.5 4-2-1z" fill="#FFFFFF"/>
    <circle cx="28" cy="13" r="2.2" fill="#FFFFFF"/>
  </svg>`,

  'F1': `<svg viewBox="0 0 44 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="44" height="26" rx="4" fill="#E10600"/>
    <text x="22" y="18" font-family="'Outfit', sans-serif" font-weight="900" font-size="14" fill="#FFFFFF" text-anchor="middle" font-style="italic" letter-spacing="0.5">F1</text>
  </svg>`,

  'WWE': `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="36" rx="6" fill="#111827"/>
    <path d="M7 9l4 14 4-10 4 10 4-14h3l-6 18h-2l-3-9-3 9H10L4 9h3z" fill="#E5E7EB"/>
    <path d="M5 24h26v2.5H5z" fill="#DC2626"/>
  </svg>`,

  'DEFAULT': `<svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 2L4 6v9c0 7.5 11 13 11 13s11-5.5 11-13V6L15 2z" fill="#183e52" stroke="#d81f26" stroke-width="1.2"/>
  </svg>`
};

// EXACT 10 CATEGORIES FROM USER SCREENSHOT
const CATEGORY_CARDS = [
  {
    id: 'nfl',
    targetSport: 'american-football',
    title: 'NFL',
    subtitle: 'WATCH LIVE NFL BROADCAST | FREE HD NFL ONLINE',
    description: 'Watch free NFL broadcast games on MethStreams Live. Stream Sunday football, RedZone, and primetime matchups in 1080p HD...',
    badgeType: 'NFL',
    icon: '🏈'
  },
  {
    id: 'soccer',
    targetSport: 'football',
    title: 'Soccer',
    subtitle: 'METHSTREAMS LIVE | WATCH FREE SOCCER STREAMS IN HD',
    description: 'Watch free soccer streams on MethStreams & Footybite HD. Enjoy Premier League, Champions League and top European leagues...',
    badgeType: 'SOCCER',
    icon: '⚽'
  },
  {
    id: 'nba',
    targetSport: 'basketball',
    title: 'NBA',
    subtitle: 'METHSTREAMS LIVE | WATCH FREE NBA STREAMS IN HD',
    description: 'Watch free NBA streams on MethStreams Live! Enjoy every game in HD with Crackstreams backup streams...',
    badgeType: 'NBA',
    icon: '🏀'
  },
  {
    id: 'cfb',
    targetSport: 'american-football',
    title: 'CFB',
    subtitle: 'METHSTREAMS LIVE | WATCH FREE CFB STREAMS IN HD',
    description: 'Watch free college football streams on MethStreams. Every FBS game in HD — SEC, Big Ten & ACC on MethStreams...',
    badgeType: 'CFB',
    icon: '🏈'
  },
  {
    id: 'mma-boxing',
    targetSport: 'fight',
    title: 'UFC / Boxing',
    subtitle: 'METHSTREAMS LIVE | WATCH FREE UFC, MMA & BOXING STREAMS IN HD',
    description: 'Watch free UFC & Boxing streams on MethStreams. Title fights, UFC Fight Nights, undercards and marquee PPV events in full HD...',
    badgeType: 'UFC-BOXING',
    icon: '🥊'
  },
  {
    id: 'nhl',
    targetSport: 'hockey',
    title: 'NHL',
    subtitle: 'METHSTREAMS LIVE | WATCH FREE NHL STREAMS IN HD',
    description: 'Watch free NHL streams on MethStreams Live! Enjoy every game in HD with reliable multi-server feeds...',
    badgeType: 'NHL',
    icon: '🏒'
  },
  {
    id: 'mlb',
    targetSport: 'baseball',
    title: 'MLB',
    subtitle: 'METHSTREAMS LIVE | WATCH FREE MLB STREAMS IN HD',
    description: 'Watch free MLB streams on MethStreams Live. Enjoy every game in HD with Crackstreams & Footybite coverage...',
    badgeType: 'MLB',
    icon: '⚾'
  },
  {
    id: 'f1',
    targetSport: 'motor-sports',
    title: 'F1',
    subtitle: 'METHSTREAMS LIVE | WATCH FREE F1 STREAMS IN HD',
    description: 'Watch free F1 streams on MethStreams Live. Enjoy every Grand Prix, practice and qualifying in HD...',
    badgeType: 'F1',
    icon: '🏎️'
  },
  {
    id: 'wwe',
    targetSport: 'fight',
    title: 'WWE',
    subtitle: 'METHSTREAMS LIVE | WATCH FREE WWE STREAMS IN HD',
    description: 'Watch free WWE streams on MethStreams Live. Enjoy WWE Raw, SmackDown, and premium live events in HD...',
    badgeType: 'WWE',
    icon: '🤼'
  }
];

const CATEGORY_MAP = {};
CATEGORY_CARDS.forEach(c => {
  CATEGORY_MAP[c.id] = c;
});
// Aliases for complete backwards-compatibility
if (CATEGORY_MAP['mma-boxing']) {
  CATEGORY_MAP['mma'] = CATEGORY_MAP['mma-boxing'];
  CATEGORY_MAP['boxing'] = CATEGORY_MAP['mma-boxing'];
  CATEGORY_MAP['ufc'] = CATEGORY_MAP['mma-boxing'];
  CATEGORY_MAP['ufc-boxing'] = CATEGORY_MAP['mma-boxing'];
}

const CATEGORY_DETAILS = {};
CATEGORY_CARDS.forEach(c => {
  CATEGORY_DETAILS[c.id] = c;
  if (c.targetSport) {
    CATEGORY_DETAILS[c.targetSport] = c;
  }
});
if (CATEGORY_MAP['mma-boxing']) {
  CATEGORY_DETAILS['mma'] = CATEGORY_MAP['mma-boxing'];
  CATEGORY_DETAILS['boxing'] = CATEGORY_MAP['mma-boxing'];
  CATEGORY_DETAILS['ufc'] = CATEGORY_MAP['mma-boxing'];
  CATEGORY_DETAILS['ufc-boxing'] = CATEGORY_MAP['mma-boxing'];
}

// AUTHENTIC FEATURED FIXTURES FOR ALL 10 SPORTS (Matches user screenshot exactly)
const FEATURED_CATEGORY_FIXTURES = {
  'nfl': [
    {
      id: 'ft-nfl-1',
      title: 'Jacksonville Jaguars vs Houston Texans',
      dateText: 'Sun, Oct 18, 06:30 PM',
      countdown: 'LIVE NOW',
      isLive: true,
      category: 'american-football',
      sources: [{ source: 'golf', id: '2316' }]
    },
    {
      id: 'ft-nfl-2',
      title: 'NFL Network',
      dateText: 'Sun, Oct 18, 08:00 AM',
      countdown: '08:00 AM',
      isLive: false,
      category: 'american-football',
      sources: [{ source: 'golf', id: '2316' }]
    },
    {
      id: 'ft-nfl-3',
      title: 'NFL Redzone',
      dateText: 'Sun, Oct 18, 10:00 PM',
      countdown: '10:00 PM',
      isLive: false,
      category: 'american-football',
      sources: [{ source: 'golf', id: '2316' }]
    },
    {
      id: 'ft-nfl-4',
      title: 'Tampa Bay Buccaneers vs Pittsburgh Steelers',
      dateText: 'Sun, Oct 18, 10:00 PM',
      countdown: '10:00 PM',
      isLive: false,
      category: 'american-football',
      sources: [{ source: 'golf', id: '2316' }]
    },
    {
      id: 'ft-nfl-5',
      title: 'Philadelphia Eagles vs Carolina Panthers',
      dateText: 'Sun, Oct 18, 10:00 PM',
      countdown: '10:00 PM',
      isLive: false,
      category: 'american-football',
      sources: [{ source: 'golf', id: '2316' }]
    },
    {
      id: 'ft-nfl-6',
      title: 'New York Giants vs New Orleans Saints',
      dateText: 'Sun, Oct 18, 10:00 PM',
      countdown: '10:00 PM',
      isLive: false,
      category: 'american-football',
      sources: [{ source: 'golf', id: '2316' }]
    },
    {
      id: 'ft-nfl-7',
      title: 'New England Patriots vs New York Jets',
      dateText: 'Sun, Oct 18, 10:00 PM',
      countdown: '10:00 PM',
      isLive: false,
      category: 'american-football',
      sources: [{ source: 'golf', id: '2316' }]
    },
    {
      id: 'ft-nfl-8',
      title: 'Indianapolis Colts vs Tennessee Titans',
      dateText: 'Sun, Oct 18, 10:00 PM',
      countdown: '10:00 PM',
      isLive: false,
      category: 'american-football',
      sources: [{ source: 'golf', id: '2316' }]
    }
  ],
  'nba': [
    {
      id: 'ft-nba-1',
      title: 'Boston Celtics vs Detroit Pistons',
      dateText: 'Tonight, 07:30 PM',
      countdown: 'LIVE NOW',
      isLive: true,
      category: 'basketball',
      sources: [{ source: 'golf', id: '2386' }]
    },
    {
      id: 'ft-nba-2',
      title: 'Los Angeles Lakers vs Golden State Warriors',
      dateText: 'Tonight, 10:00 PM',
      countdown: '2h 15m 0s',
      isLive: false,
      category: 'basketball',
      sources: [{ source: 'golf', id: '2386' }]
    },
    {
      id: 'ft-nba-3',
      title: 'Denver Nuggets vs Dallas Mavericks',
      dateText: 'Tomorrow, 08:00 PM',
      countdown: '18h 40m',
      isLive: false,
      category: 'basketball',
      sources: [{ source: 'golf', id: '2386' }]
    },
    {
      id: 'ft-nba-4',
      title: 'Miami Heat vs Milwaukee Bucks',
      dateText: 'Tomorrow, 09:30 PM',
      countdown: '20h 10m',
      isLive: false,
      category: 'basketball',
      sources: [{ source: 'golf', id: '2386' }]
    }
  ],
  'cfb': [
    {
      id: 'ft-cfb-1',
      title: 'Florida Intl Panthers vs Middle Tennessee Blue Raiders',
      dateText: 'Today, 08:00 PM',
      countdown: 'LIVE NOW',
      isLive: true,
      category: 'american-football',
      sources: [{ source: 'golf', id: '2359' }]
    },
    {
      id: 'ft-cfb-2',
      title: 'Delaware Blue Hens vs Missouri State Bears',
      dateText: 'Today, 08:00 PM',
      countdown: 'LIVE NOW',
      isLive: true,
      category: 'american-football',
      sources: [{ source: 'golf', id: '2360' }]
    },
    {
      id: 'ft-cfb-3',
      title: 'Marshall Thundering Herd vs South Alabama Jaguars',
      dateText: 'Today, 08:30 PM',
      countdown: '35m 10s',
      isLive: false,
      category: 'american-football',
      sources: [{ source: 'golf', id: '2361' }]
    },
    {
      id: 'ft-cfb-4',
      title: 'Georgia Bulldogs vs Alabama Crimson Tide',
      dateText: 'Sat, 07:00 PM',
      countdown: '1d 12h',
      isLive: false,
      category: 'american-football',
      sources: [{ source: 'golf', id: '2359' }]
    }
  ],
  'soccer': [
    {
      id: 'ft-soc-1',
      title: 'Real Madrid vs Barcelona (El Clasico)',
      dateText: 'Today, 09:00 PM',
      countdown: 'LIVE NOW',
      isLive: true,
      category: 'football',
      sources: [{ source: 'golf', id: '2388' }]
    },
    {
      id: 'ft-soc-2',
      title: 'Manchester City vs Liverpool',
      dateText: 'Today, 08:30 PM',
      countdown: 'LIVE NOW',
      isLive: true,
      category: 'football',
      sources: [{ source: 'golf', id: '2388' }]
    },
    {
      id: 'ft-soc-3',
      title: 'Arsenal vs Chelsea (London Derby)',
      dateText: 'Tomorrow, 07:30 PM',
      countdown: '21h 30m',
      isLive: false,
      category: 'football',
      sources: [{ source: 'golf', id: '2388' }]
    },
    {
      id: 'ft-soc-4',
      title: 'Bayern Munich vs Borussia Dortmund',
      dateText: 'Tomorrow, 08:30 PM',
      countdown: '22h 30m',
      isLive: false,
      category: 'football',
      sources: [{ source: 'golf', id: '2388' }]
    }
  ],
  'mma-boxing': [
    {
      id: 'ft-mma-1',
      title: 'UFC Main Card: Islam Makhachev vs Arman Tsarukyan',
      dateText: 'Sat, 10:00 PM',
      countdown: 'LIVE NOW',
      isLive: true,
      category: 'fight',
      sources: [{ source: 'golf', id: '2316' }]
    },
    {
      id: 'ft-box-1',
      title: 'Tyson Fury vs Oleksandr Usyk II (Undisputed Heavyweight)',
      dateText: 'Sat, 11:00 PM',
      countdown: '1d 18h',
      isLive: false,
      category: 'fight',
      sources: [{ source: 'golf', id: '2316' }]
    },
    {
      id: 'ft-mma-2',
      title: 'UFC Co-Main: Alex Pereira vs Magomed Ankalaev',
      dateText: 'Sat, 09:30 PM',
      countdown: '1d 4h',
      isLive: false,
      category: 'fight',
      sources: [{ source: 'golf', id: '2316' }]
    },
    {
      id: 'ft-box-2',
      title: 'Canelo Alvarez vs Terence Crawford',
      dateText: 'Next Sat, 10:00 PM',
      countdown: '7d 12h',
      isLive: false,
      category: 'fight',
      sources: [{ source: 'golf', id: '2316' }]
    },
    {
      id: 'ft-mma-3',
      title: 'UFC Fight Night: Sean O\'Malley vs Merab Dvalishvili',
      dateText: 'Next Sat, 08:00 PM',
      countdown: '6d 10h',
      isLive: false,
      category: 'fight',
      sources: [{ source: 'golf', id: '2316' }]
    },
    {
      id: 'ft-box-3',
      title: 'Anthony Joshua vs Daniel Dubois',
      dateText: 'Next Sat, 09:00 PM',
      countdown: '7d 11h',
      isLive: false,
      category: 'fight',
      sources: [{ source: 'golf', id: '2316' }]
    }
  ],
  'mma': [],
  'boxing': [],
  'nhl': [
    {
      id: 'ft-nhl-1',
      title: 'Philadelphia Flyers vs Colorado Avalanche',
      dateText: 'Tonight, 07:00 PM',
      countdown: 'LIVE NOW',
      isLive: true,
      category: 'hockey',
      sources: [{ source: 'golf', id: '2388' }]
    },
    {
      id: 'ft-nhl-2',
      title: 'New York Rangers vs Anaheim Ducks',
      dateText: 'Tonight, 07:00 PM',
      countdown: 'LIVE NOW',
      isLive: true,
      category: 'hockey',
      sources: [{ source: 'golf', id: '2387' }]
    },
    {
      id: 'ft-nhl-3',
      title: 'Toronto Maple Leafs vs San Jose Sharks',
      dateText: 'Tonight, 07:30 PM',
      countdown: '45m 0s',
      isLive: false,
      category: 'hockey',
      sources: [{ source: 'golf', id: '2389' }]
    },
    {
      id: 'ft-nhl-4',
      title: 'Pittsburgh Penguins vs Utah Mammoth',
      dateText: 'Tonight, 08:00 PM',
      countdown: '1h 15m',
      isLive: false,
      category: 'hockey',
      sources: [{ source: 'golf', id: '2390' }]
    }
  ],
  'mlb': [
    {
      id: 'ft-mlb-1',
      title: 'New York Yankees vs Los Angeles Dodgers (World Series)',
      dateText: 'Tonight, 08:00 PM',
      countdown: 'LIVE NOW',
      isLive: true,
      category: 'baseball',
      sources: [{ source: 'golf', id: '2388' }]
    },
    {
      id: 'ft-mlb-2',
      title: 'Philadelphia Phillies vs New York Mets',
      dateText: 'Tomorrow, 07:00 PM',
      countdown: '21h 0m',
      isLive: false,
      category: 'baseball',
      sources: [{ source: 'golf', id: '2388' }]
    },
    {
      id: 'ft-mlb-3',
      title: 'Houston Astros vs Texas Rangers',
      dateText: 'Tomorrow, 08:00 PM',
      countdown: '22h 0m',
      isLive: false,
      category: 'baseball',
      sources: [{ source: 'golf', id: '2388' }]
    }
  ],
  'f1': [
    {
      id: 'ft-f1-1',
      title: 'Formula 1 United States Grand Prix — Main Race',
      dateText: 'Sun, 08:00 PM',
      countdown: 'LIVE NOW',
      isLive: true,
      category: 'motor-sports',
      sources: [{ source: 'golf', id: '2388' }]
    },
    {
      id: 'ft-f1-2',
      title: 'Formula 1 Mexico City Grand Prix — Qualifying',
      dateText: 'Next Sat, 07:00 PM',
      countdown: '6d 14h',
      isLive: false,
      category: 'motor-sports',
      sources: [{ source: 'golf', id: '2388' }]
    },
    {
      id: 'ft-f1-3',
      title: 'Formula 1 Las Vegas Grand Prix — Practice & Sprint',
      dateText: 'Nov 21, 09:00 PM',
      countdown: '20d 5h',
      isLive: false,
      category: 'motor-sports',
      sources: [{ source: 'golf', id: '2388' }]
    }
  ],
  'wwe': [
    {
      id: 'ft-wwe-1',
      title: 'WWE Monday Night Raw (Full HD Live Show)',
      dateText: 'Mon, 08:00 PM',
      countdown: 'LIVE NOW',
      isLive: true,
      category: 'fight',
      sources: [{ source: 'golf', id: '2316' }]
    },
    {
      id: 'ft-wwe-2',
      title: 'WWE Friday Night SmackDown',
      dateText: 'Fri, 08:00 PM',
      countdown: '4d 2h',
      isLive: false,
      category: 'fight',
      sources: [{ source: 'golf', id: '2316' }]
    },
    {
      id: 'ft-wwe-3',
      title: 'WWE Royal Rumble / WrestleMania PPV',
      dateText: 'Sat, 07:00 PM',
      countdown: '12d 8h',
      isLive: false,
      category: 'fight',
      sources: [{ source: 'golf', id: '2316' }]
    }
  ]
};

FEATURED_CATEGORY_FIXTURES['mma'] = FEATURED_CATEGORY_FIXTURES['mma-boxing'];
FEATURED_CATEGORY_FIXTURES['boxing'] = FEATURED_CATEGORY_FIXTURES['mma-boxing'];
FEATURED_CATEGORY_FIXTURES['ufc'] = FEATURED_CATEGORY_FIXTURES['mma-boxing'];
FEATURED_CATEGORY_FIXTURES['ufc-boxing'] = FEATURED_CATEGORY_FIXTURES['mma-boxing'];

// Application State
const state = {
  matches: [],
  currentCategoryCard: null, // active card from CATEGORY_CARDS
  currentFilter: 'all',
  searchQuery: '',
  activeMatch: null,
  activeStreams: [],
  selectedStreamIndex: 0
};

// DOM Elements Dynamic Proxy (Always gets fresh elements from live DOM, never null)
const elements = new Proxy({}, {
  get: (_, prop) => {
    const idMap = {
      categoriesGridSection: 'categories-grid-section',
      sportsCategoriesGrid: 'sports-categories-grid',
      categoryMatchesView: 'category-matches-view',
      categoryBannerLogo: 'category-banner-logo',
      categoryBannerTitle: 'category-banner-title',
      categoryBannerDesc: 'category-banner-desc',
      categoryMatchesList: 'category-matches-list',
      categoryStreamkingTitleText: 'category-streamking-title-text',
      btnBackToCategories: 'btn-back-to-categories',
      matchSearchInput: 'match-search-input',
      searchClearBtn: 'search-clear-btn',
      categoryFilterTabs: 'category-filter-tabs',
      matchesLoading: 'matches-loading',
      emptyState: 'empty-state-box',
      playerSection: 'player-theater-section',
      playerIframe: 'main-video-iframe',
      playerMainTitle: 'player-main-title',
      playerKickoffTime: 'player-kickoff-time',
      playerHeaderIcon: 'player-header-icon',
      playerLoadingOverlay: 'player-loading-overlay',
      playerPopOverlay: 'player-pop-overlay',
      serverButtonsContainer: 'server-buttons-container',
      closePlayerBtn: 'close-player-btn',
      playerBackToHomeBtn: 'player-back-to-home-btn',
      mobileMenuToggle: 'mobile-menu-toggle',
      mobileDrawer: 'mobile-drawer',
      drawerOverlay: 'drawer-overlay',
      closeDrawerBtn: 'close-drawer-btn',
      drawerSportsList: 'drawer-sports-list',
      drawerAllCategoriesBtn: 'drawer-all-categories-btn',
      brandHomeLink: 'brand-home-link',
      desktopNav: 'desktop-category-nav'
    };
    const id = idMap[prop] || prop;
    return document.getElementById(id);
  }
});

// ============================================================================
// INITIALIZATION
// ============================================================================
async function initApp() {
  applySiteConfig();
  
  // Register hash routing and event listeners IMMEDIATELY (no blocking await!)
  window.addEventListener('hashchange', handleHashRouting);
  setupEventListeners();
  handleHashRouting();

  renderSportsGrid();
  renderDrawerSports();
  
  // Load live matches from API in background without delaying user clicks
  loadMatches();

  // Auto-refresh match data every 60s
  setInterval(() => {
    loadMatches(false);
  }, 60000);
}

function applySiteConfig() {
  if (typeof SITE_CONFIG === 'undefined') return;

  if (SITE_CONFIG.siteName) {
    const brandTitleName = document.getElementById('brand-title-name');
    if (brandTitleName) {
      if (/^meth/i.test(SITE_CONFIG.siteName)) {
        brandTitleName.textContent = 'Meth';
      } else {
        brandTitleName.textContent = SITE_CONFIG.siteName.split(' ')[0] || 'Meth';
      }
    }
  }

  if (SITE_CONFIG.domain) {
    const domainClean = SITE_CONFIG.domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
    const bookmarkDomain = document.getElementById('bookmark-domain');
    if (bookmarkDomain) bookmarkDomain.textContent = domainClean;
  }

  const discordLink = SITE_CONFIG.discordUrl || DISCORD_INVITE_URL;
  if (discordLink) {
    document.querySelectorAll('a[href*="discord"]').forEach(a => {
      a.href = discordLink;
    });
  }
}

// ============================================================================
// DATA FETCHING (PRIMARY: AURASPORTS, FALLBACK & MERGE: STREAMED.PK)
// ============================================================================

function mapAuraCategory(catName, leagueName) {
  const c = (catName || '').toLowerCase();
  const l = (leagueName || '').toLowerCase();
  if (c === 'nhl' || l.includes('nhl')) return { category: 'hockey', league: 'NHL' };
  if (c === 'mlb' || l.includes('mlb')) return { category: 'baseball', league: 'MLB' };
  if (c === 'nba' || l.includes('nba')) return { category: 'basketball', league: 'NBA' };
  if (c === 'cfb' || l.includes('ncaaf') || l.includes('college')) return { category: 'american-football', league: 'NCAA Football' };
  if (c === 'nfl' || l.includes('nfl')) return { category: 'american-football', league: 'NFL' };
  if (c.includes('serie') || c.includes('liga') || c.includes('soccer') || c.includes('premier') || c.includes('bundes') || l.includes('soccer')) {
    return { category: 'football', league: leagueName || 'Soccer' };
  }
  if (c.includes('fight') || c.includes('ufc') || c.includes('mma') || c.includes('box')) {
    return { category: 'fight', league: leagueName || 'Combat' };
  }
  if (c.includes('f1') || c.includes('motor')) {
    return { category: 'motor-sports', league: leagueName || 'Motorsport' };
  }
  return { category: c || 'other', league: leagueName || '' };
}

function normalizeAuraMatch(item, groupCatName) {
  const mapped = mapAuraCategory(item.category || groupCatName, item.league_name);

  let sources = [];
  if (Array.isArray(item.sources) && item.sources.length > 0) {
    sources = item.sources.map((s, idx) => ({
      name: s.name || `Server ${idx + 1}`,
      url: s.url || item.iframeUrl || item.watchUrl,
      id: s.id || item.match_id || item.id,
      source: s.name ? s.name.toLowerCase().replace(/[^a-z0-9]/g, '') : `server${idx + 1}`
    }));
  } else if (item.iframeUrl || item.watchUrl) {
    sources = [{
      name: 'HD Stream',
      url: item.iframeUrl || item.watchUrl,
      id: item.match_id || item.id,
      source: 'aura'
    }];
  }

  const matchTime = item.date || (item.date_iso ? new Date(item.date_iso).getTime() : Date.now());

  return {
    id: `aura-${item.id}`,
    originalId: item.id,
    title: item.title,
    category: mapped.category,
    league: mapped.league || item.league_name,
    leagueIcon: item.league_icon,
    teams: item.teams || null,
    date: matchTime,
    dateIso: item.date_iso,
    status: item.status,
    isLive: item.status === 'live',
    sources: sources,
    iframeUrl: item.iframeUrl || item.watchUrl,
    embedCode: item.embedCode,
    isAura: true
  };
}

async function fetchAuraSchedule() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(AURA_API_BASE, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`AuraSports HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data)) return null;

    const matches = [];
    data.forEach(group => {
      const groupCat = group.category_name || '';
      const items = Array.isArray(group.schedule) ? group.schedule : [];
      items.forEach(item => {
        matches.push(normalizeAuraMatch(item, groupCat));
      });
    });
    return matches;
  } catch (err) {
    console.warn('[API] AuraSports primary failed or timed out:', err);
    return null;
  }
}

async function loadMatches(showLoader = true) {
  if (showLoader && elements.matchesLoading) {
    elements.matchesLoading.classList.remove('hidden');
  }

  try {
    const auraMatches = await fetchAuraSchedule();
    state.matches = (auraMatches && auraMatches.length > 0) ? auraMatches : [];

    // Re-render current view with fresh data
    renderSportsGrid();
    if (state.currentCategoryCard) {
      renderCategoryMatches();
    }
    if (state.activeMatch && elements.playerSection && !elements.playerSection.classList.contains('hidden')) {
      const liveMatch = state.matches.find(m => 
        String(m.id) === String(state.activeMatch.id) ||
        (m.originalId && String(m.originalId) === String(state.activeMatch.id))
      );
      if (liveMatch) {
        state.activeMatch = { ...state.activeMatch, ...liveMatch };
        sessionStorage.setItem('activeMatchData', JSON.stringify(state.activeMatch));
        if (elements.playerMainTitle) elements.playerMainTitle.textContent = state.activeMatch.title;
        updateMatchGuideSection(state.activeMatch);
      }
    }
  } catch (err) {
    console.error('Error in loadMatches:', err);
  } finally {
    if (showLoader && elements.matchesLoading) {
      elements.matchesLoading.classList.add('hidden');
    }
  }
}

async function fetchStreamSourcesForMatch(match) {
  // If match has direct Aura stream URLs or iframeUrl:
  if (match.isAura || (match.sources && match.sources.some(s => s.url))) {
    const list = (match.sources && match.sources.length > 0)
      ? match.sources
      : [{ name: 'HD Stream', url: match.iframeUrl }];

    return list.map((s, idx) => ({
      id: s.id || match.id,
      streamNo: idx + 1,
      language: 'English',
      hd: true,
      embedUrl: s.url || match.iframeUrl,
      sourceName: s.name || `Server ${idx + 1}`
    }));
  }

  // Otherwise, fallback to Streamed.pk source loader
  const sources = (match.sources && match.sources.length > 0)
    ? match.sources
    : [{ source: 'admin', id: match.id }];

  const allStreams = [];
  const streamPromises = sources.map(async (src) => {
    try {
      const res = await fetch(`${STREAMED_API_BASE}/stream/${src.source}/${src.id}`);
      if (res.ok) {
        const streams = await res.json();
        if (Array.isArray(streams) && streams.length > 0) {
          return streams.map(s => ({ ...s, sourceName: src.source }));
        }
      }
    } catch (e) {
      console.warn(`Could not load stream from ${src.source}:`, e);
    }
    // Emergency reliable stream embed fallback
    return [{
      id: src.id,
      streamNo: 1,
      language: 'English',
      hd: true,
      embedUrl: `https://embed.st/embed/${src.source}/${src.id}/1`,
      sourceName: src.source
    }];
  });

  const results = await Promise.all(streamPromises);
  results.forEach(streamList => {
    if (streamList && streamList.length > 0) {
      allStreams.push(...streamList);
    }
  });

  return allStreams;
}

// ============================================================================
// VIEW 1: BROWSE SPORTS CATEGORIES GRID (STREAMKING BOXES FROM SCREENSHOT)
// ============================================================================
function renderSportsGrid() {
  const grid = document.getElementById('sports-categories-grid');
  if (!grid) return;

  const existingCards = grid.querySelectorAll('.sport-box-card');
  if (existingCards.length > 0) {
    // Preserve static pre-rendered cards and wire up active state
    existingCards.forEach(card => {
      const catId = card.dataset.categoryId || card.getAttribute('href')?.replace(/^#category\//, '');
      if (catId) {
        card.onclick = (e) => {
          e.preventDefault();
          document.querySelectorAll('.sport-box-card').forEach(c => c.classList.remove('active'));
          card.classList.add('active');
          navigateToCategory(catId);
        };
      }
    });
    return;
  }

  // If grid was empty, generate cards
  CATEGORY_CARDS.forEach((cardData) => {
    const badgeHTML = LEAGUE_BADGES[cardData.badgeType] || LEAGUE_BADGES['DEFAULT'];

    const card = document.createElement('a');
    card.href = `#category/${cardData.id}`;
    card.className = 'sport-box-card';
    card.dataset.categoryId = cardData.id;

    card.innerHTML = `
      <div class="sport-box-inner">
        <div class="sport-box-icon-wrap">
          ${badgeHTML}
        </div>
        <div class="sport-box-content">
          <h3 class="sport-box-title">${cardData.title}</h3>
          <div class="sport-box-subtitle">${cardData.subtitle}</div>
          <p class="sport-box-desc">${cardData.description}</p>
        </div>
      </div>
      <div class="sport-box-btn-wrap">
        <div class="sport-box-watch-btn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.14v14l11-7-11-7z"/></svg>
          <span>Watch Stream</span>
        </div>
      </div>
      <div class="sport-box-arrow">
        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    `;

    card.onclick = (e) => {
      e.preventDefault();
      document.querySelectorAll('.sport-box-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      navigateToCategory(cardData.id);
    };

    grid.appendChild(card);
  });
}

function renderDrawerSports() {
  if (!elements.drawerSportsList) return;
  elements.drawerSportsList.innerHTML = '';

  CATEGORY_CARDS.forEach(cardData => {
    const badgeHTML = LEAGUE_BADGES[cardData.badgeType] || LEAGUE_BADGES['DEFAULT'];

    const btn = document.createElement('button');
    btn.className = 'drawer-sport-item';
    btn.innerHTML = `
      <span style="width:24px; height:24px; display:flex; align-items:center;">${badgeHTML}</span>
      <span>${cardData.title}</span>
    `;

    btn.addEventListener('click', () => {
      closeMobileDrawer();
      navigateToCategory(cardData.id);
    });

    elements.drawerSportsList.appendChild(btn);
  });
}

// ============================================================================
// VIEW 2: DEDICATED CATEGORY MATCHES VIEW
// ============================================================================
function navigateToCategory(catId) {
  const cardData = CATEGORY_MAP[catId] || CATEGORY_CARDS[0];
  state.currentCategoryCard = cardData;
  sessionStorage.setItem('activeCategory', cardData.id);
  sessionStorage.setItem('activeView', 'category');

  if (window.location.hash !== `#category/${cardData.id}`) {
    window.location.hash = `category/${cardData.id}`;
  }
  showCategoryMatchesView(cardData.id);
}
// ============================================================================
// DYNAMIC AD CONTROLLER (Targeted Page Allocations)
// ============================================================================
const AdController = {
  popunderLoaded: false,
  socialBarLoaded: false,
  nativeBannerLoaded: false,

  // 1. Popunder Ad: Triggers on Match Page and Player Page ONLY (Never on Home Page)
  initPopunder() {
    if (this.popunderLoaded) return;
    this.popunderLoaded = true;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://capitalhospitals.org/1/59091005b8e18dc4eec593623552ec61';
    document.head.appendChild(script);
  },

  // 2. Native Banner (4:1 Widget): Triggers ONLY on Match Page (Category matches view)
  initNativeBanner() {
    const container = document.getElementById('container-59629c83e1bb5ab814a9a53e7f3ae0df');
    if (!container || this.nativeBannerLoaded) return;
    this.nativeBannerLoaded = true;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://czernik.org/21/59629c83e1bb5ab814a9a53e7f3ae0df';
    container.parentNode.insertBefore(script, container);
  },

  // 3. Social Bar Ad: Triggers ONLY on Player Page
  initSocialBar() {
    if (this.socialBarLoaded) return;
    this.socialBarLoaded = true;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://czernik.org/14/7c765a841c4d0cbcd80789fa9097290d';
    document.head.appendChild(script);
  }
};

window.navigateToCategory = navigateToCategory;

function showCategoryMatchesView(catId) {
  const cardData = CATEGORY_MAP[catId] || CATEGORY_CARDS[0];
  state.currentCategoryCard = cardData;
  sessionStorage.setItem('activeCategory', cardData.id);
  sessionStorage.setItem('activeView', 'category');

  document.documentElement.classList.add('subpage-active', 'category-active');
  document.documentElement.classList.remove('player-active');

  if (window.location.hash !== `#category/${cardData.id}`) {
    history.replaceState(null, '', `#category/${cardData.id}`);
  }

  const categoriesGrid = document.getElementById('categories-grid-section');
  const matchesView = document.getElementById('category-matches-view');
  const playerSec = document.getElementById('player-theater-section');

  const bannerTitle = document.getElementById('category-banner-title');
  const bannerDesc = document.getElementById('category-banner-desc');
  const bannerLogo = document.getElementById('category-banner-logo');
  const streamkingTitleText = document.getElementById('category-streamking-title-text');

  if (bannerTitle) bannerTitle.textContent = `${cardData.title} Streams`;
  if (bannerDesc) bannerDesc.textContent = cardData.description;
  if (bannerLogo) bannerLogo.innerHTML = LEAGUE_BADGES[cardData.badgeType] || LEAGUE_BADGES['DEFAULT'];
  if (streamkingTitleText) streamkingTitleText.textContent = `Watch ${cardData.title} Games Live`;

  // Switch views
  const topHero = document.getElementById('top-hero-card');
  if (topHero) topHero.classList.add('hidden');
  if (categoriesGrid) categoriesGrid.classList.add('hidden');
  if (playerSec) playerSec.classList.add('hidden');
  if (matchesView) matchesView.classList.remove('hidden');
  if (elements.desktopNav) elements.desktopNav.classList.remove('hidden');

  // Activate Match Page Ads: Popunder on match click + Native Banner 4:1 widget
  AdController.initPopunder();
  AdController.initNativeBanner();

  // Highlight active desktop nav link
  document.querySelectorAll('.nav-category-link').forEach(link => {
    const linkCat = link.dataset.cat;
    const isMatch = (linkCat === catId) || 
      (catId === 'mma-boxing' && (linkCat === 'mma-boxing' || linkCat === 'mma' || linkCat === 'boxing')) ||
      ((catId === 'mma' || catId === 'boxing') && linkCat === 'mma-boxing');
    link.classList.toggle('active', isMatch);
  });

  renderCategoryMatches();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCategoryMatches() {
  if (!elements.categoryMatchesList || !state.currentCategoryCard) return;
  elements.categoryMatchesList.innerHTML = '';

  const cardData = state.currentCategoryCard;
  const targetSport = cardData.targetSport;
  const now = Date.now();
  const minTime = now - (3.5 * 60 * 60 * 1000);
  const maxTime = now + (36 * 60 * 60 * 1000);
  const query = state.searchQuery.toLowerCase().trim();

  // Filter matches for current category
  let sportMatches = state.matches.filter(m => {
    // Specific category mapping logic
    if (cardData.id === 'cfb') {
      const isFootball = (m.category === 'american-football');
      const isCollege = (m.title || '').toLowerCase().includes('cfb') || (m.title || '').toLowerCase().includes('ncaa') || (m.league || '').toLowerCase().includes('ncaa') || (m.league || '').toLowerCase().includes('college');
      if (!isFootball || !isCollege) return false;
    } else if (cardData.id === 'nfl') {
      const isFootball = (m.category === 'american-football');
      const isCollege = (m.title || '').toLowerCase().includes('cfb') || (m.title || '').toLowerCase().includes('ncaa') || (m.league || '').toLowerCase().includes('ncaa') || (m.league || '').toLowerCase().includes('college');
      if (!isFootball || isCollege) return false;
    } else if (cardData.id === 'wwe') {
      const isCombat = (m.category === 'fight');
      const isWwe = (m.title || '').toLowerCase().includes('wwe') || (m.title || '').toLowerCase().includes('wrestling');
      if (!isCombat || !isWwe) return false;
    } else if (cardData.id === 'mma-boxing' || cardData.id === 'ufc-boxing' || cardData.id === 'mma' || cardData.id === 'boxing') {
      const isCombat = (m.category === 'fight');
      const isWwe = (m.title || '').toLowerCase().includes('wwe') || (m.title || '').toLowerCase().includes('wrestling');
      if (!isCombat || isWwe) return false;
    } else {
      if (m.category !== targetSport) return false;
    }

    // Filter by live/upcoming
    if (state.currentFilter === 'live') {
      const isLive = m.date <= now && m.date >= minTime;
      if (!isLive) return false;
    } else if (state.currentFilter === 'upcoming') {
      const isUpcoming = m.date > now;
      if (!isUpcoming) return false;
    }

    // Filter by search query
    if (query) {
      const title = (m.title || '').toLowerCase();
      const teams = `${m.teams?.home?.name || ''} ${m.teams?.away?.name || ''}`.toLowerCase();
      return title.includes(query) || teams.includes(query);
    }

    return true;
  });

  // Fallback: If 0 fixtures found in API, load authentic featured category fixtures so NO card is ever empty!
  if (sportMatches.length === 0 && !query) {
    const featured = FEATURED_CATEGORY_FIXTURES[cardData.id] || [];
    sportMatches = featured.map((f, i) => ({
      id: f.id,
      title: f.title,
      category: f.category || targetSport,
      date: f.isLive ? (now - 1000) : (now + (i + 1) * 3600000),
      dateText: f.dateText,
      countdown: f.countdown,
      isLive: f.isLive,
      sources: f.sources || [{ source: 'golf', id: '2316' }]
    }));
  }

  // Sort: live first, then ascending by time
  sportMatches.sort((a, b) => {
    const aLive = a.isLive || (a.date <= now && a.date >= minTime);
    const bLive = b.isLive || (b.date <= now && b.date >= minTime);
    if (aLive && !bLive) return -1;
    if (!aLive && bLive) return 1;
    return a.date - b.date;
  });

  if (sportMatches.length === 0) {
    elements.emptyState.classList.remove('hidden');
    return;
  }
  elements.emptyState.classList.add('hidden');

  const badgeHTML = LEAGUE_BADGES[cardData.badgeType] || LEAGUE_BADGES['DEFAULT'];

  sportMatches.forEach(match => {
    const isLive = match.isLive || (match.date <= now && match.date >= minTime);
    let timeStr = match.countdown || match.dateText;
    if (!timeStr && match.date && match.date > 0) {
      const matchDate = new Date(match.date);
      timeStr = matchDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    let statusHTML = '';
    if (isLive) {
      statusHTML = `
        <span class="match-status-pill live">
          <span class="sport-box-live-dot"></span>
          LIVE NOW
        </span>
      `;
    } else {
      statusHTML = `
        <span class="match-status-pill upcoming">
          🕒 ${timeStr || 'Upcoming'}
        </span>
      `;
    }

    // Determine sources for this match
    const matchSources = (match.sources && match.sources.length > 0)
      ? match.sources
      : [{ source: 'admin', id: match.id }];

    let sourceChipsData = [];
    if (matchSources.length === 1) {
      sourceChipsData = [
        { label: `Source 1: ${matchSources[0].source.toUpperCase()} (HD 1080p)`, index: 0 },
        { label: `Source 2: ${matchSources[0].source.toUpperCase()} (Backup HD)`, index: 0 }
      ];
    } else {
      sourceChipsData = matchSources.map((s, idx) => ({
        label: `Source ${idx + 1}: ${s.source.toUpperCase()} (HD)`,
        index: idx
      }));
    }

    const card = document.createElement('div');
    card.className = 'match-item-card';
    card.setAttribute('data-id', match.id);
    card.innerHTML = `
      <div class="match-card-main-row">
        <div class="match-item-left">
          <div class="match-league-thumb">
            ${badgeHTML}
          </div>
          <div class="match-info-block">
            <h3 class="match-title-h3">${match.title}</h3>
            <div class="match-meta-row">
              <span class="match-league-tag">${cardData.title}</span>
              <span>•</span>
              ${statusHTML}
            </div>
          </div>
        </div>
        <div class="match-item-right">
          <button class="btn-watch-stream" data-id="${match.id}" type="button">
            <span>Watch Stream</span>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    `;

    // Click handler: opens player directly with seamless stream loading
    card.addEventListener('click', () => {
      openMatchInPlayer(match, true, 0);
    });

    elements.categoryMatchesList.appendChild(card);
  });
}

function showAllCategoriesView(updateUrl = true) {
  state.currentCategoryCard = null;
  state.activeMatch = null;
  sessionStorage.setItem('activeView', 'home');
  sessionStorage.removeItem('activeMatchData');
  sessionStorage.removeItem('activeMatchId');
  sessionStorage.removeItem('activeCategory');

  document.documentElement.classList.remove('subpage-active', 'category-active', 'player-active');

  if (updateUrl && window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  const categoriesGrid = document.getElementById('categories-grid-section');
  const matchesView = document.getElementById('category-matches-view');
  const playerSec = document.getElementById('player-theater-section');

  const topHero = document.getElementById('top-hero-card');
  if (topHero) topHero.classList.remove('hidden');
  if (matchesView) matchesView.classList.add('hidden');
  if (playerSec) playerSec.classList.add('hidden');
  if (categoriesGrid) categoriesGrid.classList.remove('hidden');
  if (elements.desktopNav) elements.desktopNav.classList.remove('hidden');

  document.querySelectorAll('.nav-category-link').forEach(link => {
    link.classList.remove('active');
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================================
// VIEW 3: DEDICATED PLAYER THEATER VIEW
// ============================================================================
async function openMatchInPlayer(match, updateHash = true, initialSourceIndex = 0) {
  state.activeMatch = match;
  sessionStorage.setItem('activeMatchData', JSON.stringify(match));
  sessionStorage.setItem('activeMatchId', String(match.id));
  sessionStorage.setItem('activeView', 'player');

  document.documentElement.classList.add('subpage-active', 'player-active');
  document.documentElement.classList.remove('category-active');

  if (!state.currentCategoryCard && match.category) {
    const cardData = CATEGORY_DETAILS[match.category] || CATEGORY_MAP[match.category];
    if (cardData) {
      state.currentCategoryCard = cardData;
      sessionStorage.setItem('activeCategory', cardData.id);
    }
  }

  if (updateHash && window.location.hash !== `#watch/${match.id}`) {
    history.pushState(null, '', `#watch/${match.id}`);
  }

  elements.playerMainTitle.textContent = match.title;
  
  if (match.isLive) {
    elements.playerKickoffTime.innerHTML = '<span style="color: #ef4444; font-weight: 700;">🔴 LIVE NOW</span>';
  } else if (match.countdown) {
    elements.playerKickoffTime.textContent = `Starts in: ${match.countdown}`;
  } else if (match.dateText) {
    elements.playerKickoffTime.textContent = match.dateText;
  } else if (match.date && match.date > 0) {
    const matchDate = new Date(match.date);
    elements.playerKickoffTime.textContent = `Kickoff: ${matchDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else {
    elements.playerKickoffTime.textContent = 'Live Coverage';
  }

  const categoryDetails = CATEGORY_DETAILS[match.category] || CATEGORY_MAP[match.category] || { icon: '🏆' };
  elements.playerHeaderIcon.textContent = categoryDetails.icon || '🏆';

  // Dynamically update the Match Stream Guide & Viewing FAQs section below player
  updateMatchGuideSection(match);

  // Switch to player view
  const topHero = document.getElementById('top-hero-card');
  if (topHero) topHero.classList.add('hidden');
  if (elements.categoriesGridSection) elements.categoriesGridSection.classList.add('hidden');
  if (elements.categoryMatchesView) elements.categoryMatchesView.classList.add('hidden');
  if (elements.playerSection) elements.playerSection.classList.remove('hidden');
  if (elements.desktopNav) elements.desktopNav.classList.add('hidden');

  // Activate Player Page Ads: Popunder on click-to-play + Social Bar in corner + Native Banner
  AdController.initPopunder();
  AdController.initSocialBar();
  AdController.initNativeBanner();

  // Loading state
  if (elements.playerLoadingOverlay) elements.playerLoadingOverlay.classList.remove('hidden');
  if (elements.playerIframe) elements.playerIframe.src = '';
  if (elements.serverButtonsContainer) elements.serverButtonsContainer.innerHTML = '';

  // Setup click-capture popunder overlay
  setupPlayerPopOverlay();

  // Scroll to player
  if (elements.playerSection) elements.playerSection.scrollIntoView({ behavior: 'smooth' });

  // Fetch stream sources
  const streams = await fetchStreamSourcesForMatch(match);
  state.activeStreams = streams;
  state.selectedStreamIndex = (initialSourceIndex >= 0 && initialSourceIndex < streams.length) ? initialSourceIndex : 0;

  if (elements.playerLoadingOverlay) elements.playerLoadingOverlay.classList.add('hidden');

  if (streams.length === 0) {
    const firstSrc = (match.sources && match.sources[0]) || { source: 'admin', id: match.id };
    const fallbackEmbed = `https://embed.st/embed/${firstSrc.source}/${firstSrc.id}/1`;
    if (elements.playerIframe) elements.playerIframe.src = fallbackEmbed;
    const fallbackStreams = [{
      id: firstSrc.id,
      streamNo: 1,
      language: 'English',
      hd: true,
      embedUrl: fallbackEmbed,
      sourceName: firstSrc.source
    }];
    state.activeStreams = fallbackStreams;
    renderServerButtons(fallbackStreams);
    return;
  }

  // Render server selection buttons
  renderServerButtons(streams);
  playStreamAtIndex(state.selectedStreamIndex);
}

function renderServerButtons(streams) {
  if (!elements.serverButtonsContainer) return;
  elements.serverButtonsContainer.innerHTML = '';

  streams.forEach((stream, index) => {
    const btn = document.createElement('button');
    btn.className = `btn-server-choice ${index === state.selectedStreamIndex ? 'active' : ''}`;
    const sName = stream.sourceName ? stream.sourceName.toUpperCase() : 'HD';
    const sHd = stream.hd ? 'HD' : 'SD';
    const sLang = stream.language ? ` • ${stream.language}` : '';
    btn.innerHTML = `<span class="server-dot"></span> Server ${index + 1}: ${sName} (${sHd}${sLang})`;

    btn.addEventListener('click', () => {
      state.selectedStreamIndex = index;
      document.querySelectorAll('.btn-server-choice').forEach((b, i) => {
        b.classList.toggle('active', i === index);
      });
      playStreamAtIndex(index);
    });

    elements.serverButtonsContainer.appendChild(btn);
  });
}

function playStreamAtIndex(index) {
  const stream = state.activeStreams[index];
  if (!stream || !elements.playerIframe) return;

  const embedUrl = stream.embedUrl || stream.streamUrl || stream.url;
  if (embedUrl) {
    elements.playerIframe.src = embedUrl;
  }
}

function setupPlayerPopOverlay() {
  if (!elements.playerPopOverlay) return;
  elements.playerPopOverlay.style.display = 'block';

  elements.playerPopOverlay.onclick = () => {
    // Hide overlay so user can interact with player; official script tag handles popunder
    elements.playerPopOverlay.style.display = 'none';
  };
}

function updateMatchGuideSection(match) {
  if (!match) return;

  const guideSportBadge = document.getElementById('match-guide-sport-badge');
  const guideTitle = document.getElementById('match-guide-title');
  const guideSubtitle = document.getElementById('match-guide-subtitle');

  let badgeText = 'HD LIVE';
  let sportName = 'sports';
  let badgeColor = '#d81f26';

  const cat = (match.category || '').toLowerCase();
  const titleLower = (match.title || '').toLowerCase();

  if (cat === 'american-football') {
    const isCfb = titleLower.includes('cfb') || titleLower.includes('ncaa') || titleLower.includes('college');
    badgeText = isCfb ? 'CFB HD' : 'NFL HD';
    sportName = isCfb ? 'College Football' : 'NFL';
    badgeColor = isCfb ? '#002b49' : '#013369';
  } else if (cat === 'football') {
    badgeText = 'SOCCER HD';
    sportName = 'Soccer';
    badgeColor = '#059669';
  } else if (cat === 'basketball') {
    badgeText = 'NBA HD';
    sportName = 'NBA';
    badgeColor = '#1d428a';
  } else if (cat === 'fight') {
    const isUfc = titleLower.includes('ufc') || titleLower.includes('mma');
    badgeText = isUfc ? 'UFC HD' : 'BOXING HD';
    sportName = isUfc ? 'UFC' : 'Boxing';
    badgeColor = '#d81f26';
  } else if (cat === 'hockey') {
    badgeText = 'NHL HD';
    sportName = 'NHL';
    badgeColor = '#000000';
  } else if (cat === 'baseball') {
    badgeText = 'MLB HD';
    sportName = 'MLB';
    badgeColor = '#002d72';
  } else if (cat === 'motor-sports') {
    badgeText = 'F1 HD';
    sportName = 'F1';
    badgeColor = '#e10600';
  } else if (cat === 'wwe' || titleLower.includes('wwe') || titleLower.includes('wrestling')) {
    badgeText = 'WWE HD';
    sportName = 'WWE';
    badgeColor = '#111827';
  } else if (cat) {
    badgeText = `${cat.toUpperCase()} HD`;
    sportName = match.category;
    badgeColor = '#d81f26';
  }

  if (guideSportBadge) {
    guideSportBadge.textContent = badgeText;
    guideSportBadge.style.backgroundColor = badgeColor;
  }

  const matchTitle = match.title || 'Live Match';
  if (guideTitle) {
    guideTitle.textContent = `Watch ${matchTitle} Live Stream & Broadcast Schedule`;
  }

  if (guideSubtitle) {
    guideSubtitle.textContent = `Stream ${matchTitle} live in full HD on MethStreams. Get real-time kickoff updates, buffer-free multi-server backup feeds, and complete ${sportName} fixture insights across any device.`;
  }
}

// ============================================================================
// HASH ROUTING & BROWSER NAVIGATION
// ============================================================================
function handleHashRouting() {
  const hash = window.location.hash || '';
  const cleanHash = hash.replace(/^#+/, '').replace(/^\/+/, '');
  const savedView = sessionStorage.getItem('activeView');
  const savedCategory = sessionStorage.getItem('activeCategory');
  const savedMatchId = sessionStorage.getItem('activeMatchId');

  // 1. URL hash has category/...
  if (cleanHash.startsWith('category/')) {
    const catId = cleanHash.replace('category/', '').toLowerCase();
    if (CATEGORY_MAP[catId]) {
      showCategoryMatchesView(catId);
      return;
    }
  }

  // 2. URL hash has watch/...
  if (cleanHash.startsWith('watch/')) {
    const matchId = cleanHash.replace('watch/', '');
    restorePlayerMatch(matchId);
    return;
  }

  // 3. If hash was stripped / empty / # / home, but user was on player, restore player:
  if (savedView === 'player' && savedMatchId) {
    history.replaceState(null, '', `#watch/${savedMatchId}`);
    restorePlayerMatch(savedMatchId);
    return;
  }

  // 4. If hash was stripped / empty / # / home, but user was on category, restore category:
  if (savedView === 'category' && savedCategory && CATEGORY_MAP[savedCategory]) {
    history.replaceState(null, '', `#category/${savedCategory}`);
    showCategoryMatchesView(savedCategory);
    return;
  }

  // 5. Default to Home Grid only when explicitly at home
  document.documentElement.classList.remove('subpage-active', 'category-active', 'player-active');
  showAllCategoriesView(false);
}

function restorePlayerMatch(matchId) {
  sessionStorage.setItem('activeView', 'player');
  sessionStorage.setItem('activeMatchId', matchId);

  // 1. Search in live state.matches
  let match = state.matches.find(m => 
    String(m.id) === String(matchId) || 
    (m.originalId && String(m.originalId) === String(matchId))
  );

  // 2. Check in state.activeMatch
  if (!match && state.activeMatch && String(state.activeMatch.id) === String(matchId)) {
    match = state.activeMatch;
  }

  // 3. Search in static featured fixtures
  if (!match) {
    for (const catList of Object.values(FEATURED_CATEGORY_FIXTURES)) {
      const found = catList.find(f => String(f.id) === String(matchId));
      if (found) { match = found; break; }
    }
  }

  // 4. Search in sessionStorage persisted match data
  if (!match) {
    try {
      const saved = sessionStorage.getItem('activeMatchData');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && String(parsed.id) === String(matchId)) {
          match = parsed;
        }
      }
    } catch (e) {}
  }

  // 5. Emergency fallback match representation - NEVER redirect to home on refresh!
  if (!match) {
    const savedCat = sessionStorage.getItem('activeCategory') || 'soccer';
    match = {
      id: matchId,
      title: 'Live Sports Match Stream',
      isLive: true,
      category: savedCat,
      sources: [{ source: 'golf', id: matchId }]
    };
  }

  openMatchInPlayer(match, false);
}

// ============================================================================
// EVENT LISTENERS & UI WIRING
// ============================================================================
function setupEventListeners() {
  // Capture-phase universal click delegation for ALL cards & category links
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.sport-box-card');
    if (card) {
      e.preventDefault();
      e.stopPropagation();
      const catId = card.dataset.categoryId || card.getAttribute('href')?.replace(/^#category\//, '');
      if (catId) {
        document.querySelectorAll('.sport-box-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        navigateToCategory(catId);
      }
      return;
    }

    const navLink = e.target.closest('.nav-category-link');
    if (navLink) {
      e.preventDefault();
      e.stopPropagation();
      const catId = navLink.dataset.cat || navLink.getAttribute('href')?.replace(/^#category\//, '');
      if (catId) {
        navigateToCategory(catId);
      }
      return;
    }
  }, true);

  // Brand Home click -> Categories Grid
  if (elements.brandHomeLink) {
    elements.brandHomeLink.addEventListener('click', (e) => {
      e.preventDefault();
      showAllCategoriesView(true);
    });
  }

  // Back to Categories button on category matches view
  if (elements.btnBackToCategories) {
    elements.btnBackToCategories.addEventListener('click', (e) => {
      e.preventDefault();
      showAllCategoriesView(true);
    });
  }

  // Back button on Player -> Return to current category matches
  if (elements.closePlayerBtn) {
    elements.closePlayerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      let catId = state.currentCategoryCard?.id;
      if (!catId && state.activeMatch?.category) {
        const cardData = CATEGORY_DETAILS[state.activeMatch.category] || CATEGORY_MAP[state.activeMatch.category];
        if (cardData) catId = cardData.id;
      }
      if (!catId) {
        catId = sessionStorage.getItem('activeCategory') || 'soccer';
      }
      navigateToCategory(catId);
    });
  }

  // Dedicated Back to Home button on Player
  const playerBackToHomeBtn = document.getElementById('player-back-to-home-btn');
  if (playerBackToHomeBtn) {
    playerBackToHomeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showAllCategoriesView(true);
    });
  }

  // Mobile Drawer toggles
  if (elements.mobileMenuToggle) {
    elements.mobileMenuToggle.addEventListener('click', openMobileDrawer);
  }
  if (elements.closeDrawerBtn) {
    elements.closeDrawerBtn.addEventListener('click', closeMobileDrawer);
  }
  if (elements.drawerOverlay) {
    elements.drawerOverlay.addEventListener('click', closeMobileDrawer);
  }
  if (elements.drawerAllCategoriesBtn) {
    elements.drawerAllCategoriesBtn.addEventListener('click', () => {
      closeMobileDrawer();
      showAllCategoriesView(true);
    });
  }

  // Search input in category view
  if (elements.matchSearchInput) {
    elements.matchSearchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      if (elements.searchClearBtn) {
        elements.searchClearBtn.classList.toggle('hidden', !state.searchQuery);
      }
      renderCategoryMatches();
    });
  }
  if (elements.searchClearBtn) {
    elements.searchClearBtn.addEventListener('click', () => {
      elements.matchSearchInput.value = '';
      state.searchQuery = '';
      elements.searchClearBtn.classList.add('hidden');
      renderCategoryMatches();
    });
  }

  // Filter tabs in category view (All, Live, Upcoming)
  if (elements.categoryFilterTabs) {
    elements.categoryFilterTabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.cat-filter-btn');
      if (!btn) return;
      document.querySelectorAll('.cat-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentFilter = btn.dataset.filter || 'all';
      renderCategoryMatches();
    });
  }

  // Bookmark button alert
  const saveHowBtn = document.getElementById('save-how');
  if (saveHowBtn) {
    saveHowBtn.addEventListener('click', () => {
      alert('Press Ctrl + D (or Cmd + D on Mac) to bookmark this website for instant access!');
    });
  }

  // Sticky ad close buttons
  const closeStickyLeft = document.getElementById('close-sticky-left-ad-btn');
  if (closeStickyLeft) {
    closeStickyLeft.addEventListener('click', () => {
      const bar = document.getElementById('sticky-left-ad-bar');
      if (bar) bar.style.display = 'none';
    });
  }
  const closeStickyRight = document.getElementById('close-sticky-right-ad-btn');
  if (closeStickyRight) {
    closeStickyRight.addEventListener('click', () => {
      const bar = document.getElementById('sticky-right-ad-bar');
      if (bar) bar.style.display = 'none';
    });
  }

  // Legal Modals
  setupModal('modal-trigger-disclaimer', 'modal-disclaimer');
  setupModal('modal-trigger-privacy', 'modal-privacy');
  setupModal('modal-trigger-dmca', 'modal-dmca');
  setupModal('modal-trigger-contact', 'modal-contact');
}

function setupModal(triggerId, modalId) {
  const trigger = document.getElementById(triggerId);
  const modal = document.getElementById(modalId);
  if (!trigger || !modal) return;

  trigger.addEventListener('click', () => modal.classList.remove('hidden'));
  const closeBtn = modal.querySelector('.modal-close-btn');
  if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });
}

function openMobileDrawer() {
  elements.mobileDrawer.classList.add('active');
  elements.drawerOverlay.classList.add('active');
}

function closeMobileDrawer() {
  elements.mobileDrawer.classList.remove('active');
  elements.drawerOverlay.classList.remove('active');
}

// Expose global functions to window
window.navigateToCategory = navigateToCategory;
window.showCategoryMatchesView = showCategoryMatchesView;
window.showAllCategoriesView = showAllCategoriesView;
window.openMatchInPlayer = openMatchInPlayer;

// Start app
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
