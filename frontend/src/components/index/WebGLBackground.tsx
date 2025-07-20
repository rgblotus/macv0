import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { loadShaderPair } from '../../utils/shaderLoader';

interface WebGLBackgroundProps {
    particleCount?: number;
    className?: string;
    shaderName?: string;
}

interface ParticleSystem {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    points: THREE.Points;
    material: THREE.ShaderMaterial;
    clock: THREE.Clock;
    animationId: number;
}

const WebGLBackground1: React.FC<WebGLBackgroundProps> = ({
    particleCount = 1000,
    className = "fixed top-0 left-0 w-full h-full z-[-1]",
    shaderName = "particles"
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const systemRef = useRef<ParticleSystem | null>(null);
    const isLoadingRef = useRef(false);
    const mountedRef = useRef(true);

    const particleData = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 10;
            positions[i3 + 1] = (Math.random() - 0.5) * 10;
            positions[i3 + 2] = (Math.random() - 0.5) * 10;

            colors[i3] = Math.random() * 0.5 + 0.5;
            colors[i3 + 1] = Math.random() * 0.3 + 0.2;
            colors[i3 + 2] = Math.random() * 0.8 + 0.2;

            sizes[i] = Math.random() * 0.10 + 0.05;
        }

        return { positions, colors, sizes };
    }, [particleCount]);

    const createParticleSystem = useCallback(async (container: HTMLDivElement) => {
        if (isLoadingRef.current || !mountedRef.current) return null;
        isLoadingRef.current = true;

        try {
            const { width, height } = container.getBoundingClientRect();
            const { vertexShader, fragmentShader } = await loadShaderPair(shaderName);
            if (!mountedRef.current) return null;

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
            camera.position.z = 2.5;

            const renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true,
                powerPreference: 'high-performance',
            });
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            container.appendChild(renderer.domElement);

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(particleData.positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(particleData.colors, 3));
            geometry.setAttribute('size', new THREE.BufferAttribute(particleData.sizes, 1));

            const material = new THREE.RawShaderMaterial({
                vertexShader,
                fragmentShader,
                uniforms: {
                    time: { value: 0.0 }
                },
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                vertexColors: true,
                glslVersion: THREE.GLSL3
            });

            const points = new THREE.Points(geometry, material);
            scene.add(points);

            const clock = new THREE.Clock();

            return { scene, camera, renderer, points, material, clock, animationId: 0 };
        } catch (error) {
            console.error('Failed to create particle system:', error);
            return null;
        } finally {
            isLoadingRef.current = false;
        }
    }, [shaderName, particleData]);

    const animate = useCallback(() => {
        const system = systemRef.current;
        if (!system || !mountedRef.current) return;

        const elapsedTime = system.clock.getElapsedTime();
        system.material.uniforms.time.value = elapsedTime;

        system.points.rotation.y = elapsedTime * 0.2;
        system.points.rotation.x = Math.sin(elapsedTime * 0.5) * 0.1;

        system.renderer.render(system.scene, system.camera);
        system.animationId = requestAnimationFrame(animate);
    }, []);

    const handleResize = useCallback(() => {
        const system = systemRef.current;
        const container = containerRef.current;
        if (!system || !container) return;

        const { width, height } = container.getBoundingClientRect();
        system.camera.aspect = width / height;
        system.camera.updateProjectionMatrix();
        system.renderer.setSize(width, height);
    }, []);

    const cleanup = useCallback(() => {
        const system = systemRef.current;
        if (!system) return;

        cancelAnimationFrame(system.animationId);
        system.points.geometry.dispose();
        system.material.dispose();
        system.renderer.dispose();

        const container = containerRef.current;
        if (container && system.renderer.domElement.parentNode === container) {
            container.removeChild(system.renderer.domElement);
        }

        systemRef.current = null;
    }, []);

    useEffect(() => {
        mountedRef.current = true;
        const container = containerRef.current;
        if (!container) return;

        const initSystem = async () => {
            const system = await createParticleSystem(container);
            if (!system || !mountedRef.current) return;

            systemRef.current = system;
            system.animationId = requestAnimationFrame(animate);
        };

        initSystem();
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            mountedRef.current = false;
            window.removeEventListener('resize', handleResize);
            cleanup();
        };
    }, [createParticleSystem, animate, handleResize, cleanup]);

    return (
        <div ref={containerRef} className={className} style={{ pointerEvents: 'none', userSelect: 'none' }} />
    );
};

export default WebGLBackground1;