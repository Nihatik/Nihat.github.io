
document.addEventListener('DOMContentLoaded', onLoad)
function onLoad(){
    console.log('q')
    if(!localStorage.getItem("theme")){
        localStorage.setItem("theme", 'light-theme')
    }
    let currentTheme = localStorage.getItem("theme")
    if (currentTheme === 'light-theme') {
        document.body.className = 'dark-theme';
    } else {
        document.body.className = 'light-theme';
    }
    if(!document.getElementById('theme-slider')){return}
    document.getElementById('theme-slider').addEventListener('click', function () {
        const currentTheme = document.body.className;
        if (currentTheme === 'light-theme') {
            document.body.className = 'dark-theme';
        } else {
            document.body.className = 'light-theme';
        }
        localStorage.setItem("theme", currentTheme)
    });
}

