
import React from 'react';
import {styled} from 'flipper';

const MyInput = styled.input({
    ontSize: 14,
    fontFamily: 'monospace',
    padding: '2px 5px',
    userSelect: 'auto',
    WebkitUserSelect: 'auto',
    marginLeft: '5px',
    overflow: 'hidden',
    textOverflow: 'ellipsis' 
});


export class NameForm extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <label>
                Application id
                </label>
                <MyInput type="text" value={this.props.value} onChange={this.props.handleChange} />
                <MyInput type="submit" value="Submit" />
            </form>
        );
    }
}