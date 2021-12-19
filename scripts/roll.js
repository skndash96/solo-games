const output = document.getElementById("output")

function dice() {
  let result = Math.floor(Math.random() * 6) + 1
  output.innerHTML = result
}

function coin() {
  let result = Math.floor(Math.random() * 2) ? "tail" : "head"
  output.innerHTML = result
}

function cards() {
  let random = Math.floor(Math.random() * 52) + 1
  let result = ""
  if (Math.floor(random/13) === 0) result += "spade"
  else if (Math.floor(random/13) === 1) result += "club"
  else if (Math.floor(random/13) === 2) result += "heart"
  else result += "diamond"
  
  if (random%13 === 10) result += " ace"
  else if (random%13 === 11) result += " jack"
  else if (random%13 === 12) result += " queen"
  else if (random%13 === 0) result += " king"
  else result += ` ${random%13}`
  
  output.innerHTML = result
}

function number() {
  let i = document.getElementById("number-input").value
  let [s, e] = i.includes(",")
    ? i.split(/ +/).join("").split(",").map(x => parseFloat(x))
    : [0,parseFloat(i)]
    
  if (!parseFloat(s)) s = 0
  if (!parseFloat(e)) e = 100
  
  let result = Math.floor(Math.random() * (e-s)) + s
  output.innerHTML = `${result} (${s}-${e})`
}