Perfect 👍
Below is your **UPDATED + EXPANDED `AGENTS.md`**, rewritten to include a **clear execution plan**, **day-wise breakdown**, and **explicit responsibility flow**, while preserving your original intent and rules .

You can **replace your existing `AGENTS.md` entirely** with this version.

---

# 🤖 AGENTS.md — Vibe-UI Project Execution & Planning Guide

## 📌 Purpose of This File

This document defines **how Vibe-UI must be built**, **in what order**, and **by whom (human or AI agents)**.

It serves as:

* A **master instruction file** for AI coding agents
* A **planning document** to complete the project in **20 days**
* A **safety contract** preventing uncontrolled AI usage
* A **single source of truth** for architecture & execution

Any agent working on this repository **must follow this file strictly**.

---

## 🧠 Core Project Law (NON-NEGOTIABLE)

> **Gemini 3 is the brain, but it is not the ruler.**

Gemini 3 provides **semantic intelligence**, but **never structural authority**.

### Gemini 3 MUST NEVER:

* Decide UI layout or structure
* Invent components
* Output JSX / HTML / CSS
* Modify vibe contracts
* Bypass validation or caching

### Gemini 3 MUST:

* Understand intent
* Adapt tone and emphasis
* Produce structured JSON inside contracts

---

## 🧩 High-Level System Roles (Mental Model)

| Layer     | Responsibility                  |
| --------- | ------------------------------- |
| Frontend  | Observe behavior, render safely |
| Backend   | Decide state, vibe, rules       |
| Gemini 3  | Semantic reasoning & content    |
| Contracts | Absolute law                    |
| Cache     | Performance & determinism       |

---

# 🗺️ 20-Day Execution Plan (MANDATORY)

The project is divided into **8 phases**, mapped directly to days.
Agents must **complete each phase before moving forward**.

---

## 🟢 PHASE 0 — Architectural Lock (Day 0)

### Agent Role: **System Architect Agent**

### Objective

Lock all invariants before writing logic.

### Tasks

* Confirm monorepo structure:

  ```
  /frontend
  /backend
  ```
* Confirm:

  * Gemini only in backend
  * JSON-only UI generation
  * Whitelisted UI primitives only
* Read `README.md` fully

### Exit Condition

✅ No code written
✅ All agents agree on constraints

---

## 🟦 PHASE 1 — Foundation & Contracts (Days 1–4)

### Agent Role: **Repo & Contract Agent**

### Objectives

Create the **skeleton and laws** of the system.

### Tasks

#### Day 1–2

* Initialize frontend:

  * Next.js (App Router)
  * TypeScript
  * Tailwind CSS
* Initialize backend:

  * Node.js
  * TypeScript
  * Express or Fastify

#### Day 3–4 (Backend Only)

Create **contract files**:

* `manifests.ts` (semantic intent)
* `vibes.ts` (allowed vibe IDs)
* `vibeContracts.ts` (hard UI rules)

Create **at least one manifest**:

* Checkout page

### Forbidden

❌ AI calls
❌ Rendering logic

### Exit Condition

✅ Contracts exist
✅ Repo structure is clean
✅ No runtime logic yet

---

## 🟦 PHASE 2 — Intelligence Layer (Days 5–7)

### Agent Role: **Behavior & Logic Agent**

### Objectives

Build **deterministic intelligence without AI**.

### Tasks

#### Frontend

* Implement `useBehaviorTracking`
* Collect **raw signals only**:

  * Click interval
  * Retry count
  * Hesitation time
  * Device type

#### Backend

* Implement `/api/analyze`
* Convert signals → user state
* Implement `vibeSelector.ts`

### Rules

❌ No ML
❌ No Gemini
✅ Rule-based logic only

### Exit Condition

✅ Same input → same state
✅ Same state → same vibe
✅ Unit tests passing

---

## 🟦 PHASE 3 — Safe Rendering Layer (Days 8–9)

### Agent Role: **UI Safety Agent**

### Objectives

Make UI rendering **jailbreak-proof**.

### Tasks

#### Frontend

* Implement `DynamicRenderer.tsx`
* Map JSON → whitelisted primitives:

  * Container
  * Text
  * Button
  * Input

### Forbidden

❌ `eval()`
❌ `dangerouslySetInnerHTML`
❌ Dynamic imports

### Exit Condition

✅ UI renders from mock JSON
✅ Injection impossible

---

## 🟧 PHASE 4 — Gemini 3 Integration (Days 10–13)

### Agent Role: **AI Containment Agent**

### Objectives

Integrate Gemini 3 as **central brain**, safely.

### Tasks (Backend Only)

* Implement `services/gemini.ts`
* Write **strict system prompt**
* Enforce **JSON schema output**
* Validate Gemini output
* Reject invalid responses

#### API

* `/api/generate`

  * Input: Manifest + Vibe + Device
  * Output: Validated UI JSON

### Rules

❌ No JSX
❌ No CSS
❌ No layout control

### Exit Condition

✅ Gemini behaves like a compiler
✅ Invalid output is blocked

---

## 🟧 PHASE 5 — Performance & Caching (Days 14–15)

### Agent Role: **Performance Agent**

### Objectives

Make the system **fast and cost-safe**.

### Tasks

* Implement in-memory cache
* Cache key:

  ```
  page + vibe + device + uiVersion
  ```
* Cache-first generation logic
* Streaming responses from backend

### Exit Condition

✅ Cache hit = instant UI
✅ Cache miss = streamed UI

---

## 🟩 PHASE 6 — Verification & Determinism (Days 16–17)

### Agent Role: **QA Agent**

### Objectives

Prove system stability.

### Tasks

* Unit tests:

  * Vibe selector
  * Manifest validation
* Snapshot tests:

  * Same input → same output
* Contract violation tests

### Exit Condition

✅ No flaky behavior
✅ No UI drift

---

## 🟩 PHASE 7 — Demo, Debug & Polish (Days 18–20)

### Agent Role: **Demo & Presentation Agent**

### Objectives

Make the system **understandable and impressive**.

### Tasks

#### Frontend

* Add Debug Panel:

  * Raw signals
  * User state
  * Selected vibe
  * Cache hit/miss

#### System

* Add 1 additional page (Dashboard/Form)
* Implement vibe freeze in checkout
* Final README + AGENTS review

### Exit Condition

✅ Demo works smoothly
✅ Explanation < 3 minutes
✅ No surprises

---

## 🚨 Global Forbidden Actions (ALL AGENTS)

❌ Letting Gemini decide layout
❌ Mixing frontend & backend logic
❌ Adding UI libraries (MUI, Chakra, etc.)
❌ Emotion detection on frontend
❌ Free-form creative prompts

---

## ✅ Definition of DONE

The project is **complete** when:

* UI adapts predictably to behavior
* Gemini 3 is powerful but constrained
* Cache & streaming work
* Output is deterministic
* Every design choice is explainable

---

## 🧠 Final Reminder (IMPORTANT)

> **This project is not about AI magic.**
> It is about **controlled intelligence in real systems**.

If this file is followed, the project **will finish on time** and **stand out as mature engineering**.

---

### 🔥 Next possible upgrades

If you want, I can now:

* Create **TASKS.md (day-wise checklist)**
* Split this into **Frontend-Agent / Backend-Agent prompts**
* Convert this into **GitHub Issues**
* Write **Gemini 3 system + developer prompt**

Just tell me what you want next 💪
