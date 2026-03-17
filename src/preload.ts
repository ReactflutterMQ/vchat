// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { ipcRenderer, contextBridge } from "electron";
import { CreateChatProps, OnUpdatedCallback } from "./types";

contextBridge.exposeInMainWorld("electronAPI", {
    startChat: (data: CreateChatProps) => ipcRenderer.send("start-chat", data),//渲染进程向主进程发送消息
    onUpdateMessage: (callback:OnUpdatedCallback) => ipcRenderer.on("update-message", (_event, data) => callback(data)),//渲染进程监听主进程发送的消息
})