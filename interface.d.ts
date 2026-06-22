import { CreateChatProps, OnUpdatedCallback } from "./src/types";
export interface IElectronAPI {
    getFilePath: (file: File) => string;
    startChat: (data: CreateChatProps) => void;
    onUpdateMessage: (callback: OnUpdatedCallback) => any;
    copyImageToUserDir: (sourcePath: string) => Promise<string>;
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}
