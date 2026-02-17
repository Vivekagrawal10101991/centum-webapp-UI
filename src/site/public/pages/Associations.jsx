import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Building2, 
  Handshake, 
  Globe, 
  Shield, 
  Star, 
  CheckCircle, 
  ExternalLink,
  Users 
} from 'lucide-react';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';

/**
 * Associations Component
 * Fully updated with Hero, Trust Badges, Memberships, Philosophy, and CTA.
 */
const Associations = () => {
  const associations = [
    {
      name: "National Board for Education",
      type: "Accreditation Body",
      logo: "🎓",
      description: "Centum Academy is recognized and accredited by the National Board for Education, ensuring our curriculum meets the highest educational standards.",
      benefits: [
        "Nationally recognized certification",
        "Regular quality audits and assessments",
        "Access to national-level resources"
      ],
      status: "Active Member",
      year: "Since 2015"
    },
    {
      name: "Indian Coaching Federation",
      type: "Professional Association",
      logo: "📚",
      description: "As proud members of the Indian Coaching Federation, we adhere to the best practices in coaching methodology and student welfare.",
      benefits: [
        "Industry best practices implementation",
        "Faculty training and development programs",
        "Network of leading educators"
      ],
      status: "Platinum Member",
      year: "Since 2016"
    },
    {
      name: "Education Quality Assurance Council",
      type: "Quality Certification",
      logo: "✓",
      description: "We maintain ISO-certified quality standards in education delivery, infrastructure, and student support services.",
      benefits: [
        "ISO 9001:2015 certified processes",
        "Regular quality assessments",
        "Continuous improvement framework"
      ],
      status: "Certified Institute",
      year: "Since 2018"
    },
    {
      name: "National Skill Development Corporation",
      type: "Skill Development Partner",
      logo: "🛠️",
      description: "Partnership for enhancing student employability through skill development programs alongside academic preparation.",
      benefits: [
        "Industry-relevant skill training",
        "Career counseling resources",
        "Placement assistance programs"
      ],
      status: "Partner Institute",
      year: "Since 2019"
    },
    {
      name: "Digital Education Alliance",
      type: "Technology Partner",
      logo: "💻",
      description: "Member of the Digital Education Alliance, leveraging cutting-edge technology for enhanced learning experiences.",
      benefits: [
        "Access to latest EdTech platforms",
        "Digital content libraries",
        "Online assessment tools"
      ],
      status: "Technology Partner",
      year: "Since 2020"
    },
    {
      name: "Parent-Teacher Association Network",
      type: "Community Association",
      logo: "👥",
      description: "Active participation in the national PTA network, fostering strong parent-teacher collaboration.",
      benefits: [
        "Regular parent engagement programs",
        "Student welfare initiatives",
        "Community development projects"
      ],
      status: "Active Chapter",
      year: "Since 2017"
    }
  ];

  const certifications = [
    {
      title: "ISO 9001:2015",
      description: "Quality Management System",
      icon: Shield
    },
    {
      title: "MSME Registered",
      description: "Government Recognition",
      icon: Building2
    },
    {
      title: "Safe Campus",
      description: "Student Safety Certification",
      icon: CheckCircle
    },
    {
      title: "Excellence in Education",
      description: "National Award 2023",
      icon: Award
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* 1. Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#0D9488] text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6"
          >
            <Handshake className="h-6 w-6" />
            <span className="text-sm font-semibold uppercase tracking-wider">Partnerships</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Our Associations
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            Trusted partnerships and accreditations that validate our commitment to excellence
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* 2. Trust Badges Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16 border border-slate-100"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Recognized & Certified
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Our certifications and recognitions demonstrate our unwavering commitment to quality education
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-slate-50 to-white border-2 border-slate-100 rounded-2xl p-6 text-center hover:border-purple-600 hover:shadow-lg transition-all"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-600/20">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{cert.title}</h3>
                  <p className="text-sm text-slate-600 font-medium">{cert.description}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 3. Professional Memberships Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Professional Memberships
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We are proud members of leading educational bodies and professional associations
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {associations.map((assoc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all border-slate-100" hover={true}>
                  <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-8 text-white">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-6xl">{assoc.logo}</div>
                      <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20">
                        {assoc.status}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 tracking-tight">{assoc.name}</h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                      <Building2 className="h-4 w-4" />
                      <span>{assoc.type}</span>
                      <span className="mx-2 opacity-50">•</span>
                      <span>{assoc.year}</span>
                    </div>
                  </div>
                  <div className="p-8 bg-white">
                    <p className="text-slate-700 leading-relaxed mb-6 font-medium">
                      {assoc.description}
                    </p>
                    <div className="space-y-4">
                      <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2 uppercase tracking-wide">
                        <Star className="h-4 w-4 text-amber-500" />
                        Key Benefits
                      </h4>
                      <ul className="grid gap-3">
                        {assoc.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                            <CheckCircle className="h-5 w-5 text-emerald-600 mt-0 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4. Philosophy Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 rounded-[3rem] p-8 md:p-16 border border-white shadow-inner mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                Why Our Associations Matter
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-8">
                Our memberships and certifications aren't just badges – they represent our commitment 
                to maintaining the highest standards in education, student welfare, and institutional excellence.
              </p>
              <div className="space-y-6">
                {[
                  { icon: CheckCircle, title: "Quality Assurance", text: "Regular audits ensure we maintain top-tier educational standards", color: "bg-purple-200", iconColor: "text-purple-600" },
                  { icon: Globe, title: "Industry Recognition", text: "National recognition validates our educational approach", color: "bg-blue-200", iconColor: "text-blue-600" },
                  { icon: Award, title: "Continuous Improvement", text: "Access to best practices and latest educational innovations", color: "bg-teal-200", iconColor: "text-emerald-600" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <item.icon className={`h-6 w-6 ${item.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-slate-600 font-medium">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-2xl border border-white">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Users className="h-6 w-6 text-purple-600" />
                Benefits to Students
              </h3>
              <ul className="space-y-4">
                {[
                  "Access to nationally recognized curriculum and study materials",
                  "Faculty trained by industry-leading professional bodies",
                  "Quality-assured teaching methodologies and assessment systems",
                  "Enhanced career support through skill development programs",
                  "Safe and certified learning environment"
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700 font-semibold leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* 5. CTA Section - Added above Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-16 border border-slate-100"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
            Join an Institution You Can Trust
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Our associations and certifications demonstrate our commitment to providing you with the best educational experience backed by national standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button 
              variant="primary"
              size="lg"
              className="px-10 py-4 bg-purple-600 hover:bg-purple-700 shadow-xl shadow-purple-600/20 uppercase tracking-wider text-sm font-bold"
            >
              Explore Programs
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="px-10 py-4 border-blue-600 text-blue-600 hover:bg-blue-50 uppercase tracking-wider text-sm font-bold"
            >
              Contact Us
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Associations;