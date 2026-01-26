# Task: Comprehensive Optimization Phase

- [x] Research current SEO/A11y/Performance status <!-- id: 0 -->
- [x] implementation_plan.md for optimizations <!-- id: 1 -->
- [x] Performance: Lazy loading & Font optimization <!-- id: 2 -->
- [x] SEO: JSON-LD Person Schema & Meta tags <!-- id: 3 -->
- [x] A11y: ARIA roles, keyboard nav & color contrast <!-- id: 4 -->
- [x] Testing: Verify metadata and ARIA via Vitest <!-- id: 5 -->
- [x] Final CI/CD push & update `0_check_point.md` <!-- id: 6 -->
- [x] Theme Button Fix (Mobile Positioning) <!-- id: 7 -->
  - [x] Implement `position: sticky` (failed, reverted) <!-- id: 8 -->
  - [x] Implement `position: fixed` (v2 robust - potentially cached) <!-- id: 10 -->
  - [x] Implement v3 (Cache-Bust & Stacking Context) <!-- id: 11 -->
  - [x] Verify fixed scroll behavior <!-- id: 9 -->

- [x] CI/CD Optimization (L)
  - [x] Analyze current workflow and design improvements
  - [x] Update `deploy.yml` with linting, cache, and PR triggers
  - [x] Verify workflow logic (Ready for GitHub Actions)

- [x] Theme Button Fix (V31 Recovery & Final Deployment)
  - [x] update deploy.yml to root (./)
  - [x] bump versions to V31
  - [x] notify user for manual cleanup
  - [x] verify final deployment at root
