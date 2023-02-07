import { getMessages, getUsers } from "../data/provider.js"
import { NavBar } from "../nav/NavBar.js"


export const MessageList = () => {
    const messages = getMessages()
    const users = getUsers()
    const currentUserId = parseInt(localStorage.getItem("gg_user"))
    const currentUserMessages = messages.filter(message => message.receiverId === currentUserId)
    const matchSender = (message) => {
        const currentSender = users.find(user => message.senderId === user.id)
        return `${currentSender.name}`
    }

    return `
    ${NavBar()}
    <div class="DMList">
        ${currentUserMessages.map(message => {
            return `
            <div class="DM">
                From: 
                ${matchSender(message)}
                <p>${message.content}</p>
            </div>`
        })}
    </div>
    `
}