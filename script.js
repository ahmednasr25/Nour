/* =========================================================
   ELEMENTS
========================================================= */

const countdownPage =
    document.getElementById("countdownPage");

const videoPage =
    document.getElementById("videoPage");

const quotePage =
    document.getElementById("quotePage");

const letterPage =
    document.getElementById("letterPage");

const memoryPage =
    document.getElementById("memoryPage");

const questionPage =
    document.getElementById("questionPage");

const finalPage =
    document.getElementById("finalPage");


/* Main elements */

const countdown =
    document.getElementById("countdown");

const introVideo =
    document.getElementById("introVideo");

const videoSource =
    document.getElementById("videoSource");

const videoMessage =
    document.getElementById("videoMessage");

const playBtn =
    document.getElementById("playBtn");

const grain =
    document.getElementById("grain");

const typing =
    document.getElementById("typing");

const nextButton =
    document.querySelector(".next");

const no =
    document.getElementById("no");

const yes =
    document.getElementById("yes");


/* =========================================================
   GLOBAL STATE
========================================================= */

let movieStarted = false;

let videoFrozen = false;

let memoryWordsTimer = null;

let finalRainStarted = false;


/* =========================================================
   PAGE SWITCH
========================================================= */

function showPage(page) {

    const current =
        document.querySelector(".page.active");


    if (current === page) {
        return;
    }


    if (current) {

        current.classList.remove("active");
    }


    setTimeout(() => {

        page.classList.add("active");

    }, 300);
}


/* =========================================================
   VIDEO SOURCE
   Desktop / Mobile
========================================================= */

function setVideoForDevice() {

    const isMobile =
        window.matchMedia(
            "(max-width: 600px)"
        ).matches;


    const newSource =
        isMobile
            ? "assets/intro-mobile.mp4"
            : "assets/intro.mp4";


    if (
        videoSource.getAttribute("src")
        !== newSource
    ) {

        videoSource.src = newSource;

        introVideo.load();
    }
}


setVideoForDevice();


/* =========================================================
   COUNTDOWN
========================================================= */

/*
    Change this date if you ever want
    to change the birthday date.
*/

const targetDate =
    new Date(
        "August 22, 2025 00:00:00"
    ).getTime();


function updateCountdown() {

    const now =
        Date.now();


    const distance =
        targetDate - now;


    /* Birthday arrived */

    if (distance <= 0) {

        if (!movieStarted) {

            movieStarted = true;

            startMovie();
        }

        return;
    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (
                distance %
                (1000 * 60)
            ) /
            1000
        );


    countdown.textContent =
        `${days} : ${hours} : ${minutes} : ${seconds}`;
}


setInterval(
    updateCountdown,
    1000
);


updateCountdown();
/* =========================================================
   VIDEO
========================================================= */

/*
    Time in seconds where the video pauses
    temporarily to show the emotional message.
*/

const freezeTime = 64;


function startMovie() {

    showPage(videoPage);

    videoFrozen = false;

    introVideo.currentTime = 0;

    playBtn.classList.remove("hide");

    videoMessage.style.opacity = "0";
}


/* =========================================================
   VIDEO PLAY BUTTON
========================================================= */

playBtn.addEventListener(
    "click",
    () => {

        introVideo
            .play()
            .then(() => {

                playBtn.classList.add("hide");

                grain.style.opacity = "0";

            })
            .catch(error => {

                console.log(
                    "Video could not start:",
                    error
                );

            });

    }
);


/* =========================================================
   VIDEO FREEZE MOMENT
========================================================= */

introVideo.addEventListener(
    "timeupdate",
    () => {

        if (
            introVideo.currentTime >= freezeTime
            &&
            !videoFrozen
        ) {

            videoFrozen = true;

            introVideo.pause();


            videoMessage.style.opacity = "1";


            setTimeout(() => {

                videoMessage.style.opacity = "0";

                introVideo.play();

            }, 3000);
        }

    }
);


/* =========================================================
   VIDEO END
========================================================= */

introVideo.addEventListener(
    "ended",
    showQuote
);


/* =========================================================
   QUOTE
========================================================= */

function showQuote() {

    showPage(quotePage);


    const lines =
        document.querySelectorAll(
            ".quote .line"
        );


    lines.forEach(
        (line, index) => {

            setTimeout(() => {

                line.style.opacity = "1";

            }, index * 2500);

        }
    );


    setTimeout(() => {

        document
            .getElementById("heart")
            .style.opacity = "1";

    }, 8000);


    /*
        After the quote finishes,
        show the envelope.
    */

    setTimeout(() => {

        showPage(letterPage);

        setupEnvelope();

    }, 10500);
}


