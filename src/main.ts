import { app, BrowserWindow, globalShortcut, ipcMain, Menu } from 'electron';
import path from 'path';
import started from 'electron-squirrel-startup';
import { ChatCompletion } from '@baiducloud/qianfan';
import OpenAI from 'openai';
// import fs from 'fs/promises';
import fs from 'fs';
import { CreateChatProps } from './types';
import 'dotenv/config';
import { messages } from './testData';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = async () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  ipcMain.on('start-chat', async (event, data: CreateChatProps) => {
    console.log('hey', data);
    const { providerName, content, messageId, selectedModel } = data;
    if (providerName === 'qianfan') {
      const client = new ChatCompletion()
      const stream = await client.chat({
        messages: [
          { role: 'user', content }
        ],
        stream: true
      }, selectedModel);
      for await (const chunk of stream) {
        const { is_end, result } = chunk;
        const content = {
          messageId,
          data: {
            is_end,
            result
          }
        }
        mainWindow.webContents.send('update-message', content); // 发送消息到渲染进程
      }
    }
  })

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // 注册一个'CmdOrCtrl+R'+'Shift'作为快捷键
  globalShortcut.register('CommandOrControl+R', () => {
    mainWindow.webContents.reload();
  })
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  Menu.setApplicationMenu(null); // 移除菜单栏
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
