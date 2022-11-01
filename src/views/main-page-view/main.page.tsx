import React, {useRef, useState} from 'react';
import './main.page.css'
import {Container, Row, Col, OverlayTrigger} from 'react-bootstrap/';
import {NavBar} from "../../components/nav-bar/nav.bar";
import {PerlinNoiseComponent} from "../../components/perlin-noise/perlin.noise.component";
import {GitHub, LinkedIn} from '@mui/icons-material';
import {Button, Overlay, Tooltip} from "react-bootstrap";
import {Trans, useTranslation} from "react-i18next";
import {BottomNavigationAction, SvgIcon} from "@mui/material";

export const MainPageView = (props: any) => {
    const bodyContainerRef = useRef(null);
    const { t, i18n } = useTranslation();

    const renderTooltip = (props: any, text: string) => (
        <Tooltip id="button-tooltip" {...props}>
            {text}
        </Tooltip>
    );

    return  <Container className="background-color full-size-container" >
            <NavBar></NavBar>
        <Container ref={bodyContainerRef} className="background-color vertical-aliment-center" style={{marginTop: "10vh"}}>
            <Container style={{marginTop: "2rem"}}>
                <Row>
                    <Col lg={6}>
                        <div className="resume-section">
                            <Trans
                                i18nKey="resume"
                                components={{
                                    phrase: <p className='big-text foreground-text' />,
                                    remarkColorClickable: <span className="clickable-content foreground-text-remark"/>,
                                    remarkColor: <span className="foreground-text-remark"/>
                            }}></Trans>
                        </div>
                    </Col>
                    <Col>
                        <div className="social-media-group">
                            <OverlayTrigger
                                placement="left"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip(null, t("social-media-links.github") as string)}
                            >
                                <GitHub className="clickable-content" style={{fill: "#F8F8F2", fontSize: "5.8vh"}} />
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="left"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip(null, t("social-media-links.linked-in") as string)}
                            >
                                <LinkedIn className="clickable-content" style={{fill: "#F8F8F2", fontSize: "5.8vh"}}/>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="left"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip(null, t("social-media-links.stack-over-flow") as string)}
                            >
                                <SvgIcon className="clickable-content" style={{fill: "#F8F8F2", fontSize: "5.8vh"}}>
                                    <path d="M15 21h-10v-2h10v2zm6-11.665l-1.621-9.335-1.993.346 1.62 9.335 1.994-.346zm-5.964 6.937l-9.746-.975-.186 2.016 9.755.879.177-1.92zm.538-2.587l-9.276-2.608-.526 1.954 9.306 2.5.496-1.846zm1.204-2.413l-8.297-4.864-1.029 1.743 8.298 4.865 1.028-1.744zm1.866-1.467l-5.339-7.829-1.672 1.14 5.339 7.829 1.672-1.14zm-2.644 4.195v8h-12v-8h-2v10h16v-10h-2z" />
                                </SvgIcon>
                            </OverlayTrigger>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Container>
                <div className="perlin-noise " style={{marginTop: "2vh"}}>
                    <PerlinNoiseComponent mainContainer={bodyContainerRef}></PerlinNoiseComponent>
                </div>
            </Container>
        </Container>
    </Container>
}
