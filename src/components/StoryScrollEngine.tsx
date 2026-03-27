import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { CAM_Z, MAP_NODES } from '../experience/IntroConstants';
function SceneContent({ activeNodeId }: { activeNodeId: string }) {
    const [isWalking, setIsWalking] = useState(false);
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
             setIsWalking(true);
             // Walk towards the target
             bodyRef.current.position.x = THREE.MathUtils.lerp(currentPos.x, targetNode.pos[0], 0.05);
             bodyRef.current.position.z = THREE.MathUtils.lerp(currentPos.z, targetNode.pos[2], 0.05);
             
             // Look where we are going (Turn smoothly)
             bodyRef.current.rotation.y = THREE.MathUtils.lerp(bodyRef.current.rotation.y, targetNode.rot, 0.05);
        } else {
             setIsWalking(false);
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
            
            {/* Ground markers along the path */}
            {MAP_NODES.map((p, i) => {
                const isActive = p.id === activeNodeId;
                return (
                    <group key={i} position={[p.pos[0], -0.1, p.pos[2]]}>
                        <mesh rotation={[-Math.PI / 2, 0, 0]}>
                            <ringGeometry args={[0.3, 0.5, 32]} />
                            <meshStandardMaterial color={isActive ? "#22d3ee" : "#fff"} transparent opacity={isActive ? 0.8 : 0.1} />
                        </mesh>
                        {isActive && <pointLight position={[0, 1, 0]} color="#22d3ee" intensity={1} distance={5} />}
                    </group>
                );
            })}
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
