var simulations = []

const coinFlip = () => {
    return Math.random() > 0.6
}

const simulate = () => {
    let total = 50, heads = 0, tails = 0
    for (let i = 0; i < total; i++) {
        if (coinFlip()) heads++
        else tails++
    }
    let percent = Math.round(heads / total * 100)
    simulations.push(percent)
    document.getElementById("result").innerHTML = `Simulated ${total} coin flips. Heads: ${percent}%`
    update()
}

const massSimulate = ()=> {
    for (let i = 0; i < 100; i ++){
        simulate()
    }
}

const sortlist = (arr) => {
    let sorted = {}
    arr.forEach((num) => {
        if (sorted.hasOwnProperty(num)) sorted[num]++
        else sorted[num] = 1
    })
    return sorted
}

const update = () => {

    let sorted = sortlist(simulations)
    let width = 500
    let height = 100
    let x = 0
    let height_scale = 10

    const div = d3.select("#graph")
        .style("font", "10px sans-serif")
        .style("text-align", "right")
        .style("color", "black")
        .attr("width", window.innerWidth / 2)
        .attr("height", window.innerHeight)

    div.selectAll("*").remove()

    let x_axis_line = d3.scaleLinear()
        .domain([0, height])
        .range([0, width])

    let y_axis_line = d3.scaleLinear()
        .domain([0, height])
        .range([width, 0])

    let x_axis = d3.axisBottom()
        .scale(x_axis_line)

    let y_axis = d3.axisLeft()
        .scale(y_axis_line)

    div.append("g")
        .attr("transform", `translate(50, ${width})`)
        .call(x_axis)

    div.append("g")
        .attr("transform", "translate(50, 0)")
        .call(y_axis)

    const bars = div.append("g")

    const appeared = Object.keys(sorted).sort()
    console.log(appeared)

    bars.selectAll(".bar")
        .data(appeared)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("transform", d => {return `translate(50, ${width - (sorted[d] * height_scale)})`})
        // .attr("transform", "rotate(90)")
        .attr("x", d => { return d * 5 } )
        .attr("width", width/100)
        .attr("height", d => { return sorted[d] * height_scale });

    // div.selectAll("div")
    //     .data(Object.keys(sorted))
    //     .join("div")
    //     .style("background", "steelblue")
    //     .style("padding", "3px")
    //     .style("margin", "1px")
    //     .style("width", d => `${d * sorted[d]}px`)
    //     .text(d => d);

}

// let graph = d3.select('graph')
// graph.html("Hello world")
