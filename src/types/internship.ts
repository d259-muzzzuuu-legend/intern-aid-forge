export interface Internship {
  id: string;
  title: string;
  company: string;
  domain: string;
  location: string;
  stipend: number;
  duration: string;
  skills: string[];
  description: string;
  eligibility: string[];
  careerTrack: string;
  nepCredits: number;
  deadline: string;
  type: "remote" | "hybrid" | "onsite";
  level: "beginner" | "intermediate" | "advanced";
  sourceURL?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  year: number;
  skills: string[];
  interests: string[];
  location: string;
  completedInternships: string[];
  nepCreditsEarned: number;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  location: string;
  description: string;
  website?: string;
}

export interface Application {
  id: string;
  studentId: string;
  internshipId: string;
  status: "pending" | "accepted" | "rejected" | "completed";
  appliedDate: string;
  completedDate?: string;
  nepCreditsAwarded?: number;
}

export interface SkillResource {
  id: string;
  skill: string;
  category: string;
  resources: {
    videos: { title: string; url: string; duration: string }[];
    documents: { title: string; url: string; type: string }[];
    courses: { title: string; url: string; provider: string }[];
  };
}