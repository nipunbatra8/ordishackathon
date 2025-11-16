import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileVideo, Image, Folder, Trash2, Download, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function DataCollection() {
  const [isDragging, setIsDragging] = useState(false);

  const datasets = [
    { 
      id: "ds-001", 
      name: "Urban Navigation Set", 
      type: "video", 
      size: "12.4 GB", 
      files: 1247, 
      uploaded: "2024-11-14",
      status: "processed"
    },
    { 
      id: "ds-002", 
      name: "LiDAR Point Clouds", 
      type: "lidar", 
      size: "8.2 GB", 
      files: 532, 
      uploaded: "2024-11-13",
      status: "processing"
    },
    { 
      id: "ds-003", 
      name: "Obstacle Detection Images", 
      type: "images", 
      size: "4.1 GB", 
      files: 3421, 
      uploaded: "2024-11-12",
      status: "processed"
    },
    { 
      id: "ds-004", 
      name: "Multi-Sensor Recordings", 
      type: "mixed", 
      size: "18.7 GB", 
      files: 892, 
      uploaded: "2024-11-10",
      status: "processed"
    },
  ];

  const uploadQueue = [
    { name: "session_2024_11_14.mp4", progress: 78, size: "2.4 GB" },
    { name: "lidar_data_batch_03.zip", progress: 45, size: "1.8 GB" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Data Collection</h1>
        <p className="text-sm text-muted-foreground">Upload and manage training datasets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Upload Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  isDragging ? "border-primary bg-primary/5" : "border-border"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  console.log("Files dropped:", e.dataTransfer.files);
                }}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Drop files here</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  or click to browse
                </p>
                <Button
                  onClick={() => console.log("Browse files clicked")}
                  data-testid="button-browse-files"
                >
                  Browse Files
                </Button>
                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span>Supported: MP4, AVI, PNG, JPG, PCD, BAG</span>
                  <span>•</span>
                  <span>Max 50GB per upload</span>
                </div>
              </div>

              {uploadQueue.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="text-sm font-medium">Uploading</h4>
                  {uploadQueue.map((upload, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-md border bg-card"
                      data-testid={`upload-${idx}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium font-mono">{upload.name}</p>
                        <span className="text-xs text-muted-foreground">{upload.size}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${upload.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono w-12 text-right">{upload.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Datasets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {datasets.map((dataset) => (
                  <div
                    key={dataset.id}
                    className="flex items-center justify-between p-4 rounded-md border bg-card hover-elevate"
                    data-testid={`dataset-${dataset.id}`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                        {dataset.type === "video" && <FileVideo className="h-5 w-5" />}
                        {dataset.type === "images" && <Image className="h-5 w-5" />}
                        {dataset.type === "lidar" && <Folder className="h-5 w-5" />}
                        {dataset.type === "mixed" && <Folder className="h-5 w-5" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{dataset.name}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span>{dataset.files} files</span>
                          <span>•</span>
                          <span>{dataset.size}</span>
                          <span>•</span>
                          <span>{dataset.uploaded}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={dataset.status === "processed" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {dataset.status === "processed" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                        {dataset.status}
                      </Badge>
                      <Button variant="ghost" size="icon" data-testid={`button-download-${dataset.id}`}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" data-testid={`button-delete-${dataset.id}`}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Storage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Used</span>
                  <span className="text-sm font-mono">43.4 GB / 500 GB</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "8.7%" }} />
                </div>
              </div>
              <div className="pt-2 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Datasets</span>
                  <span className="font-mono">4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Files</span>
                  <span className="font-mono">6,092</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Processing</span>
                  <span className="font-mono">1</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">Dataset processed</p>
                  <p className="text-xs text-muted-foreground">Urban Navigation Set • 5 min ago</p>
                </div>
                <div>
                  <p className="font-medium">Upload completed</p>
                  <p className="text-xs text-muted-foreground">LiDAR Point Clouds • 2 hours ago</p>
                </div>
                <div>
                  <p className="font-medium">Dataset created</p>
                  <p className="text-xs text-muted-foreground">Obstacle Detection Images • 1 day ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
