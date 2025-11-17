"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import { useExhibitionStore, exhibitions } from "@/app/store";

interface ExhibitionZoneProps {
  name: string;
  position: [number, number, number];
  color: string;
  onClick: () => void;
  isActive: boolean;
  isAudioActive: boolean;
}

function ExhibitionZone({
  name,
  position,
  color,
  onClick,
  isActive,
  isAudioActive,
}: ExhibitionZoneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const scale = isActive ? 1.5 : isAudioActive ? 1.3 : hovered ? 1.2 : 1;

  return (
    <group position={position}>
      {/* Glow ring effect */}
      <mesh scale={[1.2, 1.2, 1]} position={[0, 0, -0.1]}>
        <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
        <meshBasicMaterial
          color={isActive ? color : isAudioActive ? "#fbbf24" : "#64748b"}
          transparent
          opacity={isActive ? 0.4 : 0.2}
        />
      </mesh>

      {/* Main zone */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={scale}
      >
        <boxGeometry args={[0.8, 0.8, 0.4]} />
        <meshPhongMaterial
          color={isActive ? color : isAudioActive ? "#fbbf24" : "#1e293b"}
          emissive={isActive ? color : isAudioActive ? "#fbbf24" : "#000000"}
          emissiveIntensity={isActive ? 0.5 : isAudioActive ? 0.3 : 0}
          shininess={100}
        />
      </mesh>

      {/* Label */}
      <mesh position={[0, 1.2, 0]}>
        <planeGeometry args={[1.5, 0.3]} />
        <meshBasicMaterial
          map={
            new THREE.CanvasTexture(
              (() => {
                const canvas = document.createElement("canvas");
                canvas.width = 512;
                canvas.height = 128;
                const ctx = canvas.getContext("2d")!;
                ctx.fillStyle = "rgba(15, 23, 42, 0.8)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "#ffffff";
                ctx.font = "bold 24px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(name, 256, 64);
                return canvas;
              })()
            )
          }
          transparent
        />
      </mesh>
    </group>
  );
}

function ExhibitionScene() {
  const { setCurrentExhibition, currentAudio } = useExhibitionStore();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  const handleZoneClick = (exhibition: any) => {
    setCurrentExhibition(exhibition);
  };

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 3, 8]}
        fov={75}
      />
      <OrbitControls
        minDistance={5}
        maxDistance={15}
        enablePan={true}
        enableZoom={true}
      />

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.8} castShadow />
      <pointLight position={[-10, 10, -10]} intensity={0.6} />

      {/* Ground plane with grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a2332" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Grid lines */}
      <gridHelper args={[20, 20]} position={[0, 0.01, 0]} />

      {/* Exhibition zones */}
      {exhibitions.map((exhibition) => (
        <ExhibitionZone
          key={exhibition.id}
          name={exhibition.name}
          position={exhibition.position}
          color={`hsl(${exhibition.stage * 50}, 70%, 50%)`}
          onClick={() => handleZoneClick(exhibition)}
          isActive={false}
          isAudioActive={currentAudio?.includes(exhibition.id) || false}
        />
      ))}

      {/* Background */}
      <mesh position={[0, 0, -15]}>
        <planeGeometry args={[30, 30]} />
        <meshBasicMaterial color="#0a0e27" />
      </mesh>
    </>
  );
}

export function ExhibitionMap() {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden border border-blue-500/30">
      <Canvas shadows>
        <Suspense fallback={null}>
          <ExhibitionScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
