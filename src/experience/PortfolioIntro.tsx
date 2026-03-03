import { useState, useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Sparkles, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import gsap from 'gsap';
import { MathUtils } from 'three';
import { useExperience } from './ExperienceContext';

import { scenes, SLIDE_X, themes, SHIP_Y, CAM_Z } from './IntroConstants';

// ─── HELPERS ──────────────────────────────────────────────────────
function CameraController({ shipRef }: { shipRef: React.RefObject<THREE.Group> }) {
    const { camera, size } = useThree();
    const isMobile = size.width < 768;

    useFrame(() => {
        if (!shipRef.current) return;
        const targetZ = isMobile ? CAM_Z * 1.5 : CAM_Z;
        camera.position.x = MathUtils.lerp(camera.position.x, shipRef.current.position.x + (isMobile ? 0 : 2), 0.08);
        camera.position.y = MathUtils.lerp(camera.position.y, isMobile ? 0.5 : 0, 0.05);
        camera.position.z = MathUtils.lerp(camera.position.z, targetZ, 0.05);

        // Adjust FOV for mobile if needed
        if (isMobile && camera instanceof THREE.PerspectiveCamera && camera.fov !== 50) {
            camera.fov = 50;
            camera.updateProjectionMatrix();
        }
    });
    return null;
}

function ScannerBeam({ active }: { active: boolean }) {
    const beamRef = useRef<THREE.Group>(null!);
    useFrame((state) => {
        if (!active || !beamRef.current) return;
        beamRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 3) * 0.05;
        beamRef.current.scale.setScalar(0.8 + Math.sin(state.clock.elapsedTime * 5) * 0.1);
    });
    return (
        <group ref={beamRef} visible={active} position={[0.6, 0.1, 0]}>
            {/* Soft, circular pulse instead of a hard-edged cone */}
            <mesh>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={5} transparent opacity={0.4} />
            </mesh>
            <pointLight intensity={2} color="#00ffcc" distance={2} />
        </group>
    );
}

function DeepSpaceBeacon({ position }: { position: [number, number, number] }) {
    const ref = useRef<THREE.Group>(null!);
    useFrame((state) => {
        if (ref.current) {
            ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
            ref.current.rotation.y += 0.01;
        }
    });
    return (
        <group ref={ref} position={position}>
            <mesh>
                <capsuleGeometry args={[0.1, 0.8, 4, 8]} />
                <meshStandardMaterial color="#1f2937" metalness={1} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.5, 0]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={4} />
            </mesh>
            <pointLight position={[0, 0.5, 0]} intensity={3} color="#ef4444" distance={5} />
        </group>
    );
}

function Satellite({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
    const ref = useRef<THREE.Group>(null!);
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y += 0.005;
            ref.current.position.y += Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.01;
        }
    });
    return (
        <group ref={ref} position={position} rotation={rotation}>
            <mesh><boxGeometry args={[0.3, 0.4, 0.2]} /><meshStandardMaterial color="#374151" metalness={1} roughness={0.2} /></mesh>
            <mesh position={[0.4, 0, 0]}><boxGeometry args={[0.5, 0.2, 0.02]} /><meshStandardMaterial color="#1e3a8a" emissive="#1e3a8a" emissiveIntensity={1} /></mesh>
            <mesh position={[-0.4, 0, 0]}><boxGeometry args={[0.5, 0.2, 0.02]} /><meshStandardMaterial color="#1e3a8a" emissive="#1e3a8a" emissiveIntensity={1} /></mesh>
        </group>
    );
}

function Asteroid({ position, scale }: { position: [number, number, number]; scale: number }) {
    const ref = useRef<THREE.Mesh>(null!);
    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.x += 0.01;
            ref.current.rotation.y += 0.01;
        }
    });
    return (
        <mesh ref={ref} position={position} scale={scale}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#262626" roughness={1} />
        </mesh>
    );
}