/* =========================================================
   ENVELOPE
========================================================= */

function setupEnvelope() {

    const envelopeWrapper =
        document.getElementById(
            "envelopeWrapper"
        );

    const letterBox =
        document.querySelector(
            ".letterBox"
        );


    /*
        Always reset the state
        before showing the envelope.
    */

    envelopeWrapper.style.display =
        "flex";

    envelopeWrapper.style.opacity =
        "1";

    envelopeWrapper.style.transform =
        "";


    envelopeWrapper.classList.remove(
        "opening"
    );


    /*
        IMPORTANT:
        Letter stays completely hidden.
    */

    letterBox.classList.remove(
        "show-letter"
    );

    letterBox.classList.add(
        "hidden-letter"
    );


    function openEnvelope() {

        envelopeWrapper.removeEventListener(
            "click",
            openEnvelope
        );


        /*
            Start opening animation.
        */

        envelopeWrapper.classList.add(
            "opening"
        );


        /*
            Fade the envelope out
            after opening.
        */

        setTimeout(() => {

            envelopeWrapper.style.opacity =
                "0";

            envelopeWrapper.style.transform =
                "translateY(-30px) scale(.95)";

        }, 900);


        /*
            Now show the actual paper.
        */

        setTimeout(() => {

            envelopeWrapper.style.display =
                "none";


            letterBox.classList.remove(
                "hidden-letter"
            );

            letterBox.classList.add(
                "show-letter"
            );


            startTyping();

        }, 1700);
    }


    envelopeWrapper.addEventListener(
        "click",
        openEnvelope
    );
}


/* =========================================================
   LETTER CONTENT
========================================================= */

const letterText = `Dear Nour,

There are some things
that are difficult to say out loud.

So I wanted to leave them here,
in a place you can always come back to.

You are more than just a beautiful memory
or a moment in my life.

You are part of so many moments
that I will always carry with me.

The laughs.
The conversations.
The little things
that probably seemed ordinary at the time...

but somehow became unforgettable.

I hope life gives you
a thousand reasons to smile.

And I hope, through every chapter,
you always remember
that there will always be someone
who is proud of you,
believes in you,
and wishes the best for you.

Happy Birthday, Nour.

May this year be kinder,
brighter,
and full of moments
worth remembering.

Always,
`;


/* Current typing position */

let letterIndex = 0;


/* =========================================================
   TYPING EFFECT
========================================================= */

function startTyping() {

    typing.textContent = "";

    nextButton.style.opacity = "0";

    nextButton.style.pointerEvents =
        "none";


    letterIndex = 0;


    const timer =
        setInterval(() => {

            typing.textContent +=
                letterText[letterIndex];


            letterIndex++;


            if (
                letterIndex >=
                letterText.length
            ) {

                clearInterval(timer);


                /*
                    Show Continue
                    after typing finishes.
                */

                setTimeout(() => {

                    nextButton.style.opacity =
                        "1";

                    nextButton.style.pointerEvents =
                        "auto";

                }, 800);
            }

        }, 45);
}


/* =========================================================
   LETTER -> MEMORY WALL
========================================================= */

nextButton.addEventListener(
    "click",
    () => {

        if (
            letterPage.classList.contains(
                "active"
            )
        ) {

            showPage(memoryPage);

            startMemoryAnimation();
        }

    }
);
/* =========================================================
   MEMORY WALL
========================================================= */

const memories =
    document.querySelectorAll(
        ".memory"
    );


function startMemoryAnimation() {

    /*
        Reset every photo.
    */

    memories.forEach(
        (memory, index) => {

            memory.style.opacity = "0";

            memory.style.transform =
                "translateY(-100px) rotate(0deg)";


            setTimeout(() => {

                memory.style.transition =
                    "all 1.5s ease";


                memory.style.opacity =
                    "1";


                memory.style.transform =
                    "translateY(0) rotate(0deg)";

            }, index * 400);

        }
    );


    startMemoryWords();


    /*
        After 41 seconds,
        leave the memory wall.
    */

    setTimeout(() => {

        exitMemoryWall();

    }, 41000);
}


/* =========================================================
   MEMORY QUOTES
========================================================= */

