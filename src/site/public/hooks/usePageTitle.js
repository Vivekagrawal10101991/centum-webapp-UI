import { useEffect } from 'react';

const usePageTitle = (title) => {
  useEffect(() => {
    // Set the title when the component mounts
    document.title = title || 'Centum Academy';
    
    // Optional: Reset to default when unmounting (usually not needed, but good practice)
    return () => {
      document.title = 'Centum Academy';
    };
  }, [title]);
};

export default usePageTitle;