// components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Footer = () => {

    const items = [
      { name: Github, link: portfolioData.github },
      { name: Linkedin, link: portfolioData.linkedin },
      
    ];
    
  return (
    <footer className="bg-black py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {portfolioData.personal.name}
            </h3>
            <p className="text-gray-400 mt-1">{portfolioData.personal.title}</p>
          </div>
          
          <div className="flex gap-6">
            {items.map((Icon, index) => (
              <motion.a
                key={index}
                href={Icon.link}
                whileHover={{ y: -3, scale: 1.1 }}
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-all"
              >
                <Icon.name className="w-5 h-5 text-gray-400 hover:text-white" />
              </motion.a>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © 2025 {portfolioData.personal.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;