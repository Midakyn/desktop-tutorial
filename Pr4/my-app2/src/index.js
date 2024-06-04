const {app, BrowserWindow, desktopCapturer, ipcMain} = require('electron');
const path = require('path');

function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			enableRemoteModule: true,
			nodeIntegration: true
		}
	});

	mainWindow.loadFile(path.join(__dirname, 'index.html'));

	mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

ipcMain.handle('get-sources', () => {
	return desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
		for (const source of sources) {
			console.log(source)
			return source.id
		}
	})
})
