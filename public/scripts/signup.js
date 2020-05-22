if (localStorage.getItem('rememberMe') === 'true') {
  const userID = localStorage.getItem('userID');
  window.location.replace(`albums.html?id=${userID}`);
};



const signupbtn = document.querySelector('button[type = "submit"]');

async function signup(event){
    event.preventDefault();
    const name = document.querySelector('#name-input').value;
    const email = document.querySelector('#email-input').value;
    const psw = document.querySelector('#psw-input').value;
    const rpsw = document.querySelector('#psw-repeat-input').value;

    //if info ok
    if (name && email && psw && rpsw) {
        if (psw !== rpsw) {
          console.log("pass dont match");
        } else {
          const res = await fetch('http://localhost:3000/api/users/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "name": name,
              "email": email,
              "password": psw
            })
          });
          console.log("acc created");
          setTimeout(() => window.location.replace('login.html'), 2000);
        }
      } else { //else prompt the user to fill all the info
        console.log("fill alll bitc")
      }
}

signupbtn.addEventListener('click', signup);
window.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    signup(event);
  }
});


//regex
const passwordField = document.querySelector('#psw-input');
const regexMinLength = /^.{8,}$/;
const regexCapital = /^(.*[A-Z].*)+$/;
const regexNumber = /^(.*[0-9].*)+$/;
const regexSpecial = /^(.*[!@#$%^&*(){}[\]\\\|:;'",.<>\/ ? `~_=+-].*)+$/;
passwordField.addEventListener('keyup', event => {
  if (regexMinLength.test(passwordField.value)) {
    document.querySelector('#psw-min-length').classList.remove('not-met');
  } else {
    document.querySelector('#psw-min-length').classList.add('not-met');
  }
  if (regexCapital.test(passwordField.value)) {
    document.querySelector('#psw-capital').classList.remove('not-met');
  } else {
    document.querySelector('#psw-capital').classList.add('not-met');
  }
  if (regexNumber.test(passwordField.value)) {
    document.querySelector('#psw-number').classList.remove('not-met');
  } else {
    document.querySelector('#psw-number').classList.add('not-met');
  }
  if (regexSpecial.test(passwordField.value)) {
    document.querySelector('#psw-special').classList.remove('not-met');
  } else {
    document.querySelector('#psw-special').classList.add('not-met');
  }
});
