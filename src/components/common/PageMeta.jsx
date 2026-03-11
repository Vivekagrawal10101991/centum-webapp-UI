import { useEffect } from 'react';

const PageMeta = ({ title, children }) => {
  useEffect(() => {
    // Update the document title when the component mounts or title changes
    document.title = title || 'Centum Academy';
  }, [title]);

  return <>{children}</>;
};

export default PageMeta;