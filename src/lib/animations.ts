import { type Variants } from "framer-motion";

// Smooth spring config for natural feel
export const smoothSpring = { type: "spring" as const, stiffness: 100, damping: 20, mass: 0.8 };
export const gentleSpring = { type: "spring" as const, stiffness: 60, damping: 18, mass: 1 };

// Stagger container — wrap children that each use a child variant
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

// Fade up — most common card / element entrance
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ...smoothSpring },
  },
};

// Fade down
export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ...smoothSpring },
  },
};

// Fade left
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { ...smoothSpring },
  },
};

// Fade right
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { ...smoothSpring },
  },
};

// Scale up — for feature cards & ecosystem buttons
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.85, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { ...smoothSpring },
  },
};

// Section heading — wider Y travel, slower
export const sectionHeading: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...gentleSpring, duration: 0.8 },
  },
};

// Hero text — dramatic entrance
export const heroText: Variants = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 50, damping: 18, mass: 1.2 },
  },
};

// Viewport settings for whileInView
export const viewportOnce = { once: true, margin: "-60px" as any };
export const viewportRepeat = { once: false, margin: "-80px" as any };
