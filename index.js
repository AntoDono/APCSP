const coinFlip = ()=>{
    return Math.random() > 0.5
}

const simulate = ()=> {
    for (let i = 0; i < 50; i ++){
        console.log(coinFlip())
    }
}