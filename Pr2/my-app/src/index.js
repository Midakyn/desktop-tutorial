const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const os = require('os-utils');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 400,
    icon: __dirname + "/images.jpg",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    }
  });

  // Load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  os.cpuUsage(function (v) {
    console.log("CPU Usage (%): " + v * 100);
    console.log("Mem Usage (%): " + os.freememPercentage() * 100);
    console.log("Total Mem (GB): " + os.totalmem() / 1024);
    console.log('Platform :', os.platform());
  });

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

os.cpuUsage(function(v) {
  console.log("CPU Usage (%): "+v*100);
  mainWindow.webContents.send("cpu", v * 100);
  console.log("Mem Usage (%): "+os.freememProcentage() *100);
  mainWindow.webContents.send("mem", os.freememPercentage() * 100);
  console.log("Total Mem (GB): "+os.totalmem() /1024);
  mainWindow.webContents.send("total-mem", os.totalmem() / 1024);
  });
  
