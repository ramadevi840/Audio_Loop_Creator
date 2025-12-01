const musicList = document.getElementById('musicList');

// ===== Create and Add Search Bar =====
const searchContainer = document.createElement('div');
searchContainer.innerHTML = `
  <input type="text" id="searchInput" placeholder="Search songs or movies...🔍 " style="
    width: 110%;
    padding: 10px;
    margin: 15px;
    display: block;
    background-color: beige;
    font-size: 16px;
    border-radius: 10px;
    border: 1px solid #ccc;
    outline: none;
  ">
`;
musicList.parentNode.insertBefore(searchContainer, musicList);

// ===== Tracks (Original List) =====
const tracks = [
  
{ name: "Aaradugula Bullettu",  tags: "from atharintiki daaredi movie", file: "AaradugulaBullettu.mp3", likes: 504 },
{ name: "Aha Allari Allari", tags: "from Khadgam movie", file: "AhaAllariAllari_kadgham.mp3", likes: 403 },
{ name: "Akasa Veedhilo",  tags: "from Mangalya balam movie", file: "AkasaVeedhilo.mp3", likes: 504 },
{ name: "Arery areyrey", tags: " from Happydays movie", file: "areyrey_happydays.mp3", likes: 520 },
{ name: "Areyrey Manasa", tags: "from Falaknuma Das movie", file: "ArereyManasa_FalaknumaDas.mp3", likes: 403 },
{ name: "Beatiful Girl", tags: "from Salaar movie", file: "BeautifulGirl_salaar.mp3", likes: 403 },
{ name: "changubhala ", tags: "from Oh Baby movie", file: "changubhala_ohBaby.mp3", likes: 562 },
{ name: "ChittiStory",  tags: "from Master movie", file: "ChittiStory.mp3", likes: 504 },
{ name: "Chuttamalle",  tags: "from Devara movie", file: "Chuttamalle.mp3", likes: 504 },
{ name: "Deva Devam",  tags: "from Attarintiki dhariadi movie", file: "DevaDevam.mp3", likes: 504 },
{ name: "Ee manase", tags: "from Tholiprema movie", file: "eemanase_tholiprema.mp3", likes: 403 },
{ name: "Ela Ela", tags: "from Krishnarjuna Yuddam movie", file: "ElaEla_KrishnarjunaYuddam.mp3", likes: 403 },
{ name: "emaindho theliyadhu naku", tags: " form MCA movie", file: "emaindhoTheliyadhunaku_mca.mp3", likes: 451 },
{ name: "emitemito", tags: "from Arjun Reddy movie", file: "emitemito_arjunreddy.mp3", likes: 403 },
{ name: "Fear",  tags: "from Devara movie", file: "Fear.mp3", likes: 504 },
{ name: "Fire strom",  tags: "from OG movie", file: "FireStorm.mp3", likes: 504 },
{ name: "Gaali Vaaluga", tags: "from Agnathavasi movie", file: "GaaliVaaluga_Agnathavasi.mp3", likes: 403 },
{ name: "Gira Gira Gira", tags: "from Dear Comrade", file: "GiraGiraGira_DearComrade.mp3", likes: 320 },
{ name: "gusa gusalade", tags: "from Gentleman movie", file: "gusagusalade_gentleman.mp3", likes: 312 },
{ name: "hey nenila", tags: "from Mr Majnu movie", file: "heynenila_mrMajnu.mp3", likes: 275 },
{ name: "I Wanna Fly", tags: "from Krishnarjuna Yuddam movie", file: "IWannaFly_krishnarjunayuddam.mp3", likes: 403 },
{ name: "Idhe Idhe", tags: "from Hi Nanna movie", file: "IdheIdhe_hinanna.mp3", likes: 403 },
{ name: "jabilli Kosam(Male)", tags: "from Manchi Mansulu", file: "jabilliKosam(Male)_manchimanasulu.mp3", likes: 295 },
{ name: "Manasa manasa", tags: "from Most Eligible Bachelor movie", file: "ManasaManasa_mosteligiblebachelor.mp3", likes: 403 },
{ name: "Naalona Pongenu", tags: "from Surya S/o Krishnan movie", file: "NaalonaPongenu_suryaSokrishna.mp3", likes: 403 },
{ name: "Nagumomu Thaarale", tags: "from Radhe Shyam movie", file: "NagumomuThaarale_radheshyam.mp3", likes: 403 },
{ name: "Nee Choopule", tags: "from Endhukante Premanta movie", file: "NeeChoopule_endhukantepremanta.mp3", likes: 403 },
{ name: "Neelo Ninnu", tags: "from Kirrak Party movie", file: "NeeloNinnu_kirrakparty.mp3", likes: 403 },
{ name: "om namo bhagavathe vasudevaya", tags: "from Maha Avathar movie", file: "omnamobhagavathevasudevaya.mp3", likes: 403 },
{ name: "Oo Cheliya",  tags: "from Premikudu movie", file: "05-OCheliya.mp3", likes: 504 },
{ name: "oo sakkanoda", tags: "from Guru movie", file: "oosakkanoda_guru.mp3", likes: 389 },
{ name: "OriVaari", tags: "from Dasara movie", file: "2-OriVaari_dasara.mp3", likes: 403 },
{ name: "prathi Kadalo", tags: "from Salaar", file: "prathiKadalo_lifeisbeautiful.mp3", likes: 403 },
{ name: "Samayama", tags: "from Hi Nanna movie", file: "Samayama_hinanna.mp3", likes: 403 },
{ name: "Seethamma Vakitlo Sirimalle Chettu",  tags: "from Seethamma Vakitlo Sirimalle Chettu movie", file: "SeethammaVakitloSirimalleChettu.mp3", likes: 504 },
{ name: "Srimathi Garu", tags: "from Lucky Basker movie", file: "SrimathiGaru_luckyBasker.mp3", likes: 403 },
{ name: "Suvvi Suvvi",  tags: "from OG movie", file: "SuvviSuvvi.mp3", likes: 504 },
{ name: "Undipova", tags: "from Savaari movie", file: "Undipova_savaari.mp3", likes: 403 },
{ name: "Urike Urike", tags: "from Hit2 movie", file: "UrikeUrike_hit2.mp3", likes: 403 },
{ name: "vaalu kanuladaanaa", tags: "from Premikula roju movie", file: "VaaluKanuladaanaa_premikularoju.mp3", likes: 403 },
{ name: "Vibe Undi",  tags: "from Mirai movie", file: "VibeUndi.mp3", likes: 504 },
{ name: "yahoon", tags: "from Mirchi movie", file: "yahoon_mirchi.mp3", likes: 240 }, 
{ name: "Yedhee", tags: "from Jabilamma nikuantha kopama movie", file: "Yedhee_jabilammanikuathakopama.mp3", likes: 403 },
{ name: "Ye Mantramo", tags: "from Andhala rakshashi movie", file: "YeMantramo_andhalarakshashi.mp3", likes: 403 },
{ name: "Yemito ", tags: "from Andhala rakshashi movie", file: "Yemito_andhalarakshashi.mp3", likes: 403 },
    
];


