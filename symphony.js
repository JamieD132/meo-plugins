async function createVideoWithText(text) {
  const canvas = document.createElement('canvas');
  canvas.width = 716;
  canvas.height = 477;
  const ctx = canvas.getContext('2d');

  const loadImage = () => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.crossOrigin = 'Anonymous';
      img.src = "https://raw.githubusercontent.com/3r1s-s/meo-plugins/main/assets/symphony/symphony.jpg";
    });
  };

  const drawImageAndText = async () => {
    try {
      const img = await loadImage();
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'black';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    } catch (error) {
      console.error("Error loading image:", error);
      ctx.fillStyle = "blue";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.font = "24px Arial";
      ctx.fillText("Image Load Failed", canvas.width / 2, canvas.height / 2);
    }
  };

  const audio = new Audio();
  audio.crossOrigin = 'Anonymous';
  audio.src = 'https://raw.githubusercontent.com/3r1s-s/meo-plugins/main/assets/symphony/symphony.mp3';

  await drawImageAndText();

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const audioSource = audioContext.createMediaElementSource(audio);
  const audioDestination = audioContext.createMediaStreamDestination();
  audioSource.connect(audioDestination);

  const stream = canvas.captureStream(30); // 30 fps video stream
  const audioTracks = audioDestination.stream.getAudioTracks();
  audioTracks.forEach(track => stream.addTrack(track)); // Add audio tracks to the stream

  const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
  const chunks = [];

  return new Promise((resolve, reject) => {
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      const finalBlob = new Blob(chunks, { type: 'video/webm' });
      const file = new File([finalBlob], "symphony.webm", { type: 'video/webm' });
      addAttachment(file);
      resolve(finalBlob);
    };

    mediaRecorder.onerror = (e) => reject(e);

    mediaRecorder.start();
    audio.play();

    setTimeout(() => {
      mediaRecorder.stop();
      audio.pause();
      audio.currentTime = 0;
    }, 10000); // Stop after 10 seconds
  });
}

const actuallysendpost = sendpost;
sendpost = async function () {
  const msgbox = document.getElementById('msg');
  const message = msgbox.value.trim();

  if (message.endsWith(' /symphony')) {
    const text = message.slice(0, -10);
    if (text.trim() == "") return;
    msgbox.value = "";
    alert("The plugin will start to process the video - please wait until the attachment is added");
    msgbox.disabled = true;
    await createVideoWithText(text).catch((error) => {
      alert("An error occurred: " + error);
      msgbox.disabled = false;
      return;
    });
    msgbox.disabled = false;
    return;
  } else {
    actuallysendpost();
    return;
  }
};
