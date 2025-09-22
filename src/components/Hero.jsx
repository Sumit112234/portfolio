import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ChevronDown, Zap, Code, Palette, Brain } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 250]);
  
  // Mouse tracking for robotic effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  
  // Text change states (removed lightning states)
  const [currentRole, setCurrentRole] = useState(0);
  
  const roles = [
    { text: "Full Stack Developer", icon: Code, color: "from-blue-400 to-cyan-400" },
    { text: "UI/UX Designer", icon: Palette, color: "from-purple-400 to-pink-400" },
    { text: "Frontend Specialist", icon: Brain, color: "from-green-400 to-emerald-400" },
    { text: "React Developer", icon: Zap, color: "from-orange-400 to-red-400" }
  ];

  // Circuit board nodes
  const [circuitNodes, setCircuitNodes] = useState([]);
  const [activeNodes, setActiveNodes] = useState(new Set());

  const items = [
    { name: Github, link: portfolioData.github },
    { name: Linkedin, link: portfolioData.linkedin },
    
  ];
  
  // Breaking stars
  const [stars, setStars] = useState([]);

  // Initialize circuit board
  useEffect(() => {
    const nodes = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: (i % 5) * 20 + 10,
      y: Math.floor(i / 5) * 20 + 10,
      connections: [],
      active: false,
    }));
    
    // Create connections between adjacent nodes
    nodes.forEach(node => {
      const { x, y } = node;
      nodes.forEach(other => {
        const distance = Math.sqrt(Math.pow(x - other.x, 2) + Math.pow(y - other.y, 2));
        if (distance <= 25 && distance > 0) {
          node.connections.push(other.id);
        }
      });
    });
    
    setCircuitNodes(nodes);
  }, []);

  // Initialize breaking stars
  useEffect(() => {
    const generateStars = () => {
      return Array.from({ length: 150 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkle: Math.random() * 2 + 1,
      }));
    };
    
    setStars(generateStars());
  }, []);

  // Simple text change without lightning
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  // Mouse interaction for circuit board
  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    mouseX.set(x);
    mouseY.set(y);

    // Activate nearby circuit nodes
    const newActiveNodes = new Set();
    circuitNodes.forEach(node => {
      const distance = Math.sqrt(Math.pow(node.x - x, 2) + Math.pow(node.y - y, 2));
      if (distance < 15) {
        newActiveNodes.add(node.id);
        // Activate connected nodes
        node.connections.forEach(connId => newActiveNodes.add(connId));
      }
    });
    setActiveNodes(newActiveNodes);
  };

  const currentRoleData = roles[currentRole];

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800"
      onMouseMove={handleMouseMove}
    >
      {/* BREAKING STARS BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.y}%`,
              left: `${star.x}%`,
            }}
            animate={{
              x: ['0vw', '120vw'],
              opacity: [star.opacity, star.opacity * 0.3, star.opacity],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: star.speed * 8,
              repeat: Infinity,
              ease: "linear",
              opacity: {
                duration: star.twinkle,
                repeat: Infinity,
                repeatType: "reverse"
              },
              scale: {
                duration: star.twinkle,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
        ))}
        
        {/* Shooting star trails */}
        {stars.slice(0, 5).map((star, index) => (
          <motion.div
            key={`trail-${star.id}`}
            className="absolute h-px bg-gradient-to-r from-white via-cyan-200 to-transparent"
            style={{
              top: `${star.y}%`,
              left: `${star.x}%`,
              width: `${star.size * 20}px`,
            }}
            animate={{
              x: ['0vw', '120vw'],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: star.speed * 4,
              repeat: Infinity,
              ease: "linear",
              delay: index * 3,
            }}
          />
        ))}
      </div>

      {/* ROBOTIC CIRCUIT BOARD BACKGROUND */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Circuit connections */}
          {circuitNodes.map(node => 
            node.connections.map(connId => {
              const targetNode = circuitNodes.find(n => n.id === connId);
              if (!targetNode) return null;
              
              const isActive = activeNodes.has(node.id) || activeNodes.has(connId);
              
              return (
                <motion.line
                  key={`${node.id}-${connId}`}
                  x1={node.x}
                  y1={node.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={isActive ? "#00FFFF" : "#334155"}
                  strokeWidth={isActive ? "0.3" : "0.1"}
                  animate={{
                    opacity: isActive ? [0.3, 1, 0.3] : 0.3,
                    strokeWidth: isActive ? [0.1, 0.5, 0.3] : 0.1
                  }}
                  transition={{ duration: 0.5 }}
                />
              );
            })
          )}
          
          {/* Circuit nodes */}
          {circuitNodes.map(node => (
            <motion.circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r={activeNodes.has(node.id) ? "0.8" : "0.3"}
              fill={activeNodes.has(node.id) ? "#00FFFF" : "#64748B"}
              animate={{
                r: activeNodes.has(node.id) ? [0.3, 1.2, 0.8] : 0.3,
                opacity: activeNodes.has(node.id) ? [0.5, 1, 0.7] : 0.5
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
          
          {/* Grid pattern */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1E293B" strokeWidth="0.1"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" opacity="0.3" />
        </svg>
      </div>

      {/* ROBOTIC HOVER EFFECTS */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: useTransform(
            [smoothMouseX, smoothMouseY],
            ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(0,255,255,0.1) 0%, transparent 50%)`
          )
        }}
      />

      <div className="container mx-auto px-4 text-center relative z-10">
        
        {/* ENHANCED PROFILE IMAGE - Larger, No Rotation, Hover Border */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: -50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          className="mb-8 relative"
        >
          <motion.div 
            whileHover={{ 
              scale: 1.05,
            }}
            className="w-52 h-52 mx-auto mb-6 rounded-full overflow-hidden relative group"
          >
            {/* Static border that appears on hover */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-500 via-pink-500 to-orange-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{
                boxShadow: "0 0 40px rgba(0, 255, 255, 0.6)",
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-900">
                <img 
                  src={portfolioData.personal.image}
                  alt={portfolioData.personal.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            {/* Default image without border */}
            <div className="w-full h-full rounded-full overflow-hidden bg-gray-900 group-hover:opacity-0 transition-opacity duration-300">
              <img 
                src={portfolioData.personal.image}
                alt={portfolioData.personal.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Holographic scan */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent transform -rotate-45"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
          </motion.div>
        </motion.div>

        {/* MAIN HEADING */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          <motion.span 
            className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent relative"
          >
            {portfolioData.personal.name}
          </motion.span>
        </motion.h1>

        {/* SIMPLE ROLE CHANGER */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-3xl mb-2 h-16 flex items-center justify-center relative"
        >
          <motion.div
            key={currentRole}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`flex items-center gap-3 bg-gradient-to-r ${currentRoleData.color} bg-clip-text text-transparent font-bold`}
          >
            <currentRoleData.icon className="w-8 h-8 text-cyan-400" />
            <span>{currentRoleData.text}</span>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto"
        >
          {portfolioData.personal.subtitle}
        </motion.p>

        {/* ROBOTIC ACTION BUTTONS */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: [
                  '0 0 20px rgba(0, 255, 255, 0.4)',
                  '0 0 40px rgba(0, 255, 255, 0.6)',
                  '0 0 20px rgba(0, 255, 255, 0.4)'
                ],
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/Updated_Resume.pdf';
                link.download = 'Sumit_Baghel_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-medium flex items-center gap-2 relative overflow-hidden border border-cyan-400/30"
            >
              <span className="relative z-10 cursor-pointer">Download Resume</span>
            
            {/* Circuit pattern overlay */}
            <motion.div
              className="absolute inset-0 opacity-20"
              whileHover={{ opacity: 0.3 }}
            >
              <svg className="w-full h-full" viewBox="0 0 100 20">
                <path d="M0,10 L20,10 L25,5 L30,15 L35,10 L100,10" stroke="currentColor" strokeWidth="1" fill="none" />
              </svg>
            </motion.div>
          </motion.button>
          
          <motion.a
            href="#contact"
            whileHover={{ 
              scale: 1.05,
              borderColor: "rgb(0, 255, 255)",
              color: "rgb(0, 255, 255)",
              boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-gray-600 rounded-full font-medium transition-all backdrop-blur-sm bg-black/20"
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* ROBOTIC SOCIAL LINKS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex justify-center gap-6"
        >
          {items.map((Icon, index) => (
            <motion.a
              key={index}
              target='_blank'
              href={Icon.link}
              whileHover={{ 
                y: -8, 
                scale: 1.2,
                boxShadow: "0 0 25px rgba(0, 255, 255, 0.5)"
              }}
              className="p-4 bg-gray-900/80 backdrop-blur-sm rounded-full border border-cyan-400/30 relative overflow-hidden group"
            >
              <Icon.name className="w-6 h-6 relative z-10 text-cyan-400" />
              
              {/* Robotic scan line */}
              <motion.div
                className="absolute inset-0 bg-cyan-400/10"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* ENHANCED SCROLL INDICATOR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <ChevronDown className="w-8 h-8 text-cyan-400" />
            
            {/* Robotic trail */}
            <motion.div
              className="w-1 h-20 bg-gradient-to-b from-cyan-400/0 via-cyan-400/80 to-cyan-400/0 relative"
              animate={{ 
                opacity: [0.3, 1, 0.3],
                boxShadow: [
                  "0 0 5px rgba(0, 255, 255, 0.3)",
                  "0 0 15px rgba(0, 255, 255, 0.8)",
                  "0 0 5px rgba(0, 255, 255, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Moving scan dot */}
              <motion.div
                className="absolute w-2 h-2 bg-cyan-400 rounded-full left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 76, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;