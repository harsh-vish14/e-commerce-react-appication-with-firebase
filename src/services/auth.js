import { auth, provider } from "../firebase";

const signInWithGoogle = async () => {
    let user;
    await auth.signInWithPopup(provider)
        .then((res) => {
            user = res.user
        }).catch((err) => {
        })
    return user;
}

const logOut = async () => {
    let sucess;
    await auth.signOut()
        .then(() => {
            sucess = true;
        })
        .catch((err) => {
        })
    return sucess
}

export {signInWithGoogle , logOut}