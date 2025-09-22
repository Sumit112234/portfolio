import { useEffect, useState, useRef } from 'react';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Education = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const educationData = portfolioData.education

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getLevelTitle = (level) => {
    switch (level) {
      case 'postgraduate': return 'Post Graduation';
      case 'graduate': return 'Graduation';
      case 'intermediate': return 'Intermediate Level';
      default: return level;
    }
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 'postgraduate': return '🎓';
      case 'graduate': return '🏛️';
      case 'intermediate': return '📚';
      default: return '🎓';
    }
  };

  return (
    <section id="education" ref={sectionRef} className="py-20 relative bg-gray-900 text-white">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInCard {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-fade-in-card {
          animation: fadeInCard 0.6s ease-out forwards;
        }
        
        .animate-delay-1 {
          animation-delay: 0.2s;
        }
        
        .animate-delay-2 {
          animation-delay: 0.4s;
        }
        
        .animate-delay-3 {
          animation-delay: 0.6s;
        }
      `}</style>
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div 
            className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Education
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Academic background and achievements
            </p>
          </div>

          {/* Education Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {educationData.map((education, index) => (
              <div 
                key={education.id} 
                className={`h-full p-6 bg-gray-800/50 border border-gray-700 rounded-lg backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 ${
                  isVisible ? `animate-fade-in-card animate-delay-${index + 1}` : 'opacity-0'
                }`}
              >
                {/* Level Header */}
                <div className="text-center mb-6">
                  <div className="text-4xl mb-2">{getLevelIcon(education.level)}</div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/30">
                    {getLevelTitle(education.level)}
                  </span>
                </div>

                {/* Institution */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    {education.institution}
                  </h3>
                  <p className="text-gray-400 text-sm font-medium">
                    {education.course}
                  </p>
                </div>

                {/* Duration & Grade */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{education.duration}</span>
                  </div>
                  {education.grade && (
                    <div className="flex items-center justify-center gap-2 text-sm text-green-400">
                      <Award className="w-4 h-4" />
                      <span className="font-medium">{education.grade}</span>
                    </div>
                  )}
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Highlights
                  </h4>
                  <div className="space-y-2">
                    {education.highlights.map((highlight, highlightIndex) => (
                      <div 
                        key={highlightIndex} 
                        className="text-xs text-gray-300 bg-gray-700/50 rounded-md px-3 py-2 border border-gray-600/50"
                      >
                        • {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;