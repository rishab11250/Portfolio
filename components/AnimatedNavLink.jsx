"use client";
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedNavLink = ({ href, isActive, onClick, children }) => {
  const handleClick = (e) => {
    if (onClick) onClick();
    if (href && href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (typeof window !== 'undefined') {
          window.history.pushState(null, '', href);
        }
      }
    }
  };

  return (
    <li style={{ position: 'relative' }}>
      <a 
        href={href} 
        className={isActive ? 'active' : ''}
        onClick={handleClick}
      >
        {children}
      </a>
      {isActive && (
        <motion.div
          className="active-underline"
          layoutId="active-underline"
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </li>
  );
};

export default AnimatedNavLink;
