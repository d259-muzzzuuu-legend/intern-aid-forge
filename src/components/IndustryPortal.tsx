import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Building2, Plus, Eye, Users, TrendingUp, Calendar, 
  MapPin, Clock, DollarSign, CheckCircle, XCircle, 
  AlertCircle, BarChart3, FileText, Settings 
} from "lucide-react";
import { Internship, Application } from "@/types/internship";
import { generateInternships } from "@/data/seedData";
import { useToast } from "@/hooks/use-toast";

interface IndustryPortalProps {
  onBack: () => void;
}

// Mock company data
const companyProfile = {
  name: "TechCorp Solutions",
  industry: "Technology",
  size: "500-1000 employees",
  location: "Mumbai, India",
  description: "Leading technology company specializing in digital transformation and AI solutions",
  website: "www.techcorp.com"
};

export default function IndustryPortal({ onBack }: IndustryPortalProps) {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isAddingInternship, setIsAddingInternship] = useState(false);
  const [newInternship, setNewInternship] = useState({
    title: "",
    domain: "",
    location: "",
    stipend: "",
    duration: "",
    skills: "",
    description: "",
    eligibility: "",
    nepCredits: "",
    deadline: "",
    type: "hybrid" as "remote" | "hybrid" | "onsite",
    level: "intermediate" as "beginner" | "intermediate" | "advanced"
  });
  const { toast } = useToast();

  useEffect(() => {
    // Generate 30 internships posted by this company
    const companyInternships = generateInternships(30).map(internship => ({
      ...internship,
      company: companyProfile.name
    }));
    setInternships(companyInternships);

    // Generate mock applications
    const mockApplications: Application[] = companyInternships.slice(0, 20).map((internship, index) => ({
      id: `app-${index + 1}`,
      studentId: `student-${index + 1}`,
      internshipId: internship.id,
      status: ["pending", "accepted", "rejected"][Math.floor(Math.random() * 3)] as any,
      appliedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      completedDate: Math.random() > 0.7 ? new Date().toISOString().split('T')[0] : undefined,
      nepCreditsAwarded: Math.random() > 0.7 ? Math.floor(Math.random() * 6) + 2 : undefined
    }));
    setApplications(mockApplications);
  }, []);

  const handleAddInternship = () => {
    if (!newInternship.title || !newInternship.domain || !newInternship.stipend) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    const internship: Internship = {
      id: `intern-${Date.now()}`,
      title: newInternship.title,
      company: companyProfile.name,
      domain: newInternship.domain,
      location: newInternship.location || "Mumbai",
      stipend: parseInt(newInternship.stipend),
      duration: newInternship.duration || "3 months",
      skills: newInternship.skills.split(",").map(s => s.trim()),
      description: newInternship.description,
      eligibility: newInternship.eligibility.split(",").map(s => s.trim()),
      careerTrack: newInternship.domain,
      nepCredits: parseInt(newInternship.nepCredits) || 4,
      deadline: newInternship.deadline,
      type: newInternship.type,
      level: newInternship.level
    };

    setInternships([internship, ...internships]);
    setIsAddingInternship(false);
    setNewInternship({
      title: "", domain: "", location: "", stipend: "", duration: "",
      skills: "", description: "", eligibility: "", nepCredits: "",
      deadline: "", type: "hybrid", level: "intermediate"
    });
    
    toast({ title: "Success", description: "Internship posted successfully!" });
  };

  const updateApplicationStatus = (appId: string, status: string) => {
    setApplications(applications.map(app => 
      app.id === appId ? { ...app, status: status as any } : app
    ));
    toast({ title: "Success", description: `Application status updated to ${status}` });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "rejected": return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-yellow-100 text-yellow-800";
    }
  };

  const stats = {
    totalInternships: internships.length,
    activeInternships: internships.filter(i => new Date(i.deadline) > new Date()).length,
    totalApplications: applications.length,
    pendingApplications: applications.filter(a => a.status === "pending").length,
    acceptedApplications: applications.filter(a => a.status === "accepted").length
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{companyProfile.name}</h1>
                <p className="text-muted-foreground">{companyProfile.industry} • {companyProfile.size}</p>
              </div>
            </div>
            <Button variant="outline" onClick={onBack}>
              Switch Portal
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Internships</p>
                  <p className="text-2xl font-bold">{stats.totalInternships}</p>
                </div>
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Posts</p>
                  <p className="text-2xl font-bold text-green-600">{stats.activeInternships}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Applications</p>
                  <p className="text-2xl font-bold">{stats.totalApplications}</p>
                </div>
                <Users className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pendingApplications}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Accepted</p>
                  <p className="text-2xl font-bold text-green-600">{stats.acceptedApplications}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="internships" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="internships">My Internships</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="internships" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Posted Internships</h2>
              <Dialog open={isAddingInternship} onOpenChange={setIsAddingInternship}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Internship
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Post New Internship</DialogTitle>
                    <DialogDescription>
                      Create a new internship opportunity for students
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title *</Label>
                      <Input
                        value={newInternship.title}
                        onChange={(e) => setNewInternship({...newInternship, title: e.target.value})}
                        placeholder="Software Development Intern"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Domain *</Label>
                      <Select value={newInternship.domain} onValueChange={(value) => setNewInternship({...newInternship, domain: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select domain" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Operations">Operations</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={newInternship.location}
                        onChange={(e) => setNewInternship({...newInternship, location: e.target.value})}
                        placeholder="Mumbai, India"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Monthly Stipend (₹) *</Label>
                      <Input
                        type="number"
                        value={newInternship.stipend}
                        onChange={(e) => setNewInternship({...newInternship, stipend: e.target.value})}
                        placeholder="25000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Duration</Label>
                      <Select value={newInternship.duration} onValueChange={(value) => setNewInternship({...newInternship, duration: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3 months">3 months</SelectItem>
                          <SelectItem value="4 months">4 months</SelectItem>
                          <SelectItem value="6 months">6 months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>NEP Credits</Label>
                      <Input
                        type="number"
                        value={newInternship.nepCredits}
                        onChange={(e) => setNewInternship({...newInternship, nepCredits: e.target.value})}
                        placeholder="4"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Work Type</Label>
                      <Select value={newInternship.type} onValueChange={(value: any) => setNewInternship({...newInternship, type: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="onsite">On-site</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Deadline</Label>
                      <Input
                        type="date"
                        value={newInternship.deadline}
                        onChange={(e) => setNewInternship({...newInternship, deadline: e.target.value})}
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label>Required Skills (comma-separated)</Label>
                      <Input
                        value={newInternship.skills}
                        onChange={(e) => setNewInternship({...newInternship, skills: e.target.value})}
                        placeholder="React, JavaScript, Python"
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={newInternship.description}
                        onChange={(e) => setNewInternship({...newInternship, description: e.target.value})}
                        placeholder="Describe the internship role and responsibilities..."
                        rows={3}
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label>Eligibility (comma-separated)</Label>
                      <Input
                        value={newInternship.eligibility}
                        onChange={(e) => setNewInternship({...newInternship, eligibility: e.target.value})}
                        placeholder="Final year students, CGPA > 7.0"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleAddInternship} className="flex-1">Post Internship</Button>
                    <Button variant="outline" onClick={() => setIsAddingInternship(false)}>Cancel</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {internships.map((internship) => (
                <Card key={internship.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{internship.title}</CardTitle>
                        <CardDescription>{internship.domain}</CardDescription>
                      </div>
                      <Badge variant="secondary">{internship.nepCredits} Credits</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
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
                          <Calendar className="w-4 h-4" />
                          {new Date(internship.deadline).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {internship.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
                        ))}
                        {internship.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">+{internship.skills.length - 3}</Badge>
                        )}
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applications">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Student Applications</h2>
              
              <div className="space-y-4">
                {applications.map((application) => {
                  const internship = internships.find(i => i.id === application.internshipId);
                  return (
                    <Card key={application.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h3 className="font-semibold">{internship?.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              Student ID: {application.studentId} • Applied: {new Date(application.appliedDate).toLocaleDateString()}
                            </p>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(application.status)}
                              <Badge className={getStatusColor(application.status)}>
                                {application.status.toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            {application.status === "pending" && (
                              <>
                                <Button 
                                  size="sm" 
                                  onClick={() => updateApplicationStatus(application.id, "accepted")}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  Accept
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => updateApplicationStatus(application.id, "rejected")}
                                >
                                  Reject
                                </Button>
                              </>
                            )}
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Performance Analytics</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Application Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>This Month</span>
                        <span className="font-semibold">{applications.length} applications</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Acceptance Rate</span>
                        <span className="font-semibold text-green-600">
                          {Math.round((stats.acceptedApplications / stats.totalApplications) * 100)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Response Time</span>
                        <span className="font-semibold">2.3 days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Skills in Demand</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {["React", "Python", "JavaScript", "Machine Learning", "Node.js"].map((skill, index) => (
                        <div key={skill} className="flex justify-between items-center">
                          <span>{skill}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-secondary rounded-full">
                              <div 
                                className="h-full bg-primary rounded-full" 
                                style={{ width: `${100 - index * 15}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">{100 - index * 15}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Company Settings</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle>Company Profile</CardTitle>
                  <CardDescription>Manage your company information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company Name</Label>
                      <Input value={companyProfile.name} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Industry</Label>
                      <Input value={companyProfile.industry} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Company Size</Label>
                      <Input value={companyProfile.size} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input value={companyProfile.location} readOnly />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label>Description</Label>
                      <Textarea value={companyProfile.description} rows={3} readOnly />
                    </div>
                  </div>
                  <Button>Update Profile</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}