window.addEventListener('DOMContentLoaded', () => {
	const videoSelectBtn = document.getElementById("videoSelectBtn");
	videoSelectBtn.onclick = async function () {
		const sourceId = await window.electron.getSources();

		const stream = await navigator.mediaDevices.getUserMedia({
			audio: false,
			video: {
				mandatory: {
					chromeMediaSource: 'desktop',
					chromeMediaSourceId: sourceId,
					minWidth: 1280,
					maxWidth: 1280,
					minHeight: 720,
					maxHeight: 720
				}
			}
		})

		const video = document.querySelector('video')
		video.srcObject = stream
		video.onloadedmetadata = () => video.play()
	};
})
let mediaRecorder;
const recordedChunks = [];
async function selectSource(source) {

  videoSelectBtn.innerText = source.name;

  const constraints = {
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: source.id
      }
    }
  };

  // Create a Stream
  const stream = await navigator.mediaDevices
    .getUserMedia(constraints);

  // Preview the source in a video element
  videoElement.srcObject = stream;
  videoElement.play();

  // Create the Media Recorder
  const options = { mimeType: 'video/webm; codecs=vp9' };
  mediaRecorder = new MediaRecorder(stream, options);

  // Register Event Handlers
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.onstop = handleStop;
}