function HolographicUI({ active }: { active: boolean }) {
    const groupRef = useRef<THREE.Group>(null!);
    useFrame(() => {
        if (!active || !groupRef.current) return;
        groupRef.current.rotation.z += 0.02;
        groupRef.current.scale.setScalar(MathUtils.lerp(groupRef.current.scale.x, active ? 1 : 0, 0.1));
    });
    return (
        <group ref={groupRef} visible={active} position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh><ringGeometry args={[0.6, 0.65, 32]} /><meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={2} transparent opacity={0.6} /></mesh>
            <mesh rotation={[0, 0, Math.PI / 4]}><ringGeometry args={[0.7, 0.72, 32]} /><meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={1} transparent opacity={0.3} /></mesh>
        </group>
    );
}

const ParticleSmoke = ({ color, active, isWipe = false, isBursting = false }: { color: string; active: boolean; isWipe?: boolean; isBursting?: boolean }) => {
    const pointsRef = useRef<THREE.Points>(null!);
    const count = isWipe ? 600 : (isBursting ? 300 : 100);
    const [positions] = useState(() => new Float32Array(1800 * 3));
    const [scales] = useState(() => new Float32Array(1800));
    const [lives] = useState(() => new Float32Array(1800));
    const [textureReady, setTextureReady] = useState(false);

    // Create a circular texture to avoid "square" particles
    const smokeTexture = useRef<THREE.CanvasTexture>(null!);
    useEffect(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d')!;
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.4, 'rgba(255,255,255,0.4)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
        smokeTexture.current = new THREE.CanvasTexture(canvas);
        smokeTexture.current.needsUpdate = true;
        setTextureReady(true);
    }, []);

    const resetParticle = useCallback((i: number) => {
        if (isWipe) {
            positions[i * 3] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
        } else {
            positions[i * 3] = (Math.random() - 0.5) * 0.2;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
        }
        scales[i] = Math.random() * (isWipe ? 5 : 1) + 0.5;
        lives[i] = Math.random();
    }, [positions, scales, lives, isWipe]);

    useEffect(() => {
        for (let i = 0; i < count; i++) resetParticle(i);
    }, [count, resetParticle]);

    useFrame((state, delta) => {
        if (!pointsRef.current || !active || !textureReady) return;
        const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
        const scaleAttr = pointsRef.current.geometry.attributes.scale as THREE.BufferAttribute;
        const speedMultiplier = isWipe ? 15 : (isBursting ? 25 : 12);

        for (let i = 0; i < count; i++) {
            lives[i] -= delta * (isWipe ? 0.6 : 0.4);

            posAttr.setX(i, posAttr.getX(i) - delta * speedMultiplier);
            posAttr.setY(i, posAttr.getY(i) + Math.sin(state.clock.elapsedTime * 1.5 + i) * 0.03);

            if (isWipe) {
                // Wipe particles expand and move slightly towards camera
                posAttr.setZ(i, posAttr.getZ(i) + delta * 5);
                scaleAttr.setX(i, (1 - lives[i]) * 35); // Huge scale for wipe
            } else {
                scaleAttr.setX(i, (1 - lives[i]) * 6);
            }

            if (lives[i] <= 0) {
                resetParticle(i);
                lives[i] = 1.0;
            }
        }
        posAttr.needsUpdate = true;
        scaleAttr.needsUpdate = true;
    });

    if (!textureReady || !active) return null;

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions.subarray(0, count * 3), 3]} />
                <bufferAttribute attach="attributes-scale" args={[scales.subarray(0, count), 1]} />
            </bufferGeometry>
            <pointsMaterial
                size={isWipe ? 1.5 : 0.6}
                color={color}
                transparent
                map={smokeTexture.current}
                opacity={isWipe ? 0.5 : 0.3}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                sizeAttenuation={true}
            />
        </points>
    );
};

