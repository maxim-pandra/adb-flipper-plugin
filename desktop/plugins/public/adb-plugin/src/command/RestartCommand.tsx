import {AdbBridge, KillCommand, StartDefaultActivityCommand, Command} from './AllCommands'

export class RestartCommand implements Command {

    private adbBridge: AdbBridge;
    private appId: string;

    constructor(adbBridge: AdbBridge, appId: string) {
        this.adbBridge = adbBridge;
        this.appId = appId;
    }

    public execute(): void {
        const killCommand = new KillCommand(this.adbBridge, this.appId);
        const startDefaultActivityCommand = new StartDefaultActivityCommand(this.adbBridge, this.appId);

        killCommand.execute()
        startDefaultActivityCommand.execute()    }
}