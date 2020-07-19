
import React from 'react';

// interface MyProps {
//     //code related to your props goes here
//     value: string
// }

// interface MyState {
//     value: string
// }

export class NameForm extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <label>
                    Application id
            <input type="text" value={this.props.value} onChange={this.props.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}