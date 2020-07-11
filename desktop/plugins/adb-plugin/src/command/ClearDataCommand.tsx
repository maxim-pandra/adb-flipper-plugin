import {AdbBridge} from './AdbBridge'
import {Command} from './Command'

const COMMAND_CLEAR_CACHE = `pm clear `;

export class ClearDataCommand implements Command {
    private adbBridge: AdbBridge;
    private appId: string;

    constructor(receiver: AdbBridge, appId: string) {
        this.adbBridge = receiver;
        this.appId = appId;
    }

    public execute(): void {
        console.log(`ClearDataCommand: adb invoker should clear app data...`);
        this.adbBridge.callAdb(COMMAND_CLEAR_CACHE + this.appId);
    }
}