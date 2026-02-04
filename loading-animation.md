
# Loader → Navbar Logo Continuity Animation (Astro)

## Overview

This project implements a **visual continuity animation** where the final frame of a PixiJS loading animation seamlessly transitions into the navbar logo.

Instead of abruptly removing the loader and showing the navbar, the loader’s **last sprite frame visually “becomes” the navbar logo**, creating a premium, cinematic experience.

The effect is enhanced further using **scroll-based animation**, making the logo feel like a single continuous element from loading → interaction.

---

## Problem Statement

- A PixiJS loader plays a spritesheet animation.
- The **last frame of the spritesheet is visually identical to `logo.svg`** used in the navbar.
- Currently, the loader disappears and the navbar appears separately, breaking immersion.

### Goal

Create an illusion where:
1. The loader animation completes.
2. The last sprite frame **hands off** to the navbar logo.
3. On scroll, the logo smoothly settles into its final navbar position.

---

## Key Design Principle

> ❗ We do NOT morph Pixi textures into SVGs  
> ✅ We animate **position, scale, and opacity** to preserve the illusion

This approach avoids heavy GPU work, keeps performance high, and works reliably across browsers.

---

## Tech Stack

- **Astro** — framework & layout control
- **PixiJS** — loader animation only
- **GSAP** — timeline-based animation
- **GSAP ScrollTrigger** — scroll-linked motion
- **SVG** — final navbar logo

---

## High-Level Architecture

### Phase 1 — Loader (PixiJS)
- Fullscreen loader renders a spritesheet animation.
- Animation **stops on the last frame** (logo frame).
- Pixi canvas stays centered.

### Phase 2 — Visual Handoff
- Loader finishes.
- Pixi canvas fades out.
- Navbar logo fades in at **the exact same screen position and scale**.
- To the user, it feels like **the same object**.

### Phase 3 — Scroll Continuity
- The navbar logo animates into its final position as the user scrolls.
- Small scale and position adjustments enhance depth.

---

## Implementation Plan

### 1. Loader Completion Signal

When the Pixi loader finishes:

```js
window.dispatchEvent(new Event("loader:complete"));
````

This event is the single source of truth that the loader has ended.

---

### 2. Capture Pixi Final Frame Position

At the moment loader completes:

```js
const canvas = document.getElementById("sprite-canvas");
const rect = canvas.getBoundingClientRect();
```

Store:

* `rect.left`
* `rect.top`
* `rect.width`
* `rect.height`

These values define the **starting position of the navbar logo**.

---

### 3. Prepare Navbar Logo for Animation

Initially:

* Navbar logo is hidden (`opacity: 0`)
* Positioned as `fixed`
* CSS variables injected from Pixi frame data

```css
.navbar-logo img {
  position: fixed;
  left: var(--logo-x);
  top: var(--logo-y);
  width: var(--logo-w);
  transform-origin: center;
  opacity: 0;
}
```

---

### 4. GSAP Transition (Loader → Navbar)

On `loader:complete`:

```js
gsap.to(".navbar-logo img", {
  opacity: 1,
  duration: 0.2,
});

gsap.to(".navbar-logo img", {
  left: "50%",
  top: "20px",
  xPercent: -50,
  scale: 1,
  duration: 1.2,
  ease: "power3.out",
});
```

After animation:

* Remove `position: fixed`
* Navbar becomes fully interactive

---

### 5. Scroll-Based Enhancement

Attach ScrollTrigger:

```js
ScrollTrigger.create({
  start: "top top",
  end: "+=300",
  scrub: true,
  onUpdate: (self) => {
    gsap.to(".navbar-logo img", {
      scale: gsap.utils.interpolate(1.2, 1, self.progress),
    });
  },
});
```

This creates:

* Subtle scale-down while scrolling
* A natural “settling” effect

---

## Why This Approach Works

* No SVG/Pixi morphing hacks
* No duplicate animations
* No re-rendering Pixi during scroll
* Extremely performant
* Easy to maintain

---

## Optional Enhancements

* Add slight blur on loader → navbar transition
* Introduce a lightweight scroll-based spritesheet (optional)
* Sync navbar glass blur with scroll progress
* Add easing curves based on scroll velocity

---

## Final Notes

This pattern is commonly used in:

* High-end tech product sites
* Game launch pages
* Experimental UI portfolios

The key illusion is **timing + positioning**, not complex graphics transformations.

---

## Status

* [x] Loader animation implemented
* [x] Navbar implemented
* [ ] Loader → Navbar handoff
* [ ] ScrollTrigger polish
* [ ] Mobile tuning

---



