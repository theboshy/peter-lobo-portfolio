import React, {useEffect, useState, useTransition} from "react";
import "./nav.bar.css"
import {Col, Row, Container, Dropdown, ButtonGroup, Button} from "react-bootstrap";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useTranslation } from 'react-i18next';
import {
    startDecryptAnimation,
} from "../../utils/decryptedTextAnimation/decrypted.text.nimation";
import "./nav.bar.css"
import {SelectorComponent} from "../selector/selector.component";

export const NavBar = (props: any) => {
    const { t, i18n } = useTranslation();
    const pageNameOriginal = t("name") as string;

    const [pageName, setPageName] = useState(pageNameOriginal)

    const startDecryptTextAnimation = () => {
        startDecryptAnimation(t("real-name") as string, 1, true, setPageName)
    }

    return <Container className="normal-spacing">
        <Row className="normal-aliment-center">
            <Col className="normal-aliment-center" onMouseOver={startDecryptTextAnimation}>
                <AccountTreeIcon style={{fill: "#F8F8F2", fontSize: "5.8vh"}}/>
                <span className="title-text foreground-text">{pageName}</span>
            </Col>
            <Col >
                <Row className="normal-aliment-center" style={{float: "right"}}>
                    <Col>
                        <span className="foreground-text sub-title-text clickable-content" style={{whiteSpace: "nowrap"}}>{t("nav-bar-options.main") as string}</span>
                    </Col>
                    <Col>
                        <span className="foreground-text sub-title-text clickable-content" style={{whiteSpace: "nowrap"}}>{t("nav-bar-options.about") as string}</span>
                    </Col>
                    <Col>
                        <span className="foreground-text sub-title-text clickable-content" style={{whiteSpace: "nowrap"}}>{t("nav-bar-options.projects") as string}</span>
                    </Col>
                    <Col>
                        <SelectorComponent></SelectorComponent>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
}
