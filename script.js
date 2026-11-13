const puzzles = [

    {
        question: "How many letters in your name?",
        answer: "4",
        length: 1,
        type: "text"
    },

    {
        question: "2 + 2 = ?",
        answer: "5",
        length: 1,
        type: "text"
    },

    {
        question: "What's your favorite food?",
        answer: "salmon",
        length: 6,
        type: "text"
    },

    {
        question: "What's my favorite food?",
        answer: "blue",
        length: 4,
        type: "text"
    },

    {
        question: "67",
        answer: "67",
        length: 2,
        type: "text"
    }

];


let currentPuzzle = 0;


const question = document.getElementById("question");
const questionNumber = document.getElementById("questionNumber");
const answerBoxes = document.getElementById("answerBoxes");
const submitButton = document.getElementById("submitButton");
const message = document.getElementById("message");



function loadPuzzle() {

    const puzzle = puzzles[currentPuzzle];

    questionNumber.textContent =
        `Puzzle ${currentPuzzle + 1} of ${puzzles.length}`;

    question.textContent = puzzle.question;

    answerBoxes.innerHTML = "";

    message.textContent = "";



    for (let i = 0; i < puzzle.length; i++) {

        const input = document.createElement("input");

        input.classList.add("answer-box");

        input.type = "text";

        input.maxLength = 1;

        input.autocomplete = "off";

        input.autocapitalize = "off";

        input.setAttribute("autocorrect", "off");

        input.setAttribute("spellcheck", "false");

        input.setAttribute("aria-label", `Answer ${i + 1}`);

        answerBoxes.appendChild(input);



        input.addEventListener("input", function () {

            // only ever keep the last character typed, in case autocorrect
            // or predictive text tries to sneak in more than one
            this.value = this.value.slice(-1);

            if (this.value.length === 1) {

                const next = this.nextElementSibling;

                if (next) {
                    next.focus();
                }

            }

        });



        input.addEventListener("keydown", function (event) {

            if (
                event.key === "Backspace" &&
                this.value === ""
            ) {

                const previous = this.previousElementSibling;

                if (previous) {
                    previous.focus();
                }

            }

        });

    }


    document.querySelector(".answer-box").focus();

}



function getAnswer() {

    const inputs =
        document.querySelectorAll(".answer-box");

    let answer = "";

    inputs.forEach(input => {
        answer += input.value;
    });

    return answer.toLowerCase().trim();

}



submitButton.addEventListener("click", function () {

    const userAnswer = getAnswer();

    const correctAnswer =
        puzzles[currentPuzzle].answer.toLowerCase();


    if (userAnswer === correctAnswer) {

        message.textContent = "Good girl 💕";

        message.classList.remove("correct");

        void message.offsetWidth;

        message.classList.add("correct");

        submitButton.disabled = true;

        setTimeout(function () {

            message.textContent = "";

            message.classList.remove("correct");

            submitButton.disabled = false;

            currentPuzzle++;

            if (currentPuzzle >= puzzles.length) {

                unlockWebsite();

            } else {

                loadPuzzle();

            }

        }, 900);

    } else {

        message.textContent = "😡😡";

        message.classList.remove("correct");

        const puzzle = document.getElementById("puzzle");

        puzzle.classList.remove("shake");

        void puzzle.offsetWidth;

        puzzle.classList.add("shake");

    }

});



function unlockWebsite() {

    const entry = document.getElementById("entryPage");

    const website = document.getElementById("mainWebsite");


    entry.style.transition = "opacity 1s ease";

    entry.style.opacity = "0";


    setTimeout(() => {

        entry.style.display = "none";

        website.style.display = "block";

        window.scrollTo(0, 0);

    }, 1000);

}



/* =========================================================
   BIRTHDAY MESSAGE + BALLOONS — NEW
   ========================================================= */

const clickButton = document.getElementById("clickButton");
const balloonSection = document.getElementById("balloonSection");
const balloons = document.querySelectorAll(".balloon");
const balloonMessage = document.getElementById("balloonMessage");
const balloonScrollHint = document.getElementById("balloonScrollHint");
const balloonNextText = document.getElementById("balloonNextText");
const starWishSection = document.getElementById("starWishSection");

const sweetMessages = [
    "You make my world brighter 💖💖",
    "You deserve all the happiness in the world 🥹❤️",
    "I'm really lucky to have you in my life 💕",
    "You make even ordinary days feel special ✨💗",
    "I hope this year brings you everything you wish for 🎂❤️"
];

let poppedBalloons = 0;
let messageOrder = [...sweetMessages].sort(() => Math.random() - 0.5);

if (clickButton) {
    clickButton.addEventListener("click", function () {

        balloonSection.style.display = "flex";

        balloonSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });
}

balloons.forEach(function (balloon) {

    balloon.addEventListener("click", function () {

        if (
            balloon.classList.contains("popping") ||
            balloon.classList.contains("popped")
        ) {
            return;
        }

        balloon.classList.add("popping");

        const message = messageOrder[poppedBalloons];

        setTimeout(function () {

            balloon.classList.remove("popping");
            balloon.classList.add("popped");

            balloonMessage.textContent = message;
            balloonMessage.classList.remove("show");

            void balloonMessage.offsetWidth;

            balloonMessage.classList.add("show");

            poppedBalloons++;

            if (poppedBalloons === balloons.length) {

                balloonScrollHint.classList.add("show");
                balloonNextText.classList.add("show");

            }

        }, 450);

    });

});