// ─── SPACE ENVIRONMENT ───────────────────────────────────────────
function SpaceEnvironment({ themeColor }: { themeColor: string }) {
    const groupRef = useRef<THREE.Group>(null!);
    const ringsRef = useRef<THREE.Mesh>(null!);
    const planetGroupRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
        if (ringsRef.current) ringsRef.current.rotation.z += 0.005;
        if (planetGroupRef.current) planetGroupRef.current.position.y = -15 + Math.sin(state.clock.elapsedTime * 0.5) * 1;
    });

    return (
        <group ref={groupRef}>
            <Stars radius={200} depth={100} count={18000} factor={8} saturation={0.5} fade speed={1.5} />
            <group position={[0, 0, -50]}><Sparkles count={1200} scale={[150, 150, 60]} size={2.5} color={themeColor} opacity={0.2} /></group>
            <Satellite position={[-15, 10, -30]} rotation={[0.5, 0, 0.2]} />
            <Satellite position={[25, -5, -40]} rotation={[0, 0.8, 0.4]} />
            <Satellite position={[45, 15, -25]} rotation={[0.2, 0.2, 0]} />
            <Asteroid position={[-20, -10, -50]} scale={0.4} /><Asteroid position={[10, 20, -60]} scale={0.6} /><Asteroid position={[50, -15, -45]} scale={0.3} /><Asteroid position={[65, 10, -55]} scale={0.5} />
            <DeepSpaceBeacon position={[20, 15, -40]} />
            <mesh position={[40, 20, -50]}><sphereGeometry args={[25, 32, 32]} /><meshStandardMaterial color={themeColor} emissive={themeColor} emissiveIntensity={1.5} transparent opacity={0.07} depthWrite={false} /></mesh>
            <mesh position={[-50, -25, -60]}><sphereGeometry args={[45, 32, 32]} /><meshStandardMaterial color="#581c87" emissive="#3b0764" emissiveIntensity={1.5} transparent opacity={0.06} depthWrite={false} /></mesh>
            <mesh position={[20, -10, -40]}><sphereGeometry args={[15, 32, 32]} /><meshStandardMaterial color={themeColor} emissive={themeColor} emissiveIntensity={3} transparent opacity={0.04} depthWrite={false} /></mesh>
            <group position={[-40, 15, -80]}><mesh><sphereGeometry args={[4, 32, 32]} /><meshStandardMaterial color="#020617" emissive={themeColor} emissiveIntensity={0.2} /></mesh><pointLight intensity={2} color={themeColor} distance={20} /></group>
            <group ref={planetGroupRef} position={[60, -15, -70]}>
                <mesh><sphereGeometry args={[8, 64, 64]} /><meshStandardMaterial color="#312e81" roughness={1} metalness={0} /></mesh>
                <mesh ref={ringsRef} rotation={[Math.PI / 2.2, 0.3, 0]}><ringGeometry args={[12, 16, 64]} /><meshStandardMaterial color={themeColor} transparent opacity={0.4} side={THREE.DoubleSide} emissive={themeColor} emissiveIntensity={1} /></mesh>
                <pointLight intensity={5} color={themeColor} distance={45} position={[-10, 10, 10]} />
            </group>
        </group>
    );
}

