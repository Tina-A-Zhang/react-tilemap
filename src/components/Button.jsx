import React from 'react';
import './Button.css';

class Button extends React.Component{ 
  
  render(){
    let text = this.props.ButtonType==="zoom-in" ? "+" : "-";
    return(
        <button 
        className={`zoom-btn ${this.props.ButtonType} `}
        onClick={this.props.onClick}
        >
        {text}
        </button> 
    );
  }
}
export default Button;