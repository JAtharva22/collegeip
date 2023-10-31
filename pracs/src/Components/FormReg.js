// FormReg.js Component
import React, { Component } from 'react';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            gender: 'male',
            bio: '',
            agreeTerms: false,
            selectedOption: 'option1',
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
                        <label>Gender:</label>
                        <select
                            className="form-control"
                            name="gender"
                            value={this.state.gender}
                            onChange={this.handleChange}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <br/>
                    <div className='form-group'>
                        <label>Bio:</label>
                        <textarea
                            name="bio"
                            className="form-control" id="exampleFormControlTextarea1" rows="3"
                            value={this.state.bio}
                            onChange={this.handleChange}
                            onKeyDown={this.mykeydown} 
                        ></textarea>
                    </div>
                    <br/>
                    <div className='form-check'>
                        <label>
                            <input
                                class="form-check-input" type="checkbox" value="" id="defaultCheck1"
                                name="agreeTerms"
                                checked={this.state.agreeTerms}
                                onChange={this.handleChange}
                            />{' '}
                            I agree to the terms and conditions
                        </label>
                    </div>
                    <br/>
                    <div className="form-check">
                        <label>Choose an option:</label>
                        <div className="d-flex gap-5">
                            <div>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="selectedOption"
                                    value="option1"
                                    checked={this.state.selectedOption === 'option1'}
                                    onChange={this.handleChange}
                                />{' '}
                                Option 1
                            </div>
                            <div>
                                <input
                                className="form-check-input"
                                    type="radio"
                                    name="selectedOption"
                                    value="option2"
                                    checked={this.state.selectedOption === 'option2'}
                                    onChange={this.handleChange}
                                />{' '}
                                Option 2
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div >
                        <button type="submit" className='btn btn-success'>Submit</button>
                        <button type="button" className='btn btn-primary mx-5' onClick={this.handleReset}>
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default RegistrationForm;
