export const NavBar = () => {
    return `
    <button id="btn__logout">Logout</button>`
}

addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "btn__logout") {
        localStorage.removeItem("gg_user")
        dispatchEvent(new CustomEvent("stateChanged"))
    }
})