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

export interface ScheduleEvent {
  id: string;
  slug: string;
  type: 'TRÄNING' | 'MATCH' | 'CUP';
  title: string;
  dayOfWeek: string;
  date: string;
  fullDate: string;
  time: string;
  venue: string;
  city: string;
  address: string;
  gatheringTime: string;
  opponent?: string;
  description: string;
  longDescription: string[];
  focusAreas?: string[];
  scheduleTimeline?: Array<{ time: string; text: string }>;
  equipment?: string[];
  leaders: string[];
  spectatorInfo?: string;
  mapsUrl: string;
  isUpcoming?: boolean;
}

export const winterSchedule: ScheduleEvent[] = [
  {
    id: 'ev-1',
    slug: 'traning-sylte',
    type: 'TRÄNING',
    title: 'Träning i Sylte',
    dayOfWeek: 'Söndag',
    date: '1 NOV',
    fullDate: '1 november 2026',
    time: '15:00–17:00',
    venue: 'Syltehallen',
    city: 'Sylte, Trollhättan',
    address: 'Klockarevägen 4, 461 54 Trollhättan',
    gatheringTime: '14:30 (30 minuter innan)',
    description: 'Uppstartsträning med fokus på teknik, kondition och passningsspel på snabb parkett.',
    longDescription: [
      'Välkomna till uppstartsträningen för Futsal Boys i Syltehallen! Detta pass inleder vår fokuserade satsning under november och december.',
      'Fokus för passet ligger på att hitta tillbaka till rätt bolltempo på parketten, trimma flåset och bygga in grundläggande rörelsemönster i anfallsspelet.',
      'Alla spelare förväntas vara ombytta och redo för gemensam uppvärmning kl 14:45. Glöm inte benskydd och inomhusskor!',
    ],
    focusAreas: [
      'Högintensiv uppvärmning & intervallöpning',
      'Bollbehandling och snabba väggspel på små ytor',
      'Speluppbyggnad från egen målvakt',
      'Internmatchspel med högt tävlingstempo',
    ],
    scheduleTimeline: [
      { time: '14:30', text: 'Samling i omklädningsrummet och genomgång av passet' },
      { time: '14:45', text: 'Gemensam rörlighet, löpning och aktivering' },
      { time: '15:00', text: 'Passningsövningar, bollkontroll och snabba fötter' },
      { time: '15:40', text: 'Taktiska moment: anfallsmönster & försvarsformation' },
      { time: '16:15', text: 'Internmatch på helplan (hög intensitet)' },
      { time: '16:55', text: 'Nedjogg och kort samling inför nästa träning' },
    ],
    equipment: [
      'Futsalskor för inomhusbruk (non-marking)',
      'Benskydd (obligatoriskt)',
      'Futsal Boys träningskläder',
      'Vattenflaska',
    ],
    leaders: ['Raffi Medz', 'Elvis Mesic', 'Marcelo Villa'],
    spectatorInfo: 'Vänner och anhöriga är välkomna att titta på från läktaren.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Syltehallen+Trollhättan',
    isUpcoming: true,
  },
  {
    id: 'ev-2',
    slug: 'traning-torsbohallen',
    type: 'TRÄNING',
    title: 'Träning i Torsbohallen',
    dayOfWeek: 'Fredag',
    date: '6 NOV',
    fullDate: '6 november 2026',
    time: '20:00–22:00',
    venue: 'Torsbohallen',
    city: 'Trollhättan',
    address: 'Torsbovägen 2, 461 44 Trollhättan',
    gatheringTime: '19:30 (30 minuter innan)',
    description: 'Kvällsträning med taktiska övningar, positionsspel och högt matchtempo.',
    longDescription: [
      'Fredagskväll i Torsbohallen med fullt fokus på det taktiska försvarsspelet och fasta situationer.',
      'Här bygger vi den defensiva trygghet som krävs när vi två veckor senare ställs mot Funk i samma hall.',
      'Vi övar på att stänga ytor i mitten, styra motståndarna utåt och utnyttja snabba omställningar vid bollvinst.',
    ],
    focusAreas: [
      'Försvarsorganisation och zonpress',
      'Täckning vid skott och blockeringar',
      'Fasta situationer (hörnor, insparkar och frisparkar)',
      'Spel med och mot flygande målvakt',
    ],
    scheduleTimeline: [
      { time: '19:30', text: 'Samling i omklädningsrummet och taktiktavla' },
      { time: '19:45', text: 'Dynamisk rörlighet och målvaktsuppvärmning' },
      { time: '20:00', text: 'Övningar för positionsspel och försvarsfyrkant' },
      { time: '20:45', text: 'Fasta situationer (hörnor och frisparksvarianter)' },
      { time: '21:15', text: 'Matchspel i 3x10 minuter med matchlika villkor' },
      { time: '21:55', text: 'Sammanfattning och stretch' },
    ],
    equipment: [
      'Inomhusskor för futsal',
      'Benskydd',
      'Träningsställ i klubbens färger',
      'Vattenflaska',
    ],
    leaders: ['Elvis Mesic', 'Marcelo Villa', 'Raffi Medz'],
    spectatorInfo: 'Öppen träning, välkomna att titta.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Torsbohallen+Trollhättan',
    isUpcoming: true,
  },
  {
    id: 'ev-3',
    slug: 'traning-nevshallen',
    type: 'TRÄNING',
    title: 'Träning i Nevshallen',
    dayOfWeek: 'Lördag',
    date: '14 NOV',
    fullDate: '14 november 2026',
    time: '14:00–16:00',
    venue: 'Nevshallen',
    city: 'Trollhättan',
    address: 'Flygfältsvägen, Saab-området, 461 38 Trollhättan',
    gatheringTime: '13:30 (30 minuter innan)',
    description: 'Helgträning med fokus på samspel, fasta situationer och snabba omställningar.',
    longDescription: [
      'Lördagsträning i Nevshallen som fungerar som direkt förberedelse inför träningsmatchen mot Funk den 20 november.',
      'Här höjer vi intensiteten ytterligare, slipar på de sista detaljerna i matchtempot och genomför tävlingsinriktade avslutningsmoment.',
      'Efter träningen fastställs matchtruppen och taktiken inför Funk-drabbningen.',
    ],
    focusAreas: [
      'Formtoppning inför träningsmatchen mot Funk',
      'Avslutsträning och 1-mot-1 dueller framför mål',
      'Snabba omställningar och 3-mot-2 överlägen',
      'Finputsning av matchplanen',
    ],
    scheduleTimeline: [
      { time: '13:30', text: 'Samling och genomgång av dagens upplägg' },
      { time: '13:45', text: 'Uppvärmning med boll i högt tempo' },
      { time: '14:00', text: 'Spelvändningar och snabba kontringsövningar' },
      { time: '14:40', text: 'Skott- och avslutsträning från olika vinklar' },
      { time: '15:15', text: 'Matchspel med skarpa domarregler och klocka' },
      { time: '15:55', text: 'Kort samling och matchuttagning inför Funk' },
    ],
    equipment: [
      'Inomhusskor (futsal)',
      'Benskydd',
      'Träningsställ',
      'Vattenflaska',
    ],
    leaders: ['Raffi Medz', 'Elvis Mesic'],
    spectatorInfo: 'Välkomna att kika på träningen från läktarplats.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Nevshallen+Trollhättan',
    isUpcoming: true,
  },
  {
    id: 'ev-4',
    slug: 'match-funk',
    type: 'MATCH',
    title: 'Träningsmatch mot Funk',
    dayOfWeek: 'Fredag',
    date: '20 NOV',
    fullDate: '20 november 2026',
    time: '20:00–22:00',
    venue: 'Torsbohallen',
    city: 'Trollhättan',
    address: 'Torsbovägen 2, 461 44 Trollhättan',
    gatheringTime: '19:15 (45 minuter innan matchstart)',
    opponent: 'Funk',
    description: 'Träningsmatch på hemmaplan mot Funk i Torsbohallen – ett hett formtest inför publik!',
    longDescription: [
      'Vintersäsongens första träningsmatch ställer Futsal Boys mot Funk i ett efterlängtat möte i Torsbohallen!',
      'Funk är ett spelskickligt lag som kommer sätta vår defensiv och organisation på prov. Matchen är ett perfekt tillfälle att testa spelsystemet inför cupen i december.',
      'Publiken är varmt välkommen att heja fram grabbarna på plats – det bjuds på fin futsal och garanterat hög puls!',
    ],
    focusAreas: [
      'Testa matchformationer under tävlingslika former',
      'Sätta försvars- och presspelet mot tufft motstånd',
      'Effektivitet i målchanser och fasta situationer',
      'Sammanhållning och vinnarmentalitet',
    ],
    scheduleTimeline: [
      { time: '19:15', text: 'Truppen samlas i omklädningsrummet, matchtröjor delas ut' },
      { time: '19:30', text: 'Taktiskt matchsnack med ledarstaben' },
      { time: '19:40', text: 'Gemensam matchuppvärmning på planen' },
      { time: '20:00', text: 'Avspark: Futsal Boys vs Funk (Första halvlek)' },
      { time: '20:45', text: 'Andra halvlek' },
      { time: '21:35', text: 'Slutsignal, tacka motståndare & publik' },
      { time: '21:45', text: 'Eftersnack och analys i omklädningsrummet' },
    ],
    equipment: [
      'Officiellt matchställ Futsal Boys',
      'Benskydd (obligatoriskt)',
      'Futsalskor',
      'Vattenflaska och personliga tillbehör',
    ],
    leaders: ['Raffi Medz', 'Elvis Mesic', 'Marcelo Villa'],
    spectatorInfo: 'Fri entré för alla supportrar! Ta med familj och vänner och stötta Futsal Boys.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Torsbohallen+Trollhättan',
    isUpcoming: true,
  },
  {
    id: 'ev-5',
    slug: 'match-tif-polhem',
    type: 'MATCH',
    title: 'Träningsmatch mot TIF Polhem',
    dayOfWeek: 'Söndag',
    date: '6 DEC',
    fullDate: '6 december 2026',
    time: '20:00–22:00',
    venue: 'TIF Polhem',
    city: 'Trollhättan',
    address: 'Polhemsgatan, Trollhättan',
    gatheringTime: '19:15 (45 minuter innan matchstart)',
    opponent: 'TIF Polhem',
    description: 'Säsongens andra träningsmatch och viktigt genrep inför Färgelanda cup.',
    longDescription: [
      'Säsongens andra träningsmatch och det officiella genrepet inför Färgelanda cup den 19 december!',
      'Här testar vi cuptaktiken och rollerna under matchförhållanden mot starka TIF Polhem.',
      'Målet är att rotera laget, säkerställa att alla spelare i cuptruppen har bra matchtempo i benen och slipa på detaljer innan cupäventyret.',
    ],
    focusAreas: [
      'Genrep inför Färgelanda cup',
      'Matchtempo för hela cuptruppen',
      'Specialvarianter på fasta situationer',
      'Taktisk disciplin över hela matchen',
    ],
    scheduleTimeline: [
      { time: '19:15', text: 'Samling i omklädningsrummet' },
      { time: '19:30', text: 'Taktikgenomgång & roller för genrepet' },
      { time: '19:45', text: 'Matchvärmning med högt tempo' },
      { time: '20:00', text: 'Avspark: Futsal Boys vs TIF Polhem' },
      { time: '21:30', text: 'Matchslut och utvärdering' },
      { time: '21:45', text: 'Kort samling inför den stundande cupveckan' },
    ],
    equipment: [
      'Officiellt matchställ Futsal Boys',
      'Benskydd',
      'Futsalskor',
      'Vattenflaska',
    ],
    leaders: ['Raffi Medz', 'Elvis Mesic', 'Marcelo Villa'],
    spectatorInfo: 'Fri entré! Kom och heja fram laget i säsongens sista träningsmatch.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=TIF+Polhem+Trollhättan',
    isUpcoming: true,
  },
  {
    id: 'ev-6',
    slug: 'fargelanda-cup',
    type: 'CUP',
    title: 'Färgelanda cup',
    dayOfWeek: 'Lördag',
    date: '19 DEC',
    fullDate: '19 december 2026',
    time: 'Heldag',
    venue: 'Färgelanda Sporthall',
    city: 'Färgelanda',
    address: 'Allévägen / Håvesten, 458 30 Färgelanda',
    gatheringTime: '07:45 i Trollhättan (gemensam samåkning) eller 08:30 på plats',
    opponent: 'Flera cupmotståndare',
    description: 'Vinterns stora cupäventyr! Heldag med gruppspel, slutspel och jakt på cupguldet.',
    longDescription: [
      'Vintersäsongens absoluta höjdpunkt! Futsal Boys åker till Färgelanda för att delta i prestigefyllda Färgelanda Futsal Cup.',
      'Laget kliver in med en stark 12-mannatrupp: Elvis, Raffi, Marcelo, Mehdi, Wael, Wictor, Hugo, Stefan, Kasper, Lucas, Emin och Tro.',
      'Dagen bjuder på flera intensiva gruppspelsmatcher och förhoppningsvis en lång resa genom slutspelet mot cupguldet!',
      'Följ liverapporteringen under hela cupdagen på lagets Instagram (@grabbarna.futsal) och spelschemat på ProCup.',
    ],
    focusAreas: [
      'Gruppspelsmatcher med maximal energi från minut ett',
      'Kompakt försvarsspel och snabba kontringar',
      'Lagets gemenskap och vinnaranda',
      'Cupguld!',
    ],
    scheduleTimeline: [
      { time: '07:45', text: 'Samling i Trollhättan för gemensam samåkning' },
      { time: '08:30', text: 'Ankomst till Färgelanda Sporthall & registrering' },
      { time: '09:15', text: 'Gruppspelsmatch 1' },
      { time: '11:30', text: 'Gruppspelsmatch 2 & lunchpaus' },
      { time: '13:45', text: 'Gruppspelsmatch 3' },
      { time: '15:30', text: 'Slutspel: Kvartsfinaler & Semifinaler' },
      { time: '18:00', text: 'Finalspel & prisutdelning' },
    ],
    equipment: [
      'Futsal Boys matchtröjor (hemma & borta)',
      'Benskydd & futsalskor',
      'Överdragskläder, extra strumpor & handduk',
      'Mellanmål, energi & vattenflaska',
    ],
    leaders: ['Raffi Medz', 'Elvis Mesic', 'Marcelo Villa'],
    spectatorInfo: 'Heldagsturnering med fantastisk futsalstämning, café, kiosk och slutspelsdramatik!',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Färgelanda+Sporthall',
    isUpcoming: true,
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
  awayTeam: 'FUNK',
  date: 'FREDAG, 20 NOVEMBER 2026',
  time: '20:00–22:00',
  venue: 'TORSBOHALLEN, TROLLHÄTTAN',
  competition: 'TRÄNINGSMATCH',
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
    id: 'vinterschema-2026',
    category: 'SCHEMA & NYHET',
    title: 'Vinterschemat klart: Tre träningar, två matcher och Färgelanda cup!',
    summary: 'Schemat för Futsal Boys sträcker sig över november och december och innehåller tre träningar, två träningsmatcher och en cup.',
    date: '30 OKT 2026',
    readTime: '2 MIN LÄSNING',
    author: 'Ledarstaben (Raffi, Elvis & Marcelo)',
    image: '/images/players/Lagfoto.JPG',
    paragraphs: [
      'Schemat för Futsal Boys sträcker sig över november och december och innehåller tre träningar, två träningsmatcher och en cup. Laget laddar nu för fullt inför vinterns alla utmaningar.',
      'Träningsperioden inleds den 1 november (15:00–17:00) i Sylte, fortsätter den 6 november (20:00–22:00) i Torsbohallen och den 14 november (14:00–16:00) i Nevshallen.',
      'Därefter väntar två tuffa träningsmatcher: mot Funk den 20 november (20:00–22:00) i Torsbohallen och mot TIF Polhem den 6 december (20:00–22:00). Allt toppas med Färgelanda cup den 19 december (Heldag) där den officiella cuptruppen kliver in för att slåss om guldet!',
    ],
    quote: 'Ett stenhårt och roligt schema som ger grabbarna perfekta förutsättningar inför Färgelanda cup.',
  },
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
