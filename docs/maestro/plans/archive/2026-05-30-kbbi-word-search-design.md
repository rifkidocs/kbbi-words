---
title: "KBBI Word Search"
created: "2026-05-30T15:52:00Z"
status: "approved"
authors: ["TechLead", "User"]
type: "design"
design_depth: "standard"
task_complexity: "medium"
---

# KBBI Word Search Design Document

## Problem Statement

The goal is to create a web-based Indonesian word search tool using Next.js. Users need a way to quickly find words from the Kamus Besar Bahasa Indonesia (KBBI) based on two specific criteria:
1.  **Single Letter Search**: Find up to 10 words starting with a specific single character (A-Z).
2.  **Prefix Search**: Find up to 10 words starting with a specific string prefix (e.g., "as").

The application must be fast, responsive, and provide immediate results upon pressing "Enter". To ensure performance and reliability, the KBBI dataset will be bundled locally as a JSON file, avoiding external API latency or failures.

## Requirements

### Functional Requirements

1.  **REQ-1**: Provide an input field for a single character. Upon "Enter", display up to 10 words from the KBBI dataset that start with that letter.
2.  **REQ-2**: Provide an input field for a string prefix. Upon "Enter", display up to 10 words from the KBBI dataset that start with that prefix.
3.  **REQ-3**: Results must be shown in a clear list format. If no words are found, display a "No results found" message.
4.  **REQ-4**: All searches must be case-insensitive.

### Non-Functional Requirements

1.  **Performance**: Search results should appear nearly instantaneously (< 200ms) since the data is local.
2.  **Responsiveness**: The UI must work well on both mobile and desktop screens.
3.  **Reliability**: The application should not crash if the input is empty or invalid.

### Constraints

-   **Data Strategy**: Use a local JSON dataset (stored in the project) to ensure speed and offline capability.
-   **Tech Stack**: Next.js 15+ with React 19 and Tailwind CSS 4.

## Approach

### Selected Approach

**Local JSON with Static Optimization**

We will bundle the KBBI dataset as a local JSON file in the `public` or `data` directory. Since the dataset is large (~25MB), we will use an efficient filtering strategy.

1.  **Data Ingestion**: Download the KBBI dataset and store it as `public/kbbi.json`.
2.  **Search Logic**: The app will load the JSON once. Filters will use `.filter()` with `.startsWith()` for both single-letter and prefix searches.
3.  **UI Component**: A single-page dashboard with two distinct input sections. Each section will have its own state for input and results.
4.  **UX Enhancement**: Use "Modern Clean" aesthetics with Tailwind CSS, providing visual feedback during search and clear typography for results.

### Decision Matrix

| Criterion | Weight | Local JSON | Remote Fetch |
|-----------|--------|------------|--------------|
| **Latency** | 40% | 5: Near-zero after load. | 2: Network dependent. |
| **Availability** | 30% | 5: Works without internet. | 1: Fails if API is down. |
| **Bundle Size** | 30% | 2: Adds ~25MB to assets. | 5: Zero bundle impact. |
| **Weighted Total** | | **4.1** | **2.6** |

## Architecture

### Component Diagram

```
[ User Browser ]
       |
       v
[ Page Component (page.tsx) ]
       |
       +--- [ SearchByLetter (Component) ]
       |           |
       |           +--- [ Input ] --- triggers filter
       |           +--- [ ResultList ]
       |
       +--- [ SearchByPrefix (Component) ]
                   |
                   +--- [ Input ] --- triggers filter
                   +--- [ ResultList ]
       |
       v
[ KBBI Data (kbbi.json) ] 
Loaded into memory on mount
```

### Data Flow

1.  **Initial Load**: The browser fetches `kbbi.json` when the user visits the site. The data is cached in memory.
2.  **User Input**: User types in either the "Letter" or "Prefix" input field.
3.  **Search Trigger**: User presses "Enter".
4.  **Filtering**: `data.filter(word => word.startsWith(input)).slice(0, 10)`
5.  **Update UI**: The `ResultList` component re-renders with the 10 filtered results.

### Key Interfaces

```typescript
interface KBBIEntry {
  kata: string;
  definisi?: string[];
}

type KBBIData = string[];
```

## Agent Team

| Phase | Agent(s) | Parallel | Deliverables |
|-------|----------|----------|--------------|
| 1     | coder    | No       | Download and process kbbi.json into an optimized format. |
| 2     | coder    | No       | Implement the UI components (Input, ResultList) and page layout. |
| 3     | tester   | No       | Verify search logic for both inputs and ensure 10-word limit. |

## Risk Assessment

| Risk | Severity | Likelihood | Mitigation |
|------|----------|------------|------------|
| **Data Size** | MEDIUM | HIGH | The JSON is ~25MB. We will serve it statically and ensure the UI shows a loading state during the initial fetch. |
| **Parsing Latency** | LOW | MEDIUM | Parsing 100k+ strings is fast in JS, but we will test on mobile to ensure no UI freeze. |
| **Data Format** | LOW | LOW | Preprocess the JSON to a simple array of strings for maximum performance. |

## Success Criteria

1.  User can enter a single letter and get 10 words starting with that letter.
2.  User can enter a prefix (e.g., "ba") and get 10 words starting with that prefix.
3.  Search results appear immediately upon pressing "Enter".
4.  The application works correctly on desktop and mobile browsers.
5.  The visual style is modern, clean, and professional.
