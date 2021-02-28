import { auth, provider } from "../firebase";

const signInWithGoogle = async () => {
    let user;
    await auth.signInWithPopup(provider)
        .then((res) => {
            console.log(res.user);
            user = res.user
        }).catch((err) => {
            console.log(err.message);
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
            console.log(err);
        })
    return sucess
}

export {signInWithGoogle , logOut}