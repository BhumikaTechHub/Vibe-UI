

# 🎨 Vibe-UI

### A Constrained, Adaptive UI System Powered by Gemini 3

---

## 🚀 Project Overview

**Vibe-UI** is a production-oriented experimental system that adapts a web interface in real time based on a user’s **behavioral and cognitive state** (calm, rushed, confused, frustrated, low-confidence).

At the core of Vibe-UI lies **Gemini 3**, acting as the **central reasoning engine (the brain)** of the system.
However, Gemini is **never allowed to freely design UI**.

Instead, Gemini operates inside a **strictly controlled pipeline** governed by:

* Deterministic rules
* Predefined UI vibes (layout archetypes)
* Semantic manifests (page intent)
* Hard safety contracts

> 🔑 **Key Philosophy**
> Gemini 3 is the **brain**,
> but **contracts, manifests, and rules are the law**.

---

## 🧠 Why Vibe-UI Exists

Most AI-generated UI systems fail because they:

* Hallucinate layouts
* Break brand or UX consistency
* Are slow and unpredictable
* Cannot be trusted in real products

**Vibe-UI takes the opposite approach**:

* ❌ No free-form UI generation
* ❌ No AI-decided layouts
* ❌ No uncontrolled creativity

Instead:

* AI adapts **content and emphasis**
* Humans define **structure and rules**
* Output is deterministic, cacheable, and explainable

---

## 🧩 High-Level System Flow

1. User opens a page (Checkout, Dashboard, Form, etc.)
2. Frontend tracks **raw behavioral signals**
3. Backend infers the user’s current state
4. Backend selects a predefined **UI Vibe**
5. A **semantic manifest** describes the page intent
6. Gemini 3 receives:

   * Manifest (intent)
   * Vibe contract (rules)
   * Device context
7. Gemini generates a **JSON UI schema**
8. UI is safely rendered using whitelisted primitives
9. Result is cached and streamed for performance

---

## 🧠 Gemini 3 — The Central Brain

Gemini 3 is the **main intelligence unit** responsible for:

✅ Understanding semantic intent
✅ Adapting tone, wording, hierarchy
✅ Optimizing clarity based on user state

Gemini 3 **MUST NOT**:

* Decide layout structure
* Invent UI components
* Output JSX, HTML, or CSS
* Break vibe or manifest constraints

> Think of Gemini as a **semantic compiler**, not a designer.

---

## 🧩 Core Concepts

---

### 1️⃣ Behavior-Driven Intelligence (Frontend)

The frontend tracks **raw, privacy-safe signals only**:

* Click speed & rage clicks
* Retry / error frequency
* Time on page
* Hesitation before first action
* Mouse movement volatility
* Device type

🚫 No emotion detection
🚫 No PII
🚫 No inference on frontend

---

### 2️⃣ User State Inference (Backend)

The backend converts signals into **explainable states**:

* `calm`
* `rushed`
* `confused`
* `frustrated`
* `low_confidence`

This logic is:

* Rule-based
* Deterministic
* Fully testable

No AI is used here.

---

### 3️⃣ Vibes (UI Archetypes)

A **Vibe** is a strict UI contract, not a feeling.

Examples:

* `calm_guided`
* `urgent_dense`
* `error_recovery`
* `confidence_boost`

Each vibe defines:

* Spacing density
* Copy tone
* Visual emphasis rules
* Max number of primary actions
* Forbidden UI patterns

> Gemini can **select content style**,
> but can **never modify a vibe**.

---

### 4️⃣ Semantic Manifests (Intent Layer)

Pages are described by **what they must achieve**, not how they look.

Example (Checkout):

```json
{
  "goal": "complete_payment",
  "requiredElements": [
    "price_summary",
    "primary_action",
    "trust_signal",
    "error_surface"
  ],
  "constraints": {
    "singlePrimaryAction": true,
    "noDistractions": true
  }
}
```

This decouples **meaning from presentation**.

---

### 5️⃣ Constrained AI Generation

Gemini 3 receives:

* Semantic manifest
* Vibe contract
* Device context

Gemini outputs:

* A **JSON UI schema**
* Using only approved primitives
* Zero JSX, zero CSS, zero imports

---

### 6️⃣ Safe Rendering (Frontend)

UI rendering is done via:

* Whitelisted React primitives
* Strict JSON → React mapping
* No `eval`
* No `dangerouslySetInnerHTML`

This makes UI injection or hallucination impossible.

---

### 7️⃣ Caching & Streaming

Before invoking Gemini:

```
Cache Key = Page + Vibe + Device + UI Version
```

* Cache hit → instant render
* Cache miss → streamed generation
* Streaming improves perceived speed
* Costs are controlled

---

## 🛠️ Full Tech Stack

### 🟢 Frontend

