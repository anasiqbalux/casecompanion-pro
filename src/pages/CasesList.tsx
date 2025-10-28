import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const CasesList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "all";
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - replace with actual data fetching
  const allCases = [
    { id: "CAS-2024-001", title: "Contract Dispute - ABC Corp", status: "In Progress", date: "2024-01-15", priority: "High" },
    { id: "CAS-2024-002", title: "Employment Case - John Doe", status: "Pending Review", date: "2024-01-14", priority: "Medium" },
    { id: "CAS-2024-003", title: "Property Litigation - XYZ Ltd", status: "Approved", date: "2024-01-13", priority: "Low" },
    { id: "CAS-2024-004", title: "Intellectual Property Case", status: "In Progress", date: "2024-01-12", priority: "High" },
    { id: "CAS-2024-005", title: "Personal Injury Claim", status: "Urgent", date: "2024-01-11", priority: "Critical" },
    { id: "CAS-2024-006", title: "Family Law Matter", status: "Approved", date: "2024-01-10", priority: "Medium" },
    { id: "CAS-2024-007", title: "Corporate Merger Review", status: "Pending Review", date: "2024-01-09", priority: "High" },
    { id: "CAS-2024-008", title: "Tax Dispute Resolution", status: "Urgent", date: "2024-01-08", priority: "Critical" },
  ];

  const getFilteredCases = () => {
    let filtered = allCases;
    
    switch (filter) {
      case "total":
        filtered = allCases;
        break;
      case "approved":
        filtered = allCases.filter(c => c.status === "Approved");
        break;
      case "pending":
        filtered = allCases.filter(c => c.status === "Pending Review");
        break;
      case "urgent":
        filtered = allCases.filter(c => c.status === "Urgent");
        break;
      default:
        filtered = allCases;
    }

    if (searchQuery) {
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const getTitle = () => {
    switch (filter) {
      case "approved": return "Approved Cases";
      case "pending": return "Pending Review Cases";
      case "urgent": return "Urgent Cases";
      default: return "All Cases";
    }
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

  const filteredCases = getFilteredCases();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{getTitle()}</h1>
          <p className="text-muted-foreground">
            {filteredCases.length} {filteredCases.length === 1 ? 'case' : 'cases'} found
          </p>
        </div>

        <div className="mb-6 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search cases by title or ID..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="space-y-4">
          {filteredCases.map((case_) => (
            <Card
              key={case_.id}
              className="hover:shadow-lg transition-all cursor-pointer"
              onClick={() => navigate(`/case/${case_.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{case_.title}</h3>
                      <Badge className={getStatusColor(case_.status)}>
                        {case_.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{case_.id}</span>
                      <span>•</span>
                      <span>{case_.date}</span>
                      <span>•</span>
                      <span>Priority: {case_.priority}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredCases.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No cases found matching your criteria.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default CasesList;
