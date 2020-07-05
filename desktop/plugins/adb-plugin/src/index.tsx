import { Button, Heading, FlipperDevicePlugin, FlexColumn, styled, colors, Text, Device, AndroidDevice } from 'flipper';
import React from 'react';
import adb from 'adbkit';
import { StatusBarState } from './StatusBarState'
import { NameForm } from './NameForm'

type ShellCallBack = (output: string) => any;

type State = {
    prompt: string;
};

const PACKAGE_NAME = 'com.facebook.flipper.sample'//change for your package name
const COMMAND_STOP_APPLICATON = `am force-stop ${PACKAGE_NAME}`;
const COMMAND_START_APPLICATON = `am start -n $(pm dump ${PACKAGE_NAME} | grep -A 1 MAIN | sed -n 2p | awk \'{print $2}\')`;

const COMMAND_CLEAR_CACHE = `pm clear ${PACKAGE_NAME}`;


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

export default class Example extends FlipperDevicePlugin<State, any, any> {

    static supportsDevice(device: Device) {
        return device.os === 'Android';
    }

    init() {
    }

    static Status = styled(Text)({
        fontSize: 14,
        fontFamily: 'monospace',
        padding: '10px 5px',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    });

    executeShell = (callback: ShellCallBack, command: string) => {
        return (this.device as AndroidDevice).adb
            .shell(this.device.serial, command)
            .then(adb.util.readAll)
            .then(function (output: { toString: () => { trim: () => string } }) {
                return callback(output.toString().trim());
            });
    };

    restartApp = () => {
        this.executeShell((output: string) => {
            console.log(output)
        }, COMMAND_STOP_APPLICATON);

        this.executeShell((output: string) => {
            console.log(output)
        }, COMMAND_START_APPLICATON);
    };

    clearCache = () => {
        this.executeShell((output: string) => {
            console.log(output)
        }, COMMAND_CLEAR_CACHE);

    }

    runSetStatusBarStateCommand = (status: StatusBarState) => {
        this.executeShell((output: string) => {
            console.log(output)
        }, `service call statusbar ${status}`);
    };

    state = {
        prompt: 'Execute ADB command you like'
    };

    sendMessage(message: string) {
        console.log(`Command: ${message}`)
    }

    render() {
        return (
            <Container>
                <Heading level={1}>Meat ADB Flipper</Heading>
                <MyView>
                    <Text>{this.state.prompt}</Text>
                </MyView>
                <Example.Status>Status: here should be status of the most recent adb command</Example.Status>
                <NameForm />
                <Button onClick={this.runSetStatusBarStateCommand.bind(this, StatusBarState.OPEN)}>Open status bar</Button>
                <Button onClick={this.runSetStatusBarStateCommand.bind(this, StatusBarState.CLOSE)}> Close status bar</Button>
                <Button onClick={this.restartApp.bind(this)}>Restart application</Button>
                <Button onClick={this.clearCache.bind(this)}>Clear cache</Button>

            </Container >
        );
    }
}
