import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Blue Navbar (Top) */}
      <Navbar />

      {/* 2. White Announcement Bar (Directly Below) */}
      <AnnouncementBar />
      
      {/* 3. Page Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;