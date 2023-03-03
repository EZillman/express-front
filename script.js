let userList = document.getElementById('userList');
let newUsername = document.getElementById('newUsername');
let newPassword = document.getElementById('newPassword');
let saveUserBtn = document.getElementById('saveUserBtn');
let loginUsername = document.getElementById('loginUsername');
let loginPassword = document.getElementById('loginPassword');
let loginBtn = document.getElementById('loginBtn');
let userGreeting = document.getElementById('userGreeting');


fetch('http://localhost:3000/users/')
.then(res => res.json())
.then(data => {
    printUsers(data);
});

let loggedInUser = localStorage.getItem('username');
if (loggedInUser) {
    userGreeting.innerText = 'Goodmorning ' + loggedInUser;
}

function printUsers(users) {
    //console.log(users);

    userList.innerHTML = '';

    users.map(user => {
        let li = document.createElement('li');
        li.id = user.id;
        li.innerText = user.name;
        userList.appendChild(li);
    });
};

saveUserBtn.addEventListener('click', () => {
    let user = {name: newUsername.value, password: newPassword.value};
    //console.log(user);

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        printUsers(data);
    });
    newUsername.value = '';
    newPassword.value = '';
});
    

loginBtn.addEventListener('click', () => {
    let loginUser = {name: loginUsername.value, password: loginPassword.value};
    console.log(loginUser);

    fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginUser)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data.name) {
            userGreeting.innerText = 'Goodmorning ' + data.name;
            localStorage.setItem('username', data.name);
        } else {
            userGreeting.innerText = 'Incorrect username or password';
        }
    });

    loginUsername.value = '';
    loginPassword.value = '';
}); 