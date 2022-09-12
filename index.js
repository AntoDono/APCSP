var simulations = []

const coinFlip = ()=>{
    return Math.random() > 0.5
}

const simulate = ()=> {
    let total = 50, heads = 0, tails = 0
    for (let i = 0; i < total; i ++){
        if (coinFlip()) heads++
        else tails++
    }
    let percent = heads/total
    simulations.push(percent)
    console.log(simulations)
    document.getElementById("result").innerHTML = `Simulated ${total} coin flips. Heads: ${percent}`
}

let graph = d3.select('graph')
console.log(graph)