javascript: (function() {
  const transformTranspose = (header, input) => {
    const idx =
      header + Math.floor(Math.random() * (input.length - header - 1));
    const tmp = input[idx];
    input[idx] = input[idx + 1];
    input[idx + 1] = tmp;
    return input;
  };

  const transformSubstitute = (header, input) => {
    const by = Math.floor(Math.random() * 256);
    const idx = header + Math.floor(Math.random() * (input.length - header));
    input[idx] = by;
    return input;
  };

  const glitchImage = image => {
    try {
      image.onload = () => {};
      image.style.backgroundColor = '#262626';

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      context.drawImage(image, 0, 0);

      const data = canvas.toBlob(blob => {
        const fileReader = new FileReader();
        fileReader.onload = event => {
          const data =
            blob.size === event.target.result.byteLength
              ? new Uint8Array(event.target.result)
              : null;

          image.onerror = () => {
            image.src = URL.createObjectURL(blob);
          };

          const glitchOnce = () => {
            const errors = Math.random() * 10;
            let corrupted = data.slice(0);
            for (let i = 0; i < errors; i++) {
              corrupted = Math.random() > 0.5 ? transformTranspose(100, corrupted) : transformSubstitute(100, corrupted);
            }

            const corruptBlob = new Blob([corrupted], { type: 'image/png' });
            const corruptSrc = URL.createObjectURL(corruptBlob);

            image.src = corruptSrc;
          };

          const glitchTimeout = (max = 300) => {
            glitchOnce();
            window.setTimeout(() => {
              glitchTimeout(max);
            }, Math.random() * max / 2 + Math.random() * max / 2);
          };

          glitchTimeout();
        };
        fileReader.readAsArrayBuffer(blob);
      }, 'image/jpeg');
    } catch (e) {
      return false;
    }
  };

  const images = document.querySelectorAll('img');
  images.forEach(i => {
    i.complete
      ? glitchImage(i)
      : (i.onload = event => glitchImage(event.target));
  });
})();
