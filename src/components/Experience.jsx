import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto"></div>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          {portfolioData.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative mb-12 last:mb-0 group"
            >
              {/* Timeline line */}
              <div className="absolute left-8 top-12 bottom-0 w-0.5 bg-gray-700"></div>
             
              {/* Timeline dot */}
              <motion.div 
                className="absolute left-6 top-8 w-5 h-5 bg-blue-500 rounded-full border-4 border-gray-900 group-hover:bg-purple-500 transition-colors duration-300"
                whileHover={{ scale: 1.2 }}
              ></motion.div>
             
              <motion.div 
                className="ml-20 bg-gray-900 p-8 rounded-xl border border-gray-700 relative overflow-hidden cursor-pointer"
                whileHover={{ 
                  borderColor: 'rgba(147, 51, 234, 0.5)',
                  backgroundColor: 'rgba(30, 41, 59, 0.8)',
                  scale: 1.02
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated line on hover */}
                <motion.div
                  className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-blue-400 to-purple-500"
                  initial={{ scaleY: 0 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{ originY: 0 }}
                />
                
                {/* Glowing effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <motion.h3 
                      className="text-xl font-bold text-white mb-2 md:mb-0 group-hover:text-blue-300 transition-colors duration-300"
                    >
                      {exp.position}
                    </motion.h3>
                    <div className="flex items-center gap-2 text-blue-400 text-sm group-hover:text-purple-400 transition-colors duration-300">
                      <Calendar className="w-4 h-4" />
                      {exp.duration}
                    </div>
                  </div>
                  <motion.h4 
                    className="text-lg text-gray-300 mb-3 group-hover:text-purple-300 transition-colors duration-300"
                  >
                    {exp.company}
                  </motion.h4>
                  <motion.p 
                    className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300"
                  >
                    {exp.description}
                  </motion.p>
                  
                  {/* Tags/Skills if available */}
                  {exp.skills && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skillIndex}
                          className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-600 group-hover:border-purple-400 group-hover:text-purple-300 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;