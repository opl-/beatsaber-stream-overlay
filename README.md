# Beat Saber Stream Overlay

This is a simple stream overlay for Beat Saber that uses the [Beat Saber HTTP Status plugin](https://github.com/opl-/beatsaber-http-status).

## Users

In order to use the overlay, visit [the configuration page](<https://cdn.rawgit.com/opl-/beatsaber-stream-overlay/v1.0.2/dist/index.html>) to change the options. Next, copy the generated link to overlay from the configuration page and add it as a browser source in your streaming software.

## Developers

The HTTP Status plugin protocol documentation can be found [here](https://github.com/opl-/beatsaber-http-status/blob/master/protocol.md).

```bash
# Download the project
git clone https://github.com/opl-/beatsaber-stream-overlay.git
cd beatsaber-stream-overlay
npm install

# Code
npm run dev

# Build
npm run build
```
