import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const skillCategories = portfolioData.skills

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const skillItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const CategoryFilter = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex justify-center mb-12 gap-3 flex-wrap"
    >
      {['all', ...Object.keys(skillCategories)].map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedCategory(category)}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            selectedCategory === category
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
              : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/70 border border-gray-700/50'
          }`}
        >
          {category === 'all' ? 'All Skills' : skillCategories[category]?.title || category}
        </motion.button>
      ))}
    </motion.div>
  );

  return (
    <section 
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20" 
      id='skills'
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-20 grid-rows-12 h-full w-full">
          {Array.from({ length: 240 }).map((_, i) => (
            <div
              key={i}
              className="border border-blue-500/20"
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
            Skills
          </h1>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6 rounded-full"
          />
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            These are some skills on which I have been working on for the past 3 years
          </p>
        </motion.div>

        <CategoryFilter />

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            {Object.entries(skillCategories)
              .filter(([key]) => selectedCategory === 'all' || selectedCategory === key)
              .map(([categoryKey, category]) => (
              <motion.div
                key={categoryKey}
                variants={cardVariants}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className={`bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border ${category.borderColor} transition-all duration-300 hover:shadow-xl hover:shadow-gray-900/20 hover:bg-gray-800/60`}
              >
                {/* Category Header */}
                <h3 className={`text-2xl font-bold mb-8 text-center bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.title}
                </h3>

                {/* Skills Grid */}
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  variants={containerVariants}
                >
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      variants={skillItemVariants}
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: "rgba(59, 130, 246, 0.08)",
                        transition: { duration: 0.2 }
                      }}
                      className="flex items-center justify-center gap-4 p-4 rounded-xl bg-gray-700/20 border border-gray-600/20 transition-all duration-200 hover:border-gray-500/30"
                    >
                      <span className="text-2xl">{skill.icon}</span>
                        <span className="text-gray-300 font-medium">
                          {skill.name}
                        </span>
                      {/* <div className="flex-1"> */}
                        {/* Skill Level Bar */}
                        {/* <div className="w-full bg-gray-600/30 rounded-full h-2 mt-2 overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ 
                              duration: 0.8, 
                              delay: skillIndex * 0.1,
                              ease: "easeOut" 
                            }}
                          />
                        </div> */}
                      {/* </div> */}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Scroll to Top Button */}
        <motion.div
          className="fixed bottom-8 right-8 z-20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;