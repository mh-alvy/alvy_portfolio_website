import { Project, Skill, Experience, Certificate, Education } from './types';

export const PERSONAL_INFO = {
  name: "Mahamudul Hasan Alvy",
  tagline: "Software Engineer | CS Undergrad | Creative Technologist",
  bio: "Level 2 seller at Fiverr | CS Undergrad | Graphics & Motion Graphics Designer | Video Editor | Programmer | Tech Entrepreneur",
  aboutGreetings: "Assalamu Alaikum!",
  aboutLong: `I’m Alvy from Bangladesh, a Level 2 Seller/Freelancer at Fiverr with over 5 years of professional experience in Graphics & Motion Graphics Design, Web Development, Animation, VFX, and Video Editing. I’ve successfully served 500+ clients worldwide with high-quality and reliable deliveries.

  I’m currently pursuing my BSc in Computer Science & Engineering (CSE) at CUET and also work as a Physics & ICT instructor at a well-known ed-tech platform, Break The Fear. I’m passionate about technology, programming, and creative problem-solving.

  I specialize in custom creative content, dynamic websites & web apps, professional animations, logo animations, and high-quality video editing. I always focus on clear communication, creativity, and timely delivery to ensure the best results.

  If you’re looking for a skilled, friendly, and dedicated professional, I’d be happy to help.
  Feel free to reach out—thank you!`,
};

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "MhalvTech Tech Hub",
    description: "A comprehensive technology blog and resource hub focused on programming and tech news.",
    tech: ["Blogger", "HTML/CSS", "JavaScript"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    link: "http://mhalvtech24.blogspot.com",
    embedUrl: "http://mhalvtech24.blogspot.com",
    category: "Web"
  },
  {
    id: "2",
    title: "Break The Fear EdTech",
    description: "The official web platform for a major Bangladeshi ed-tech organization.",
    tech: ["Next.js", "Tailwind", "Firebase"],
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
    link: "https://breakthefear-bd.com/",
    embedUrl: "https://breakthefear-bd.com/",
    category: "Web"
  },
  {
    id: "3",
    title: "VFX & Motion Reel",
    description: "High-end visual effects and cinematic motion graphics showcase.",
    tech: ["After Effects", "VFX", "Cinema 4D"],
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    link: "https://www.youtube.com/watch?v=Nugh_7qHmiA",
    embedUrl: "https://www.youtube.com/embed/Nugh_7qHmiA",
    category: "Video"
  },
  {
    id: "4",
    title: "Dynamic Logo Reveal",
    description: "Professional logo animation sequence for modern brand identity.",
    tech: ["Motion Graphics", "After Effects", "Logo Design"],
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
    link: "https://youtu.be/vtXpXj_u7Fo?si=v7aRpBNy-zR90xde",
    embedUrl: "https://www.youtube.com/embed/vtXpXj_u7Fo",
    category: "Video"
  },
  {
    id: "5",
    title: "Commercial Motion Project",
    description: "Advanced motion graphics project with complex transitions and lighting.",
    tech: ["After Effects", "Sound Design", "VFX"],
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=800",
    link: "https://youtu.be/t-nHhlcOrVU?si=Sz69P293zC8e_dtL",
    embedUrl: "https://www.youtube.com/embed/t-nHhlcOrVU",
    category: "Video"
  },
  {
    id: "6",
    title: "Brand Storytelling Visuals",
    description: "High-impact video production focusing on digital engagement.",
    tech: ["Premiere Pro", "Motion Design", "Video Editing"],
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
    link: "https://youtu.be/HgdFgZHU4MM?si=wNJOwhjPFBs0aAnR",
    embedUrl: "https://www.youtube.com/embed/HgdFgZHU4MM",
    category: "Video"
  },
  {
    id: "7",
    title: "Web Workshop Banner",
    description: "Professional banner design for a Web Development Workshop series.",
    tech: ["Photoshop", "Illustrator", "UI Design"],
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
    link: "https://www.behance.net/gallery/231807857/Web-Development-Workshop-Banner-Design",
    embedUrl: "https://www.behance.net/gallery/231807857/Web-Development-Workshop-Banner-Design",
    category: "Design"
  },
  {
    id: "8",
    title: "CSE Identity Banner",
    description: "Thematic design for a Computer Science event at CUET.",
    tech: ["Graphic Design", "Brand Identity", "Vector"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    link: "https://www.behance.net/gallery/183897743/CSE-Banner-Design",
    embedUrl: "https://www.behance.net/gallery/183897743/CSE-Banner-Design",
    category: "Design"
  },
  {
    id: "9",
    title: "Festive Web Banners",
    description: "Culturally-themed digital art for festive web advertisements.",
    tech: ["Digital Art", "Vector Design", "Layout"],
    image: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&q=80&w=800",
    link: "https://www.behance.net/gallery/123365933/Eid-Ul-Adha-Web-banner-design-Bangla",
    embedUrl: "https://www.behance.net/gallery/123365933/Eid-Ul-Adha-Web-banner-design-Bangla",
    category: "Design"
  }
];

