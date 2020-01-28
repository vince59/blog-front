import React from "react";
import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class BlogMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: this.props.login,
            email: this.props.email,
            id: this.props.id,
            followers: this.props.followers
        };
        this.postData = this.postData.bind(this);
    }

    postData = (e) => {
        fetch("http://localhost:4242/api/member/follower/" + localStorage.getItem('token'),
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify({
                    follower: this.state.id
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(this.state)
                if (data.hasOwnProperty('errorMessage'))
                    this.setState({ message: data.errorMessage });    
                else this.setState(state => {
                    console.log('avant',this.state.followers);
                    const followers = [...this.state.followers, localStorage.getItem('token')];
                    console.log('apres',followers);
                    return ({login: this.state.login,
                        email: this.state.email,
                        id: this.state.id,
                        followers: followers})
                }); 
            }
            )
            .catch(function (res) { console.log(res) });
    }

    render() {
        
        const myId = (element) => element === localStorage.getItem('token');
        
        if (!this.state.followers.some(myId))
        return (
        <div>
            <Card border="info" style={{ width: '18rem' }}>
                <Card.Header>{this.state.login}</Card.Header>
                <Card.Body>
                    <Card.Title>{this.state.email}</Card.Title>
                    <Button variant="primary" onClick={this.postData}>Follow {this.state.login}</Button>
                </Card.Body>
            </Card>
            <br />
        </div>
    );
    else
    return (
        <div>
            <Card border="info" style={{ width: '18rem' }}>
                <Card.Header>{this.state.login}</Card.Header>
                <Card.Body>
                    <Card.Title>{this.state.email}</Card.Title>
                    <Button variant="primary" >I no longer wish to follow {this.state.login} </Button>
                </Card.Body>
            </Card>
            <br />
        </div>
    );
    }
}

BlogMember.propTypes = {
    login: PropTypes.string.isRequired
};

export default BlogMember;