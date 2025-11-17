"use client";

import { useState, useRef, useEffect } from "react";
import { useExhibitionStore } from "@/app/store";
import { motion } from "framer-motion";

export function ImmersiveExperience() {
  const { isImmersiveMode, setImmersiveMode, currentExhibition } =
    useExhibitionStore();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isImmersiveMode) return;

      const step = 0.5;
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          setPosition((p) => ({ ...p, y: p.y + step }));
          break;
        case "ArrowDown":
        case "s":
        case "S":
          setPosition((p) => ({ ...p, y: p.y - step }));
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          setPosition((p) => ({ ...p, x: p.x - step }));
          break;
        case "ArrowRight":
        case "d":
        case "D":
          setPosition((p) => ({ ...p, x: p.x + step }));
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isImmersiveMode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isImmersiveMode || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = (e.clientY - centerY) / centerY * 0.1;
    const rotY = (e.clientX - centerX) / centerX * 0.1;

    setRotation({ x: rotX, y: rotY });
  };

  if (!isImmersiveMode) return null;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 bg-gradient-to-b from-slate-900 to-slate-950 z-50 cursor-grab active:cursor-grabbing"
    >
      {/* 3D Environment simulation */}
      <div
        className="w-full h-full relative perspective"
        style={{
          perspective: "1200px",
          transform: `rotateX(${rotation.x}rad) rotateY(${rotation.y}rad)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {/* Environment layers - simulate depth */}
        <div
          className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-slate-900 to-slate-950"
          style={{
            transform: `translateZ(${position.x * 10}px) translateY(${
              -position.y * 10
            }px)`,
          }}
        />

        {/* Interactive hotspots */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative w-96 h-96"
            style={{
              transform: `translate(${position.x * 20}px, ${
                -position.y * 20
              }px)`,
            }}
          >
            {/* Central focus area */}
            <div className="absolute inset-0 flex items-center justify-center">
              {currentExhibition ? (
                <motion.div
                  className="text-center glow-effect"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <h2 className="text-3xl font-bold mb-4">
                    {currentExhibition.name}
                  </h2>
                  <p className="text-lg text-gray-300 mb-6">
                    {currentExhibition.description}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {currentExhibition.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-500/30 rounded-full text-sm border border-blue-400/50"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="text-center text-gray-400">
                  <p className="text-xl">选择一个展区开始探索</p>
                  <p className="text-sm mt-2">使用方向键或 WASD 移动</p>
                </div>
              )}
            </div>

            {/* Navigation hints */}
            <div className="absolute top-0 left-0 text-xs text-gray-500">
              <p>↑ W 向前</p>
            </div>
            <div className="absolute bottom-0 left-0 text-xs text-gray-500">
              <p>↓ S 向后</p>
            </div>
            <div className="absolute top-1/2 left-0 -translate-y-1/2 text-xs text-gray-500">
              <p>← A 左移</p>
            </div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 text-xs text-gray-500">
              <p>→ D 右移</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Controls overlay */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          onClick={() => setImmersiveMode(false)}
          className="px-4 py-2 bg-red-600/80 hover:bg-red-700 rounded-lg transition"
        >
          退出沉浸式体验
        </button>
      </div>

      {/* Position indicator */}
      <div className="absolute bottom-4 left-4 text-xs text-gray-400 font-mono">
        <p>X: {position.x.toFixed(1)}</p>
        <p>Y: {position.y.toFixed(1)}</p>
      </div>
    </motion.div>
  );
}
