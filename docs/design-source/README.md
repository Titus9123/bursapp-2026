# Bursapp design source

This folder preserves the implementation-relevant source files extracted from the user-provided `Bursapp.zip`.

Integrated into the production React/Vite app:

- `tokens.css`: emerald premium fintech visual system, dark/light surfaces, Plus Jakarta Sans, focus/reduced-motion rules.
- `components.jsx`: card/button/chip/slider/progress/ad/coach/navigation component behavior translated into TypeScript/React app code.
- `screens.jsx`: splash, onboarding, home and learn flow translated into `src/pages/Index.tsx`.
- `sim-coach.jsx`: simulator, allocation donut, range chart and coach flow translated into `src/pages/Index.tsx`.
- `i18n-original.jsx`: original EN/AR dictionary kept for traceability; production extends it to EN/ES/HE/AR/AM/RU.

The live app does not load these files directly; they are kept as source evidence and design handoff material.
