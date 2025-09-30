import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Users, Award, TrendingUp, BookOpen, Eye, CheckCircle, 
  AlertTriangle, BarChart3, FileText, Calendar, MapPin, 
  Clock, Star, Plus, Edit, Download, Settings
} from "lucide-react";
import { Internship, Student, Application } from "@/types/internship";
import { generateInternships, generateStudent } from "@/data/seedData";
import { useToast } from "@/hooks/use-toast";

interface FacultyPortalProps {
  onBack: () => void;
}

// Mock faculty data
const facultyProfile = {
  name: "Dr. Priya Sharma",
  designation: "Professor & Internship Coordinator",
  department: "Computer Science",
  college: "Government Engineering College, Mumbai",
  email: "priya.sharma@gec.edu.in",
  experience: "15 years"
};

interface StudentProgress {
  id: string;
  studentName: string;
  course: string;
  year: number;
  currentInternship?: string;
  internshipStatus: "not_started" | "in_progress" | "completed";
  nepCreditsEarned: number;
  nepCreditsTarget: number;
  overallPerformance: number; // 0-100
  lastUpdated: string;
}

export default function FacultyPortal({ onBack }: FacultyPortalProps) {
  const [students, setStudents] = useState<StudentProgress[]>([]);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentProgress | null>(null);
  const [creditAwardDialog, setCreditAwardDialog] = useState(false);
  const [newCreditAward, setNewCreditAward] = useState({ studentId: "", credits: "", reason: "" });
  const { toast } = useToast();

  useEffect(() => {
    // Generate 30 students for monitoring
    const mockStudents: StudentProgress[] = Array.from({ length: 30 }, (_, index) => ({
      id: `student-${index + 1}`,
      studentName: `Student ${index + 1}`,
      course: ["Computer Science", "Information Technology", "Electronics", "Mechanical"][index % 4],
      year: 4,
      currentInternship: Math.random() > 0.3 ? `Internship at Company ${Math.floor(Math.random() * 10) + 1}` : undefined,
      internshipStatus: ["not_started", "in_progress", "completed"][Math.floor(Math.random() * 3)] as any,
      nepCreditsEarned: Math.floor(Math.random() * 15) + 5,
      nepCreditsTarget: 20,
      overallPerformance: Math.floor(Math.random() * 40) + 60, // 60-100
      lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }));
    setStudents(mockStudents);

    // Generate internships from partner companies
    setInternships(generateInternships(30));

    // Generate applications for monitoring
    const mockApplications: Application[] = mockStudents.slice(0, 25).map((student, index) => ({
      id: `app-${index + 1}`,
      studentId: student.id,
      internshipId: `intern-${index + 1}`,
      status: ["pending", "accepted", "completed"][Math.floor(Math.random() * 3)] as any,
      appliedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      completedDate: Math.random() > 0.7 ? new Date().toISOString().split('T')[0] : undefined,
      nepCreditsAwarded: Math.random() > 0.5 ? Math.floor(Math.random() * 6) + 2 : undefined
    }));
    setApplications(mockApplications);
  }, []);

  const awardCredits = () => {
    if (!newCreditAward.studentId || !newCreditAward.credits) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    const updatedStudents = students.map(student => 
      student.id === newCreditAward.studentId 
        ? { ...student, nepCreditsEarned: student.nepCreditsEarned + parseInt(newCreditAward.credits) }
        : student
    );
    
    setStudents(updatedStudents);
    setCreditAwardDialog(false);
    setNewCreditAward({ studentId: "", credits: "", reason: "" });
    
    toast({ 
      title: "Success", 
      description: `${newCreditAward.credits} NEP credits awarded successfully!` 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in_progress": return "bg-blue-100 text-blue-800";
      case "not_started": return "bg-gray-100 text-gray-800";
      default: return "bg-yellow-100 text-yellow-800";
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 85) return "text-green-600";
    if (performance >= 70) return "text-blue-600";
    if (performance >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const stats = {
    totalStudents: students.length,
    activeInternships: students.filter(s => s.internshipStatus === "in_progress").length,
    completedInternships: students.filter(s => s.internshipStatus === "completed").length,
    avgCreditsEarned: Math.round(students.reduce((sum, s) => sum + s.nepCreditsEarned, 0) / students.length),
    pendingApprovals: applications.filter(a => a.status === "pending").length
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{facultyProfile.name}</h1>
                <p className="text-muted-foreground">{facultyProfile.designation} • {facultyProfile.department}</p>
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
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">{stats.totalStudents}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Internships</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.activeInternships}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completedInternships}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg NEP Credits</p>
                  <p className="text-2xl font-bold text-accent">{stats.avgCreditsEarned}</p>
                </div>
                <Award className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Approvals</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pendingApprovals}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="students">Student Progress</TabsTrigger>
            <TabsTrigger value="internships">Industry Partners</TabsTrigger>
            <TabsTrigger value="credits">NEP Credits</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Student Progress Monitoring</h2>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                <Dialog open={creditAwardDialog} onOpenChange={setCreditAwardDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Award Credits
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Award NEP Credits</DialogTitle>
                      <DialogDescription>
                        Award additional NEP credits to a student for exceptional performance
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Select Student</Label>
                        <Select value={newCreditAward.studentId} onValueChange={(value) => setNewCreditAward({...newCreditAward, studentId: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose student" />
                          </SelectTrigger>
                          <SelectContent>
                            {students.map(student => (
                              <SelectItem key={student.id} value={student.id}>
                                {student.studentName} - {student.course}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Credits to Award</Label>
                        <Input
                          type="number"
                          value={newCreditAward.credits}
                          onChange={(e) => setNewCreditAward({...newCreditAward, credits: e.target.value})}
                          placeholder="2"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Reason</Label>
                        <Input
                          value={newCreditAward.reason}
                          onChange={(e) => setNewCreditAward({...newCreditAward, reason: e.target.value})}
                          placeholder="Exceptional project work"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button onClick={awardCredits} className="flex-1">Award Credits</Button>
                      <Button variant="outline" onClick={() => setCreditAwardDialog(false)}>Cancel</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="grid gap-4">
              {students.map((student) => (
                <Card key={student.id} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{student.studentName}</h3>
                          <Badge variant="outline">{student.course}</Badge>
                          <Badge className={getStatusColor(student.internshipStatus)}>
                            {student.internshipStatus.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        
                        {student.currentInternship && (
                          <p className="text-sm text-muted-foreground">
                            Current: {student.currentInternship}
                          </p>
                        )}
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">NEP Credits: </span>
                            <span className="font-semibold">
                              {student.nepCreditsEarned}/{student.nepCreditsTarget}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Performance: </span>
                            <span className={`font-semibold ${getPerformanceColor(student.overallPerformance)}`}>
                              {student.overallPerformance}%
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Last Updated: </span>
                            <span>{new Date(student.lastUpdated).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        {/* Progress Bar for NEP Credits */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>NEP Credits Progress</span>
                            <span>{Math.round((student.nepCreditsEarned / student.nepCreditsTarget) * 100)}%</span>
                          </div>
                          <div className="w-full h-2 bg-secondary rounded-full">
                            <div 
                              className="h-full bg-accent rounded-full transition-all duration-300" 
                              style={{ width: `${Math.min((student.nepCreditsEarned / student.nepCreditsTarget) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setSelectedStudent(student)}>
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="internships">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Industry Partner Internships</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {internships.slice(0, 12).map((internship) => (
                  <Card key={internship.id} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{internship.title}</CardTitle>
                          <CardDescription className="text-base font-medium text-primary">
                            {internship.company}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">
                          {internship.nepCredits} Credits
                        </Badge>
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
                            <Calendar className="w-4 h-4" />
                            {new Date(internship.deadline).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {internship.level}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {internship.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
                          ))}
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                          <Button size="sm">Recommend</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="credits">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">NEP Credit Management</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Credit Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Students with 15+ Credits</span>
                        <span className="font-semibold text-green-600">
                          {students.filter(s => s.nepCreditsEarned >= 15).length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Students with 10-14 Credits</span>
                        <span className="font-semibold text-blue-600">
                          {students.filter(s => s.nepCreditsEarned >= 10 && s.nepCreditsEarned < 15).length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Students with &lt;10 Credits</span>
                        <span className="font-semibold text-yellow-600">
                          {students.filter(s => s.nepCreditsEarned < 10).length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Credits Awarded</span>
                        <span className="font-semibold">
                          {students.reduce((sum, s) => sum + s.nepCreditsEarned, 0)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Credit Approval Queue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {applications.filter(a => a.status === "completed" && !a.nepCreditsAwarded).slice(0, 5).map((application) => {
                        const student = students.find(s => s.id === application.studentId);
                        const internship = internships.find(i => i.id === application.internshipId);
                        return (
                          <div key={application.id} className="flex justify-between items-center p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{student?.studentName}</p>
                              <p className="text-sm text-muted-foreground">{internship?.title}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm">Approve {internship?.nepCredits} Credits</Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Academic Reports & Analytics</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Department Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Average Performance</span>
                        <span className="font-semibold">
                          {Math.round(students.reduce((sum, s) => sum + s.overallPerformance, 0) / students.length)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Internship Completion Rate</span>
                        <span className="font-semibold text-green-600">
                          {Math.round((stats.completedInternships / stats.totalStudents) * 100)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>NEP Credit Achievement</span>
                        <span className="font-semibold text-blue-600">
                          {Math.round((stats.avgCreditsEarned / 20) * 100)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Generate Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button className="w-full justify-start">
                        <FileText className="w-4 h-4 mr-2" />
                        Student Progress Report
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        NEP Credits Summary
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        Industry Partnership Report
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        Academic Performance Analysis
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Faculty Settings</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle>Faculty Profile</CardTitle>
                  <CardDescription>Manage your faculty information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input value={facultyProfile.name} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Designation</Label>
                      <Input value={facultyProfile.designation} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Input value={facultyProfile.department} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Experience</Label>
                      <Input value={facultyProfile.experience} readOnly />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label>Institution</Label>
                      <Input value={facultyProfile.college} readOnly />
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