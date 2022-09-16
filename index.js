var simulations = []
var simulate_amt = 50

const coinFlip = () => {
    return Math.random() > 0.5
}

const simulate = () => {
    let heads = 0, tails = 0
    for (let i = 0; i < simulate_amt; i++) {
        if (coinFlip()) heads++
        else tails++
    }
    let percent = Math.round(heads / simulate_amt * 100)
    simulations.push(percent)
    document.getElementById("result").innerHTML = `Simulated ${simulate_amt} coin flips. Heads: ${percent}%`
    update()
}

const massSimulate = ()=> {
    for (let i = 0; i < 10; i ++){
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
    updateGraph()
    updateHistory()
}

const updateHistory = () => {
    let formatted = ""
    simulations.forEach((d)=>{
        formatted += `Simulated ${simulate_amt} coin flips: Heads: ${d}%\n`
    })
    document.getElementById("simHistory").innerText = formatted
}

const updateGraph = () => {

    let sorted = sortlist(simulations)
    let width = window.innerWidth/2.5
    let height = window.innerHeight/2.5
    let my = 500 // max y
    let mx = 100 // max x
    let bw = width/100 // bar width
    let x = 0
    let height_scale = 10

    const div = d3.select("#graph")
        .style("font", "10px sans-serif")
        .style("text-align", "right")
        .style("color", "black")
        .attr("width", width + 100)
        .attr("height", height + 100)

    div.selectAll("*").remove()

    let x_axis_line = d3.scaleLinear()
        .domain([0, mx])
        .range([0, width])

    let y_axis_line = d3.scaleLinear()
        .domain([0, my])
        .range([height, 0])

    let x_axis = d3.axisBottom()
        .scale(x_axis_line)

    let y_axis = d3.axisLeft()
        .scale(y_axis_line)

    div.append("g")
        .attr("transform", `translate(50, ${height})`)
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
        .attr("transform", d => {return `translate(50, ${height - (sorted[d] * height_scale)})`})
        // .attr("transform", "rotate(90)")
        .attr("x", d => { return d * bw } )
        .attr("width", bw)
        .attr("height", d => { return sorted[d] * height_scale });

}
