const output = document.getElementById("output")

const cpuLeft = document.getElementById("cpu-left")
const cpuRight = document.getElementById("cpu-right")
const youLeft = document.getElementById("you-left")
const youRight = document.getElementById("you-right")

const cpuPicLeft = document.getElementById("cpu-pic-left")
const cpuPicRight = document.getElementById("cpu-pic-right")
const youPicLeft = document.getElementById("you-pic-left")
const youPicRight = document.getElementById("you-pic-right")

const handChange = document.getElementById("hand-change")
const handSplit = document.getElementById("hand-split")

const pics = {
  "c0": "https://i.postimg.cc/dV01z939/c0.png",
  "c1": "https://i.postimg.cc/WpnghkXq/c1.png",
  "c2": "https://i.postimg.cc/Sxwzw7N3/c2.png",
  "c3": "https://i.postimg.cc/zXGWWGct/c3.png",
  "c4": "https://i.postimg.cc/TPgWGLKw/c4.png",
  "y0": "https://i.postimg.cc/7hv9R6Ng/y0.png",
  "y1": "https://i.postimg.cc/90J7S6rY/y1.png",
  "y2": "https://i.postimg.cc/13gqCYPD/y2.png",
  "y3": "https://i.postimg.cc/ZKsNLhkT/y3.png",
  "y4": "https://i.postimg.cc/Kzb3YGT5/y4.png"
}

function joystick() {
  let handIsLeft = true
  handChange.innerHTML = "left"
  
  handChange.addEventListener("click", () => {
    if (!yourTurn) return
    if (
      (!handIsLeft && !youLeft.innerHTML.length) ||
      (handIsLeft && !youRight.innerHTML.length)
    ) return
    handIsLeft = !handIsLeft
    handChange.innerHTML = handIsLeft ? "left" : "right"
  })
  
  handSplit.addEventListener("click", () => {
    if (!yourTurn) return
    
    let left = youLeft.innerHTML.length
    let right = youRight.innerHTML.length
    
    if (left === right && (left === 1 || left === 2)) {
      youLeft.innerHTML = (new Array(2*left)).fill("|").join("")
      youPicLeft.src = pics[`y${2*left}`]
      youRight.innerHTML = ""
      youPicRight.src = ""
      if (!handIsLeft) {
        handIsLeft = !handIsLeft
        handChange.innerHTML = handIsLeft ? "left" : "right"
      }
    } else if ((left && !right && (left === 2 || left === 4)) || (right && !left && (right === 2 || right === 4))) {
      let v = left || right
      youLeft.innerHTML = (new Array(v/2)).fill("|").join("")
      youPicLeft.src = pics[`y${v/2}`]
      youRight.innerHTML = (new Array(v/2)).fill("|").join("")
      youPicRight.src = pics[`y${v/2}`]
    } else {
      handSplit.innerHTML = "not possible"
      setTimeout(() => handSplit.innerHTML = "split/combine", 1000)
    }
  })
  
  let yourTurn = Math.random() < 0.5 ? true : false
  output.innerHTML = yourTurn ? "your turn..." : "cpu turn..."
  if (!yourTurn) handleCPU()
  
  cpuLeft.addEventListener("click", handleClick)
  cpuRight.addEventListener("click", handleClick)
  cpuPicLeft.addEventListener("click", () => handleClick({target: cpuLeft}))
  cpuPicRight.addEventListener("click", () => handleClick({target: cpuRight}))
  
  function handleClick({target}) {
    if (!yourTurn || !target.innerHTML.length) {
      return
    } else {
      yourTurn = !yourTurn
      
      let old = target.innerHTML.length
      let toAdd = handIsLeft ? youLeft.innerHTML.length : youRight.innerHTML.length
      
      target.id.endsWith("left")
          ? cpuPicLeft.src = pics[`c${(old+toAdd)%5}`]
          : cpuPicRight.src = pics[`c${(old+toAdd)%5}`]
      
      if ((old+toAdd)%5 === 0 && (!cpuLeft.innerHTML.length || !cpuRight.innerHTML.length)) {
        target.innerHTML = ""
        output.innerHTML = `<b>You won</b>, you hit cpu's <b>${target.id === "cpu-left" ? "left" : "right"} hand</b> by <b>${toAdd}</b>`
        return
      } else {
        target.innerHTML = (new Array((old+toAdd)%5)).fill("|").join("")
        output.innerHTML = `You hit cpu's <b>${target.id === "cpu-left" ? "left" : "right"} hand</b> by <b>${toAdd}</b>`
      }
      
      setTimeout(() => {
        output.innerHTML = "cpu chance..."
        handleCPU()
      }, 3000)
    }
  }

  function handleCPU() {
    setTimeout(cpu, 3000)
  }
  function cpu() {
    let toHit = youLeft.innerHTML.length && youRight.innerHTML.length
      ? (Math.random() < 0.5 ? youLeft : youRight)
      : youLeft.innerHTML.length
      ? youLeft
      : youRight
    let old = toHit.innerHTML.length
    let toAdd = (cpuLeft.innerHTML.length && cpuRight.innerHTML.length
      ? (Math.random() < 0.5 ? cpuLeft : cpuRight)
      : cpuLeft.innerHTML.length
      ? cpuLeft
      : cpuRight).innerHTML.length
    
    toHit.id.endsWith("left")
        ? youPicLeft.src = pics[`y${(old+toAdd)%5}`]
        : youPicRight.src = pics[`y${(old+toAdd)%5}`]
    
    if ((old+toAdd)%5 === 0) {
      if (!youLeft.innerHTML.length || !youRight.innerHTML.length) {
        toHit.innerHTML = ""
        output.innerHTML = `<b>CPU wins</b>, it hit your <b>${toHit.id === "you-left" ? "left" : "right"} hand</b> by <b>${toAdd}</b>`
        return
      } else if (
        (toHit.id === "you-left" && handIsLeft) ||
        (toHit.id === "you-right" && !handIsLeft)
      ) {
        toHit.innerHTML = ""
        handIsLeft = !handIsLeft
        handChange.innerHTML = handIsLeft ? "left" : "right"
      }
      toHit.innerHTML = ""
      output.innerHTML = `CPU hit your <b>${toHit.id === "you-left" ? "left" : "right"} hand</b> by <b>${toAdd}</b>`
    } else {
      toHit.innerHTML = (new Array((old+toAdd)%5)).fill("|").join("")
      output.innerHTML = `CPU hit your <b>${toHit.id === "you-left" ? "left" : "right"} hand</b> by <b>${toAdd}</b>`
    }
    
    setTimeout(() => {
      yourTurn = !yourTurn
      output.innerHTML = "your chance..."
    }, 2000)
  }
  return
}

function reset() {
  output.innerHTML = "game starts in in 3s."
  
  let i = 3
  let interval = setInterval(() => {
    i--;
    output.innerHTML = `game starts in in ${i}s.`
  }, 900)
  
  setTimeout(() => {
    clearInterval(interval)
    
    cpuLeft.innerHTML = "|"
    cpuRight.innerHTML = "|"
    youLeft.innerHTML = "|"
    youRight.innerHTML = "|"
    youPicLeft.src = pics["y1"]
    youPicRight.src = pics["y1"]
    cpuPicRight.src = pics["c1"]
    cpuPicLeft.src = pics["c1"]
    
    output.innerHTML = ""
    joystick()
  }, 3000)
}