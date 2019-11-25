import React, {useEffect, useRef} from 'react'
import Immutable from 'immutable'
import {useSelector, useDispatch} from 'react-redux'
import {setDrawing, continueLine, newLine, reset} from './redux'

function Drawing({lines}) {
    return(
        <svg className="drawsvg">
            {lines.map((line, index) => (
                <DrawingLine key={index} line={line} />
            ))}
        </svg>
    )
}

function DrawingLine({line}) {
    const penColor = useSelector(state => state.color)
    const currentColor = penColor;
    const pathData = "M " + 
        line
            .map(p => `${p.get('x')}  ${p.get('y')}`)
            .join(" L ");

    return <path className="path" stroke={currentColor} d={pathData} />;

}

function DrawArea(props) {

    const isDrawing = useSelector(state => state.isDrawing)
    const dispatch = useDispatch()
    const lines = useSelector(state => state.lines)
    const drawArea = useRef(null)

    const relativeCoordinates = event => {
        const boundingRect = drawArea.current.getBoundingClientRect();
        return new Immutable.Map({
            x: event.clientX - boundingRect.left,
            y: event.clientY - boundingRect.top
        })
    }
    
    function handleMouseUp() {
        dispatch(setDrawing(false))
    }
    
    function clearButtonHandler(event) {
        dispatch(reset());
    }
    
    function handleMouseDown(event) {
        if (event.button !== 0) {
            return;
        }
        const point = relativeCoordinates(event);
        dispatch(newLine(point))
        dispatch(setDrawing(true))
    }
    
    function handleMouseMove(event) {
        if (!isDrawing) {
            return;
        }
        const point = relativeCoordinates(event)
        dispatch(continueLine(point))
    }
    
    useEffect (() => {
        document.addEventListener("mouseup", handleMouseUp)
        return () => {
            document.removeEventListener("mouseup", handleMouseUp)
        }
    })

    useEffect (() => {
        dispatch(reset())
    }, [])

    return(
        <div>
        <div className="mainDrawArea">
            <div ref={drawArea} 
                className="drawArea" 
                onMouseMove={handleMouseMove} 
                onMouseDown={handleMouseDown}>
                    <Drawing lines={lines}/>
            </div>
        </div>
        <button onClick = {clearButtonHandler} className="clearButton">CLEAR</button>
        </div>        
    )



}

export default DrawArea

//Code based on https://pspdfkit.com/blog/2017/how-to-build-free-hand-drawing-using-react/