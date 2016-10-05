//Do Not Modify the getMusic function
function getMusic() {
    var artist = document.getElementById('artist').value;
    itunes.getMusicByArtist(artist).then(drawSongs);
}



function drawSongs(songList) {
    var template = "";
    var songElement = document.getElementById('foundMusic')
    for (var i = 0; i < songList.length; i++) {
        var foundMusic = songList[i]
        template += `<div class="container card">
  <div class="row results">
    <div class="col-xs-12 col-sm-1"><img src="${foundMusic.albumArt}" alt="" /></div>
    <div class="col-xs-12 col-sm-5">
      <h2>${foundMusic.title}</h2>
      <p>${foundMusic.artist}</p>
    </div>
    <div class="col-xs-12 col-sm-5"><audio controls preload="none">
          <source src="${foundMusic.preview}"> Your browser does not support the audio element.
          </audio>
          <p>Collection: ${foundMusic.collection}</p>
          </div>
    <div class="col-xs-12 col-sm-1">
      
      <p>Price ${foundMusic.price}</p>
    </div>
  </div>
</div>`
    }
        songElement.innerHTML = template

    console.log(songList);
}

window.addEventListener("play", function(evt)
{
   if(window.$_currentlyPlaying && window.$_currentlyPlaying != evt.target)
   {
       window.$_currentlyPlaying.pause();
   } 
   window.$_currentlyPlaying = evt.target;
}, true);