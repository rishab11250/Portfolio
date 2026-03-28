import React from 'react';
import { motion } from 'framer-motion';

const AnimatedNavLink = ({ href, isActive, onClick, children }) => {
  return (
    <li style={{ position: 'relative' }}>
      <a 
        href={href} 
        className={isActive ? 'active' : ''}
        onClick={onClick}
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
        />
      )}
    </li>
  );
};

export default AnimatedNavLink;
