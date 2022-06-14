import React from 'react';
import ReactDOM from 'react-dom/client';

class ShipsPlacer extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {

        }
    }

    render () {
        return (
            <div id='shipsplacer'>
                <button type='button' id='auto-place'>
                    Auto-Place
                </button>
                <div id='shipscontainer'>
                </div>
            </div>
        );
    }
}

export default ShipsPlacer; 

