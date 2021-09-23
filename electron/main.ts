import { app, BrowserWindow } from 'electron';

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    minWidth: 1200,
    minHeight: 350,
    width: 1200,
    height: 350,
  });

  if (process.env.NODE_ENV === 'develop') {
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.setMenu(null);
  }

  mainWindow.loadFile('build/electron/renderer/index.html');

  mainWindow.on('closed', () => (mainWindow = null));
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
