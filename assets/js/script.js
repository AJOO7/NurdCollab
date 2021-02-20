var socket = io('/');
const editor = document.getElementById("editor");
const mirrorEditor = CodeMirror.fromTextArea(
    editor,
    {
        mode: "javascript",
        theme: "dracula",
        lineNumbers: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        autofocus: true,
        autocorrect: true,
        autosearch: true,
        searchcursor: true,
        jumptoline: true,
        matchBrackets: true,
        annotateScrollbar: true,
        showMatchesOnScrollbar: true,
    });
mirrorEditor.setSize("100%", "100%");
mirrorEditor.on("keyup", function (evt) {
    const text = mirrorEditor.getValue();
    socket.send(text)
    // console.log(text, "1", text.length);
})




function copyToClipboard() {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(mirrorEditor.getValue()).select();
    document.execCommand("copy");
    $temp.remove();
}

function reset() {
    mirrorEditor.setValue("");
}

var input = document.getElementById("selectTheme");
function selectTheme() {

    var theme = input.options[input.selectedIndex].textContent;
    mirrorEditor.setOption("theme", theme);
}
var inputLang = document.getElementById("selectLang");
function selectLang() {
    var lang = inputLang.options[inputLang.selectedIndex].textContent;
    mirrorEditor.setOption("mode", lang);
}

$('#uploadButton').click(function (e) {
    e.preventDefault();
    $('#fileInput').click();
}
);
let fileInput = document.getElementById("fileInput");
fileInput.addEventListener('change', () => {
    let files = fileInput.files;

    if (files.length == 0) return;
    const file = files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
        const file = e.target.result;
        const lines = file.split(/\r\n|\n/);
        mirrorEditor.setValue(lines.join('\n'));

    };

    reader.onerror = (e) => alert(e.target.error.name);

    reader.readAsText(file);
});

$("#download").click(function (e) {

    e.preventDefault();
    saveTextAsFile();
});
function saveTextAsFile() {
    var textToWrite = mirrorEditor.getValue();
    console.log(mirrorEditor.getValue());
    console.log("and", textToWrite);
    var textFileAsBlob = new Blob([mirrorEditor.getValue()], { type: 'application/json' });
    var fileNameToSaveAs = "down" + Date.now() + ".txt";

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "My Hidden Link";

    window.URL = window.URL || window.webkitURL;

    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    downloadLink.click();
}

function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}







// editor.addEventListener("keyup", (evt) => {
//     const text = editor.value
//     socket.send(text)
// })

// sending data
socket.on('message', (data) => {
    mirrorEditor.setValue(data);
    // editor.value = data
})
// const socket = io('/');

const videoGrid = document.getElementById('video-grid');
const myPeer = new Peer(undefined, {
    path: "/peerjs",
    host: '/',
    port: '443',
});

const myVideo = document.createElement('video');
// 
myVideo.muted = true;


const peers = {}
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream)

    myPeer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
    })

    socket.on('user-connected', userId => {
        // console.log("-------***--------");
        // console.log("user connected : ", userId);
        connectToNewUser(userId, stream);
        // console.log("-------***--------");
    });
});



myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
});



socket.on('user-disconnected', userId => {
    if (peers[userId]) peers[userId].close()
})



function connectToNewUser(userId, stream) {
    // console.log("######");
    const call = myPeer.call(userId, stream);
    // console.log("call defined");
    const video = document.createElement('video');
    // console.log("video element created");
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
        // console.log("adding user video to other");
    })
    // console.log("######");
    call.on('close', () => {
        video.remove()
    })

    peers[userId] = call
}

function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}
const playButton = document.getElementById('play-button')
const pauseButton = document.getElementById('pause-button')
const stopButton = document.getElementById('stop-button')
const speedInput = document.getElementById('speed')
let currentCharacter

playButton.addEventListener('click', () => {
    console.log("PLAYING ", mirrorEditor.getValue());
    playText(mirrorEditor.getValue())
})
pauseButton.addEventListener('click', pauseText)
stopButton.addEventListener('click', stopText)
speedInput.addEventListener('input', () => {

    stopText()
    playText(utterance.text.substring(currentCharacter))

})

const utterance = new SpeechSynthesisUtterance()
utterance.addEventListener('end', () => {
    mirrorEditor.setOption("readOnly", false);
})
utterance.addEventListener('boundary', e => {
    currentCharacter = e.charIndex
})

function playText(text) {
    if (speechSynthesis.paused && speechSynthesis.speaking) {
        return speechSynthesis.resume()
    }
    if (speechSynthesis.speaking) return
    utterance.text = text
    utterance.rate = speedInput.value || 1
    mirrorEditor.setOption("readOnly", true);
    speechSynthesis.speak(utterance)
}

function pauseText() {
    if (speechSynthesis.speaking) {
        speechSynthesis.pause()
    }
    return
}

function stopText() {
    speechSynthesis.resume()
    speechSynthesis.cancel()
}