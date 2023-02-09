import { applicationState, getMessages } from "../data/provider.js"

export const NavBar = () => {
    // return `
    // <nav class="navigation">
    //     <img alt="pb logo" src="../images/pb.png" class="navigation__icon" id="logo">
    //     <div class="navigation__item navigation__name">Giffygram</div>
    //     <div class="<img alt="fountain pen" src="../images/fountain-pen.svg" class="directMessageIcon navigation__icon" id="createMessage">
    //     <button class="notification__count" id="loadMessages">Messages</button>
    //     <button class="fakeLink" id="logout">Logout</button>
        
    // </nav>`
    const MessagesNumber = () => {
        const messages = getMessages()
        const currentUserId = parseInt(localStorage.getItem("gg_user"))
        const currentUserMessages = messages.filter(message => message.receiverId === currentUserId)
    
        return currentUserMessages.length
    }
    return `
    <nav class="navigation">
            <div class="navigation__item navigation__icon">
                <img src="/images/pb.png" alt="Giffygram icon" id="logo">
            </div>
            <div class="navigation__item navigation__name">
                Giffygram
            </div>
            <div class="navigation__item navigation__message">
                <img id="directMessageIcon" src="/images/fountain-pen.svg" alt="Direct message">
                <div class="notification__count" id="loadMessages">
                    ${MessagesNumber()}
                </div>
            </div>
            <div class="navigation__item navigation__logout">
                <button id="logout" class="fakeLink">Logout</button>
            </div>
        </nav>
    `
}

addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "logout") {
        localStorage.removeItem("gg_user")
        dispatchEvent(new CustomEvent("stateChanged"))
    }
})

addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "loadMessages") {
        dispatchEvent(new CustomEvent("loadMessages"))
    }
})

addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "logo") {
        applicationState.chosenUser = {}
        applicationState.checkedFavorites = false
        dispatchEvent(new CustomEvent("goHome"))
    }
})