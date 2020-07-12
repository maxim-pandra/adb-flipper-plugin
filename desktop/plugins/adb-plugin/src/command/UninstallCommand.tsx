import {AdbBridge} from './AdbBridge'
import {Command} from './Command'

const COMMAND_UNINSTALL_APPLICATON = `pm uninstall -k --user 0 `;

export class UninstallCommand implements Command {
    private adbBridge: AdbBridge;
    private appId: string;

    constructor(receiver: AdbBridge, appId: string) {
        this.adbBridge = receiver;
        this.appId = appId;
    }

    public execute(): void {
        console.log(`UninstallCommand: adb invoker should uninstall application`);
        this.adbBridge.callAdb(COMMAND_UNINSTALL_APPLICATON + this.appId);
    }
}