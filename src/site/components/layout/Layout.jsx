import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';
import FloatingCMSButton from './FloatingCMSButton';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Floating CMS Login Button - Visible on all pages */}
      <FloatingCMSButton />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;