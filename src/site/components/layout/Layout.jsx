import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Positioned at the very top (Dark, Fading News) */}
      <AnnouncementBar />
      
      {/* Navbar directly below (White, Sticky) */}
      <Navbar />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;