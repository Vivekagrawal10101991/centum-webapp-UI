import { useEffect, useState } from 'react';
import { Loader2, Users } from 'lucide-react';
import cmsService from '../../services/cmsService';

/**
 * Contributions Page
 * Displays initiatives in a "Media Card" layout.
 * UPDATES: 
 * 1. Wider Container (max-w-7xl) for more width.
 * 2. Faded Gradient Background (White -> Soft Blue).
 * 3. Enhanced Shadow (Shadow-XL).
 */
const Contributions = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await cmsService.getContributors();
        setContributors(data || []);
      } catch (error) {
        console.error("Failed to load contributions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50 overflow-x-hidden">
      {/* ✅ INCREASED WIDTH: max-w-7xl (was 6xl) */}
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Our Initiatives</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6">
            Contributions & <span className="text-blue-600">Community</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We believe in giving back. Here are the dedicated people and programs making a real difference.
          </p>
        </div>

        {/* Contributions List */}
        {contributors.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-200">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No contributions posted yet.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {contributors.map((item, index) => {
              // Determine layout direction (Alternate on Desktop only)
              const isEven = index % 2 === 0;

              return (
                // MASTER CARD CONTAINER
                <div 
                  key={item.id} 
                  className={`
                    flex flex-col lg:flex-row items-start gap-8 
                    rounded-2xl p-8 transition-all duration-300
                    
                    /* ✅ FADED GRADIENT & SHADOW */
                    bg-gradient-to-br from-white via-white to-blue-50/60
                    shadow-xl hover:shadow-2xl hover:scale-[1.01]
                    border border-blue-100/50

                    ${!isEven ? 'lg:flex-row-reverse' : ''}
                  `}
                >
                  
                  {/* IMAGE SECTION */}
                  {/* Kept fixed size (w-80 h-64) but added shadow to image itself */}
                  <div className="w-full lg:w-96 h-64 shrink-0 relative rounded-xl overflow-hidden shadow-md bg-white border border-gray-100">
                    <img 
                      src={item.imageUrl || 'https://via.placeholder.com/800x600?text=Centum+Academy'} 
                      alt={item.title} 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* CONTENT SECTION */}
                  <div className="flex-1 min-w-0 flex flex-col justify-start">
                    
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      {item.title}
                    </h2>
                    
                    {/* Decorative Divider */}
                    <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mb-6" />

                    {/* Rich Text Content */}
                    <div 
                      className="
                        prose prose-lg prose-blue text-gray-600 max-w-none break-words
                        
                        /* List Styles */
                        [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4
                        [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4
                        [&_li]:mb-2 [&_li]:pl-1
                        
                        /* Text Styles */
                        [&_strong]:font-bold [&_strong]:text-gray-900
                        [&_p]:mb-4 [&_p]:leading-relaxed
                      "
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contributions;