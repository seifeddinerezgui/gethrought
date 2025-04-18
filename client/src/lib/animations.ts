export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const slideIn = {
  hidden: { width: 0, opacity: 0 },
  visible: {
    width: "100%",
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut"
    }
  }
};

export const pageTransition = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

// Animation variants for hover effects
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3 }
};

export const hoverLift = {
  y: -5,
  transition: { duration: 0.3 }
};

export const hoverShadow = {
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  transition: { duration: 0.3 }
};
