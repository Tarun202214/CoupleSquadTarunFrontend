import { BACKEND } from './backend'
export const signup = (user) => {
    return fetch(`${BACKEND}/signup`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(response => {
        return response.json()
    }
    ).catch(err => console.log("err", err))
}

export const signin = (user) => {
    return fetch(`${BACKEND}/login`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(response => {
        return response.json()
    }
    ).catch(err => console.log("err", err))
}

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem("jwt", JSON.stringify(data))
        next()
    }
}

export const updateUser = (data) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem("jwt", JSON.stringify(data))
    }
}

export const signout = (next) => {
    console.log('removing')
    if (typeof window !== 'undefined') {
        localStorage.removeItem("jwt")
    }
    return fetch(`${BACKEND}/signout`, {
        method: 'POST'
    })
        .then(response => {
            console.log('removing')
            return response.json()
        })
        .catch(err => console.log(err))
}

export const isAuthenticated = () => {
    if (typeof window === 'undefined') {
        return false;
    }
    if (localStorage.getItem("jwt")) {
        console.log("", typeof window === 'undefined');
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else {
        return false
    }
}