export const SKILLS: Skill[] = [
  // Development
  { name: "Full Stack Development", level: 92, category: "Development" },
  { name: "TypeScript / C++", level: 88, category: "Development" },
  { name: "Javascript", level: 94, category: "Development" },
  { name: "HTML", level: 98, category: "Development" },
  { name: "CSS", level: 95, category: "Development" },
  { name: "SQL", level: 86, category: "Development" },
  { name: "MongoDB", level: 84, category: "Development" },
  { name: "C", level: 85, category: "Development" },
  { name: "C#", level: 80, category: "Development" },

  // Creative (Video Editing & Motion Graphics)
  { name: "Adobe After Effects", level: 98, category: "Creative (Video Editing & Motion Graphics)" },
  { name: "Adobe Premier Pro", level: 96, category: "Creative (Video Editing & Motion Graphics)" },
  { name: "Adobe Audition", level: 88, category: "Creative (Video Editing & Motion Graphics)" },
  { name: "Adobe Media Encoder", level: 92, category: "Creative (Video Editing & Motion Graphics)" },
  { name: "Camtasia Studio", level: 90, category: "Creative (Video Editing & Motion Graphics)" },
  { name: "Filmora", level: 85, category: "Creative (Video Editing & Motion Graphics)" },
  { name: "Sony Vegas Pro", level: 82, category: "Creative (Video Editing & Motion Graphics)" },
  { name: "Sparkle Videohive", level: 94, category: "Creative (Video Editing & Motion Graphics)" },

  // Design
  { name: "Adobe Photoshop", level: 97, category: "Design" },
  { name: "Adobe Illustrator", level: 94, category: "Design" },
  { name: "Creative Graphics Design", level: 96, category: "Design" },
  { name: "UI/UX Design", level: 88, category: "Design" },

  // Other
  { name: "Physics & ICT Instruction", level: 90, category: "Other" },
  { name: "Tech Entrepreneurship", level: 82, category: "Other" },
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Chief Technology Officer",
    company: "Break The Fear · Full-time",
    period: "May 2023 - Present",
    location: "Chittagong, Bangladesh",
    description: [
      "Leading technical development and strategy for a major ed-tech platform.",
      "Managing cross-functional teams to deliver scalable educational solutions.",
      "Architecting the core web platform using modern technologies."
    ],
    skills: ["Leadership", "Next.js", "Firebase", "Strategy"],
    color: 'cyan'
  },
  {
    role: "Level 2 Freelancer",
    company: "Fiverr",
    period: "Jan 2019 - Present",
    description: [
      "Served over 500+ global clients with high-quality creative solutions.",
      "Specializing in Motion Graphics, VFX, and Web Development.",
      "Maintained a 5-star rating through consistent quality and communication."
    ],
    skills: ["After Effects", "VFX", "Video Editing", "Creative Design"],
    color: 'purple'
  },
  {
    role: "Physics & ICT Instructor",
    company: "Break The Fear",
    period: "Jan 2022 - Present",
    description: [
      "Teaching complex Physics and ICT concepts to students in an engaging way.",
      "Developing educational content and curriculum materials.",
      "Mentoring students in technology and science."
    ],
    skills: ["Teaching", "Physics", "ICT", "Communication"],
    color: 'green'
  }
];

export const EDUCATION: Education[] = [
  {
    school: "Chittagong University of Engineering & Technology (CUET)",
    degree: "BSc in Computer Science & Engineering",
    period: "2021 - 2025 (Expected)",
    description: "Focusing on Software Engineering, Data Structures, and Creative Technology.",
    activities: "Actively involved in technical events and creative projects.",
    skills: ["C++", "Algorithms", "Software Design", "Data Structures"],
    color: 'cyan'
  },
  {
    school: "Govt. Hazi Muhammad Mohsin College",
    degree: "Higher Secondary Certificate (HSC)",
    period: "2018 - 2020",
    description: "Concentration in Science with focus on Physics, Chemistry, and Mathematics.",
    grade: "GPA 5.00/5.00",
    color: 'purple'
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    title: "Level 2 Seller Milestone",
    issuer: "Fiverr",
    date: "2021",
    link: "https://fiverr.com/alvy",
    skills: ["Client Satisfaction", "Motion Graphics Excellence"]
  },
  {
    title: "Advanced Motion Graphics Specialization",
    issuer: "Adobe Certified Professional",
    date: "2020",
    link: "#",
    skills: ["After Effects", "Visual Effects", "Compositing"]
  }
];

export const SOCIAL_LINKS = [
  { name: "Fiverr", url: "https://www.fiverr.com/alvy_vfx", icon: "briefcase" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/mahamudul-alvy/", icon: "linkedin" },
  { name: "Behance", url: "https://www.behance.net/mahamudulalvy", icon: "palette" },
  { name: "GitHub", url: "https://github.com/mh-alvy", icon: "github" },
  { name: "Facebook", url: "https://facebook.com/mahamudul.alvy", icon: "facebook" },
  { name: "Instagram", url: "https://instagram.com/mh_alvy", icon: "instagram" },
  { name: "WhatsApp", url: "https://wa.me/01521706839?text=", icon: "message-circle" },
];
