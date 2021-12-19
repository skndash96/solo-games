const form = document.querySelector("form")
form.addEventListener("submit", event => {
  event.preventDefault()
  dbz()
})

const input = document.getElementById("input")
const output = document.getElementById("output")

const youP = document.getElementById("your-points")
const cpuP = document.getElementById("cpu-points")
const youL = document.getElementById("your-loads")
const cpuL = document.getElementById("cpu-loads")

const loadUse = {
  "+": 1,
  "1": 0, "2": 0, "3": 0,
  "fi": -1,
  "sh": -2,
  "ss": -3, "no": -3,
  "ssl": -4,
  "bb": -5
}
const info = {
  "+": {
    "name": "load",
    "kills": []
  },
  "1": {
    "name": "✌️",
    "kills": []
  },
  "2": {
    "name": "👉",
    "kills": []
  },
  "3": {
    "name": "👍",
    "kills": []
  },
  "fi": {
    "name": "fire",
    "kills": ["+"]
  },
  "sh": {
    "name": "shield",
    "kills": ["+", "fi"]
  },
  "ss": {
    "name": "superstrong",
    "kills": ["+", "sh", "fi", "1", "3"]
  },
  "no": {
    "name": "normal",
    "kills": ["+", "sh", "fi", "2", "3"]
  },
  "ssl": {
    "name": "sideslash",
    "kills": ["+", "ss", "no", "sh", "fi", "1", "2"]
  },
  "bb": {
    "name": "bangbang",
    "kills": ["+", "fi", "no", "ss", "ssl", "1", "2", "3"]
  }
}

const loads = [
  /*0*/["+", "1", "2", "3"],
  /*1*/["fi", "+", "1", "2", "3"],
  /*2*/["sh", "fi", "+", "1", "2", "3"],
  /*3*/["ss", "no", "sh", "fi", "+", "1", "2", "3"],
  /*4*/["ssl", "ss", "no", "sh", "fi", "+", "1", "2", "3"],
  /*5*/["bb", "ssl", "ss", "no", "sh", "fi", "+", "1", "2", "3"]
]
const counters = [
  /*0*/["+", "fi", "sh", "ss", "no", "ssl", "bb"],
  /*1*/["fi", "sh", "ss", "no", "ssl", "bb", "1"],
  /*2*/["ss", "no", "ssl", "bb", "2", "1"],
  /*3*/["ssl", "ss", "no", "1", "2"],
  /*4*/["ssl", "bb", "3"],
  /*5*/["bb", "sh"]
]

function dbz() {
  let turnCount = parseInt(output.innerHTML[0]) + 1 || 1
  
  let ypoints = parseInt(youP.innerHTML)
  let cpoints = parseInt(cpuP.innerHTML)
  let yloads = parseInt(youL.innerHTML)
  let cloads = parseInt(cpuL.innerHTML)
  let ychoice = input.value
  let cchoice
  
  if (loadUse[ychoice] === undefined) {
    input.value = "try again"
    setTimeout(() => input.value = "", 1000)
    return
  } else if (ychoice !== "+" && Math.abs(loadUse[ychoice]) > yloads) {
    cpuP.innerHTML = cpoints + 1
    cpuL.innerHTML = "0"
    youL.innerHTML = "0"
    
    output.innerHTML = "<strong> Self, cpu wins. </strong>"
    setTimeout(() => output.innerHTML = "", 1500)
    return
  }
  
  if (Math.random()*100 < 100/turnCount) {
    cchoice = "+"
  } else {
    if (cloads === 0) {
      if (yloads === 0) {
        cchoice = "+" //load
      } else {
       let cans = counters[yloads].filter(x => loads[cloads].includes(x))
       cchoice = cans[Math.floor(Math.random() * cans.length)]
      }
    } else {
      let cans = counters[yloads].filter(x => loads[cloads].includes(x))
      if (yloads === 0) {
        cchoice = cans[Math.floor(Math.random() * cans.length)]
      } else {
        cchoice = cans[Math.floor(Math.random() * cans.length)]
      }
    }
  }
  
  youL.innerHTML = yloads + loadUse[ychoice]
  cpuL.innerHTML = cloads + loadUse[cchoice]
  
  if (info[ychoice]["kills"].includes(cchoice)) {
    //you p++
    youP.innerHTML = (ypoints + 1).toString()
    youL.innerHTML = "0"
    cpuL.innerHTML = "0"
    
    output.innerHTML = `<strong>you win</strong>, <strong>you</strong>:${info[ychoice]["name"]} <strong>cpu</strong>:${info[cchoice]["name"]}`
    setTimeout(() => output.innerHTML = "", 2500)
  } else if (info[cchoice]["kills"].includes(ychoice)) {
    //cpu p++
    cpuP.innerHTML = (cpoints + 1).toString()
    youL.innerHTML = "0"
    cpuL.innerHTML = "0"
    
    output.innerHTML = `<strong>cpu wins</strong>, <strong>you</strong>:${info[ychoice]["name"]} <strong>cpu</strong>:${info[cchoice]["name"]}`
    setTimeout(() => output.innerHTML = "", 2500)
  } else {
    output.innerHTML = `${turnCount}. <strong>You</strong>:${info[ychoice]["name"]} <strong>cpu</strong>:${info[cchoice]["name"]}.`
    setTimeout(() => output.innerHTML = `${turnCount+1}....`, 2500)
  }
  
  input.value = ""
}

function reset() {
  youP.innerHTML = "0"
  cpuP.innerHTML = "0"
  youL.innerHTML = "0"
  cpuL.innerHTML = "0"
  
  output.innerHTML = "<strong> reset successful </strong>"
  setTimeout(() => output.innerHTML = "", 2000)
}