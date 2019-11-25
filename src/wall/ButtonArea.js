
//setColor, 
import React from 'react'
import {useDispatch} from 'react-redux'
import {setColor} from './redux'

function ColorButton (props) {
    return (
        <button value={props.color} style={{backgroundColor: props.color, cursor: "pointer"}} className="colorButton" onClick={props.clickHandle} />
    )
}

function ButtonArea () {

    const dispatch = useDispatch()
       
    const colors = ["#000000", "#ef3c39", "#ef7c00", "#ffff00", "#1cd41c", "#00FFFF", "#0000ff", "#aa00FF"];
    const clickHandle = (e) => {
        dispatch(setColor(e.target.value))
    }

    const Buttons = colors.map(btn => {
        return (
            <ColorButton key={btn} color={btn} clickHandle={clickHandle} />
        )
    })
    return (
        <div className="buttonArea">
            {Buttons}
        </div>
    )
}

export default ButtonArea


/* red: #ef3c39
orange: #ef7c00
yellow: #ffff00
green: #1cd41c
cyan: #00FFFF
blue: #0000ff
purple: #aa00FF */