if (balloonNextText) {
    balloonNextText.addEventListener("click", function () {

        if (balloonNextText.classList.contains("clicked")) {
            return;
        }

        balloonNextText.textContent = "Good girl 💕";

        balloonNextText.classList.add("clicked");

        setTimeout(function () {

            starWishSection.style.display = "flex";

            starWishSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 1100);

    });
}


/* =========================================================
   STAR WISH + CAKE — NEW
   ========================================================= */

const starHotspot = document.getElementById("starHotspot");
const starOverlay = document.getElementById("starOverlay");
const bigStar = document.getElementById("bigStar");
const wishInputWrapper = document.getElementById("wishInputWrapper");
const wishInput = document.getElementById("wishInput");
const wishSmile = document.getElementById("wishSmile");
const cakeBlock = document.getElementById("cakeBlock");
const lightCandlesButton = document.getElementById("lightCandlesButton");
const candleList = document.querySelectorAll(".candle");
const listeningIndicator = document.getElementById("listeningIndicator");
const micFallbackButton = document.getElementById("micFallbackButton");
const wishMessage = document.getElementById("wishMessage");
const starNextButton = document.getElementById("starNextButton");

function openStarOverlay() {

    const rect = starHotspot.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    starOverlay.classList.add("active");

    // start the star tiny, right where the real star sits in the photo
    bigStar.style.transition = "none";
    bigStar.style.left = centerX + "px";
    bigStar.style.top = centerY + "px";
    bigStar.style.transform = "translate(-50%, -50%) scale(0.12)";
    bigStar.style.opacity = "1";

    void bigStar.offsetWidth;

    // then fly it to the center of the screen, growing as it goes
    bigStar.style.transition =
        "left 0.8s cubic-bezier(.2,.8,.2,1), top 0.8s cubic-bezier(.2,.8,.2,1), transform 0.8s cubic-bezier(.2,.8,.2,1)";
    bigStar.style.left = "50%";
    bigStar.style.top = "50%";
    bigStar.style.transform = "translate(-50%, -50%) scale(1)";

    setTimeout(function () {

        wishInputWrapper.classList.add("show");

        wishInput.focus();

    }, 820);

}

// Firebase setup for privately saving submitted wishes.
// Uses the Firebase Web SDK via dynamic imports, so the rest of this file
// can remain a regular script and no other website code needs to change.
let wishesDbPromise;

function getWishesDatabase() {
    if (!wishesDbPromise) {
        wishesDbPromise = (async function () {
            const { initializeApp, getApps } = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js");
            const { getFirestore } = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js");

            const firebaseConfig = {
                apiKey: "AIzaSyCvTvqtqB5smPkUhAo_c-wY_cwTlvb3W4k",
                authDomain: "birthday-9b256.firebaseapp.com",
                projectId: "birthday-9b256",
                storageBucket: "birthday-9b256.firebasestorage.app",
                messagingSenderId: "589813883552",
                appId: "1:589813883552:web:4d8c13618720031931dfc5",
                measurementId: "G-WTE898PJ9T"
            };

            const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
            return { db: getFirestore(app), addDoc: (await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js")).addDoc,
                collection: (await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js")).collection,
                serverTimestamp: (await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js")).serverTimestamp };
        })();
    }
    return wishesDbPromise;
}

async function saveWishToFirebase(wishText) {
    const { db, addDoc, collection, serverTimestamp } = await getWishesDatabase();
    await addDoc(collection(db, "wishes"), {
        wish: wishText,
        createdAt: serverTimestamp()
    });
}


function sendWishAndCloseStar() {

    const submittedWish = wishInput.value.trim();

    // Save a non-empty wish; the animation continues even if saving fails.
    if (submittedWish) {
        saveWishToFirebase(submittedWish).catch(function (error) {
            console.error("Could not save the wish to Firebase:", error);
        });
    }

    wishInput.blur();

    wishInputWrapper.classList.remove("show");

    // Clear the input immediately, as before.
    wishInput.value = "";

    const rect = starHotspot.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // spin and fly the star back to its spot in the photo
    bigStar.style.transition =
        "left 0.9s cubic-bezier(.4,0,.2,1), top 0.9s cubic-bezier(.4,0,.2,1), transform 0.9s cubic-bezier(.4,0,.2,1), opacity 0.9s ease";
    bigStar.style.left = centerX + "px";
    bigStar.style.top = centerY + "px";
    bigStar.style.transform = "translate(-50%, -50%) scale(0.1) rotate(720deg)";
    bigStar.style.opacity = "0";

    setTimeout(function () {

        starOverlay.classList.remove("active");

        wishSmile.classList.add("show");

        setTimeout(function () {

            cakeBlock.classList.add("show");

            cakeBlock.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 700);

    }, 950);

}

if (starHotspot) {

    starHotspot.addEventListener("click", openStarOverlay);

}

if (wishInput) {

    wishInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter" && !event.shiftKey) {

            event.preventDefault();

            sendWishAndCloseStar();

        }

    });

}


/* --- Cake candles: real blow detection (mic), with a tap fallback --- */

const candlesEl = document.getElementById("candles");

let audioContext = null;
let analyser = null;
let micStream = null;
let timeData = null;
let freqData = null;
let listening = false;
let blowRafId = null;
let blownCandles = 0;

async function startListening() {

    try {

        // noise suppression / echo cancellation / auto-gain would treat a blow
        // as "wind noise" and remove it, so they are switched OFF here
        micStream = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: false,
                noiseSuppression: false,
                autoGainControl: false
            }
        });

    } catch (err) {

        micFallbackButton.classList.add("show");

        return;

    }

    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // iOS Safari starts the audio engine "suspended"
    if (audioContext.state === "suspended") {

        try {
            await audioContext.resume();
        } catch (err) { }

    }

    const source = audioContext.createMediaStreamSource(micStream);

    analyser = audioContext.createAnalyser();

    analyser.fftSize = 2048;

    analyser.smoothingTimeConstant = 0.2;

    source.connect(analyser);

    timeData = new Uint8Array(analyser.fftSize);

    freqData = new Uint8Array(analyser.frequencyBinCount);

    listening = true;

    // wait until all 5 flames have finished lighting, then listen
    setTimeout(function () {

        if (!listening) {
            return;
        }

        listeningIndicator.classList.add("show");

        calibrateAndListen();

    }, 2400);

    // safety net so she is never stuck
    setTimeout(function () {
        micFallbackButton.classList.add("show");
    }, 9000);

}

function measureSound() {

    // 1) overall loudness (RMS of the raw waveform)
    analyser.getByteTimeDomainData(timeData);

    let sum = 0;

    for (let i = 0; i < timeData.length; i++) {
        const v = (timeData[i] - 128) / 128;
        sum += v * v;
    }

    const rms = Math.sqrt(sum / timeData.length);

    // 2) low-frequency rumble (0-600 Hz) where a blow's air noise lives
    analyser.getByteFrequencyData(freqData);

    const binHz = audioContext.sampleRate / analyser.fftSize;

    const lowEnd = Math.max(3, Math.floor(600 / binHz));

    let low = 0;

    for (let i = 1; i < lowEnd; i++) {
        low += freqData[i];
    }

    low /= (lowEnd - 1);

    return { rms: rms, low: low };

}

function calibrateAndListen() {

    // measure the quiet room for half a second
    const rmsSamples = [];
    const lowSamples = [];
    const start = performance.now();

    function sample() {

        if (!listening) {
            return;
        }

        const m = measureSound();

        rmsSamples.push(m.rms);
        lowSamples.push(m.low);

        if (performance.now() - start < 500) {

            requestAnimationFrame(sample);

        } else {

            const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

            // clamp, so if she already started blowing it can't ruin the baseline
            const ambientRms = Math.min(avg(rmsSamples), 0.03);
            const ambientLow = Math.min(avg(lowSamples), 110);

            watchForBlow(
                Math.max(ambientRms * 3, 0.045),
                ambientLow + 22
            );

        }

    }

    sample();

}

function watchForBlow(rmsThreshold, lowThreshold) {

    let blowFrames = 0;
    let quietFrames = 0;
    let lastBlowOut = 0;

    const startedAt = performance.now();

    function check(now) {

        if (!listening) {
            return;
        }

        // if nothing is detected for a while, get a bit more sensitive
        const waited = (now - startedAt) / 1000;

        const relax = waited > 6 ? Math.max(0.55, 1 - (waited - 6) * 0.06) : 1;

        const m = measureSound();

        const isBlowing =
            m.rms > rmsThreshold * relax &&
            m.low > lowThreshold;

        if (isBlowing) {

            blowFrames++;

            quietFrames = 0;

        } else {

            quietFrames++;

            blowFrames = 0;

        }

        // a real blow lasts more than a split second
        if (blowFrames >= 4) {

            candlesEl.classList.add("blowing");

            // stronger blow = candles go out faster
            const strong = m.rms > rmsThreshold * 2.5;

            const gap = strong ? 110 : 260;

            if (now - lastBlowOut > gap) {

                blowOutNextCandle();

                lastBlowOut = now;

            }

        }

        if (quietFrames >= 8) {

            candlesEl.classList.remove("blowing");

        }

        blowRafId = requestAnimationFrame(check);

    }

    blowRafId = requestAnimationFrame(check);

}

function blowOutNextCandle() {

    const remaining =
        document.querySelectorAll(".candle:not(.out)");

    if (remaining.length === 0) {
        return;
    }

    remaining[0].classList.add("out");

    blownCandles++;

    if (blownCandles >= candleList.length) {

        finishBlowingCandles();

    }

}

function finishBlowingCandles() {

    listening = false;

    candlesEl.classList.remove("blowing");

    if (blowRafId) {
        cancelAnimationFrame(blowRafId);
    }

    if (micStream) {
        micStream.getTracks().forEach(function (track) {
            track.stop();
        });
    }

    listeningIndicator.classList.remove("show");

    micFallbackButton.classList.remove("show");

    wishMessage.innerHTML =
        "Oh, you're 18 now — congrats, you're officially an adult. But I'll always remember the kid version of you, and love you just the same. Don't feel old, this is just the start. 💛";

    wishMessage.classList.add("show");

    setTimeout(function () {

        starNextButton.classList.add("show");

    }, 1000);

}

