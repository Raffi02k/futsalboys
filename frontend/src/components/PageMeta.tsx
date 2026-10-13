import React, { useEffect } from 'react';
import { siteConfig } from '../content/siteContent';

interface PageMetaProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  noindex?: boolean;
}

export const PageMeta: React.FC<PageMetaProps> = ({
  title,
  description,
  canonicalPath = '',
  noindex = false,
}) => {
  const fullTitle = title
    ? `${title} | ${siteConfig.projectName}`
    : `${siteConfig.projectName} | ${siteConfig.tagline}`;

  const metaDesc = description || siteConfig.description;
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://mnpaintpros.com';
  const canonicalUrl = `${origin}${canonicalPath}`;

  useEffect(() => {
    document.title = fullTitle;

    // Update meta description
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', metaDesc);

    // Update robots tag
    let robotsTag = document.querySelector('meta[name="robots"]');
    if (!robotsTag) {
      robotsTag = document.createElement('meta');
      robotsTag.setAttribute('name', 'robots');
      document.head.appendChild(robotsTag);
    }
    robotsTag.setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow');

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
  }, [fullTitle, metaDesc, canonicalUrl, noindex]);

  return null;
};
