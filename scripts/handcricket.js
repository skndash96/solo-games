const input = document.getElementById("input")
const output = document.getElementById("output")
const form = document.querySelector("form")

const Oinnings = document.querySelector("innings")
const Otarget = document.querySelector("target")
const Oscore = document.querySelector("score")
const Owickets = document.querySelector("wickets")
const Obat = document.querySelector("batsman")
const Oball = document.querySelector("bowler")

function handcricket() {
  form.addEventListener("submit", e => {
    e.preventDefault()
    handleAction()
  })
  
  let youIsBat = Math.random() < .5 ? true : false
  Obat.innerHTML = youIsBat ? "you" : "cpu"
  Oball.innerHTML = youIsBat ? "cpu" : "you"
  
  let isInnings1 = true
  let youChance = true
  
  const w = prompt("No. of wickets", "1") || 1
  let wl = w
  Owickets.innerHTML = wl
  let sc = 0
  let tg;
  let logs = [
    { bat: [],
      ball: [] },
    { bat: [],
      ball: [] }
  ]
  let countHits = {"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0}
  
  function selection() {
    let log = logs[isInnings1?0:1]
    let bat = log.bat.length < 5 ? new Array(5-log.bat.length).fill(0).concat(log.bat) : log.bat
    let ball = log.ball.length < 5 ? new Array(5-log.ball.length).fill(0).concat(log.ball) : log.ball
    
    if (youIsBat) {
      if (
        (bat[4] && bat[4] === bat[3] && Math.random() < .5) ||
        (bat[4] && bat[4] === bat[3] && bat[4] === bat[2])
      ) {
        return [bat[4], "mode"]
      } else {
        let random = Math.random()
        let total = Object.values(countHits).reduce((acc,v) => acc+v, 0)
        let keys = Object.keys(countHits).sort((a,b) => countHits[a]-countHits[b])
        
        let loopTotal = 0
        
        for (let i = 0; i < keys.length; i++) {
          loopTotal += countHits[keys[i]]
          
          if (random < loopTotal/total) {
            return random < .5
              ? [parseInt(keys[i]), "loopT"]
              : [(random < .5
                ? parseInt(keys[i]) + 1
                : parseInt(keys[i]) - 1
              ) || parseInt(keys[i]), "loopF"]
          } else if (i === keys.length-1) {
            return [countHits[keys[keys.length-1]] || Math.floor(Math.random() * 10)+1, "loopN"]
          }
        }
      }
    } else {
      let random = Math.floor(Math.random() * 10) + 1
      if (ball[4] === ball[3] && ball[4] === random) return [random<10 ? random+1 : random-1]
      else return [random]
    }
  }
  
  function handleAction() {
    let [ci, reason] = selection()
    let yi = parseInt(input.value)
    
    console.log(reason)
    
    if (!yi || yi < 1 || yi > 10) {
      input.value = "invalid input, only 1 to 10"
      setTimeout(() => input.value = "", 2000)
      return
    } else {//logging
      if (!youChance) return
      else youChance = false
      
      logs[isInnings1 ? 0 : 1].bat.push(youIsBat ? yi : ci)
      logs[isInnings1 ? 0 : 1].ball.push(youIsBat ? ci : yi)
      if (youIsBat) countHits[`${yi}`] += 1
    }
    
    if (isInnings1) {
      if (yi === ci) {
          wl -= 1
          Owickets.innerHTML = wl
          
          if (!wl) {
            isInnings1 = false
            youIsBat = !youIsBat
            tg = sc + 1
            sc = 0
            wl = w
            
            Owickets.innerHTML = 0
            Oinnings.innerHTML = 2
            Obat.innerHTML = youIsBat ? "you" : "cpu"
            Oball.innerHTML = youIsBat ? "cpu" : "you"
            Otarget.innerHTML = tg
            Oscore.innerHTML = `0/0 (0.0)`
          }
          
          output.innerHTML = `Wicket, ${
            wl === w
            ? (youIsBat ? "cpu" : "you")
            : (youIsBat ? "you" : "cpu")
          } hit ${youIsBat ? yi : ci}, was bowled ${youIsBat ? ci : yi}`
      } else {
          sc += yi
          Oscore.innerHTML = `${sc}/${w-wl} (${Math.floor(logs[0].ball.length/6)}.${logs[0].ball.length%6})`
          
          output.innerHTML = `${
            youIsBat ? "you" : "cpu"
          } hit ${youIsBat ? yi : ci}, was bowled ${youIsBat ? ci : yi}`
      }
    } else {
      if (yi === ci) {
          wl -= 1
          Owickets.innerHTML = wl
          
          if (!wl) {
            output.innerHTML = `Wicket, ${youIsBat ? 'cpu' : 'you'} won.`
            return
          }
          
          output.innerHTML = `Wicket, ${
            youIsBat ? "you" : "cpu"
          } hit ${youIsBat ? yi : ci}, was bowled ${youIsBat ? ci : yi}`
      } else {
          sc += yi
          Oscore.innerHTML = `${sc}/${w-wl} (${Math.floor(logs[0].ball.length/6)}.${logs[0].ball.length%6})`
          
          if (sc >= tg) {
            output.innerHTML = `Target crossed, ${youIsBat ? 'you' : 'cpu'} won.`
            return
          }
          
          output.innerHTML = `${
            youIsBat ? "you" : "cpu"
          } hit ${youIsBat ? yi : ci}, was bowled ${youIsBat ? ci : yi}`
      }
    }
    
    setTimeout(() => {
      output.innerHTML = ""
      youChance = true
    }, 2500)
  }
}

function reset() {
  Oinnings.innerHTML = 1
  Otarget.innerHTML = "n/a" 
  Oscore.innerHTML = "0/0 (0.0)"
  Owickets.innerHTML = 0
  Obat.innerHTML = "n/a"
  Oball.innerHTML = "n/a"
  output.innerHTML = ""
  input.value = ""
  
  handcricket()
}