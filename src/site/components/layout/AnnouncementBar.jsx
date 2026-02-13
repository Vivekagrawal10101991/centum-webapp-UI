import React from 'react';
import { Bell } from "lucide-react";

const AnnouncementBar = () => {
  const announcements = [
    "🎉 Admissions Open for JEE 2026 Batch - Limited Seats Available!",
    "🏆 97% of our students secured top ranks in JEE Advanced 2025",
    "📚 New Foundation Program launched for Classes 8, 9 & 10",
    "⭐ Free Demo Classes Available - Book Your Slot Now!",
    "🎯 NEET 2026 Comprehensive Program with Expert Faculty",
  ];

  return (
    <div className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white py-2.5 overflow-hidden">
      <div className="flex items-center gap-3 px-6">
        <Bell className="h-4 w-4 flex-shrink-0 animate-pulse" />
        <div className="flex-1 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap inline-block">
            {announcements.map((announcement, index) => (
              <span key={index} className="text-sm font-medium mx-8">
                {announcement}
              </span>
            ))}
            {/* Duplicate for seamless loop */}
            {announcements.map((announcement, index) => (
              <span key={`dup-${index}`} className="text-sm font-medium mx-8">
                {announcement}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;