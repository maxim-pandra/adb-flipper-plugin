import {AdbBridge} from './AdbBridge'
import {Command} from './Command'

export class StartDefaultActivityCommand implements Command {
    private adbBridge: AdbBridge;
    private appId: string;

    constructor(receiver: AdbBridge, appId: string) {
        this.adbBridge = receiver;
        this.appId = appId;
    }

    public execute(): void {
        console.log(`ClearDataCommand: adb invoker should clear app data...`);
        this.adbBridge.callAdb(this.getStartApplicationCommand(this.appId));
    }

    getStartApplicationCommand(appId: string): string {
        const COMMAND_START_APPLICATON_START = 'am start -n $(pm dump '
        const COMMAND_START_APPLICATON_END = ' | grep -A 1 MAIN | sed -n 2p | awk \'{print $2}\')'
        return COMMAND_START_APPLICATON_START + appId + COMMAND_START_APPLICATON_END
    }
}