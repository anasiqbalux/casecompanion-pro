import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface CaseReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  caseData: any;
}

const CaseReviewModal = ({ open, onOpenChange, onSubmit, caseData }: CaseReviewModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Review Case Submission</DialogTitle>
          <DialogDescription>
            Please review the case details before final submission.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Case Details</h4>
            <div className="bg-muted p-3 rounded-md space-y-1">
              <p className="text-sm"><span className="font-medium">Case Title:</span> {caseData.caseTitle || "N/A"}</p>
              <p className="text-sm"><span className="font-medium">Case Number:</span> {caseData.caseNumber || "N/A"}</p>
              <p className="text-sm"><span className="font-medium">Case Type:</span> {caseData.caseType || "N/A"}</p>
              <p className="text-sm"><span className="font-medium">Priority:</span> {caseData.priority || "N/A"}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Approval Information</h4>
            <div className="bg-muted p-3 rounded-md space-y-1">
              <p className="text-sm"><span className="font-medium">Assigned To:</span> {caseData.assignedTo || "N/A"}</p>
              <p className="text-sm"><span className="font-medium">Approval Status:</span> {caseData.approvalStatus || "Pending"}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Documentation</h4>
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm">{caseData.documents || "No documents attached"}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Additional Information</h4>
            <div className="bg-muted p-3 rounded-md space-y-1">
              <p className="text-sm"><span className="font-medium">Legal Opinion:</span> {caseData.legalOpinion || "N/A"}</p>
              <p className="text-sm"><span className="font-medium">Next Hearing:</span> {caseData.nextHearing || "N/A"}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Go Back
          </Button>
          <Button onClick={onSubmit}>
            Submit Case
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CaseReviewModal;
