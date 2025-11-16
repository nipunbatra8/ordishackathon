# Ordis Suite Design Guidelines

## Design Approach: Enterprise SaaS Platform
**Reference Inspiration**: Atlassian Suite + Datadog + Linear
**Rationale**: Complex enterprise robotics platform requiring unified navigation, module organization, and data-dense interfaces with professional polish.

## Core Design Principles
1. **Unified Navigation**: Single persistent sidebar with color-coded module switching
2. **Information Clarity**: Dense data presentation without overwhelming users
3. **Module Identity**: Each module has distinct color accent while maintaining cohesion
4. **Professional Polish**: Dark-primary interface optimized for extended technical work sessions

---

## Typography System

**Font Stack**: 
- Primary: Inter (via Google Fonts CDN)
- Monospace: JetBrains Mono (for code/data displays)

**Hierarchy**:
- Page Titles: text-2xl font-semibold
- Section Headers: text-lg font-medium
- Body Text: text-sm font-normal
- Labels/Meta: text-xs font-medium uppercase tracking-wide
- Data/Numbers: text-base font-mono

---

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, and 8 (p-2, m-4, gap-6, space-y-8)

**Grid Structure**:
- Sidebar: Fixed 64px width (collapsed) / 240px (expanded)
- Main Content: flex-1 with max-w-7xl container
- Module Cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Dashboard Metrics: grid-cols-2 lg:grid-cols-4
- Split Views (Labeling): grid-cols-1 lg:grid-cols-2

---

## Component Library

### Navigation
- **Unified Sidebar**: Vertical module list with icons, collapsible state, module color indicators (left border accent)
- **Top Bar**: Breadcrumbs, search, notifications, user profile
- **Module Switcher**: Hover reveals module name, active state with background fill

### Data Display
- **Status Cards**: Compact metric displays with icon, value, label, trend indicator
- **Data Tables**: Sortable headers, row hover, pagination, density controls
- **Timeline Views**: Vertical event stream with timestamps and status badges
- **Video/LiDAR Viewer**: Full-featured playback controls, frame scrubber, annotation overlays

### Interactive Elements
- **Pipeline Builder**: Canvas-based drag-and-drop with node connections, zoom controls
- **Robot Fleet Cards**: Grid of robot status cards with live indicators, quick actions
- **Control Panels**: Grouped button sets with recording/stop states, session management
- **Charts**: Line graphs for metrics, bar charts for comparisons, real-time updating

### Forms & Inputs
- **Filters**: Multi-select dropdowns, date range pickers, tag inputs
- **Search**: Instant results dropdown with keyboard navigation
- **Settings Panels**: Grouped form sections with clear labels and helper text

### Feedback
- **Status Badges**: Color-coded pills (success/warning/error/info)
- **Toast Notifications**: Bottom-right stacked notifications
- **Loading States**: Skeleton screens for data tables, spinner for actions
- **Progress Indicators**: Step wizards for deployments, upload progress bars

---

## Module Color System

Each module uses an accent color for sidebar indicators, active states, and primary CTAs within that module:

- **Data Collection**: Blue (#3B82F6)
- **Data Labeling**: Purple (#A855F7)
- **Simulation**: Green (#10B981)
- **Pipeline Builder**: Orange (#F59E0B)
- **Deployments**: Cyan (#06B6D4)
- **Monitoring**: Red (#EF4444)

---

## Icons
**Library**: Heroicons (via CDN) - outline style for navigation, solid for status indicators

---

## Images
**No hero images** - This is a working application dashboard, not a marketing site. All visuals are functional: robot camera feeds, LiDAR point clouds, pipeline diagrams, performance graphs.

---

## Animations
**Minimal & Functional Only**:
- Sidebar expand/collapse: 200ms ease
- Module switching: fade transition 150ms
- Live data updates: subtle pulse on change
- **No decorative animations** - focus on data clarity

---

## Key Screen Specifications

**Dashboard Home**: 4-column metric cards, activity timeline, quick access module cards
**Data Collection**: Split view - robot feed + recording controls + session list
**Data Labeling**: Dual-pane video/LiDAR viewer with annotation toolbar, frame navigation
**Pipeline Builder**: Full canvas workspace with toolbox sidebar, node palette, configuration panels
**Deployments**: Fleet grid view + deployment history table + version comparison
**Monitoring**: Real-time metric charts (2x3 grid), system health indicators, alert feed