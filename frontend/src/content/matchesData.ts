export interface GoalEvent {
  minute: number;
  team: string; // 'Futsal Boys' | Opponent name
  scorer: string;
  assist?: string;
  currentScore: string;
  isPenalty?: boolean;
  isDirectFreekick?: boolean;
  description?: string;
}

export interface MatchTimelineEvent {
  minute: number;
  type: 'GOAL' | 'YELLOW_CARD' | 'RED_CARD' | 'TIMEOUT' | 'HALFTIME' | 'PERIOD_START' | 'FULLTIME';
  team?: string;
  player?: string;
  description: string;
  score?: string;
}

export interface MatchStats {
  shotsOnGoal: [number, number]; // [Home, Away]
  totalShots: [number, number];
  corners: [number, number];
  fouls: [number, number]; // Ackumulerade frisparkar
  possession: [number, number]; // Procent t.ex. [55, 45]
  saves: [number, number];
}

export interface MatchPlayer {
  number: number;
  name: string;
  position: 'MÅLVAKT' | 'FÖRSVAR' | 'MITTFÄLT' | 'FORWARD' | 'SPELARE';
  isStarter?: boolean;
  isCaptain?: boolean;
  goals?: number;
  assists?: number;
}

export interface FutsalMatch {
  id: string;
  slug: string;
  homeTeam: string;
  awayTeam: string;
  isHome: boolean;
  competition: string;
  stage?: string;
  date: string;
  fullDate: string;
  time: string;
  venue: string;
  city: string;
  address?: string;
  mapsUrl?: string;
  status: 'SLUTRESULTAT' | 'KOMMANDE' | 'LIVE';
  outcome: 'VINST' | 'OAVGJORT' | 'FÖRLUST' | 'KOMMANDE';
  result: string; // '4 - 3' eller 'VS'
  homeScore?: number;
  awayScore?: number;
  halftimeResult?: string; // '2 - 1'
  scorersSummary: string;
  playerOfTheMatch?: {
    name: string;
    number: number;
    title: string;
    description: string;
  };
  summary: string[];
  goals: GoalEvent[];
  timeline: MatchTimelineEvent[];
  stats: MatchStats;
  lineup: {
    startingFive: MatchPlayer[];
    bench: MatchPlayer[];
    coaches: string[];
  };
  liveUpdates?: Array<{
    time: string;
    title: string;
    text: string;
  }>;
  spectators?: string;
  referees?: string;
}

