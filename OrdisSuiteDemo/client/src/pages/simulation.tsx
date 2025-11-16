import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Play, Square, Settings, Wifi, WifiOff, RefreshCw, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function Simulation() {
  const [isConnected, setIsConnected] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const scenarios = [
    { id: "scn-001", name: "Warehouse Navigation", environment: "warehouse_001.usd", status: "ready" },
    { id: "scn-002", name: "Urban Street", environment: "city_block_v2.usd", status: "ready" },
    { id: "scn-003", name: "Factory Floor", environment: "factory_sim.usd", status: "ready" },
  ];

  const recentRuns = [
    { time: "2 min ago", scenario: "Warehouse Navigation", duration: "145s", status: "completed" },
    { time: "15 min ago", scenario: "Urban Street", duration: "203s", status: "completed" },
    { time: "1 hour ago", scenario: "Factory Floor", duration: "89s", status: "failed" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Simulation & Testing</h1>
        <p className="text-sm text-muted-foreground">NVIDIA Isaac Sim integration for robot testing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span>Isaac Sim Connection</span>
                <Badge variant={isConnected ? "default" : "secondary"} className="text-xs">
                  {isConnected ? (
                    <>
                      <Wifi className="h-3 w-3 mr-1" />
                      Connected
                    </>
                  ) : (
                    <>
                      <WifiOff className="h-3 w-3 mr-1" />
                      Disconnected
                    </>
                  )}
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsConnected(!isConnected);
                  console.log(isConnected ? "Disconnecting..." : "Connecting...");
                }}
                data-testid="button-connect-isaac"
              >
                {isConnected ? "Disconnect" : "Connect"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground">Host</Label>
                <Input
                  type="text"
                  placeholder="localhost"
                  defaultValue="localhost"
                  className="mt-1"
                  data-testid="input-isaac-host"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Port</Label>
                <Input
                  type="text"
                  placeholder="8211"
                  defaultValue="8211"
                  className="mt-1"
                  data-testid="input-isaac-port"
                />
              </div>
            </div>

            <div className="aspect-video bg-muted rounded-md flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10"></div>
              {isConnected ? (
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-500/20 mb-4">
                      <Wifi className="h-8 w-8 text-green-500" />
                    </div>
                    <p className="text-sm font-medium">Isaac Sim Connected</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">
                      {isRunning ? "Simulation running..." : "Ready to simulate"}
                    </p>
                  </div>
                  {isRunning && (
                    <div className="absolute top-4 left-4 right-4">
                      <div className="bg-card/80 backdrop-blur-sm rounded-md p-3 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Simulation Time</span>
                          <span className="font-mono">00:24.5s</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Physics FPS</span>
                          <span className="font-mono">60</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Render FPS</span>
                          <span className="font-mono">30</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative z-10 text-center">
                  <WifiOff className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Not connected to Isaac Sim</p>
                  <p className="text-xs text-muted-foreground mt-1">Configure connection and click Connect</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button
                  variant={isRunning ? "destructive" : "default"}
                  disabled={!isConnected}
                  onClick={() => {
                    setIsRunning(!isRunning);
                    console.log(isRunning ? "Stopping simulation..." : "Starting simulation...");
                  }}
                  data-testid="button-run-simulation"
                >
                  {isRunning ? (
                    <>
                      <Square className="h-4 w-4 mr-2" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Run Simulation
                    </>
                  )}
                </Button>
                <Button variant="outline" disabled={!isConnected} data-testid="button-reset">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
              <Button variant="ghost" size="sm" data-testid="button-open-isaac">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Isaac Sim
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Scenarios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {scenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  className="w-full p-3 rounded-md border bg-card text-left hover-elevate active-elevate-2"
                  onClick={() => console.log(`Load scenario: ${scenario.id}`)}
                  disabled={!isConnected}
                  data-testid={`button-scenario-${scenario.id}`}
                >
                  <p className="text-sm font-medium">{scenario.name}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-1">{scenario.environment}</p>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {scenario.status}
                  </Badge>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" data-testid="button-configure">
                <Settings className="h-4 w-4 mr-2" />
                Configure Isaac Sim
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Recent Simulation Runs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentRuns.map((run, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-md border bg-card"
                data-testid={`run-${idx}`}
              >
                <div className="flex items-start gap-3">
                  <div className="min-w-20">
                    <span className="text-xs text-muted-foreground font-mono">{run.time}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{run.scenario}</p>
                    <p className="text-xs text-muted-foreground">Duration: {run.duration}</p>
                  </div>
                </div>
                <Badge variant={run.status === "completed" ? "default" : "destructive"} className="text-xs">
                  {run.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
