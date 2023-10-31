import React, { Component, createRef, forwardRef } from 'react';

class RefsDemo extends Component {
  constructor() {
    super();
    // Create a ref using createRef
    this.textInputRef = createRef();
    
    // Create a callback ref
    this.callbackRef = null;
    this.setCallbackRef = (element) => {
      this.callbackRef = element;
    };
  }

  componentDidMount() {
    // Accessing a ref
    if (this.textInputRef.current) {
      this.textInputRef.current.focus();
    }
  }

  render() {
    return (
      <div>
        {/* Using createRef */}
        <input type="text" ref={this.textInputRef} />

        {/* Using callback ref */}
        <input type="text" ref={this.setCallbackRef} />
        
        {/* Forwarding ref */}
        <ForwardedInput ref={this.textInputRef} />
      </div>
    );
  }
}

// Creating a forward ref component
const ForwardedInput = forwardRef((props, ref) => (
  <input type="text" ref={ref} />
));

export default RefsDemo;
