import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Building2, Users, BookOpen } from "lucide-react";
import StudentPortal from "@/components/StudentPortal";

export default function Dashboard() {
  const [userRole, setUserRole] = useState<"student" | "industry" | "faculty" | null>(null);

  if (!userRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              NEP InternShip Portal
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Bridging Students, Industry & Academia for Skill Enhancement under NEP 2020
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105" onClick={() => setUserRole("student")}>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Student Portal</CardTitle>
                <CardDescription>
                  Find AI-recommended internships, track NEP credits, and enhance your skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• AI-powered internship matching</li>
                  <li>• NEP credit tracking</li>
                  <li>• Skill assessment & resources</li>
                  <li>• Real-time progress monitoring</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105" onClick={() => setUserRole("industry")}>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-accent" />
                </div>
                <CardTitle>Industry Portal</CardTitle>
                <CardDescription>
                  Post internships, manage applications, and connect with talented students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Post & manage internships</li>
                  <li>• Application tracking system</li>
                  <li>• Student skill matching</li>
                  <li>• Performance analytics</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105" onClick={() => setUserRole("faculty")}>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-warning" />
                </div>
                <CardTitle>Faculty Portal</CardTitle>
                <CardDescription>
                  Monitor student progress, assign NEP credits, and coordinate with industry
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Student progress monitoring</li>
                  <li>• NEP credit management</li>
                  <li>• Industry collaboration</li>
                  <li>• Academic reporting</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Badge variant="secondary" className="text-sm">
              Powered by AI/ML Recommendations • NEP 2020 Compliant
            </Badge>
          </div>
        </div>
      </div>
    );
  }

  // Render specific portal based on user role
  if (userRole === "student") {
    return <StudentPortal onBack={() => setUserRole(null)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold capitalize">{userRole} Dashboard</h1>
          <Button variant="outline" onClick={() => setUserRole(null)}>
            Switch Portal
          </Button>
        </div>
        
        <div className="text-center py-20">
          <BookOpen className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Portal Coming Soon</h2>
          <p className="text-muted-foreground">
            The {userRole} portal is being developed with advanced features
          </p>
        </div>
      </div>
    </div>
  );
}