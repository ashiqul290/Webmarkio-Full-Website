import type { TeamMember } from "../types";
import ashiq from '../app/assets/ashiq.jpeg'
import sultana from '../app/assets/sultana.jpeg'
 import dipok from "../app/assets/dipok.jpeg"
 import ibrahim from '../app/assets/ibrahim.jpeg'
import shaon from "../app/assets/shaon.jpg";
import Shahriear from "../app/assets/shahariear.jpg";
import mehed from "../app/assets/Mehedi Hasan friend.webp";

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Ashiqul Islam",
    role: "Founder & CEO",
    bio: "Founder of WebMarkio Agency with 4+ years of experience in web development, digital branding, and growth-driven marketing solutions.",
    image: ashiq,
    social: { facebook: "#", linkedin: "#", whatsapp: "#", twitter: "#" },
  },
  {
    id: "2",
    name: "Ibrahim Khalil",
    role: "Head of Growth",
    bio: "Data-obsessed marketer who has generated $10M+ in attributed revenue for clients across e-commerce, SaaS, and professional services. Marcus turns websites into growth engines.",
    image: ibrahim,
    social: { facebook: "#", linkedin: "#", whatsapp: "#", twitter: "#" },
  },
  {
    id: "3",
    name: "Sultana Akter",
    role: "Digital Marketing Specialist",
    bio: "Experienced Digital Marketing Expert with 6+ years of helping businesses grow through SEO, social media marketing, paid advertising, and performance-driven digital strategies.",
    image: sultana,
    social: { facebook: "#", linkedin: "#", whatsapp: "#", twitter: "#" },
  },
  {
    id: "4",
    name: "Mehedi Hasan ",
    role: "Frontend Developer",
    bio: "Technical SEO specialist who has taken 30+ websites from page 5 to page 1. Priya's systematic approach to organic search has generated $10M+ in pipeline for clients.",
    image: mehed,
    social: { facebook: "#", linkedin: "#", whatsapp: "#", twitter: "#" },
  },
  {
    id: "5",
    name: "Shoaon Ahmed",
    role: "Frontend Developer",
    bio: "Technical SEO specialist who has taken 30+ websites from page 5 to page 1. Priya's systematic approach to organic search has generated $10M+ in pipeline for clients.",
    image: shaon,
    social: { facebook: "#", linkedin: "#", whatsapp: "#", twitter: "#" },
  },
  {
    id: "6",
    name: "Dipak Chandra Das",
    role: "Mern Stack Developer",
    bio: "Full-stack engineer with deep expertise in React, Node.js, and cloud architecture. James ensures every site we build is not just beautiful but fast, secure, and scalable.",
    image: dipok,
    social: { facebook: "#", linkedin: "#", whatsapp: "#", github: "#" },
  },
  {
    id: "7",
    name: "Shahriear Al Amin",
    role: "Full Stack Developer",
    bio: "PMP-certified project manager with 4 years of delivering complex digital projects on time and on budget. Sophie keeps teams aligned and clients informed every step of the way.",
    image: Shahriear,
    social: { facebook: "#", linkedin: "#", whatsapp: "#" },
  },
];
