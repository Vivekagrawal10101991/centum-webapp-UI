import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Card } from '../components/common';
import EnquiryForm from '../components/specific/EnquiryForm';

/**
 * Contact Page
 * Contact information and embedded enquiry form
 */
const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      content: '123 Education Street, Learning City, 560001',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 98765 43210',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@centumacademy.com',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      content: 'Mon - Sat: 9:00 AM - 6:00 PM',
    },
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <Card key={index} className="p-6" hover>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-50 text-primary flex items-center justify-center">
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      <p className="text-gray-600">{info.content}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Map Placeholder */}
            <Card className="overflow-hidden">
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Map Integration (Google Maps)</p>
              </div>
            </Card>
          </div>

          {/* Enquiry Form */}
          <div>
            <Card className="p-8">
              <EnquiryForm embedded />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
