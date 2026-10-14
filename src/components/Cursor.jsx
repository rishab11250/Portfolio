
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Cursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 28, stiffness: 500 };
    const ringX = useSpring(cursorX, springConfig);
    const ringY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const mouseMove = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", mouseMove, { passive: true });
        window.addEventListener("mouseover", handleMouseOver, { passive: true });

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            <motion.div
                className="cursor-dot"
                animate={{
                    scale: isHovering ? 0 : 1,
                    opacity: isHovering ? 0 : 1
                }}
                transition={{ duration: 0.15 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: '8px',
                    height: '8px',
                    backgroundColor: 'var(--primary-color)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 99999
                }}
            />
            <motion.div
                className="cursor-ring"
                animate={{
                    width: isHovering ? 48 : 32,
                    height: isHovering ? 48 : 32,
                    backgroundColor: isHovering ? "var(--primary-color)" : "transparent",
                    border: isHovering ? "none" : "2px solid var(--primary-color)",
                    opacity: isHovering ? 0.8 : 1,
                }}
                transition={{ duration: 0.15 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    mixBlendMode: "difference",
                    zIndex: 99998
                }}
            />
        </>
    );
};

export default Cursor;
