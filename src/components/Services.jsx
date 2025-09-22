// components/Services.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Database, Code } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Services = () => {
  const serviceIcons = [
    <Globe className="w-8 h-8" />,
    <Smartphone className="w-8 h-8" />,
    <Database className="w-8 h-8" />,
    <Code className="w-8 h-8" />
  ];

  return (
    <section id="services" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            I provide comprehensive digital solutions to help bring your ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {portfolioData.services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -10, 
                transition: { duration: 0.3 } 
              }}
              className="bg-gray-900 p-8 rounded-xl hover:bg-gray-800 transition-all group cursor-pointer border border-gray-700 hover:border-blue-400/50"
            >
              <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                {serviceIcons[index]}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;