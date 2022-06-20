
import React from 'react';

class PlaygameBanner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if  (this.props.isDisplayed) {
            return (
                <div id='playgame-banner'> 
                    <button onClick={this.props.onClick}>
                        PLAY GAME
                    </button>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default PlaygameBanner;
