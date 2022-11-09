const connection_info = document.getElementById("connection_info")
const connection_panel = document.getElementById("connection_panel")
const full_ui = document.getElementById("full_ui")

const savedLoginInfo = JSON.parse(
  window.localStorage.getItem("remote-pc-controller")
)

