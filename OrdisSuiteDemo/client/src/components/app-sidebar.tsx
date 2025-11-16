import {
  Database,
  Tag,
  FlaskConical,
  Workflow,
  Rocket,
  Activity,
  LayoutDashboard,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useLocation } from "wouter";

const modules = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    color: "hsl(217 91% 48%)",
  },
  {
    title: "Data Collection",
    url: "/data-collection",
    icon: Database,
    color: "#3B82F6",
  },
  {
    title: "Data Labeling",
    url: "/data-labeling",
    icon: Tag,
    color: "#A855F7",
  },
  {
    title: "Simulation",
    url: "/simulation",
    icon: FlaskConical,
    color: "#10B981",
  },
  {
    title: "Pipeline Builder",
    url: "/pipeline-builder",
    icon: Workflow,
    color: "#F59E0B",
  },
  {
    title: "Deployments",
    url: "/deployments",
    icon: Rocket,
    color: "#06B6D4",
  },
  {
    title: "Monitoring",
    url: "/monitoring",
    icon: Activity,
    color: "#EF4444",
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-sm">O</span>
          </div>
          <div>
            <h1 className="font-semibold text-sm">Ordis Suite</h1>
            <p className="text-xs text-muted-foreground">Robotics R&D</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((module) => {
                const isActive = location === module.url;
                return (
                  <SidebarMenuItem key={module.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      data-testid={`link-${module.title.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <a
                        href={module.url}
                        className="relative"
                        style={
                          isActive
                            ? {
                                borderLeft: `3px solid ${module.color}`,
                                paddingLeft: "calc(0.75rem - 3px)",
                              }
                            : {}
                        }
                      >
                        <module.icon className="h-4 w-4" />
                        <span>{module.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
