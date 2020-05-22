if (localStorage.getItem('rememberMe') === 'true') {
    const userID = localStorage.getItem('userID');
    window.location.replace(`albums.html?id=${userID}`);
};
  
const loginbtn = document.querySelector('button[type = "submit"');
  
async function login(event) {
    event.preventDefault();
    const email = document.querySelector('#email-input').value;
    const psw = document.querySelector('#psw-input').value;
    const rememberMe = document.querySelector('#rememberme');

  
    let res;
    try {
      res = await fetch('http://localhost:3000/api/users/user/id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": email,
          "password": psw
        })
      });
    
  
    try {
        const raspuns = await res.json();
        if (raspuns.found) {
          sessionStorage.setItem('loggedIn', 'true');
  
          if (rememberMe.checked) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('userID', raspuns.id);
          }
          console.log("login succesful")
          setTimeout(() => window.location.replace(`albums.html?id=${raspuns.id}`), 2000);
        } else {
          console.log("invalid mail or pasw")
        }
      } catch (err) {
        console.error(err);
      }
    } catch (err) {
      console.error(err);
    }
  
}


loginbtn.addEventListener('click', login);
window.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      login(event);
    }
});