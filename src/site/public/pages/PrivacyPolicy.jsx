import React, { useEffect } from 'react';
import { Mail, Phone, MapPin, Target, UserPlus, Clock3, AlertTriangle, ShieldCheck } from 'lucide-react';

const PrivacyPolicy = () => {
  // Ensure we start at the top of the page on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toc = [
    { title: "WHAT INFORMATION DO WE COLLECT?", id: "collect" },
    { title: "HOW DO WE PROCESS YOUR INFORMATION?", id: "process" },
    { title: "WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?", id: "share" },
    { title: "DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?", id: "cookies" },
    { title: "HOW LONG DO WE KEEP YOUR INFORMATION?", id: "retention" },
    { title: "HOW DO WE KEEP YOUR INFORMATION SAFE?", id: "safety" },
    { title: "WHAT ARE YOUR PRIVACY RIGHTS?", id: "rights" },
    { title: "CONTROLS FOR DO-NOT-TRACK FEATURES", id: "dnt" },
    { title: "DO WE MAKE UPDATES TO THIS NOTICE?", id: "updates" },
    { title: "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?", id: "contact" },
    { title: "HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA?", id: "review" },
  ];

  const keyPoints = [
    { Icon: UserPlus, text: "Personal information we collect includes names, phone numbers, and email addresses voluntarily disclosed during signup, registration, or inquiries." },
    { Icon: ShieldCheck, text: "We DO NOT process sensitive personal information and we DO NOT receive information from third parties." },
    { Icon: Target, text: "We process information to provide Services, manage accounts, respond to inquiries, request feedback, and protect our Services (fraud monitoring)." },
    { Icon: Clock3, text: "We keep your personal information only for as long as users have an active account with us or as required for tax/accounting/legal requirements." },
    { Icon: AlertTriangle, text: "We aim to protect your data through technical security measures, but no internet transmission is 100% secure. Services should only be accessed in a secure environment." },
  ];

  const sectionH2 = "text-2xl font-bold text-[#27295c] mb-6 border-b border-slate-200 pb-3 font-display pt-8";
  const sectionP = "text-slate-700 text-sm leading-relaxed mb-4";
  const boldSpan = "font-bold text-slate-900";

  // Smooth scroll helper for TOC links
  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Offset by 100px to account for sticky navbar
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* PROFESSIONAL HEADER SECTION */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-3 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-bold mb-4 border border-indigo-100">
            <ShieldCheck className="w-4 h-4" />
            CONFIDENTIAL DOC
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#27295c] font-display tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm font-medium text-slate-500 flex items-center justify-center gap-2">
            <Clock3 className="w-4 h-4" />
            Last updated: <span className="text-slate-800 font-bold">July 18, 2023</span>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12 relative">
          
          {/* MAIN CONTENT AREA */}
          <div className="flex-1 space-y-16">
            
            {/* INTRODUCTION SECTION */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-10">
              <p className={sectionP}>
                Visit our website at <a href="https://centumacademy.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-medium">https://centumacademy.com/</a>, or any website of ours that links to this privacy notice. Engage with us in other related ways, including any sales, marketing, or events.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-100 p-6 rounded-xl mt-8 border border-slate-200">
                <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-inner border border-slate-200 shrink-0">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900">Questions or concerns?</h4>
                  <p className="text-sm text-slate-700 mt-1 mb-3">Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies, please do not use our Services. If you still have questions, please email us directly.</p>
                  <a href="mailto:contactus@centumacademy.com" className="text-indigo-600 hover:underline font-bold text-sm flex items-center gap-1.5">
                    contactus@centumacademy.com <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* SUMMARY OF KEY POINTS */}
            <div>
              <h2 className="text-2xl font-bold text-[#27295c] mb-6 border-b border-slate-200 pb-3 font-display">Summary of Key Points</h2>
              <p className={`${sectionP} mb-8`}>This summary provides key points from our privacy notice. Reading this notice helps understand how we process data.</p>
              <div className="grid md:grid-cols-2 gap-6">
                {keyPoints.map((point, index) => {
                  const Icon = point.Icon;
                  return (
                    <div key={index} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-start gap-4">
                      <div className="p-2.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 mt-1 shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{point.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* DETAILED SECTIONS */}
            <div className="space-y-4">
              <section id="collect">
                <h2 className={sectionH2}>1. WHAT INFORMATION DO WE COLLECT?</h2>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Personal information you disclose to us</h3>
                <p className={sectionP}><em className="text-slate-600">In Short: We collect personal information that you provide to us.</em></p>
                <p className={sectionP}>We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>
                <p className={sectionP}><span className={boldSpan}>Personal Information Provided by You.</span> The personal information we collect depends on the context of your interactions with us. The personal information we collect may include: names, phone numbers, and email addresses.</p>
                <p className={`${sectionP} mt-6 p-4 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-100 flex gap-2.5 items-center text-sm font-medium`}>
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  We DO NOT process sensitive personal information.
                </p>
                <p className={sectionP}>All personal information provided must be true, complete, and accurate, and you must notify us of any changes.</p>
              </section>

              <section id="process">
                <h2 className={sectionH2}>2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
                <p className={sectionP}><em className="text-slate-600">In Short: We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.</em></p>
                <p className={sectionP}>We process your information for reasons including:</p>
                <ul className="list-disc pl-5 space-y-3 text-sm text-slate-700 mb-4">
                  <li><span className={boldSpan}>To manage user accounts:</span> So you can create and log in to your account, and keep it in working order.</li>
                  <li><span className={boldSpan}>To respond to inquiries/offer support:</span> To solve potential issues with the requested service.</li>
                  <li><span className={boldSpan}>To request feedback:</span> Necessary to contact you about your use of our Services.</li>
                  <li><span className={boldSpan}>To protect our Services:</span> Including fraud monitoring and prevention.</li>
                </ul>
              </section>

              <section id="share">
                <h2 className={sectionH2}>3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
                <p className={sectionP}><em className="text-slate-600">In Short: We may share information in specific situations and with specific third parties.</em></p>
                <p className={sectionP}>Situations for sharing information:</p>
                <ul className="list-disc pl-5 text-sm text-slate-700 mb-4">
                  <li><span className={boldSpan}>Business Transfers:</span> We may share or transfer information in connection with any merger, sale of company assets, financing, or acquisition.</li>
                </ul>
              </section>

              <section id="cookies">
                <h2 className={sectionH2}>4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
                <p className={sectionP}><em className="text-slate-600">In Short: We may use cookies and other tracking technologies to collect and store your information.</em></p>
                <p className={sectionP}>We may use cookies and similar technologies (like web beacons and pixels) to access or store information. Specific details are set out in our Cookie Notice.</p>
              </section>

              <section id="retention">
                <h2 className={sectionH2}>5. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
                <p className={sectionP}><em className="text-slate-600">In Short: We keep your information for as long as necessary to fulfill the purposes outlined unless otherwise required by law.</em></p>
                <p className={sectionP}>We will only keep your personal information for as long as users have an active account with us or as required/permitted by law (tax, accounting, other legal requirements).</p>
                <p className={sectionP}>When we have no ongoing legitimate need to process information, we will either delete or anonymize such information or securely store and isolate it.</p>
              </section>

              <section id="safety">
                <h2 className={sectionH2}>6. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
                <p className={sectionP}><em className="text-slate-600">In Short: We aim to protect information through technical security measures.</em></p>
                <p className={sectionP}>We have implemented appropriate security measures to protect personal information. However, no transmission over the Internet is 100% secure, so we cannot promise or guarantee hackers will not be able to defeat our security. Services should be accessed in a secure environment.</p>
              </section>

              <section id="rights">
                <h2 className={sectionH2}>7. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
                <p className={sectionP}><em className="text-slate-600">In Short: You may review, change, or terminate your account at any time.</em></p>
                <p className={sectionP}><span className={boldSpan}>Withdrawing consent:</span> If we rely on your consent to process personal information, you have the right to withdraw consent at any time. This will not affect processing before withdrawal nor processing reliance on lawful grounds other than consent.</p>
                <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">Account Information</h3>
                <p className={sectionP}>To review, change information, or terminate an account, you can:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 mb-4">
                  <li>Log in to account settings and update the user account.</li>
                  <li>Contact us using the provided contact information.</li>
                </ul>
                <p className={sectionP}>Upon termination request, we will deactivate/delete account information, but may retain some information to prevent fraud, assist investigations, enforce terms, or comply with legal requirements.</p>
                <p className={sectionP}><span className={boldSpan}>Cookies:</span> Most browsers accept cookies by default, but you can usually remove or reject them. This could affect certain features of our Services.</p>
              </section>

              <section id="dnt">
                <h2 className={sectionH2}>8. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
                <p className={sectionP}>Most web browsers and some mobile operating systems include a Do-Not-Track ("DNT") feature. No uniform standard for implementing DNT signals has been finalized. We do not currently respond to DNT signals. If a standard is adopted in the future, we will inform you.</p>
              </section>

              <section id="updates">
                <h2 className={sectionH2}>9. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
                <p className={sectionP}><em className="text-slate-600">In Short: Yes, we will update this notice as necessary to stay compliant with laws.</em></p>
                <p className={sectionP}>We may update this notice from time to time. The updated version will be effective as soon as accessible. If material changes are made, we may notify you prominently posting a notice or directly sending a notification.</p>
              </section>

              <section id="contact">
                <h2 className={sectionH2}>10. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
                <p className={sectionP}>If you have questions about this notice, you may email us at <a href="mailto:contactus@centumacademy.com" className="text-indigo-600 hover:underline font-bold">contactus@centumacademy.com</a> or contact us by post at:</p>
                <address className="not-italic bg-white p-6 rounded-xl border border-slate-100 shadow-sm inline-block mt-4 space-y-5">
                  <div className="flex gap-3 items-center font-semibold text-lg text-[#27295c]">
                    <MapPin className="w-5 h-5 text-indigo-500 shrink-0" />
                    Centum Academy
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed pl-8">
                    1514, 19th Main, Sector 1, HSR Layout<br />
                    Bengaluru, Karnataka 560102<br />
                    India
                  </p>
                </address>
              </section>

              <section id="review">
                <h2 className={sectionH2}>11. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA?</h2>
                <p className={sectionP}>Based on applicable laws of your country, you may have the right to request access to personal information collected, change information, or delete it.</p>
              </section>
            </div>
          </div>

          {/* TABLE OF CONTENTS - FIX: h-max and sticky directly on the wrapper */}
          <div className="hidden lg:block w-80 shrink-0 sticky top-28 h-max">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
              <h3 className="text-xl font-bold text-[#27295c] mb-6 font-display flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-600" />
                Table of Contents
              </h3>
              <ul className="space-y-3.5">
                {toc.map((item, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-slate-400 font-bold text-sm w-5 shrink-0">{index + 1}.</span>
                    <a 
                      href={`#${item.id}`} 
                      onClick={(e) => handleScroll(e, item.id)}
                      className="text-slate-600 hover:text-indigo-600 text-sm leading-snug transition-colors"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;