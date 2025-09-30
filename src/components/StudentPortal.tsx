import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Clock, DollarSign, Target, Mic, MicOff, Search } from "lucide-react";
import { Internship, Student } from "@/types/internship";
import { generateInternships, generateStudent } from "@/data/seedData";
import { recommendInternships } from "@/utils/aiRecommendation";

interface StudentPortalProps {
  onBack: () => void;
}

export default function StudentPortal({ onBack }: StudentPortalProps) {
  const [student, setStudent] = useState<Student>(generateStudent());
  const [internships, setInternships] = useState<Internship[]>([]);
  const [recommendedInternships, setRecommendedInternships] = useState<Internship[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDomain, setFilterDomain] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const allInternships = generateInternships(30);
    setInternships(allInternships);
    
    // Generate AI recommendations using matrix factorization simulation
    const recommended = recommendInternships(student, allInternships);
    setRecommendedInternships(recommended);
  }, [student]);

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         internship.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDomain = filterDomain === "all" || internship.domain === filterDomain;
    const matchesLocation = filterLocation === "all" || internship.location.includes(filterLocation);
    
    return matchesSearch && matchesDomain && matchesLocation;
  });

  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
      };

      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  const InternshipCard = ({ internship }: { internship: Internship }) => (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{internship.title}</CardTitle>
            <CardDescription className="text-base font-medium text-primary">
              {internship.company}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="ml-2">
            {internship.nepCredits} NEP Credits
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {internship.skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="outline">{skill}</Badge>
            ))}
            {internship.skills.length > 3 && (
              <Badge variant="outline">+{internship.skills.length - 3} more</Badge>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {internship.location}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {internship.duration}
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              ₹{internship.stipend}/month
            </div>
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              {internship.type}
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {internship.description}
          </p>
          
          <div className="flex gap-2 pt-2">
            <Button className="flex-1">Apply Now</Button>
            <Button variant="outline">View Details</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Welcome, {student.name}</h1>
              <p className="text-muted-foreground">
                {student.course} • Year {student.year} • {student.nepCreditsEarned} NEP Credits Earned
              </p>
            </div>
            <Button variant="outline" onClick={onBack}>
              Switch Portal
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <Tabs defaultValue="recommended" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recommended">AI Recommendations</TabsTrigger>
            <TabsTrigger value="all">All Internships</TabsTrigger>
            <TabsTrigger value="resources">Skill Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="recommended" className="space-y-6">
            <div className="text-center py-6">
              <h2 className="text-xl font-semibold mb-2">Personalized Recommendations</h2>
              <p className="text-muted-foreground">
                Based on your skills: {student.skills.join(", ")} and interests in {student.interests.join(", ")}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedInternships.map((internship) => (
                <InternshipCard key={internship.id} internship={internship} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search internships, companies, or skills..."
                  className="pl-10 pr-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  size="sm"
                  variant={isListening ? "destructive" : "outline"}
                  className="absolute right-1 top-1"
                  onClick={startVoiceSearch}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
              </div>
              
              <Select value={filterDomain} onValueChange={setFilterDomain}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Domains</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                  <SelectItem value="Pune">Pune</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInternships.map((internship) => (
                <InternshipCard key={internship.id} internship={internship} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <div className="text-center py-6">
              <h2 className="text-xl font-semibold mb-2">Skill Enhancement Resources</h2>
              <p className="text-muted-foreground">
                Curated learning materials for your career growth
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {student.skills.map((skill, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{skill}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        📺 Video Tutorials
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        📚 Documentation
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        🎓 Online Courses
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}