//ENCAPSULATION
function MyTunes(){

//This was given in instruction, but it also references a myTracks array...
//   var myTracks = loadTracks();

//myPlaylist array
  var myPlaylist = []

//alias for this
  var tunesService = this;

//new item from challenge  
  tunesService.getTracks = function getTracks(artist, callback) {
      var url = '//bcw-getter.herokuapp.com/?url=';
      var url2 = 'https://itunes.apple.com/search?term=' + artist;
      var apiUrl = url + encodeURIComponent(url2);

      $('#get-music-button').text('LOADING....');

      return $.getJSON(apiUrl).then(function (response) {
          songList = response.results.map(function (song) {
              return {
                  title: song.trackName,
                  albumArt: song.artworkUrl60,
                  artist: song.artistName,
                  collection: song.collectionName,
                  price: song.collectionPrice,
                  preview: song.previewUrl,
                  id: song.trackId,
                  rating: 0
              };
          })
          $('#get-music-button').text('GET MUSIC');
          return songList;
      })
    }

//to get playlist songs
    tunesService.getMyPlaylist = function getMyPlaylist(){
        return myPlaylist
    }

//function to add a song to a playlist  
  tunesService.addTrack = function addTrack(id){
      for (var i = 0; i < songList.length; i++) {
          var songToAdd = songList[i];
          if (id == songToAdd.id) {
              myPlaylist.push(songToAdd)
              tunesService.saveTracks()
          }
      }
  }
  //function to remove a track from my playlist
  tunesService.removeTrack = function removeTrack(id){
      for (var i = 0; i < myPlaylist.length; i++) {
          var songToDrop = myPlaylist[i];
          if (id == songToDrop.id) {
              myPlaylist.splice(i,1)
              tunesService.saveTracks()
          }
      }
  }
  //function to like ("promote") a song
  tunesService.promoteTrack = function promoteTrack(id){
      for (var i = 0; i < myPlaylist.length; i++) {
          var songToLike = myPlaylist[i];
      if (id == songToLike.id) {
           songToLike.rating ++
        }
      }
      tunesService.sortByRating(myPlaylist)
  }

//function to dislike (demote)
  tunesService.demoteTrack = function demoteTrack(id){
      for (var i = 0; i < myPlaylist.length; i++) {
          var songToDislike = myPlaylist[i];
      if (id == songToDislike.id && songToDislike.rating > 0){
          songToDislike.rating --
      }
      }
      tunesService.sortByRating(myPlaylist)
  }
  

//Sorting function
  tunesService.sortByRating = function sortByRating(rating){
      return myPlaylist.sort(function (a,b){
          if(a.rating > b.rating){
              return -1
          }
          if(a.rating < b.rating){
              return 1
          }
          if(a.rating == b.rating){
              return 0
          }
      })
  }


//brought in from codefoo
  tunesService.saveTracks = function saveTracks(){
      localStorage.setItem('randomVar',JSON.stringify(myPlaylist))
  }
  tunesService.loadTracks = function loadTracks(callback){
     var temp = localStorage.getItem('randomVar')
      if (temp) {
        myPlaylist = JSON.parse(temp)
  }
    callback(myPlaylist)
   }   


}