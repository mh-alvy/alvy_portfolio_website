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
    title: "M.H.ALVY TECH 24 Blogging Website",
    description: "A comprehensive technology blog and resource hub focused on programming and tech news.",
    tech: ["Blogger", "HTML/CSS", "JavaScript"],
    image: "https://iili.io/frWhSee.png",
    link: "https://mhalvytech24.blogspot.com",
    embedUrl: "https://mhalvytech24.blogspot.com",
    category: "Web"
  },
  {
    id: "2",
    title: "Institution Management System for Break The Fear Edtech",
    description: "The official web platform and management system for a major Bangladeshi ed-tech organization.",
    tech: ["Next.js", "Tailwind", "Firebase"],
    image: "https://iili.io/frMFTKb.jpg",
    link: "https://breakthefear-bd.com/",
    embedUrl: "https://breakthefear-bd.com/",
    category: "Web"
  },
  {
    id: "3",
    title: "VFX and Motion Reel",
    description: "High-end visual effects and cinematic motion graphics showcase from my YouTube channel.",
    tech: ["After Effects", "VFX", "Cinema 4D"],
    image: "https://iili.io/frWVolt.png",
    link: "https://www.youtube.com/@alvy_vfx6463",
    embedUrl: "https://www.youtube.com/embed/Nugh_7qHmiA?rel=0", 
    category: "Video"
  },
  {
    id: "4",
    title: "Dynamic Logo Reveal",
    description: "Professional logo animation sequence for modern brand identity.",
    tech: ["Motion Graphics", "After Effects", "Logo Design"],
    image: "https://iili.io/frW3E9R.png", 
    link: "https://youtu.be/vtXpXj_u7Fo",
    embedUrl: "https://www.youtube.com/embed/vtXpXj_u7Fo?rel=0",
    category: "Video"
  },
  {
    id: "5",
    title: "Commercial Motion Project",
    description: "Advanced motion graphics project with complex transitions and lighting.",
    tech: ["After Effects", "Sound Design", "VFX"],
    image: "https://iili.io/frWc73b.png", 
    link: "https://youtu.be/t-nHhlcOrVU",
    embedUrl: "https://www.youtube.com/embed/t-nHhlcOrVU?rel=0",
    category: "Video"
  },
  {
    id: "6",
    title: "Brand Storytelling Visuals",
    description: "High-impact video production focusing on digital engagement.",
    tech: ["Premiere Pro", "Motion Design", "Video Editing"],
    image: "https://iili.io/frWE0Ug.png", 
    link: "https://youtu.be/HgdFgZHU4MM",
    embedUrl: "https://www.youtube.com/embed/HgdFgZHU4MM?rel=0",
    category: "Video"
  },
  {
    id: "7",
    title: "Commercial Poster/Cover/Banner Design",
    description: "Professional banner design for a Web Development Workshop series.",
    tech: ["Photoshop", "Illustrator", "UI Design"],
    image: "https://iili.io/frMAQ99.jpg",
    link: "https://www.behance.net/gallery/231807857/Web-Development-Workshop-Banner-Design",
    embedUrl: "https://www.behance.net/gallery/231807857/Web-Development-Workshop-Banner-Design",
    category: "Design"
  },
  {
    id: "8",
    title: "Professional Graphics Design",
    description: "Thematic design for a Computer Science event at CUET.",
    tech: ["Graphic Design", "Brand Identity", "Vector"],
    image: "https://iili.io/frM79kP.png",
    link: "https://www.behance.net/gallery/183897743/CSE-Banner-Design",
    embedUrl: "https://www.behance.net/gallery/183897743/CSE-Banner-Design",
    category: "Design"
  },
  {
    id: "9",
    title: "Ecommerce banner design",
    description: "Culturally-themed digital art for festive web advertisements.",
    tech: ["Digital Art", "Vector Design", "Layout"],
    image: "https://iili.io/frMaDEG.png",
    link: "https://www.behance.net/gallery/123365933/Eid-Ul-Adha-Web-banner-design-Bangla",
    embedUrl: "https://www.behance.net/gallery/123365933/Eid-Ul-Adha-Web-banner-design-Bangla",
    category: "Design"
  }
];

