console.log("client side js loaded!");
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
const gif = document.querySelector(".gif");
const lyricsBodyDiv = document.querySelector(".lyrics-body");
const trackNameDiv = document.querySelector(".track-name")
const artistNameDiv = document.querySelector(".artist-name")


function openModal(modal, lyrics_body, artistName, trackName) {
  console.log(lyrics_body, artistName, trackName)
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
//lyrics
  //clear lyrics_body div
  lyricsBodyDiv.innerHTML = ""
  //add new lyrics_body
  const lyricsBody = lyrics_body
  if (lyricsBody == ''){
    lyricsBodyDiv.innerHTML = 'lyrics are unavaliable.'
  }
  
  else{
    lyricsBodyDiv.innerHTML = lyricsBody
  }
  if(artistName==""){
    artistNameDiv.innerHTML = 'Unavaliable.'
  }
   // Artist
  else{
    artistNameDiv.innerHTML = artistName
  }
  //Track
  if(trackName==""){
    trackNameDiv.innerHTML = 'Unavaliable.'
  }else{
    trackNameDiv.innerHTML = trackName
  }

  
 
 
  
 
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}


openModalButtons.forEach((btn) => {
  btn.addEventListener("click", () => {

    const trackNameInput = document.querySelector("#trackName");
    const artistNameInput = document.querySelector("#artistName");

    fetch(
      `http://localhost:8080/lyrics?artist=${artistNameInput.value}&track=${trackNameInput.value}`
    ).then((response) => {
      response.json()
      .then((data) => {
        if (data.error) return console.log(error);
        const modal = document.querySelector(btn.dataset.modalTarget);
        //open modal and lyrics_body, artist-name & track-name
        openModal(modal, data.lyrics_body, data.artistName, data.trackName);
        // add gif dynamically
        console.log(`link to gif: ${data.URLtoGIF}`);
        const src = data.URLtoGIF;
        gif.innerHTML = `<img src="${src}.gif" alt="">`;
        //reset inputs
        trackNameInput.value = ""
        artistNameInput.value = ""
      });
    });
  });
});


overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});