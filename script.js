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


const videoMessage =
document.getElementById("videoMessage");


const typing =
document.getElementById("typing");


const nextButton =
document.querySelector(".next");


const playBtn =
document.getElementById("playBtn");



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
new Date("August 22, 2025 00:00:00").getTime();





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


        startTyping();



    },10500);



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



    },30000);



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
   NO BUTTON ESCAPE
========================= */


function escapeNo(){

    const area = document.querySelector(".buttons");

    const x = Math.random()*60 + 20;

    const y = Math.random()*70;


    no.style.left = x + "%";

    no.style.top = y + "%";

    no.style.transform =
    `translateX(-50%) rotate(${Math.random()*40-20}deg)`;

}


no.addEventListener(
"mouseenter",
escapeNo
);



// للموبايل

no.addEventListener(

    "touchstart",

    escapeNo

);









/* =========================
   YES BUTTON
========================= */


yes.addEventListener("click",()=>{



    showPage(finalPage);



    startFinalAnimation();



});









/* =========================
   FINAL ANIMATION
========================= */


function startFinalAnimation(){



    const lines =

    document.querySelectorAll(".finalLine");



    const message =

    document.querySelector(".finalMessage");



    const last =

    document.querySelector(".finalLast");








    setTimeout(()=>{


        lines[0].classList.add("finalShow");



    },1500);







    setTimeout(()=>{


        lines[1].classList.add("finalShow");



    },4500);








    setTimeout(()=>{


        lines[2].classList.add("finalShow");



    },7500);








    setTimeout(()=>{


        message.classList.add("finalShow");



    },10500);







    setTimeout(()=>{


        last.classList.add("finalShow");



    },15000);




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