if (lightCandlesButton) {

    lightCandlesButton.addEventListener("click", function () {

        lightCandlesButton.classList.add("lit");

        lightCandlesButton.disabled = true;

        // light the candles one by one (CSS does the animation)
        document.getElementById("candles").classList.add("lit");

        // ask for the mic right now (needed on iPhone/iPad), it starts
        // listening by itself once all 5 flames are lit
        startListening();

    });

}

if (micFallbackButton) {

    micFallbackButton.addEventListener("click", function () {

        const remaining =
            document.querySelectorAll(".candle:not(.out)");

        remaining.forEach(function (candle, i) {

            setTimeout(function () {

                candle.classList.add("out");

            }, i * 150);

        });

        setTimeout(function () {

            blownCandles = candleList.length;

            finishBlowingCandles();

        }, remaining.length * 150 + 300);

    });

}


loadPuzzle();


/* =========================================================
   GIFTS — after the cake page
   ========================================================= */

const mainWebsiteEl = document.getElementById("mainWebsite");
const giftsApp = document.getElementById("giftsApp");
const giftsPage = document.getElementById("giftsPage");
const couponPage = document.getElementById("couponPage");
const fireworksPage = document.getElementById("fireworksPage");
const scratchPage = document.getElementById("scratchPage");
const memoryPage = document.getElementById("memoryPage");
const giftsNextWrap = document.getElementById("giftsNextWrap");
const giftsNext = document.getElementById("giftsNext");
const giftButtons = document.querySelectorAll(".gift");
const giftToast = document.getElementById("giftToast");
const couponButtons = document.querySelectorAll(".coupon");
const couponDown = document.getElementById("couponDown");
const fwDown = document.getElementById("fwDown");

const giftOpened = { 1: false, 2: false, 3: false };
let giftBusy = false;
let toastTimer = null;


function showGiftPage(page) {

    [giftsPage, couponPage, fireworksPage, scratchPage, memoryPage].forEach(function (p) {
        p.classList.remove("active");
    });

    page.classList.add("active");

    window.scrollTo(0, 0);

}


function backToGifts() {

    stopFireworks();

    document.getElementById("giftsEyebrow").textContent = "Surprise";

    document.getElementById("giftsTitle").innerHTML =
        "All gifts are for you,<br>not only one 💝";

    document.getElementById("giftsSub").textContent =
        (giftOpened[1] && giftOpened[2] && giftOpened[3])
            ? "They're all yours, open them again anytime"
            : "Open the ones you haven't opened yet";

    // once all 3 gifts have been opened, a Next icon appears
    if (giftOpened[1] && giftOpened[2] && giftOpened[3]) {

        giftsNextWrap.classList.add("show");

    }

    showGiftPage(giftsPage);

}


function showToast(text) {

    giftToast.textContent = text;
    giftToast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {
        giftToast.classList.remove("show");
    }, 2600);

}


/* NEXT button on the cake page -> gifts */

if (starNextButton) {

    starNextButton.addEventListener("click", function () {

        // start downloading the song quietly now, so it is ready later
        const song = document.getElementById("bgSong");

        if (song && !song.getAttribute("src")) {

            song.src = "song.mp3";
            song.preload = "auto";
            song.load();

        }

        mainWebsiteEl.style.transition = "opacity 0.7s ease";
        mainWebsiteEl.style.opacity = "0";

        setTimeout(function () {

            mainWebsiteEl.style.display = "none";

            giftsApp.style.display = "block";

            showGiftPage(giftsPage);

        }, 700);

    });

}


giftButtons.forEach(function (gift) {

    gift.addEventListener("click", function () {

        const n = gift.dataset.gift;

        if (giftBusy) {
            return;
        }

        function go() {

            giftBusy = false;

            if (n === "1") {

                showGiftPage(couponPage);

            } else if (n === "3") {

                showGiftPage(scratchPage);

                initScratch();

            } else {

                showGiftPage(fireworksPage);

                startFireworks();

            }

        }

        giftBusy = true;

        if (giftOpened[n]) {

            go();

            return;

        }

        gift.classList.remove("shake");
        void gift.offsetWidth;
        gift.classList.add("shake");

        setTimeout(function () {

            gift.classList.remove("shake");

            gift.classList.add("opened");

            giftOpened[n] = true;

            setTimeout(go, 1200);

        }, 520);

    });

});


/* coupons */

couponButtons.forEach(function (coupon) {

    coupon.addEventListener("click", function () {

        if (coupon.classList.contains("open")) {
            return;
        }

        coupon.classList.add("open");

        coupon.setAttribute("aria-label", "Coupon " + coupon.dataset.coupon + ", opened");

        if (document.querySelectorAll(".coupon.open").length === couponButtons.length) {

            setTimeout(function () {

                couponDown.classList.add("show");

                couponDown.scrollIntoView({ behavior: "smooth", block: "center" });

            }, 1100);

        }

    });

});

if (couponDown) {
    couponDown.addEventListener("click", backToGifts);
}

if (fwDown) {
    fwDown.addEventListener("click", backToGifts);
}


/* =========================================================
   GIFT 2 — fireworks night
   ========================================================= */

const fwScene = document.getElementById("fwScene");
const fwCanvas = document.getElementById("fwCanvas");
const fwCtx = fwCanvas.getContext("2d");
const fwCaption = document.getElementById("fwCaption");
const fwNote = document.getElementById("fwNote");
const fwHearts = document.getElementById("fwHearts");

let fwW = 0;
let fwH = 0;
let fwScale = 1;
let fwRaf = null;
let fwLast = 0;
let fwTimers = [];
let fwParts = [];
let fwRockets = [];
let fwFlashes = [];
let fwLaunching = false;


/* ---- draw the static scene (stars, city, pines) once ---- */

function mulberry(seed) {

    return function () {

        seed |= 0;
        seed = (seed + 0x6D2B79F5) | 0;

        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);

        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;

        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;

    };

}

function buildFireworksScene() {

    const NS = "http://www.w3.org/2000/svg";

    const rnd = mulberry(18);

    function el(name, attrs) {

        const e = document.createElementNS(NS, name);

        for (const k in attrs) {
            e.setAttribute(k, attrs[k]);
        }

        return e;

    }

    // stars
    const stars = document.getElementById("fwStars");

    for (let i = 0; i < 80; i++) {

        const c = el("circle", {
            cx: (rnd() * 400).toFixed(1),
            cy: (rnd() * 270).toFixed(1),
            r: (0.5 + rnd() * 1.2).toFixed(2),
            fill: "#fff",
            "class": "fw-star"
        });

        c.style.animationDelay = (-rnd() * 3).toFixed(2) + "s";

        stars.appendChild(c);

    }

    // city in the valley (right side)
    const city = document.getElementById("fwCity");

    function buildings(fill, hMin, hMax, litChance, from) {

        let x = from;

        while (x < 404) {

            const w = 9 + Math.floor(rnd() * 9);
            const h = hMin + Math.floor(rnd() * (hMax - hMin));
            const y = 340 - h;

            city.appendChild(el("rect", { x: x, y: y, width: w, height: h + 2, fill: fill }));

            for (let wy = y + 4; wy < 336; wy += 5.6) {

                for (let wx = x + 2; wx < x + w - 2; wx += 4.2) {

                    if (rnd() < litChance) {

                        city.appendChild(el("rect", {
                            x: wx.toFixed(1),
                            y: wy.toFixed(1),
                            width: 1.8,
                            height: 2.4,
                            fill: "#ffd27a",
                            "fill-opacity": (0.45 + rnd() * 0.5).toFixed(2)
                        }));

                    }

                }

            }

            x += w + (rnd() < 0.3 ? 2 : 0.5);

        }

    }

    buildings("#1b1262", 14, 50, 0.3, 206);
    buildings("#0b0830", 8, 34, 0.38, 198);

    // tall tower with a blinking light
    city.appendChild(el("rect", { x: 336, y: 262, width: 5, height: 80, fill: "#07051f" }));
    city.appendChild(el("rect", { x: 337.7, y: 246, width: 1.6, height: 18, fill: "#07051f" }));
    city.appendChild(el("circle", { cx: 338.5, cy: 246, r: 2, fill: "#ff3b3b", "class": "fw-blink" }));

    // pines
    function pine(x, base, h) {

        const w = h * 0.42;

        let d = "";

        for (let i = 0; i < 3; i++) {

            const top = base - h + i * h * 0.27;
            const bottom = top + h * 0.5;
            const half = w * (0.5 + i * 0.27);

            d += "M" + x + " " + top +
                " L" + (x + half) + " " + bottom +
                " L" + (x - half) + " " + bottom + " Z ";

        }

        d += "M" + (x - 1.6) + " " + (base - h * 0.1) +
            " h3.2 v" + (h * 0.12 + 2) + " h-3.2 Z";

        return d;

    }

    const far = document.getElementById("fwPinesFar");

    let farPath = "";

    for (let x = -4; x < 196; x += 9 + rnd() * 5) {
        farPath += pine(x, 348, 16 + rnd() * 14);
    }

    for (let x = 388; x < 408; x += 10) {
        farPath += pine(x, 348, 20 + rnd() * 8);
    }

    far.appendChild(el("path", { d: farPath }));

    const near = document.getElementById("fwPinesNear");

    let nearPath = "";

    [[10, 505, 160], [30, 505, 118], [-6, 505, 120], [46, 505, 76],
     [374, 505, 150], [394, 505, 120], [356, 505, 92], [406, 505, 100]].forEach(function (p) {
        nearPath += pine(p[0], p[1], p[2]);
    });

    near.appendChild(el("path", { d: nearPath }));

}