function startMemoryWords() {

    const quote =
        document.getElementById("memoryQuote");

    const words = [

        `
        Not every memory
        <br>
        is captured in a picture...
        `,

        `
        Some live in the laughter,
        <br>
        the little moments,
        <br>
        and the days we never knew
        <br>
        would become unforgettable.
        `,

        `
        And no matter how much time passes,
        <br>
        some memories will always feel like home.
        `,

        `
        The moments we share
        <br>
        become stories
        <br>
        we never forget.
        `,

        `
        I love you more than words
        could ever explain...
        `
    ];


    // نبدأ من الجملة الثانية
    // لأن الأولى موجودة أصلًا في HTML
    let index = 1;


    // إلغاء أي مؤقت قديم
    if (memoryWordsTimer) {

        clearTimeout(memoryWordsTimer);

        memoryWordsTimer = null;
    }


    function showNextWord() {

        // لو وصلنا لآخر جملة، نقف نهائيًا
        if (index >= words.length) {

            memoryWordsTimer = null;

            return;
        }


        quote.style.opacity = "0";


        setTimeout(() => {

            quote.innerHTML =
                words[index];

            quote.style.opacity =
                "1";

            index++;


            // بعد ظهور الجملة الخامسة
            // لا نبدأ من الأول
            if (index < words.length) {

                memoryWordsTimer =
                    setTimeout(
                        showNextWord,
                        7000
                    );

            } else {

                memoryWordsTimer = null;

            }

        }, 1500);
    }


    // أول تغيير بعد 7 ثواني
    memoryWordsTimer =
        setTimeout(
            showNextWord,
            7000
        );
}


/* =========================================================
   EXIT MEMORY WALL
========================================================= */

function exitMemoryWall() {

    if (memoryWordsTimer) {

        clearInterval(
            memoryWordsTimer
        );

        memoryWordsTimer = null;
    }


    memories.forEach(
        memory => {

            memory.style.transition =
                "all 2s ease";

            memory.style.transform =
                "translateY(-150vh) rotate(20deg)";

            memory.style.opacity =
                "0";

        }
    );


    document
        .querySelector(".memoryText")
        .style.opacity = "0";


    setTimeout(() => {

        showPage(questionPage);

    }, 2500);
}


/* =========================================================
   NO BUTTON
   The button runs away from the cursor.
========================================================= */

const noText =
    no.querySelector(".no-text");


const noTexts = [

    "NO",

    "Are you sure?",

    "Think again!",

    "Really?",

    "Nice try 😉",

    "Don't do this",

    "Please?",

    "You can't catch me!",

    "Wrong answer",

    "Error 404: No not found"

];


let noTextIndex = 0;

let isFleeing = false;


function runFromMouse(event) {

    if (
        !questionPage.classList.contains(
            "active"
        )
    ) {

        return;
    }


    const mouseX =
        event.clientX ||
        (
            event.touches &&
            event.touches[0] &&
            event.touches[0].clientX
        );


    const mouseY =
        event.clientY ||
        (
            event.touches &&
            event.touches[0] &&
            event.touches[0].clientY
        );


    if (
        mouseX === undefined ||
        mouseY === undefined
    ) {

        return;
    }


    const buttonRect =
        no.getBoundingClientRect();


    const centerX =
        buttonRect.left +
        buttonRect.width / 2;


    const centerY =
        buttonRect.top +
        buttonRect.height / 2;


    const deltaX =
        mouseX - centerX;


    const deltaY =
        mouseY - centerY;


    const distance =
        Math.sqrt(
            deltaX * deltaX +
            deltaY * deltaY
        );


    const fleeDistance = 130;


    if (
        distance < fleeDistance
    ) {

        if (!isFleeing) {

            isFleeing = true;

            no.style.position =
                "fixed";

            no.style.left =
                `${buttonRect.left}px`;

            no.style.top =
                `${buttonRect.top}px`;

            no.style.margin = "0";
        }


        const angle =
            Math.atan2(
                deltaY,
                deltaX
            );


        const movement =
            fleeDistance -
            distance +
            20;


        const fleeX =
            Math.cos(angle) *
            -movement;


        const fleeY =
            Math.sin(angle) *
            -movement;


        let newLeft =
            buttonRect.left +
            fleeX;


        let newTop =
            buttonRect.top +
            fleeY;


        const padding = 20;


        const maxLeft =
            window.innerWidth -
            buttonRect.width -
            padding;


        const maxTop =
            window.innerHeight -
            buttonRect.height -
            padding;


        newLeft =
            Math.max(
                padding,
                Math.min(
                    newLeft,
                    maxLeft
                )
            );


        newTop =
            Math.max(
                padding,
                Math.min(
                    newTop,
                    maxTop
                )
            );


        no.style.left =
            `${newLeft}px`;

        no.style.top =
            `${newTop}px`;
    }
}


