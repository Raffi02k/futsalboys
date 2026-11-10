export interface Sponsor {
  id: string;
  name: string;
  category: string;
  image: string;
  logoBg?: string;
  logoFit?: 'contain' | 'cover';
  url: string;
  displayUrl: string;
  tagline: string;
  description: string;
  accentColor: string;
  glowColor: string;
  instagramHandle: string;
}

export const sponsorsList: Sponsor[] = [
  {
    id: 'abnormal',
    name: 'ABNORMAL',
    category: 'FUNKTIONSDRYCK & ENERGI',
    image: '/brand/drinkabnormal.jpeg',
    logoBg: '#060a10',
    logoFit: 'contain',
    url: 'https://drinkabnormal.com',
    displayUrl: 'drinkabnormal.com',
    tagline: 'Bad at being ordinary • Swedish Functional Energy',
    description: 'Svensk kolsyrad funktions- och energidryck med hög koffeinhalt (55mg/100ml), vitaminer och djärva smaker som ger 100% energi till futsalplanen.',
    accentColor: '#00e5ff',
    glowColor: 'rgba(0, 229, 255, 0.45)',
    instagramHandle: '@drinkabnormal',
  },
  {
    id: 'wildchips',
    name: 'WILD CHIPS',
    category: '100% SVENSKT VILTKÖTT • SNACKS',
    image: '/brand/wildships.jpg',
    logoBg: '#ffffff',
    logoFit: 'contain',
    url: 'https://wildchips.com',
    displayUrl: 'wildchips.com',
    tagline: 'Lättrökt viltkött från älg, hjort & ren • 42% protein',
    description: 'Traditionellt lättrökt och torkat svenskt viltkött. Sockerfritt, nyckelhålsmärkt och packat med 42% naturligt protein – perfekt bränsle vid träning.',
    accentColor: '#ff9900',
    glowColor: 'rgba(255, 153, 0, 0.45)',
    instagramHandle: '@wildchips',
  },
  {
    id: 'adamas',
    name: 'ADAMAS',
    category: 'PRESTATION & BENSKYDD',
    image: '/brand/adamswear.jpeg',
    logoBg: '#ffffff',
    logoFit: 'contain',
    url: 'https://adamaswear.com',
    displayUrl: 'adamswear.com',
    tagline: 'Ultralätta benskydd & performance gear för vinnare',
    description: 'Svenska ultralätta benskydd (endast ~25g) med stötdämpande hex-teknologi och kompressionspassform utan behov av tejp. Skapat för maximal rörelsefrihet.',
    accentColor: '#10ff60',
    glowColor: 'rgba(16, 255, 96, 0.45)',
    instagramHandle: '@adamaswear',
  },
];