export const SKILLS: Skill[] = [
  { name: "Full Stack Development", level: 92, category: "Development" },
  { name: "TypeScript / C++", level: 88, category: "Development" },
  { name: "Javascript", level: 94, category: "Development" },
  { name: "HTML", level: 98, category: "Development" },
  { name: "CSS", level: 95, category: "Development" },
  { name: "SQL", level: 86, category: "Development" },
  { name: "MongoDB", level: 84, category: "Development" },
  { name: "C", level: 85, category: "Development" },
  { name: "C#", level: 80, category: "Development" },
  { name: "Adobe After Effects", level: 98, category: "Creative (Video Editing & Motion Graphics)" },
  { name: "Adobe Premier Pro", level: 96, category: "Creative (Video Editing & Motion Graphics)" },
  { name: "Adobe Audition", level: 88, category: "Creative (Video Editing & Motion Graphics)" },
  { name: "Adobe Media Encoder", level: 92, category: "Creative (Video Editing & Motion Graphics)" },
  { name: "Camtasia Studio", level: 90, category: "Creative (Video Editing & Motion Graphics)" },
  { name: "Filmora", level: 85, category: "Creative (Video Editing & Motion Graphics)" },
  { name: "Sony Vegas Pro", level: 82, category: "Creative (Video Editing & Motion Graphics)" },
  { name: "Sparkle Videohive", level: 94, category: "Creative (Video Editing & Motion Graphics)" },
  { name: "Adobe Photoshop", level: 97, category: "Design" },
  { name: "Adobe Illustrator", level: 94, category: "Design" },
  { name: "Creative Graphics Design", level: 96, category: "Design" },
  { name: "UI/UX Design", level: 88, category: "Design" },
  { name: "Physics & ICT Instruction", level: 90, category: "Other" },
  { name: "Tech Entrepreneurship", level: 82, category: "Other" },
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Chief Technology Officer",
    company: "Break The Fear · Full-time",
    period: "May 2023 - Present · 2 yrs 9 mos",
    location: "Comilla, Chattogram, Bangladesh · Hybrid",
    description: [
      "As the Chief Technology Officer (CTO) of Break The Fear (BTF), I play a pivotal role in shaping the organization's technological vision and driving innovation.",
      "Alongside my executive responsibilities, I contribute as an instructor and lead technical strategist."
    ],
    skills: ["Web Development", "System Design & Development", "Technical Lead", "Teaching", "Leadership", "Technical Strategy"],
    logo: "https://i.ibb.co/L6V2f3P/btf-logo.png",
    image: "https://iili.io/frFRNcl.jpg",
    color: 'cyan'
  },
  {
    role: "Level 2 seller",
    company: "Fiverr · Freelance",
    period: "Mar 2020 - Present · 5 yrs 11 mos",
    location: "Remote",
    description: [
      "I'm a level 2 seller in Fiverr with 5-year experience in Graphics and Motion Graphics Designer, Logo animator, Animation and VFX creator and video editor by profession.",
      "Served more than 500 clients online with high-quality deliveries and creative excellence."
    ],
    skills: ["Adobe Photoshop", "Graphic Design", "Motion Graphics", "VFX", "Video Editing", "Adobe After Effects", "Adobe Illustrator", "Adobe Premier Pro", "Adobe Audition", "Web Development", "Software Development"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/18/Fiverr_Logo_09.2020.png",
    link: { text: "Fiverr Profile", url: "https://www.fiverr.com/alvy_vfx" },
    color: 'purple'
  },
  {
    role: "Course Instructor",
    company: "IPIT Limited · Contract",
    period: "Oct 2020 - Present · 5 yrs 4 mos",
    location: "Comilla, Chattogram, Bangladesh",
    description: [
      "Instructor for Professional Video Editing Course - Zero to Intermediate.",
      "Developing comprehensive curriculum and training future digital creators."
    ],
    skills: ["Graphic Design", "Motion Graphics", "Video Editing", "Education", "Freelancing", "ICT Instructor"],
    logo: "https://i.ibb.co/0Vp9jRz/ipit-logo.png",
    color: 'green'
  },
  {
    role: "Vice President, Department of Publication & Creative Affairs",
    company: "Notre Dame Nature Study Club · Seasonal",
    period: "Apr 2022 - Apr 2023 · 1 yr 1 mo",
    location: "Dhaka, Bangladesh · On-site",
    description: [
      "Leading the publication and creative affairs department of the most prestigious club of Notre Dame College, Dhaka.",
      "Managed creative direction for publications and club event branding."
    ],
    skills: ["Graphic Design", "Motion Graphics", "Leadership", "Event Management"],
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Notre_Dame_College_Dhaka_logo.svg/1200px-Notre_Dame_College_Dhaka_logo.svg.png",
    color: 'red'
  }
];

