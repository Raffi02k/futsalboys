import React from 'react';

export const StatsBar: React.FC = () => {
  const tickerPhrases = [
    'FUTSAL BOYS TROLLHÄTTAN',
    'LEADERS OF THE CLUB: RAFFI MEDZ • ELVIS MESIC • MARCELO VILLA',
    'HEMMAARENA: ARENA ÄLVHÖGSBORG',
    '100% PASSION & VINNARKULTUR',
    'FÖLJ RESAN PÅ @GRABBARNA.FUTSAL',
    'OFFENSIV FUTSAL & GEMENSKAP',
    'EST. 2024',
  ];

  // Repeat for continuous seamless loop
  const loopPhrases = [...tickerPhrases, ...tickerPhrases];

  return (
    <section className="stats-bar" aria-label="Ticker text">
      <div className="stats-marquee-track">
        {loopPhrases.map((phrase, idx) => (
          <span key={idx} className="marquee-text-item">
            <span className="marquee-phrase">{phrase}</span>
            <span className="marquee-dot">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
};