/* =========================================================
   CHANGE NO TEXT
========================================================= */

function changeNoText() {

    noText.style.opacity = "0";


    setTimeout(() => {

        noTextIndex =
            (
                noTextIndex + 1
            ) %
            noTexts.length;


        noText.textContent =
            noTexts[noTextIndex];


        noText.style.opacity =
            "1";

    }, 150);
}


/* Mouse */

document.addEventListener(
    "mousemove",
    runFromMouse
);


/* Touch */

document.addEventListener(
    "touchmove",
    runFromMouse,
    {
        passive: true
    }
);


/* Change text */

no.addEventListener(
    "mouseenter",
    changeNoText
);


no.addEventListener(
    "touchstart",
    changeNoText,
    {
        passive: true
    }
);


/* =========================================================
   YES BUTTON
========================================================= */

yes.addEventListener(
    "click",
    () => {

        showPage(finalPage);

        startFinalAnimation();

    }
);


/* =========================================================
   FINAL ANIMATION
========================================================= */

function startFinalAnimation() {

    const lines =
        document.querySelectorAll(
            ".finalLine"
        );


    const messageBlock =
        document.querySelector(
            ".finalMessageBlock"
        );


    const last =
        document.querySelector(
            ".finalLast"
        );


    /*
        Start heart rain.
    */

    createHeartsRain();


    /*
        Romantic text timing.
    */

    setTimeout(() => {

        lines[0].classList.add(
            "finalShow"
        );

    }, 2000);


    setTimeout(() => {

        lines[1].classList.add(
            "finalShow"
        );

    }, 6000);


    setTimeout(() => {

        lines[2].classList.add(
            "finalShow"
        );

    }, 10000);


    setTimeout(() => {

        messageBlock.classList.add(
            "finalShow"
        );

    }, 15000);


    setTimeout(() => {

        last.classList.add(
            "finalShow"
        );

    }, 21000);
}


/* =========================================================
   GOLDEN HEART RAIN
========================================================= */

function createHeartsRain() {

    /*
        Prevent creating multiple
        heart intervals.
    */

    if (finalRainStarted) {

        return;
    }


    finalRainStarted = true;


    const rainContainer =
        document.getElementById(
            "heartsRain"
        );


    const heartSymbols = [
        "🤍",
        "❤️",
        "💛",
        "💖"
    ];


    setInterval(() => {

        const heart =
            document.createElement(
                "div"
            );


        heart.classList.add(
            "heart-drop"
        );


        /*
            Random heart.
        */

        heart.textContent =
            heartSymbols[
                Math.floor(
                    Math.random() *
                    heartSymbols.length
                )
            ];


        /*
            Random horizontal position.
        */

        heart.style.left =
            Math.random() *
            100 +
            "vw";


        /*
            Random falling speed.
        */

        const duration =
            Math.random() * 3 + 4;


        heart.style.animationDuration =
            `${duration}s`;


        /*
            Random opacity.
        */

        heart.style.opacity =
            Math.random() * .5 + .2;


        rainContainer.appendChild(
            heart
        );


        /*
            Remove old hearts
            to prevent memory usage.
        */

        setTimeout(() => {

            heart.remove();

        }, 7000);

    }, 300);
}


/* =========================================================
   RESET NO BUTTON ON RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (!no) {
            return;
        }


        /*
            Put NO back beside YES
            if screen size changes.
        */

        no.style.position =
            "relative";

        no.style.left =
            "";

        no.style.top =
            "";

        no.style.margin =
            "";


        isFleeing = false;
    }
);
/* =========================================================
   DEVELOPMENT PREVIEW MODE
========================================================= */

const previewPage = new URLSearchParams(
    window.location.search
).get("preview");

const previewPages = {
    countdown: countdownPage,
    video: videoPage,
    quote: quotePage,
    letter: letterPage,
    memory: memoryPage,
    question: questionPage,
    final: finalPage
};

if (previewPage && previewPages[previewPage]) {

    document
        .querySelectorAll(".page")
        .forEach(page => {
            page.classList.remove("active");
        });

    previewPages[previewPage]
        .classList.add("active");


    // تشغيل أنيميشن الـ Memory أثناء الـ Preview
    if (previewPage === "memory") {
        startMemoryAnimation();
    }
}