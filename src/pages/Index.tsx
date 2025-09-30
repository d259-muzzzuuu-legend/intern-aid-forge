import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Building2, Users, Sparkles, Target, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/10">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 text-sm" variant="secondary">
            Powered by AI • NEP 2020 Compliant
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            NEP InternShip Portal
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Bridging Students, Industry & Academia for Skill Enhancement under NEP 2020
          </p>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            AI-powered internship matching • Credit-based evaluation • Real-time collaboration between students, faculty, and industry partners
          </p>
          
          <Link to="/dashboard">
            <Button size="lg" className="text-lg px-8 py-6">
              Enter Portal
              <Sparkles className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Revolutionizing Internship Experience
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive platform designed to solve internship system failures through technology and collaboration
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>For Students</CardTitle>
                <CardDescription>
                  Discover AI-recommended internships tailored to your skills and career aspirations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  <li>• AI-powered internship matching</li>
                  <li>• NEP credit tracking & management</li>
                  <li>• Skill assessment & enhancement</li>
                  <li>• Real-time progress monitoring</li>
                  <li>• Regional language support</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-accent" />
                </div>
                <CardTitle>For Industry</CardTitle>
                <CardDescription>
                  Connect with talented students and manage internship programs efficiently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  <li>• Post & manage internship openings</li>
                  <li>• Advanced application tracking</li>
                  <li>• Student skill matching algorithms</li>
                  <li>• Performance analytics dashboard</li>
                  <li>• Seamless collaboration tools</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-warning/20 hover:border-warning/40 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-warning" />
                </div>
                <CardTitle>For Faculty</CardTitle>
                <CardDescription>
                  Monitor student progress and coordinate with industry partners
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  <li>• Student progress monitoring</li>
                  <li>• NEP credit management system</li>
                  <li>• Industry collaboration platform</li>
                  <li>• Academic reporting & analytics</li>
                  <li>• Mentorship coordination</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                Key Benefits
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  Streamlined internship process - One-stop solution to find, apply, track, and complete internships
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  Increased participation with easier access and transparency, especially for rural students
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0" />
                  Real-world skill development with pre-internship training modules
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  Better faculty involvement through comprehensive dashboards
                </li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Award className="w-6 h-6 text-accent" />
                NEP 2020 Compliance
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  Authentic, NEP-compliant reports with real-time logbooks
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  Credit integration system for academic scoring
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0" />
                  Data analytics for academic improvement insights
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  Government-approved framework for skill development
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Internship Experience?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students, companies, and institutions already benefiting from our platform
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="text-lg px-8 py-6">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
