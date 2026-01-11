"use client";
import React from 'react';

// Demo Imports
import { DynamicRenderer } from "../../components/DynamicRenderer";
import { SkeletonLoader } from "../../components/SkeletonLoader";
import { DebugPanel } from "../../components/DebugPanel";
import { UIComponent } from "../../types/uiSchema";
import { useBehaviorTracking } from "../../hooks/useBehaviorTracking";

// Mock Data for Dashboard (Initial State)
const mockDashboardSchema: UIComponent = {
  type: "container",
  props: { padding: "breathable", background: "card", layout: "grid", gap: "large" },
  children: [
    {
      type: "text",
      props: { content: "System Status: Nominal", variant: "h2", align: "left" }
    },
    {
      type: "container",
      props: { layout: "flex", direction: "row", gap: "medium" },
      children: [
        { type: "button", props: { label: "Refresh Metrics", variant: "primary" } },
        { type: "button", props: { label: "Export Logs", variant: "ghost" } }
      ]
    }
  ]
};

export default function Dashboard() {
  const [uiSchema, setUiSchema] = React.useState<UIComponent | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { metrics } = useBehaviorTracking('demo-dashboard');

  // Debug State
  const [currentVibe, setCurrentVibe] = React.useState("calm_guided");
  const [inferredState, setInferredState] = React.useState("unknown");
  const [cacheStatus, setCacheStatus] = React.useState<'HIT' | 'MISS' | 'IDLE'>('IDLE');

  const handleGenerate = async () => {
    setIsLoading(true);
    setUiSchema(null); // Reset to show skeleton
    
    const startTime = Date.now();

    try {
        const response = await fetch('http://localhost:3001/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                manifest: { 
                    goal: "dashboard_overview", 
                    requiredElements: ["server_uptime", "error_rate_graph", "active_users_kpi"], 
                    constraints: { density: "high", information_hierarchy: "strict" } 
                },
                vibe: currentVibe, 
                userState: "demo_user", 
                currentVibe 
            })
        });
        
        const data = await response.json();
        const duration = Date.now() - startTime;

        if (data.uiSchema) {
            setUiSchema(data.uiSchema);
            if (data.vibe) setCurrentVibe(data.vibe);
            if (data.userState) setInferredState(data.userState);
            setCacheStatus(duration < 50 ? 'HIT' : 'MISS');
        }
    } catch (e) {
        console.error("Generation failed", e);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 gap-12 bg-background relative overflow-hidden">
      <DebugPanel 
        metrics={metrics}
        vibe={currentVibe}
        userState={inferredState}
        isLoading={isLoading}
        lastCacheStatus={cacheStatus}
      />
      
      {/* Background Gradient (Distinct from Home) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      <nav className="absolute top-8 left-8">
        <a href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          ← Back to Demo Home
        </a>
      </nav>

      <main className="max-w-6xl w-full flex flex-col items-center text-center gap-6 z-10">

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-8">
          Vibe Dashboard
        </h1>

        {/* --- DEMO SECTION START --- */}
        <section className="w-full min-h-[500px] border border-dashed border-border/50 rounded-xl p-8 flex flex-col items-center justify-center bg-card/20 backdrop-blur-sm">
          <div className="text-xs font-mono text-muted-foreground mb-4 uppercase tracking-widest">
            {isLoading ? "Gemini 3 Generating Dashboard..." : "Live Vibe Layout"}
          </div>
          
          {isLoading ? (
             <SkeletonLoader />
          ) : uiSchema ? (
             <DynamicRenderer component={uiSchema} />
          ) : (
             <div className="text-muted-foreground">
                <p className="mb-4">Click below to generate a data-heavy dashboard layout.</p>
                <button 
                  onClick={handleGenerate}
                  className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                >
                    📊 Generate Dashboard
                </button>
             </div>
          )}
        </section>
        {/* --- DEMO SECTION END --- */}

      </main>
    </div>
  );
}
