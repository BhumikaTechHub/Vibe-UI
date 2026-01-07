// Demo Imports
import { DynamicRenderer } from "../components/DynamicRenderer";
import { UIComponent } from "../types/uiSchema";

const mockUISchema: UIComponent = {
  type: "container",
  props: { padding: "breathable", background: "card", layout: "flex", gap: "large" },
  children: [
    {
      type: "text",
      props: { content: "Day 6: Safe Renderer Active", variant: "h2", align: "center" }
    },
    {
      type: "text",
      props: { content: "This UI is generated from JSON. No hardcoded JSX here.", align: "center", emphasis: "muted" }
    },
    {
      type: "container",
      props: { layout: "flex", direction: "row", gap: "medium", padding: "none", className: "justify-center mt-4" },
      children: [
        { type: "button", props: { label: "Accept Contract", variant: "primary" } },
        { type: "button", props: { label: "Reject", variant: "ghost" } }
      ]
    }
  ]
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 gap-12 bg-background relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[0%] right-[0%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <main className="max-w-4xl w-full flex flex-col items-center text-center gap-6 z-10">
        
        {/* --- DEMO SECTION START --- */}
        <section className="w-full max-w-2xl mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
           <div className="text-xs font-mono text-muted-foreground mb-4 uppercase tracking-widest">Safe Renderer Output</div>
           <DynamicRenderer component={mockUISchema} />
        </section>
        {/* --- DEMO SECTION END --- */}

        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm shadow-sm transition-all hover:bg-card/80">
          <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
          <span className="text-sm font-medium text-muted-foreground">System Online · Day 6 Phase</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
          Vibe-UI
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
          The <span className="text-accent font-semibold">Adaptive Interface Engine</span> where
          Gemini 3 is the brain, but <span className="text-foreground decoration-accent/30 underline underline-offset-4">Contracts are the Law</span>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-12">
          <FeatureCard
            title="Reasoning Engine"
            desc="Gemini 3 infers content, not structure."
            icon="🧠"
          />
          <FeatureCard
            title="Safe Rendering"
            desc="Zero production hallucinations."
            icon="🛡️"
          />
          <FeatureCard
            title="Behavioral Adaptation"
            desc="UI shape-shifts based on user state."
            icon="⚡"
          />
          <FeatureCard
            title="Deterministic"
            desc="Same input = Same output. Always."
            icon="🔒"
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ title, desc, icon }: { title: string; desc: string; icon: string }) {
  return (
    <div className="group flex flex-col items-start text-left p-6 rounded-2xl border border-border bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:border-accent/50 hover:-translate-y-1">
      <div className="text-3xl mb-4 p-3 bg-muted/50 rounded-xl group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
