---
title: "KBBI UI Expansion & Advanced Filters"
created: "2026-05-31T12:30:00Z"
status: "approved"
authors: ["TechLead", "User"]
type: "design"
design_depth: "standard"
task_complexity: "medium"
---

# KBBI UI Expansion & Advanced Filters Design Document

## Problem Statement
The current KBBI search tool is too narrow, limiting the visibility of results. Additionally, for the "sambung kata" game, the current "difficult" filters (X, Y, Z) are insufficient. The user needs more challenging suffixes like 'Q', 'F', 'V', and 'W' to trap opponents, along with a more spacious UI to view a larger list of candidate words.

## Requirements

### Functional Requirements
1. **REQ-1**: Update search logic to prioritize words ending in X, Y, Z, Q, F, V, and W.
2. **REQ-2**: Increase the search result limit from 15 to 40 words.
3. **REQ-3**: Implement a grid layout for results that scales with the wider container (up to 4 columns).

### Non-Functional Requirements
1. **REQ-4**: Maintain fast performance when filtering the vocabulary.
2. **REQ-5**: Ensure the UI remains responsive for smaller screens.

### Constraints
- Use existing Tailwind CSS for styling.
- Keep the current shuffling logic to provide variety in results.

## Approach

### Selected Approach: Expanded Prioritization & Responsive Grid
- **Prioritization Logic**: Modify `handleSearch` in `app/page.tsx` to include `q, f, v, w` in the prioritized filter.
- **Result Limit**: Update result slice from 15 to 40.
- **Layout Expansion**: Update `main` container in `app/page.tsx` from `max-w-2xl` to `max-w-5xl`.
- **Grid Layout**: Update `ResultList.tsx` to use responsive grid columns (`sm:2`, `md:3`, `lg:4`).

## Architecture

### Component Diagram
```
[Header]
   |
[Main Container (max-w-5xl)]
   |-- [SearchBox (Full Width)]
   |-- [ResultList (Responsive Grid)]
```

### Data Flow
1. User enters prefix.
2. `handleSearch` filters `kbbiData`.
3. Words ending in `[x, y, z, q, f, v, w]` are extracted as `prioritized`.
4. Remaining matches are `others`.
5. Shuffled and combined (top 40) sent to `ResultList`.

## Agent Team
| Phase | Agent(s) | Parallel | Deliverables |
|-------|----------|----------|--------------|
| 1     | coder    | No       | Updated app/page.tsx, components/ResultList.tsx |

## Risk Assessment
- **Mobile overflow**: LOW risk. Mitigated by using standard Tailwind responsive grid classes.

## Success Criteria
1. Result cards are wider and display up to 40 items.
2. Results ending in X, Y, Z, Q, F, V, W appear at the top.