// ─── HERO SHIP ────────────────────────────────────────────────────
function HeroShip({ currentSlide, shipRef, isTransitioning, isBursting }: { currentSlide: number; shipRef: React.RefObject<THREE.Group>; isTransitioning: boolean; isBursting: boolean }) {
    const innerGroupRef = useRef<THREE.Group>(null!);
    const engineRef = useRef<THREE.Mesh>(null!);
    const [scannerActive, setScannerActive] = useState(false);
    const [holoActive, setHoloActive] = useState(false);
    const prevSlide = useRef(0);
    const masterRef = useRef<gsap.core.Timeline | null>(null);

    const { size } = useThree();
    const isMobile = size.width < 768;
    const engineColor = themes[currentSlide];

    useFrame((state) => {
        if (!innerGroupRef.current || !shipRef.current) return;
        innerGroupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.15;
        const isIdle = !masterRef.current || !masterRef.current.isActive();
        if (isIdle) {
            const mouseX = isMobile ? 0 : state.mouse.x;
            const mouseY = isMobile ? 0 : state.mouse.y;
            innerGroupRef.current.rotation.y = MathUtils.lerp(innerGroupRef.current.rotation.y, -mouseX * 0.3, 0.05);
            innerGroupRef.current.rotation.z = MathUtils.lerp(innerGroupRef.current.rotation.z, -mouseY * 0.2, 0.05);
            innerGroupRef.current.rotation.x = MathUtils.lerp(innerGroupRef.current.rotation.x, mouseX * 0.2, 0.05);
        }
    });

    useEffect(() => {
        if (!shipRef.current || !innerGroupRef.current) return;
        const targetX = SLIDE_X[currentSlide];
        const isFirstRender = prevSlide.current === currentSlide && currentSlide === 0;

        if (isFirstRender) {
            gsap.to(shipRef.current.position, { x: targetX, y: SHIP_Y, duration: 1.2, ease: "power3.inOut" });
        } else if (!isTransitioning) {
            // Idle movements or minor adjustments if not transitioning
            gsap.to(shipRef.current.position, { x: targetX, duration: 0.8, ease: "power2.out" });
        }

        // Reset specific slide effects
        if (currentSlide !== 0) setScannerActive(false);
        if (currentSlide !== 2) setHoloActive(false);
        if (currentSlide === 2) setTimeout(() => setHoloActive(true), 800);

        prevSlide.current = currentSlide;
    }, [currentSlide, shipRef, isTransitioning]);

    const handleShipClick = () => {
        if (!shipRef.current) return;
        gsap.to(shipRef.current.position, {
            x: shipRef.current.position.x + 2, duration: 0.3, ease: "power2.out", onComplete: () => {
                gsap.to(shipRef.current.position, { x: SLIDE_X[currentSlide], duration: 0.8, ease: "elastic.out(1, 0.4)" });
            }
        });
        const flare = shipRef.current.getObjectByName("EngineFlare");
        if (flare) gsap.to(flare.scale, { x: 2, y: 2, z: 2, duration: 0.1, yoyo: true, repeat: 1 });
    };

    return (
        <group ref={shipRef} position={[SLIDE_X[0], SHIP_Y, 0]} onClick={handleShipClick}>
            <Float speed={2} floatIntensity={0.6} rotationIntensity={0.2}>
                <group ref={innerGroupRef}>
                    <ScannerBeam active={scannerActive} /><HolographicUI active={holoActive} />
                    {/* Smoke only happens after first click or while bursting */}
                    <ParticleSmoke color={engineColor} active={currentSlide > 0 || isBursting} isBursting={isBursting} />
                    <group scale={isMobile ? [0.7, 0.5, 0.7] : [1, 0.8, 1]} rotation={[0, 0, 0]}>
                        <mesh><boxGeometry args={[0.5, 0.2, 1.8]} /><meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} /></mesh>
                        <mesh position={[0, 0.12, 0]}><boxGeometry args={[0.3, 0.05, 1.4]} /><meshStandardMaterial color="#1f1f1f" metalness={1} roughness={0.2} /></mesh>
                        <mesh position={[0, 0.15, -0.4]}><boxGeometry args={[0.4, 0.08, 0.6]} /><meshStandardMaterial color="#111111" metalness={1} roughness={0.2} /></mesh>
                        <mesh position={[0, 0.02, 0.1]}><boxGeometry args={[0.55, 0.02, 1.2]} /><meshStandardMaterial color={engineColor} emissive={engineColor} emissiveIntensity={4} /></mesh>
                        <mesh position={[0.6, 0.1, 0]} rotation={[0, 0, -Math.PI / 2]}><coneGeometry args={[0.35, 1.0, 4]} /><meshStandardMaterial color="#1f2937" metalness={1} roughness={0.2} /></mesh>
                        <mesh position={[0.8, 0.2, 0.1]} rotation={[0.5, 0, 0]}><cylinderGeometry args={[0.01, 0.01, 0.4]} /><meshStandardMaterial color="#374151" /></mesh>
                        <mesh position={[0.8, 0.2, -0.1]} rotation={[-0.5, 0, 0]}><cylinderGeometry args={[0.01, 0.01, 0.4]} /><meshStandardMaterial color="#374151" /></mesh>
                        <mesh position={[0.4, 0.25, 0]} rotation={[0, 0, -Math.PI / 2]}><capsuleGeometry args={[0.15, 0.4, 4, 8]} /><meshStandardMaterial color={engineColor} emissive={engineColor} emissiveIntensity={3} transparent opacity={0.9} /></mesh>
                        <mesh position={[-0.2, 0, -0.4]} rotation={[0.3, 0, 0]}><boxGeometry args={[1.2, 0.05, 0.6]} /><meshStandardMaterial color="#1f2937" metalness={0.9} /></mesh>
                        <mesh position={[0.1, 0.1, -0.6]} rotation={[0.2, 0, 0]}><boxGeometry args={[0.6, 0.02, 0.4]} /><meshStandardMaterial color="#111827" /></mesh>
                        <mesh position={[-0.2, 0, 0.4]} rotation={[-0.3, 0, 0]}><boxGeometry args={[1.2, 0.05, 0.6]} /><meshStandardMaterial color="#1f2937" metalness={0.9} /></mesh>
                        <mesh position={[0.1, 0.1, 0.6]} rotation={[-0.2, 0, 0]}><boxGeometry args={[0.6, 0.02, 0.4]} /><meshStandardMaterial color="#111827" /></mesh>
                        <mesh position={[-0.6, 0.35, 0]} rotation={[0, 0, -0.2]}><boxGeometry args={[0.4, 0.05, 0.9]} /><meshStandardMaterial color="#0a0a0a" metalness={1} /></mesh>
                        <mesh position={[-0.7, 0.45, 0.2]} rotation={[0, 0, 0.5]}><cylinderGeometry args={[0.01, 0.01, 0.6]} /><meshStandardMaterial color="#374151" /></mesh>
                        <mesh position={[-0.7, 0.45, -0.2]} rotation={[0, 0, 0.5]}><cylinderGeometry args={[0.01, 0.01, 0.6]} /><meshStandardMaterial color="#374151" /></mesh>
                    </group>
                    <group position={[-0.9, 0, 0]}>
                        <mesh ref={engineRef} name="EngineFlare">
                            <sphereGeometry args={[0.25, 16, 16]} /><meshStandardMaterial color="#ffffff" emissive={engineColor} emissiveIntensity={6} />
                        </mesh>
                        <mesh scale={[1.2, 1.2, 1]}>
                            <sphereGeometry args={[0.3, 16, 16]} /><meshStandardMaterial color={engineColor} emissive={engineColor} emissiveIntensity={2} transparent opacity={0.3} />
                        </mesh>
                    </group>
                </group>
            </Float>
        </group>
    );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────
