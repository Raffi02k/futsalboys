export type MediaCategory = 'ALL' | 'MATCHER' | 'TRÄNING' | 'LAGFOTO' | 'VIDEO';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'MATCHER' | 'TRÄNING' | 'LAGFOTO' | 'VIDEO';
  type: 'image' | 'video';
  src: string; // image path or video poster thumbnail
  videoUrl?: string; // mp4 direct url or youtube embed
  date: string;
  description: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  isFeatured?: boolean; // shown on homepage preview
}

export const galleryCategories = [
  { id: 'ALL', label: 'ALLA' },
  { id: 'MATCHER', label: 'MATCHER & CUPER' },
  { id: 'TRÄNING', label: 'TRÄNING' },
  { id: 'LAGFOTO', label: 'LAGET & LEDARNA' },
  { id: 'VIDEO', label: 'VIDEOS & HIGHLIGHTS' },
] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Ledarstaben Futsal Boys 2026/27',
    category: 'LAGFOTO',
    type: 'image',
    src: '/images/futsalboys-ledare.JPG',
    date: '10 OKT 2026',
    description: 'Raffi Medz, Elvis Mesic och Marcelo Villa – ledarna som driver klubben framåt med passion och vinnarmentalitet.',
    aspectRatio: 'landscape',
    isFeatured: true,
  },
  {
    id: 'g2',
    title: 'Cupguld & Pokalfirande',
    category: 'MATCHER',
    type: 'image',
    src: '/images/instagram/cup-win.jpg',
    date: '05 OKT 2026',
    description: 'En obeskrivlig känsla när slutsignalen ljöd och pokalen lyftes mot taket i Arena Älvhögsborg!',
    aspectRatio: 'portrait',
    isFeatured: true,
  },
  {
    id: 'g3',
    title: 'Blixtsnabb kontring i kvartsfinalen',
    category: 'MATCHER',
    type: 'image',
    src: '/images/instagram/action-shot.jpg',
    date: '28 SEP 2026',
    description: 'Hög intensitet och millimeterprecision i omställningsspelet på inomhusparketten.',
    aspectRatio: 'landscape',
    isFeatured: true,
  },
  {
    id: 'g4',
    title: 'Matchhighlights: Kvartsfinalens avgörande mål',
    category: 'VIDEO',
    type: 'video',
    src: '/images/instagram/action-shot.jpg',
    videoUrl: '', // can be populated with .mp4 or youtube/reels link
    date: '28 SEP 2026',
    description: 'Se Elvis Mesics ribbskott och den matchavgörande kontringen i slutminuterna.',
    aspectRatio: 'landscape',
    isFeatured: true,
  },
  {
    id: 'g5',
    title: 'Lagcirkel inför stormatchen',
    category: 'TRÄNING',
    type: 'image',
    src: '/images/instagram/team-huddle.jpg',
    date: '20 SEP 2026',
    description: 'Fokus, energi och taktisk genomgång. Inget lämnas åt slumpen när grabbarna samlas.',
    aspectRatio: 'landscape',
    isFeatured: true,
  },
  {
    id: 'g6',
    title: 'Träningspass: Högintensivt tvåmålsspel',
    category: 'VIDEO',
    type: 'video',
    src: '/images/instagram/team-huddle.jpg',
    videoUrl: '',
    date: '15 SEP 2026',
    description: 'Korta sekvenser, maximalt tempo och stenhård fysik på onsdagsträningen.',
    aspectRatio: 'portrait',
    isFeatured: true,
  },
  {
    id: 'g7',
    title: 'Elvis Mesic – Målvakten i profil',
    category: 'LAGFOTO',
    type: 'image',
    src: '/images/players/elvis1M.JPG',
    date: '10 SEP 2026',
    description: 'Sportchefen och målvakten med nummer 1 på ryggen vaktar kassen.',
    aspectRatio: 'portrait',
    isFeatured: false,
  },
  {
    id: 'g8',
    title: 'Raffi Medz – Spelmotorn på mitten',
    category: 'LAGFOTO',
    type: 'image',
    src: '/images/players/raffi7K.JPG',
    date: '10 SEP 2026',
    description: 'Nummer 7 styr spelet med blick för luckorna och stenhård disciplin.',
    aspectRatio: 'portrait',
    isFeatured: false,
  },
  {
    id: 'g9',
    title: 'Marcelo Villa – Generalen i försvaret',
    category: 'LAGFOTO',
    type: 'image',
    src: '/images/players/marcelo3B.PNG',
    date: '10 SEP 2026',
    description: 'Nummer 3 leder laget med kompromisslös fysik och lagmoral.',
    aspectRatio: 'portrait',
    isFeatured: false,
  },
  {
    id: 'g10',
    title: 'Officiellt Lagfoto – Hela truppen',
    category: 'LAGFOTO',
    type: 'image',
    src: '/images/players/Lagfoto.JPG',
    date: '10 SEP 2026',
    description: 'Futsal Boys samlade inför den stundande säsongen och cupäventyren.',
    aspectRatio: 'portrait',
    isFeatured: true,
  },
];
