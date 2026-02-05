"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const LiquidShaderMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0.6, 0.4, 0.9) }, // Purple tint to match theme
        uResolution: { value: new THREE.Vector2() },
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      
      // Liquid distortion
      float noise1 = snoise(uv * 3.0 + uTime * 0.2);
      float noise2 = snoise(uv * 6.0 - uTime * 0.3);
      
      vec2 distortedUV = uv + vec2(noise1, noise2) * 0.1;
      
      // Creating the metallic ripples
      float pattern = sin(distortedUV.x * 10.0 + uTime) * sin(distortedUV.y * 10.0 + uTime);
      pattern += snoise(distortedUV * 2.0 + uTime * 0.2);
      
      // Color mixing for gold/purple metallic look
      vec3 color1 = vec3(0.1, 0.05, 0.2); // Dark purple base
      vec3 color2 = vec3(0.6, 0.3, 0.9); // Lighter purple
      vec3 color3 = vec3(0.9, 0.8, 0.5); // Gold accents

      float mix1 = smoothstep(-1.0, 1.0, pattern);
      float mix2 = smoothstep(0.5, 1.0, pattern);
      
      vec3 finalColor = mix(color1, color2, mix1);
      finalColor = mix(finalColor, color3, mix2 * 0.4); // Add gold highlights
      
      // Vignette
      float dist = length(uv - 0.5);
      finalColor *= 1.0 - dist * 0.8;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

function LiquidPlane() {
    const mesh = useRef<THREE.Mesh>(null);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uColor: { value: new THREE.Color(0.6, 0.4, 0.9) },
        }),
        []
    );

    useFrame((state) => {
        const { clock } = state;
        if (mesh.current) {
            (mesh.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={mesh}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                fragmentShader={LiquidShaderMaterial.fragmentShader}
                vertexShader={LiquidShaderMaterial.vertexShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}

export default function FluidBackground() {
    return (
        <div className="absolute inset-0 w-full h-full -z-10 bg-black">
            <Canvas
                camera={{ position: [0, 0, 1] }}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                dpr={[1, 2]} // Handle high DPI screens
                gl={{ alpha: false, antialias: false }} // Performance optimizations
            >
                <LiquidPlane />
            </Canvas>
            {/* Overlay for text legibility */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        </div>
    );
}
