import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Positioned at the very top */}
      <AnnouncementBar />
      
      {/* Navbar directly below the blue bar */}
      <Navbar />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;