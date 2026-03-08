import { app, BrowserWindow, globalShortcut, Menu } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { ChatCompletion } from '@baiducloud/qianfan';
import OpenAI from 'openai';
import fs from 'fs/promises';
import 'dotenv/config';

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

  /**
   * 通义千问大模型
   */
  const client = new OpenAI({
    apiKey: process.env.ALI_API_KEY,
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1'
  })
  const imageBuffer = await fs.readFile('c:/Users/LEGION/Desktop/A.jpg');
  const base64Image = imageBuffer.toString('base64');
  // console.log('base64', base64Image);
  const resp = await client.chat.completions.create({
    messages: [{
      role: 'user',
      content: [
        { type: 'text', text: '图中是什么动物？' },
        // { type: 'text', text: '如果是动漫人物,你知道它来自于哪个动漫吗？' },
        { type: 'image_url', image_url: { url: `data:image/png;base64,${base64Image}` } }
      ]
    }],
    model: 'qwen-vl-plus'
  })
  // const resp = await client.chat.completions.create({
  //   messages: [
  //     { role: 'system', content: '你现在是一只卡通片里的可爱小狗,请模仿往往队长的口吻进行回答' },
  //     { role: 'user', content: '请问队长,老鼠为什么有害呢?' }
  //   ],
  //   model: 'qwen-turbo',
  //   // stream: true
  // })
  console.log('resp', resp.choices[0].message);
  // for await (const chunk of stream) {
  //   console.log(chunk.choices[0].delta);
  // }

  /**
   * 百度千帆大模型
   */ 
  // const client = new ChatCompletion()  
  // const stream = await client.chat({
  //   messages: [
  //     // { role: 'user', content: '什么是光合作用？' },
  //     { "role": "user", "content": "你好" },
  //     { "role": "assistant", "content": "你好，有什么我可以帮助你的吗？" },
  //     { "role": "user", "content": "我在上海，周末可以去哪里玩？" },
  //     { "role": "assistant", "content": "上海有很多好玩的地方，比如外滩、城隍庙、豫园等等。" },
  //     { "role": "user", "content": "周末这里的天气怎么样？" }
  //   ],
  //   stream: true,
  // }, 'ERNIE-Speed-Pro-128K')//ERNIE-Speed-128K ERNIE-3.5-128K ERNIE-Speed-Pro-128K qianfan-sug-8k
  
  // for await (const chunk of stream) {
  //   console.log(chunk);
  // }
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
