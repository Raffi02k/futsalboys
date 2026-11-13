import React from 'react';
import { PageMeta } from '../components/PageMeta';
import { MerchSection } from '../components/MerchSection';
import { siteConfig } from '../content/siteContent';

export const MerchPage: React.FC = () => {
  return (
    <>
      <PageMeta
        title={`Officiell Merch & Shop | ${siteConfig.projectName} - Trollhättan`}
        description="Köp officiell Futsal Boys merch! Kepsar, supportertröjor och färdiga supporterpaket. Beställ smidigt direkt via DM på Instagram."
        canonicalPath="/merch"
      />

      <div style={{ paddingTop: '100px', minHeight: '80vh' }}>
        <MerchSection />
      </div>
    </>
  );
};

