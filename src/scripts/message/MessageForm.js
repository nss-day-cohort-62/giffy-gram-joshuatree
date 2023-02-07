import { getUsers, sendMessages } from "../data/provider.js"

export const MessageForm = () => {
    const users = getUsers()

    return `
        <div id="messageForm" style="display:none">
            <form>
                <fieldset>
                    <label for="recipient">Recipient:</label>
                    <select id="recipient">
                        <option value="0">Choose...</option>
                    ${users.map(user => {
                        return `<option value="${user.id}">${user.name}</option>`
                    })}
                    </select>
                </fieldset>
                <fieldset>
                    <label for="content">Message:</label>
                    <textarea name="content" placeholder="Your message here"></textarea>
                </fieldset>
            </form>
            <button id="sendMessageButton">Send Message</button>
            <button id="cancelMessageButton">Cancel</button>
        </div>
    `
}

addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "sendMessageButton") {
        const senderId = parseInt(localStorage.getItem("gg_user"))
        const receiverId = document.querySelector("select[id='recipient']").value
        const content = document.querySelector("textarea[name='content']").value

        const messageToSendToAPI = {
            senderId: senderId,
            receiverId: parseInt(receiverId),
            content: content
        }

        sendMessages(messageToSendToAPI)
        dispatchEvent(new CustomEvent("stateChanged"))
    }
})

addEventListener("click", clickEvent => {
    if ((clickEvent.target.id === "createMessage") || (clickEvent.target.id === "cancelMessageButton")) {
    const form = document.getElementById("messageForm")
    if (form.style.display === "none") {
        form.style.display = "block"
    } else {
        form.style.display = "none"
    }
}
})