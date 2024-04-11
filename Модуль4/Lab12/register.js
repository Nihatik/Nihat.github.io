function doDisplay(popup) {
    i = popup.selectedIndex;
    eval(popup.options[i].text + ".showUser()");
    }

var resultWindow;
function showUser() {
    var result = "<html><body><p>" + this.name + "</p><br><p>" + this.email + "</p><br><p>" + this.password + "</p><br></body></html>";
    if (resultWindow==undefined){
        resultWindow=window.open();
        resultWindow.document.write(result);
        resultWindow.document.close();   
    }
}

function user(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.showUser = showUser;
    }

function register(){
    userName = document.getElementById('username').value
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    var User = new user(userName, email, password)
    eval("User.showUser()")
}