export default function PortfolioIntro() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isBursting, setIsBursting] = useState(false);
    const { completeExperience } = useExperience();
    const shipRef = useRef<THREE.Group>(null!);

    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const insightsRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!headlineRef.current) return;
        const tl = gsap.timeline();
        tl.fromTo(headlineRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.8 });
        tl.fromTo(subtextRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.6 }, "-=0.5");
        tl.fromTo(insightsRef.current?.children || [], { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 }, "-=0.3");
        tl.fromTo(buttonRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");
    }, []);

    const nextSlide = useCallback(() => {
        if (isTransitioning) return;
        if (currentSlide >= scenes.length - 1) {
            setIsTransitioning(true);
            setIsBursting(true);
            const exitTl = gsap.timeline({
                onComplete: () => {
                    setTimeout(completeExperience, 200);
                }
            });
            exitTl.to(shipRef.current.position, { x: shipRef.current.position.x - 2, duration: 0.5, ease: "power2.in" });
            exitTl.to(shipRef.current.position, { x: shipRef.current.position.x + 100, duration: 0.8, ease: "expo.in" }, 0.5);
            exitTl.to(shipRef.current.scale, { x: 10, y: 0.1, z: 0.1, duration: 0.4 }, 0.7);
            const flare = shipRef.current.getObjectByName("EngineFlare");
            if (flare) exitTl.to(flare.scale, { x: 20, y: 20, z: 20, duration: 0.6 }, 0.5);
            return;
        }

        setIsTransitioning(true);
        setIsBursting(true);
        const nextIndex = currentSlide + 1;
        const targetX = SLIDE_X[nextIndex];

        const master = gsap.timeline({
            onComplete: () => {
                setIsTransitioning(false);
                setIsBursting(false);
            }
        });

        // 1. Initial burst and move right
        master.to([headlineRef.current, subtextRef.current, insightsRef.current?.children || [], buttonRef.current], {
            opacity: 0, x: -80, duration: 0.4, ease: "power2.in"
        }, 0);

        // 2. Ship accelerates off-screen right
        master.to(shipRef.current.position, {
            x: shipRef.current.position.x + 30, // Move further out
            duration: 0.8,
            ease: "power2.in",
            onStart: () => {
                // Intense banking
                gsap.to(shipRef.current!.children[0].rotation, { z: -0.6, duration: 0.4 });
            }
        }, 0.1);

        // 3. Snap to far left and glide in
        master.set(shipRef.current.position, { x: targetX - 30 }, 0.9);
        master.call(() => setCurrentSlide(nextIndex), [], 0.9);

        // 4. Glide in from left
        master.to(shipRef.current.position, {
            x: targetX,
            duration: 1.2,
            ease: "power3.out",
            onStart: () => {
                // Recover from banking
                gsap.to(shipRef.current!.children[0].rotation, { z: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
            }
        }, 0.9);

        // 5. Fade new text in
        master.fromTo([headlineRef.current, subtextRef.current, insightsRef.current?.children || [], buttonRef.current],
            { opacity: 0, x: 100 },
            { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
            1.1
        );

    }, [currentSlide, isTransitioning, completeExperience, shipRef]);

    return (
        <div className="fixed inset-0 z-50 bg-[#fafafa]">
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center p-8">
                <div className="text-center max-w-2xl pointer-events-auto">
                    <h1 ref={headlineRef} className="text-3xl md:text-6xl font-bold mb-4 text-[#111827] px-4">{scenes[currentSlide].headline}</h1>
                    <p ref={subtextRef} className="text-base md:text-2xl text-[#4b5563] mb-6 md:mb-8 px-6">{scenes[currentSlide].subtext}</p>
                    <div ref={insightsRef} className="flex flex-col gap-2 md:gap-3 items-center mb-8 md:mb-12">
                        {scenes[currentSlide].insights.map((s, i) => (
                            <div key={i} className="bg-white/50 border border-black/5 rounded-full px-4 py-1.5 md:px-5 md:py-2 text-[10px] md:text-sm text-[#4b5563]">{s}</div>
                        ))}
                    </div>
                    <button ref={buttonRef} onClick={nextSlide} disabled={isTransitioning} className="px-8 py-4 bg-[#111827] text-white rounded-full font-mono text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl disabled:opacity-50">
                        {currentSlide === scenes.length - 1 ? "Explore the Work" : "Continue ->"}
                    </button>
                </div>
                <button onClick={completeExperience} className="fixed bottom-8 left-8 px-5 py-2.5 bg-white border border-neutral-200 rounded-full text-xs font-mono text-neutral-500 shadow-lg hover:border-black pointer-events-auto transition-all">Skip Interaction</button>
            </div>
            <div className={`absolute inset-0 transition-all duration-500 ${isTransitioning ? 'z-20' : 'z-0'}`}>
                <Canvas camera={{ position: [0, 0, CAM_Z], fov: 45 }}>
                    <ambientLight intensity={0.5} /><Environment preset="city" /><CameraController shipRef={shipRef} />
                    <SpaceEnvironment themeColor={themes[currentSlide]} />
                    {/* Global smoke wipe that follows camera/screen but isn't a child of the ship */}
                    <group position={[shipRef.current?.position.x || 0, 0, 0]}>
                        <ParticleSmoke color={themes[currentSlide]} active={isTransitioning} isWipe={true} />
                    </group>
                    <HeroShip currentSlide={currentSlide} shipRef={shipRef} isTransitioning={isTransitioning} isBursting={isBursting} />
                    <EffectComposer><Bloom intensity={1.5} luminanceThreshold={0.9} luminanceSmoothing={0.02} /></EffectComposer>
                </Canvas>
            </div>
        </div>
    );
}
