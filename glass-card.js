const video = document.querySelector('#bg-video');
const card = document.querySelector('[data-glass-card]');
const duplicate = document.querySelector('#dup-video-container');
const image = document.querySelector('#dup-image');
const context = image.getContext('2d');
const DUP_PIXEL_RATIO = 1;

function drawFrame() {
  const rect = card.getBoundingClientRect();
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;

  if (rect.width && rect.height && video.videoWidth && video.videoHeight) {
    // The duplicate is viewport-sized so filter edge artifacts stay outside the clipped card.
    duplicate.style.left = `${-rect.left}px`;
    duplicate.style.top = `${-rect.top}px`;
    duplicate.style.width = `${viewportWidth}px`;
    duplicate.style.height = `${viewportHeight}px`;

    const pixelWidth = Math.round(viewportWidth * DUP_PIXEL_RATIO);
    const pixelHeight = Math.round(viewportHeight * DUP_PIXEL_RATIO);
    // Keep this at 1×: the soft refraction does not justify the added filter cost on high-density screens.
    if (image.width !== pixelWidth || image.height !== pixelHeight) {
      image.width = pixelWidth;
      image.height = pixelHeight;
    }

    const cover = Math.max(viewportWidth / video.videoWidth, viewportHeight / video.videoHeight);
    const sourceWidth = viewportWidth / cover;
    const sourceHeight = viewportHeight / cover;
    const sourceX = (video.videoWidth - sourceWidth) / 2;
    const sourceY = (video.videoHeight - sourceHeight) / 2;
    try {
      context.drawImage(video, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, pixelWidth, pixelHeight);
    } catch {
      // A decoded frame is not guaranteed during initial video startup.
    }
  }
  requestAnimationFrame(drawFrame);
}

requestAnimationFrame(drawFrame);
