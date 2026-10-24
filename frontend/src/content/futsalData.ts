export interface Player {
  id: string;
  name: string;
  number: number;
  position: 'MÅLVAKT' | 'FÖRSVAR' | 'MITTFÄLT' | 'FORWARD' | 'LEDARE';
  roleCategory: 'ALL' | 'PLAYERS' | 'MANAGEMENT';
  image: string;
  isLeader?: boolean;
  nickname?: string;
  stats?: {
    matches: number;
    goals?: number;
    assists?: number;
    cleanSheets?: number;
  };
  quote?: string;
}

export const squadData: Player[] = [
  {
    id: 'elvis',
    name: 'Elvis Mesic',
    number: 1,
    position: 'MÅLVAKT',
    roleCategory: 'PLAYERS',
    image: '/images/players/elvis1M.JPG',
    isLeader: true,
    nickname: 'El Maestro',
    stats: { matches: 12, cleanSheets: 7, assists: 2 },
    quote: 'Snabbhet på små ytor och stenhård vinnarmentalitet.',
  },
  {
    id: 'marcelo',
    name: 'Marcelo Villa',
    number: 3,
    position: 'FÖRSVAR',
    roleCategory: 'PLAYERS',
    image: '/images/players/marcelo3B.PNG',
    isLeader: true,
    nickname: 'Generalen',
    stats: { matches: 12, goals: 6, assists: 8 },
    quote: 'Kompromisslös ledare och hårdhet i varje duell.',
  },
  {
    id: 'hugo',
    name: 'Hugo',
    number: 4,
    position: 'FORWARD',
    roleCategory: 'PLAYERS',
    image: '/images/players/hugo4A.JPG',
    isLeader: false,
    nickname: 'Måltjuven',
    stats: { matches: 10, goals: 12, assists: 5 },
    quote: 'Kyla i avsluten och ständigt hot framför kassen.',
  },
  {
    id: 'wael',
    name: 'Wael',
    number: 6,
    position: 'FORWARD',
    roleCategory: 'PLAYERS',
    image: '/images/players/wael6A.PNG',
    isLeader: false,
    nickname: 'Speedy',
    stats: { matches: 11, goals: 9, assists: 7 },
    quote: 'Explosiv snabbhet och oberäknelig i offensiven.',
  },
  {
    id: 'raffi',
    name: 'Raffi Medz',
    number: 7,
    position: 'MITTFÄLT',
    roleCategory: 'PLAYERS',
    image: '/images/players/raffi7K.JPG',
    isLeader: true,
    nickname: 'Magikern',
    stats: { matches: 14, goals: 11, assists: 15 },
    quote: 'Leder laget med passion och taktisk blick för spelet.',
  },
  {
    id: 'stefan',
    name: 'Stefan',
    number: 9,
    position: 'FORWARD',
    roleCategory: 'PLAYERS',
    image: '/images/players/stefan9A.JPG',
    isLeader: false,
    nickname: 'Sniper',
    stats: { matches: 12, goals: 14, assists: 6 },
    quote: 'Hårt skott och kliniska avslut när läget uppstår.',
  },
  {
    id: 'mehdi',
    name: 'Mehdi',
    number: 11,
    position: 'MITTFÄLT',
    roleCategory: 'PLAYERS',
    image: '/images/players/mehdi11K.JPG',
    isLeader: false,
    nickname: 'Teknikern',
    stats: { matches: 11, goals: 8, assists: 10 },
    quote: 'Fina fötter, snabb acceleration och vassa inspel längs kanten.',
  },
  {
    id: 'tro',
    name: 'Tro',
    number: 22,
    position: 'FÖRSVAR',
    roleCategory: 'PLAYERS',
    image: '/images/players/tro22B.JPG',
    isLeader: false,
    nickname: 'Klippan',
    stats: { matches: 10, goals: 3, assists: 5 },
    quote: 'Stabil i försvaret och brytsäker i varje närkamp.',
  },
  {
    id: 'wictor',
    name: 'Wictor',
    number: 24,
    position: 'FÖRSVAR',
    roleCategory: 'PLAYERS',
    image: '/images/players/wictor24B.JPG',
    isLeader: false,
    nickname: 'Järnmuren',
    stats: { matches: 12, goals: 4, assists: 6 },
    quote: 'Fysisk pondus och resoluta brytningar i defensiven.',
  },
];

export interface UpcomingMatch {
  homeTeam: string;
  awayTeam: string;
  homeLogo?: string;
  awayLogo?: string;
  date: string;
  time: string;
  venue: string;
  competition: string;
  status: string;
}

export const upcomingMatch: UpcomingMatch = {
  homeTeam: 'FUTSAL BOYS',
  awayTeam: 'RIVERDALE FUTSAL',
  date: 'LÖRDAG, 25 OKTOBER 2026',
  time: '19:00',
  venue: 'ARENA ÄLVHÖGSBORG, TROLLHÄTTAN',
  competition: 'SERIEPREMIÄR 2026/27',
  status: 'KOMMANDE MATCH',
};

export interface ClubNews {
  id: string;
  category: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  paragraphs: string[];
  quote?: string;
}

