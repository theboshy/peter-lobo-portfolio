import React, {useRef, useState} from 'react';
import "./perlin.noise.control.css"
import {Form, Row} from "react-bootstrap/";
import {Col, Container} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

export const PerlinNoiseControlComponent = (props: any) => {
    const { t, i18n } = useTranslation();
    const [ vertexHeight, setVertexHeight ] = useState(props.vertexHeight);
    const [ vertexQuantity, setVertexQuantity ] = useState(props.vertexQuantity);
    const [ speed, setSpeed ] = useState(props.speed);

    const [opacity, setOpacity] = useState(0.3)

    const changeVertexHeight = (e: any) => {
        const value = e.target.value as unknown as number;
        setVertexHeight(value)
        props.setVertexHeightCallback(value)
    }

    const changeVertexQuantity = (e: any) => {
        const value = e.target.value as unknown as number;
        setVertexQuantity(value)
        props.changeVertexQuantityCallback(value)
    }

    const changeSpeed = (e: any) => {
        const value = e.target.value as unknown as number;
        setSpeed(value)
        props.changeSpeedCallback(value)
    }

    const changeOpacity = (newOpacity = opacity) => {
        //setOpacity(newOpacity)
    }

    return <Container className="controls-body vertical-aliment-center"
                      style={{opacity: opacity}}
                      onMouseOver={() => changeOpacity(1)}
                      onMouseOut={() => changeOpacity(0.3)}>
        <Form>
            <Form.Label><span className="normal-text foreground-text">{t("perlin-noise-controls.name") as string}</span></Form.Label>
            <Form.Group as={Row}>
                <Form.Label column sm="4">
                    <span className="foreground-text small-text strong-text">{t("perlin-noise-controls.vertex-height-range") as string}</span>
                </Form.Label>
                <Col sm="8">
                    <RangeSlider
                        value={vertexHeight}
                        onChange={e => changeVertexHeight(e)}
                        tooltipPlacement='top'
                        tooltip='auto'
                        variant="secondary"
                        step={10}
                        min={10}
                        max={350}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="4">
                    <span className="foreground-text small-text strong-text">{t("perlin-noise-controls.vertex-quantity") as string}</span>
                </Form.Label>
                <Col sm="8">
                    <RangeSlider
                        value={vertexQuantity}
                        onChange={e => changeVertexQuantity(e)}
                        tooltipPlacement='top'
                        tooltip='auto'
                        variant="secondary"
                        step={10}
                        min={10}
                        max={100}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="4">
                    <span className="foreground-text small-text strong-text">{t("perlin-noise-controls.flying-speed") as string}</span>
                </Form.Label>
                <Col sm="8">
                    <RangeSlider
                        value={speed}
                        onChange={e => changeSpeed(e)}
                        tooltipPlacement='top'
                        tooltip='auto'
                        variant="secondary"
                        step={1}
                        min={1}
                        max={4}
                    />
                </Col>
            </Form.Group>

        </Form>
    </Container>
}
