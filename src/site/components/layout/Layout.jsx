import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';
import FloatingCMSButton from './FloatingCMSButton';
import DownloadBrochureButton from './DownloadBrochureButton';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans relative overflow-x-hidden">
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

      {/* Fixed Download Brochure Button - Visible on all pages */}
      <DownloadBrochureButton />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;