import React from 'react';
import Login from './login.js'
import Game from './game.js';

class App extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            isLoginDisplayed: true,
            isGameDisplayed: false,
            playerName: '',
        }
        this.handleClick = this.handleClick.bind(this);
        this.updateName = this.updateName.bind(this);
        this.toggleDisplayStatus = this.toggleDisplayStatus.bind(this);
        this.handleReset  = this.handleReset.bind(this);
    }

    render () {
        return (
            <>
            <Login 
            isDisplayed={this.state.isLoginDisplayed}
            handleClick={this.handleClick}/>
            <Game 
            isDisplayed={this.state.isGameDisplayed}
            playerName={this.state.playerName}
            onReset={this.handleReset}
            />
            </>
        );
    }

    handleClick(name) {
        this.toggleDisplayStatus();
        this.updateName(name);
    }

    updateName(name) {
        this.setState({ playerName: name })
    }

    toggleDisplayStatus() {
        this.setState({isLoginDisplayed: false});
        this.setState({isGameDisplayed: true});
    }

    handleReset() {
        this.setState({isLoginDisplayed: true});
        this.setState({isGameDisplayed: false});
    }
}

export default App;

