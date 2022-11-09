const connection_info = document.getElementById("connection_info")
const connection_panel = document.getElementById("connection_panel")
const full_ui = document.getElementById("full_ui")

const savedLoginInfo = JSON.parse(
  window.localStorage.getItem("remote-pc-controller")
)

const hide_element = (element) => {
  element.style.display = "none"
}

const connect = (ip, secret) => {
  fetch(`http://${ip}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: secret,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      if (data.Status) {
        return hide_element(connection_panel)
      } else {
        window.localStorage.removeItem("remote-pc-controller")
        hide_element(full_ui)
        return hide_element(connection_info)
      }
    })
}

if (savedLoginInfo) {
  connect(savedLoginInfo.address, savedLoginInfo.secret_key)
}

if (!savedLoginInfo) {
  hide_element(full_ui)
  hide_element(connection_info)
} 