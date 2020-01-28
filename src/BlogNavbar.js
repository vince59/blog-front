import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

class BlogNavbar extends React.Component {
    logout() {
        localStorage.clear("token");
        window.location.replace("/");
    }

    render() {
        if (!this.props.token)
            return (
                <Navbar bg="dark" variant="dark" sticky="top">
                    <Navbar.Brand >MicroBloggos</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/" >home</Nav.Link>
                        <Nav.Link as={Link} to="/register" >Register</Nav.Link>
                        <Nav.Link as={Link} to="/login" >Login</Nav.Link>
                    </Nav>
                </Navbar>
            );
        else
            return (
                <Navbar bg="dark" variant="dark" sticky="top">
                    <Navbar.Brand >MicroBloggos</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/" >home</Nav.Link>
                        <Nav.Link as={Link} to="/profile" >My profile</Nav.Link>
                        <Nav.Link as={Link} to="/member/list" >Member list</Nav.Link>
                        <Nav.Link onClick={this.logout}>Logout</Nav.Link>
                    </Nav>
                </Navbar>
            );
    }
}

export default BlogNavbar;