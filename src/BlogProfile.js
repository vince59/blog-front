import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

class BlogProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            email: '',
            password: '',
            confirmPassword: '',
            id: '',
            message: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.postData = this.postData.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:4242/api/profile/'+localStorage.getItem('token'))
            .then(response => response.json())
            .then(data => {
                if (data.hasOwnProperty('errorMessage'))
                    this.setState({ message: data.errorMessage });
                else {
                    this.setState({
                        login: data.login,
                        email: data.email,
                        password: '',
                        confirmPassword: '',
                        id: '',
                        message: 'My profile'
                    });
                }
            })
            .catch(function (res) { console.log(res) })
    }

    postData() {

        fetch("http://localhost:4242/api/profile",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    login: this.state.login,
                    email: this.state.email,
                    password: this.state.password,
                    confirmPassword: this.state.confirmPassword
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.hasOwnProperty('errorMessage'))
                    this.setState({ message: data.errorMessage });
                else {
                    window.location.replace("/");
                }
            })
            .catch(function (res) { console.log(res) })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <Container>
                <Alert variant="secondary">
                    {this.state.message}
                </Alert>
                <Form.Group controlId="formLogin">
                    <Form.Label>Login :</Form.Label>
                    <Form.Control placeholder="login"
                        name="login"
                        type="text"
                        value={this.state.login}
                        onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail" >
                    <Form.Label>Email address :</Form.Label>
                    <Form.Control plaintext readOnly defaultValue={this.state.email}  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password :</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Confirm password :</Form.Label>
                    <Form.Control
                        name="confirmPassword"
                        type="password"
                        value={this.state.confirmPassword}
                        onChange={this.handleInputChange} />
                </Form.Group>
                <Button variant="secondary" onClick={this.postData}>
                    Update
                </Button>
            </Container>
        );
    }
}

export default BlogProfile;