import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Save, Download, Upload, Plus } from "lucide-react";

export default function PipelineBuilder() {
  const nodes = [
    { id: "1", type: "data", label: "Data Source", x: 50, y: 100 },
    { id: "2", type: "preprocess", label: "Preprocessing", x: 250, y: 100 },
    { id: "3", type: "train", label: "Model Training", x: 450, y: 100 },
    { id: "4", type: "evaluate", label: "Evaluation", x: 650, y: 100 },
  ];

  const pipelines = [
    { id: "pipe-001", name: "Object Detection V2", status: "running", jobs: 3 },
    { id: "pipe-002", name: "Path Planning", status: "completed", jobs: 12 },
    { id: "pipe-003", name: "Obstacle Classification", status: "failed", jobs: 1 },
  ];

  const nodeTypes = [
    { type: "data", label: "Data Source", color: "#3B82F6" },
    { type: "preprocess", label: "Preprocessing", color: "#8B5CF6" },
    { type: "train", label: "Training", color: "#10B981" },
    { type: "evaluate", label: "Evaluation", color: "#F59E0B" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Pipeline Builder</h1>
        <p className="text-sm text-muted-foreground">Design and execute ML training pipelines</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center justify-between gap-2">
              <span>Pipeline Canvas</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" data-testid="button-save-pipeline">
                  <Save className="h-3 w-3 mr-1" />
                  Save
                </Button>
                <Button size="sm" data-testid="button-run-pipeline">
                  <Play className="h-3 w-3 mr-1" />
                  Run Pipeline
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-muted rounded-md relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5"></div>
              <svg className="absolute inset-0 w-full h-full">
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3, 0 6" fill="currentColor" className="text-muted-foreground" />
                  </marker>
                </defs>
                <line
                  x1="150"
                  y1="120"
                  x2="240"
                  y2="120"
                  stroke="currentColor"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                  className="text-muted-foreground"
                />
                <line
                  x1="350"
                  y1="120"
                  x2="440"
                  y2="120"
                  stroke="currentColor"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                  className="text-muted-foreground"
                />
                <line
                  x1="550"
                  y1="120"
                  x2="640"
                  y2="120"
                  stroke="currentColor"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                  className="text-muted-foreground"
                />
              </svg>
              {nodes.map((node) => (
                <div
                  key={node.id}
                  className="absolute p-3 bg-card rounded-md border shadow-sm cursor-pointer hover-elevate"
                  style={{ left: `${node.x}px`, top: `${node.y}px`, width: "100px" }}
                  onClick={() => console.log(`Node clicked: ${node.id}`)}
                  data-testid={`node-${node.id}`}
                >
                  <div className="text-center">
                    <div
                      className="h-8 w-8 rounded-full mx-auto mb-1"
                      style={{
                        backgroundColor: nodeTypes.find((t) => t.type === node.type)?.color,
                        opacity: 0.2,
                      }}
                    />
                    <p className="text-xs font-medium">{node.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Node Types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {nodeTypes.map((nodeType) => (
              <button
                key={nodeType.type}
                className="w-full p-3 rounded-md border bg-card text-left hover-elevate active-elevate-2"
                onClick={() => console.log(`Add node: ${nodeType.type}`)}
                data-testid={`button-add-${nodeType.type}`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: nodeType.color }}
                  />
                  <span className="text-sm">{nodeType.label}</span>
                </div>
              </button>
            ))}
            <Button variant="outline" className="w-full" data-testid="button-add-custom">
              <Plus className="h-4 w-4 mr-2" />
              Custom Node
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center justify-between gap-2">
            <span>Saved Pipelines</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" data-testid="button-import">
                <Upload className="h-3 w-3 mr-1" />
                Import
              </Button>
              <Button variant="outline" size="sm" data-testid="button-export">
                <Download className="h-3 w-3 mr-1" />
                Export
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {pipelines.map((pipeline) => (
              <div
                key={pipeline.id}
                className="p-4 rounded-md border bg-card hover-elevate cursor-pointer"
                onClick={() => console.log(`Load pipeline: ${pipeline.id}`)}
                data-testid={`pipeline-${pipeline.id}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-medium">{pipeline.name}</p>
                  <Badge
                    variant={
                      pipeline.status === "running"
                        ? "default"
                        : pipeline.status === "completed"
                        ? "secondary"
                        : "destructive"
                    }
                    className="text-xs"
                  >
                    {pipeline.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground font-mono">{pipeline.id}</p>
                <p className="text-xs text-muted-foreground mt-1">{pipeline.jobs} jobs completed</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
