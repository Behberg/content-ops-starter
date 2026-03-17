import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * Design Philosophy: Cyberpunk Minimalism
 * Animated particles that float and glow in the background
 * Creates a sense of digital depth and movement
 */

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function ParticleBackground() {
  // Generate particles with random properties - now with larger particles
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: i < 15 ? Math.random() * 8 + 4 : Math.random() * 3 + 1, // Larger particles for first 15
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.6 + 0.2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: `radial-gradient(circle, rgba(59, 130, 246, ${particle.opacity}), transparent)`,
            boxShadow: `0 0 ${particle.size * 3}px rgba(59, 130, 246, ${particle.opacity * 0.8})`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [particle.opacity * 0.5, particle.opacity, particle.opacity * 0.5],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Larger glowing orbs for accent - enhanced with more and bigger orbs */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            width: 150 + i * 80,
            height: 150 + i * 80,
            left: `${10 + i * 20}%`,
            top: `${5 + i * 15}%`,
            background: `radial-gradient(circle, rgba(99, 102, 241, ${0.12 - i * 0.02}), transparent)`,
            boxShadow: `0 0 ${120 + i * 60}px rgba(59, 130, 246, ${0.25 - i * 0.04})`,
            filter: "blur(50px)",
          }}
          animate={{
            scale: [0.7, 1.3, 0.7],
            opacity: [0.25, 0.7, 0.25],
          }}
          transition={{
            duration: 10 + i * 2.5,
            delay: i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Connecting lines between particles */}
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
            <stop offset="100%" stopColor="rgba(99, 102, 241, 0.1)" />
          </linearGradient>
        </defs>
        {particles.slice(0, 10).map((particle, idx) => {
          const nextParticle = particles[(idx + 1) % 10];
          return (
            <motion.line
              key={`line-${idx}`}
              x1={`${particle.x}%`}
              y1={`${particle.y}%`}
              x2={`${nextParticle.x}%`}
              y2={`${nextParticle.y}%`}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4,
                delay: idx * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
