var list = document.getElementById("gamesList")
list.innerHTML = [
  "flames",
  "roll",
  "dbz",
  "ttt",
  "joystick",
  "handcricket"
].map(x => `
  <li>
    <a href="/${x}.html"> ${x} </a>
  </li>
`).join("")