export const EDUCATION: Education[] = [
  {
    school: "Chittagong University of Engineering & Technology",
    degree: "Bachelor of Science - BS, Computer Science and Engineering",
    period: "Jun 2023 - 2027",
    description: "Pursuing my B.Sc in Computer Science & Engineering (CSE)",
    skills: ["Computer Science", "Programming", "Software Development", "Engineering", "System Architecture"],
    logo: "https://upload.wikimedia.org/wikipedia/en/b/ba/CUET_logo.png",
    color: 'cyan'
  },
  {
    school: "Notre Dame College",
    degree: "Higher Secondary Certificate (HSC), Science",
    period: "Jun 2020 - Dec 2022",
    grade: "GPA-5.00",
    activities: "Vice President, Notre Dame Nature Study Club",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Notre_Dame_College_Dhaka_logo.svg/1200px-Notre_Dame_College_Dhaka_logo.svg.png",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Notre_Dame_College_Dhaka_logo.svg/1200px-Notre_Dame_College_Dhaka_logo.svg.png",
    attachmentTitle: "Notre Dame College, Dhaka, Bangladesh",
    color: 'purple'
  },
  {
    school: "Comilla Zilla School",
    degree: "Secondary School Certificate, Science",
    period: "Jan 2014 - Jan 2020",
    grade: "GPA-5.00",
    activities: "Former Students Cabinet, Former President, Comilla Zilla School Science Club, Former Joint Secretary, Comilla Zilla School Debating Club",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/07/Comilla_Zilla_School_Logo.png",
    image: "https://upload.wikimedia.org/wikipedia/en/0/07/Comilla_Zilla_School_Logo.png",
    attachmentTitle: "কুমিল্লা জিলা স্কুল",
    color: 'green'
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    title: "JavaScript Workshop for Absolute Beginners (Season 2)",
    issuer: "Ostad",
    date: "Sep 2025",
    link: "https://ostad.app/",
    credentialId: "C31541",
    skills: ["Web Development", "Web Application Development", "JavaScript"]
  },
  {
    title: "Digital Video Editor (DVE)",
    issuer: "Interactive Cares",
    date: "Aug 2021",
    link: "https://interactivecares.com/",
    credentialId: "75fa4702accf4ea1",
    skills: ["Professional Video Editing", "Adobe After Effect CC", "Animation", "Video Editing"]
  },
  {
    title: "Complete Photo/Image Editing",
    issuer: "Udemy",
    date: "May 2021",
    link: "https://www.udemy.com/certificate/UC-6a530111-96e9-4242-b78f-0baaff0886be/",
    credentialId: "UC-6a530111-96e9-4242-b78f-0baaff0886be",
    skills: ["Image Editing", "Photo Editing", "Adobe Lightroom", "Photo Retouching"]
  },
  {
    title: "Complete Video Editing : Beginner to Pro",
    issuer: "Udemy",
    date: "May 2021",
    link: "https://www.udemy.com/certificate/UC-3b7ea528-4ce0-4cc7-8505-b56bd175d4ba/",
    credentialId: "UC-3b7ea528-4ce0-4cc7-8505-b56bd175d4ba",
    skills: ["Professional Video Editing", "Adobe After Effect CC", "Animation", "Video Editing"]
  },
  {
    title: "Adobe After Effects CC",
    issuer: "MSB Academy",
    date: "Mar 2020",
    link: "https://www.msbacademy.com/",
    credentialId: "c66aca5e170886baca039047cb33e189",
    skills: ["Professional Video Editing", "Adobe After Effect CC", "Animation", "Video Editing"]
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