* Next.js (App Router)
* React 18
* TypeScript
* Tailwind CSS
* Custom behavior-tracking hooks

### 🟠 Backend

* Node.js
* TypeScript
* Express / Fastify
* Rule-based inference engine
* In-memory cache (Redis optional)

### 🧠 AI Layer

* **Gemini 3** (central reasoning engine)
* Strict system prompts
* JSON-only output enforcement

### 🧪 Testing

* Vitest / Jest
* Unit tests for vibe logic
* Snapshot tests for determinism

---

## 📁 Folder Structure (Monorepo)

vibe-ui/
├── frontend/                          # 🔵 Client-side (UI + behavior)
│   ├── public/
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── app/                       # Next.js App Router
│   │   │   ├── layout.tsx             # Global layout
│   │   │   ├── page.tsx               # Entry / demo page
│   │   │   └── globals.css            # Tailwind base ONLY
│   │   │
│   │   ├── components/
│   │   │   ├── DynamicRenderer.tsx    # JSON → React (SAFE renderer)
│   │   │   ├── DebugPanel.tsx          # (Optional) signals/vibe viewer
│   │   │   └── primitives/             # WHITELISTED UI blocks
│   │   │       ├── Container.tsx
│   │   │       ├── Text.tsx
│   │   │       ├── Button.tsx
│   │   │       └── Input.tsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useBehaviorTracking.ts # Clicks, hesitation, retries
│   │   │
│   │   ├── services/
│   │   │   └── backendClient.ts       # Calls backend APIs only
│   │   │
│   │   ├── types/
│   │   │   ├── uiSchema.ts             # UI JSON schema types
│   │   │   └── signals.ts              # Behavior signal types
│   │   │
│   │   └── utils/
│   │       ├── device.ts               # Device detection
│   │       └── signalMath.ts           # Hesitation / volatility calc
│   │
│   ├── tailwind.config.ts
│   ├── next.config.js
│   ├── tsconfig.json
│   ├── package.json
│   └── README.md                       # Frontend-specific docs
│
├── backend/                           # 🟠 Brain + intelligence layer
│   ├── src/
│   │   ├── api/
│   │   │   ├── analyze.ts              # Signals → user state
│   │   │   └── generate.ts             # Vibe + manifest → UI schema
│   │   │
│   │   ├── lib/
│   │   │   ├── manifests.ts            # Semantic page intent
│   │   │   ├── vibes.ts                # Allowed vibe IDs
│   │   │   ├── vibeContracts.ts        # HARD UI rules
│   │   │   ├── vibeSelector.ts         # State → vibe mapping
│   │   │   └── constants.ts
│   │   │
│   │   ├── services/
│   │   │   └── gemini.ts               # Gemini 3 integration (BRAIN)
│   │   │
│   │   ├── cache/
│   │   │   └── memoryCache.ts          # page+vibe+device cache
│   │   │
│   │   ├── types/
│   │   │   ├── vibe.ts
│   │   │   ├── uiSchema.ts
│   │   │   └── signals.ts
│   │   │
│   │   ├── tests/
│   │   │   ├── vibeSelector.test.ts
│   │   │   ├── manifest.test.ts
│   │   │   └── generator.test.ts
│   │   │
│   │   └── server.ts                   # Express / Fastify entry
│   │
│   ├── tsconfig.json
│   ├── package.json
│   ├── .env                            # Gemini API key (backend only)
│   └── README.md                       # Backend-specific docs
│
├── AGENTS.md                          # AI agent execution rules
├── README.md                          # System-level overview
├── .gitignore
└── package.json (optional monorepo)

---

## 🔒 Non-Negotiable Constraints

* ❌ No free-form AI UI generation
* ❌ No JSX or CSS from AI
* ❌ No dynamic component imports
* ❌ No frontend AI calls
* ✅ Gemini operates only inside contracts
* ✅ UI output must be deterministic

---

## 🧪 Verification Strategy

### Automated

* Vibe selection unit tests
* Manifest validation
* Snapshot determinism tests

### Manual

* Simulate rage clicks
* Simulate hesitation
* Observe vibe adaptation
* Verify vibe lock during checkout

---

## 🎯 Final Vision

**Vibe-UI is not “AI builds UI.”**

It is a **rule-governed adaptive interface engine** where:

* Humans define structure
* Gemini 3 provides intelligence
* The system remains safe, fast, and explainable

This project explores **how AI can be trusted in real user-facing systems**.

---

## 📌 Final Line (Use This in Demos)

> “Gemini 3 is the brain of Vibe-UI — but the architecture keeps it disciplined.”

---

If you want next, I can:

* Update `frontend/README.md` & `backend/README.md`
* Convert this into a **Gemini system prompt**
* Generate **Day-1 boilerplate code**
* Prepare a **judge explanation script**

Just tell me what to do next 🚀
