# Presence in VR180

A web-based VR viewer for exploring the [EU Horizon Presence XR project](https://presence-xr.eu/) (2023-2026) in stereoscopic VR180.

**[View in VR](https://a1rb4ck.github.io/presence/)** | [About Presence XR](https://cordis.europa.eu/project/id/101135025/)

## Viewing

**VR Headset (recommended):** Open the link above in your headset browser (Meta Quest, Apple Vision Pro, Pico, etc.) for the full stereoscopic 3D experience.

**Desktop/Mobile:** You can explore the hemispherical view (left eye only) in any browser.

## Controls

| Platform | Action | Control |
|----------|--------|---------|
| Desktop | Look around | Mouse drag / Orbit |
| Desktop | Zoom | Scroll wheel |
| Desktop | Navigate images | Arrow keys or buttons |
| VR | Navigate images | A button (next) / B button (previous) |
| VR | Navigate images | Joystick left/right |
| VR | Slide transition | Trigger + slide controller |
| VR | Hand tracking | Pinch + slide for smooth transitions |

**VR Slide Transition:** Hold trigger (or pinch with hand tracking) and slide left/right to preview the transition. Release past 50% to navigate, or release before 50% to cancel and stay on current image.

## Galleries

- **[Presence VR180](https://a1rb4ck.github.io/presence/)** - Stereoscopic VR180 photos from the EU Presence XR project

## Credits

Shot with a [custom Insta360 One RS 1-inch](https://www.thingiverse.com/thing:5908991) stereo fisheye rig.

The web viewer is adapted from [LifeCastVR](https://github.com/fbriggs/lifecast_public/tree/main/web) using [Three.js](https://threejs.org/) WebGL/WebXR.

## Build

To build `lifecast.min.js`, use the following command:

```bash
npm install
npm run build
```

The output will be in the `dist` directory.

Requires `node` and `npm` to be installed.

## Running a local server with HTTPS

You must first run a command to generate a self-signed certificate, e.g. on OS X:

```bash
openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out certificate.pem
```

Then you can run the web server with HTTPS like so:

```bash
python3 local_server_https.py
```

Find the IP address of this computer (the one running the server).
On a Quest or Vision Pro (it MUST be on the same LAN), go to the following URL in the browser:

<ip address>:443/index.html
