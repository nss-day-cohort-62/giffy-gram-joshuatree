import { getUsers, sendPost } from "../data/provider.js";

export const PostEntry = () => {
    
    return `
    <button id="formV">Post Your Gif</button>
    <div id="postForm">
            <form>
                <fieldset>
                    <label for="title">Title:</label>
                    <input type="text" name="title" autofocus placeholder="Your Title" />
                </fieldset>
                <fieldset>
                    <label for="url">URL:</label>
                    <input type="text" name="url" placeholder="Your gif URL" />
                </fieldset>
                <fieldset>
                    <label for="story">Story:</label>
                    <textarea name="story" placeholder="Your gif's story"></textarea>
                </fieldset>
            </form>
            <button id="saveButton">Save Post</button>
            <button id="cancelButton">Cancel</button>
        </div>
    `
}

addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveButton") {
        const postTitle = document.querySelector("input[name='title']").value
        const postURL = document.querySelector("input[name='url']").value
        const postStory = document.querySelector("textarea[name='story']").value
        const postDate = new Date().toLocaleDateString()
        const postUser = parseInt(localStorage.getItem("gg_user"))

        const newPostToAPI = {
            title: postTitle,
            url: postURL,
            story: postStory,
            date: postDate,
            userId: postUser
        }

        sendPost(newPostToAPI)
        dispatchEvent(new CustomEvent("stateChanged"))
    }
})

// const btn = document.getElementById("formV")

// btn.addEventListener("click", () => {
//     const form = document.getElementById("postForm")
//     if (form.style.visibility === "hidden") {
//         form.style.visibility = "visible"
//     }
//     else {
//         form.style.visibility = "hidden"
//     }
// })