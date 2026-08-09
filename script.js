/* =========================
   ELEMENTS
========================= */


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



const countdown =
document.getElementById("countdown");


const introVideo =
document.getElementById("introVideo");

const videoSource =
document.getElementById("videoSource");



function setVideoForDevice() {

    const isMobile =
        window.matchMedia("(max-width: 600px)").matches;


    const newSource = isMobile
        ? "assets/intro-mobile.mp4"
        : "assets/intro.mp4";


    if (videoSource.getAttribute("src") !== newSource) {

        videoSource.src = newSource;

        introVideo.load();

    }

}



setVideoForDevice();


const videoMessage =
document.getElementById("videoMessage");


const typing =
document.getElementById("typing");


const nextButton =
document.querySelector(".next");


const playBtn =
document.getElementById("playBtn");


const grain =
document.getElementById("grain");


const no =
document.getElementById("no");


const yes =
document.getElementById("yes");




let movieStarted = false;


let videoFrozen = false;







/* =========================
   PAGE SWITCH
========================= */


function showPage(page){


    const current =
    document.querySelector(".page.active");



    if(current === page) return;



    if(current){

        current.classList.remove("active");

    }



    setTimeout(()=>{

        page.classList.add("active");

    },300);


}









/* =========================
   COUNTDOWN
========================= */


const targetDate =
new Date("August 22, 2026 00:00:00").getTime();





function updateCountdown(){


    const now =
    new Date().getTime();



    const distance =
    targetDate - now;





    if(distance <= 0){



        if(!movieStarted){


            movieStarted = true;


            startMovie();


        }


        return;


    }






    const days =
    Math.floor(
        distance/(1000*60*60*24)
    );





    const hours =
    Math.floor(
        (distance%(1000*60*60*24))
        /(1000*60*60)
    );






    const minutes =
    Math.floor(
        (distance%(1000*60*60))
        /(1000*60)
    );






    const seconds =
    Math.floor(
        (distance%(1000*60))
        /1000
    );





    countdown.innerHTML =

    `${days} : ${hours} : ${minutes} : ${seconds}`;





}



setInterval(updateCountdown,1000);


updateCountdown();









/* =========================
   VIDEO START
========================= */


const freezeTime = 64;




function startMovie(){


    showPage(videoPage);


    videoFrozen = false;


    introVideo.currentTime = 0;


    playBtn.classList.remove("hide");


}
/* =========================
   VIDEO PLAY BUTTON
========================= */


playBtn.addEventListener("click",()=>{

    introVideo.play()
    .then(()=>{

        playBtn.classList.add("hide");

        grain.style.opacity = "0";

    })
    .catch(err=>{

        console.log(err);

    });

});








/* =========================
   VIDEO FREEZE
========================= */


introVideo.addEventListener("timeupdate",()=>{



    if(

        introVideo.currentTime >= freezeTime

        &&

        !videoFrozen

    ){



        videoFrozen = true;



        introVideo.pause();




        videoMessage.style.opacity="1";



        setTimeout(()=>{



            videoMessage.style.opacity="0";



            introVideo.play();



        },3000);



    }



});







introVideo.addEventListener("ended",()=>{


    showQuote();


});









/* =========================
   QUOTE
========================= */


function showQuote(){


    showPage(quotePage);



    const lines =
    document.querySelectorAll(".quote .line");



    lines.forEach((line,index)=>{



        setTimeout(()=>{


            line.style.opacity="1";


        },index * 2500);



    });






    setTimeout(()=>{


        document.getElementById("heart")
        .style.opacity="1";



    },8000);






setTimeout(()=>{
        showPage(letterPage);
        setupEnvelope(); // تجهيز الظرف للضغط
    },10500);



}

