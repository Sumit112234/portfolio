import { Github, Link } from "lucide-react";

export const portfolioData = {
  personal: {
    name: "Sumit Baghel",
    title: "Full Stack Developer",
    subtitle: "Building digital experiences that matter",
    email: "sumitbaghel22a@gmail.com",
    phone: "+91 9301819492",
    location: "Gwalior, Madhya Pradesh, India",
    bio: "Enthusiastic full-stack developer with hands-on experience through projects and internships. I love transforming complex challenges into clean, user-friendly solutions.",
    image: '/photo.png' || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
  },
  education : [
      {
        id: 1,
        level: 'postgraduate',
        institution: 'Madhav Institute of Technology and Science',
        course: 'Master of Science in Computer Science(MCA)',
        duration: '2024 - present',
        grade: '--',
        highlights: ['Machine Learning Specialization', 'Practice of MERN Stack', 'SIH hackathon']
      },
      {
        id: 2,
        level: 'graduate',
        institution: 'Jiwaji University',
        course: 'Bachelor of Science in Computer Engineering(BCA)',
        duration: '2021 - 2024',
        grade: '7.5/10.0 CGPA',
        highlights: ['Learn DSA', 'Learn MERN Stack', 'Explore CS', "Participated in GDG Hackathon"]
      },
      {
        id: 3,
        level: 'intermediate',
        institution: 'Miss Sill School',
        course: 'Higher Secondary Education - Science Stream',
        duration: '2019 - 2021',
        grade: '94%',
        highlights: ['Valedictorian', 'National Science Olympiad Gold Medal', 'Computer Science Club Founder']
      }
    ],
  skills: {
    frontend: {
      title: 'Frontend',
      color: 'from-blue-500 to-cyan-400',
      borderColor: 'border-blue-500/20',
      skills: [
        { name: 'React Js', icon: '⚛️', level: 90 },
        { name: 'CSS', icon: '🎨', level: 85 },
        { name: 'HTML', icon: '📄', level: 95 },
        { name: 'Redux', icon: '🔄', level: 80 },
        { name: 'JavaScript', icon: '💛', level: 88 },
        { name: 'Tailwind CSS', icon: '🌊', level: 92 }
      ]
    },
    backend: {
      title: 'Backend',
      color: 'from-green-500 to-emerald-400',
      borderColor: 'border-green-500/20',
      skills: [
        { name: 'RestApi', icon: '🔗', level: 85 },
        { name: 'Node js', icon: '💚', level: 88 },
        { name: 'Express', icon: '⚡', level: 90 },
        { name: 'MySQL', icon: '🐬', level: 75 },
        { name: 'MongoDB', icon: '🍃', level: 82 },
        { name: 'Firebase', icon: '🔥', level: 78 }
      ]
    },
    programming: {
      title: 'Programming Languages',
      color: 'from-purple-500 to-pink-400',
      borderColor: 'border-purple-500/20',
      skills: [
        { name: 'JavaScript', icon: '💛', level: 88 },
        { name: 'Python', icon: '🐍', level: 82 },
        { name: 'Java', icon: '☕', level: 75 },
        { name: 'C++', icon: '⚙️', level: 70 },
        { name: 'Bash', icon: '🔷', level: 85 },
      ]
    },
    others: {
      title: 'Others',
      color: 'from-orange-500 to-red-400',
      borderColor: 'border-orange-500/20',
      skills: [
        { name: 'Git', icon: '📝', level: 90 },
        { name: 'Vercel', icon: '☁️', level: 70 },
        { name: 'Linux', icon: '🐧', level: 80 },
        { name: 'VS Code', icon: '🎯', level: 85 },
        { name: 'Postman', icon: '📮', level: 88 }
      ]
    }
  },
  projects: [
  {
    id: 1,
    title: 'AI Interviewer',
    description:
      'AI-powered mock interview platform with a live avatar conducting personalized interviews and delivering instant AI-driven feedback. Includes a full admin panel for managing candidates, questions and analytics.',
    image: '/images/ai-interviewer.png',
    technologies: ['Next.js', 'MongoDB', 'TailwindCSS', 'OAuth', 'AI/NLP'],
    liveUrl: 'https://my-interviewer.vercel.app/',
    githubUrl: 'https://github.com/Sumit112234/Ai-Interviewer',
    videoUrl: '/vedio/ai-interview.mp4',
    featured: true,
  },
  {
    id: 2,
    title: 'Guru Electronics Ecommerce',
    description:
      'Full-featured e-commerce website for electronics with real-time inventory, secure payments and an admin dashboard.',
    image: '/images/guru-electronic.png',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'Socket.io'],
    liveUrl: 'https://guruelectronic.vercel.app/',
    githubUrl: 'https://github.com/Sumit112234/Guru-Ecommerce',
    videoUrl: '/vedio/guru-electronic.mp4',
    featured: true,
  },
  {
    id: 3,
    title: 'Exam Pro',
    description:
      'Online testing platform offering mock, mini and section-wise tests with an admin panel for managing users and results.',
    image: '/images/exam-pro.png',
    technologies: ['React', 'Python', 'FastAPI', 'WebSocket', 'OpenAI'],
    liveUrl: 'https://mymock.vercel.app/',
    githubUrl: 'https://github.com/Sumit112234/Exam-Taker',
    videoUrl: '/vedio/exam-pro.mp4',
    featured: true,
  },
  {
    id: 4,
    title: 'Image Generator',
    description:
      'Image generation app using AI to create images from prompts with modern UI.',
    image: '/images/imagechaiye.png',
    technologies: ['React', 'TailwindCSS', 'OpenAI API'],
    liveUrl: 'https://imagechaiye.vercel.app',
    githubUrl: 'https://github.com/Sumit112234/ImageGeneration',
    videoUrl: 'vedio/imagechaiye.mp4',
    featured: true,
  },
  {
    id: 10,
    title: 'QuestionHive',
    description:
      'Comprehensive analytics dashboard with interactive charts, real-time data visualization and customizable reports.',
    image: '/images/questionhive.png',
    technologies: ['Vue.js', 'D3.js', 'Express', 'MongoDB', 'Chart.js'],
    liveUrl: 'https://questionhive.vercel.app/',
    githubUrl: 'https://github.com/Sumit112234/QuestionHive',
    videoUrl: 'https://www.youtube.com/embed/yourVideoId',
    featured: false,
  },
  {
    id: 5,
    title: 'PlayTube',
    description:
      'YouTube-like platform fetching videos from APIs, storing in Firebase and designed with React & TailwindCSS.',
    image: '/images/playtube.png',
    technologies: ['React', 'TailwindCSS', 'Firebase', 'Rapid API'],
    liveUrl: 'https://playtube-demo.com',
    githubUrl: 'https://github.com/yourname/playtube',
    videoUrl: 'https://www.youtube.com/embed/yourVideoId',
    featured: false,
  },
  {
    id: 6,
    title: 'TopAi',
    description:
      'Friendly chatbot AI built using React and Gemini API with a beautiful Tailwind UI.',
    image: '/images/topai.png',
    technologies: ['React', 'TailwindCSS', 'Gemini API'],
    liveUrl: 'https://topai.netlify.app/',
    githubUrl: 'https://github.com/yourname/topai',
    videoUrl: 'https://www.youtube.com/embed/yourVideoId',
    featured: false,
  },
  {
    id: 7,
    title: 'Hisaab Kitaab',
    description:
      'Group expense tracking app where members add expenses and the total is split equally among approved users.',
    image: '/images/hisaab-kitaab.png',
    technologies: ['MERN', 'TailwindCSS'],
    liveUrl: 'https://hisaabkitaab-demo.com',
    githubUrl: 'https://github.com/yourname/hisaabkitaab',
    videoUrl: 'https://www.youtube.com/embed/yourVideoId',
    featured: false,
  },
  {
    id: 8,
    title: 'Gym Management',
    description:
      'Gym management website to handle equipment, payments, subscription plans and member data.',
    image: '/images/gym-management.png',
    technologies: ['MERN', 'TailwindCSS'],
    liveUrl: 'https://gymmanagement-demo.com',
    githubUrl: 'https://github.com/yourname/gym-management',
    videoUrl: 'https://www.youtube.com/embed/yourVideoId',
    featured: false,
  },
  {
    id: 9,
    title: 'Raghav-AI Server',
    description:
      'Backend server for AI chatbots with scalable APIs and WebSocket support.',
    image: '/images/raghav-ai.png',
    technologies: ['Node.js', 'Express', 'MongoDB', 'WebSocket'],
    liveUrl: 'https://raghav-ai-demo.com',
    githubUrl: 'https://github.com/yourname/raghav-ai-server',
    videoUrl: 'https://www.youtube.com/embed/yourVideoId',
    featured: false,
  },
  
  {
    id: 11,
    title: 'Sixteen Parchi',
    description:
      'Fun random draw app (sixteen slips) built with modern web technologies.',
    image: '/images/sixteen-parchi.png',
    technologies: ['React', 'TailwindCSS'],
    liveUrl: 'https://sixteenparchi-demo.com',
    githubUrl: 'https://github.com/yourname/sixteen-parchi',
    videoUrl: 'https://www.youtube.com/embed/yourVideoId',
    featured: false,
  },
],

  experience: [
    {
      company: "WETEAMRK7",
      position: "Full Stack Developer",
      duration: "sep 2024 - Present",
      description: "Leading development of enterprise web applications, mentoring junior developers, and implementing modern tech stacks."
    },
    {
      company: "Cognifyz",
      position: "Software Developer",
      duration: "1 Month",
      description: "Developed responsive web applications, collaborated with design teams, and optimized application performance."
    }
  ],
  services: [
    {
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies"
    },
    {
      title: "Mobile Development",
      description: "Cross-platform mobile apps using React Native and Flutter"
    },
    {
      title: "Backend Development",
      description: "Scalable APIs and database solutions for your applications"
    },
    {
      title: "UI/UX Design",
      description: "Beautiful, user-friendly interfaces that convert visitors to customers"
    }
  ],
  stats: [
    { number: "50+", label: "Projects Completed" },
    { number: "3+", label: "Years Experience" },
    { number: "25+", label: "Happy Clients" },
    { number: "15+", label: "Technologies" }
  ],
  github:"https://github.com/Sumit112234",
  linkedin:"https://www.linkedin.com/in/sumit-baghel-463512205/",
};