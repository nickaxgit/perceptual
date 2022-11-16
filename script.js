"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const endPoint = "https://ourserver/somefunction";
//modify this json to define your 'survey' (or I can Fetch() it from somewhere if you like)
const survey = `[
{"id":"BBB","url":"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"},
{"id":"ELDRM","url":"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"},
{"id":"BLAZES","url":"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"}
]
`;
const stimuli = JSON.parse(survey);
const countFrom = 5;
let countdown = countFrom;
let current = null;
nextVideo();
const cdt = setInterval(tick, 1000);
function tick() {
    const b = $('submit');
    if (countdown) {
        b.style.backgroundColor = "gray";
        b.disabled = true;
        b.innerText = `Submit in ${countdown}`;
        countdown--;
    }
    else {
        b.disabled = false;
        b.innerText = 'Submit';
        b.style.backgroundColor = "green";
    }
}
function submit() {
    return __awaiter(this, void 0, void 0, function* () {
        const pid = document.getElementById("pid").value;
        const sliderVal = document.getElementById("slider").value;
        const answer = { id: pid, stimulusId: current.id, response: sliderVal }; //the 'next' one stimuls (question) always stimuli[0] the zeroth - becuase we shift() them
        //simple animation for the button
        const sb = ($('submit'));
        sb.style.top = "5px";
        sb.style.left = "5px";
        setTimeout(() => { const sb = $('submit'); sb.style.top = "0px"; sb.style.left = "0px"; }, 250);
        //uncomment once we have an endpoint to send to
        //console.log(await postData(endPoint, answer))
        //console.log(postData())
        if (stimuli.length) {
            nextVideo();
        }
        else {
            clearInterval(cdt);
            sb.innerText = "Thank you for your participation";
            sb.disabled = true;
        }
    });
}
function nextVideo() {
    current = (stimuli.shift());
    playVideo(current.url);
}
function $(elid) {
    //A jQueryesque shim for $()
    const el = document.getElementById(elid);
    if (!el) {
        alert(`No such element ${elid}`);
    }
    return el;
}
function playVideo(url) {
    document.getElementById("stimulus").src = url;
    countdown = countFrom;
}
function postData(url = '', data = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        // Default options are marked with *
        const response = yield fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    });
}
//# sourceMappingURL=script.js.map