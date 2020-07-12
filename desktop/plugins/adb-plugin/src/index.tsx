import { Button, Heading, FlipperDevicePlugin, FlexColumn, styled, colors, Text, Device, AndroidDevice } from 'flipper';
import { AdbBridge, ClearDataCommand, RestartCommand, KillCommand, ClearDataAndRestartCommand, UninstallCommand } from './command/AllCommands'
import React from 'react';
import adb from 'adbkit';
import { NameForm } from './NameForm'


type ShellCallBack = (output: string) => any;

type State = {
    prompt: string;
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
    overflow: 'hidden',
    textOverflow: 'ellipsis'
});

export default class Example extends FlipperDevicePlugin<State, any, any> {

    static supportsDevice(device: Device) {
        return device.os === 'Android';
    }

    state = {
        prompt: 'Execute ADB command you like'
    };

    init() {
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
        new RestartCommand(this.adbBridge, PACKAGE_NAME).execute();
    }

    clearData = () => {
        new ClearDataCommand(this.adbBridge, PACKAGE_NAME).execute();
    }

    clearDataAndRestart = () => {
        new ClearDataAndRestartCommand(this.adbBridge, PACKAGE_NAME).execute();
    }

    killApp = () => {
        new KillCommand(this.adbBridge, PACKAGE_NAME).execute();
    }

    uninstallApp = () => {
        new UninstallCommand(this.adbBridge, PACKAGE_NAME).execute();
    }

    render() {
        return (
            <Container>
                <Heading level={1}>Meat ADB Flipper</Heading>
                <MyView>
                    <Text>{this.state.prompt}</Text>
                </MyView>
                <Status>Status: here should be status of the most recent adb command</Status>
                <NameForm />
                <Button onClick={this.restartApp.bind(this)}>Restart app</Button>
                <Button onClick={this.clearData.bind(this)}>Clear App Data</Button>
                <Button onClick={this.clearDataAndRestart.bind(this)}>Clear App Data and Restart</Button>
                <Button onClick={this.uninstallApp.bind(this)}>Uninstall app</Button> 
                <Button onClick={this.killApp.bind(this)}>Kill app</Button>
            </Container >
        );
    }
}
