/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from "react";
import {
    Breadcrumb
} from "../../../components";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Media,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupText,
    Button,
    Nav,
    NavItem,
    NavLink,
    TabPane,
    TabContent,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import {
    CALL,
    STATUS,
    PROFILE,
    EricaHughes,
    VincentPorter,
    Active,
    ChataApp_p1,
    ChataApp_p2,
    Following,
    Follower,
    MarkJecno,
    Send,
} from "../../../constant";

import Pusher from "pusher-js";
import axios from "axios";
import { URL } from "../../../env/index";

import start_conversion from "../../../assets/images/start-conversion.jpg";
import { useTranslation, } from "react-i18next";

const Chat = (props) => {
    const { t } = useTranslation();
    const trans = t;
    const dispatch = useDispatch();
    const [searchKeyword, setSearchKeyword] = useState("");
    const [messageInput, setMessageInput] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [menuToggle, setMenuToggle] = useState(false);
    const [activeTab, setActiveTab] = useState("1");

    const [currentUser, setcurrentUser] = useState(null);

    const [Leads, setLeads] = useState(null);
    const [UserList, setUserList] = useState(null);

    const [CurrentUserMessages, setCurrentUserMessages] = useState([]);
    const [Msg, setMsg] = useState(null);

    var chat_messages = null;

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };
    var pusher = new Pusher("468d86032e3b9f19db82", {
        cluster: "ap2",
    });

    var channel = pusher.subscribe("my-channel");
    useEffect(() => {
        // channel.bind("my-event", function (data) {
        //   alert(JSON.stringify(data));
        // });

        const GetLeads = async () => {
            axios
                .get(URL + "/leadss")
                .then((response) => {
                    setLeads(response.data.leads);
                    setUserList(response.data.leads);
                    setcurrentUser(response.data.leads[0]);
                })
                .catch((error) => {
                    console.log("ERROR ---- ", error);
                });
        };

        GetLeads();
    }, []);

    useEffect(() => {

        var container = document.querySelector(".chat-history");
        // Pusher.logToConsole = true;
        channel.bind("pusher:subscription_succeeded", function () {
            console.log("PUSHER CONNECTED");
        });

        channel.bind("pusher:subscription_error", function () {
            console.log("PUSHER CONNECTION ERROR");
        });
        channel.bind("my-event", function (data) {
            setMsg(data);
            // chat_messages = CurrentUserMessages;
            // (CurrentUserMessages != null &&
            //   CurrentUserMessages.some((item) => item.id != data.id)) ||
            // CurrentUserMessages.length == 0)
            // if (
            //   chat_messages != null &&
            //   chat_messages.some((item) => item.id != data.id)
            // ) {
            //   chat_messages.push(data);
            //   setCurrentUserMessages(chat_messages);
            // }
            // if (CurrentUserMessages.some((item) => item.id != data.id)) {
            //   setCurrentUserMessages([]);

            //   setMessageInput("");
            // }
        });
    }, []);

    useEffect(() => {
        if (Msg != null) {
            if (
                (CurrentUserMessages.length > 0 &&
                    CurrentUserMessages.some((item) => item.id != Msg.id)) ||
                CurrentUserMessages.length == 0
            ) {
                if (CurrentUserMessages.length == 0) {
                    setCurrentUserMessages((prev) => [...prev, Msg]);
                } else {
                    setCurrentUserMessages((prev) => [...prev, Msg]);
                }
                setMessageInput("");
                var container = document.querySelector(".chat-history");
                setTimeout(function () {
                    container.scrollBy({ top: 250, behavior: "smooth" });
                }, 310);
            }
        }
    }, [Msg]);

    useEffect(() => {
        if (currentUser != null) {
            axios
                .get(URL + `/chat/${currentUser.id}/1`)
                .then((response) => {
                    if (response.data.success == true) {
                        var chat_header_div = document.querySelector(".chat_section");
                        chat_header_div.scrollIntoView();
                        var container = document.querySelector(".chat-history");
                        if (response.data.messages != null) {
                            setCurrentUserMessages(response.data.messages);
                        }
                        const scrollToBottom = (node) => {
                            node.scrollTop = node.scrollHeight;
                        };
                        scrollToBottom(container);
                    }
                })
                .catch((error) => {
                    console.log("CATCH ERROR ----", error);
                });
        }
    }, [currentUser]);

    const SendMessage = () => {
        const user_id = atob(localStorage.getItem("user_id"));
        if (atob(localStorage.getItem("role")) == "Lead") {
            axios
                .post(URL + "/chat", {
                    sender_id: user_id,
                    receiver_id: 1,
                    message: messageInput,
                })
                .then((response) => {
                    // pusher.bind("my_event", function (data) {
                    //   alert(data.message);
                    // });
                    if (response.data.success == true) {
                        var container = document.querySelector(".chat-history");

                        // const user_messages = CurrentUserMessages;
                        // var messages_append = [...user_messages, response.data.message];
                    }
                });
            // axios
            //   .post(URL + "/pusher_chat", {
            //     sender_id: 2,
            //     receiver_id: 1,
            //     message: messageInput,
            //   })
            //   .then((response) => {
            //     console.log("PUSHER CHAT API RESPONSE ---- ", response);
            //   });
        } else {
            axios
                .post(URL + "/chat", {
                    sender_id: user_id,
                    receiver_id: currentUser.id,
                    message: messageInput,
                })
                .then((response) => {
                    // pusher.bind("my_event", function (data) {
                    //   alert(data.message);
                    // });
                });
        }
    };

    const addEmoji = (emoji) => {
        const text = `${messageInput}${emoji.native}`;
        setShowEmojiPicker(false);
        setMessageInput(text);
    };

    // const changeChatClick = (e, selectedUserId) => {
    //     handleSearchKeyword('');
    //     const currentUserId = currentUser.id
    //     const currentChat = chats.find(x => x.users.includes(currentUser.id) && x.users.includes(selectedUserId))
    //     if (currentChat) {
    //         dispatch(changeChat(selectedUserId));
    //     } else {
    //         dispatch({type : CREATE_CHAT_WATCHER , currentUserId, selectedUserId, chats})
    //     }
    // }

    const handleMessageChange = (message) => {
        setMessageInput(message);
    };

    const handleSearchKeyword = (keyword) => {
        if (keyword != "") {
            const searched_keyword = keyword.toLowerCase();
            const searchedMembers = UserList.filter(
                (member) =>
                    member.lead.name.toLowerCase().indexOf(searched_keyword) > -1
            );
            setSearchKeyword(keyword);
            setUserList(searchedMembers);
        } else {
            setUserList(Leads);
        }
    };

    const changeChatClick = (e, selectedUserId) => {
        handleSearchKeyword("");
        const currentChat = UserList.find((x) => x.lead.id == selectedUserId);
        setcurrentUser(currentChat.lead);
    };

    // const handleMessagePress = (e) => {
    //     if (e.key === "Enter" || e === "send") {

    //         var container = document.querySelector(".chat-history");
    //         setTimeout(function () {
    //             container.scrollBy({ top: 200, behavior: 'smooth' });
    //         }, 310)

    //         let currentUserId = currentUser.id;
    //         let selectedUserId = selectedUser.id;
    //         let selectedUserName = selectedUser.name;

    //         if (messageInput.length > 0) {
    //             dispatch({type : SEND_MESSAGE_WATCHER, currentUserId, selectedUserId, messageInput, chats, online})
    //             setMessageInput('');
    //             setTimeout(() => {
    //                 const replyMessage = "Hey This is " + selectedUserName + ", Sorry I busy right now, I will text you later";
    //                 if (selectedUser.online === true)
    //                     document.querySelector(".status-circle").classList.add('online');
    //                     selectedUser.online = true;
    //                     dispatch({type : REPLY_MESSAGE_WATCHER,currentUserId, selectedUserId, replyMessage, chats, online})
    //             }, 5000);
    //         }
    //     }
    // }

    const chatMenuToggle = () => {
        setMenuToggle(!menuToggle);
    };

    return (
        <div className="chat_section">
            <Breadcrumb parent={trans("Lead Generation")} title={trans("Chat")} />
            <Container fluid={true}>
                <Row>
                    {atob(localStorage.getItem("role")) != "Lead" && (
                        <Col sm="12" className="call-chat-sidebar">
                            <Card>
                                <CardBody className="chat-body">
                                    <div className="chat-box">
                                        <div className="chat-left-aside">
                                            <div className="media">
                                                <Media
                                                    src="/user-avatar.jpg"
                                                    className="rounded-circle user-image"
                                                    alt="/user_avatar1.jpg"
                                                />
                                                <div className="about">
                                                    <div className="name f-w-600">
                                                        {localStorage.getItem("Name")}
                                                    </div>
                                                    <div className="status"></div>
                                                </div>
                                            </div>
                                            <div className="people-list">
                                                <div className="search">
                                                    <Form
                                                        className="theme-form"
                                                        onSubmit={(e) => e.preventDefault()}
                                                    >
                                                        <FormGroup className="form-group">
                                                            <Input
                                                                className="form-control"
                                                                type="text"
                                                                placeholder="search"
                                                                defaultValue={searchKeyword}
                                                                onChange={(e) =>
                                                                    handleSearchKeyword(e.target.value)
                                                                }
                                                            />
                                                            <i className="fa fa-search"></i>
                                                        </FormGroup>
                                                    </Form>
                                                </div>
                                                {UserList && UserList.length > 0 && (
                                                    <ul className="list">
                                                        {UserList.map((item, i) => {
                                                            return (
                                                                <li
                                                                    className={`clearfix`}
                                                                    key={i}
                                                                    onClick={(e) =>
                                                                        changeChatClick(e, item.lead.id)
                                                                    }
                                                                    style={{ cursor: "pointer" }}
                                                                >
                                                                    <img
                                                                        src="/user-avatar.jpg"
                                                                        className="rounded-circle user-image"
                                                                        alt=""
                                                                    />
                                                                    <div
                                                                        className={`status-circle ${item.online === true
                                                                            ? "online"
                                                                            : "offline"
                                                                            }`}
                                                                    ></div>
                                                                    <div className="about">
                                                                        <div className="name">{item.lead.name}</div>
                                                                        <div className="status">
                                                                            {item.stage.name}
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    )}
                    <Col className="call-chat-body">
                        <Card>
                            <CardBody className="p-0">
                                <Row className="chat-box">
                                    <Col className="pr-0 chat-right-aside">
                                        <div className="chat">
                                            <div className="chat-header clearfix">
                                                <Media src="" className="rounded-circle" alt="" />
                                                <div className="about">
                                                    <div className="name">
                                                        {currentUser != null && currentUser.name}
                                                    </div>
                                                    <div className="status digits">
                                                        {/* {selectedUser.online ? 'online' : selectedUser.lastSeenDate} */}
                                                    </div>
                                                </div>
                                                {/* <ul className="list-inline float-left float-sm-right chat-menu-icons">
                          <li className="list-inline-item">
                            <a href="#javascript">
                              <i className="icon-search"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#javascript">
                              <i className="icon-clip"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#javascript">
                              <i className="icon-headphone-alt"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#javascript">
                              <i className="icon-video-camera"></i>
                            </a>
                          </li>
                          <li className="list-inline-item toogle-bar">
                            <a href="#javascript">
                              <i className="icon-menu"></i>
                            </a>
                          </li>
                        </ul> */}
                                            </div>
                                            <div className="chat-history chat-msg-box custom-scrollbar">
                                                <ul>
                                                    {CurrentUserMessages.length > 0 ? (
                                                        CurrentUserMessages.length > 0 &&
                                                        CurrentUserMessages.map((item, index) => {
                                                            return (
                                                                <li key={index} className="clearfix">
                                                                    <div
                                                                        className={`message my-message ${item.sender_id !=
                                                                            atob(localStorage.getItem("user_id"))
                                                                            ? ""
                                                                            : "float-right"
                                                                            }`}
                                                                    >
                                                                        <Media
                                                                            src="/user-avatar.jpg"
                                                                            className={`rounded-circle ${item.sender_id !=
                                                                                atob(localStorage.getItem("user_id"))
                                                                                ? "float-left"
                                                                                : "float-right"
                                                                                } chat-user-img img-30`}
                                                                            alt="user_avatar.png"
                                                                        />
                                                                        <div className="message-data text-right">
                                                                            <span className="message-data-time">
                                                                                {item.created_at}
                                                                            </span>
                                                                        </div>
                                                                        {item.message}
                                                                    </div>
                                                                </li>
                                                            );
                                                        })
                                                    ) : (
                                                        <div>
                                                            <Media
                                                                className="img-fluid"
                                                                src={start_conversion}
                                                                alt="start conversion "
                                                            />
                                                        </div>
                                                    )}
                                                </ul>
                                            </div>
                                            <div className="chat-message clearfix">
                                                <Row>
                                                    <div className="mb-2">
                                                        {/* {showEmojiPicker ? (
                                                            <Picker
                                                                set="apple"
                                                                emojiSize={30}
                                                                onSelect={addEmoji}
                                                            />
                                                        ) : null} */}
                                                    </div>
                                                    <Col xl="12" className="d-flex">
                                                        <InputGroup className="text-box">
                                                            <Input
                                                                type="text"
                                                                className="form-control input-txt-bx"
                                                                placeholder="Type a message......"
                                                                value={messageInput}
                                                                onChange={(e) =>
                                                                    handleMessageChange(e.target.value)
                                                                }
                                                                onKeyDown={(e) => {
                                                                    if (e.key === "Enter") {
                                                                        document
                                                                            .getElementById("login_submit_btn")
                                                                            .click();
                                                                    }
                                                                }}
                                                            />
                                                            <Button
                                                                id="login_submit_btn"
                                                                color="primary"
                                                                onClick={SendMessage}
                                                            >
                                                                {Send}
                                                            </Button>
                                                        </InputGroup>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Chat;
