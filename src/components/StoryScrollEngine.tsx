import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Stars, Sparkles, Line, Octahedron, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { CAM_Z, MAP_NODES } from '../experience/IntroConstants';
function SceneContent({ activeNodeId }: { activeNodeId: string }) {
    const bodyRef = useRef<THREE.Group>(null!);
    const { camera } = useThree();

    const targetNode = useMemo(() => {
        const node = MAP_NODES.find(n => n.id === activeNodeId);
        return node || MAP_NODES[0];
    }, [activeNodeId]);

    useFrame(() => {
        if (!bodyRef.current) return;
        
        const currentPos = bodyRef.current.position;
        const dist = Math.hypot(targetNode.pos[0] - currentPos.x, targetNode.pos[2] - currentPos.z);
        
        if (dist > 0.1) {
             // Walk towards the target
             bodyRef.current.position.x = THREE.MathUtils.lerp(currentPos.x, targetNode.pos[0], 0.05);
             bodyRef.current.position.z = THREE.MathUtils.lerp(currentPos.z, targetNode.pos[2], 0.05);
             
             // Look where we are going (Turn smoothly)
             bodyRef.current.rotation.y = THREE.MathUtils.lerp(bodyRef.current.rotation.y, targetNode.rot, 0.05);
        } else {
             // When standing, subtly face the target rotation precisely
             bodyRef.current.rotation.y = THREE.MathUtils.lerp(bodyRef.current.rotation.y, targetNode.rot, 0.1);
        }

        // Camera follow
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, bodyRef.current.position.x, 0.05);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, bodyRef.current.position.z + CAM_Z, 0.05);
        camera.lookAt(bodyRef.current.position.x, 1.5, bodyRef.current.position.z);
    });

    return (
        <>
            <group ref={bodyRef}>
                {/* Robot removed per user request */}
            </group>

            {/* Environment elements that make it "spatial" */}
            <Stars radius={150} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={200} scale={[200, 20, 20]} size={1.5} color="#fff" opacity={0.1} />
            
            {/* Data Stream Corridor */}
            <group>
                <Line
                    points={MAP_NODES.map(p => new THREE.Vector3(p.pos[0], -0.05, p.pos[2]))}
                    color="#22d3ee"
                    lineWidth={1.5}
                    transparent
                    opacity={0.3}
                />
                <Line
                    points={MAP_NODES.map(p => new THREE.Vector3(p.pos[0], -0.05, p.pos[2]))}
                    color="#ffffff"
                    lineWidth={0.5}
                    transparent
                    opacity={0.1}
                    dashed
                    dashScale={20}
                    dashSize={1}
                />
            </group>

            {/* Ground markers along the path (Relay Nodes) */}
            {MAP_NODES.map((p, i) => {
                const isActive = p.id === activeNodeId;
                return (
                    <group key={i} position={[p.pos[0], 0, p.pos[2]]}>
                        {/* Floating Quantum Relay (Replacing basic pedestal) */}
                        <Float speed={2} rotationIntensity={2} floatIntensity={1}>
                            <Octahedron args={[0.2, 0]}>
                                <meshStandardMaterial 
                                    color={isActive ? "#22d3ee" : "#334155"} 
                                    emissive={isActive ? "#22d3ee" : "#000"} 
                                    emissiveIntensity={isActive ? 4 : 0}
                                    wireframe 
                                />
                            </Octahedron>
                        </Float>

                        {/* Holographic Pulse Ring */}
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
                            <ringGeometry args={[0.5, 0.55, 64]} />
                            <meshStandardMaterial 
                                color={isActive ? "#22d3ee" : "#334155"} 
                                transparent 
                                opacity={isActive ? 0.8 : 0.1} 
                            />
                        </mesh>

                        {/* Node Identification HUD (Vertical line + mini plane) */}
                        {isActive && (
                            <group position={[0, 0.5, 0]}>
                                <mesh position={[0, 0.5, 0]}>
                                    <boxGeometry args={[0.005, 1, 0.005]} />
                                    <meshStandardMaterial color="#22d3ee" transparent opacity={0.5} />
                                </mesh>
                                <mesh position={[0.3, 1, 0]}>
                                    <planeGeometry args={[0.5, 0.2]} />
                                    <meshStandardMaterial color="#22d3ee" transparent opacity={0.1} side={THREE.DoubleSide} />
                                </mesh>
                            </group>
                        )}

                        {isActive && <pointLight position={[0, 0.5, 0]} color="#22d3ee" intensity={2} distance={10} />}
                    </group>
                );
            })}
            {/* Digital Nebula / Background Cluster */}
            <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh position={[10, -5, -20]} scale={30}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <MeshDistortMaterial 
                        color="#1e3a8a" 
                        speed={2} 
                        distort={0.4} 
                        transparent 
                        opacity={0.05} 
                        side={THREE.BackSide} 
                    />
                </mesh>
            </Float>
        </>
    );
}

export default function StoryMapEngine({ activeNodeId }: { activeNodeId: string }) {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
            <Canvas shadows dpr={[1, 1.5]}>
                <PerspectiveCamera makeDefault position={[0, 3, CAM_Z]} fov={45} />
                <Environment preset="night" />
                <SceneContent activeNodeId={activeNodeId} />
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={0.5} />
            </Canvas>
        </div>
    );
}
