import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Tag, FlaskConical, Workflow, Rocket, Activity, TrendingUp, TrendingDown } from "lucide-react";

export default function Dashboard() {
  const metrics = [
    { title: "Active Sessions", value: "24", change: "+12%", trend: "up", icon: Database },
    { title: "Labeled Frames", value: "18.4K", change: "+8%", trend: "up", icon: Tag },
    { title: "Simulations Running", value: "7", change: "-2", trend: "down", icon: FlaskConical },
    { title: "Pipeline Jobs", value: "15", change: "+5", trend: "up", icon: Workflow },
    { title: "Active Deployments", value: "42", change: "+3", trend: "up", icon: Rocket },
    { title: "System Health", value: "98.2%", change: "+0.5%", trend: "up", icon: Activity },
  ];

  const recentActivity = [
    { time: "2 min ago", event: "Pipeline job completed", module: "Pipeline Builder", status: "success" },
    { time: "5 min ago", event: "New data collection session started", module: "Data Collection", status: "info" },
    { time: "12 min ago", event: "Deployment to fleet-alpha", module: "Deployments", status: "success" },
    { time: "18 min ago", event: "Simulation test failed", module: "Simulation", status: "error" },
    { time: "25 min ago", event: "1,200 frames labeled", module: "Data Labeling", status: "success" },
    { time: "32 min ago", event: "System health check passed", module: "Monitoring", status: "success" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your robotics R&D platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title} data-testid={`card-metric-${metric.title.toLowerCase().replace(/\s+/g, '-')}`}>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold font-mono">{metric.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {metric.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span className={`text-xs ${metric.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                  {metric.change}
                </span>
                <span className="text-xs text-muted-foreground">from last hour</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3" data-testid={`activity-${idx}`}>
                  <div className="min-w-20">
                    <span className="text-xs text-muted-foreground font-mono">{activity.time}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.event}</p>
                    <p className="text-xs text-muted-foreground">{activity.module}</p>
                  </div>
                  <Badge
                    variant={activity.status === "success" ? "default" : activity.status === "error" ? "destructive" : "secondary"}
                    className="text-xs"
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Quick Access</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: "Start Collection", icon: Database, color: "#3B82F6" },
                { title: "Label Data", icon: Tag, color: "#A855F7" },
                { title: "Run Simulation", icon: FlaskConical, color: "#10B981" },
                { title: "Build Pipeline", icon: Workflow, color: "#F59E0B" },
                { title: "Deploy Model", icon: Rocket, color: "#06B6D4" },
                { title: "View Metrics", icon: Activity, color: "#EF4444" },
              ].map((item) => (
                <button
                  key={item.title}
                  className="p-4 rounded-md border bg-card hover-elevate active-elevate-2 text-left transition-all"
                  style={{ borderLeftWidth: "3px", borderLeftColor: item.color }}
                  onClick={() => console.log(`${item.title} clicked`)}
                  data-testid={`button-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <item.icon className="h-5 w-5 mb-2" style={{ color: item.color }} />
                  <p className="text-sm font-medium">{item.title}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
