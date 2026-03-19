import { useEffect } from 'react';

const PageMeta = ({ title, description, path, children }) => {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title || 'Centum Academy';

    // 2. Update Meta Description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }

    // 3. Update Canonical Tag
    if (path) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', `https://centumacademy.com${path}`);
    }
  }, [title, description, path]);

  return <>{children}</>;
};

export default PageMeta;