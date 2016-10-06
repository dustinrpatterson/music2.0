function MusicController(){

var controller = this;
var myTunes = new MyTunes()

//from old controller with new service info
this.getMusic = function getMusic() {
    var artist = document.getElementById('artist').value;
    myTunes.getTracks(artist).then(drawSongs);
}

//button that moves song to playlist
$('#foundMusic').on('click','.addSong', function(){
    // var id =$(this).context.id
    myTunes.addTrack(this.id)
    var artist = document.getElementById('artist').value;
    drawSongs(songList);
    drawPlaylist(myTunes.getMyPlaylist())
})

//button that removes a song from playlist
$('#playlistMusic').on('click','.removeSong', function(){
    // var id =$(this).context.id
    myTunes.removeTrack(this.id)
    drawPlaylist(myTunes.getMyPlaylist())
    drawSongs(songList)
})

//button that adds likes to a song
$('#playlistMusic').on('click','.likeSong', function(){
    // var id =$(this).context.id
    myTunes.promoteTrack(this.id)
    drawPlaylist(myTunes.getMyPlaylist())
})

//button that removes likes from a song
$('#playlistMusic').on('click','.dislikeSong',function(){
    // var id =$(this).context.id
    myTunes.demoteTrack(this.id)
    drawPlaylist(myTunes.getMyPlaylist())
})


//drawSongs manipulates the DOM for songs that result from the search
function drawSongs(songList) {
    var template = "";
    var songElement = $('#foundMusic')
    for (var i = 0; i < songList.length; i++) {
        var foundMusic = songList[i]
        template += `
<div class="songCard">
    <div class="row">
    <div class="col-xs-6">
  <div class="results">
    <div class="flexStuff"><img src="${foundMusic.albumArt}" alt="" />
    <p>Price ${foundMusic.price}</p>
    </div>
    <div class="flexStuff">
      <h2>${foundMusic.title}</h2>
      <p>${foundMusic.artist}</p>
    </div>
    </div>
    </div>

    <div class="col-xs-6">
    <div class="results">
    <div class="flexStuff"><audio controls preload="none">
          <source src="${foundMusic.preview}"> Your browser does not support the audio element.
          </audio>
          <p>Collection: ${foundMusic.collection}</p>
          </div>
    <div class="flexStuff">
      <button class="addSong btn-success" id="${foundMusic.id}"> <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add to Playlist </button>
    </div>
    </div>
    </div>
  </div>
</div>
`
    }
    songElement.empty().append(template)

}

//drawPlaylist manipulates the DOM that are in the playlist
function drawPlaylist(myPlaylist) {
    var playlistTemplate = "";
    var playlistElem = $('#playlistMusic')
    for (var i = 0; i < myPlaylist.length; i++) {
        var mySelectedSong = myPlaylist[i]
        playlistTemplate += `
<div class="playlistCard">
    <div class="row">
        <div class="col-xs-3">
            <div class="results">
                <div class="flexStuff"><img src="${mySelectedSong.albumArt}" alt="" />
                    <button class="removeSong btn-danger" id="${mySelectedSong.id}"> <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Remove </button>
                </div>
                
            </div>
        </div>
        <div class="col-xs-9">
            <div class="results">
                <div class="flexStuff">
                    <h4>${mySelectedSong.title}</h4>
                    <p>${mySelectedSong.artist}</p>
                    <h5> <b>Like Count: ${mySelectedSong.rating}</b></h5>
                    <button class="likeSong btn-primary" id="${mySelectedSong.id}"> <span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span> Like </button>
                    <button class="dislikeSong btn-primary" id="${mySelectedSong.id}"> <span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span> Dislike </button>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12">
            <div class="results">
                <div class="flexStuff">
                <audio controls preload="none">
                        <source src="${mySelectedSong.preview}"> Your browser does not support the audio element.
                    </audio>
                </div>
            </div>
        </div>
    </div>
</div>
`
    }
    playlistElem.empty().append(playlistTemplate)

}




//This stops a song from playing once you play a new one
window.addEventListener("play", function(evt)
{
   if(window.$_currentlyPlaying && window.$_currentlyPlaying != evt.target)
   {
       window.$_currentlyPlaying.pause();
   } 
   window.$_currentlyPlaying = evt.target;
}, true);

myTunes.loadTracks(drawPlaylist)
}
let musicController = new MusicController();














//WORKING playListtemplate


// <div class="playlistCard">
//   <div class="row results">
//     <div class="col-sm-1"><img src="${mySelectedSong.albumArt}" alt="" />
//     <p>Price ${mySelectedSong.price}</p></div>
//     <div class="col-sm-5">
//       <h4>${mySelectedSong.title}</h4>
//       <p>${mySelectedSong.artist}</p>
//     </div>
//     <div class="col-sm-5"><audio controls preload="none">
//           <source src="${mySelectedSong.preview}"> Your browser does not support the audio element.
//           </audio>
//           <p>Collection: ${mySelectedSong.collection}</p>
//           <p> <b>Like Count: ${mySelectedSong.rating}</b></p>
//           <button class="likeSong btn-primary" id="${mySelectedSong.id}"> <span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span> Like </button>
//       <button class="dislikeSong btn-primary" id="${mySelectedSong.id}"> <span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span> Dislike </button>
//           </div>
//     <div class="col-sm-1">
//       <button class="removeSong btn-danger" id="${mySelectedSong.id}"> <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Remove </button>
//     </div>
//   </div>
// </div>
// `