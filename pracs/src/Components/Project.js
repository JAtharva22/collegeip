import './project.css';
import React, { useState } from 'react';

const Project = () => {
    return (
        <>
            <section className="top">
                <div className="toptext">
                    <h2>
                        <span className="lg_text">Hi,</span>
                        I am Atharva Jadhav
                    </h2>
                    <h1 className="lg_text">Front-End DEVELOPER</h1>
                </div>
            </section>
            <section className="black">
                <h2>What can i do for <span>YOU?</span></h2>
            </section>
            <section className="work">
                <div className="flex_items">
                    <div className="cards">
                        <div className="cardimg">
                            <img src="https://github.com/JAtharva22/html-css-projects/assets/93152317/fb54e71b-e8ee-4a19-ad04-6ab8ca09b62a" alt="Web dev" />
                        </div>
                        <div className="cardinfo">
                            <h3>Web Development</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione deserunt repellat nulla officia
                                totam illo?</p>
                        </div>
                    </div>
                </div>
                <div className="flex_items">
                    <div className="cards">
                        <div className="cardimg">
                            <img src="https://github.com/JAtharva22/html-css-projects/assets/93152317/0edf58b5-bfbf-43df-9a48-7a9f95be896a" alt="App dev" />
                        </div>
                        <div className="cardinfo">
                            <h3>App Development</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione deserunt repellat nulla officia
                                totam illo?</p>
                        </div>
                    </div>
                </div>
                <div className="flex_items">
                    <div className="cards">
                        <div className="cardimg">
                            <img src="https://github.com/JAtharva22/html-css-projects/assets/93152317/f709d42c-abbd-4d0a-be44-1446beee236f" alt="design" />
                        </div>
                        <div className="cardinfo">
                            <h3>UI/UX Designer</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione deserunt repellat nulla officia
                                totam illo?</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bottom">
                <div className="contact">
                    <h1> Contact me </h1>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi dolor,
                        esse quasi doloremque temporibus quis.
                    </p>
                    <p>jatharva99@gmail.com</p>
                </div>
                <div className="aboutme">
                    <h1> about me</h1>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi dolor,
                        esse quasi doloremque temporibus quis.
                    </p>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi dolor,
                        esse quasi doloremque temporibus quis.
                    </p>
                </div>
            </section>
            <footer>
                project by atharva jadhav
            </footer>
        </>
    )
}

export default Project;