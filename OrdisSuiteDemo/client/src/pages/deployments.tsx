import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rocket, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";

export default function Deployments() {
  const fleets = [
    { id: "fleet-alpha", name: "Alpha Fleet", robots: 12, version: "v2.4.1", status: "healthy" },
    { id: "fleet-beta", name: "Beta Fleet", robots: 8, version: "v2.4.0", status: "degraded" },
    { id: "fleet-gamma", name: "Gamma Fleet", robots: 15, version: "v2.3.9", status: "healthy" },
  ];

  const deployments = [
    {
      id: "dep-001",
      version: "v2.4.1",
      fleet: "Alpha Fleet",
      timestamp: "2024-11-14 14:32",
      status: "success",
    },
    {
      id: "dep-002",
      version: "v2.4.0",
      fleet: "Beta Fleet",
      timestamp: "2024-11-14 12:15",
      status: "partial",
    },
    {
      id: "dep-003",
      version: "v2.3.9",
      fleet: "Gamma Fleet",
      timestamp: "2024-11-14 09:48",
      status: "success",
    },
  ];

  const versions = [
    { version: "v2.4.1", changes: "Improved navigation + bug fixes", date: "2024-11-14" },
    { version: "v2.4.0", changes: "New obstacle detection", date: "2024-11-12" },
    { version: "v2.3.9", changes: "Performance optimizations", date: "2024-11-10" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Deployments</h1>
        <p className="text-sm text-muted-foreground">Manage model deployments to robot fleets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fleets.map((fleet) => (
          <Card key={fleet.id} data-testid={`card-fleet-${fleet.id}`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center justify-between gap-2">
                <span>{fleet.name}</span>
                <Badge variant={fleet.status === "healthy" ? "default" : "destructive"} className="text-xs">
                  {fleet.status === "healthy" ? (
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                  ) : (
                    <AlertCircle className="h-3 w-3 mr-1" />
                  )}
                  {fleet.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Robots</span>
                <span className="text-sm font-mono">{fleet.robots}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Version</span>
                <Badge variant="outline" className="text-xs font-mono">
                  {fleet.version}
                </Badge>
              </div>
              <Button variant="outline" className="w-full mt-2" size="sm" data-testid={`button-deploy-${fleet.id}`}>
                <Rocket className="h-3 w-3 mr-1" />
                Deploy Update
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Deployment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {deployments.map((deployment) => (
                <div
                  key={deployment.id}
                  className="flex items-center justify-between p-3 rounded-md border bg-card"
                  data-testid={`deployment-${deployment.id}`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="font-mono text-xs">
                        {deployment.version}
                      </Badge>
                      <span className="text-sm">{deployment.fleet}</span>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono">{deployment.timestamp}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        deployment.status === "success"
                          ? "default"
                          : deployment.status === "partial"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {deployment.status}
                    </Badge>
                    <Button variant="ghost" size="sm" data-testid={`button-rollback-${deployment.id}`}>
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Rollback
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Available Versions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {versions.map((version) => (
                <div
                  key={version.version}
                  className="p-3 rounded-md border bg-card hover-elevate cursor-pointer"
                  onClick={() => console.log(`Select version: ${version.version}`)}
                  data-testid={`version-${version.version}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="font-mono">
                      {version.version}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{version.date}</span>
                  </div>
                  <p className="text-sm">{version.changes}</p>
                  <Button variant="outline" size="sm" className="mt-2" data-testid={`button-deploy-version-${version.version}`}>
                    <Rocket className="h-3 w-3 mr-1" />
                    Deploy
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
