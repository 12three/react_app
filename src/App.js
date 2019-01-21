import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

class App extends Component {
    state = {
        users: [
            'August',
            'Stanton',
            'Rosella'
        ],
        pointer: 0,
    };

    changeName(index, newName) {
        const oldUsersState = [...this.state.users];
        const newUsersState = oldUsersState.map((item, i) => {
            return i === index ? newName : item
        })

        this.setState({
            users: newUsersState,
        })
    }

    changePointer(i) {
        this.setState({
            pointer: i,
        })
    }

    isOutputChosen(ownIndex, pointer) {
        return ownIndex === pointer;
    }

    render() {
        return <div className="App">
                {this.state.users.map((user, i) => {
                    return <UserOutput
                        name={user}
                        key={i}
                        isChosen={this.isOutputChosen(i, this.state.pointer)}
                        click={() => this.changePointer(i)}/>;
                })}
                <UserInput
                    change={(newName) => this.changeName(this.state.pointer, newName)}
                    value={this.state.users[this.state.pointer]}/>
            </div>;
    }
}

export default App;
