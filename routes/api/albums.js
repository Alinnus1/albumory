const express = require('express');
const uuid = require('uuid');
const albumsData = require('../../Albums');
const router=express.Router();

let albums;

async function readAlbums(){
    albums = await albumsData.getAll();

    //all albums of user
    router.get('/', (req, res) => {
      res.json(albums)
    });
    // adding an album to data for specific user
    router.post('/', async (req, res) => {
      if(typeof req.body.imgURL !== "undefined"){
        const newAlbum = {
          albumID: uuid.v4(),
          imgURL: req.body.imgURL,
        };
        if (!albums[req.body.userID]) {
            albums[req.body.userID] = [newAlbum];
        } else {
            albums[req.body.userID].push(newAlbum);
        }
        console.log('album created!');
      }else{
  
      }
        res.json(albums[req.body.userID]);
        await albumsData.writeAll(albums);
      });

    router.delete('/', async(req,res)=>{
      const userID=req.body.userID;
      const albumID=req.body.albumID;
      const found = albums[userID].some(album=>album.albumID===albumID);

      if(found){
        const index =albums[userID].findIndex(album=>album.albumID===albumID);
        albums[userID].splice(index,1);

        albumsData.writeAll(albums);
        console.log('album deleted');
        res.json(albums[userID]);

      }else{
        res.status(400).json({
          msg:`no album with the id ${albumID} foundt`
        });
      }

    });

}
readAlbums();
module.exports = router;