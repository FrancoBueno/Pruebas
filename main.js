const video = document.getElementById("ar-video");
const canvas = document.getElementById("ar-canvas");
const markerInfo = document.getElementById("marker-info");

const constraints = { video: { facingMode: "environment" } };

navigator.mediaDevices.getUserMedia(constraints)
  .then(function (stream) {
    video.srcObject = stream;
    video.onloadedmetadata = function () {
      video.play();
    };
  })
  .catch(function (error) {
    console.error("No se pudo acceder a la cámara: " + error);
  });

video.addEventListener("play", function () {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  const markerImage = new Image();
  markerImage.src = "./imgs/img.png"; // Reemplaza con la ruta de tu imagen de marcador

  function detectMarker() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(markerImage, 0, 0, canvas.width, canvas.height);
    const markerData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Realiza aquí la detección de marcadores (por ejemplo, comparando pixeles en markerData)

    if (markerDetectado) {
      markerInfo.style.display = "block";
    } else {
      markerInfo.style.display = "none";
    }

    requestAnimationFrame(detectMarker);
  }


  detectMarker();
});
