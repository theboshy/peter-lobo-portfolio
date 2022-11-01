import {ButtonGroup, Dropdown} from "react-bootstrap";
import React from "react";
import "./selector.component.css"

export const SelectorComponent = (props: any) => {
    return <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle id="dropdown-custom-1" className="language-selector-color">
            <span className="foreground-text sub-title-text clickable-content" style={{whiteSpace: "nowrap"}}>es</span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="select-options">
            <Dropdown.Item eventKey="3" active>
                <span className="foreground-text medium-text clickable-content"
                      style={{whiteSpace: "nowrap"}}>español</span>
            </Dropdown.Item>
            <Dropdown.Item eventKey="1">
                <span className="foreground-text medium-text clickable-content select-option"
                      style={{whiteSpace: "nowrap"}}>english</span>
            </Dropdown.Item>
            <Dropdown.Item eventKey="2">
                <span className="foreground-text medium-text clickable-content"
                      style={{whiteSpace: "nowrap"}}>svenska</span>
            </Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
}
