import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Square, Box, Tag as TagIcon } from "lucide-react";
import { useState } from "react";

export default function DataLabeling() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(42);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const tools = [
    { id: "bbox", name: "Bounding Box", icon: Square },
    { id: "3dbox", name: "3D Box", icon: Box },
    { id: "tag", name: "Tag", icon: TagIcon },
  ];

  const annotations = [
    { id: 1, type: "person", confidence: 0.94, frame: 42 },
    { id: 2, type: "vehicle", confidence: 0.87, frame: 42 },
    { id: 3, type: "obstacle", confidence: 0.92, frame: 42 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Data Labeling</h1>
        <p className="text-sm text-muted-foreground">Annotate video and LiDAR data for training</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center justify-between gap-2">
              <span>Video Feed</span>
              <Badge variant="outline" className="font-mono text-xs">
                Frame {currentFrame} / 1247
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video bg-muted rounded-md flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>
              <div className="relative z-10 text-center">
                <p className="text-sm text-muted-foreground">Video frame preview</p>
                <p className="text-xs text-muted-foreground font-mono mt-1">sess-001_frame_{currentFrame}</p>
              </div>
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-purple-500 rounded">
                  <div className="absolute -top-6 left-0 bg-purple-500 text-white px-2 py-1 text-xs rounded">
                    person (0.94)
                  </div>
                </div>
                <div className="absolute top-1/3 right-1/4 w-40 h-24 border-2 border-blue-500 rounded">
                  <div className="absolute -top-6 left-0 bg-blue-500 text-white px-2 py-1 text-xs rounded">
                    vehicle (0.87)
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Slider
                value={[currentFrame]}
                min={0}
                max={1247}
                step={1}
                onValueChange={(value) => setCurrentFrame(value[0])}
                data-testid="slider-frame"
              />
              <div className="flex items-center justify-center gap-2">
                <Button variant="outline" size="icon" data-testid="button-skip-back">
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setIsPlaying(!isPlaying);
                    console.log(isPlaying ? "Paused" : "Playing");
                  }}
                  data-testid="button-play-pause"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="icon" data-testid="button-skip-forward">
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">LiDAR Point Cloud</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-md flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10"></div>
              <div className="relative z-10 text-center">
                <p className="text-sm text-muted-foreground">3D point cloud visualization</p>
                <p className="text-xs text-muted-foreground font-mono mt-1">124,532 points</p>
              </div>
              <div className="absolute inset-0">
                {[...Array(50)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-green-500 rounded-full opacity-60"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Annotations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {annotations.map((ann) => (
                <div
                  key={ann.id}
                  className="flex items-center justify-between p-3 rounded-md border bg-card hover-elevate"
                  data-testid={`annotation-${ann.id}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                      <Square className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{ann.type}</p>
                      <p className="text-xs text-muted-foreground">Frame {ann.frame}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="font-mono text-xs">
                      {(ann.confidence * 100).toFixed(0)}%
                    </Badge>
                    <Button variant="ghost" size="sm" data-testid={`button-delete-annotation-${ann.id}`}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Annotation Tools</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {tools.map((tool) => (
              <button
                key={tool.id}
                className={`w-full p-3 rounded-md border text-left hover-elevate active-elevate-2 transition-all ${
                  selectedTool === tool.id ? "bg-accent" : "bg-card"
                }`}
                onClick={() => {
                  setSelectedTool(tool.id);
                  console.log(`Selected tool: ${tool.name}`);
                }}
                data-testid={`button-tool-${tool.id}`}
              >
                <div className="flex items-center gap-3">
                  <tool.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{tool.name}</span>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
