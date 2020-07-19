import { Button, Heading, FlipperDevicePlugin, FlexColumn, styled, colors, Text, Device, AndroidDevice } from 'flipper';
import { AdbBridge, ClearDataCommand, RestartCommand, KillCommand, ClearDataAndRestartCommand, UninstallCommand } from './command/AllCommands'
import React from 'react';
import adb from 'adbkit';
import { NameForm } from './NameForm'


type ShellCallBack = (output: string) => any;

type State = {
    applicationId: string;
    inputText: string;
};

const PACKAGE_NAME = 'com.facebook.flipper.sample'//change for your package name

const Container = styled(FlexColumn)({
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
    border: '3px red solid',
    margin: 130,
});

const MyView = styled.div({
    fontSize: 22,
    color: colors.red
});

const Status = styled(Text)({
    fontSize: 14,
    fontFamily: 'monospace',
    padding: '10px 5px',
    userSelect: 'auto',
    WebkitUserSelect: 'auto',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
});

export default class Example extends FlipperDevicePlugin<State, any, any> {

    static supportsDevice(device: Device) {
        return device.os === 'Android';
    }

    constructor(props: any) {
        super(props)

        this.state = { applicationId: PACKAGE_NAME, inputText: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    init() {
    }

    handleChange(event: any) {
        console.log('hadleChange called ' + event)
        this.setState({ inputText: event.target.value });
    }

    handleSubmit(event: any) {
        console.log('hadleSubmit called ' + event)
        this.setState({applicationId: this.state.inputText})
        event.preventDefault();
    }

    //this will probably go to the AdbBridge in future
    executeShell = (callback: ShellCallBack, command: string) => {
        return (this.device as AndroidDevice).adb
            .shell(this.device.serial, command)
            .then(adb.util.readAll)
            .then(function (output: { toString: () => { trim: () => string } }) {
                return callback(output.toString().trim());
            });
    };

    adbBridge = new AdbBridge(this.executeShell);

    restartApp = () => {
        new RestartCommand(this.adbBridge, this.state.applicationId).execute();
    }

    clearData = () => {
        new ClearDataCommand(this.adbBridge, this.state.applicationId).execute();
    }

    clearDataAndRestart = () => {
        new ClearDataAndRestartCommand(this.adbBridge, this.state.applicationId).execute();
    }

    killApp = () => {
        new KillCommand(this.adbBridge, this.state.applicationId).execute();
    }

    uninstallApp = () => {
        new UninstallCommand(this.adbBridge, this.state.applicationId).execute();
    }

    render() {
        return (
            <Container>
                <Heading level={1}>Meat ADB Flipper</Heading>
                <NameForm value={this.state.inputText} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
                <MyView>
                    <Text>{`AppId: ${this.state.applicationId}`}</Text>
                </MyView>
                <Button style={{width: 200}}  onClick={this.restartApp.bind(this)}>Restart app</Button>
                <Button style={{width: 200}} onClick={this.clearData.bind(this)}>Clear App Data</Button>
                <Button style={{width: 200}}  onClick={this.clearDataAndRestart.bind(this)}>Clear App Data and Restart</Button>
                <Button style={{width: 200}}  onClick={this.uninstallApp.bind(this)}>Uninstall app</Button> 
                <Button style={{width: 200}}  onClick={this.killApp.bind(this)}>Kill app</Button>
                <Status>This plugin is open source. All contributions are welcome. <a href='https://github.com/maxim-pandra/adb-flipper-plugin' target="_blank">https://github.com/maxim-pandra/adb-flipper-plugin</a></Status>
            </Container >
        );
    }
}
