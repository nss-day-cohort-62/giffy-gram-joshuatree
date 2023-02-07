import { PostList } from "./feed/PostList.js"
import { MessageList } from "./friends/DirectMessage.js"
import { MessageForm } from "./message/MessageForm.js"
import { NavBar } from "./nav/NavBar.js"


export const GiffyGram = () => {

    // Show main main UI
    return `
    ${NavBar()}
    <h1>Giffygram</h1>
    ${PostList()}`
    
}

//inside GiffyGram we'll need to add event listeners and invoke PostList or PostByUser