const caption = document.querySelector("caption")
const output = document.getElementById("output")

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function tictactoe() {
  const boxes = document.querySelectorAll("td")
  boxes.forEach((box, i) => box.addEventListener("click", (e) => handleClick(e, i)))
  
  const youSign = Math.random() < 0.5 ? "X" : "O"
  const cpuSign = youSign === "X" ? "O" : "X"
  
  caption.innerHTML = `You:<b>${youSign}</b>  Cpu:<b>${cpuSign}</b>`
  
  const clicked = []
  const left = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  
  let turnIsYours = youSign === "X" ? 1 : 0
  if (!turnIsYours) handleCPU()
  
  function checkWin(i) {
    let patterns = winPatterns.filter(pattern => pattern.includes(i) && !pattern.find(x => left.includes(x)))
    
    for (let n = 0; n < patterns.length; n++) {
      let [a, b, c] = patterns[n]
      
      if (
        boxes[a].innerHTML === boxes[b].innerHTML &&
        boxes[a].innerHTML === boxes[c].innerHTML
      ) {
        return 1
      }
    }
  }
  
  function handleClick(e, i) {
    if (!turnIsYours || !left.includes(i)) {
      return
    } else {
      clicked.push(i)
      left.splice(left.indexOf(i), 1)
      boxes[i].innerHTML = youSign
      
      if (checkWin(i)) {
        turnIsYours = 0
        output.innerHTML = "you win"
        return
      }
      
      if (left.length) {
        turnIsYours = 0
        handleCPU()
      } else {
        output.innerHTML = "draw"
      }
    } 
  }
  
  function handleCPU() {
    setTimeout(() => {
      let cb = clicked.filter((x, i) => i % 2 === (cpuSign === "X" ? 0 : 1))
      let yb = clicked.filter((x, i) => i % 2 === (youSign === "X" ? 0 : 1))
      
      let yw = winPatterns.find(([a,b,c]) => (
        (yb.includes(a) && yb.includes(b) && !cb.includes(c)) ||
        (yb.includes(b) && yb.includes(c) && !cb.includes(a)) ||
        (yb.includes(c) && yb.includes(a) && !cb.includes(b))
      ))
      let cw = winPatterns.find(([a,b,c]) => (
        (cb.includes(a) && cb.includes(b) && !yb.includes(c)) ||
        (cb.includes(b) && cb.includes(c) && !yb.includes(a)) ||
        (cb.includes(c) && cb.includes(a) && !yb.includes(b))
      ))
      
      let i = cw?.find(x => !clicked.includes(x))
      if (i === undefined) i = yw?.find(x => !clicked.includes(x))
      if (i === undefined) i = left[Math.floor(Math.random() * left.length)]
      
      boxes[i].innerHTML = cpuSign
      clicked.push(i)
      left.splice(left.indexOf(i), 1)
      
      if (checkWin(i)) {
        output.innerHTML = "cpu wins"
        return
      }
      
      if (left.length) {
        turnIsYours = 1
      } else {
        output.innerHTML = "draw"
      }
    }, 1000)
  }
  return
}

function reset() {
  const boxes = document.querySelectorAll("td")
  caption.innerHTML = ""
  output.innerHTML = "game starts in in 3s."
  
  let i = 3
  let interval = setInterval(() => {
    i--;
    output.innerHTML = `game starts in in ${i}s.`
  }, 900)
  
  setTimeout(() => {
    clearInterval(interval)
    
    boxes.forEach(box => box.innerHTML = "")
    output.innerHTML = ""
    tictactoe()
  }, 3000)
}