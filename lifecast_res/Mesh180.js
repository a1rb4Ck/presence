/*
MIT License
© 2025 Pierre Nagorny
*/

import * as THREE from './three178.module.min.js';  // original three152.module.min.js
import {
    VR180_FragmentShader,
    VR180_VertexShader
} from "./LifecastVideoPlayerShaders11.js";

export class Mesh180 extends THREE.Object3D {
    constructor(texture) {
        super();

        this.uniforms = {
            uTexture: { value: texture },
            uEffectRadius: { value: 0 },
        };

        // const fragmentShader = `
        //     precision highp float;

        //     #include <common>
        //     uniform sampler2D uTexture;
        //     varying vec2 vUv;
            
        //     void main() {
        //         // vec2 uv = vUv;
        //         vec2 texture_uv = vec2(vUv.s, vUv.t);
        //         // For SBS format, adjust UV coordinates
        //         ${isSBS ? `
        //             // Split screen into left/right eye
        //             if(gl_ViewID == 1) { // Right eye
        //                 texture_uv.x = texture_uv.x * 0.5 + 0.5;
        //             } else { // Left eye
        //                 texture_uv.x = texture_uv.x * 0.5;
        //             }
        //         ` : `
        //             // Standard VR180 format handling
        //             // if(gl_ViewID == 1) { // Right eye
        //             //     texture_uv.y = texture_uv.y * 0.5 + 0.5;
        //             // } else { // Left eye
        //             //     texture_uv.y = texture_uv.y * 0.5;
        //             // }
        //         `}
                
        //         gl_FragColor = texture2D(uTexture, texture_uv);
        //     }
        // `;
        // console.log(fragmentShader);

        const material = new THREE.ShaderMaterial({
            vertexShader: VR180_VertexShader,
            fragmentShader: VR180_FragmentShader,  // fragmentShader or VR180_FragmentShader
            uniforms: this.uniforms,
            side: THREE.DoubleSide,
            transparent: false
        });

        // Create left eye mesh
        const leftMesh = this.createMesh180(material, true);
        leftMesh.layers.set(1);  // Use layer 1 for left eye
        this.add(leftMesh);

        // Create right eye mesh
        const rightMesh = this.createMesh180(material, false);
        rightMesh.layers.set(2);  // Use layer 2 for right eye
        this.add(rightMesh);
    }

    createMesh180(material, isLeftEye) {
        // A half-sphere from angle 180 to 360 degrees, 1000 meter radius
        const geometry = new THREE.SphereGeometry(100, 64, 64, Math.PI, Math.PI);

        // Modify UVs for stereo view
        // const uvs = geometry.attributes.uv.array;
        // for (let i = 0; i < uvs.length; i += 2) {
        //     if (isLeftEye) {
        //         uvs[i] = (1.0 - uvs[i]) * 0.5;  // Left eye
        //     } else {
        //         uvs[i] = 1.0 - (uvs[i] * 0.5);  // Right eye
        //     }
        // }

        geometry.attributes.uv.needsUpdate = true;

        return new THREE.Mesh(geometry, material);
    }
}
