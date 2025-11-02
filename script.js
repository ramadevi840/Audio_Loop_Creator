// Helper to get storage key
function userKey(email) {
  return "user:" + email.toLowerCase();
}

// Check authentication on each page
function checkAuth() {
  const loggedIn = localStorage.getItem("loggedInUser");
  const currentPage = window.location.pathname.split("/").pop();

  // Redirect unauthenticated users to login page
  if (!loggedIn && currentPage !== "login.html" && currentPage !== "signup.html") {
    window.location.href = "login.html";
    return;
  }

  // Redirect logged-in users away from login/signup
  if (loggedIn && (currentPage === "login.html" || currentPage === "signup.html")) {
    window.location.href = "index.html";
    return;
  }

  // Update header UI
  const welcomeUser = document.getElementById("welcomeUser");
  const logoutBtn = document.getElementById("logoutBtn");
  const loginLink = document.getElementById("loginLink");

  if (loggedIn) {
    const user = JSON.parse(loggedIn);
    if (welcomeUser) welcomeUser.textContent = "👋 " + (user.name || user.email);
    if (logoutBtn) logoutBtn.style.display = "inline-block";
    if (loginLink) loginLink.style.display = "none";
  } else {
    if (welcomeUser) welcomeUser.textContent = "";
    if (logoutBtn) logoutBtn.style.display = "none";
    if (loginLink) loginLink.style.display = "inline-block";
  }
}

// Signup
function signupUserOverlay() {
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim().toLowerCase();
  const password = document.getElementById("signupPassword").value;
  const confirm = document.getElementById("signupConfirm").value;

  if (password !== confirm) {
    alert("Passwords do not match!");
    return;
  }

  if (localStorage.getItem(userKey(email))) {
    alert("User already exists. Please login.");
    return;
  }

  const user = { name, email, password };
  localStorage.setItem(userKey(email), JSON.stringify(user));
  alert("Signup successful! Please login now.");
  window.location.href = "login.html";
}

// Login
function loginUserOverlay() {
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value;
  const saved = localStorage.getItem(userKey(email));

  if (!saved) {
    alert("User not found. Please sign up first.");
    return;
  }

  const user = JSON.parse(saved);
  if (user.password !== password) {
    alert("Invalid password!");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify({ name: user.name, email: user.email }));
  alert("Login successful!");
  window.location.href = "index.html";
}

// Logout
function logout() {
  // Stop music if playing (optional)
  const audio = document.getElementById("bg-music"); // if you have an audio element
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }

  // Remove login info
  localStorage.removeItem("loggedInUser");

  // Redirect to login page
  window.location.href = "login.html";
}

// Go back
function goBack() {
  window.history.back();
}

// Attach listeners
document.addEventListener("DOMContentLoaded", () => {
  checkAuth();

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) logoutBtn.addEventListener("click", logout); // Fixed function reference

  const loginForm = document.querySelector('form[onsubmit*="loginUserOverlay"]');
  if (loginForm) loginForm.addEventListener('submit', e => { 
      e.preventDefault(); 
      loginUserOverlay(); 
  });

  const signupForm = document.querySelector('form[onsubmit*="signupUserOverlay"]');
  if (signupForm) signupForm.addEventListener('submit', e => { 
      e.preventDefault(); 
      signupUserOverlay(); 
  });
});


function loginUserOverlay() {
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value;

  // ✅ Admin credentials
  const ADMIN_EMAIL = "admin@audioloop.com";
  const ADMIN_PASSWORD = "admin@123";

  // Check if admin
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem("adminLoggedIn", "true");
    alert("Admin login successful!");
    window.location.href = "admin.html"; // Redirect to admin panel
    return;
  }

  // Normal user login
  const saved = localStorage.getItem(userKey(email));
  if (!saved) {
    alert("User not found. Please sign up first.");
    return;
  }

  const user = JSON.parse(saved);
  if (user.password !== password) {
    alert("Invalid password!");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify({ name: user.name, email: user.email }));
  alert("Login successful!");
  window.location.href = "index.html"; // Normal user homepage
}








