import {AdbBridge} from './AdbBridge'
import {Command} from './Command'

const COMMAND_STOP_APPLICATON = `am force-stop `;

export class KillCommand implements Command {
    private adbBridge: AdbBridge;
    private appId: string;

    constructor(receiver: AdbBridge, appId: string) {
        this.adbBridge = receiver;
        this.appId = appId;
    }

    public execute(): void {
        console.log(`ComplexCommand: adb invoker should stop application`);
        this.adbBridge.callAdb(COMMAND_STOP_APPLICATON + this.appId);
    }
}