# Presence in VR180

[Presence in omnispherical VR180](https://a1rb4ck.github.io/presence/)

You can view the images in Virtual Reality on any HMD (Meta Quest 2 or 3, Pico, Apple Vision Pro, etc.).
Just use the link above in the headset web browser.

If you do not have a headset, you will lose the stereoscopic experience, but you can still explore the hemispherical (left eye image) in your web browser.

This was shot with a [custom Insta360 One RS 1-inch](https://www.thingiverse.com/thing:5908991) to get 2 stereo fisheye images.

The web viewer is based on [LifeCastVR](https://github.com/fbriggs/lifecast_public/tree/main/web) open-sourced works, with the incredible [ThreeJS](https://threejs.org/examples/?q=webxr#webxr_vr_video) WebGL WebXR library.

## Based on top of open-source immersive volumetric player by [lifecast.ai](https://lifecast.ai)

Lifecast is dedicated to pushing the limits of immersive volumetric media.
We created a new format for volumetric photos and videos called 'ldi3' which enables real-time 6DOF photorealistic rendering on a wide variety of platforms.

Visit https://lifecast.ai for some demos of what can be done with ldi3 and NeRF, which work on Vision Pro and Quest!

There are a lot of ways to create and edit ldi3. In the /nerf directory, we provide an open source nerf video engine that compresses into ldi3 for web streaming of volumetric/holographic video. We also offer some commercial software for working with ldi3:

* [Volurama](https://volurama.com/) - a Windows/Mac GUI for the NeRF engine here, for reconstructing static scenes from iPhone video input.
* [Volumetric Video Editor](https://lifecastvr.com/volumetric_video_editor.html) - Windows/Mac tool for converting VR180 to ldi3 (not NeRF-based, uses fisheye stereo depth estimation).
* [holovolo.tv](https://holovolo.tv) - text-to-ldi3 with Stable Diffusion

## Immersive Photo Player for WebGL / WebXR / Javascript

Here is a minimal example of embedding VR180 player in a div.directory.

```html
<html>
  <head>
    <script src="dist/lifecast.min.js"></script>
  </head>
  <body>
    <div id="player_div" style="width: 600px; height: 500px;"></div>
    <script>
    const media_playlist = [
      ["media/EU Presence - General Assembly in Amsterdam Jul.2025.jpg"],
      ["media/EU Presence - Artanim physics-based demo Jul.2025.jpg"]
    ];
    LifecastVideoPlayer.init({
      _format: "vr180",
      _media_playlist: media_playlist,
    });
    </script>
  </body>
</html>
```

For more examples, see the Lifecast [web/ directory](https://github.com/lifecastai/lifecast/tree/main/web).

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