// for loop creation and download
document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("audioFile");
    const startInput = document.getElementById("startSec");
    const endInput = document.getElementById("endSec");
    const loopInput = document.getElementById("loopDuration"); // now in minutes
    const playBtn = document.getElementById("playLoop");
    const stopBtn = document.getElementById("stopLoop");
    const downloadBtn = document.getElementById("downloadLoop");

    if (fileInput && playBtn && stopBtn && downloadBtn) {
        let audio = new Audio();
        let loopInterval = null;
        let fileBlob = null;
        let recordedChunks = [];

        // Load audio file
        fileInput.addEventListener("change", function () {
            const file = this.files[0];
            if (file) {
                const url = URL.createObjectURL(file);
                audio.src = url;
                audio.load();
                audio.currentTime = 0;
                fileBlob = file;
            }
        });

        // Play Loop
        playBtn.addEventListener("click", function () {
            if (!audio.src) return alert("Upload an audio file first!");

            const start = parseFloat(startInput.value);
            const end = parseFloat(endInput.value);
            const loopDur = parseFloat(loopInput.value) * 60; // convert minutes → seconds

            if (start >= end) return alert("Start time must be less than end time!");

            audio.currentTime = start;
            audio.play();

            clearInterval(loopInterval);
            let elapsed = 0;
            loopInterval = setInterval(() => {
                if (audio.currentTime >= end) {
                    audio.currentTime = start;
                }
                elapsed += 0.1; // each 100ms
                if (elapsed >= loopDur) {
                    audio.pause();
                    clearInterval(loopInterval);
                }
            }, 100);
        });

        // Stop Loop
        stopBtn.addEventListener("click", function () {
            audio.pause();
            clearInterval(loopInterval);
        });

        // Download the LOOPED CLIP
        downloadBtn.addEventListener("click", async function () {
            if (!fileBlob) return alert("Upload an audio file first!");

            const start = parseFloat(startInput.value);
            const end = parseFloat(endInput.value);
            const loopDur = parseFloat(loopInput.value) * 60; // minutes → seconds
            const loopCount = Math.floor(loopDur / (end - start));

            if (start >= end) return alert("Invalid start/end times!");

            // Decode audio file
            const arrayBuffer = await fileBlob.arrayBuffer();
            const audioCtx = new AudioContext();
            const decoded = await audioCtx.decodeAudioData(arrayBuffer);

            // Slice the chosen segment
            const segmentDuration = end - start;
            const sampleRate = decoded.sampleRate;
            const segmentFrameCount = segmentDuration * sampleRate;
            const segmentBuffer = audioCtx.createBuffer(
                decoded.numberOfChannels,
                segmentFrameCount,
                sampleRate
            );

            for (let ch = 0; ch < decoded.numberOfChannels; ch++) {
                const channelData = decoded.getChannelData(ch).slice(
                    start * sampleRate,
                    end * sampleRate
                );
                segmentBuffer.copyToChannel(channelData, ch);
            }

            // Create final loop buffer
            const finalBuffer = audioCtx.createBuffer(
                decoded.numberOfChannels,
                segmentFrameCount * loopCount,
                sampleRate
            );

            for (let ch = 0; ch < decoded.numberOfChannels; ch++) {
                const channelData = finalBuffer.getChannelData(ch);
                const segmentData = segmentBuffer.getChannelData(ch);
                for (let i = 0; i < loopCount; i++) {
                    channelData.set(segmentData, i * segmentData.length);
                }
            }

            // Export as WAV
            const wavBlob = bufferToWav(finalBuffer);
            const url = URL.createObjectURL(wavBlob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "looped_audio.wav";
            a.click();
            URL.revokeObjectURL(url);
        });

        // Convert buffer → WAV Blob
        function bufferToWav(buffer) {
            const numOfChan = buffer.numberOfChannels,
                length = buffer.length * numOfChan * 2 + 44,
                bufferArray = new ArrayBuffer(length),
                view = new DataView(bufferArray),
                channels = [],
                sampleRate = buffer.sampleRate;

            let offset = 0;
            function writeString(s) {
                for (let i = 0; i < s.length; i++) {
                    view.setUint8(offset + i, s.charCodeAt(i));
                }
                offset += s.length;
            }

            // RIFF chunk descriptor
            writeString("RIFF");
            view.setUint32(offset, 36 + buffer.length * numOfChan * 2, true);
            offset += 4;
            writeString("WAVE");

            // FMT sub-chunk
            writeString("fmt ");
            view.setUint32(offset, 16, true);
            offset += 4;
            view.setUint16(offset, 1, true);
            offset += 2;
            view.setUint16(offset, numOfChan, true);
            offset += 2;
            view.setUint32(offset, sampleRate, true);
            offset += 4;
            view.setUint32(offset, sampleRate * numOfChan * 2, true);
            offset += 4;
            view.setUint16(offset, numOfChan * 2, true);
            offset += 2;
            view.setUint16(offset, 16, true);
            offset += 2;

            // Data sub-chunk
            writeString("data");
            view.setUint32(offset, buffer.length * numOfChan * 2, true);
            offset += 4;

            for (let i = 0; i < numOfChan; i++) {
                channels.push(buffer.getChannelData(i));
            }

            let interleaved = new Float32Array(buffer.length * numOfChan);
            for (let i = 0, index = 0; i < buffer.length; i++) {
                for (let ch = 0; ch < numOfChan; ch++) {
                    interleaved[index++] = channels[ch][i];
                }
            }

            let pos = 44;
            for (let i = 0; i < interleaved.length; i++, pos += 2) {
                let sample = Math.max(-1, Math.min(1, interleaved[i]));
                view.setInt16(pos, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
            }

            return new Blob([bufferArray], { type: "audio/wav" });
        }
    }
});



