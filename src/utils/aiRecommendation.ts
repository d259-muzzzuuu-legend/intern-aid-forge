import { Internship, Student } from "@/types/internship";

// Matrix Factorization simulation for internship recommendations
// In production, this would use actual ML models with historical data

interface UserMatrix {
  userId: string;
  skills: { [skill: string]: number };
  interests: { [interest: string]: number };
  locationPreference: number;
}

interface InternshipMatrix {
  internshipId: string;
  skillRequirements: { [skill: string]: number };
  domain: string;
  level: number; // 1-3 for beginner to advanced
  locationScore: number;
}

export function recommendInternships(student: Student, allInternships: Internship[]): Internship[] {
  // Create user feature matrix
  const userMatrix = createUserMatrix(student);
  
  // Create internship feature matrices
  const internshipMatrices = allInternships.map(internship => createInternshipMatrix(internship));
  
  // Calculate similarity scores using matrix factorization approach
  const scoredInternships = internshipMatrices.map(matrix => {
    const score = calculateSimilarityScore(userMatrix, matrix);
    return {
      internship: allInternships.find(i => i.id === matrix.internshipId)!,
      score,
      matchReasons: getMatchReasons(userMatrix, matrix)
    };
  });
  
  // Sort by score and return top recommendations
  return scoredInternships
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map(item => ({
      ...item.internship,
      matchScore: item.score,
      matchReasons: item.matchReasons
    }));
}

function createUserMatrix(student: Student): UserMatrix {
  const skillWeights: { [skill: string]: number } = {};
  const interestWeights: { [interest: string]: number } = {};
  
  // Assign weights to student skills (higher weight = more experienced)
  student.skills.forEach((skill, index) => {
    skillWeights[skill] = 1 - (index / student.skills.length) * 0.5; // 0.5 to 1.0
  });
  
  // Assign weights to interests
  student.interests.forEach((interest, index) => {
    interestWeights[interest] = 1 - (index / student.interests.length) * 0.3; // 0.7 to 1.0
  });
  
  return {
    userId: student.id,
    skills: skillWeights,
    interests: interestWeights,
    locationPreference: getLocationPreference(student.location)
  };
}

function createInternshipMatrix(internship: Internship): InternshipMatrix {
  const skillRequirements: { [skill: string]: number } = {};
  
  // Assign importance weights to required skills
  internship.skills.forEach((skill, index) => {
    skillRequirements[skill] = 1 - (index / internship.skills.length) * 0.4; // 0.6 to 1.0
  });
  
  return {
    internshipId: internship.id,
    skillRequirements,
    domain: internship.domain,
    level: getLevelScore(internship.level),
    locationScore: getLocationScore(internship.location, internship.type)
  };
}

function calculateSimilarityScore(user: UserMatrix, internship: InternshipMatrix): number {
  let skillMatch = 0;
  let skillCount = 0;
  
  // Calculate skill similarity using dot product
  Object.keys(internship.skillRequirements).forEach(skill => {
    if (user.skills[skill]) {
      skillMatch += user.skills[skill] * internship.skillRequirements[skill];
      skillCount++;
    }
  });
  
  const skillScore = skillCount > 0 ? skillMatch / skillCount : 0;
  
  // Interest-domain matching
  const domainScore = user.interests[internship.domain] || 0.5;
  
  // Location preference matching
  const locationScore = Math.abs(user.locationPreference - internship.locationScore) < 0.3 ? 1 : 0.7;
  
  // Level appropriateness (favor intermediate level for 4th year students)
  const levelScore = internship.level === 2 ? 1 : 0.8;
  
  // Weighted combination
  const finalScore = (
    skillScore * 0.4 +
    domainScore * 0.25 +
    locationScore * 0.2 +
    levelScore * 0.15
  );
  
  return Math.min(finalScore, 1); // Cap at 1.0
}

function getMatchReasons(user: UserMatrix, internship: InternshipMatrix): string[] {
  const reasons: string[] = [];
  
  // Check skill matches
  const matchingSkills = Object.keys(internship.skillRequirements).filter(
    skill => user.skills[skill] && user.skills[skill] > 0.7
  );
  
  if (matchingSkills.length > 0) {
    reasons.push(`Strong match in ${matchingSkills.slice(0, 2).join(', ')}`);
  }
  
  // Check interest-domain alignment
  if (user.interests[internship.domain] && user.interests[internship.domain] > 0.8) {
    reasons.push(`Aligns with your interest in ${internship.domain}`);
  }
  
  // Check location preference
  if (Math.abs(user.locationPreference - internship.locationScore) < 0.3) {
    reasons.push('Good location match');
  }
  
  return reasons;
}

function getLocationPreference(location: string): number {
  // Simulate location preference scoring
  const locationScores: { [key: string]: number } = {
    'Mumbai': 0.9,
    'Delhi': 0.8,
    'Bangalore': 0.95,
    'Pune': 0.85,
    'Hyderabad': 0.8,
    'Chennai': 0.75,
    'Remote': 1.0
  };
  
  return locationScores[location] || 0.6;
}

function getLocationScore(location: string, type: string): number {
  if (type === 'remote') return 1.0;
  
  const locationScores: { [key: string]: number } = {
    'Mumbai': 0.9,
    'Delhi': 0.8,
    'Bangalore': 0.95,
    'Pune': 0.85,
    'Hyderabad': 0.8,
    'Chennai': 0.75
  };
  
  return locationScores[location] || 0.6;
}

function getLevelScore(level: string): number {
  const levelScores: { [key: string]: number } = {
    'beginner': 1,
    'intermediate': 2,
    'advanced': 3
  };
  
  return levelScores[level] || 2;
}