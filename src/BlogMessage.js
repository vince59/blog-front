import React from "react";
import PropTypes from "prop-types";
import Toast from 'react-bootstrap/Toast';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class BlogMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: this.props.content,
            id: this.props.id,
            name: this.props.author,
            author_id: this.props.author_id
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.postData = this.postData.bind(this);
        this.deleteData = this.deleteData.bind(this);
    }

    postData = (e) => {
        fetch("http://localhost:4242/api/message/" + localStorage.getItem('token'),
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    content: this.state.content,
                    id: this.state.id
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(this.state)
                if (data.hasOwnProperty('errorMessage'))
                    this.setState({ message: data.errorMessage });
                else {data.content=this.state.content;
                    this.props.syncMessage('update', data);}
                })
            .catch(function (res) { console.log(res) });
    }

    deleteData = () => {
        console.log('supp',this.state)
        fetch("http://localhost:4242/api/message/" + localStorage.getItem('token'),
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "DELETE",
                body: JSON.stringify({
                    id: this.state.id
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.hasOwnProperty('errorMessage'))
                    this.setState({ message: data.errorMessage });
                else this.props.syncMessage('delete',data);
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

    componentWillReceiveProps(nextProps){
        this.setState({ content: nextProps.content, 
            id: nextProps.id, 
            name: nextProps.author,
        author_id: nextProps.author_id })
    }

    render() {
        let button;
        if (this.state.author_id==localStorage.getItem('token'))
            button=<div><Button variant="primary" onClick={this.postData}>Update</Button>&nbsp;<Button variant="primary" onClick={this.deleteData}>Delete</Button></div>
        else 
            button=<div></div>;
        return (
            <Toast>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">{this.state.name}</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>
                    <Form.Group>
                        <Form.Control name="content" value={this.state.content} onChange={this.handleInputChange} maxlength="140" as="textarea" rows="3" />
                    </Form.Group>
                    {button}
                </Toast.Body>
            </Toast>
        );
    }
}

BlogMessage.propTypes = {
    content: PropTypes.string.isRequired
};

export default BlogMessage;