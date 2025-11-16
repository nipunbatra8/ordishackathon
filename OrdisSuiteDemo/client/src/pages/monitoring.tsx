import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, AlertTriangle, CheckCircle2, Activity } from "lucide-react";

export default function Monitoring() {
  const cpuData = [
    { time: "10:00", value: 45 },
    { time: "10:15", value: 52 },
    { time: "10:30", value: 48 },
    { time: "10:45", value: 65 },
    { time: "11:00", value: 58 },
    { time: "11:15", value: 72 },
  ];

  const memoryData = [
    { time: "10:00", value: 3.2 },
    { time: "10:15", value: 3.5 },
    { time: "10:30", value: 3.8 },
    { time: "10:45", value: 4.1 },
    { time: "11:00", value: 3.9 },
    { time: "11:15", value: 4.5 },
  ];

  const metrics = [
    { title: "System Uptime", value: "99.8%", status: "healthy", icon: CheckCircle2 },
    { title: "Active Robots", value: "35/42", status: "healthy", icon: Activity },
    { title: "Error Rate", value: "0.12%", status: "warning", icon: AlertTriangle },
    { title: "Avg Response", value: "124ms", status: "healthy", icon: TrendingUp },
  ];

  const alerts = [
    { time: "11:12", severity: "warning", message: "High CPU usage on robot-23", module: "Data Collection" },
    { time: "10:58", severity: "info", message: "Deployment completed successfully", module: "Deployments" },
    { time: "10:45", severity: "error", message: "Connection lost to robot-17", module: "Monitoring" },
    { time: "10:32", severity: "info", message: "Pipeline job finished", module: "Pipeline Builder" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Monitoring & Analytics</h1>
        <p className="text-sm text-muted-foreground">Real-time system metrics and performance monitoring</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title} data-testid={`card-${metric.title.toLowerCase().replace(/\s+/g, '-')}`}>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon
                className={`h-4 w-4 ${
                  metric.status === "healthy"
                    ? "text-green-500"
                    : metric.status === "warning"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold font-mono">{metric.value}</div>
              <Badge
                variant={
                  metric.status === "healthy"
                    ? "default"
                    : metric.status === "warning"
                    ? "secondary"
                    : "destructive"
                }
                className="mt-2 text-xs"
              >
                {metric.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">CPU Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={cpuData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="time" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Line type="monotone" dataKey="value" stroke="#EF4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Memory Usage (GB)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={memoryData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="time" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">System Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-md border bg-card"
                data-testid={`alert-${idx}`}
              >
                <div className="min-w-16">
                  <span className="text-xs text-muted-foreground font-mono">{alert.time}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.module}</p>
                </div>
                <Badge
                  variant={
                    alert.severity === "error"
                      ? "destructive"
                      : alert.severity === "warning"
                      ? "secondary"
                      : "outline"
                  }
                  className="text-xs"
                >
                  {alert.severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
