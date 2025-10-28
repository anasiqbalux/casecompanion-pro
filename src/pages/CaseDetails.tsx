import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User, FileText, Clock, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const CaseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - replace with actual data fetching
  const caseData = {
    id: id || "CAS-2024-001",
    title: "Contract Dispute - ABC Corp",
    status: "In Progress",
    priority: "High",
    date: "2024-01-15",
    assignedTo: "John Smith",
    clientName: "ABC Corporation",
    caseType: "Contract Dispute",
    description: "This case involves a contract dispute between ABC Corporation and their vendor regarding the terms of service delivery. The client alleges breach of contract due to delayed deliveries and substandard quality of goods provided.",
    timeline: [
      { date: "2024-01-15", event: "Case initiated", description: "Initial consultation and case review" },
      { date: "2024-01-18", event: "Document submission", description: "Client submitted all relevant contracts and correspondence" },
      { date: "2024-01-22", event: "Legal review", description: "Legal team completed initial assessment" },
      { date: "2024-01-25", event: "Status update", description: "Awaiting response from opposing counsel" },
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved": return "bg-success text-success-foreground";
      case "in progress": return "bg-primary text-primary-foreground";
      case "pending review": return "bg-warning text-warning-foreground";
      case "urgent": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{caseData.title}</h1>
              <p className="text-muted-foreground">{caseData.id}</p>
            </div>
            <Badge className={getStatusColor(caseData.status)}>
              {caseData.status}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Case Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                  <p className="text-foreground">{caseData.description}</p>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Case Type</h3>
                    <p className="text-foreground">{caseData.caseType}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Priority</h3>
                    <Badge variant="outline">{caseData.priority}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Case Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {caseData.timeline.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        {index < caseData.timeline.length - 1 && (
                          <div className="w-0.5 h-full bg-border my-1"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground">{item.event}</span>
                          <span className="text-xs text-muted-foreground">{item.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Date Created</p>
                    <p className="text-sm font-medium text-foreground">{caseData.date}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Assigned To</p>
                    <p className="text-sm font-medium text-foreground">{caseData.assignedTo}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Client Name</p>
                    <p className="text-sm font-medium text-foreground">{caseData.clientName}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="default">
                  Edit Case
                </Button>
                <Button className="w-full" variant="outline">
                  Add Note
                </Button>
                <Button className="w-full" variant="outline">
                  Upload Document
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CaseDetails;
