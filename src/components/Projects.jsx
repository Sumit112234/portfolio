import { useState } from 'react';
import { ExternalLink, Github, Code, Play, X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { img } from 'framer-motion/client';

// Custom UI Components
const Card = ({ children, className = "", ...props }) => (
  <div className={`rounded-lg border bg-gray-900/50 border-gray-800 shadow-lg shadow-purple-900/20 ${className}`} {...props}>
    {children}
  </div>
);

const Button = ({ children, className = "", variant = "default", size = "default", asChild = false, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-purple-600 text-white hover:bg-purple-700",
    outline: "border border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800/50 hover:text-white",
    ghost: "hover:bg-gray-800/50 hover:text-white text-gray-300",
    secondary: "bg-gray-800 text-gray-200 hover:bg-gray-700"
  };
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8"
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  if (asChild) {
    return <span className={classes}>{children}</span>;
  }
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

const Badge = ({ children, className = "", variant = "default", ...props }) => {
  const variants = {
    default: "bg-purple-900/50 text-purple-300 hover:bg-purple-800/50",
    secondary: "bg-gray-800/70 text-gray-300 hover:bg-gray-700/70",
    outline: "text-gray-400 border border-gray-700 hover:bg-gray-800/50 hover:text-gray-300"
  };
  
  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50">
        {children}
      </div>
    </div>
  );
};

const DialogContent = ({ children, className = "", ...props }) => (
  <div className={`bg-gray-900 border border-gray-800 rounded-lg shadow-2xl shadow-purple-900/50 p-6 mx-4 ${className}`} {...props}>
    {children}
  </div>
);

const DialogHeader = ({ children, ...props }) => (
  <div className="mb-4" {...props}>
    {children}
  </div>
);

const DialogTitle = ({ children, className = "", ...props }) => (
  <h2 className={`text-lg font-semibold text-white ${className}`} {...props}>
    {children}
  </h2>
);

// ProjectModal component
const ProjectModal = ({ isOpen, onClose, project }) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[80vw] h-[80vh] overflow-y-auto bg-gray-900 border border-gray-700/50 text-white shadow-2xl shadow-purple-900/30 flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-purple-400">
              {project.title}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-gray-800/50"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6 overflow-y-auto flex-1">
          <p className="text-gray-300 leading-relaxed text-lg">
            {project.description}
          </p>
          
          <div className="aspect-video rounded-lg overflow-hidden bg-gray-800 ring-1 ring-purple-900/50">
            <iframe
              src={project.videoUrl}
              title={project.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-purple-400 mb-3">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge 
                    key={tech} 
                    variant="outline" 
                    className="text-sm border-gray-600 text-gray-300"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-purple-400 mb-3">Project Links</h4>
              <div className="flex gap-3">
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  asChild
                >
                                    
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className='flex justify-center item-center'>
                    <ExternalLink className="w-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-gray-700 hover:bg-gray-800/50"
                  asChild
                >
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className='flex justify-center item-center'>
                    <Github className="w-4  mr-2" />
                    Source Code
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Main Projects component
const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = portfolioData.projects

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  return (
    <section id="projects" className="py-20 relative bg-black min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A showcase of my recent work, featuring full-stack applications and innovative solutions
            </p>
          </div>

          {/* Featured Projects */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {projects
              .filter(project => project.featured)
              .map((project, index) => (
                <Card 
                  key={project.id}
                  className="group overflow-hidden bg-gray-900/70 border border-gray-800/70 hover:border-purple-600/50 transition-all duration-500 hover:shadow-xl hover:shadow-purple-900/30 transform hover:-translate-y-1 backdrop-blur-sm"
                  style={{ 
                    animationDelay: `${index * 0.2}s`,
                    animation: 'fadeInUp 0.6s ease-out forwards',
                    opacity: 0,
                    transform: 'translateY(20px)'
                  }}
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden cursor-pointer" onClick={() => openProjectModal(project)}>
                    <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-pink-900/30 flex items-center justify-center border-b border-gray-800/50">
{ project.image ? <img src={project.image}/> :                      <Code className="w-16 h-16 text-purple-400" />}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg">
                        <Play className="w-4 h-4 mr-2" />
                        Watch Demo
                      </Button>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Badge variant="secondary" className="bg-purple-600/90 text-white border-purple-500/50">
                        Featured
                      </Badge>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6 bg-gradient-to-b from-gray-900/50 to-gray-900/70">
                    <h3 className="text-xl font-semibold mb-3 text-gray-100 group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="outline" 
                          className="text-xs font-mono border-gray-700/70 hover:border-purple-500/50 transition-colors text-gray-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex-1 shadow-lg"
                        asChild
                      >
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className='flex justify-center item-center'>
                          <ExternalLink className="w-4  mr-2" />
                          Live Demo
                        </a>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-gray-700 hover:bg-gray-800/50 text-gray-300"
                        asChild
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"  className='flex justify-center item-center'>
                          <Github className="w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </div>

          {/* Other Projects */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects
              .filter(project => !project.featured)
              .map((project, index) => (
                <Card 
                  key={project.id}
                  className="group p-6 bg-gray-900/50 border border-gray-800/50 hover:border-purple-600/30 transition-all duration-300 hover:bg-gray-900/70 backdrop-blur-sm"
                  style={{ 
                    animationDelay: `${(index + 2) * 0.2}s`,
                    animation: 'fadeInUp 0.6s ease-out forwards',
                    opacity: 0,
                    transform: 'translateY(20px)'
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-lg flex items-center justify-center flex-shrink-0 cursor-pointer hover:scale-110 transition-transform border border-purple-800/30"
                      onClick={() => openProjectModal(project)}
                    >
                      <Code className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 text-gray-100 group-hover:text-purple-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge 
                            key={tech} 
                            variant="secondary" 
                            className="text-xs font-mono bg-gray-800/50 text-gray-300"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="secondary" className="text-xs bg-gray-800/50 text-gray-300">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="p-0 h-auto text-purple-400 hover:text-purple-300" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Demo
                          </a>
                        </Button>
                        <Button size="sm" variant="ghost" className="p-0 h-auto text-gray-400 hover:text-gray-300" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-1" />
                            Code
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>

          {/* View All Projects */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-purple-600/50 hover:bg-purple-900/20 text-purple-400 hover:text-purple-300">
              <Github className="w-4 h-4 mr-2" />
             <a href='https://github.com/Sumit112234' target='_blank'> View All Projects on GitHub</a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeProjectModal}
        project={selectedProject}
      />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;


// import { useState } from 'react';
// import { ExternalLink, Github, Code, Play, X } from 'lucide-react';

// // Custom UI Components
// const Card = ({ children, className = "", ...props }) => (
//   <div className={`rounded-lg border bg-gray-900/50 border-gray-800 shadow-lg shadow-purple-900/20 ${className}`} {...props}>
//     {children}
//   </div>
// );

// const Button = ({ children, className = "", variant = "default", size = "default", asChild = false, ...props }) => {
//   const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:pointer-events-none disabled:opacity-50";
  
//   const variants = {
//     default: "bg-purple-600 text-white hover:bg-purple-700",
//     outline: "border border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800/50 hover:text-white",
//     ghost: "hover:bg-gray-800/50 hover:text-white text-gray-300",
//     secondary: "bg-gray-800 text-gray-200 hover:bg-gray-700"
//   };
  
//   const sizes = {
//     default: "h-10 px-4 py-2",
//     sm: "h-9 rounded-md px-3",
//     lg: "h-11 rounded-md px-8"
//   };
  
//   const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
//   if (asChild) {
//     return <span className={classes}>{children}</span>;
//   }
  
//   return (
//     <button className={classes} {...props}>
//       {children}
//     </button>
//   );
// };

// const Badge = ({ children, className = "", variant = "default", ...props }) => {
//   const variants = {
//     default: "bg-purple-900/50 text-purple-300 hover:bg-purple-800/50",
//     secondary: "bg-gray-800/70 text-gray-300 hover:bg-gray-700/70",
//     outline: "text-gray-400 border border-gray-700 hover:bg-gray-800/50 hover:text-gray-300"
//   };
  
//   return (
//     <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`} {...props}>
//       {children}
//     </div>
//   );
// };

// const Dialog = ({ open, onOpenChange, children }) => {
//   if (!open) return null;
  
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       <div 
//         className="fixed inset-0 bg-black/50" 
//         onClick={() => onOpenChange(false)}
//       />
//       <div className="relative z-50">
//         {children}
//       </div>
//     </div>
//   );
// };

// const DialogContent = ({ children, className = "", ...props }) => (
//   <div className={`bg-gray-900 border border-gray-800 rounded-lg shadow-2xl shadow-purple-900/50 p-6 w-full max-w-md mx-4 ${className}`} {...props}>
//     {children}
//   </div>
// );

// const DialogHeader = ({ children, ...props }) => (
//   <div className="mb-4" {...props}>
//     {children}
//   </div>
// );

// const DialogTitle = ({ children, className = "", ...props }) => (
//   <h2 className={`text-lg font-semibold text-white ${className}`} {...props}>
//     {children}
//   </h2>
// );

// // ProjectModal component
// const ProjectModal = ({ isOpen, onClose, project }) => {
//   if (!project) return null;

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className= "w-[40rem] h-[4rem] overflow-hidden bg-gray-900 border border-gray-700/50 text-white shadow-2xl shadow-purple-900/30">
//         <DialogHeader>
//           <div className="flex items-center justify-between">
//             <DialogTitle className="text-2xl font-bold text-purple-400">
//               {project.title}
//             </DialogTitle>
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={onClose}
//               className="text-gray-400 hover:text-white hover:bg-gray-800/50"
//             >
//               <X className="h-4 w-4" />
//             </Button>
//           </div>
//         </DialogHeader>
        
//         <div className="space-y-4">
//           <p className="text-gray-300 leading-relaxed">
//             {project.description}
//           </p>
          
//           <div className="aspect-video rounded-lg overflow-hidden bg-gray-800 ring-1 ring-purple-900/50">
//             <iframe
//               src={project.videoUrl}
//               title={project.title}
//               className="w-full h-full"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             />
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// // Main Projects component
// const Projects = () => {
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const projects = [
//     {
//       id: 1,
//       title: 'E-Commerce Platform',
//       description: 'Full-stack e-commerce solution with real-time inventory management, secure payments, and admin dashboard. Built with modern technologies for optimal performance.',
//       image: '/placeholder.svg',
//       technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
//       liveUrl: 'https://ecommerce-demo.com',
//       githubUrl: 'https://github.com/alexchen/ecommerce',
//       videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
//       featured: true,
//     },
//     {
//       id: 2,
//       title: 'Task Management App',
//       description: 'Collaborative task management application with real-time updates, team workspaces, and advanced filtering. Perfect for agile development teams.',
//       image: '/placeholder.svg',
//       technologies: ['Next.js', 'TypeScript', 'Prisma', 'Socket.io'],
//       liveUrl: 'https://taskapp-demo.com',
//       githubUrl: 'https://github.com/alexchen/taskapp',
//       videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
//       featured: true,
//     },
//     {
//       id: 3,
//       title: 'AI Chat Interface',
//       description: 'Modern chat interface with AI integration, featuring real-time messaging, file uploads, and smart conversation management.',
//       image: '/placeholder.svg',
//       technologies: ['React', 'Python', 'FastAPI', 'WebSocket', 'OpenAI'],
//       liveUrl: 'https://aichat-demo.com',
//       githubUrl: 'https://github.com/alexchen/aichat',
//       videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
//       featured: false,
//     },
//     {
//       id: 4,
//       title: 'Analytics Dashboard',
//       description: 'Comprehensive analytics dashboard with interactive charts, real-time data visualization, and customizable reporting features.',
//       image: '/placeholder.svg',
//       technologies: ['Vue.js', 'D3.js', 'Express', 'MongoDB', 'Chart.js'],
//       liveUrl: 'https://dashboard-demo.com',
//       githubUrl: 'https://github.com/alexchen/analytics',
//       videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
//       featured: false,
//     },
//   ];

//   const openProjectModal = (project) => {
//     setSelectedProject(project);
//     setIsModalOpen(true);
//   };

//   const closeProjectModal = () => {
//     setSelectedProject(null);
//     setIsModalOpen(false);
//   };

//   return (
//     <section id="projects" className="py-20 relative bg-black min-h-screen">
//       <div className="container mx-auto px-4">
//         <div className="max-w-6xl mx-auto">
//           {/* Section Header */}
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//               Featured Projects
//             </h2>
//             <p className="text-xl text-gray-300 max-w-2xl mx-auto">
//               A showcase of my recent work, featuring full-stack applications and innovative solutions
//             </p>
//           </div>

//           {/* Featured Projects */}
//           <div className="grid md:grid-cols-2 gap-8 mb-12">
//             {projects
//               .filter(project => project.featured)
//               .map((project, index) => (
//                 <Card 
//                   key={project.id}
//                   className="group overflow-hidden bg-gray-900/70 border border-gray-800/70 hover:border-purple-600/50 transition-all duration-500 hover:shadow-xl hover:shadow-purple-900/30 transform hover:-translate-y-1 backdrop-blur-sm"
//                   style={{ 
//                     animationDelay: `${index * 0.2}s`,
//                     animation: 'fadeInUp 0.6s ease-out forwards',
//                     opacity: 0,
//                     transform: 'translateY(20px)'
//                   }}
//                 >
//                   {/* Project Image */}
//                   <div className="relative overflow-hidden cursor-pointer" onClick={() => openProjectModal(project)}>
//                     <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-pink-900/30 flex items-center justify-center border-b border-gray-800/50">
//                       <Code className="w-16 h-16 text-purple-400" />
//                     </div>
//                     <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg">
//                         <Play className="w-4 h-4 mr-2" />
//                         Watch Demo
//                       </Button>
//                     </div>
//                     <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       <Badge variant="secondary" className="bg-purple-600/90 text-white border-purple-500/50">
//                         Featured
//                       </Badge>
//                     </div>
//                   </div>

//                   {/* Project Info */}
//                   <div className="p-6 bg-gradient-to-b from-gray-900/50 to-gray-900/70">
//                     <h3 className="text-xl font-semibold mb-3 text-gray-100 group-hover:text-purple-400 transition-colors">
//                       {project.title}
//                     </h3>
//                     <p className="text-gray-400 mb-4 text-sm leading-relaxed">
//                       {project.description}
//                     </p>

//                     {/* Technologies */}
//                     <div className="flex flex-wrap gap-2 mb-6">
//                       {project.technologies.map((tech) => (
//                         <Badge 
//                           key={tech} 
//                           variant="outline" 
//                           className="text-xs font-mono border-gray-700/70 hover:border-purple-500/50 transition-colors text-gray-300"
//                         >
//                           {tech}
//                         </Badge>
//                       ))}
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex gap-3">
//                       <Button 
//                         size="sm" 
//                         className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex-1 shadow-lg"
//                         asChild
//                       >
//                         <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
//                           <ExternalLink className="w-4 h-4 mr-2" />
//                           Live Demo
//                         </a>
//                       </Button>
//                       <Button 
//                         size="sm" 
//                         variant="outline" 
//                         className="border-gray-700 hover:bg-gray-800/50 text-gray-300"
//                         asChild
//                       >
//                         <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
//                           <Github className="w-4 h-4 mr-2" />
//                           Code
//                         </a>
//                       </Button>
//                     </div>
//                   </div>
//                 </Card>
//               ))}
//           </div>

//           {/* Other Projects */}
//           <div className="grid md:grid-cols-2 gap-6">
//             {projects
//               .filter(project => !project.featured)
//               .map((project, index) => (
//                 <Card 
//                   key={project.id}
//                   className="group p-6 bg-gray-900/50 border border-gray-800/50 hover:border-purple-600/30 transition-all duration-300 hover:bg-gray-900/70 backdrop-blur-sm"
//                   style={{ 
//                     animationDelay: `${(index + 2) * 0.2}s`,
//                     animation: 'fadeInUp 0.6s ease-out forwards',
//                     opacity: 0,
//                     transform: 'translateY(20px)'
//                   }}
//                 >
//                   <div className="flex items-start gap-4">
//                     <div 
//                       className="w-12 h-12 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-lg flex items-center justify-center flex-shrink-0 cursor-pointer hover:scale-110 transition-transform border border-purple-800/30"
//                       onClick={() => openProjectModal(project)}
//                     >
//                       <Code className="w-6 h-6 text-purple-400" />
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="text-lg font-semibold mb-2 text-gray-100 group-hover:text-purple-400 transition-colors">
//                         {project.title}
//                       </h3>
//                       <p className="text-gray-400 text-sm mb-3 leading-relaxed">
//                         {project.description}
//                       </p>
                      
//                       <div className="flex flex-wrap gap-1 mb-4">
//                         {project.technologies.slice(0, 3).map((tech) => (
//                           <Badge 
//                             key={tech} 
//                             variant="secondary" 
//                             className="text-xs font-mono bg-gray-800/50 text-gray-300"
//                           >
//                             {tech}
//                           </Badge>
//                         ))}
//                         {project.technologies.length > 3 && (
//                           <Badge variant="secondary" className="text-xs bg-gray-800/50 text-gray-300">
//                             +{project.technologies.length - 3}
//                           </Badge>
//                         )}
//                       </div>

//                       <div className="flex gap-2">
//                         <Button size="sm" variant="ghost" className="p-0 h-auto text-purple-400 hover:text-purple-300" asChild>
//                           <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
//                             <ExternalLink className="w-4 h-4 mr-1" />
//                             Demo
//                           </a>
//                         </Button>
//                         <Button size="sm" variant="ghost" className="p-0 h-auto text-gray-400 hover:text-gray-300" asChild>
//                           <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
//                             <Github className="w-4 h-4 mr-1" />
//                             Code
//                           </a>
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </Card>
//               ))}
//           </div>

//           {/* View All Projects */}
//           <div className="text-center mt-12">
//             <Button variant="outline" size="lg" className="border-purple-600/50 hover:bg-purple-900/20 text-purple-400 hover:text-purple-300">
//               <Github className="w-4 h-4 mr-2" />
//               View All Projects on GitHub
//             </Button>
//           </div>
//         </div>
//       </div>
      
//       {/* Project Modal */}
//       <ProjectModal
//         isOpen={isModalOpen}
//         onClose={closeProjectModal}
//         project={selectedProject}
//       />

//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Projects;

// // components/Projects.jsx
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Github, ExternalLink, Star } from 'lucide-react';
// import { portfolioData } from '../data/portfolioData';

// const Projects = () => {
//   const [filter, setFilter] = useState('all');
//   const [filteredProjects, setFilteredProjects] = useState(portfolioData.projects);

//   useEffect(() => {
//     if (filter === 'all') {
//       setFilteredProjects(portfolioData.projects);
//     } else if (filter === 'featured') {
//       setFilteredProjects(portfolioData.projects.filter(project => project.featured));
//     }
//   }, [filter]);

//   return (
//     <section id="projects" className="py-20 bg-gray-900">
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold mb-4">
//             <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
//               Projects
//             </span>
//           </h2>
//           <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-6"></div>
          
//           <div className="flex justify-center gap-4 mb-8">
//             {['all', 'featured'].map((filterType) => (
//               <motion.button
//                 key={filterType}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setFilter(filterType)}
//                 className={`px-6 py-2 rounded-full capitalize transition-all ${
//                   filter === filterType
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
//                 }`}
//               >
//                 {filterType}
//               </motion.button>
//             ))}
//           </div>
//         </motion.div>

//         <motion.div 
//           layout
//           className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
//         >
//           <AnimatePresence>
//             {filteredProjects.map((project, index) => (
//               <motion.div
//                 key={project.id}
//                 layout
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.8 }}
//                 transition={{ delay: index * 0.1 }}
//                 whileHover={{ y: -10 }}
//                 className="bg-gray-800 rounded-xl overflow-hidden group cursor-pointer border border-gray-700 hover:border-blue-400/50"
//               >
//                 <div className="relative overflow-hidden">
//                   <img
//                     src={project.image}
//                     alt={project.title}
//                     className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
//                   />
//                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
//                     <motion.a
//                       href={project.github}
//                       whileHover={{ scale: 1.1 }}
//                       className="p-3 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
//                     >
//                       <Github className="w-5 h-5" />
//                     </motion.a>
//                     <motion.a
//                       href={project.live}
//                       whileHover={{ scale: 1.1 }}
//                       className="p-3 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
//                     >
//                       <ExternalLink className="w-5 h-5" />
//                     </motion.a>
//                   </div>
//                   {project.featured && (
//                     <div className="absolute top-4 left-4">
//                       <div className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
//                         <Star className="w-3 h-3" />
//                         Featured
//                       </div>
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-white mb-2">
//                     {project.title}
//                   </h3>
//                   <p className="text-gray-400 mb-4 text-sm">
//                     {project.description}
//                   </p>
//                   <div className="flex flex-wrap gap-2">
//                     {project.tech.map((tech, techIndex) => (
//                       <span
//                         key={techIndex}
//                         className="px-3 py-1 bg-gray-700 text-blue-400 text-xs rounded-full"
//                       >
//                         {tech}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Projects;