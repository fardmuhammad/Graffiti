const drawLines = (lines) => {
    for (let i=0; i < lines.length; i++) {
        let lineFunction = d3.line()
            .x((d) => d.x)
            .y((d) => d.y);

        let lg = d3.select("#drawIt")
            .append("path")
            .attr("stroke", "black")
            .attr("class", "pathSVG")
            .attr("d", lineFunction(lines[i]));
    }    
}

var currentState = localStorage.getItem("state")
if (currentState) {
    var lines = JSON.parse(currentState);
    drawLines(lines);
}

window.addEventListener('storage', function(e) {
    d3.selectAll(".pathSVG").remove();
    if (e.newValue) {
        try {
            let lines = JSON.parse(e.newValue)
            drawLines(lines);
        } catch (e) {
        }
    }
});

