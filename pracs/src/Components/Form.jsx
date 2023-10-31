// FormReg.js Component
import React, { Component } from 'react';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            password: ''
        };
    }

    handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        this.setState({
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted with data:', this.state);
    };

    handleReset = () => {
        this.setState({
            name: '',
            email: '',
            gender: 'male',
            bio: '',
            agreeTerms: false,
            selectedOption: 'option1',
        });
        console.log('Reset Button clicked:', this.state);
    };

    mykeydown = (event) => {
        console.log(event)
        console.log(event.key)
        if (event.key === 'Control' || event.key === 'Delete' || event.key === 'Shift' || event.key === 'Alt') {
            window.alert('Press an AlphaNumeric Key');
        }
    }
    

    render() {
        return (
            <div className='container'>
                <h1 className="mt-2 mb-5">Registration Form</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label>Name:</label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <br/>
                    <div className='form-group'>
                        <label>Email:</label>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <br/>
                    <div className='form-group'>
                        <label>Phone:</label>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <br/>
                    <div className='form-group'>
                        <label>Password:</label>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <br/>
                    <div >
                        <button type="submit" className='btn btn-success'>Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default RegistrationForm;
