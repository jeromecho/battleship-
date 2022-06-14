import React from 'react';
import ReactDOM from 'react-dom/client';

class Login extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            value: '',
        }
        this.handleChange = this.handleChange.bind(this); 
    }

    render () {
        const companyName = 'Cho Industries Presents';
        const title = 'BATTLESHIP';
        const buttonText = 'PLAY';

        if (this.props.isDisplayed === true) {
            return (
                <div id='login'>
                    <div id='login-container'>
                        <p className='tagline'>{companyName}</p>
                        <h1 className='title'>{title}</h1>
                    </div>
                    <div id='input-container'>
                        <input 
                        type='text' 
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                        <button
                        type='button'
                        onClick={() => this.props.handleClick(this.state.value)}>
                        {buttonText}
                    </button>
                </div>
                </div>
                );
        } else {
            return null;
        }
    }

    handleChange (e) {
        this.setState({value: e.target.value});
    }
}

export default Login; 

