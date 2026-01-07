This file is:

- **Day-wise**
- **Checkbox-driven**
- **AI-agent friendly**
- **Aligned with your AGENTS.md + 20-day plan**
- Focused on **finishing**, not just planning

---

# ✅ TASKS.md — Vibe-UI 20-Day Execution Checklist

> **Rule:**
> Do NOT jump ahead.
> Each day must be completed before moving to the next.

---

## 🟢 DAY 0 — Architecture Lock (Read Only)

- [x] Read `README.md` fully
- [x] Read `AGENTS.md` fully
- [x] Confirm understanding:

  - Gemini 3 = brain, not controller
  - JSON-only UI generation
  - Frontend ≠ intelligence

- [x] Confirm folder split:

  ```
  /frontend
  /backend
  ```

✅ **Exit condition:** No code written, rules understood.

---

## 🟦 DAY 1 — Repo & Environment Setup

### Root

- [x] Create `vibe-ui/` repo
- [x] Initialize git
- [x] Add `.gitignore`
- [x] Create `AGENTS.md`, `TASKS.md`, `README.md`

### Frontend

- [x] Create `frontend/`
- [x] Initialize Next.js (App Router)
- [x] Enable TypeScript
- [x] Install Tailwind CSS

### Backend

- [x] Create `backend/`
- [x] Initialize Node.js + TypeScript
- [x] Install Express or Fastify

✅ **Exit condition:**
Repo builds, no features yet.

---

## 🟦 SETUP — Environment Installation

- [x] Install frontend dependencies (`npm install`)
- [x] Install backend dependencies (`npm install`)

---

## 🟦 DAY 2 — Define Semantic Manifests (Backend)

- [x] Create `backend/src/lib/manifests.ts`
- [x] Define **Checkout** manifest:

  - goal
  - requiredElements
  - constraints

- [x] Ensure:

  - No UI words
  - No components
  - Pure intent

🚫 No AI
🚫 No rendering

✅ **Exit condition:**
Manifest reads like a product requirement.

---

## 🟦 DAY 3 — Define Vibes & Contracts (Backend)

- [x] Create `backend/src/lib/vibes.ts`
- [x] Create `backend/src/lib/vibeContracts.ts`
- [x] Define at least 3 vibes:

  - calm_guided
  - urgent_dense
  - error_recovery

- [x] Each vibe must include:

  - spacing rules
  - tone
  - max primary actions
  - forbidden patterns

✅ **Exit condition:**
Vibes feel like **laws**, not suggestions.

---

## 🟦 DAY 4 — Vibe Selection Logic

- [x] Create `backend/src/lib/vibeSelector.ts`
- [x] Map:

  ```
  userState + page → vibe
  ```

- [x] Add unit tests:

  - rushed → urgent_dense
  - confused → calm_guided

🚫 No Gemini
🚫 No ML

✅ **Exit condition:**
Same input always returns same vibe.

---

## 🟦 DAY 5 — Backend API Skeleton

- [x] Create `backend/src/api/analyze.ts`
- [x] Create `backend/src/api/generate.ts`
- [x] `/analyze` returns mock state
- [x] `/generate` returns mock UI JSON

🚫 No AI
🚫 No frontend integration yet

✅ **Exit condition:**
APIs respond correctly with dummy data.

---

## 🟦 DAY 6 — Frontend Safe Renderer

- [x] Create `DynamicRenderer.tsx`
- [x] Create primitives:

  - Container
  - Text
  - Button
  - Input

- [x] Map JSON → primitives only

🚫 `eval`
🚫 `dangerouslySetInnerHTML`

✅ **Exit condition:**
Mock JSON renders safely.

---

## 🟦 DAY 7 — Behavior Tracking (Frontend)

- [ ] Create `useBehaviorTracking.ts`
- [ ] Track:

  - click intervals
  - retry count
  - hesitation time
  - device type

- [ ] POST signals to `/api/analyze`

🚫 No emotion detection

✅ **Milestone 1:**
**End-to-end flow without AI works**

---

## 🟧 DAY 8 — Gemini 3 Integration (Isolated)

- [ ] Create `backend/src/services/gemini.ts`
- [ ] Add Gemini API key to `.env`
- [ ] Write **strict system prompt**
- [ ] Test Gemini with static input

🚫 No frontend connection

✅ **Exit condition:**
Gemini returns structured JSON only.

---

## 🟧 DAY 9 — Gemini Output Validation

- [ ] Define UI JSON schema
- [ ] Validate Gemini output
- [ ] Reject invalid responses
- [ ] Add logging for failures

✅ **Exit condition:**
Invalid AI output never reaches frontend.

---

## 🟧 DAY 10 — Connect Gemini to `/generate`

- [ ] `/generate` flow:

  - manifest
  - vibe contract
  - device
  - Gemini

- [ ] Return validated JSON

🚫 No JSX
🚫 No CSS

✅ **Exit condition:**
AI-generated UI renders correctly.

---

## 🟧 DAY 11 — Caching Layer

- [ ] Create `memoryCache.ts`
- [ ] Cache key:

  ```
  page + vibe + device + uiVersion
  ```

- [ ] Cache-first logic

✅ **Exit condition:**
Repeat request skips Gemini.

---

## 🟧 DAY 12 — Streaming Responses

- [ ] Stream Gemini output from backend
- [ ] Frontend renders skeleton first
- [ ] Progressive hydration

✅ **Exit condition:**
UI appears progressively, not blank.

---

## 🟧 DAY 13 — Vibe Freeze Logic

- [ ] Lock vibe during checkout
- [ ] Prevent mid-flow switching

✅ **Milestone 2:**
**Stable, AI-powered adaptive UI**

---

## 🟩 DAY 14 — Add Debug Panel

- [ ] Create `DebugPanel.tsx`
- [ ] Show:

  - raw signals
  - inferred state
  - selected vibe
  - cache hit/miss

✅ **Exit condition:**
System behavior is explainable live.

---

## 🟩 DAY 15 — Add Second Page

- [ ] Create new manifest (Dashboard/Form)
- [ ] Reuse existing vibes
- [ ] Confirm scalability

✅ **Exit condition:**
System works beyond single page.

---

## 🟩 DAY 16 — Testing & Determinism

- [ ] Unit tests:

  - vibe selector
  - manifests

- [ ] Snapshot tests
- [ ] Contract violation tests

✅ **Exit condition:**
Same input → same output.

---

## 🟩 DAY 17 — Performance Pass

- [ ] Measure latency
- [ ] Optimize prompts
- [ ] Verify cache speed

✅ **Exit condition:**
Cache feels instant.

---

## 🟩 DAY 18 — Demo Script Preparation

- [ ] Prepare demo steps:

  1. Calm user
  2. Rage clicks
  3. UI adapts
  4. Cache hit

- [ ] Practice explanation

---

## 🟩 DAY 19 — Docs & Cleanup

- [ ] Final README review
- [ ] Final AGENTS.md review
- [ ] Remove dead code
- [ ] Add comments where needed

---

## 🟩 DAY 20 — FINAL FREEZE 🚨

- [ ] ❌ No new features
- [ ] Fix bugs only
- [ ] Rehearse demo
- [ ] Prepare submission

✅ **FINAL STATE:**
A **controlled, adaptive UI engine** powered by **Gemini 3**.

---

## 🧠 FINAL REMINDER

> This project succeeds not because of AI power,
> but because of **discipline, constraints, and clarity**.
