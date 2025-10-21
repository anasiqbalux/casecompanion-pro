import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import CaseReviewModal from "@/components/CaseReviewModal";
import { toast } from "sonner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CaseInitiation = () => {
  const navigate = useNavigate();
  const [dateInitiated, setDateInitiated] = useState<Date>();
  const [resolutionDate, setResolutionDate] = useState<Date>();
  const [showReview, setShowReview] = useState(false);
  const [briefDescription, setBriefDescription] = useState("");
  const [caseData, setCaseData] = useState({
    dateInitiated: "",
    externalReference: "",
    group: "",
    division: "",
    referenceNumber: "",
    externalAgency: "",
    unit: "",
    initiatedBy: "",
    subReference: "",
    unitDetails: "",
    serviceType: "",
    approvalBy: "",
    assignedTo: "",
    caseSubject: "",
    approvalStatus: "Pending",
    documents: "",
    resolution: "",
    legalOpinion: "",
    judgment: "",
    nextHearing: "",
    collaborators: "",
    delegationHistory: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setCaseData({ ...caseData, [field]: value });
  };

  const handleReview = () => {
    setShowReview(true);
  };

  const handleSubmit = () => {
    setShowReview(false);
    toast.success("Case submitted successfully!", {
      description: `Case ${caseData.referenceNumber} has been created and is now pending review.`,
    });
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Case Initiation</h1>
          <p className="text-muted-foreground">Create and manage new legal cases</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New Case Information</CardTitle>
            <CardDescription>Fill in the details across all tabs to create a comprehensive case file</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 mb-6">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="approval">Approval</TabsTrigger>
                <TabsTrigger value="documentation">Docs</TabsTrigger>
                <TabsTrigger value="resolution">Resolution</TabsTrigger>
                <TabsTrigger value="opinions">Opinions</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Date Initiated</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateInitiated && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateInitiated ? format(dateInitiated, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateInitiated}
                          onSelect={setDateInitiated}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="externalReference">External Reference</Label>
                    <Input
                      id="externalReference"
                      placeholder="Enter external reference"
                      value={caseData.externalReference}
                      onChange={(e) => handleInputChange("externalReference", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="group">Group</Label>
                    <Input
                      id="group"
                      placeholder="Enter group"
                      value={caseData.group}
                      onChange={(e) => handleInputChange("group", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="division">Division</Label>
                    <Input
                      id="division"
                      placeholder="Enter division"
                      value={caseData.division}
                      onChange={(e) => handleInputChange("division", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="referenceNumber">Reference Number</Label>
                    <Input
                      id="referenceNumber"
                      placeholder="Enter reference number"
                      value={caseData.referenceNumber}
                      onChange={(e) => handleInputChange("referenceNumber", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="externalAgency">External Agency</Label>
                    <Select value={caseData.externalAgency} onValueChange={(value) => handleInputChange("externalAgency", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select agency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="agency1">Agency 1</SelectItem>
                        <SelectItem value="agency2">Agency 2</SelectItem>
                        <SelectItem value="agency3">Agency 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Input
                      id="unit"
                      placeholder="Enter unit"
                      value={caseData.unit}
                      onChange={(e) => handleInputChange("unit", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="initiatedBy">Initiated By</Label>
                    <Input
                      id="initiatedBy"
                      placeholder="Enter initiator name"
                      value={caseData.initiatedBy}
                      onChange={(e) => handleInputChange("initiatedBy", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subReference">Sub Reference</Label>
                    <Input
                      id="subReference"
                      placeholder="Enter sub reference"
                      value={caseData.subReference}
                      onChange={(e) => handleInputChange("subReference", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unitDetails">Unit Details</Label>
                    <Input
                      id="unitDetails"
                      placeholder="Enter unit details"
                      value={caseData.unitDetails}
                      onChange={(e) => handleInputChange("unitDetails", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Service Type</Label>
                    <Input
                      id="serviceType"
                      placeholder="Enter service type"
                      value={caseData.serviceType}
                      onChange={(e) => handleInputChange("serviceType", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="approvalBy">Approval By</Label>
                    <Input
                      id="approvalBy"
                      placeholder="Enter approver name"
                      value={caseData.approvalBy}
                      onChange={(e) => handleInputChange("approvalBy", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="assignedTo">Assigned To</Label>
                    <Select value={caseData.assignedTo} onValueChange={(value) => handleInputChange("assignedTo", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select attorney" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john-smith">John Smith</SelectItem>
                        <SelectItem value="jane-doe">Jane Doe</SelectItem>
                        <SelectItem value="robert-johnson">Robert Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="caseSubject">Case Subject</Label>
                  <Input
                    id="caseSubject"
                    placeholder="Enter case subject"
                    value={caseData.caseSubject}
                    onChange={(e) => handleInputChange("caseSubject", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Brief Description</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setBriefDescription("")}
                    >
                      Clear
                    </Button>
                  </div>
                  <ReactQuill
                    theme="snow"
                    value={briefDescription}
                    onChange={setBriefDescription}
                    className="bg-background"
                  />
                </div>
              </TabsContent>

              <TabsContent value="approval" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="assignedTo">Assigned To</Label>
                    <Select value={caseData.assignedTo} onValueChange={(value) => handleInputChange("assignedTo", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select attorney" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john-smith">John Smith</SelectItem>
                        <SelectItem value="jane-doe">Jane Doe</SelectItem>
                        <SelectItem value="robert-johnson">Robert Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="approvalStatus">Approval Status</Label>
                    <Input
                      id="approvalStatus"
                      value="Pending"
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="approvalNotes">Approval Notes</Label>
                  <Textarea
                    id="approvalNotes"
                    placeholder="Add any notes for approval..."
                    className="min-h-32"
                  />
                </div>
              </TabsContent>

              <TabsContent value="documentation" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="documents">Document References</Label>
                  <Textarea
                    id="documents"
                    placeholder="List all relevant documents, evidence, and files..."
                    className="min-h-32"
                    value={caseData.documents}
                    onChange={(e) => handleInputChange("documents", e.target.value)}
                  />
                </div>
                <div className="p-4 border-2 border-dashed rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">Drag and drop files here, or click to browse</p>
                  <Button variant="outline" size="sm">Browse Files</Button>
                </div>
              </TabsContent>

              <TabsContent value="resolution" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resolution">Case Resolution Strategy</Label>
                  <Textarea
                    id="resolution"
                    placeholder="Outline the resolution strategy and expected outcomes..."
                    className="min-h-32"
                    value={caseData.resolution}
                    onChange={(e) => handleInputChange("resolution", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Expected Resolution Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !resolutionDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {resolutionDate ? format(resolutionDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={resolutionDate}
                          onSelect={setResolutionDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="opinions" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="legalOpinion">Legal Opinion</Label>
                  <Textarea
                    id="legalOpinion"
                    placeholder="Provide legal opinion on the case..."
                    className="min-h-32"
                    value={caseData.legalOpinion}
                    onChange={(e) => handleInputChange("legalOpinion", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="judgment">Judgment Notes</Label>
                  <Textarea
                    id="judgment"
                    placeholder="Document judgment details and outcomes..."
                    className="min-h-32"
                    value={caseData.judgment}
                    onChange={(e) => handleInputChange("judgment", e.target.value)}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-end gap-4">
              <Button variant="outline" onClick={() => navigate("/")}>
                Cancel
              </Button>
              <Button onClick={handleReview}>
                Review & Submit
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <CaseReviewModal
        open={showReview}
        onOpenChange={setShowReview}
        onSubmit={handleSubmit}
        caseData={caseData}
      />
    </div>
  );
};

export default CaseInitiation;
