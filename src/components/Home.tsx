import * as React from "react"
import { Card, ListGroup, Container, Row, Col, Button, Modal, Form, FormGroup } from 'react-bootstrap'
import { Input } from 'reactstrap'
import { fetchUsers, deleteUser } from '../services/Users.service'
import { fetchPosts, deletePost, addPost, updatePost } from '../services/Posts.service'
import { fetchAlbums, deleteAlbum, addAlbum, updateAlbum } from '../services/Albums.service'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

export class Home extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            remoteData: null,
            showPostModal: false,
            showAlbumModal: false,
            selectedValue: "",
            id: "",
            title: "",
            body: ""
        }
    }

    fetchUsers = async () => {
        return await fetchUsers()
    }

    fetchPosts = async () => {
        return await fetchPosts()
    }

    fetchAlbums = async () => {
        return await fetchAlbums()
    }

    handleChange = (event: any) => {
        let { name, value } = event.target
        this.setState({ [name]: value })
    }

    async componentDidMount() {

        let albums: any[] = await fetchAlbums()
        let users: any[] = await fetchUsers()
        let posts: any[] = await fetchPosts()

        let remoteData: any[] = []
        while (remoteData.length < 30 || (albums.length === 0 && users.length === 0 && albums.length === 0)) {
            let randomSelection = [1, 2, 3][Math.floor(Math.random() * 3)]
            let data: any = {}
            switch (randomSelection) {
                case 1:
                    if (users.length === 0) break
                    data = { ...users[0], type: 1 }
                    users.splice(0, 1)
                    //users.pull(users[0])
                    remoteData.push(data)

                    break
                case 2:
                    if (posts.length === 0) break
                    data = { ...posts[0], type: 2 }
                    posts.splice(0, 1)
                    remoteData.push(data)

                    break
                default:
                    if (albums.length === 0) break
                    data = { ...albums[0], type: 3 }
                    albums.splice(0, 1)
                    remoteData.push(data)
                    break
            }


        }
        this.setState({ remoteData: remoteData })

    }

    handleDelete = async (event: any) => {
        event.preventDefault()
        const { remoteData } = this.state
        const value = JSON.parse(event.target.value)
        if (value.type === 1) {
            let apiResponse = await deleteUser(value.id)
            if (apiResponse === 200) {
                const removeIndex = remoteData.map((item: any) => { return item.id }).indexOf(value.id)
                remoteData.splice(removeIndex, 1)
                this.setState({
                    remoteData: remoteData
                })
            }
            else {
                console.log("Something went wrong")
            }
        }
        else if (value.type === 2) {
            let apiResponse = await deletePost(value.id)
            if (apiResponse === 200) {
                const removeIndex = remoteData.map((item: any) => { return item.id }).indexOf(value.id)
                remoteData.splice(removeIndex, 1)
                this.setState({
                    remoteData: remoteData
                })
            }
            else {
                console.log("Something went wrong")
            }
        }
        else if (value.type === 3) {
            let apiResponse = await deleteAlbum(value.id)
            if (apiResponse === 200) {
                const removeIndex = remoteData.map((item: any) => { return item.id }).indexOf(value.id)
                remoteData.splice(removeIndex, 1)
                this.setState({
                    remoteData: remoteData
                })
            }
            else {
                console.log("Something went wrong")
            }
        }

    }

    handleChangeSelect = (event: any) => {
        this.setState({
            selectedValue: event.target.value
        })
    }

    closeModal = () => {
        this.setState({
            showPostModal: false,
            showAlbumModal: false
        })
    }

    handleAddUpdatePost = async (event: any) => {
        event.preventDefault()
        const { selectedValue, id, title, body, remoteData } = this.state
        if (selectedValue === "post") {
            let data = await addPost(id, title, body)
            remoteData.push(data)
            this.setState({
                remoteData: remoteData,
                showPostModal: false
            })
        }
        else if (selectedValue === "put") {
            let data = await updatePost(id, title, body)
            remoteData.push(data)
            this.setState({
                remoteData: remoteData,
                showPostModal: false
            })
        }

    }
    handleAddUpdateAlbum = async (event: any) => {
        event.preventDefault()
        const { selectedValue, id, title, body, remoteData } = this.state
        if (selectedValue === "post") {
            let data = await addAlbum(id, title, body)
            remoteData.push(data)
            this.setState({
                remoteData: remoteData,
                showAlbumModal: false
            })
        }
        else if (selectedValue === "put") {
            let data = await updateAlbum(id, title, body)
            remoteData.push(data)
            this.setState({
                remoteData: remoteData,
                showAlbumModal: false
            })
        }

    }

    render() {
        const { showAlbumModal, showPostModal, id, title, body } = this.state
        return (
            <React.Fragment>
                <Container>
                    <Row className="justify-content-md-center">

                        <Button style={{ margin: '10px' }} onClick={() => {
                            this.setState({
                                showPostModal: true
                            })
                        }} variant="danger"> Add Post</Button>
                        <Modal show={showPostModal} onHide={this.closeModal} >
                            <Modal.Header closeButton>
                                <Modal.Title>Add a post</Modal.Title>
                            </Modal.Header>
                            <Modal.Body><Form>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridProfile">
                                        <Form.Label>Profile</Form.Label>
                                        <FormGroup onChange={this.handleChangeSelect}>
                                            <Input type="select" name="select" id="exampleSelect">
                                                <option value="post">Add</option>
                                                <option value="put">Update</option>
                                            </Input>
                                        </FormGroup>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Control name="id" onChange={this.handleChange} value={id} placeholder="id" />
                                    </Col>
                                    <Col>
                                        <Form.Control name="title" onChange={this.handleChange} value={title} placeholder="title" />
                                    </Col>
                                    <Col>
                                        <Form.Control name="body" onChange={this.handleChange} value={body} placeholder="body" />
                                    </Col>
                                </Row>
                            </Form></Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.closeModal} variant="secondary" >
                                    Close
                                </Button>
                                <Button onClick={this.handleAddUpdatePost} variant="primary">
                                    Save Changes
                              </Button>
                            </Modal.Footer>
                        </Modal>


                        <Button style={{ margin: '10px' }} onClick={() => {
                            this.setState({

                                showAlbumModal: true
                            })
                        }} variant="danger"> Add Album</Button>
                        <Modal show={showAlbumModal} onHide={this.closeModal}  >
                            <Modal.Header closeButton>
                                <Modal.Title>Add a album</Modal.Title>
                            </Modal.Header>
                            <Modal.Body><Form>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridProfile">
                                        <Form.Label>Profile</Form.Label>
                                        <FormGroup onChange={this.handleChangeSelect}>
                                            <Input type="select" name="select" id="exampleSelect">
                                                <option value="post">Add</option>
                                                <option value="put">Update</option>
                                            </Input>
                                        </FormGroup>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Control name="id" onChange={this.handleChange} value={id} placeholder="id" />
                                    </Col>
                                    <Col>
                                        <Form.Control name="title" onChange={this.handleChange} value={title} placeholder="title" />
                                    </Col>
                                    <Col>
                                        <Form.Control name="body" onChange={this.handleChange} value={body} placeholder="body" />
                                    </Col>
                                </Row>
                            </Form></Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.closeModal} variant="secondary" >
                                    Close
                                </Button>
                                <Button onClick={this.handleAddUpdateAlbum} variant="primary">
                                    Save Changes
                              </Button>
                            </Modal.Footer>
                        </Modal>

                    </Row>
                    <br />
                    <Row className="justify-content-lg-center">
                        <Col lg="auto">
                            <Card style={{ width: 'auto' }}>
                                <ListGroup variant="flush">
                                    {this.state.remoteData && this.state.remoteData.map((data: any, index: any) => {
                                        if (data.type === 1) {
                                            return (
                                                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center  " > {data.name}
                                                    <Button onClick={this.handleDelete} value={JSON.stringify(data)} variant="danger"> <FontAwesomeIcon icon={faTrash} /> </Button>
                                                </ListGroup.Item>
                                            )
                                        }
                                        else if (data.type === 2) {
                                            return (
                                                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center " > {data.title}
                                                    <Button onClick={this.handleDelete} value={JSON.stringify(data)} variant="danger"> <FontAwesomeIcon icon={faTrash} /> </Button>
                                                </ListGroup.Item>
                                            )
                                        }
                                        else if (data.type === 3) {
                                            return (
                                                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center " >{data.title}
                                                    <Button onClick={this.handleDelete} value={JSON.stringify(data)} variant="danger"> <FontAwesomeIcon icon={faTrash} /> </Button>
                                                </ListGroup.Item>

                                            )
                                        }

                                    }

                                    )}

                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </Container>

            </React.Fragment >
        )
    }
}