import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { withRouter } from 'react-router-dom';
import BlogMessage from './BlogMessage.js';

class BlogPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            messages: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.postData = this.postData.bind(this);
        this.syncMessage = this.syncMessage.bind(this);
    }

    syncMessage = (op,message) => {
        console.log('avant',this.state)
        if (op==='update') {
            this.setState(state => {
                const messages = state.messages.map(item => {
                    if (item.id === message._id)
                        item.content=message.content;
                    return item;
                    });
                console.log('maj',message,'apres',this.state)
                return {
                  messages,
                  message: this.state.message
                };
              });
    }
    
    if (op==='delete') {
        this.setState(state => {
            const messages = state.messages.filter(item => item.id !== message._id);
            console.log('suppression',message,'apres',this.state)
            return {
              messages,
              message: this.state.message
            };
          });
    }
    }

    componentDidMount() {
        this.interval = setInterval(() => 
        fetch('http://localhost:4242/api/message/list/' + localStorage.getItem('token'))
            .then(response => response.json())
            .then(data => {
                const newMessages = data.map(m => {
                    return {
                        content: m.content,
                        id: m._id,
                        author: m.author.login,
                        author_id: m.author._id
                    }
                });
                this.setState({ messages: newMessages });
            })
            .catch(function (res) { console.log(res) }), 1000);
    }

    postData = () => {
        fetch("http://localhost:4242/api/message/" + localStorage.getItem('token'),
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify({
                    content: this.state.message
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.hasOwnProperty('errorMessage'))
                    this.setState({ message: data.errorMessage });
                else {
                    this.setState(state => {
                        console.log('avant',this.state.messages)
                        const messages = [{ content: state.message, 
                            id: data.message._id,
                            author: data.user.login,
                            author_id: data.user._id }, ...state.messages];
                        console.log('apres',messages)
                        return {
                            messages,
                            message: this.state.message
                        };
                    });
                };
            })
            .catch(function (res) { console.log(res) });
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
        this.login=localStorage.getItem('name');
        return (
            <Container>
                <Row>
                    <Col>
                        <Card className="text-center" bg="dark" text="white" style={{ width: '18rem' }}>
                            <Card.Header>{this.login}</Card.Header>
                            <Card.Body>
                                <Form.Group>
                                    <Form.Control name="message" value={this.state.message} onChange={this.handleInputChange} maxlength="140" as="textarea" rows="3" />
                                </Form.Group>
                                <Button variant="primary" onClick={this.postData}>Send</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <React.Fragment>
                            <div>{this.state.messages.map(m =>
                                <BlogMessage syncMessage={this.syncMessage} content={m.content} id={m.id} author={m.author} author_id={m.author_id}/>)}
                            </div>
                        </React.Fragment>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default withRouter(BlogPost);