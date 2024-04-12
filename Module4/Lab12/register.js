function openNewWindow(event) {
    event.preventDefault();
    var newText = "Некоторый текст";
    var newWindow = window.open('', '_blank', 'width=400,height=300');
    newWindow.document.write("<h1>" + newText + "</h1>");
}

document.addEventListener('DOMContentLoaded', function() {
    var a = document.createElement('a');
    a.href = '#';
    a.textContent = 'Гиперссылкa, при нажатии на которую открывается новое окно с некоторым текстом'; 

    a.addEventListener("click", openNewWindow);

    document.querySelector('.panel').appendChild(a);
});

function showUser() {
    document.querySelector('.info').innerHTML = ''

    var name = document.createElement('p');
    name.textContent = this.name;
    document.querySelector('.info').appendChild(name);

    var email = document.createElement('p');
    email.textContent = this.email;
    document.querySelector('.info').appendChild(email);

    var password = document.createElement('p');
    password.textContent = this.password;
    document.querySelector('.info').appendChild(password);
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
