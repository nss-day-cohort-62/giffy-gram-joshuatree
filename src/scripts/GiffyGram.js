import { PostList } from "./feed/PostList.js"
import { MessageList } from "./friends/DirectMessage.js"
import { MessageForm } from "./message/MessageForm.js"
import { Footer } from "./nav/Footer.js"
import { NavBar } from "./nav/NavBar.js"
import { PostEntry } from "./feed/PostEntry.js"

export const GiffyGram = () => {

    // Show main main UI
    return `
    ${NavBar()}
    <h1>Giffygram</h1>
    ${MessageForm()}
    ${PostEntry()}
    ${PostList()}
    ${Footer()}`
}

//inside GiffyGram we'll need to add event listeners and invoke PostList or PostByUser