export const futsalMatches: FutsalMatch[] = [
  // ==========================================================================
  // MATCH 1: FC VÄNERSBORG FUTSAL (SLUTRESULTAT: VINST 4 - 3)
  // ==========================================================================
  {
    id: 'm1',
    slug: 'fc-vanersborg',
    homeTeam: 'Futsal Boys',
    awayTeam: 'FC Vänersborg Futsal',
    isHome: true,
    competition: 'Höstcupen 2026',
    stage: 'Kvartsfinal',
    date: '12 OKT 2026',
    fullDate: 'Måndag 12 oktober 2026',
    time: '20:00',
    venue: 'Arena Älvhögsborg',
    city: 'Trollhättan',
    address: 'Storgatan 1, 461 31 Trollhättan',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Arena+Älvhögsborg+Trollhättan',
    status: 'SLUTRESULTAT',
    outcome: 'VINST',
    result: '4 - 3',
    homeScore: 4,
    awayScore: 3,
    halftimeResult: '2 - 1',
    scorersSummary: 'Elvis (2), Marcelo (1), Raffi (1)',
    spectators: '~120 åskådare',
    referees: 'Futsaldomare Region Väst',
    playerOfTheMatch: {
      name: 'Elvis Mesic',
      number: 1,
      title: 'MATCHENS LIRARE (MVP)',
      description: 'Stod för fantastiska räddningar mellan stolparna och klev dessutom framåt med två klassmål, varav det matchavgörande 4–2-målet!',
    },
    summary: [
      'En fullständigt elektrisk kvartsfinal i Arena Älvhögsborg där Futsal Boys visade enorm lagmoral mot ett hårt kämpande och rutinerat FC Vänersborg.',
      'Futsal Boys inledde i ett ursinnigt tempo och tog ledningen redan i fjärde minuten genom Elvis Mesic efter en blixtsnabb kontring signerad Raffi Medz. Trots att Vänersborg kvitterade återtog Futsal Boys kommandot strax innan paus när Marcelo Villa satte 2–1.',
      'I andra halvlek ökade dramatiken ytterligare: Vänersborg kvitterade till 2–2 innan Raffi Medz skruvade in en magisk frispark direkt i krysset för 3–2. Med tre minuter kvar utnyttjade Elvis att Vänersborg plockat ut målvakten och satte 4–2 i öppen kasse.',
      'Ett sent reduceringsmål skapade nerv i slutsekunderna, men Futsal Boys försvarade heroiskt och säkrade en välförtjänt plats i semifinalen inför en vilt jublande hemmapublik!',
    ],
    goals: [
      { minute: 4, team: 'Futsal Boys', scorer: 'Elvis Mesic', assist: 'Raffi Medz', currentScore: '1 - 0', description: 'Snabb spelvändning där Elvis trycker upp bollen vid första stolpen.' },
      { minute: 11, team: 'FC Vänersborg Futsal', scorer: 'Albin Karlsson', currentScore: '1 - 1', description: 'Inspel från högerkanten som stöts i nät.' },
      { minute: 18, team: 'Futsal Boys', scorer: 'Marcelo Villa', assist: 'Wael', currentScore: '2 - 1', description: 'Vackert kombinationsspel på ett tillslag där Marcelo placerar in bollen i bortre hörnet.' },
      { minute: 26, team: 'FC Vänersborg Futsal', scorer: 'Samir Hadzic', currentScore: '2 - 2', description: 'Hårt skott utifrån som styrs i mål via försvarare.' },
      { minute: 32, team: 'Futsal Boys', scorer: 'Raffi Medz', isDirectFreekick: true, currentScore: '3 - 2', description: 'Direktfrispark från tio meter rakt upp i nättaket – målvakten chanslös!' },
      { minute: 37, team: 'Futsal Boys', scorer: 'Elvis Mesic', currentScore: '4 - 2', description: 'Brytning och kontrollerat skott i öppet mål när motståndarna körde jokerspel.' },
      { minute: 39, team: 'FC Vänersborg Futsal', scorer: 'Jesper Lind', currentScore: '4 - 3', description: 'Reducering i slutskedet på retur framför mål.' },
    ],
    timeline: [
      { minute: 0, type: 'PERIOD_START', description: 'Matchen är igång i Arena Älvhögsborg! Hög stämning på läktarna.' },
      { minute: 4, type: 'GOAL', team: 'Futsal Boys', player: 'Elvis Mesic', score: '1 - 0', description: 'MÅL! Elvis spräcker nollan efter mönsteranfall!' },
      { minute: 11, type: 'GOAL', team: 'FC Vänersborg Futsal', player: 'Albin Karlsson', score: '1 - 1', description: 'Kvitterat till 1-1 efter inspel.' },
      { minute: 15, type: 'YELLOW_CARD', team: 'FC Vänersborg Futsal', player: 'Kalle Berg', description: 'Varning för ojuste tackling vid mittlinjen.' },
      { minute: 18, type: 'GOAL', team: 'Futsal Boys', player: 'Marcelo Villa', score: '2 - 1', description: 'MÅL! Marcelo återger Futsal Boys ledningen innan paussignalen!' },
      { minute: 20, type: 'HALFTIME', score: '2 - 1', description: 'Halvtidsvila. Futsal Boys leder med 2–1 efter en intensiv första akt.' },
      { minute: 21, type: 'PERIOD_START', description: 'Andra halvlek startar!' },
      { minute: 26, type: 'GOAL', team: 'FC Vänersborg Futsal', player: 'Samir Hadzic', score: '2 - 2', description: 'Kvitterat 2-2 via distansskott.' },
      { minute: 30, type: 'TIMEOUT', team: 'Futsal Boys', description: 'Timeout begärd av ledarstaben. Taktiska instruktioner på tavlan.' },
      { minute: 32, type: 'GOAL', team: 'Futsal Boys', player: 'Raffi Medz', score: '3 - 2', description: 'DRÖMMÅL! Raffi skruvar in frisparken i krysset för 3-2!' },
      { minute: 36, type: 'YELLOW_CARD', team: 'Futsal Boys', player: 'Wictor', description: 'Varning för taktisk brytning.' },
      { minute: 37, type: 'GOAL', team: 'Futsal Boys', player: 'Elvis Mesic', score: '4 - 2', description: 'MÅL! Elvis sätter 4-2 i tom kasse!' },
      { minute: 39, type: 'GOAL', team: 'FC Vänersborg Futsal', player: 'Jesper Lind', score: '4 - 3', description: 'Vänersborg reducerar till 4-3 i slutminuten.' },
      { minute: 40, type: 'FULLTIME', score: '4 - 3', description: 'SLUTSIGNAL! Futsal Boys vinner med 4-3 och avancerar till semifinal!' },
    ],
    stats: {
      shotsOnGoal: [16, 13],
      totalShots: [25, 19],
      corners: [6, 4],
      fouls: [4, 5],
      possession: [53, 47],
      saves: [10, 12],
    },
    lineup: {
      startingFive: [
        { number: 1, name: 'Elvis', position: 'MÅLVAKT', isStarter: true, goals: 2 },
        { number: 3, name: 'Marcelo', position: 'FÖRSVAR', isStarter: true, goals: 1 },
        { number: 7, name: 'Raffi', position: 'MITTFÄLT', isStarter: true, isCaptain: true, goals: 1, assists: 1 },
        { number: 11, name: 'Mehdi', position: 'MITTFÄLT', isStarter: true },
        { number: 6, name: 'Wael', position: 'FORWARD', isStarter: true, assists: 1 },
      ],
      bench: [
        { number: 24, name: 'Wictor', position: 'FÖRSVAR' },
        { number: 4, name: 'Hugo', position: 'FORWARD' },
        { number: 9, name: 'Stefan', position: 'FORWARD' },
        { number: 10, name: 'Kasper', position: 'MITTFÄLT' },
        { number: 14, name: 'Lucas', position: 'FÖRSVAR' },
        { number: 18, name: 'Emin', position: 'FORWARD' },
        { number: 22, name: 'Tro', position: 'FÖRSVAR' },
      ],
      coaches: ['Raffi Medz', 'Elvis Mesic', 'Marcelo Villa'],
    },
  },

  // ==========================================================================
  // MATCH 2: UDDEVALLA CITY (SLUTRESULTAT: VINST 6 - 2)
  // ==========================================================================
  {
    id: 'm2',
    slug: 'uddevalla-city',
    homeTeam: 'Futsal Boys',
    awayTeam: 'Uddevalla City',
    isHome: true,
    competition: 'Höstcupen 2026',
    stage: 'Gruppspel Omgång 3',
    date: '04 OKT 2026',
    fullDate: 'Söndag 4 oktober 2026',
    time: '18:30',
    venue: 'Arena Älvhögsborg',
    city: 'Trollhättan',
    address: 'Storgatan 1, 461 31 Trollhättan',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Arena+Älvhögsborg+Trollhättan',
    status: 'SLUTRESULTAT',
    outcome: 'VINST',
    result: '6 - 2',
    homeScore: 6,
    awayScore: 2,
    halftimeResult: '3 - 0',
    scorersSummary: 'Marcelo (3), Elvis (2), Noah (1)',
    spectators: '~95 åskådare',
    referees: 'SvFF Futsaldomare',
    playerOfTheMatch: {
      name: 'Marcelo Villa',
      number: 3,
      title: 'MATCHENS LIRARE (MVP)',
      description: 'Hattrick-hjälte! Total dominans på planen med tre magnifika mål och ett ständigt hot i djupled.',
    },
    summary: [
      'En ren uppvisning i anfallsfutsal när Futsal Boys körde över Uddevalla City med hela 6–2 i gruppspelets sista match.',
      'Laget satte hög press från första avspark och bjöd hemmapubliken på champagnefutsal med snabba väggspel och stenhård defensiv. Redan i paus ledde Futsal Boys bekvämt med 3–0 efter två fullträffar av Marcelo Villa och ett av Elvis Mesic.',
      'I andra halvlek fullbordade Marcelo sitt hattrick, samtidigt som Noah Lindqvist och Elvis spädde på målskörden till slutresultatet 6–2.',
      'Segern innebar att Futsal Boys vann gruppen obesegrade med en förkrossande målskillnad.',
    ],
    goals: [
      { minute: 3, team: 'Futsal Boys', scorer: 'Marcelo Villa', assist: 'Mehdi', currentScore: '1 - 0', description: 'Skott i bortre burgaveln efter snabb överlappning.' },
      { minute: 12, team: 'Futsal Boys', scorer: 'Elvis Mesic', assist: 'Marcelo', currentScore: '2 - 0', description: 'Kliniskt avslut på ett tillslag mitt i straffområdet.' },
      { minute: 19, team: 'Futsal Boys', scorer: 'Marcelo Villa', assist: 'Wictor', currentScore: '3 - 0', description: 'Fint solonummer längs vänsterkanten och kyligt avslut.' },
      { minute: 24, team: 'Futsal Boys', scorer: 'Noah Lindqvist', assist: 'Kasper', currentScore: '4 - 0', description: 'Direktskott i nättaket efter hörna.' },
      { minute: 29, team: 'Uddevalla City', scorer: 'Filip Svensson', currentScore: '4 - 1', description: 'Reducering på kontring.' },
      { minute: 33, team: 'Futsal Boys', scorer: 'Marcelo Villa', currentScore: '5 - 1', description: 'Marcelo fullbordar sitt hattrick med ett drömmål i krysset!' },
      { minute: 36, team: 'Uddevalla City', scorer: 'Liam Ek', currentScore: '5 - 2', description: 'Skott via stolpen in.' },
      { minute: 39, team: 'Futsal Boys', scorer: 'Elvis Mesic', assist: 'Raffi', currentScore: '6 - 2', description: 'Elvis fastställer slutresultatet efter fin framspelning.' },
    ],
    timeline: [
      { minute: 0, type: 'PERIOD_START', description: 'Avspark i Arena Älvhögsborg!' },
      { minute: 3, type: 'GOAL', team: 'Futsal Boys', player: 'Marcelo Villa', score: '1 - 0', description: 'MÅL! 1-0 Marcelo Villa tidigt i matchen!' },
      { minute: 12, type: 'GOAL', team: 'Futsal Boys', player: 'Elvis Mesic', score: '2 - 0', description: 'MÅL! Elvis utökar till 2-0!' },
      { minute: 19, type: 'GOAL', team: 'Futsal Boys', player: 'Marcelo Villa', score: '3 - 0', description: 'MÅL! Marcelo slår till igen – 3-0 strax före paus!' },
      { minute: 20, type: 'HALFTIME', score: '3 - 0', description: 'Halvtidsvila. Total dominans av Futsal Boys (3-0).' },
      { minute: 24, type: 'GOAL', team: 'Futsal Boys', player: 'Noah Lindqvist', score: '4 - 0', description: 'MÅL! Noah dundrar in 4-0 efter hörnvariant!' },
      { minute: 29, type: 'GOAL', team: 'Uddevalla City', player: 'Filip Svensson', score: '4 - 1', description: 'Reducering till 4-1.' },
      { minute: 33, type: 'GOAL', team: 'Futsal Boys', player: 'Marcelo Villa', score: '5 - 1', description: 'HATTRICK! Marcelo gör sitt tredje för kvällen, 5-1!' },
      { minute: 36, type: 'GOAL', team: 'Uddevalla City', player: 'Liam Ek', score: '5 - 2', description: 'Uddevalla reducerar till 5-2.' },
      { minute: 39, type: 'GOAL', team: 'Futsal Boys', player: 'Elvis Mesic', score: '6 - 2', description: 'MÅL! Elvis sätter punkt för matchen, 6-2!' },
      { minute: 40, type: 'FULLTIME', score: '6 - 2', description: 'SLUT! Futsal Boys vinner gruppen efter 6-2!' },
    ],
    stats: {
      shotsOnGoal: [22, 9],
      totalShots: [31, 15],
      corners: [8, 3],
      fouls: [3, 6],
      possession: [61, 39],
      saves: [7, 16],
    },
    lineup: {
      startingFive: [
        { number: 1, name: 'Elvis', position: 'MÅLVAKT', isStarter: true, goals: 2 },
        { number: 3, name: 'Marcelo', position: 'FÖRSVAR', isStarter: true, goals: 3, assists: 1 },
        { number: 7, name: 'Raffi', position: 'MITTFÄLT', isStarter: true, isCaptain: true, assists: 1 },
        { number: 11, name: 'Mehdi', position: 'MITTFÄLT', isStarter: true, assists: 1 },
        { number: 6, name: 'Wael', position: 'FORWARD', isStarter: true },
      ],
      bench: [
        { number: 24, name: 'Wictor', position: 'FÖRSVAR', assists: 1 },
        { number: 10, name: 'Kasper', position: 'MITTFÄLT', assists: 1 },
        { number: 14, name: 'Lucas', position: 'FÖRSVAR' },
        { number: 18, name: 'Emin', position: 'FORWARD' },
        { number: 4, name: 'Hugo', position: 'FORWARD' },
      ],
      coaches: ['Raffi Medz', 'Elvis Mesic', 'Marcelo Villa'],
    },
  },

  // ==========================================================================
  // MATCH 3: GÖTEBORG UNITED (SLUTRESULTAT: OAVGJORT 3 - 3)
  // ==========================================================================
  {
    id: 'm3',
    slug: 'goteborg-united',
    homeTeam: 'Göteborg United',
    awayTeam: 'Futsal Boys',
    isHome: false,
    competition: 'Träningsmatch',
    date: '27 SEP 2026',
    fullDate: 'Söndag 27 september 2026',
    time: '16:00',
    venue: 'Lundbystrand',
    city: 'Göteborg',
    address: 'Anders Carlssons Gata 10, 417 55 Göteborg',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Lundbystrand+Göteborg',
    status: 'SLUTRESULTAT',
    outcome: 'OAVGJORT',
    result: '3 - 3',
    homeScore: 3,
    awayScore: 3,
    halftimeResult: '1 - 2',
    scorersSummary: 'Raffi (2), Elvis (1)',
    spectators: '~70 åskådare',
    referees: 'Futsaldomare Göteborg',
    playerOfTheMatch: {
      name: 'Raffi Medz',
      number: 7,
      title: 'MATCHENS LIRARE (MVP)',
      description: 'Lagkaptenen styrde matchen med kirurgisk precision och svarade för två kliniska mål i en tuff bortamatch.',
    },
    summary: [
      'En svängig och högoktanig träningsmatch i klassiska Lundbystrand i Göteborg där Futsal Boys ställdes mot topprankade Göteborg United.',
      'Futsal Boys inledde starkt och tog kommandot genom Raffi Medz som tidigt prickade in 0–1. Göteborg kvitterade, men strax innan paus utnyttjade Elvis Mesic ett försvarsmisstag och rullade in 1–2.',
      'I andra halvlek växlade hemmalaget upp och vände till 3–2 via två snabba mål. Futsal Boys visade dock enorm karaktär och med blott en minut kvar kvitterade Raffi Medz till 3–3 på en stenhård volley.',
      'Ett mycket lärorikt och jämnt formtest som gav tränarstaben kvitto på att lagets defensiva organisation och anfallsvariationer håller högsta klass.',
    ],
    goals: [
      { minute: 6, team: 'Futsal Boys', scorer: 'Raffi Medz', currentScore: '0 - 1', description: 'Lågt skott intill stolpen efter väggspel.' },
      { minute: 14, team: 'Göteborg United', scorer: 'Dino Mujic', currentScore: '1 - 1', description: 'Avslut i nättaket.' },
      { minute: 18, team: 'Futsal Boys', scorer: 'Elvis Mesic', currentScore: '1 - 2', description: 'Stjäl bollen högt och rullar in ledningsmålet.' },
      { minute: 25, team: 'Göteborg United', scorer: 'Dino Mujic', currentScore: '2 - 2', description: 'Kvittering efter snabb omställning.' },
      { minute: 31, team: 'Göteborg United', scorer: 'Alexander Roos', currentScore: '3 - 2', description: 'Hemmaledning via hörna.' },
      { minute: 39, team: 'Futsal Boys', scorer: 'Raffi Medz', currentScore: '3 - 3', description: 'Kvitterat till 3-3 på volley i slutminuten!' },
    ],
    timeline: [
      { minute: 0, type: 'PERIOD_START', description: 'Avspark i Lundbystrand, Göteborg!' },
      { minute: 6, type: 'GOAL', team: 'Futsal Boys', player: 'Raffi Medz', score: '0 - 1', description: 'MÅL! Raffi öppnar målskyttet, 0-1!' },
      { minute: 14, type: 'GOAL', team: 'Göteborg United', player: 'Dino Mujic', score: '1 - 1', description: '1-1 kvitterat.' },
      { minute: 18, type: 'GOAL', team: 'Futsal Boys', player: 'Elvis Mesic', score: '1 - 2', description: 'MÅL! Elvis sätter 1-2 innan paus!' },
      { minute: 20, type: 'HALFTIME', score: '1 - 2', description: 'Halvtidsvila i Lundbystrand.' },
      { minute: 25, type: 'GOAL', team: 'Göteborg United', player: 'Dino Mujic', score: '2 - 2', description: '2-2 kvitterat.' },
      { minute: 31, type: 'GOAL', team: 'Göteborg United', player: 'Alexander Roos', score: '3 - 2', description: 'Göteborg tar ledningen med 3-2.' },
      { minute: 35, type: 'TIMEOUT', team: 'Futsal Boys', description: 'Timeout Futsal Boys.' },
      { minute: 39, type: 'GOAL', team: 'Futsal Boys', player: 'Raffi Medz', score: '3 - 3', description: 'KVITTERAT! Raffi räddar 3-3 i sista minuten!' },
      { minute: 40, type: 'FULLTIME', score: '3 - 3', description: 'Slutsignal! 3-3 i en högklassig träningsmatch.' },
    ],
    stats: {
      shotsOnGoal: [14, 15],
      totalShots: [22, 21],
      corners: [5, 5],
      fouls: [5, 4],
      possession: [49, 51],
      saves: [12, 11],
    },
    lineup: {
      startingFive: [
        { number: 1, name: 'Elvis', position: 'MÅLVAKT', isStarter: true, goals: 1 },
        { number: 3, name: 'Marcelo', position: 'FÖRSVAR', isStarter: true },
        { number: 7, name: 'Raffi', position: 'MITTFÄLT', isStarter: true, isCaptain: true, goals: 2 },
        { number: 11, name: 'Mehdi', position: 'MITTFÄLT', isStarter: true },
        { number: 6, name: 'Wael', position: 'FORWARD', isStarter: true },
      ],
      bench: [
        { number: 24, name: 'Wictor', position: 'FÖRSVAR' },
        { number: 14, name: 'Lucas', position: 'FÖRSVAR' },
        { number: 10, name: 'Kasper', position: 'MITTFÄLT' },
        { number: 4, name: 'Hugo', position: 'FORWARD' },
      ],
      coaches: ['Raffi Medz', 'Elvis Mesic', 'Marcelo Villa'],
    },
  },

  // ==========================================================================
  // MATCH 4: KOMMANDE MATCH MOT FUNK (LIVE TRACKER)
  // ==========================================================================
  {
    id: 'ev-4',
    slug: 'match-funk',
    homeTeam: 'Futsal Boys',
    awayTeam: 'Funk',
    isHome: true,
    competition: 'Officiell Träningsmatch',
    stage: 'Säsongens Första Träningsmatch',
    date: '20 NOV 2026',
    fullDate: 'Fredag 20 november 2026',
    time: '20:00–22:00',
    venue: 'Torsbohallen',
    city: 'Trollhättan',
    address: 'Torsbovägen 2, 461 44 Trollhättan',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Torsbohallen+Trollhättan',
    status: 'KOMMANDE',
    outcome: 'KOMMANDE',
    result: 'VS',
    halftimeResult: 'Ej startad',
    scorersSummary: 'Avspark kl 20:00 – Följ live här!',
    spectators: 'Fri entré för alla supportrar i Torsbohallen',
    referees: 'Officiell Futsaldomare',
    summary: [
      'Vintersäsongens första träningsmatch ställer Futsal Boys mot spelskickliga Funk i ett efterlängtat möte på hemmaplan i Torsbohallen!',
      'Matchen fungerar som ett första skarpt formtest och ger ledarstaben möjlighet att testa matchformationer, pressystem och fasta situationer i tävlingslikt matchtempo.',
      'Följ liverapporteringen och alla matchhändelser i realtid direkt på denna sida och på lagets Instagram (@grabbarna.futsal) under fredagskvällen den 20 november!',
    ],
    goals: [],
    timeline: [
      { minute: 0, type: 'PERIOD_START', description: 'Tidsplan: 19:15 Truppsamling i Torsbohallen' },
      { minute: 0, type: 'PERIOD_START', description: 'Tidsplan: 19:30 Taktiskt matchsnack med ledarstaben' },
      { minute: 0, type: 'PERIOD_START', description: 'Tidsplan: 19:40 Gemensam matchuppvärmning' },
      { minute: 0, type: 'PERIOD_START', description: 'Tidsplan: 20:00 Avspark Futsal Boys vs Funk' },
      { minute: 0, type: 'PERIOD_START', description: 'Tidsplan: 21:35 Slutsignal och sammanfattning' },
    ],
    stats: {
      shotsOnGoal: [0, 0],
      totalShots: [0, 0],
      corners: [0, 0],
      fouls: [0, 0],
      possession: [50, 50],
      saves: [0, 0],
    },
    lineup: {
      startingFive: [
        { number: 1, name: 'Elvis', position: 'MÅLVAKT', isStarter: true },
        { number: 3, name: 'Marcelo', position: 'FÖRSVAR', isStarter: true },
        { number: 7, name: 'Raffi', position: 'MITTFÄLT', isStarter: true, isCaptain: true },
        { number: 11, name: 'Mehdi', position: 'MITTFÄLT', isStarter: true },
        { number: 6, name: 'Wael', position: 'FORWARD', isStarter: true },
      ],
      bench: [
        { number: 24, name: 'Wictor', position: 'FÖRSVAR' },
        { number: 4, name: 'Hugo', position: 'FORWARD' },
        { number: 9, name: 'Stefan', position: 'FORWARD' },
        { number: 10, name: 'Kasper', position: 'MITTFÄLT' },
        { number: 14, name: 'Lucas', position: 'FÖRSVAR' },
        { number: 18, name: 'Emin', position: 'FORWARD' },
        { number: 22, name: 'Tro', position: 'FÖRSVAR' },
      ],
      coaches: ['Raffi Medz', 'Elvis Mesic', 'Marcelo Villa'],
    },
    liveUpdates: [
      {
        time: 'INFO INFÖR MATCHEN',
        title: 'Uppladdning inför Funk',
        text: 'Laget har genomfört tre intensiva träningspass i Sylte, Torsbohallen och Nevshallen. Samtliga spelare i truppen är skadefria och redo!',
      },
      {
        time: 'FÖLJ PÅ PLATS',
        title: 'Fri entré i Torsbohallen',
        text: 'Välkomna till Torsbohallen för att stötta Futsal Boys! Hallen öppnar för publik kl 19:30 och avspark sker kl 20:00.',
      },
      {
        time: 'LIVERAPPORTERING',
        title: 'Liveresultat under matchen',
        text: 'Resultat, målskyttar och händelser uppdateras löpande här på sajten och via Instagram Stories under matchen.',
      },
    ],
  },

  // ==========================================================================
  // MATCH 5: KOMMANDE MATCH MOT TIF POLHEM (GENREP INFÖR FÄRGELANDA CUP)
  // ==========================================================================
  {
    id: 'ev-5',
    slug: 'match-tif-polhem',
    homeTeam: 'TIF Polhem',
    awayTeam: 'Futsal Boys',
    isHome: false,
    competition: 'Officiell Träningsmatch',
    stage: 'Genrep inför Färgelanda Futsal Cup',
    date: '06 DEC 2026',
    fullDate: 'Söndag 6 december 2026',
    time: '20:00–22:00',
    venue: 'TIF Polhem',
    city: 'Trollhättan',
    address: 'Polhemsgatan, Trollhättan',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=TIF+Polhem+Trollhättan',
    status: 'KOMMANDE',
    outcome: 'KOMMANDE',
    result: 'VS',
    halftimeResult: 'Ej startad',
    scorersSummary: 'Avspark kl 20:00 – Följ genrepet live!',
    spectators: 'Fri entré för supportrar',
    referees: 'Officiell Futsaldomare',
    summary: [
      'Säsongens andra träningsmatch och det officiella genrepet inför Färgelanda cup den 19 december!',
      'Här testas hela cuptaktiken och formationerna under skarpa matchförhållanden mot starka TIF Polhem.',
      'Följ genrepet och resultatet live här på matchdagen samt via Futsal Boys officiella Instagram!',
    ],
    goals: [],
    timeline: [
      { minute: 0, type: 'PERIOD_START', description: 'Tidsplan: 19:15 Samling i omklädningsrummet' },
      { minute: 0, type: 'PERIOD_START', description: 'Tidsplan: 19:30 Taktikgenomgång & cuproller' },
      { minute: 0, type: 'PERIOD_START', description: 'Tidsplan: 19:45 Matchuppvärmning' },
      { minute: 0, type: 'PERIOD_START', description: 'Tidsplan: 20:00 Avspark TIF Polhem vs Futsal Boys' },
      { minute: 0, type: 'PERIOD_START', description: 'Tidsplan: 21:30 Matchslut och analys' },
    ],
    stats: {
      shotsOnGoal: [0, 0],
      totalShots: [0, 0],
      corners: [0, 0],
      fouls: [0, 0],
      possession: [50, 50],
      saves: [0, 0],
    },
    lineup: {
      startingFive: [
        { number: 1, name: 'Elvis', position: 'MÅLVAKT', isStarter: true },
        { number: 3, name: 'Marcelo', position: 'FÖRSVAR', isStarter: true },
        { number: 7, name: 'Raffi', position: 'MITTFÄLT', isStarter: true, isCaptain: true },
        { number: 11, name: 'Mehdi', position: 'MITTFÄLT', isStarter: true },
        { number: 6, name: 'Wael', position: 'FORWARD', isStarter: true },
      ],
      bench: [
        { number: 24, name: 'Wictor', position: 'FÖRSVAR' },
        { number: 4, name: 'Hugo', position: 'FORWARD' },
        { number: 9, name: 'Stefan', position: 'FORWARD' },
        { number: 10, name: 'Kasper', position: 'MITTFÄLT' },
        { number: 14, name: 'Lucas', position: 'FÖRSVAR' },
        { number: 18, name: 'Emin', position: 'FORWARD' },
        { number: 22, name: 'Tro', position: 'FÖRSVAR' },
      ],
      coaches: ['Raffi Medz', 'Elvis Mesic', 'Marcelo Villa'],
    },
    liveUpdates: [
      {
        time: 'GENREP',
        title: 'Sista testet innan Färgelanda cup',
        text: 'Matchen mot TIF Polhem är det slutgiltiga genrepet där cuptruppen slipar på detaljer, fasta situationer och samspel inför cuphelgen.',
      },
    ],
  },
];

export const getMatchById = (idOrSlug: string): FutsalMatch | undefined => {
  return futsalMatches.find((m) => m.id === idOrSlug || m.slug === idOrSlug);
};
