const form = document.querySelector("form")
const output = document.getElementById("output")
const bi = document.getElementById("boy")
const gi = document.getElementById("girl")

form.addEventListener("submit", (event) => {
  event.preventDefault()
  
  let b = [...bi.value.toLowerCase().split(/ +/).join("")]
  let g = [...gi.value.toLowerCase().split(/ +/).join("")]
  let nb = b.filter(l => !g.find(x => x === l))
  let ng = g.filter(l => !b.find(x => x === l))

  let total = nb.length + ng.length
  let results = ["F", "L", "A", "M", "E", "S"]
  let startidx = 0;
  
  for (let i = 0; i < 6; i++) {
    if (i === 5) {
      output.innerHTML = results[0]
    } else {
      let r = (startidx+total)%results.length
      let idx = r === 0 ? results.length - 1 : r - 1
      startidx = idx === results.length - 1 ? 0 : idx
      
      results.splice(idx, 1)
    }
  }
})