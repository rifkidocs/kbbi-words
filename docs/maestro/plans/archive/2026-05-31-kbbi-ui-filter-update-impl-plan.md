---
title: "KBBI UI Expansion & Advanced Filters Implementation Plan"
design_ref: "docs/maestro/plans/2026-05-31-kbbi-ui-filter-update-design.md"
created: "2026-05-31T12:35:00Z"
status: "approved"
total_phases: 2
estimated_files: 2
task_complexity: "medium"
---

# KBBI UI Expansion & Advanced Filters Implementation Plan

## Plan Overview
- **Total phases**: 2
- **Agents involved**: `coder`
- **Estimated effort**: Layout and logic updates to 2 React components.

## Dependency Graph
```
Phase 1: Logic & Layout (app/page.tsx)
    |
Phase 2: Result Rendering (ResultList.tsx)
```

## Execution Strategy
| Stage | Phases | Execution | Agent Count | Notes |
|-------|--------|-----------|-------------|-------|
| 1     | Phase 1 | Sequential | 1 | Logic & Container |
| 2     | Phase 2 | Sequential | 1 | Grid Display |

---

## Phase 1: Logic & Container Update
### Objective
Update the search logic to include more difficult suffixes, increase result count, and widen the main container.

### Agent: coder
### Parallel: No

### Files to Modify
- `app/page.tsx`
  - Update `handleSearch` to prioritize `x, y, z, q, f, v, w`.
  - Increase slice limit to 40.
  - Change `main` class `max-w-2xl` to `max-w-5xl`.

### Implementation Details
- Add `q, f, v, w` to the prioritized filter regex/check.
- Ensure the shuffling logic remains intact.

### Validation
- Run `npm run build` or `npm run dev` to verify compilation.
- Search for common prefixes and verify more than 15 results appear if available.

---

## Phase 2: Result Grid Update
### Objective
Make the result list use a wider grid layout to accommodate more items.

### Agent: coder
### Parallel: No

### Files to Modify
- `components/ResultList.tsx`
  - Update grid columns: `sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`.

### Implementation Details
- Ensure the padding and gap look good in the wider container.

### Validation
- Verify that on desktop, results show in 4 columns.
- Verify that on mobile, it scales down gracefully.

---

## File Inventory
| # | File | Phase | Purpose |
|---|------|-------|---------|
| 1 | `app/page.tsx` | 1 | Search logic and main layout |
| 2 | `components/ResultList.tsx` | 2 | Displaying results in a grid |

## Risk Classification
| Phase | Risk | Rationale |
|-------|------|-----------|
| 1 | LOW | Simple logic change, very low regression risk. |
| 2 | LOW | Purely visual change. |

## Execution Profile
```
Execution Profile:
- Total phases: 2
- Parallelizable phases: 0
- Sequential-only phases: 2
- Estimated parallel wall time: N/A
- Estimated sequential wall time: 10 mins

Note: Native subagents currently run without user approval gates.
All tool calls are auto-approved without user confirmation.
```