/* =========================
   ENVELOPE LOGIC
========================= */
function setupEnvelope() {
    const envelopeWrapper = document.getElementById("envelopeWrapper");
    const letterBox = document.querySelector(".letterBox");

    envelopeWrapper.style.display = "flex";
    envelopeWrapper.style.opacity = "1";
    letterBox.classList.remove("show-letter");
    letterBox.classList.add("hidden-letter");

    function openEnvelope() {
        envelopeWrapper.style.transform = "scale(0.8)";
        envelopeWrapper.style.opacity = "0";

        setTimeout(() => {
            envelopeWrapper.style.display = "none";
            letterBox.classList.remove("hidden-letter");
            letterBox.classList.add("show-letter");
            startTyping();
        }, 600);

        envelopeWrapper.removeEventListener("click", openEnvelope);
    }

    envelopeWrapper.addEventListener("click", openEnvelope);
}



/* =========================
   LETTER
========================= */


const letterText = `

Dear Nouran,

Today is not just another day.

It is a reminder of every laugh,
every conversation,
and every little moment we shared.

Some memories are captured in pictures,
but the most beautiful ones
live in our hearts.

I hope we keep creating
new chapters together.

Happy Birthday.

`;



let letterIndex = 0;



function startTyping(){


    typing.innerHTML = "";

    nextButton.style.opacity = "0";
    nextButton.style.pointerEvents = "none";


    letterIndex = 0;



    const timer = setInterval(()=>{


        typing.innerHTML += letterText[letterIndex];


        letterIndex++;




        if(letterIndex >= letterText.length){


            clearInterval(timer);



            setTimeout(()=>{


                nextButton.style.opacity = "1";

                nextButton.style.pointerEvents = "auto";


            },800);



        }



    },45);



}








/* =========================
   LETTER TO MEMORY WALL
========================= */


nextButton.addEventListener("click",()=>{



    if(letterPage.classList.contains("active")){



        showPage(memoryPage);



        startMemoryAnimation();



    }



});
/* =========================
   MEMORY WALL
========================= */


const memories =
document.querySelectorAll(".memory");





function startMemoryAnimation(){



    memories.forEach((memory,index)=>{



        memory.style.opacity="0";



        memory.style.transform =

        "translateY(-100px) rotate(0deg)";





        setTimeout(()=>{



            memory.style.transition =

            "all 1.5s ease";



            memory.style.opacity="1";



            memory.style.transform =

            "translateY(0) rotate(0deg)";



        },index * 400);



    });





    startMemoryWords();





    setTimeout(()=>{


        exitMemoryWall();



    },35000);



}










function startMemoryWords(){



    const quote =

    document.getElementById("memoryQuote");





    const words = [



        `

        Not every memory

        <br>

        is captured in a picture...

        `,





        `

        Some are hidden

        <br>

        in laughs,

        <br>

        conversations,

        <br>

        and little moments.

        `,





        `

        The moments we share

        <br>

        become stories

        <br>

        we never forget.

        `,





        `

        Every moment with you

        <br><br>

        becomes a new memory.

        `



    ];







    let index = 0;






    setInterval(()=>{



        quote.style.opacity="0";





        setTimeout(()=>{



            quote.innerHTML =

            words[index];



            quote.style.opacity="1";



            index++;





            if(index >= words.length){


                index = 0;


            }





        },1500);




    },7000);





}










function exitMemoryWall(){



    memories.forEach((memory)=>{



        memory.style.transition =

        "all 2s ease";





        memory.style.transform =

        "translateY(-150vh) rotate(20deg)";





        memory.style.opacity="0";



    });






    document.querySelector(".memoryText")

    .style.opacity="0";







    setTimeout(()=>{



        showPage(questionPage);



    },2500);



}
/* =========================
   NO BUTTON FLEE LOGIC (PERFECT ALIGNMENT)
========================= */

const noTextSpan = no.querySelector(".no-text") || no;

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

