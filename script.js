console.log("We are writing js now")
let currentSong = new Audio();
let folder = "naats", SongUL, CurrentFolder = folder, old, songtrack, gold, songs, song, range;

async function getsongs() {
    let a = await fetch(`http://127.0.0.1:3000/songs/${CurrentFolder}`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href)
        }
    }
    // console.log(songs)
    return songs;
}

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


let play = document.querySelector("#play")
play.addEventListener("click", (e) => {
    if (play.src == 'http://127.0.0.1:3000/logo/play-circle.svg') {
        play.src = 'http://127.0.0.1:3000/logo/pause-circle.svg';
        currentSong.play();
    }
    else if (play.src == 'http://127.0.0.1:3000/logo/pause-circle.svg') {
        play.src = 'http://127.0.0.1:3000/logo/play-circle.svg';
        currentSong.pause();
    }

})



const sorce = () => {
    document.querySelector("#play").src = 'http://127.0.0.1:3000/logo/pause-circle.svg';
}

const playmusic = (track) => {
    if ((track == undefined)) {
        document.querySelector(".track").innerHTML = `${songs[0].replaceAll(`http://127.0.0.1:3000/songs/${CurrentFolder}/`, " ").replaceAll("%20", " ")}`
        currentSong.src = songs[0]
        currentSong.pause()
    }

    else if (gold == track) {
        currentSong.pause();
        gold = " "
        document.querySelector("#play").src = 'http://127.0.0.1:3000/logo/play-circle.svg';
    }


    else {
        gold = old;
        currentSong.src = `/songs/${CurrentFolder}/` + track;
        currentSong.play();
        sorce()
        document.querySelector(".track").innerHTML = decodeURI(songtrack);

    }


}


async function main() {
    songs = await getsongs();
    playmusic();
    // console.log(songs)
    SongUL = document.querySelector(".songlist").querySelector("ul")
    for (const song of songs) {
        // console.log(song)
        SongUL.innerHTML = SongUL.innerHTML + `<li>
        <div class="info">
            <img src="logo/music.svg" alt="">
            <div class="song">${song.replaceAll(`http://127.0.0.1:3000/songs/${CurrentFolder}/`, " ").replaceAll("%20", " ")}</div>
        </div>
        <div class="playnow">
            <span>Play Now</span>
            <img src="logo/play-circle.svg" alt="">
        </div>
    </li>`
    }

    Array.from(document.querySelector("ul").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            songtrack = e.firstElementChild.lastElementChild.innerHTML;
            old = e.firstElementChild.lastElementChild.innerHTML.trim();
            playmusic(e.firstElementChild.lastElementChild.innerHTML.trim());
            // console.log(e.firstElementChild.lastElementChild.innerHTML.trim())
        })
    });

    document.querySelector("#volume").addEventListener("change", (e) => {

        // console.log("range value", range)
        currentSong.volume = e.target.value / 100;
        vol = document.querySelector(".volume-full")
        if (currentSong.volume == 0) {
            vol.src = "http://127.0.0.1:3000/logo/volume-mute.svg"
        }
        else {
            vol.src = "http://127.0.0.1:3000/logo/volume-full.svg"
        }

    })

    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
        document.querySelector(".timing").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;

    })
    document.querySelector(".seekbar-line").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    })
    document.querySelector(".humberger").addEventListener("click", (e) => {
        document.querySelector(".left").style.left = "0%"
    })

    document.querySelector(".close").addEventListener("click", (e) => {
        document.querySelector(".left").style.left = "-200%";
    })

    document.querySelector(".add").addEventListener("click", () => {
        alert("Sorry App is in development")
    })


}

document.querySelectorAll(".album-content").forEach(e => {
    e.addEventListener("click", (element) => {
        CurrentFolder = e.dataset.text
        // console.log(CurrentFolder)
        play.src = 'http://127.0.0.1:3000/logo/play-circle.svg';
        SongUL.innerHTML = " "
        main()
    })
})

document.querySelector("#next").addEventListener("click", (e) => {

    let index = songs.indexOf(currentSong.src)
    let length = songs.length - 1;
    // console.log(index, length)
    if (index < length) {
        index = index + 1;
        currentSong.src = (songs[index])
        currentSong.play();
        document.querySelector(".track").innerHTML = `${songs[index].replaceAll(`http://127.0.0.1:3000/songs/${CurrentFolder}/`, " ").replaceAll("%20", " ")}`
    }
    else {
        index = 0;
        currentSong.src = (songs[index])
        document.querySelector(".track").innerHTML = `${songs[index].replaceAll(`http://127.0.0.1:3000/songs/${CurrentFolder}/`, " ").replaceAll("%20", " ")}`
        currentSong.play();
    }
    removeEventListener("click", (e))
    sorce();

})

document.querySelector("#previous").addEventListener("click", () => {
    let index = songs.indexOf(currentSong.src)
    let length = songs.length - 1;
    // console.log(index, length)
    if (index > 0) {
        currentSong.src = (songs[index - 1])

        currentSong.play();
        document.querySelector(".track").innerHTML = `${songs[index - 1].replaceAll(`http://127.0.0.1:3000/songs/${CurrentFolder}/`, " ").replaceAll("%20", " ")}`
        sorce();
    }
    else {
        index = length;
        currentSong.src = (songs[index])
        document.querySelector(".track").innerHTML = `${songs[length].replaceAll(`http://127.0.0.1:3000/songs/${CurrentFolder}/`, " ").replaceAll("%20", " ")}`
        currentSong.play();
    }

    sorce();
})
main();
