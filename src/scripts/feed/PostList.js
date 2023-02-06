import { getPosts, getUsers } from "../data/provider.js";
import { PostEntry } from "./PostEntry.js";


export const PostList = () => {
    const posts = getPosts()
const matchPostToUser = (post) => {
    const users = getUsers()
    const matchedUser = users.find(user => user.id === post.userId) 
    return `${matchedUser.name}`
}

    return `
    ${PostEntry()}
    <div class="postList">

    ${posts.map(post => {
        return `<div class="post">
        <h3>${post.title}</h3>
        <img src="${post.url}" alt="A gif" />
        <p>${post.story}</p>
        <p>Posted by ${matchPostToUser(post)} on ${post.date}</p>
        </div>`
    }).join("")}
        </div > `
}

