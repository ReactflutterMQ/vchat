import { app, BrowserWindow, globalShortcut, ipcMain, Menu, protocol, net } from 'electron';
import url from 'url';
import path from 'path';
import started from 'electron-squirrel-startup';
import { ChatCompletion } from '@baiducloud/qianfan';
import OpenAI from 'openai';
// import fs from 'fs/promises';
import fs from 'fs/promises';
import util from 'util';
import { lookup } from 'mime-types';
import { CreateChatProps } from './types';
import { convertMessages } from './helper';
import 'dotenv/config';
import { messages } from './testData';
import { createProvider } from './providers/createProvider';
import { configManager } from './config';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = async () => {
  // 初始化配置
  // await configManager.load();
  const config = await configManager.load();
  console.log('config', util.inspect(config, { depth: null, colors: true }));

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // 添加配置相关的 IPC 处理程序
  ipcMain.handle('get-config', () => {
    return configManager.get();
  })

  ipcMain.handle('update-config', async (event, newConfig) => {
    return await configManager.update(newConfig);
  })

  ipcMain.handle('copy-image-to-user-dir', async (event, sourcePath: string) => {
    const userDataPath = app.getPath('userData');
    const imagesDir = path.join(userDataPath, 'images');
    await fs.mkdir(imagesDir, { recursive: true });
    const fileName = path.basename(sourcePath);
    const destPath = path.join(imagesDir, fileName);
    await fs.copyFile(sourcePath, destPath);
    return destPath;
  })
  ipcMain.on('start-chat', async (event, data: CreateChatProps) => {
    console.log('hey', data);
    const { providerName, messages, messageId, selectedModel } = data;
    
    try {
      // const convertedMessages = await convertMessages(messages);
      const provider = createProvider(providerName);
      const stream = await provider.chat(messages, selectedModel)
      for await (const chunk of stream) {
        const content = {
          messageId,
          data: chunk
        }
        mainWindow.webContents.send('update-message', content); // 发送消息到渲染进程
      }
    } catch (error) {
      console.log('Chat error:', error);
      const errorContent = {
        messageId,
        data: {
          is_end: true,
          result: error instanceof Error ? error.message : '与AI服务通信时发生错误',
          is_error: true
        }
      }
      mainWindow.webContents.send('update-message', errorContent); // 发送消息到渲染进程
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

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'safe-file',
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
    },
  },
]);
app.whenReady().then(async () => {
  // protocol.handle('safe-file', async (request) => {
  //   console.log('request.url', request.url)
  //   const filePath = decodeURIComponent(request.url.slice('safe-file://'.length));
  //   console.log('filePath', filePath);
  //   const data = await fs.readFile(filePath);
  //   return new Response(data, {
  //     status: 200,
  //     headers: {
  //       'Content-Type': lookup(filePath) as string
  //     }
  //   })
  // })
  protocol.handle('safe-file', async (request) => {
    const userDataPath = app.getPath('userData')
    const imageDir = path.join(userDataPath, 'images')
    const filePath = path.join(
      decodeURIComponent(request.url.slice('safe-file:/'.length))
    )
    const filename = path.basename(filePath)
    const fileAddr = path.join(imageDir, filename)
    const newFilePath = url.pathToFileURL(fileAddr).toString()
    return net.fetch(newFilePath)
  })
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
