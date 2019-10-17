export default function ({ store, redirect, app }) {
    if (app.router.history.current.path !== '/' && !store.getters['user/idToken']){
        const url = app.router.history.current.path
        localStorage.setItem('goUrl', url)
        window.location.href = '/'
    }
}