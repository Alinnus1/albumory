if (localStorage.getItem('rememberMe') === 'true') {
    const userID = localStorage.getItem('userID');
    window.location.replace(`albums.html?id=${userID}`);
};
  
const loginbtn = document.querySelector('button[type = "submit"');
const showbtn = document.getElementById("show")
const log = document.getElementById("mainu")
  
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

const myStorage = [];

showbtn.addEventListener('click',(event)=>{
  log.innerHTML="";
  myStorage.forEach(element =>log.innerHTML+= `<div>${element}</div>`)
})
window.addEventListener("click",(event)=>{
    
    var now=new Date();

    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day =  now.getDate();
    var hour = now.getHours();
    var minutes=now.getMinutes();
    var seconds = now.getSeconds();
    const X=event.clientX;
    const Y=event.clientY;

    if(seconds<10) seconds= "0" + seconds;
    if(hour<10) hour= "0" + hour;
    if(minutes<10) minutes= "0" + minutes;


    const eventLine=`${year}/${month}/${day} ${hour}:${minutes}:${seconds} ${event.type}, coord ${X},${Y}`

    myStorage.push(eventLine);
})
window.addEventListener("keydown",(event)=>{
    var now=new Date();

    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day =  now.getDate();
    var hour = now.getHours();
    var minutes=now.getMinutes();
    var seconds = now.getSeconds();

    if(seconds<10) seconds= "0" + seconds;
    if(hour<10) hour= "0" + hour;
    if(minutes<10) minutes= "0" + minutes;

    
    
    const eventLine=`${year}/${month}/${day} ${hour}:${minutes}:${seconds} ${event.type}, tasta ${event.key}`
    myStorage.push(eventLine);
})
window.addEventListener("dblclick",(event)=>{
    var now=new Date();

    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day =  now.getDate();
    var hour = now.getHours();
    var minutes=now.getMinutes();
    var seconds = now.getSeconds();
    const X=event.clientX;
    const Y=event.clientY;

    if(seconds<10) seconds= "0" + seconds;
    if(hour<10) hour= "0" + hour;
    if(minutes<10) minutes= "0" + minutes;


    const eventLine=`${year}/${month}/${day} ${hour}:${minutes}:${seconds} ${event.type}, coord ${X},${Y}`
    myStorage.push(eventLine);
})
window.addEventListener("copy",(event)=>{
    var now=new Date();

    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day =  now.getDate();
    var hour = now.getHours();
    var minutes=now.getMinutes();
    var seconds = now.getSeconds();

    if(seconds<10) seconds= "0" + seconds;
    if(hour<10) hour= "0" + hour;
    if(minutes<10) minutes= "0" + minutes;

    const selection = document.getSelection();
    const eventLine=`${year}/${month}/${day} ${hour}:${minutes}:${seconds} ${event.type}, textu copiat : ${selection}`
    myStorage.push(eventLine);
    
})


