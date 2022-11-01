import React, {useState} from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import "./perlin.noise.component.css"
import {PerlinNoiseControlComponent} from "../perlin-noise-controls/perlin.noise.control";

const X_ANGLE = 60;
const MAIN_ANGLE = 125;
const SCALE = 0.8;

export const PerlinNoiseComponent = (props: any) => {

    const [vertexHeight, setVertexHeight] = useState(300);
    const [vertexQuantity, setVertexQuantity] = useState(20);
    const [speed, setSpeed] = useState(0.01)
    const [colors, setColors] = useState(false)

    let CANVAS_SIZE = {
        width: 1250,
        height: 900
    }

    interface terrainComposition {
        terrainValue: number,
        color: any
    }

    let noiseScale = 6 / 150;

    let ocean = "#008dc4";
    let shore = "#00a9cc";
    let sand = "#eecda3";
    let grass = "#7ec850";
    let stone = "#676767";
    let snow = "#fffafa";

    let mouseValueX = X_ANGLE;
    let mouseScale = SCALE

    const COLS = CANVAS_SIZE.width / vertexQuantity, ROWS = CANVAS_SIZE.width / vertexQuantity;
    let fly = 0

    const setSpeedPipe = (speed: number) => {
        setSpeed(Math.round((speed / 1)) / 100)
    }

    const speedPipe = (origin: number) => {
        return origin * 100//0.01 -> 1
    }

    const setQuantityPipe = (quantity: number) => {
        setVertexQuantity(Math.abs(quantity - 110))
    }

    const quantityPipe = (origin: number) => {
        return Math.abs(origin - 110)
    }

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(CANVAS_SIZE.width, 400, p5.WEBGL).parent(canvasParentRef);
        p5.angleMode(p5.DEGREES);
        onResize(p5);
        p5.noiseDetail(5, 0.5);
        p5.frameRate(60);
        addColors();
    };

    const addColors = () => {
        setTimeout(() => {
            setColors(true)
        }, 5000)
    }

    const  mouseDragged = (p5: p5Types) => {
        //mouseValueX = p5.mouseY //disabled
    }

    const pickColor = (vertex: number, p5: p5Types) => {
        let h = vertex
        let c = "#facade";
        if (h < -230) {
            c = ocean;
        } else if (h < -120) {
                c = shore;
        } else if (h < -70) {
            if (p5.random() > p5.pow(h - 2, 2) * 100) {
                c = shore;
            } else {
                c = sand;
            }
        } else if (h < 30) {
            if (p5.random() > p5.pow(h - 70, 2) * 100) {
                c = sand;
            } else {
                c = grass;
            }
        } else if (h < 50) {
            if (p5.random() > p5.pow(h - 80, 2) * 100) {
                c = grass;
            } else {
                c = stone;
            }
        } else if (h < 200) {
            if (p5.random() > p5.pow(h - 90, 2) * 100) {
                c = stone;
            } else {
                c = snow;
            }
        } else {
            c = snow;
        }

        return p5.color(c);
    }

    const onResize = (p5: p5Types) => {
        window.onresize = () => {
            let w = props.mainContainer.current.offsetWidth * (96 / 100);
            let h = props.mainContainer.current.offsetHeight * (52 / 100);
            CANVAS_SIZE.width = w;
            CANVAS_SIZE.height = h;
            p5.resizeCanvas(w, h);
        }
    }

    const draw = (p5: p5Types) => {
        let terrainX: terrainComposition[] = [];
        let terrainY: terrainComposition[][] = [];
        fly -= speed
        let yOff = fly
        p5.scale(mouseScale)
        for (let y = 0; y < ROWS; y++) {
            let xOff = 0
            for (let x = 0; x < COLS; x++) {
                let vertex = p5.map(p5.noise(xOff, yOff), 0, 1, -vertexHeight, vertexHeight)
                let terrain: terrainComposition = {
                    terrainValue: 0,
                    color: null
                }
                terrain.terrainValue = vertex
                if (colors) {
                    terrain.color = pickColor(vertex, p5)
                }
                terrainX.push(terrain);
                xOff += noiseScale
            }
            terrainY.push(terrainX)
            terrainX = []
            yOff += noiseScale
        }

        p5.background("#282A36"); //""
        p5.stroke(255)
        p5.noFill()
        p5.smooth();
        p5.rotateX(mouseValueX);
        p5.rotate(MAIN_ANGLE)
        p5.translate(-p5.width / 2, -p5.height / 2 - 200)

        for (let y = 0; y < (ROWS - 1); y++) {
            p5.beginShape(p5.TRIANGLE_STRIP)
            for (let x = 0; x < COLS; x++) {
                if (colors) {
                    p5.fill(terrainY[x][y].color)
                }
                p5.vertex(x * vertexQuantity, y * vertexQuantity, terrainY[x][y].terrainValue);
                p5.vertex(x * vertexQuantity, (y + 1) * vertexQuantity, terrainY[x][y + 1].terrainValue);
            }
            p5.endShape()
        }
    };

    return <>
        <Sketch setup={setup} draw={draw} mouseDragged={mouseDragged}></Sketch>
        <PerlinNoiseControlComponent
            vertexHeight={vertexHeight}
            vertexQuantity={quantityPipe(vertexQuantity)}
            speed={speedPipe(speed)}
            setVertexHeightCallback={setVertexHeight}
            changeVertexQuantityCallback={setQuantityPipe}
            changeSpeedCallback={setSpeedPipe}
        >
        </PerlinNoiseControlComponent>
    </>;
};
