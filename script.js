/* script.js */

const songs = [

    {
        title:"song 1",
        artist:"Artist",
        src:"songs/song1.mp3",
        cover:"images/cover1.jpg"
    },

    {
        title:"song 2",
        artist:"Artist",
        src:"songs/song2.mp3",
        cover:"images/cover2.jpg"
    }

];

const audio =
document.getElementById("audio");

const playBtn =
document.getElementById("play");

const prevBtn =
document.getElementById("prev");

const nextBtn =
document.getElementById("next");

const progress =
document.getElementById("progress");

const volume =
document.getElementById("volume");

const title =
document.getElementById("title");

const artist =
document.getElementById("artist");

const cover =
document.getElementById("cover");

const currentTimeEl =
document.getElementById("current");

const durationEl =
document.getElementById("duration");

const waveBars =
document.querySelectorAll(".wave span");

const songItems =
document.querySelectorAll(".song");

let songIndex = 0;

let isPlaying = false;

/* Load Song */

function loadSong(song){

    title.innerText = song.title;

    artist.innerText = song.artist;

    audio.src = song.src;

    cover.src = song.cover;
}

/* Play Song */

function playSong(){

    audio.play();

    isPlaying = true;

    playBtn.innerHTML =
    `<i class="fa-solid fa-pause"></i>`;

    cover.style.animationPlayState =
    "running";

    waveBars.forEach((bar)=>{

        bar.style.animationPlayState =
        "running";
    });
}

/* Pause Song */

function pauseSong(){

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML =
    `<i class="fa-solid fa-play"></i>`;

    cover.style.animationPlayState =
    "paused";

    waveBars.forEach((bar)=>{

        bar.style.animationPlayState =
        "paused";
    });
}

/* Play Button */

playBtn.addEventListener("click", ()=>{

    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }
});

/* Next Song */

function nextSong(){

    songIndex++;

    if(songIndex > songs.length - 1){
        songIndex = 0;
    }

    updatePlayer();
}

/* Prev Song */

function prevSong(){

    songIndex--;

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

    updatePlayer();
}

nextBtn.addEventListener("click", nextSong);

prevBtn.addEventListener("click", prevSong);

/* Update Player */

function updatePlayer(){

    loadSong(songs[songIndex]);

    playSong();

    songItems.forEach((song)=>{

        song.classList.remove("active");
    });

    songItems[songIndex]
    .classList.add("active");
}

/* Progress */

audio.addEventListener("timeupdate", ()=>{

    const {duration,currentTime} = audio;

    progress.value =
    (currentTime / duration) * 100;

    let durationMinutes =
    Math.floor(duration / 60);

    let durationSeconds =
    Math.floor(duration % 60);

    if(durationSeconds < 10){
        durationSeconds = `0${durationSeconds}`;
    }

    if(durationSeconds){

        durationEl.innerText =
        `${durationMinutes}:${durationSeconds}`;
    }

    let currentMinutes =
    Math.floor(currentTime / 60);

    let currentSeconds =
    Math.floor(currentTime % 60);

    if(currentSeconds < 10){
        currentSeconds = `0${currentSeconds}`;
    }

    currentTimeEl.innerText =
    `${currentMinutes}:${currentSeconds}`;
});

/* Set Progress */

progress.addEventListener("input", ()=>{

    audio.currentTime =
    (progress.value * audio.duration) / 100;
});

/* Volume */

volume.addEventListener("input", ()=>{

    audio.volume = volume.value;
});

/* Auto Next */

audio.addEventListener("ended", nextSong);

/* Keyboard */

document.addEventListener("keydown", (e)=>{

    if(e.code === "Space"){

        e.preventDefault();

        if(isPlaying){
            pauseSong();
        }
        else{
            playSong();
        }
    }

    if(e.code === "ArrowRight"){
        nextSong();
    }

    if(e.code === "ArrowLeft"){
        prevSong();
    }
});

/* Search Songs */

const search =
document.getElementById("search");

search.addEventListener("keyup", ()=>{

    let filter =
    search.value.toLowerCase();

    let songsList =
    document.querySelectorAll(".song");

    songsList.forEach((item)=>{

        let text =
        item.innerText.toLowerCase();

        if(text.includes(filter)){
            item.style.display = "flex";
        }
        else{
            item.style.display = "none";
        }
    });
});

/* Click Playlist Song */

songItems.forEach((item,index)=>{

    item.addEventListener("click", ()=>{

        songIndex = index;

        updatePlayer();
    });
});

/* Initial Load */

loadSong(songs[songIndex]);