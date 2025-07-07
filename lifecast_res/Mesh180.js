/*
MIT License
© 2025 Pierre Nagorny
Based on https://github.com/fbriggs/lifecast_public/blob/main/web/lifecast_res/Vr180Mesh.js
*/

import {
    Object3D, ShaderMaterial, DoubleSide, SphereGeometry, Mesh
} from './three178.module.min.js';  // original three152.module.min.js
import {
    VR180_FragmentShader,
    VR180_VertexShader
} from "./LifecastVideoPlayerShaders11.js";

export class Mesh180 extends Object3D {
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

        const material = new ShaderMaterial({
            vertexShader: VR180_VertexShader,
            fragmentShader: VR180_FragmentShader,  // fragmentShader or VR180_FragmentShader
            uniforms: this.uniforms,
            side: DoubleSide,
            transparent: false
        });

        // Create single monocular mesh (visible to both eyes)
        const monoMesh = this.createMesh180(material);
        monoMesh.layers.set(0);  // Use default layer 0 (visible to both eyes)
        this.add(monoMesh);
    }

    createMesh180(material) {
        // A half-sphere from angle 180 to 360 degrees, 100 meter radius
        const geometry = new SphereGeometry(100, 64, 64, Math.PI, Math.PI);

        // For monocular projection, we use standard UV mapping for the hemisphere
        // No special UV modifications needed - the shader handles texture mapping directly
        geometry.attributes.uv.needsUpdate = true;

        const mesh = new Mesh(geometry, material);
        // Incline the sphere mesh by 30 degrees (convert to radians)
        // Panrama: 30º
        // Omnimax: 27º
        mesh.rotation.x = Math.PI / 6; // 30 degrees = π/6 radians
        return mesh;
    }
}
