// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { ipcRenderer, contextBridge, webUtils } from "electron";
import { CreateChatProps, OnUpdatedCallback, AppConfig } from "./types";

contextBridge.exposeInMainWorld("electronAPI", {
    getFilePath: (file: File) => webUtils.getPathForFile(file),
    startChat: (data: CreateChatProps) => ipcRenderer.send("start-chat", data),//渲染进程向主进程发送消息
    onUpdateMessage: (callback:OnUpdatedCallback) => ipcRenderer.on("update-message", (_event, data) => callback(data)),//渲染进程监听主进程发送的消息
    copyImageToUserDir: (sourcePath: string) => ipcRenderer.invoke("copy-image-to-user-dir", sourcePath),//渲染进程向主进程发送异步消息
    getConfig: () => ipcRenderer.invoke("get-config"),//渲染进程向主进程发送异步消息
    updateConfig: (config: Partial<AppConfig>) => ipcRenderer.invoke("update-config", config),//渲染进程向主进程发送异步消息
    onMenuNewConversation: (callback: () => void) => ipcRenderer.on('menu-new-conversation', () => callback()),//渲染进程监听主进程发送的消息
    onMenuOpenSettings: (callback: () => void) => ipcRenderer.on('menu-open-settings', () => callback()),//渲染进程监听主进程发送的消息
})