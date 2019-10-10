export default function ({ store, redirect, app }) {
    if (app.router.currentRoute.name !== 'index' && !store.getters['user/idToken']){
        window.location.href = '/'
    }
}