function runFromMouse(e) {
    if (!questionPage.classList.contains("active")) return;

    const mouseX = e.clientX || (e.touches && e.touches[0].clientX);
    const mouseY = e.clientY || (e.touches && e.touches[0].clientY);

    if (!mouseX || !mouseY) return;

    const btnRect = no.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    const deltaX = mouseX - btnCenterX;
    const deltaY = mouseY - btnCenterY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    const fleeDistance = 130;

    if (distance < fleeDistance) {
        if (!isFleeing) {
            isFleeing = true;
            no.style.position = 'fixed';
            no.style.left = `${btnRect.left}px`;
            no.style.top = `${btnRect.top}px`;
            no.style.margin = '0';
        }

        const angle = Math.atan2(deltaY, deltaX);
        const fleeX = Math.cos(angle) * -1 * (fleeDistance - distance + 20);
        const fleeY = Math.sin(angle) * -1 * (fleeDistance - distance + 20);

        let newLeft = btnRect.left + fleeX;
        let newTop = btnRect.top + fleeY;

        const padding = 20;
        const maxLeft = window.innerWidth - btnRect.width - padding;
        const maxTop = window.innerHeight - btnRect.height - padding;

        newLeft = Math.max(padding, Math.min(newLeft, maxLeft));
        newTop = Math.max(padding, Math.min(newTop, maxTop));

        no.style.left = `${newLeft}px`;
        no.style.top = `${newTop}px`;
    }
}

function changeNoText() {
    if (noTextSpan.querySelector && noTextSpan.querySelector(".no-text")) {
        const span = noTextSpan.querySelector(".no-text");
        span.style.opacity = "0";
        setTimeout(() => {
            noTextIndex = (noTextIndex + 1) % noTexts.length;
            span.textContent = noTexts[noTextIndex];
            span.style.opacity = "1";
        }, 150);
    } else {
        noTextIndex = (noTextIndex + 1) % noTexts.length;
        noTextSpan.textContent = noTexts[noTextIndex];
    }
}

document.addEventListener("mousemove", runFromMouse);
document.addEventListener("touchmove", runFromMouse);
no.addEventListener("mouseenter", changeNoText);
no.addEventListener("touchstart", changeNoText);



/* =========================
   YES BUTTON
========================= */


yes.addEventListener("click",()=>{



    showPage(finalPage);



    startFinalAnimation();



});









/* =========================
   NEW FINAL ANIMATION & HEARTS RAIN
========================= */

function startFinalAnimation(){

    const lines = document.querySelectorAll(".finalLine");
    const messageBlock = document.querySelector(".finalMessageBlock");
    const last = document.querySelector(".finalLast");
    


    // 1. بدأ مطر القلوب
    createHeartsRain();


    // 2. ظهور النصوص بتوقيت رومانسي وبطيء

    setTimeout(()=>{
        lines[0].classList.add("finalShow");
    }, 2000); // 2 ثانية


    setTimeout(()=>{
        lines[1].classList.add("finalShow");
    }, 6000); // 6 ثانية


    setTimeout(()=>{
        lines[2].classList.add("finalShow");
    }, 10000); // 10 ثانية


    setTimeout(()=>{
        messageBlock.classList.add("finalShow"); // يظهر البلوك كله
    }, 15000); // 15 ثانية


    setTimeout(()=>{
        last.classList.add("finalShow");
    }, 21000); // 21 ثانية

}



// دالة لإنشاء مطر القلوب الذهبية
function createHeartsRain() {
    const rainContainer = document.getElementById("heartsRain");
    const heartSymbols = ["🤍", "❤️", "💛", "💖"];

    // إنشاء قلب كل فترة
    setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("heart-drop");

        // اختيار رمز عشوائي
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

        // إحداثيات عشوائية
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = (Math.random() * 3 + 4) + "s"; // بين 4 لـ 7 ثواني
        heart.style.opacity = Math.random() * 0.5 + 0.2; // شفافية مختلفة

        rainContainer.appendChild(heart);

        // إزالة القلب بعد انتهاء الأنميشن
        setTimeout(() => {
            heart.remove();
        }, 7000);

    }, 300); // قلب جديد كل 0.3 ثانية
}








/* =========================
   MOBILE SAFETY
========================= */


window.addEventListener("resize",()=>{



    if(no){


        no.style.left="";


        no.style.top="";


    }



});