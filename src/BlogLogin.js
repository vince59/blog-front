import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

class BlogLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            message: 'Login'
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.postData = this.postData.bind(this);
    }

    postData = () => {
        fetch("http://localhost:4242/api/login",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.hasOwnProperty('errorMessage'))
                    this.setState({ message: data.errorMessage });
                else {
                    localStorage.setItem('token',data.id);
                    localStorage.setItem('name',data.login);
                    window.location.replace("/");
                }})
            .catch(function (res) { console.log(res) });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(target.name);
        this.setState({
            [name]: value
        });
    }

    render() {
        const { match, location, history } = this.props
        return (
            <Container>
                <br/>
                <Alert variant="secondary">
                    {this.state.message}
                </Alert>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleInputChange} />
                </Form.Group>
                <Button variant="secondary" onClick={this.postData}>
                    Login
                </Button>
            </Container>
        );
    }
}

export default BlogLogin;