const electron = require("electron");
const ipcRenderer = electron.ipcRenderer;

ipcRenderer.on("cpu", (event, data) => {
  const roundedData = data.toFixed(2); 
  document.getElementById("cpu").innerHTML = roundedData;
  console.log("cpu", roundedData);
});

ipcRenderer.on("mem", (event, data) => {
  const roundedData = data.toFixed(2); 
  document.getElementById("mem").innerHTML = roundedData;
  console.log("mem", roundedData);
});

ipcRenderer.on("total-mem", (event, data) => {
  const roundedData = (data / 1024).toFixed(2); 
  document.getElementById("total-mem").innerHTML = roundedData;
  console.log("total-mem", roundedData);
});
