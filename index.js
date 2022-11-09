const connection_info = document.getElementById("connection_info")
const connection_panel = document.getElementById("connection_panel")
const full_ui = document.getElementById("full_ui")
const address_element = document.getElementById("address")
const secret_key_element = document.getElementById("secret_key")
const connect_button = document.getElementById("connect_button")
const logout = document.getElementById("logout")
let addressServer
let secret_key_server

const savedLoginInfo = JSON.parse(
  window.localStorage.getItem("remote-pc-controller")
)

const hide_element = (element) => {
  element.style.display = "none"
}

const unhide_element = (element) => {
  element.style.display = "block"
}

const connect = (address, secret) => {
  console.log(address, secret)
  fetch(`http://${address}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: secret,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      if (data.Status) {
        addressServer = address
        secret_key_server = secret
        window.localStorage.setItem(
          "remote-pc-controller",
          JSON.stringify({
            address: address,
            secret_key: secret,
          })
        )
        unhide_element(connection_info)
        unhide_element(full_ui)
        return hide_element(connection_panel)
      } else {
        window.localStorage.removeItem("remote-pc-controller")
        hide_element(full_ui)
        return hide_element(connection_info)
      }
    })
}

const exec = (command) => {
  command = command + " &"
  fetch(`http://${addressServer}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: secret_key_server,
    },
    body: JSON.stringify({
      command: command,
    }),
  })
}

if (savedLoginInfo) {
  connect(savedLoginInfo.address, savedLoginInfo.secret_key)
}

if (!savedLoginInfo) {
  hide_element(full_ui)
  hide_element(connection_info)
}

connect_button.addEventListener("click", () =>
  connect(address_element.value, secret_key_element.value)
)

logout.addEventListener("click", () => {
  window.localStorage.removeItem("remote-pc-controller")
  unhide_element(connection_panel)
  hide_element(full_ui)
  hide_element(connection_info)
})
