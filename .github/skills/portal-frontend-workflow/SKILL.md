---
name: portal-frontend-workflow
description: Workspace-scoped skill that encodes a repeatable, high-quality frontend design & implementation workflow tailored for the Portal-do-Associado project. Use this to guide UI/UX design decisions, component scaffolding, review checklists, and PR-ready deliverables.
license: MIT
---

## When to use
- You are asked to design or implement a page, component, or small frontend feature for the Portal-do-Associado project.
- You want a reproducible, high-quality sequence from requirement → visual direction → implementation → verification.

## Scope
- Workspace-scoped (placed under `.github/skills` for the repo). Applies to HTML, CSS/SCSS, JS/TSX components and design assets in `components/`, `public/`, and `modules/`.

applyTo:
- **/*.{html,htm,js,jsx,ts,tsx,css,scss}
- components/**
- public/**
- modules/**

trigger_phrases:
- "frontend design"
- "create component"
- "design component"
- "portal frontend workflow"

## Outcome
Given a request (feature description, screenshot, or mock), follow the steps below to produce:
- a concise design direction and accessible visual spec,
- a working, tested component or page (HTML/TSX + CSS/SCSS),
- unit or visual tests where applicable, and
- a PR with checklist and reviewer guidance.

## Step-by-step workflow
1. Clarify & capture requirements
   - Inputs: purpose, primary user, success criteria, accessibility constraints, responsive breakpoints, acceptance tests.
   - Decide scope: prototype (static HTML) vs production (component, state, tests).

2. Choose a clear aesthetic direction
   - Pick one of: refined-minimal, editorial, soft/pastel, luxury/refined, or utilitarian.
   - Document font choices, primary/secondary colors, and one accent treatment.

3. Quick wire/prototype (static)
   - Create a minimal static HTML prototype or Storybook story showing layout, spacing, and interactions.
   - Use CSS variables for tokens.

4. Implement component
   - Create atomic component in `components/` (TSX or JS) with semantic HTML.
   - Add CSS/SCSS, CSS variables, and small, performant animations (CSS-only when possible).
   - Keep aria attributes and keyboard interactions covered.

5. Local verification
   - Manual: keyboard nav, color-contrast, mobile viewport checks.
   - Automated: add visual snapshot or unit tests if repo supports them.

6. Prepare PR
   - Add description with goal, screenshots/gifs, accessibility notes, and testing instructions.
   - Include a short checklist for reviewers.

7. Iterate with feedback
   - Resolve accessibility or layout issues, add tests, and update documentation.

## Decision points & branching logic
- If feature is purely presentational: produce static HTML + CSS prototype and mark `production: false` in PR.
- If feature requires state or data: scaffold a component with a small story/sample dataset and mark `production: true`.
- If visual complexity is high (animations, layered textures): include lightweight fallbacks for low-powered devices and a snapshot test.

## Quality criteria (must-haves)
- Semantic, accessible HTML (landmark elements, roles, aria where needed).
- Color contrast >= 4.5:1 for body text; 3:1 for large text or UI elements where appropriate.
- Responsive at these breakpoints: 320px, 768px, 1024px.
- No layout shift on initial load (avoid fonts causing FOIT/FOUT; use font-display: swap).
- Performance-minded CSS: prefer transform/opacity for animations, avoid heavy repaints.
- Documentation: component README or Storybook entry with usage, props, and visuals.

## Reviewer checklist (to include in PR template)
- [ ] Does the component meet the acceptance criteria?
- [ ] Are accessibility concerns addressed and documented?
- [ ] Do screenshots or visual tests reflect expected UI on mobile/desktop?
- [ ] Are responsive breakpoints handled correctly?
- [ ] Are changes limited to relevant files and well-scoped?

## Example prompts to trigger this skill
- "Design a refined-minimal header component for membership dashboard — include unread badge, avatar, and quick links."
- "Create a responsive benefits card component with image, title, meta, and CTA."

## Examples & templates
- Use CSS tokens (variables) in `:root` and override in page/theme contexts.
- Provide a `README.md` in the component folder with examples and accessibility notes.

## Notes
- Make conservative decisions when requirements are missing: prefer a production-ready component scaffold with sensible defaults rather than a throwaway prototype.
- If any critical constraints are unknown, document assumptions in the PR.

version: 0.1
last_updated: 2026-04-13
