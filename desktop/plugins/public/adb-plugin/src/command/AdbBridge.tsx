export class AdbBridge {

    adbIvoker: any

    constructor(callback: any) {
        this.adbIvoker = callback
    }

    public callAdb(commandToCall: string): void {
        console.log(`ADB bridge: Calling command (${commandToCall}...)`)
        this.adbIvoker((output: string) => {console.log(output)}, commandToCall);
    }
}