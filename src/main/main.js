import { app, BrowserWindow, Menu, ipcMain as ipc } from 'electron'
import { enableLiveReload } from 'electron-compile'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'

const isDevMode = process.execPath.match(/[\\/]electron/)

let mainWindow

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
	})
	mainWindow.loadURL(`file://${__dirname}/../index.html`)
	mainWindow.on('closed', () => {
		mainWindow = null
	})
	if (isDevMode) {
		enableLiveReload()
		installExtension(VUEJS_DEVTOOLS)
			.then(() => {
				mainWindow.webContents.openDevTools()
			})
	}
}

app.on('ready', () => {
	createWindow()
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('toggleActive', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow()
	}
})