export const clubNewsList: ClubNews[] = [
  {
    id: 'intro-video',
    category: 'OFFICIELL INTRO',
    title: 'Premiär: Officiell introduktionsvideo för Futsal Boys är här!',
    summary: 'Se vår allra första officiella introduktionsvideo med ljudet på. Lär känna ledarna, truppen och passionen som driver klubben framåt.',
    date: '24 OKT 2026',
    readTime: '3 MIN LÄSNING',
    author: 'Raffi Medz, Elvis Mesic & Marcelo Villa',
    image: '/images/futsalboys-ledare.JPG',
    paragraphs: [
      'Idag är en stor milstolpe för hela föreningen, vi släpper äntligen vår allra första officiella introduktionsvideo för Futsal Boys Trollhättan! I videon får ni en exklusiv presentation av laget, sammanhållningen och den kompromisslösa energi som präglar varje träning och match.',
      'Från starten har vår vision varit glasklar: att bygga Trollhättans mest sevärda och sammansvetsade futsallag. Med ledarna Raffi Medz, Elvis Mesic och Marcelo Villa i spetsen samt en trupp full av talang och rutin är vi redo för säsongens alla cupäventyr och seriematcher i Arena Älvhögsborg.',
      'Se hela videon i full längd med ljudet på direkt här på sajten eller via våra sociala kanaler. Tack till alla supportrar som backar oss från dag ett, vi ses på parketten!',
    ],
    quote: 'Detta är bara början på resan. Vi spelar med hjärta, fart och stolthet för Trollhättan.',
  },
  {
    id: '1',
    category: 'MATCHRAPPORT',
    title: 'Futsal Boys säkrar dramatisk seger i cupkvartsfinalen',
    summary: 'En heroisk laginsats med intensiv press och snabba kontringar säkrade avancemang inför en jublande publik.',
    date: '12 OKT 2026',
    readTime: '3 MIN LÄSNING',
    author: 'Raffi Medz & Elvis Mesic',
    image: '/images/players/Lagfoto.JPG',
    paragraphs: [
      'Det var upplagt för en riktig rysare i kvartsfinalen när Futsal Boys klev in på parketten i ett fullsatt Arena Älvhögsborg. Med hög intensitet från första sekunden och en aggressiv press över hela banan visade laget direkt vem som bestämde takten.',
      'Efter en mållös och taktisk första period klev Elvis Mesic fram och dundrade in ledningsmålet via ribban efter en blixtsnabb kombination med Marcelo Villa. Motståndarna kvitterade visserligen kort därefter, men med blott två minuter kvar på matchklockan avgjordes matchen i en dramatisk kontring där hela laget exploderade i glädje.',
      'Stämningen i hallen var fullständigt elektrisk och vinsten säkrar nu en välförtjänt plats i semifinalen nästa vecka. Lagets sammanhållning, försvarsdisciplin och fysiska status fällde det slutgiltiga avgörandet.',
    ],
    quote: 'Vi visade ett enormt hjärta och höll oss till matchplanen i 40 minuter. Publiken bar oss framåt idag!',
  },
  {
    id: '2',
    category: 'KLUBBNYTT',
    title: 'Officiella matchtröjan för säsongen presenterad',
    summary: 'Designad i exklusivt kolfibersvart med elektriska neongröna accenter. Snart tillgänglig för beställning!',
    date: '08 OKT 2026',
    readTime: '2 MIN LÄSNING',
    author: 'Futsal Boys Media',
    image: '/images/futsalboys-ledare-breden.JPG',
    paragraphs: [
      'Efter veckor av förberedelser och noggrann design är Futsal Boys officiella matchställ äntligen här. Matchstället kombinerar en djup kolfibersvart bas med elektriska neongröna fartlinjer som speglar klubbens fartfyllda och kompromisslösa spelstil på futsalplanen.',
      'Tröjan är tillverkad i ett ultralätt funktionsmaterial optimerat för det snabba inomhusspelet med maximal ventilation, slitstyrka och rörelsefrihet. Det stilrena klubbemblemet i krom och neon pryder bröstet med stolthet.',
      'Supportrar och sponsorer kan nu förhandsbeställa tröjan samt den officiella klubbmerchen genom att skicka ett DM till oss direkt på Instagram (@grabbarna.futsal).',
    ],
    quote: 'Matchtröjan representerar vår identitet: mod, snabbhet och gemenskap i Trollhättan.',
  },
];

export interface InstagramProfile {
  handle: string;
  displayName: string;
  postsCount: number;
  followersCount: string;
  followingCount: number;
  bioLines: string[];
  avatar: string;
  posts: Array<{
    id: string;
    image: string;
    likes: number;
    caption: string;
  }>;
}

export const instagramData: InstagramProfile = {
  handle: 'grabbarna.futsal',
  displayName: 'FutsalBoys',
  postsCount: 18,
  followersCount: '1.4k',
  followingCount: 86,
  bioLines: [
    '⚽️ Officiella kontot för Trollhättan Futsal Boys',
    '🏆 Cuper • Matcher • Content',
    '📩 Samarbete / Kontakt: DM',
  ],
  avatar: '/images/futsalboys-logo.png',
  posts: [
    {
      id: 'p1',
      image: '/images/players/Lagfoto.JPG',
      likes: 184,
      caption: 'MÄSTARE! 🏆 Hela truppen samlad inför säsongens stora utmaningar. Tack till alla supportrar!',
    },
    {
      id: 'p2',
      image: '/images/futsalboys-ledare.JPG',
      likes: 198,
      caption: 'Ledarstaben: Raffi Medz, Elvis Mesic och Marcelo Villa. 100% passion och ledarskap på och utanför planen! 💚🖤',
    },
    {
      id: 'p3',
      image: '/images/futsalboys-ledare-breden.JPG',
      likes: 165,
      caption: 'Tillsammans mot toppen i Trollhättan. Vi förbereder oss inför cuphelgen med fullt fokus! ⚡️',
    },
  ],
};
