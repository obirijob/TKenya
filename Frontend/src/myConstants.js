let bu = 'http://localhost:2000'
let myConstants = {
    backendUrl: bu,
    // numberFormat: function numberWithCommas(x) {
    //     return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    // },
    getParameterByName: function (name, url) {
        if (!url) url = window.location.href;
        // eslint-disable-next-line
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },
    googleCode: "645915236519-246iel8buv7dm680mo907i1ei6v08vqq.apps.googleusercontent.com",
    getRandomInt: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getLoggedUser: (token) => fetch(`${bu}/accounts/loggeduser/${token}`),
    makeLike: (entity, kind) => fetch(`${bu}/likes/${entity}/${kind}`, { method: 'POST', headers: { 'authtoken': localStorage.getItem('authtoken') } }),
    makeComment: (entity, message) => fetch(`${bu}/comments/${entity}`, { method: 'POST', headers: { 'authtoken': localStorage.getItem('authtoken'), 'Content-Type': 'application/json' }, body: JSON.stringify({ message: message }) }),
    getEntityLikes: (entity) => fetch(`${bu}/likes/e/${entity}`, { method: 'GET', headers: { 'authtoken': localStorage.getItem('authtoken') } }),
    getEntityComments: (entity) => fetch(`${bu}/comments/e/${entity}`)

}
export default myConstants