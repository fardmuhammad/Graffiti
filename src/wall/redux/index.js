import { createStore } from 'redux'
import { loadState, saveState, clearState } from './localStorage'
import Immutable from 'immutable'

const initialState = {
    isDrawing: false,
    color: "#000000",
    lines: Immutable.List()
}

export function setDrawing(drawBool) {
    return ({
        type: "SET_DRAWING",
        payload: drawBool
    })
}

export function setColor(color) {
    return ({
        type:"SET_COLOR",
        payload: color
    })
}

export function continueLine(point) {
    return ({
        type:"CONTINUE_LINE",
        payload:point
    })
}

export function newLine(point) {
    return({
        type:"NEW_LINE",
        payload:point
    })
}

export function reset() {
    return ({
        type:"RESET"
    })
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case "SET_DRAWING":
            //Toggle if it's drawing
            return {...state, isDrawing: action.payload}
        case "CONTINUE_LINE": {
            //Mousemove. The drawing continues.
            let prevLines = state.lines
            let newLines = prevLines.updateIn([prevLines.size - 1], line => line.push(action.payload))
            return {...state, lines: newLines}
        }
        case "NEW_LINE": {
            //Mousedown. The drawing will commence soon.
            let prevLines = state.lines
            let newLines = prevLines.push(Immutable.List([action.payload]))
            return {...state, lines: newLines}
        }
        case "SET_COLOR": {
            return {...state, color: action.payload}
        }
        case "RESET": {
            //Shut it down, lads
            clearState();
            return(initialState)
        }
        default:
        return state
    }
}

loadState();
const store = createStore(reducer)
store.subscribe(() => {
    saveState(store.getState().lines);
}) 
//store.subscribe(() => console.log(store.getState()))
export default store