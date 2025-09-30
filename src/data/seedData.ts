import { Internship, Student, Company, SkillResource } from "@/types/internship";

const companies: Company[] = [
  { id: "1", name: "TCS", industry: "Technology", size: "Large", location: "Mumbai", description: "Leading IT services company" },
  { id: "2", name: "Infosys", industry: "Technology", size: "Large", location: "Bangalore", description: "Global technology consulting" },
  { id: "3", name: "Wipro", industry: "Technology", size: "Large", location: "Pune", description: "Digital transformation leader" },
  { id: "4", name: "HCL Technologies", industry: "Technology", size: "Large", location: "Delhi", description: "Technology and services company" },
  { id: "5", name: "Tech Mahindra", industry: "Technology", size: "Large", location: "Hyderabad", description: "Digital solutions provider" },
  { id: "6", name: "Accenture", industry: "Consulting", size: "Large", location: "Mumbai", description: "Global professional services" },
  { id: "7", name: "IBM India", industry: "Technology", size: "Large", location: "Bangalore", description: "Cloud and AI solutions" },
  { id: "8", name: "Microsoft India", industry: "Technology", size: "Large", location: "Hyderabad", description: "Software and cloud services" },
  { id: "9", name: "Amazon India", industry: "E-commerce", size: "Large", location: "Bangalore", description: "E-commerce and cloud services" },
  { id: "10", name: "Google India", industry: "Technology", size: "Large", location: "Mumbai", description: "Internet and software services" },
];

const skills = [
  "React", "JavaScript", "Python", "Java", "Node.js", "SQL", "MongoDB", "AWS", "Docker", "Kubernetes",
  "Machine Learning", "Data Analysis", "UI/UX Design", "Digital Marketing", "Content Writing", 
  "Project Management", "Business Analysis", "Cybersecurity", "DevOps", "Mobile App Development",
  "Blockchain", "AI/ML", "Cloud Computing", "Data Science", "Full Stack Development", "Frontend Development",
  "Backend Development", "Database Management", "API Development", "Testing", "Quality Assurance"
];

const domains = ["Technology", "Marketing", "Finance", "Design", "Operations", "Data Science", "Consulting", "Research"];
const locations = ["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad", "Remote"];
const careerTracks = ["Software Engineering", "Data Science", "Product Management", "Digital Marketing", "UI/UX Design", "DevOps", "Cybersecurity", "Business Analysis"];

export function generateInternships(count: number = 30): Internship[] {
  const internships: Internship[] = [];
  
  for (let i = 1; i <= count; i++) {
    const company = companies[Math.floor(Math.random() * companies.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const skillSet = skills.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 4) + 3);
    const location = i <= 10 ? locations[Math.floor(Math.random() * locations.length)] : "Remote";
    const careerTrack = careerTracks[Math.floor(Math.random() * careerTracks.length)];
    
    internships.push({
      id: `intern-${i}`,
      title: `${domain} Intern - ${careerTrack}`,
      company: company.name,
      domain,
      location,
      stipend: Math.floor(Math.random() * 40000) + 10000,
      duration: ["3 months", "4 months", "6 months"][Math.floor(Math.random() * 3)],
      skills: skillSet,
      description: `Exciting opportunity to work on ${domain.toLowerCase()} projects with ${company.name}. You'll gain hands-on experience in ${skillSet.slice(0, 2).join(" and ")} while contributing to real-world solutions.`,
      eligibility: ["Final year students", "CGPA > 7.0", "Good communication skills"],
      careerTrack,
      nepCredits: Math.floor(Math.random() * 6) + 2,
      deadline: new Date(Date.now() + Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      type: ["remote", "hybrid", "onsite"][Math.floor(Math.random() * 3)] as "remote" | "hybrid" | "onsite",
      level: ["beginner", "intermediate", "advanced"][Math.floor(Math.random() * 3)] as "beginner" | "intermediate" | "advanced",
      sourceURL: `https://${company.name.toLowerCase().replace(/\s+/g, '')}.com/careers/internships/${i}`
    });
  }
  
  return internships;
}

export function generateStudent(): Student {
  const courses = ["Computer Science", "Information Technology", "Electronics", "Mechanical", "Civil", "Chemical"];
  const studentSkills = skills.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 6) + 4);
  const interests = careerTracks.sort(() => 0.5 - Math.random()).slice(0, 3);
  
  return {
    id: "student-1",
    name: "Arjun Sharma",
    email: "arjun.sharma@college.edu.in",
    course: courses[Math.floor(Math.random() * courses.length)],
    year: 4,
    skills: studentSkills,
    interests,
    location: locations[Math.floor(Math.random() * locations.length)],
    completedInternships: [],
    nepCreditsEarned: Math.floor(Math.random() * 20) + 5
  };
}

export function generateSkillResources(): SkillResource[] {
  return skills.slice(0, 30).map((skill, index) => ({
    id: `resource-${index + 1}`,
    skill,
    category: domains[Math.floor(Math.random() * domains.length)],
    resources: {
      videos: [
        {
          title: `Complete ${skill} Tutorial for Beginners`,
          url: `https://youtube.com/watch?v=${skill.toLowerCase()}tutorial`,
          duration: "4:30:00"
        },
        {
          title: `Advanced ${skill} Concepts`,
          url: `https://youtube.com/watch?v=${skill.toLowerCase()}advanced`,
          duration: "2:15:00"
        },
        {
          title: `${skill} Project Tutorial`,
          url: `https://youtube.com/watch?v=${skill.toLowerCase()}project`,
          duration: "3:45:00"
        }
      ],
      documents: [
        {
          title: `${skill} Official Documentation`,
          url: `https://docs.${skill.toLowerCase()}.org`,
          type: "documentation"
        },
        {
          title: `${skill} Best Practices Guide`,
          url: `https://bestpractices.${skill.toLowerCase()}.org`,
          type: "guide"
        }
      ],
      courses: [
        {
          title: `Complete ${skill} Masterclass`,
          url: `https://coursera.org/${skill.toLowerCase()}-masterclass`,
          provider: "Coursera"
        },
        {
          title: `${skill} for Industry`,
          url: `https://edx.org/${skill.toLowerCase()}-industry`,
          provider: "edX"
        }
      ]
    }
  }));
}