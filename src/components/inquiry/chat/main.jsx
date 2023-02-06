import React, { useState, useEffect, Fragment } from 'react';
import Breadcrumb from '../../../layout/breadcrumb'
import { Container, Row, Col, Card, CardBody, Media, Form, FormGroup, Input, InputGroup, InputGroupAddon, Button, Nav, NavItem, NavLink, TabPane, TabContent } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux';
import two from '../../../assets/images/dashboard/boy-2.png';
import errorImg from '../../../assets/images/dashboard/boy-2.png';
import { Picker } from 'emoji-mart'
import { Following, Follower, MarkJecno, Send } from '../../../constant'

const ChatMain = (props) => {
    const { messages, sendMessage, dummy, formValue, setFormValue, ChatMessage, setImage,image, setAudioContent, setVideoContent, setImageContent } = props
    console.log('dummy', dummy)
    console.log('value', formValue)
    const dispatch = useDispatch()
    const allMembers = []
    const chats = []
    const selectedUser = []
    const currentUser = {}
    const online = []
    const members = []
    const [searchKeyword, setSearchKeyword] = useState('');
    const [messageInput, setMessageInput] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [menuToggle, setMenuToggle] = useState(false);
    const [activeTab, setActiveTab] = useState('1');
    
    const [audio, setAudio] = useState(false)
    const [video, setVideo] = useState(false)





    // const toggleEmojiPicker = () => {
    //     setShowEmojiPicker(!showEmojiPicker);
    // }

    // const addEmoji = (emoji) => {
    //     const text = `${messageInput}${emoji.native}`;
    //     setShowEmojiPicker(false);
    //     setMessageInput(text)
    // }

    const changeChatClick = (e, selectedUserId) => {
        handleSearchKeyword('');
        const currentUserId = currentUser.id
        const currentChat = chats.find(x => x.users.includes(currentUser.id) && x.users.includes(selectedUserId))
        if (currentChat) {
            // dispatch(changeChat(selectedUserId));
        } else {
            // dispatch({type : CREATE_CHAT_WATCHER , currentUserId, selectedUserId, chats})
        }
    }

    const handleSearchKeyword = (keyword) => {
        setSearchKeyword(keyword)
        // dispatch(searchMember(keyword))
    }

    const handleMessageChange = (message) => {
        setMessageInput(message)
    }

    const handleMessagePress = (e) => {
        if (e.key === "Enter" || e === "send") {

            var container = document.querySelector(".chat-history");
            setTimeout(function () {
                container.scrollBy({ top: 200, behavior: 'smooth' });
            }, 310)

            let currentUserId = currentUser.id;
            let selectedUserId = selectedUser.id;
            let selectedUserName = selectedUser.name;

            if (messageInput.length > 0) {
                // dispatch({type : SEND_MESSAGE_WATCHER, currentUserId, selectedUserId, messageInput, chats, online})
                setMessageInput('');
                setTimeout(() => {
                    const replyMessage = "Hey This is " + selectedUserName + ", Sorry I busy right now, I will text you later";
                    if (selectedUser.online === true)
                        document.querySelector(".status-circle").classList.add('online');
                    selectedUser.online = true;
                    // dispatch({type : REPLY_MESSAGE_WATCHER,currentUserId, selectedUserId, replyMessage, chats, online})
                }, 5000);
            }
        }
    }

    const chatMenuToggle = () => {
        setMenuToggle(!menuToggle)
    }

    const selectedChat = (allMembers && chats && selectedUser) ?
        chats.find(x => x.users.includes(currentUser.id) && x.users.includes(selectedUser.id)) :
        null;


    var activeChat = 0;
    if (selectedUser != null)
        activeChat = selectedUser.id;

    const [imageSrc, setImageSrc] = useState(null)
        const loadFile =(event)=> {
            console.log("evennt target",event.target.files)
                setAudio(false)
                setImage(true)
                    setImageSrc(URL.createObjectURL(event.target.files[0]));
                    setImageContent(event.target.files[0])
                    if(event.target.files.length >0)
                    {
                        event.target.value = null
                    }
           
            if(event.target.files[0].type.match('audio'))
            {
                setImage(false)
               setAudio(true)
               var aud = document.getElementById('audioFile');
            if(aud != null)
            {
                aud.src = URL.createObjectURL(event.target.files[0]);
                setAudioContent(event.target.files[0])
            }}
           
            else if(event.target.files[0].type.match('video'))
            {
                setImage(false)
                setAudio(false)
                setVideo(true)
                var vid = document.getElementById('videoFile');
                if(vid != null)
                {
                    vid.src = URL.createObjectURL(event.target.files[0]);
                    setVideoContent(event.target.files[0])
                } }
        };



    return (
        // (allMembers && chats && selectedUser) ?
        <>
            <Fragment>
                <Breadcrumb parent="Apps" title="Chat App" />
                <Container fluid={true}>
                    <Row>
                        {/* <Col sm="12" className="call-chat-sidebar">
                            <Card>
                                <CardBody className="chat-body">
                                    <div className="chat-box">
                                        <div className="chat-left-aside">
                                            <div className="media">
                                                <Media src={(currentUser.thumb)} className="rounded-circle user-image" alt="" />
                                                <div className="about">
                                                    <div className="name f-w-600">{currentUser.name}</div>
                                                    <div className="status">
                                                        {currentUser.status}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="people-list">
                                                <div className="search">
                                                    <Form className="theme-form">
                                                        <FormGroup className="form-group">
                                                            <Input
                                                                className="form-control"
                                                                type="text"
                                                                placeholder="search"
                                                                defaultValue={searchKeyword}
                                                                onChange={(e) => handleSearchKeyword(e.target.value)}
                                                            />
                                                            <i className="fa fa-search"></i>
                                                        </FormGroup>
                                                    </Form>
                                                </div>
                                                {members.length > 0 ?
                                                    <ul className="list">
                                                        {members.filter(x => x.id !== currentUser.id).map((item, i) => {
                                                            return (
                                                                <li className={`clearfix ${activeChat === item.id ? 'active' : ''}`}
                                                                    key={i} onClick={(e) => changeChatClick(e, item.id)} >
                                                                    <img src={(item.thumb)} className="rounded-circle user-image" alt="" />
                                                                    <div className={`status-circle ${item.online === true ? 'online' : 'offline'}`}></div>
                                                                    <div className="about">
                                                                        <div className="name">{item.name}</div>
                                                                        <div className="status">
                                                                            {item.status}
                                                                        </div>
                                                                    </div>
                                                                </li>);
                                                        })
                                                        }
                                                    </ul>
                                                    :
                                                    <Media className="img-fluid m-auto" src={errorImg} alt="" />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col> */}
                        <Col className="call-chat-body">
                            <Card>
                                <CardBody className="p-0">
                                    <Row className="chat-box">
                                        <Col className="pr-0 chat-right-aside col-9">
                                            <div className="chat">
                                                <div className="chat-header clearfix">
                                                    <Media src={(selectedUser.thumb)} className="rounded-circle" alt="" />
                                                    <div className="about">
                                                        <div className="name">
                                                            {selectedUser.name}
                                                        </div>
                                                        <div className="status digits" >
                                                            {selectedUser.online ? 'online' : selectedUser.lastSeenDate}
                                                        </div>
                                                    </div>
                                                    <ul className="list-inline float-left float-sm-right chat-menu-icons">
                                                        <li className="list-inline-item"><a href="#javascript"><i className="icon-search"></i></a></li>

                                                        <li className="list-inline-item"><a href="#javascript"><i className="icon-headphone-alt"></i></a></li>
                                                        <li className="list-inline-item"><a href="#javascript"><i className="icon-video-camera"></i></a></li>
                                                        <li className="list-inline-item toogle-bar" onClick={() => chatMenuToggle()}><a href="#javascript"><i className="icon-menu"></i></a></li>
                                                    </ul>
                                                </div>
                                                <div className="chat-history chat-msg-box custom-scrollbar" >
                                                    <ul>
                                                        {messages &&
                                                            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
                                                        <div ref={dummy}></div>
                                                    </ul>
                                                </div>
                                                <div className="chat-message clearfix">
                                                    <Row>
                                                        {/* <div className="mb-2">
                                                            {showEmojiPicker ? (
                                                                <Picker set="apple" emojiSize={30} onSelect={addEmoji} />
                                                            ) : null}
                                                        </div> */}
                                                         <Col xl="12" className="d-flex justify-content-center m-2" >
                                                        {image == true &&
                                                        <img src = {imageSrc != null && imageSrc} id="imageFile" style={{maxHeight:"70px", width:"70px"}} />
                                                        }
                                                        {audio == true &&
                                                         <audio id = "audioFile" controls></audio>
                                                        }
                                                        {video == true &&
                                                         <video style={{maxHeight:"120px", width:"120px"}} id = "videoFile" controls></video>
                                                        }
                                                       
                                                        </Col>
                                                        <Col xl="12" className="d-flex" >
                                                            <div className="smiley-box bg-primary d-flex justify-content-center align-items-center">
                                                            
                                                            <div className="picker d-flex">
                                                                <label for="file" className='mb-0' style={{cursor: 'pointer'}}>
                                                                <i className="icon-clip" style={{ fontSize: '20px' }}></i>
                                                                    <input  onChange={(e)=>loadFile(e)} type="file" id="file" style={{display:'none'}} name="image" multiple="" data-original-title="upload photos"/>
                                                                </label>
                                                                </div>
                                                                {/* <div className="picker d-flex">
                                                                <i className="icon-clip" style={{ fontSize: '20px' }}></i>

                                                                </div> */}

                                                            </div>
                                                           
                                                            
                                                            <InputGroup className="text-box">
                                                       
                                                                <Input
                                                                    type="text"
                                                                    className="form-control input-txt-bx"
                                                                    placeholder="Type a message......"
                                                                    value={formValue}
                                                                    // onKeyPress={(e) => handleMessagePress(e)}
                                                                    onChange={(e) => setFormValue(e.target.value)}
                                                                />
                                                           
                                                                 <Button color="primary" onClick={sendMessage} >{Send}</Button>
                                                            </InputGroup>
                                                           

                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col className={`pl-0 chat-menu ${menuToggle ? 'show' : ''}`}>
                                            <Nav tabs className="nav  border-tab nav-primary justify-content-center">
                                                <NavItem id="myTab" role="tablist">
                                                    <NavLink tag="a" href="#javascript" className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                                                        Profile
                                                    </NavLink>
                                                </NavItem>

                                            </Nav>
                                            <TabContent activeTab={activeTab}>

                                                <TabPane tabId="1">
                                                    <div className="user-profile">
                                                        <div className="image">
                                                            <div className="avatar text-center"><Media body alt="" src={two} /></div>
                                                            <div className="icon-wrapper"><i className="icofont icofont-pencil-alt-5"></i></div>
                                                        </div>
                                                        <div className="user-content text-center">
                                                            <h5 className="text-uppercase">{MarkJecno}</h5>
                                                            <div className="social-media">
                                                                <ul className="list-inline">
                                                                    <li className="list-inline-item"><a href="#javascript"><i className="fa fa-facebook"></i></a></li>
                                                                    <li className="list-inline-item"><a href="#javascript"><i className="fa fa-google-plus"></i></a></li>
                                                                    <li className="list-inline-item"><a href="#javascript"><i className="fa fa-twitter"></i></a></li>
                                                                    <li className="list-inline-item"><a href="#javascript"><i className="fa fa-instagram"></i></a></li>
                                                                    <li className="list-inline-item"><a href="#javascript"><i className="fa fa-rss"></i></a></li>
                                                                </ul>
                                                            </div>
                                                            <hr />
                                                            <div className="follow text-center">
                                                                <Row>
                                                                    <Col className="border-right"><span>{Following}</span>
                                                                        <div className="follow-num">{"236k"}</div>
                                                                    </Col>
                                                                    <Col><span>{Follower}</span>
                                                                        <div className="follow-num">{"3691k"}</div>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                            <hr />
                                                            <div className="text-center digits">
                                                                <p className="mb-0">{"Mark.jecno23@gmail.com"}</p>
                                                                <p className="mb-0">{"+91 365 - 658 - 1236"}</p>
                                                                <p className="mb-0">{"Fax: 123-4560"}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TabPane>
                                            </TabContent>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Fragment>

        </>
    );
}

export default ChatMain;