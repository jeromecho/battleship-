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
            // TODO - pass down handlers to child components to allow dynamic 
            //        updating of status message
        }
        this.handleClick = this.handleClick.bind(this);
        this.updateName = this.updateName.bind(this);
        this.toggleDisplayStatus = this.toggleDisplayStatus.bind(this);
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
        // in this case - no need to bind this?
        this.setState({isLoginDisplayed: false});
        this.setState({isGameDisplayed: true});
    }
}

export default App;

