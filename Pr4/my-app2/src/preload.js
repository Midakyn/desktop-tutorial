// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('electron', {
	getSources: () => ipcRenderer.invoke('get-sources'),
});
const { writeFile } = require("fs");
const { dialog } = remote;

const startBtn = document.getElementById("startBtn");
startBtn.onclick = e => {
  mediaRecorder.start();
  startBtn.classList.add("is-danger");
  startBtn.innerText = "Запись";
};

const stopBtn = document.getElementById("stopBtn");

stopBtn.onclick = e => {
  mediaRecorder.stop();
  startBtn.classList.remove("is-danger");
  startBtn.innerText = "Старт";
};

// Captures all recorded chunks
function handleDataAvailable(e) {
  console.log("Видео записано!");
  recordedChunks.push(e.data);
}

// Saves the video file on stop
async function handleStop(e) {
  const blob = new Blob(recordedChunks, {
    type: "video/webm; codecs=vp9"
  });

  const buffer = Buffer.from(await blob.arrayBuffer());

  const { filePath } = await dialog.showSaveDialog({
    buttonLabel: "Save video",
    defaultPath: `vid-${Date.now()}.webm`
  });

  console.log(filePath);

  writeFile(filePath, buffer, () => console.log("video saved successfully!"));
}
