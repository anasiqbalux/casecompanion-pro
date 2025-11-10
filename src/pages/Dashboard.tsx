import { FileText, CheckCircle, Clock, AlertCircle, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import { DashboardSearch } from "@/components/DashboardSearch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const navigate = useNavigate();
  
  const recentCases = [
    { id: "CAS-2024-001", title: "Contract Dispute - ABC Corp", status: "In Progress", date: "2024-01-15" },
    { id: "CAS-2024-002", title: "Employment Case - John Doe", status: "Pending Review", date: "2024-01-14" },
    { id: "CAS-2024-003", title: "Property Litigation - XYZ Ltd", status: "Approved", date: "2024-01-13" },
    { id: "CAS-2024-004", title: "Intellectual Property Case", status: "In Progress", date: "2024-01-12" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your legal case management</p>
        </div>

        <DashboardSearch />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div onClick={() => navigate("/cases?filter=total")} className="cursor-pointer">
            <StatCard
              title="Total Cases"
              value="48"
              icon={FileText}
              trend="+12% from last month"
              trendUp={true}
            />
          </div>
          <div onClick={() => navigate("/cases?filter=approved")} className="cursor-pointer">
            <StatCard
              title="Approved Cases"
              value="32"
              icon={CheckCircle}
              trend="+8% from last month"
              trendUp={true}
            />
          </div>
          <div onClick={() => navigate("/cases?filter=pending")} className="cursor-pointer">
            <StatCard
              title="Pending Review"
              value="12"
              icon={Clock}
              trend="-5% from last month"
              trendUp={false}
            />
          </div>
          <div onClick={() => navigate("/cases?filter=urgent")} className="cursor-pointer">
            <StatCard
              title="Urgent Cases"
              value="4"
              icon={AlertCircle}
              trend="2 due this week"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Cases</CardTitle>
              <CardDescription>Latest case submissions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCases.map((case_) => (
                  <div
                    key={case_.id}
                    onClick={() => navigate(`/case/${case_.id}`)}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="font-medium text-sm text-foreground">{case_.title}</p>
                      <p className="text-xs text-muted-foreground">{case_.id}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-medium text-primary">{case_.status}</span>
                      <p className="text-xs text-muted-foreground">{case_.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Case Performance</CardTitle>
              <CardDescription>Monthly case resolution metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Resolution Rate</span>
                  <span className="text-sm font-bold text-success">87%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: "87%" }}></div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-medium text-foreground">Average Case Duration</span>
                  <span className="text-sm font-bold text-primary">45 days</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "65%" }}></div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-medium text-foreground">Client Satisfaction</span>
                  <span className="text-sm font-bold text-accent">92%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: "92%" }}></div>
                </div>

                <div className="mt-6 p-3 bg-primary/10 rounded-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span className="text-sm text-foreground">
                    Your team is performing <span className="font-bold">15% above</span> target this quarter
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
