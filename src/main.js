import { app, BrowserWindow, ipcMain as ipc } from 'electron'
import { enableLiveReload } from 'electron-compile'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'

const isDevMode = process.execPath.match(/[\\/]electron/)

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let backgroundWindow


const createWindow = () => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
	})

	// and load the index.html of the app.
	mainWindow.loadURL(`file://${__dirname}/index.html`)
	// Emitted when the window is closed.
	mainWindow.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null
		backgroundWindow.close()
	})

	if (isDevMode) {
		enableLiveReload()
		installExtension(VUEJS_DEVTOOLS)
			.then(() => {
				mainWindow.webContents.openDevTools()
			})
	}
}

const createBackgroundWindow = () => {
	backgroundWindow = new BrowserWindow({ show: false })
	backgroundWindow.loadURL(`file://${__dirname}/dedicated.html`)
	backgroundWindow.on('closed', () => {
		backgroundWindow = null
	})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
	createWindow()
	createBackgroundWindow()
	enableLiveReload()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow()
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipc.on('sequencer-start', () => {
	backgroundWindow.webContents.send('sequencer-start')
})
ipc.on('sequencer-stop', () => {
	backgroundWindow.webContents.send('sequencer-stop')
})
ipc.on('sequencer-tick', (event, tick) => {
	mainWindow.webContents.send('sequencer-tick', tick)
})