let users = [];
let currentUser = null;

// LOGIN
function loginUser() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const user = users.find(u => u.email === email && u.password === password);
    if(user) {
        currentUser = user;
        alert("Login successful! Welcome, " + user.name);
        showUsername();
        window.location.href = "index.html"; // redirect to index
    } else {
        alert("Invalid email or password!");
    }
}

// SIGNUP
function signupUser() {
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirm = document.getElementById("signupConfirm").value;

    if(password !== confirm) {
        alert("Passwords do not match!");
        return;
    }
    if(users.find(u => u.email === email)) {
        alert("User already exists!");
        return;
    }

    const newUser = {name, email, password};
    users.push(newUser);
    currentUser = newUser;

    alert("Sign-up successful! Welcome, " + name + ".");
    showUsername();
    window.location.href = "index.html"; // redirect to index
}

// Show/hide login/signup forms (if you use overlays)
function showSignup() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "block";
}
function showLogin() {
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}

// Toggle logout button
function toggleLogout() {
    const btn = document.getElementById("logoutBtn");
    btn.style.display = btn.style.display === "inline-block" ? "none" : "inline-block";
}

// Show username and hide login/signup links
function showUsername() {
    if(currentUser) {
        const welcome = document.getElementById("welcomeUser");
        welcome.textContent = currentUser.name;

        const loginLink = document.getElementById("loginLink");
        const signupLink = document.getElementById("signupLink");
        if(loginLink) loginLink.style.display = "none";
        if(signupLink) signupLink.style.display = "none";

        document.getElementById("logoutBtn").style.display = "none";
    }
}

// Logout
function logoutUser() {
    currentUser = null;
    document.getElementById("welcomeUser").textContent = "";
    document.getElementById("logoutBtn").style.display = "none";

    const loginLink = document.getElementById("loginLink");
    const signupLink = document.getElementById("signupLink");
    if(loginLink) loginLink.style.display = "inline-block";
    if(signupLink) signupLink.style.display = "inline-block";

    window.location.href = "index.html";
}

// Logo click goes back
function goBack() {
    window.history.back();
}






// ...existing code...

function sendMessage() {
    const username = document.getElementById('username').value.trim();
    const message = document.getElementById('message').value.trim();
    const chatBox = document.getElementById('chat-box');

    if (!username || !message) {
        alert('Please enter both username and message');
        return;
    }

    const messageId = Date.now(); // Unique ID for each message
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message';
    messageDiv.setAttribute('data-id', messageId);
    messageDiv.innerHTML = `
        <strong>${username}:</strong> 
        <span>${message}</span>
        <small>${new Date().toLocaleTimeString()}</small>
        <button class="delete-msg" onclick="deleteMessage(${messageId})">❌</button>
    `;

    chatBox.appendChild(messageDiv);
    document.getElementById('message').value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    // Store in localStorage
    const messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    messages.push({
        id: messageId,
        username,
        message,
        time: new Date().toLocaleTimeString()
    });
    localStorage.setItem('chatMessages', JSON.stringify(messages));
}

function deleteMessage(messageId) {
    if (!confirm('Delete this message?')) return;

    const message = document.querySelector(`.chat-message[data-id="${messageId}"]`);
    if (message) {
        message.remove();
        
        // Remove from localStorage
        const messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
        const filtered = messages.filter(msg => msg.id !== messageId);
        localStorage.setItem('chatMessages', JSON.stringify(filtered));
    }
}


// Load saved messages on page load
function loadMessages() {
    const chatBox = document.getElementById('chat-box');
    const messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    
    messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message';
        messageDiv.setAttribute('data-id', msg.id);
        messageDiv.innerHTML = `
            <strong>${msg.username}:</strong> 
            <span>${msg.message}</span>
            <small>${msg.time}</small>
            <button class="delete-msg" onclick="deleteMessage(${msg.id})">❌</button>
        `;
        chatBox.appendChild(messageDiv);
    });
    
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Call loadMessages when page loads
document.addEventListener('DOMContentLoaded', loadMessages);



// // Generate a unique shareable link
// function shareLoop() {
//   // You can replace this with the actual loop ID or filename if you have one
//   const loopId = Math.random().toString(36).substring(2, 10); // random 8-char ID
//   const shareURL = ${window.location.origin}/listen.html?loop=${loopId};

//   const input = document.getElementById("shareLink");
//   input.value = shareURL;
//   input.style.display = "block";
//   input.select();
//   input.setSelectionRange(0, 99999); // For mobile devices

//   // Copy to clipboard
//   document.execCommand("copy");

//   alert("Your loop link has been copied! Share it with others.");
// }


