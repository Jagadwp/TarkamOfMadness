import React, { useState, useEffect, useContext } from "react"
import { UserContext } from "../App"
import { Button } from "react-bootstrap"
import { Container, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { socket } from "./Socket";

import "./Lobby.css"
import Chat from './Chat'
import Pool from './Pool'
import Footer from './Footer'

const Lobby = () => {
    const { userData, setUserData } = useContext(UserContext)
    const history = useHistory()

    const userStats = () => {
        history.push("/stats");
    }
    const logOut = () => {
        setUserData({
          token: undefined,
          user: undefined,
        });
        socket.emit("logoutUser", userData.user.name)
        localStorage.setItem("auth-token", "");
      }

    return (
        <div className="bg" style={{ backgroundImage: "url(/background.png)", backgroundRepeat:"no-repeat", height:800,width:1700}}>
            <Container className="MainScreen">
                <Row>
                    <Col>
                        <div className="Header">
                            <div className="BigRedBall" style={{ backgroundImage: "url(/logo.png)",backgroundSize:"contain", backgroundRepeat:"no-repeat", height:100,width:200}}></div>
                            <div className="HeaderCenter">
                                <p>
                                    <b> </b>
                                </p>
                                <p>
                                    <i>Get 3 points to win!</i>
                                </p>
                                <p>Ready For The Next Game, <b>{userData.user.name}</b>?</p>
                                <div className="HeaderLinks">
                                    <div className="StatLinkDiv">                                        
                                        <Button className="StatButton" onClick={userStats}>View Stats</Button>
                                    </div>
                                    <div className="LogOutDiv">                                        
                                        <Button className="LogOutButton" onClick={logOut}>Log Out</Button>
                                    </div>
                                </div>
                            </div>                            
                        </div>                     
                    </Col>                
                </Row>
                <Row style={{height: "70%"}}>
                    <Col className="ChatBlock">
                        <div className="ChatHeader">
                            <p><b>Let's Chat Here</b></p>
                            <p>Say Hello! Don't be shy, <b>{userData.user.name}!</b></p>
                        </div>
                        <Chat />
                    </Col>
                    <Col className="PoolBlock">
                        <div className="PoolHeader">
                            <p><b>Currently Connected Users</b></p>
                        </div>
                        <Pool />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Footer />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Lobby
