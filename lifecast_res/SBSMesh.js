/*
MIT License
© 2025 Pierre Nagorny
Based on https://github.com/fbriggs/lifecast_public/blob/main/web/lifecast_res/Vr180Mesh.js
*/

import {
    Object3D, ShaderMaterial, DoubleSide, PlaneGeometry, Mesh
} from './three178.module.min.js';  // original three152.module.min.js
import {
    VR180_FragmentShader,
    VR180_VertexShader
} from "./LifecastVideoPlayerShaders11.js";

export class SBSMesh extends Object3D {
    constructor(texture) {
        super();

        this.uniforms = {
            uTexture: { value: texture },
            uEffectRadius: { value: 0 },
        };

        const material = new ShaderMaterial({
            vertexShader: VR180_VertexShader,
            fragmentShader: VR180_FragmentShader,  // fragmentShader or VR180_FragmentShader
            uniforms: this.uniforms,
            side: DoubleSide,
            transparent: false
        });

        // Create left eye mesh
        const leftMesh = this.createSBSMesh(material, true);
        leftMesh.layers.set(1);  // Use layer 1 for left eye
        this.add(leftMesh);

        // Create right eye mesh
        const rightMesh = this.createSBSMesh(material, false);
        rightMesh.layers.set(2);  // Use layer 2 for right eye
        this.add(rightMesh);
    }

    createSBSMesh(material, isLeftEye) {
        // Create a plane 3 meters away from the user
        const geometry = new PlaneGeometry(5.33, 3, 1, 1);
        
        // Position the plane 3 meters in front of the user
        const mesh = new Mesh(geometry, material);
        mesh.position.z = -3;
        
        // Modify UVs for side-by-side stereo view
        const uvs = geometry.attributes.uv.array;
        for (let i = 0; i < uvs.length; i += 2) {
            if (isLeftEye) {
                // Left eye sees left half of texture
                uvs[i] = uvs[i] * 0.5;
            } else {
                // Right eye sees right half of texture
                uvs[i] = uvs[i] * 0.5 + 0.5;
            }
        }
        
        geometry.attributes.uv.needsUpdate = true;
        
        return mesh;
    }
}