buildFireworksScene();


/* ---- fireworks (canvas) ---- */

function fwSetup() {

    const r = fwScene.getBoundingClientRect();

    const dpr = Math.min(2, window.devicePixelRatio || 1);

    fwW = r.width;
    fwH = r.height;
    fwScale = fwW / 400;

    fwCanvas.width = Math.round(fwW * dpr);
    fwCanvas.height = Math.round(fwH * dpr);

    fwCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

}

const fwPalette = [
    [350, 100, 62],   // rose
    [42, 100, 62],    // gold
    [190, 100, 60],   // cyan
    [285, 100, 70],   // violet
    [135, 90, 58],    // green
    [18, 100, 60]     // orange
];

/* fireworks sound: made with the Web Audio API (no file needed), only plays while the show runs */

let fwAudio = null;
let fwMaster = null;
let fwNoise = null;

function fwAudioUnlock() {

    try {

        const AC = window.AudioContext || window.webkitAudioContext;

        if (!AC) {
            return;
        }

        if (!fwAudio) {
            fwAudio = new AC();
        }

        if (fwAudio.state === "suspended") {
            fwAudio.resume();
        }

    } catch (e) {}

}

// any tap lets the browser play the fireworks sound later (needed on iPhone and iPad)
document.addEventListener("pointerdown", fwAudioUnlock);
document.addEventListener("touchend", fwAudioUnlock);

// the real fireworks recording (fireworks.mp3), decoded once so it can start exactly on time
let fwBuffer = null;
let fwBufferTried = false;
let fwSource = null;
let fwMp3 = null;

function fwLoadFile() {

    if (fwBufferTried || !fwAudio) {
        return;
    }

    fwBufferTried = true;

    fetch("fireworks.mp3")
        .then(function (r) { return r.arrayBuffer(); })
        .then(function (data) {

            return new Promise(function (ok, fail) {
                fwAudio.decodeAudioData(data, ok, fail);
            });

        })
        .then(function (buf) { fwBuffer = buf; })
        .catch(function () { fwBuffer = null; });

}

document.addEventListener("pointerdown", function () {
    fwAudioUnlock();
    fwLoadFile();
});

function fwSoundStart() {

    // Play the supplied fireworks.mp3 directly (not the generated sound effects).
    if (!fwAudio) {
        fwAudioUnlock();
    }

    // Keep the Web Audio effects silent; the MP3 is the fireworks soundtrack.
    if (fwAudio) {
        fwMaster = fwAudio.createGain();
        fwMaster.gain.value = 0;
        fwMaster.connect(fwAudio.destination);
    }

    if (!fwMp3) {
        fwMp3 = new Audio("fireworks.mp3");
        fwMp3.preload = "auto";
    }

    try {
        fwMp3.pause();
        fwMp3.currentTime = 0;
        fwMp3.volume = 1;
        fwMp3.loop = false;
        const playPromise = fwMp3.play();
        if (playPromise && playPromise.catch) {
            playPromise.catch(function (err) {
                console.warn("fireworks.mp3 could not play:", err);
            });
        }
    } catch (e) {
        console.warn("fireworks.mp3 playback failed:", e);
    }
}

// Stop the MP3 when leaving the fireworks gift.
function fwSoundStop(fade) {
    if (fwMp3) {
        try {
            fwMp3.pause();
            fwMp3.currentTime = 0;
        } catch (e) {}
    }

    if (fwMaster && fwAudio) {
        try { fwMaster.disconnect(); } catch (e) {}
        fwMaster = null;
    }
}

function fwNoiseBurst(t, dur, freq, vol, type) {

    const src = fwAudio.createBufferSource();

    src.buffer = fwNoise;

    src.playbackRate.value = 0.6 + Math.random() * 0.8;

    const f = fwAudio.createBiquadFilter();

    f.type = type;

    f.frequency.value = freq;

    const g = fwAudio.createGain();

    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);

    src.connect(f);
    f.connect(g);
    g.connect(fwMaster);

    src.start(t, Math.random() * 0.8);
    src.stop(t + dur + 0.05);

}

// the thin whistle of a rocket going up
function fwSoundWhistle(dur) {

    if (!fwMaster || !fwAudio || fwSource) {
        return;
    }

    const t = fwAudio.currentTime;

    const o = fwAudio.createOscillator();
    const g = fwAudio.createGain();

    o.type = "sine";
    o.frequency.setValueAtTime(500, t);
    o.frequency.exponentialRampToValueAtTime(1700, t + dur);

    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.06, t + 0.1);
    g.gain.linearRampToValueAtTime(0.0001, t + dur);

    o.connect(g);
    g.connect(fwMaster);

    o.start(t);
    o.stop(t + dur + 0.05);

}

