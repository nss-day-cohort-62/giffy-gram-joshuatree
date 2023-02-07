import { getUsers, sendNewUser } from "../data/provider.js"


/* document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "loginButton") {
        let foundUser = null
        const userState = getUsers()

        const email = document.querySelector("input[name='email']").value
        const password = document.querySelector("input[name='password']").value

        for (const user of userState) {
            if (user.email === email && user.password === password) {
                foundUser = user
            }
        }

        if (foundUser !== null) {
            localStorage.setItem("gg_user", foundUser.id)
            dispatchEvent(new CustomEvent("stateChanged"))
        }
    }
}) */

export const RegistrationForm = () => {
    return `
        <div class="loginForm">
        <h2>New User? Sign up for our very cool website!</h2>
            <form>
                <fieldset>
                    <label for="name">Name:</label>
                    <input type="text" name="newName" autofocus placeholder="Name" />
                </fieldset>
                <fieldset>
                    <label for="email">Email:</label>
                    <input type="text" name="newEmail" autofocus placeholder="Email address" />
                </fieldset>
                <fieldset>
                    <label for="password">Password:</label>
                    <input type="password" name="newPassword" placeholder="Password" />
                </fieldset>
            </form>
            <button id="registrationButton">Register</button>
        </div>
    `
}

addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "registrationButton") {
        const userName = document.querySelector("input[name='newName']").value
        const userEmail = document.querySelector("input[name='newEmail']").value
        const userPassword = document.querySelector("input[name='newPassword']").value

        const newUserToAPI = {
            name: userName,
            email: userEmail,
            password: userPassword
        }

        sendNewUser(newUserToAPI)
     //   getUsers() //maybe this doesn't need to be here? it does for now, but maybe not later?
        dispatchEvent(new CustomEvent("stateChanged"))
    }
})