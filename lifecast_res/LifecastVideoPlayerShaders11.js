/*
The MIT License

Copyright © 2021 Lifecast Incorporated
2025-2026 Artanim, Pierre Nagorny

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

export const VR180_VertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const VR180_FragmentShader = `
precision highp float;

#include <common>
uniform sampler2D uTexture;
uniform sampler2D uTextureNext;
uniform float uFadeAmount;
uniform float uCrossfade;
varying vec2 vUv;

void main() {
  vec2 texture_uv = vec2(vUv.s, vUv.t);
  vec4 colorCurrent = texture2D(uTexture, texture_uv);
  vec4 colorNext = texture2D(uTextureNext, texture_uv);
  // Crossfade between current and next texture
  vec4 color = mix(colorCurrent, colorNext, uCrossfade);
  // Apply overall fade (uFadeAmount: 1.0 = full visible, 0.0 = black)
  gl_FragColor = vec4(color.rgb * uFadeAmount, color.a);
}
`;