// the boom, then the crackle of falling sparks
function fwSoundBoom(kind) {

    if (!fwMaster || !fwAudio || fwSource) {
        return;
    }

    const t = fwAudio.currentTime;

    const o = fwAudio.createOscillator();
    const g = fwAudio.createGain();

    o.type = "sine";
    o.frequency.setValueAtTime(130, t);
    o.frequency.exponentialRampToValueAtTime(38, t + 0.5);

    g.gain.setValueAtTime(0.9, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

    o.connect(g);
    g.connect(fwMaster);

    o.start(t);
    o.stop(t + 0.7);

    fwNoiseBurst(t, 0.5, 900, 0.55, "lowpass");

    const n = kind === "ring" ? 6 : 12;

    for (let i = 0; i < n; i++) {
        fwNoiseBurst(t + 0.15 + Math.random() * 0.9, 0.05, 4500, 0.12, "highpass");
    }

}

function fwLaunch(opts) {

    const rdur = 0.65 + Math.random() * 0.2;

    fwSoundWhistle(rdur);

    fwRockets.push({
        x: opts.x * fwW,
        y0: fwH * 0.66,
        y1: opts.y * fwH,
        t: 0,
        dur: rdur,
        color: opts.color,
        kind: opts.kind || "sphere"
    });

}

function fwBurst(x, y, color, kind) {

    const s = fwScale;

    const h = color[0];

    fwSoundBoom(kind);

    fwFlashes.push({ x: x, y: y, life: 0.3, max: 0.3, h: h });

    if (kind === "heart") {

        const n = 64;

        for (let i = 0; i < n; i++) {

            const t = (i / n) * Math.PI * 2;

            const hx = 16 * Math.pow(Math.sin(t), 3);

            const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

            fwParts.push({
                x: x, y: y,
                vx: hx * 6.4 * s, vy: hy * 6.4 * s,
                life: 1.9, max: 1.9,
                h: 350, sat: 100, l: 66,
                size: 2.2 * s + 0.4,
                drag: 0.34, g: 22 * s
            });

        }

        return;

    }

    const n = kind === "ring" ? 54 : 84;

    for (let i = 0; i < n; i++) {

        const a = Math.random() * Math.PI * 2;

        const sp = kind === "ring"
            ? 150 * s
            : (50 + Math.sqrt(Math.random()) * 150) * s;

        const ang = kind === "ring" ? (i / n) * Math.PI * 2 : a;

        fwParts.push({
            x: x, y: y,
            vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp,
            life: 1.5 + Math.random() * 0.7,
            max: 2.2,
            h: color[0] + (Math.random() * 30 - 15),
            sat: color[1], l: color[2],
            size: (1.4 + Math.random() * 1.4) * s + 0.3,
            drag: 0.3, g: 70 * s
        });

        fwParts[fwParts.length - 1].max = fwParts[fwParts.length - 1].life;

    }

}

function fwLoop(now) {

    const dt = Math.min(0.04, (now - fwLast) / 1000);

    fwLast = now;

    fwCtx.globalCompositeOperation = "destination-out";
    fwCtx.fillStyle = "rgba(0,0,0,0.2)";
    fwCtx.fillRect(0, 0, fwW, fwH);

    fwCtx.globalCompositeOperation = "lighter";

    // soft sky flashes
    for (let i = fwFlashes.length - 1; i >= 0; i--) {

        const f = fwFlashes[i];

        f.life -= dt;

        if (f.life <= 0) {
            fwFlashes.splice(i, 1);
            continue;
        }

        const a = (f.life / f.max) * 0.35;

        const g = fwCtx.createRadialGradient(f.x, f.y, 0, f.x, f.y, 130 * fwScale);

        g.addColorStop(0, "hsla(" + f.h + ",100%,70%," + a + ")");
        g.addColorStop(1, "hsla(" + f.h + ",100%,70%,0)");

        fwCtx.fillStyle = g;
        fwCtx.fillRect(f.x - 140 * fwScale, f.y - 140 * fwScale, 280 * fwScale, 280 * fwScale);

    }

    // rockets
    for (let i = fwRockets.length - 1; i >= 0; i--) {

        const r = fwRockets[i];

        r.t += dt / r.dur;

        const e = 1 - Math.pow(1 - Math.min(r.t, 1), 2);

        const y = r.y0 + (r.y1 - r.y0) * e;

        fwCtx.fillStyle = "hsla(" + r.color[0] + ",100%,80%,1)";
        fwCtx.beginPath();
        fwCtx.arc(r.x, y, 2 * fwScale + 0.5, 0, 6.2832);
        fwCtx.fill();

        if (r.t >= 1) {

            fwBurst(r.x, r.y1, r.color, r.kind);

            fwRockets.splice(i, 1);

        }

    }

    // sparks
    for (let i = fwParts.length - 1; i >= 0; i--) {

        const p = fwParts[i];

        p.life -= dt;

        if (p.life <= 0) {
            fwParts.splice(i, 1);
            continue;
        }

        const k = Math.pow(p.drag, dt);

        p.vx *= k;
        p.vy = p.vy * k + p.g * dt;

        p.x += p.vx * dt;
        p.y += p.vy * dt;

        const a = Math.min(1, p.life / p.max * 1.4);

        const tw = p.life / p.max < 0.35 ? (Math.random() < 0.5 ? 0.4 : 1) : 1;

        fwCtx.fillStyle = "hsla(" + p.h + "," + p.sat + "%," + p.l + "%," + (a * tw) + ")";
        fwCtx.beginPath();
        fwCtx.arc(p.x, p.y, p.size, 0, 6.2832);
        fwCtx.fill();

    }

    if (fwLaunching || fwRockets.length || fwParts.length || fwFlashes.length) {

        fwRaf = requestAnimationFrame(fwLoop);

    } else {

        fwRaf = null;

        fwCtx.clearRect(0, 0, fwW, fwH);

    }

}

function spawnHearts() {

    for (let i = 0; i < 9; i++) {

        const h = document.createElement("span");

        h.className = "fw-heart";

        h.textContent = "♥";

        h.style.left = (36 + Math.random() * 24) + "%";

        h.style.top = (60 + Math.random() * 12) + "%";

        h.style.fontSize = (14 + Math.random() * 14) + "px";

        h.style.animationDelay = (Math.random() * 1.2) + "s";

        fwHearts.appendChild(h);

        setTimeout(function () {
            h.remove();
        }, 4500);

    }

}

function stopFireworks() {

    fwTimers.forEach(clearTimeout);

    fwTimers = [];

    fwLaunching = false;

    fwSoundStop(0.2);

    if (fwRaf) {
        cancelAnimationFrame(fwRaf);
        fwRaf = null;
    }

    fwParts = [];
    fwRockets = [];
    fwFlashes = [];

    fwCtx.clearRect(0, 0, fwW, fwH);

}

function startFireworks() {

    stopFireworks();

    fwSoundStart();

    fwScene.classList.remove("kiss", "hug");
    fwCaption.classList.remove("show");
    fwNote.classList.remove("show");
    fwDown.classList.remove("show");
    fwHearts.innerHTML = "";

    fwSetup();

    function later(fn, ms) {
        fwTimers.push(setTimeout(fn, ms));
    }

    // 5 seconds of fireworks (starting after a short pause)
    const START = 700;

    const shows = [
        [0, 0.3, 0.3, "sphere"],
        [400, 0.7, 0.26, "sphere"],
        [800, 0.5, 0.2, "ring"],
        [1200, 0.25, 0.34, "sphere"],
        [1550, 0.76, 0.3, "sphere"],
        [1900, 0.5, 0.28, "heart"],
        [2300, 0.3, 0.18, "ring"],
        [2650, 0.7, 0.2, "sphere"],
        [3000, 0.45, 0.3, "sphere"],
        [3300, 0.22, 0.28, "sphere"],
        [3400, 0.78, 0.26, "sphere"],
        [3750, 0.5, 0.24, "heart"],
        [3900, 0.35, 0.16, "ring"],
        [4000, 0.65, 0.16, "ring"]
    ];

    fwLaunching = true;

    fwLast = performance.now();

    fwRaf = requestAnimationFrame(fwLoop);

    shows.forEach(function (s, i) {

        later(function () {

            fwLaunch({
                x: s[1],
                y: s[2],
                kind: s[3],
                color: s[3] === "heart" ? [350, 100, 66] : fwPalette[i % fwPalette.length]
            });

        }, START + s[0]);

    });

    // fireworks end after ~5 seconds, then he kisses her head
    later(function () {
        fwLaunching = false;
    }, START + 5000);

    // the sound ends together with the fireworks
    later(function () {
        fwSoundStop(1.2);
    }, START + 5600);

    later(function () {

        fwScene.classList.add("kiss");

        spawnHearts();

        fwCaption.classList.add("show");

    }, START + 5900);

    // then the hug
    later(function () {

        fwScene.classList.add("hug");

        spawnHearts();

    }, START + 8600);

    later(function () {

        fwNote.classList.add("show");

    }, START + 9400);

    later(function () {

        fwDown.classList.add("show");

        fwDown.scrollIntoView({ behavior: "smooth", block: "center" });

    }, START + 11000);

}


/* =========================================================
   GIFT 3 — scratch card + days together
   ========================================================= */

const scratchCard = document.getElementById("scratchCard");
const scratchCanvas = document.getElementById("scratchCanvas");
const scratchCtx = scratchCanvas.getContext("2d", { willReadFrequently: true });
const scratchUnder = document.getElementById("scratchHearts");
const scratchHint = document.getElementById("scratchHint");
const scratchFloaties = document.getElementById("scratchFloaties");
const daysBox = document.getElementById("daysBox");
const daysNum = document.getElementById("daysNum");
const scratchDown = document.getElementById("scratchDown");

// the day you two got together: 9 August 2025 (month is 0-based, so 7 = August)
const TOGETHER_SINCE = Date.UTC(2025, 7, 9);

// counts whole days from that date up to today, so the number goes up by 1 every day
// (459 on 11 Nov 2026, 462 on her birthday, 14 Nov 2026)
function daysTogether() {

    const now = new Date();

    const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

    return Math.max(0, Math.round((today - TOGETHER_SINCE) / 86400000));

}

let scratchW = 0;
let scratchH = 0;
let scratchDpr = 1;
let scratching = false;
let scratchRevealed = false;
let scratchShown = false;
let scratchLastX = 0;
let scratchLastY = 0;
let scratchCheckTimer = null;


function paintFoil() {

    const w = scratchW;
    const h = scratchH;

    scratchCtx.globalCompositeOperation = "source-over";

    const g = scratchCtx.createLinearGradient(0, 0, w, h);

    g.addColorStop(0, "#d6d0fa");
    g.addColorStop(0.3, "#a79ee6");
    g.addColorStop(0.55, "#ddd8fc");
    g.addColorStop(0.8, "#9087da");
    g.addColorStop(1, "#c7c0f5");

    scratchCtx.fillStyle = g;
    scratchCtx.fillRect(0, 0, w, h);

    // shiny diagonal bands
    scratchCtx.fillStyle = "rgba(255,255,255,0.16)";

    for (let i = -h; i < w; i += 46) {

        scratchCtx.beginPath();
        scratchCtx.moveTo(i, h);
        scratchCtx.lineTo(i + 16, h);
        scratchCtx.lineTo(i + 16 + h, 0);
        scratchCtx.lineTo(i + h, 0);
        scratchCtx.closePath();
        scratchCtx.fill();

    }

    // tiny sparkles
    for (let i = 0; i < 160; i++) {

        scratchCtx.fillStyle = "rgba(255,255,255," + (0.25 + Math.random() * 0.55) + ")";

        scratchCtx.beginPath();
        scratchCtx.arc(Math.random() * w, Math.random() * h, 0.6 + Math.random() * 1.4, 0, 6.2832);
        scratchCtx.fill();

    }

    // label
    scratchCtx.textAlign = "center";
    scratchCtx.textBaseline = "middle";

    scratchCtx.fillStyle = "rgba(36,26,88,0.78)";
    scratchCtx.font = "italic 600 " + Math.round(w * 0.085) + "px 'Cormorant Garamond', Georgia, serif";
    scratchCtx.fillText("Scratch here", w / 2, h / 2 - h * 0.04);

    scratchCtx.font = Math.round(w * 0.05) + "px sans-serif";
    scratchCtx.fillStyle = "rgba(36,26,88,0.55)";
    scratchCtx.fillText("✦  ♡  ✦", w / 2, h / 2 + h * 0.13);

}

function initScratch() {

    if (scratchRevealed) {
        return;
    }

    const r = scratchCard.getBoundingClientRect();

    if (!r.width) {
        return;
    }

    scratchDpr = Math.min(2, window.devicePixelRatio || 1);

    scratchW = r.width;
    scratchH = r.height;

    scratchCanvas.width = Math.round(scratchW * scratchDpr);
    scratchCanvas.height = Math.round(scratchH * scratchDpr);

    scratchCtx.setTransform(scratchDpr, 0, 0, scratchDpr, 0, 0);

    paintFoil();

    scratchCanvas.classList.remove("gone");

}

function scratchPoint(e) {

    const r = scratchCanvas.getBoundingClientRect();

    return {
        x: (e.clientX - r.left) * (scratchW / r.width),
        y: (e.clientY - r.top) * (scratchH / r.height)
    };

}

function scratchLine(x0, y0, x1, y1) {

    scratchCtx.globalCompositeOperation = "destination-out";

    scratchCtx.lineCap = "round";
    scratchCtx.lineJoin = "round";
    scratchCtx.lineWidth = Math.max(30, scratchW * 0.11);

    scratchCtx.beginPath();
    scratchCtx.moveTo(x0, y0);
    scratchCtx.lineTo(x1 + 0.01, y1 + 0.01);
    scratchCtx.stroke();

}

function checkScratch() {

    if (scratchRevealed) {
        return;
    }

    const w = scratchCanvas.width;
    const h = scratchCanvas.height;

    if (!w || !h) {
        return;
    }

    const data = scratchCtx.getImageData(0, 0, w, h).data;

    const step = Math.max(4, Math.round(8 * scratchDpr));

    let cleared = 0;
    let total = 0;

    for (let y = 0; y < h; y += step) {

        for (let x = 0; x < w; x += step) {

            total++;

            if (data[(y * w + x) * 4 + 3] < 40) {
                cleared++;
            }

        }

    }

    if (total && cleared / total > 0.5) {

        revealHearts();

    }

}

function revealHearts() {

    scratchRevealed = true;

    scratching = false;

    scratchCanvas.classList.add("gone");

    scratchUnder.classList.add("ready");

    scratchUnder.tabIndex = 0;

    scratchHint.textContent = "Now tap the hearts 💗";

}

scratchCanvas.addEventListener("pointerdown", function (e) {

    if (scratchRevealed) {
        return;
    }

    scratching = true;

    try {
        scratchCanvas.setPointerCapture(e.pointerId);
    } catch (err) { }

    const p = scratchPoint(e);

    scratchLastX = p.x;
    scratchLastY = p.y;

    scratchLine(p.x, p.y, p.x, p.y);

    e.preventDefault();

});

scratchCanvas.addEventListener("pointermove", function (e) {

    if (!scratching) {
        return;
    }

    const p = scratchPoint(e);

    scratchLine(scratchLastX, scratchLastY, p.x, p.y);

    scratchLastX = p.x;
    scratchLastY = p.y;

    if (!scratchCheckTimer) {

        scratchCheckTimer = setTimeout(function () {

            scratchCheckTimer = null;

            checkScratch();

        }, 280);

    }

    e.preventDefault();

});

function endScratch() {

    if (!scratching) {
        return;
    }

    scratching = false;

    checkScratch();

}

scratchCanvas.addEventListener("pointerup", endScratch);
scratchCanvas.addEventListener("pointercancel", endScratch);

// if the screen size changes before she scratches, redraw the foil to fit
window.addEventListener("resize", function () {

    if (!scratchPage.classList.contains("active") || scratchRevealed) {
        return;
    }

    const w = scratchCard.getBoundingClientRect().width;

    if (Math.abs(w - scratchW) > 2) {
        initScratch();
    }

});


/* tap the two hearts -> they come together + the days counter appears */

function spawnScratchHearts() {

    for (let i = 0; i < 10; i++) {

        const h = document.createElement("span");

        h.className = "fw-heart";

        h.textContent = "♥";

        h.style.left = (28 + Math.random() * 44) + "%";

        h.style.top = (45 + Math.random() * 30) + "%";

        h.style.fontSize = (14 + Math.random() * 14) + "px";

        h.style.animationDelay = (Math.random() * 1.1) + "s";

        scratchFloaties.appendChild(h);

        setTimeout(function () {
            h.remove();
        }, 4500);

    }

}

function countUpDays(target, done) {

    const duration = 2200;

    const start = performance.now();

    function frame(now) {

        const t = Math.min(1, (now - start) / duration);

        const eased = 1 - Math.pow(1 - t, 3);

        daysNum.textContent = Math.round(target * eased);

        if (t < 1) {

            requestAnimationFrame(frame);

        } else {

            daysNum.textContent = target;

            done();

        }

    }

    requestAnimationFrame(frame);

}

function tapHearts() {

    if (!scratchRevealed || scratchShown) {
        return;
    }

    scratchShown = true;

    scratchUnder.classList.add("joined");

    scratchHint.textContent = "💗";

    spawnScratchHearts();

    daysNum.textContent = "0";

    daysBox.classList.add("show");

    setTimeout(function () {

        daysBox.scrollIntoView({ behavior: "smooth", block: "center" });

    }, 250);

    countUpDays(daysTogether(), function () {

        setTimeout(function () {

            daysBox.classList.add("forever");

            daysBox.scrollIntoView({ behavior: "smooth", block: "center" });

        }, 500);

        setTimeout(function () {

            scratchDown.classList.add("show");

        }, 2600);

    });

}

scratchUnder.addEventListener("click", tapHearts);

scratchUnder.addEventListener("keydown", function (e) {

    if (e.key === "Enter" || e.key === " ") {

        e.preventDefault();

        tapHearts();

    }

});

if (scratchDown) {
    scratchDown.addEventListener("click", backToGifts);
}


/* =========================================================
   OUR STORY — song on repeat + photos drifting up + the words at the bottom
   ========================================================= */

/*
   The story is told in chapters. Each chapter has:
     text:    the line typed out at the bottom
     seconds: how long the chapter lasts (0 = it stays forever, used for the last one)
     mood:    "sad" makes the photos go dim and grey, "warm" is the normal look
     photos:  the pictures that drift up one by one during the chapter (files in the photos folder)
   Change the words, the timing or the photos right here.
*/

const MEMORY_CHAPTERS = [

    {
        text: "This is where we first started talking",
        seconds: 24,
        mood: "warm",
        photos: [
            "memory-01.png", "memory-02.png", "memory-03.png",
            "memory-05.png", "memory-13.png", "memory-14.png"
        ]
    },

    {
        text: "These are the first pics you sent me",
        seconds: 30,
        mood: "warm",
        photos: [
            "memory-06.jpg", "memory-07.jpg", "memory-08.jpg",
            "memory-11.jpg", "memory-12.jpg", "memory-18.png", "memory-20.jpg"
        ]
    },

    {
        text: "This is where we fell in love with each other",
        seconds: 60,
        mood: "warm",
        photos: [
            "memory-15.png", "memory-16.png", "memory-17.jpg", "memory-21.png",
            "memory-22.png", "memory-23.png", "memory-24.png", "memory-25.png",
            "memory-26.png"
        ]
    },

    {
        text: "There's some sad and breaking things that happened",
        seconds: 60,
        mood: "sad",
        photos: [
            "memory-27.png", "memory-28.png", "memory-31.png", "memory-32.png",
            "memory-33.png", "memory-34.png", "memory-35.png", "memory-36.png",
            "memory-37.png", "memory-38.png", "memory-39.png", "memory-40.png",
            "memory-41.png", "memory-42.png", "memory-43.png", "memory-44.png",
            "memory-45.png", "memory-46.png"
        ]
    },

    {
        text: "But we still made it :)",
        seconds: 36,
        mood: "warm",
        photos: [
            "memory-47.png", "memory-48.png", "memory-49.png", "memory-50.png",
            "memory-51.png", "memory-52.png", "memory-53.png"
        ]
    }

];

const MEMORY_FOLDER = "";


const memoryPageEl = document.getElementById("memoryPage");
const memorySky = document.getElementById("memorySky");
const memoryLine = document.getElementById("memoryLine");
const memoryHearts = document.querySelector(".memory-hearts");
const bgSong = document.getElementById("bgSong");
const soundBtn = document.getElementById("soundBtn");

let memoryLane = false;
let memoryStarted = false;
let memoryTimers = [];


function memoryLater(fn, ms) {

    const id = setTimeout(fn, ms);

    memoryTimers.push(id);

    return id;

}


/* song: plays on a loop, fades in softly */

function startSong() {

    if (!bgSong.getAttribute("src")) {

        bgSong.src = "song.mp3";

    }

    bgSong.loop = true;

    try {
        bgSong.volume = 0;
    } catch (err) { }

    const p = bgSong.play();

    if (p && p.catch) {
        p.catch(function () { });
    }

    // slow fade-in (iPhones ignore volume, they simply play at normal level)
    let v = 0;

    const fade = setInterval(function () {

        v += 0.04;

        try {
            bgSong.volume = Math.min(0.85, v);
        } catch (err) { }

        if (v >= 0.85) {
            clearInterval(fade);
        }

    }, 150);

}

// safety net: if the browser ever stops the loop, start again
bgSong.addEventListener("ended", function () {

    bgSong.currentTime = 0;

    bgSong.play().catch(function () { });

});

soundBtn.addEventListener("click", function () {

    if (bgSong.paused) {

        bgSong.play().catch(function () { });

        soundBtn.classList.remove("muted");

        soundBtn.setAttribute("aria-label", "Turn music off");

    } else {

        bgSong.pause();

        soundBtn.classList.add("muted");

        soundBtn.setAttribute("aria-label", "Turn music on");

    }

});


/* one polaroid drifting slowly up the screen */

function spawnMemoryPhoto(src) {

    const H = memorySky.clientHeight;
    const W = memorySky.clientWidth;

    if (!H || !W) {
        return;
    }

    const maxW = W > 700 ? 280 : 210;

    const cardW = Math.round(Math.min(maxW, Math.max(130, W * 0.4)) * (0.9 + Math.random() * 0.2));

    const boxW = cardW - 16;

    const boxH = boxW * 1.25;

    const card = document.createElement("div");

    card.className = "float-photo";

    card.style.width = cardW + "px";

    const box = document.createElement("div");

    box.className = "pol-box";

    const img = document.createElement("img");

    img.alt = "";

    img.onload = function () {

        // small screenshots are enlarged a little (never more than 2.4x), photos fill the frame
        const scale = Math.min(
            2.4,
            (boxW * 0.94) / img.naturalWidth,
            (boxH * 0.94) / img.naturalHeight
        );

        img.style.width = Math.round(img.naturalWidth * scale) + "px";

        img.style.height = "auto";

        img.classList.add("ready");

    };

    img.src = src;

    box.appendChild(img);

    card.appendChild(box);

    // alternate between the left and right side so they never stack on top of each other
    memoryLane = !memoryLane;

    const minLeft = memoryLane ? W * 0.04 : W * 0.46;
    const maxLeft = memoryLane ? W * 0.4 : W * 0.8;

    let left = minLeft + Math.random() * (maxLeft - minLeft);

    left = Math.max(6, Math.min(left, W - cardW - 8));

    const startTop = H * 0.9;

    const cardH = boxH + 34;

    const wrap = document.createElement("div");

    wrap.className = "float-wrap";

    wrap.style.left = Math.round(left) + "px";

    wrap.style.top = Math.round(startTop) + "px";

    wrap.appendChild(card);

    memorySky.appendChild(wrap);

    const tilt1 = Math.random() * 12 - 6;
    const tilt2 = tilt1 + (Math.random() * 6 - 3);

    const travel = startTop + cardH + 20;

    const anim = wrap.animate(
        [
            { transform: "translateY(0) rotate(" + tilt1 + "deg)", opacity: 0 },
            { transform: "translateY(" + (-travel * 0.08) + "px) rotate(" + tilt1 + "deg)", opacity: 1, offset: 0.08 },
            { transform: "translateY(" + (-travel) + "px) rotate(" + tilt2 + "deg)", opacity: 1 }
        ],
        {
            duration: 15500 + Math.random() * 3000,
            easing: "linear",
            fill: "forwards"
        }
    );

    anim.onfinish = function () {
        wrap.remove();
    };

}


/* a burst of bright hearts (used when "we still made it" starts) */

function memoryHeartsBurst() {

    for (let i = 0; i < 18; i++) {

        const h = document.createElement("span");

        h.className = "burst";

        h.textContent = "♥";

        h.style.left = (4 + Math.random() * 92) + "%";

        h.style.fontSize = (16 + Math.random() * 22) + "px";

        h.style.animationDuration = (5 + Math.random() * 4) + "s";

        h.style.animationDelay = (Math.random() * 1.6) + "s";

        memoryHearts.appendChild(h);

        setTimeout(function () {
            h.remove();
        }, 12000);

    }

}


/* the words: typed letter by letter, and they stay while the chapter plays */

function typeMemoryText(text) {

    let ci = 0;

    memoryLine.textContent = "";

    memoryLine.classList.add("show", "typing");

    function typeChar() {

        ci++;

        memoryLine.textContent = text.slice(0, ci);

        if (ci < text.length) {

            memoryLater(typeChar, 55);

        } else {

            memoryLine.classList.remove("typing");

        }

    }

    typeChar();

}


function playMemoryChapter(index) {

    const ch = MEMORY_CHAPTERS[index];

    if (!ch) {
        return;
    }

    const wasSad = memoryPageEl.classList.contains("sad");

    memoryPageEl.classList.toggle("sad", ch.mood === "sad");

    if (wasSad && ch.mood !== "sad") {

        memoryHeartsBurst();

    }

    typeMemoryText(ch.text);

    // the pictures of this chapter, one by one, spread over the chapter's time
    const list = ch.photos;

    const LEAD = 1800;      // the line is typed first, then the first picture appears
    const TAIL = 6000;      // the last picture gets this long to be seen before the chapter ends

    const interval = ch.seconds
        ? Math.min(7000, Math.max(3000, (ch.seconds * 1000 - LEAD - TAIL) / list.length))
        : 4600;

    let k = 0;

    function nextPhoto() {

        spawnMemoryPhoto(MEMORY_FOLDER + list[k % list.length]);

        k++;

        // a timed chapter shows each picture once, the last chapter keeps going forever
        if (ch.seconds && k >= list.length) {
            return;
        }

        memoryLater(nextPhoto, interval);

    }

    memoryLater(nextPhoto, LEAD);

    if (ch.seconds) {

        // about the chapter's time (a little longer only if the pictures need it)
        const endMs = Math.max(ch.seconds * 1000, LEAD + (list.length - 1) * interval + TAIL);

        memoryLater(function () {

            // this chapter's pictures and words fade away, then the next chapter starts
            memoryLine.classList.remove("show");

            memorySky.querySelectorAll(".float-wrap").forEach(function (w) {

                w.classList.add("leaving");

                setTimeout(function () {
                    w.remove();
                }, 2200);

            });

            memoryLater(function () {

                if (index + 1 < MEMORY_CHAPTERS.length) {
                    playMemoryChapter(index + 1);
                } else {
                    startFinalLetter();
                }

            }, 1200);

        }, endMs);

    }

}

/* the closing letter, shown once after the last picture */

const LETTER_PARAGRAPHS = [
    "We met, and I didn't know you were gonna be the love of my life.",
    "Maybe you loved me more back then, I did too, but some misunderstanding made us leave each other, and I gladly take all the blame for that on me.",
    "Breaking things happened, but we learned. We got matured. We survived through everything. It was disastrous, but a bad past doesn't indicate a bad future.",
    "And I want to make dreams true with you, travel with you, spend life with you, fight through every argument, spend every birthday with you, and I want to make you my wife.",
    "Happy 18th birthday, dear. I hope all of your stress and bad thoughts go with this, and a good future comes :)"
];

function startFinalLetter() {

    const box = document.getElementById("memoryLetter");
    const inner = document.getElementById("letterInner");

    if (!box || !inner) {
        return;
    }

    memoryPageEl.classList.remove("sad");
    memoryPageEl.classList.add("letter-on");
    box.classList.add("show");
    memoryHeartsBurst();

    let delay = 1500;

    LETTER_PARAGRAPHS.forEach(function (text, pi) {

        const p = document.createElement("p");

        if (pi === LETTER_PARAGRAPHS.length - 1) {
            p.className = "letter-last";
        }

        inner.appendChild(p);

        text.split(" ").forEach(function (word) {

            const span = document.createElement("span");

            span.textContent = word + " ";

            p.appendChild(span);

            memoryLater(function () {

                span.classList.add("on");

                if (box.scrollHeight - box.scrollTop - box.clientHeight < 160) {
                    box.scrollTo({ top: box.scrollHeight, behavior: "smooth" });
                }

            }, delay);

            delay += 230;

        });

        delay += 1400;

    });

    memoryLater(memoryHeartsBurst, delay);

    // after the last words, a small icon appears: "Final message"
    memoryLater(function () {

        const btn = document.createElement("button");

        btn.className = "final-btn";
        btn.type = "button";
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg><span>Final message</span>';

        inner.appendChild(btn);

        requestAnimationFrame(function () {
            btn.classList.add("show");
        });

        box.scrollTo({ top: box.scrollHeight, behavior: "smooth" });

        btn.addEventListener("click", openFinalMessage);

    }, delay + 1500);

}


const FINAL_PARAGRAPHS = [
    "Sorry if it was bad, I tried my best.",
    "I didn't use any already-made website and customized it, I made it from scratch. Although I did use AI a bit, 90% of the tasks were done by me.",
    "I hope you love it. Thanks for coming this far.",
    "Please, gladly take this as a gift. It's only for you."
];

let finalOpened = false;

function openFinalMessage() {

    if (finalOpened) {
        return;
    }

    finalOpened = true;

    // the music belongs to the memories and the letter only, so it stops here for good
    if (typeof bgSong !== "undefined" && bgSong) {

        let v = bgSong.volume;

        const fade = setInterval(function () {

            v = Math.max(0, v - 0.05);

            try { bgSong.volume = v; } catch (e) {}

            if (v <= 0) {
                clearInterval(fade);
                bgSong.pause();
            }

        }, 80);

        // iOS ignores volume changes, so make sure it really stops
        setTimeout(function () { bgSong.pause(); }, 1800);

    }

    if (soundBtn) {
        soundBtn.style.display = "none";
    }

    const box = document.getElementById("finalMsg");
    const inner = document.getElementById("finalInner");

    box.classList.add("show");

    let delay = 1500;

    FINAL_PARAGRAPHS.forEach(function (text, pi) {

        const p = document.createElement("p");

        if (pi === FINAL_PARAGRAPHS.length - 1) {
            p.className = "letter-last";
        }

        inner.appendChild(p);

        text.split(" ").forEach(function (word) {

            const span = document.createElement("span");

            span.textContent = word + " ";

            p.appendChild(span);

            setTimeout(function () {
                span.classList.add("on");
            }, delay);

            delay += 220;

        });

        delay += 1100;

    });

    setTimeout(memoryHeartsBurst, delay);

}


function startMemoryShow() {

    if (memoryStarted) {
        return;
    }

    memoryStarted = true;

    // load the pictures in the background so none of them pops in late
    MEMORY_CHAPTERS.forEach(function (ch) {

        ch.photos.forEach(function (name) {

            const i = new Image();

            i.src = MEMORY_FOLDER + name;

        });

    });

    playMemoryChapter(0);

}

if (giftsNext) {

    giftsNext.addEventListener("click", function () {

        // the song has to start inside this tap, that is what lets the browser play it
        startSong();

        showGiftPage(memoryPage);

        startMemoryShow();

    });

}
