/*
MIT License
© 2024 Lifecast Incorporated
https://github.com/fbriggs/lifecast_public/blob/main/web/lifecast_res/Vr180Mesh.js
*/

import {
    Object3D, ShaderMaterial, DoubleSide, SphereGeometry, Mesh
} from './three178.module.min.js';  // original three152.module.min.js
import {
    VR180_FragmentShader,
    VR180_VertexShader
} from "./LifecastVideoPlayerShaders11.js";

export class Vr180Mesh extends Object3D {
    constructor(texture, isSBS = false) {
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

        const material = new ShaderMaterial({
            vertexShader: VR180_VertexShader,
            fragmentShader: VR180_FragmentShader,  // fragmentShader or VR180_FragmentShader
            uniforms: this.uniforms,
            side: DoubleSide,
            transparent: false
        });

        // Create left eye mesh
        const leftMesh = this.createVr180Mesh(material, true);
        leftMesh.layers.set(1);  // Use layer 1 for left eye
        this.add(leftMesh);

        // Create right eye mesh
        const rightMesh = this.createVr180Mesh(material, false);
        rightMesh.layers.set(2);  // Use layer 2 for right eye
        this.add(rightMesh);
    }

    createVr180Mesh(material, isLeftEye) {
        // A half-sphere from angle 180 to 360 degrees, 100 meter radius
        const geometry = new SphereGeometry(100, 64, 64, Math.PI, Math.PI);

        // Modify UVs for stereo view
        const uvs = geometry.attributes.uv.array;
        for (let i = 0; i < uvs.length; i += 2) {
            if (isLeftEye) {
                uvs[i] = (1.0 - uvs[i]) * 0.5;  // Left eye
            } else {
                uvs[i] = 1.0 - (uvs[i] * 0.5);  // Right eye
            }
        }

        geometry.attributes.uv.needsUpdate = true;

        return new Mesh(geometry, material);
    }
}
