import React from 'react';
import Container from 'react-bootstrap/Container';
import BlogMember from './BlogMember.js';
import Alert from 'react-bootstrap/Alert';

class BlogMemberList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { members: [] };
    }

    componentDidMount() {
        fetch('http://localhost:4242/api/profile/list/' + localStorage.getItem('token'))
            .then(response => response.json())
            .then(data => {
                const newMembers = data.map(m => {
                    return {
                        login: m.login,
                        email: m.email,
                        id: m._id,
                        followers: m.followers
                    }
                });
                this.setState({ members: newMembers });
            })
            .catch(function (res) { console.log(res) })

    }

    render() {
        return (
            <Container>
                <br />
                <Alert variant='secondary'>
                    Members List
            </Alert>
                <div>{this.state.members.map(m =>
                    <BlogMember email={m.email} login={m.login} id={m.id} followers={m.followers} />)}
                </div>
            </Container>
        );
    }
}

export default BlogMemberList;