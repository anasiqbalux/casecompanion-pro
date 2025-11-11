import { useState } from "react";
import { Bell, CheckCircle, AlertCircle, Info, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NotificationType = "all" | "system" | "action";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: "high" | "medium" | "low";
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "action",
    title: "Case Review Required",
    message: "Case CAS-2024-001 requires your review and approval",
    timestamp: "2024-01-15 10:30 AM",
    read: false,
    priority: "high",
  },
  {
    id: "2",
    type: "system",
    title: "System Maintenance",
    message: "Scheduled maintenance on Jan 20, 2024 from 2:00 AM to 4:00 AM",
    timestamp: "2024-01-15 09:15 AM",
    read: false,
    priority: "medium",
  },
  {
    id: "3",
    type: "action",
    title: "New Case Assignment",
    message: "You have been assigned to case CAS-2024-005",
    timestamp: "2024-01-14 03:45 PM",
    read: false,
    priority: "high",
  },
  {
    id: "4",
    type: "system",
    title: "Document Upload Complete",
    message: "Your document upload for case CAS-2024-003 has been processed",
    timestamp: "2024-01-14 02:20 PM",
    read: true,
    priority: "low",
  },
  {
    id: "5",
    type: "action",
    title: "Case Status Update",
    message: "Case CAS-2024-002 has been moved to 'In Progress' status",
    timestamp: "2024-01-14 11:00 AM",
    read: true,
    priority: "medium",
  },
];

const Notifications = () => {
  const [selectedFilter, setSelectedFilter] = useState<NotificationType>("all");
  const [notifications, setNotifications] = useState(mockNotifications);

  const filteredNotifications = notifications.filter(
    (notif) => selectedFilter === "all" || notif.type === selectedFilter
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getIcon = (type: NotificationType, priority: string) => {
    if (priority === "high") return <AlertCircle className="h-5 w-5 text-destructive" />;
    if (type === "system") return <Info className="h-5 w-5 text-primary" />;
    return <CheckCircle className="h-5 w-5 text-success" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Bell className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
                <p className="text-muted-foreground">
                  You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <Badge
              variant={selectedFilter === "all" ? "default" : "outline"}
              className="cursor-pointer px-4 py-1.5"
              onClick={() => setSelectedFilter("all")}
            >
              All
            </Badge>
            <Badge
              variant={selectedFilter === "system" ? "default" : "outline"}
              className="cursor-pointer px-4 py-1.5"
              onClick={() => setSelectedFilter("system")}
            >
              System
            </Badge>
            <Badge
              variant={selectedFilter === "action" ? "default" : "outline"}
              className="cursor-pointer px-4 py-1.5"
              onClick={() => setSelectedFilter("action")}
            >
              Actions
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No notifications found</p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={cn(
                  "transition-all hover:shadow-md",
                  !notification.read && "border-l-4 border-l-primary bg-accent/20"
                )}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      {getIcon(notification.type, notification.priority)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-base font-semibold">
                            {notification.title}
                          </CardTitle>
                          {!notification.read && (
                            <Badge variant="secondary" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.timestamp}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Notifications;
