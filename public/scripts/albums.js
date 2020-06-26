
if (!localStorage.getItem('rememberMe') && !sessionStorage.getItem('loggedIn')) {
    window.location.replace('login.html');
  } else {
    const userID = window.location.href.split('?')[1].split('=')[1];
    let userAlbums = null;
    const addbtn = document.querySelector('button[class = "addbtn"');

    async function getUserAlbums(){
      const userAlbumsR=await fetch('http://localhost:3000/api/albums',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userID
          })
      });
      
      userAlbums = await userAlbumsR.json();
      console.log(userAlbums);
      if(userAlbums.length){
        displayAlbums(userAlbums);
      }
  }

    function displayAlbums(albums){
      document.querySelector('#main').innerHTML="";

      for(album of albums){
        const albumHTML=`<div class="album" id="${album.albumID}" style="border:1px solid #ccc"><img src="${album.imgURL}" /> 
        <div class="clearfix">
            <button class="remove" type="submit">Remove</button>
        </div>
        </div>`;
        document.querySelector('#main').insertAdjacentHTML('beforeend', albumHTML);
    }
  }

    async function addAlbum(event){
        event.preventDefault();
        const imgURL = document.querySelector('#url-input').value;
        let res;
        try {
        res = await fetch('http://localhost:3000/api/albums/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            userID,
            imgURL
            })
        });
        userAlbums=await res.json();
        displayAlbums(userAlbums);
        }catch(err){
            console.log(err);
        }
        
    }
    
    addbtn.addEventListener('click', addAlbum);

    document.querySelector('#logoutbtn').addEventListener('click', () => {

        localStorage.removeItem('rememberMe');
        localStorage.removeItem('userID');
        window.location.replace("login.html");
        
    });

    document.addEventListener('contextmenu', function (event){
      event.preventDefault();
      alert('nu ai de ce sa folosesti click dreapta');
    });

    document.addEventListener('keydown', function(event) {
      if (event.code == 'KeyS' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        Swal.fire('Nu ai de ce sa salvezi')
      }
      if (event.code == 'KeyA' && (event.ctrlKey || event.metaKey)) {
        addAlbum(event);
      }
    });


    getUserAlbums();

    var removeAlbumbuttons = document.getElementsByClassName('remove')
    console.log(removeAlbumbuttons)
    
    async function removeAlbum(event){
      await fetch('http://localhost:3000/api/albums',{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userID,
          albumID
        })
      });
      getUserAlbums();
  }
    
    
}