// ===== Remove Duplicates (by name or file) =====
const uniqueTracks = Array.from(
  new Map(tracks.map(item => [item.file, item])).values()
);

let currentAudio = null;
let currentPlayBtn = null;

// ===== Function to Render Songs =====
function renderSongs(list) {
  musicList.innerHTML = ""; // clear
  list.forEach(track => {
    const card = document.createElement('div');
    card.classList.add('music-card');
    card.innerHTML = `
      <div class="music-info">
        <h3>${track.name}</h3>
        <p>${track.tags}</p>
        <audio id="audio-${track.file}" src="./music/${track.file}" preload="metadata"></audio>
      </div>
      <div class="music-actions">
        <i class="fas fa-play play-btn" title="Play"></i>
        <i class="far fa-bookmark" title="Save"></i>
        <i class="far fa-heart" title="Like"></i> 
        <span class="like-count">${track.likes}</span>
        <i class="fas fa-download download-btn" title="Download"></i>
      </div>
    `;

    const audio = card.querySelector('audio');
    const playBtn = card.querySelector('.play-btn');
    const likeBtn = card.querySelector('.fa-heart');
    const likeCount = card.querySelector('.like-count');
    const bookmarkBtn = card.querySelector('.fa-bookmark');
    const downloadBtn = card.querySelector('.download-btn');

    // ===== Play / Pause =====
    playBtn.addEventListener('click', () => {
      if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        currentPlayBtn.classList.remove('fa-pause');
        currentPlayBtn.classList.add('fa-play');
      }

      if (audio.paused) {
        audio.play();
        playBtn.classList.remove('fa-play');
        playBtn.classList.add('fa-pause');
        currentAudio = audio;
        currentPlayBtn = playBtn;
      } else {
        audio.pause();
        playBtn.classList.remove('fa-pause');
        playBtn.classList.add('fa-play');
        currentAudio = null;
        currentPlayBtn = null;
      }
    });

    audio.addEventListener('ended', () => {
      playBtn.classList.remove('fa-pause');
      playBtn.classList.add('fa-play');
      if (currentAudio === audio) currentAudio = null;
      if (currentPlayBtn === playBtn) currentPlayBtn = null;
    });

    // ===== Like =====
    likeBtn.addEventListener('click', () => {
      likeBtn.classList.toggle('fas');
      likeBtn.classList.toggle('far');
      const isLiked = likeBtn.classList.contains('fas');
      likeBtn.style.color = isLiked ? '#e63946' : '#1dbeee';
      likeCount.textContent = isLiked ? track.likes + 1 : track.likes;
    });

    // ===== Bookmark =====
    bookmarkBtn.addEventListener('click', () => {
      bookmarkBtn.classList.toggle('fas');
      bookmarkBtn.style.color = bookmarkBtn.classList.contains('fas') ? '#e63946' : '#1dbeee';
    });

    // ===== Download =====
    downloadBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.href = `./music/${track.file}`;
      link.download = `${track.name}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    musicList.appendChild(card);
  });
}

// ===== Initial Render =====
renderSongs(uniqueTracks);

// ===== Search Functionality =====
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = uniqueTracks.filter(track =>
    track.name.toLowerCase().includes(query) ||
    track.tags.toLowerCase().includes(query)
  );
  renderSongs(filtered);
});