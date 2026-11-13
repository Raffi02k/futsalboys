export interface MerchItem {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  badgeType?: 'hot' | 'value' | 'popular';
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  sizes?: string[];
  dmMessage: string;
}

export const merchList: MerchItem[] = [
  {
    id: 'keps',
    title: 'FUTSAL BOYS KEPS',
    subtitle: 'Officiell svart keps med broderat klubbmärke',
    price: 150,
    badge: 'POPULÄR',
    badgeType: 'popular',
    image: '/merch/keps-bild.JPG',
    gallery: [
      '/merch/keps-bild.JPG',
      '/merch/narabild-troja-keps.JPG',
      '/merch/model-utebild.JPG',
    ],
    description:
      'Stilren kolfibersvart keps i slitstark bomullskvalitet med 3D-broderad Futsal Boys-logotyp i neongrönt och vitt. Justerbart spänne baktill för perfekt passform.',
    features: [
      '100% slitstark bomullstwill',
      'Exklusivt 3D-broderat klubbmärke',
      'Justerbart metallspänne (One Size fits all)',
      'Böjd skärm med förstärkta sömmar',
    ],
    dmMessage: 'Tjena! Jag vill beställa en Futsal Boys Keps (150 kr).',
  },
  {
    id: 'supportertroja',
    title: 'FUTSAL BOYS SUPPORTERTRÖJA',
    subtitle: 'Officiell vit piké med bröstbrodyr och ryggtryck',
    price: 299,
    badge: 'BÄSTSÄLJARE',
    badgeType: 'hot',
    image: '/merch/model-vitbackgrund-keps-troja-rygg.JPG',
    gallery: [
      '/merch/model-vitbackgrund-keps-troja-rygg.JPG',
      '/merch/model-utebild.JPG',
      '/merch/rygg-trojabild.JPG',
      '/merch/narabild-troja-keps.JPG',
    ],
    description:
      'Klassisk vit supporterpiké med broderat klubbmärke på bröstet och stilrent "FUTSAL BOYS SUPPORTER"-tryck i svart och neon på ryggen. Tillverkad i mjuk och luftig pikébomull.',
    features: [
      'Premium pikébomull med hög andningsförmåga',
      'Broderad klubblogo på vänster bröst',
      'Högkvalitativt FUTSAL BOYS SUPPORTER-screentryck på rygg',
      'Klassisk ribbad krage och två knappar',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    dmMessage: 'Tjena! Jag vill beställa Futsal Boys Supportertröja (299 kr). Storlek: ',
  },
  {
    id: 'combo-troja-keps',
    title: 'SUPPORTER COMBO (TRÖJA + KEPS)',
    subtitle: '1 st Supportertröja + 1 st Keps',
    price: 399,
    originalPrice: 449,
    badge: 'SPARA 50 KR',
    badgeType: 'value',
    image: '/merch/Set-troja-keps.JPG',
    gallery: [
      '/merch/Set-troja-keps.JPG',
      '/merch/narabild-troja-keps.JPG',
      '/merch/model-utebild.JPG',
      '/merch/model-vitbackgrund-keps-troja-rygg.JPG',
    ],
    description:
      'Vårt mest populära supporterkit! Få både den officiella supportertröjan och den broderade kepsen till ett rabatterat paketpris. Perfekt matchdagsoutfit i hallen.',
    features: [
      'Inkluderar 1 st Supportertröja (valfri storlek)',
      'Inkluderar 1 st Keps med 3D-brodyr',
      'Spara 50 kr jämfört med ordinarie styckpris',
      '100% officiell klubbmerch',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    dmMessage: 'Tjena! Jag vill beställa Supporter Combo: 1 tröja + 1 keps (399 kr). Tröjstorlek: ',
  },
  {
    id: 'full-package',
    title: 'FULL PACKAGE (2 KEPSAR + 1 TRÖJA)',
    subtitle: 'Maxat supporterset för vänner och familj',
    price: 499,
    originalPrice: 599,
    badge: 'BÄSTA VÄRDE',
    badgeType: 'value',
    image: '/merch/full-package-2troja-2keps.JPG',
    gallery: [
      '/merch/full-package-2troja-2keps.JPG',
      '/merch/Set-troja-keps.JPG',
      '/merch/model-utebild.JPG',
      '/merch/narabild-troja-keps.JPG',
    ],
    description:
      'Det ultimata supporterpaketet! Perfekt när ni är två som vill matcha eller om du vill ha extra kepsar till familjen. Innehåller 2 st kepsar och 1 st supportertröja (kan anpassas vid beställning i DM).',
    features: [
      'Innehåller 2 st Kepsar + 1 st Supportertröja',
      'Möjlighet att välja tröjstorlek vid beställning',
      'Maximal rabatt och mest värde för pengarna',
      'Snabb överlämning i Trollhättan / skickas spårbart',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    dmMessage: 'Tjena! Jag vill beställa Full Package Set (499 kr). Tröjstorlek: ',
  },
];

