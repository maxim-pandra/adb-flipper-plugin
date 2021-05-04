import {AdbBridge, ClearDataCommand, StartDefaultActivityCommand, Command} from './AllCommands'

export class ClearDataAndRestartCommand implements Command {

    private adbBridge: AdbBridge;
    private appId: string;

    constructor(adbBridge: AdbBridge, appId: string) {
        this.adbBridge = adbBridge;
        this.appId = appId;
    }

    public execute(): void {
        new ClearDataCommand(this.adbBridge, this.appId).execute();
        new StartDefaultActivityCommand(this.adbBridge, this.appId).execute();
    }
}