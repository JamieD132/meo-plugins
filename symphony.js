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
        img.src = "https://github.com/NotFenixio/meo-plugins/raw/main/assets/symphony/symphony.jpg";
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
  
    const audio = new Audio('https://github.com/3r1s-s/meo-plugins/raw/main/assets/symphony/symphony.mp4');
    
    await drawImageAndText();
    const stream = canvas.captureStream(30); // 30 FPS
  
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioSource = audioContext.createMediaElementSource(audio);
    const audioDestination = audioContext.createMediaStreamDestination();
    audioSource.connect(audioDestination);
    stream.addTrack(audioDestination.stream.getAudioTracks()[0]);
  
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];
  
    return new Promise((resolve) => {
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
  
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/mp4" });
        addAttachment(blob);
        resolve(blob);
      };
  
      mediaRecorder.start();
      audio.play();
  
      setTimeout(() => {
        mediaRecorder.stop();
        audio.pause();
        audio.currentTime = 0;
        stream.getTracks().forEach((track) => track.stop());
      }, 10000);
    });
  }

const actuallysendpost = sendpost;
sendpost = async function() {
    const msgbox = document.getElementById('msg');
    const message = msgbox.value.trim();
    
    if (message.endsWith(' /symphony')) {
        const text = message.slice(0, -10);
        if (text.trim() == "")
        alert("The plugin will start to process the video - please wait until the attachment is added")
        createVideoWithText(text).catch((error) => alert("An error occurred" + error));
    }
    actuallysendpost();
};
