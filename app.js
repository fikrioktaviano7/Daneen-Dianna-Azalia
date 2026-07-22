/* ======================================================
   HAPPY BIRTHDAY LANDING PAGE
   PART 3.1A
   Loader • Smooth Scroll • Music • Back To Top
   Scroll Animation
====================================================== */

"use strict";

/* ======================================================
   SELECTOR
====================================================== */

const loader = document.getElementById("loader");

const music = document.getElementById("birthdayMusic");

const musicButton = document.getElementById("musicButton");

const celebrateBtn = document.getElementById("celebrateBtn");

const galleryBtn = document.getElementById("galleryBtn");

const backTop = document.getElementById("backToTop");

/* ======================================================
   LOADER
====================================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.visibility = "hidden";

    }, 1800);

});

/* ======================================================
   SMOOTH SCROLL
====================================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        }

    });

});

/* ======================================================
   GALLERY BUTTON
====================================================== */

if(galleryBtn){

    galleryBtn.addEventListener("click",()=>{

        const gallery = document.getElementById("gallery");

        if(gallery){

            gallery.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

}

/* ======================================================
   MUSIC
====================================================== */

let playing = false;

function playMusic(){

    if(!music) return;

    music.play();

    playing = true;

    musicButton.innerHTML="🔊";

}

function pauseMusic(){

    if(!music) return;

    music.pause();

    playing = false;

    musicButton.innerHTML="🔈";

}

if(musicButton){

    musicButton.addEventListener("click",()=>{

        if(playing){

            pauseMusic();

        }else{

            playMusic();

        }

    });

}

if(celebrateBtn){

    celebrateBtn.addEventListener("click",()=>{

        playMusic();

    });

}

/* ======================================================
   BACK TO TOP
====================================================== */

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        backTop.style.display="block";

    }else{

        backTop.style.display="none";

    }

});

backTop.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/* ======================================================
   FADE ANIMATION
====================================================== */

const fadeElements = document.querySelectorAll(

".story,.gallery,.timeline,.wishes,.countdown,.video-section"

);

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("animate-fade");

}

});

},{

threshold:.2

});

fadeElements.forEach(el=>{

observer.observe(el);

});

/* ======================================================
   HERO PARALLAX
====================================================== */

const hero = document.querySelector(".hero");

window.addEventListener("mousemove",(e)=>{

if(!hero) return;

const x=(window.innerWidth/2-e.clientX)/60;

const y=(window.innerHeight/2-e.clientY)/60;

hero.style.backgroundPosition=`${x}px ${y}px`;

});

/* ======================================================
   FLOATING BUTTON EFFECT
====================================================== */

setInterval(()=>{

if(musicButton){

musicButton.classList.toggle("animate-pulse");

}

},2000);

/* ======================================================
   SECTION ACTIVE NAV
====================================================== */

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll("nav a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-120;

const height=section.offsetHeight;

if(scrollY>=top){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

/* ======================================================
   END PART 3.1A
====================================================== */

/* ======================================================
   HAPPY BIRTHDAY LANDING PAGE
   PART 3.1B
   Countdown • Gallery • Confetti • Celebrate Effect
====================================================== */

/* ======================================================
   COUNTDOWN
====================================================== */

// Ubah tanggal sesuai ulang tahun
const birthdayDate = new Date("July 18, 2027 00:00:00").getTime();

const dayBox = document.getElementById("days");
const hourBox = document.getElementById("hours");
const minuteBox = document.getElementById("minutes");
const secondBox = document.getElementById("seconds");

function updateCountdown(){

    const now = new Date().getTime();

    const distance = birthdayDate - now;

    if(distance <= 0){

        dayBox.innerHTML = "00";
        hourBox.innerHTML = "00";
        minuteBox.innerHTML = "00";
        secondBox.innerHTML = "00";

        return;
    }

    const days = Math.floor(distance/(1000*60*60*24));

    const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));

    const minutes = Math.floor((distance%(1000*60*60))/(1000*60));

    const seconds = Math.floor((distance%(1000*60))/1000);

    dayBox.innerHTML = String(days).padStart(2,"0");
    hourBox.innerHTML = String(hours).padStart(2,"0");
    minuteBox.innerHTML = String(minutes).padStart(2,"0");
    secondBox.innerHTML = String(seconds).padStart(2,"0");

}

updateCountdown();

setInterval(updateCountdown,1000);

/* ======================================================
   PHOTO LIGHTBOX
====================================================== */

const modal = document.getElementById("photoModal");

const modalImage = document.getElementById("modalImage");

const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".gallery-item img").forEach(image=>{

    image.addEventListener("click",()=>{

        modal.style.display="flex";

        modalImage.src=image.src;

    });

});

if(closeModal){

    closeModal.onclick=()=>{

        modal.style.display="none";

    }

}

window.onclick=function(e){

    if(e.target===modal){

        modal.style.display="none";

    }

}

/* ======================================================
   CONFETTI
====================================================== */

const canvas=document.getElementById("confettiCanvas");

const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;

canvas.height=window.innerHeight;

let confetti=[];

function random(min,max){

    return Math.random()*(max-min)+min;

}

function createConfetti(){

    for(let i=0;i<250;i++){

        confetti.push({

            x:canvas.width/2,

            y:canvas.height/2,

            size:random(4,10),

            speedX:random(-8,8),

            speedY:random(-15,-6),

            gravity:.18,

            rotate:random(0,360),

            color:`hsl(${random(0,360)},100%,55%)`

        });

    }

}

function drawConfetti(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    confetti.forEach((piece,index)=>{

        piece.x+=piece.speedX;

        piece.y+=piece.speedY;

        piece.speedY+=piece.gravity;

        piece.rotate+=5;

        ctx.save();

        ctx.translate(piece.x,piece.y);

        ctx.rotate(piece.rotate*Math.PI/180);

        ctx.fillStyle=piece.color;

        ctx.fillRect(
            -piece.size/2,
            -piece.size/2,
            piece.size,
            piece.size
        );

        ctx.restore();

        if(piece.y>canvas.height+50){

            confetti.splice(index,1);

        }

    });

    requestAnimationFrame(drawConfetti);

}

drawConfetti();

/* ======================================================
   CELEBRATE BUTTON
====================================================== */

if(celebrateBtn){

    celebrateBtn.addEventListener("click",()=>{

        createConfetti();

        celebrateBtn.classList.add("animate-pulse");

        celebrateBtn.innerHTML="🎉 Happy Birthday 🎉";

        setTimeout(()=>{

            celebrateBtn.innerHTML="🎂 Celebrate Now";

        },2500);

    });

}

/* ======================================================
   WINDOW RESIZE
====================================================== */

window.addEventListener("resize",()=>{

    canvas.width=window.innerWidth;

    canvas.height=window.innerHeight;

});

/* ======================================================
   RANDOM FLOATING EMOJI
====================================================== */

function floatingEmoji(){

    const emoji=document.createElement("div");

    emoji.innerHTML=["🎈","🎉","🎂","🎁","✨","❤️"][Math.floor(Math.random()*6)];

    emoji.style.position="fixed";

    emoji.style.left=Math.random()*100+"vw";

    emoji.style.bottom="-50px";

    emoji.style.fontSize=random(20,40)+"px";

    emoji.style.pointerEvents="none";

    emoji.style.zIndex="999";

    emoji.style.transition="all 8s linear";

    document.body.appendChild(emoji);

    setTimeout(()=>{

        emoji.style.transform="translateY(-120vh)";

        emoji.style.opacity="0";

    },100);

    setTimeout(()=>{

        emoji.remove();

    },8000);

}

setInterval(floatingEmoji,2500);

/* ======================================================
   END PART 3.1B
====================================================== */

/* ======================================================
   HAPPY BIRTHDAY LANDING PAGE
   PART 3.1C-1
   Scroll Progress • Mouse Glow • Balloon Generator
====================================================== */

/* ======================================================
   SCROLL PROGRESS BAR
====================================================== */

const progressBar = document.createElement("div");

progressBar.id = "scrollProgress";

progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "5px";
progressBar.style.width = "0%";
progressBar.style.background = "linear-gradient(90deg,#2196F3,#42A5F5,#FFD54F)";
progressBar.style.zIndex = "99999";
progressBar.style.transition = "width .15s linear";

document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {

    const scrollTop =
        document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const percent = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = percent + "%";

});

/* ======================================================
   MOUSE GLOW EFFECT
====================================================== */

const glow = document.createElement("div");

glow.id = "mouseGlow";

glow.style.position = "fixed";
glow.style.width = "180px";
glow.style.height = "180px";
glow.style.borderRadius = "50%";
glow.style.pointerEvents = "none";
glow.style.background =
"radial-gradient(circle, rgba(255,255,255,.45), transparent 70%)";
glow.style.zIndex = "0";
glow.style.transform = "translate(-50%,-50%)";
glow.style.transition = "left .08s linear, top .08s linear";

document.body.appendChild(glow);

window.addEventListener("mousemove", e => {

    glow.style.left = e.clientX + "px";

    glow.style.top = e.clientY + "px";

});

/* ======================================================
   BALLOON GENERATOR
====================================================== */

function createBalloon(){

    const balloon = document.createElement("div");

    balloon.innerHTML = "🎈";

    balloon.style.position = "fixed";

    balloon.style.left = Math.random()*100 + "vw";

    balloon.style.bottom = "-80px";

    balloon.style.fontSize =
        (30 + Math.random()*30) + "px";

    balloon.style.pointerEvents = "none";

    balloon.style.zIndex = "5";

    balloon.style.transition =
        "transform 14s linear, opacity 14s linear";

    document.body.appendChild(balloon);

    requestAnimationFrame(()=>{

        balloon.style.transform =
            "translateY(-130vh) rotate(" +
            (Math.random()*360) +
            "deg)";

        balloon.style.opacity = "0";

    });

    setTimeout(()=>{

        balloon.remove();

    },14000);

}

setInterval(createBalloon,3500);

/* ======================================================
   RANDOM STAR BLINK
====================================================== */

document.querySelectorAll(".star").forEach(star=>{

    setInterval(()=>{

        star.style.opacity =
            Math.random();

        star.style.transform =
            "scale(" + (0.8 + Math.random()) + ")";

    },1000 + Math.random()*1500);

});

/* ======================================================
   HAPPY BIRTHDAY LANDING PAGE
   PART 3.1C-2
   Auto Music • Lazy Image • Hero Effect
   Cloud Animation • Performance
====================================================== */

/* ======================================================
   FIRST USER INTERACTION
====================================================== */

let firstInteraction = false;

function firstPlay() {

    if (firstInteraction) return;

    firstInteraction = true;

    if (music) {

        music.play().then(() => {

            playing = true;

            if (musicButton) {

                musicButton.innerHTML = "🔊";

            }

        }).catch(() => {

            // Browser menolak autoplay

        });

    }

}

["click","touchstart","keydown"].forEach(event => {

    window.addEventListener(

        event,

        firstPlay,

        {

            once:true

        }

    );

});

/* ======================================================
   LAZY IMAGE
====================================================== */

const lazyImages = document.querySelectorAll("img");

const lazyObserver = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("animate-fade");

            lazyObserver.unobserve(entry.target);

        }

    });

},{

    threshold:.15

});

lazyImages.forEach(image=>{

    lazyObserver.observe(image);

});

/* ======================================================
   HERO PARALLAX IMAGE
====================================================== */

const heroPhoto = document.querySelector(".photo-frame");

window.addEventListener("scroll",()=>{

    if(!heroPhoto) return;

    const offset = window.scrollY * .08;

    heroPhoto.style.transform =
        `translateY(${offset}px)`;

});

/* ======================================================
   FLOATING CLOUD
====================================================== */

function generateCloud(){

    const cloud = document.createElement("div");

    cloud.innerHTML = "☁️";

    cloud.style.position = "fixed";

    cloud.style.left = "-100px";

    cloud.style.top =

        Math.random()*window.innerHeight+"px";

    cloud.style.fontSize =

        (35+Math.random()*30)+"px";

    cloud.style.opacity=".25";

    cloud.style.pointerEvents="none";

    cloud.style.zIndex="1";

    cloud.style.transition="transform 45s linear";

    document.body.appendChild(cloud);

    requestAnimationFrame(()=>{

        cloud.style.transform=

            "translateX("+

            (window.innerWidth+250)

            +"px)";

    });

    setTimeout(()=>{

        cloud.remove();

    },45000);

}

setInterval(generateCloud,12000);

/* ======================================================
   WINDOW BLUR / FOCUS
====================================================== */

window.addEventListener("blur",()=>{

    if(music && !music.paused){

        music.volume=.2;

    }

});

window.addEventListener("focus",()=>{

    if(music && !music.paused){

        music.volume=1;

    }

});

/* ======================================================
   PERFORMANCE
====================================================== */

let resizeTimer;

window.addEventListener("resize",()=>{

    clearTimeout(resizeTimer);

    resizeTimer=setTimeout(()=>{

        if(canvas){

            canvas.width=window.innerWidth;

            canvas.height=window.innerHeight;

        }

    },200);

});

/* ======================================================
   HERO BUTTON RIPPLE
====================================================== */

document.querySelectorAll("button").forEach(button=>{

    button.addEventListener("click",function(e){

        const ripple=document.createElement("span");

        ripple.className="ripple";

        const rect=this.getBoundingClientRect();

        ripple.style.left=(e.clientX-rect.left)+"px";

        ripple.style.top=(e.clientY-rect.top)+"px";

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },700);

    });

});

/* ======================================================
   WELCOME MESSAGE
====================================================== */

setTimeout(()=>{

    console.log(
        "%c🎉 Happy Birthday Daneen Dianna Azalia 🎂",
        "font-size:18px;color:#2196F3;font-weight:bold;"
    );

},1000);

/* ======================================================
   FINISH INITIALIZATION
====================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    updateCountdown();

    if(backTop){

        backTop.style.display="none";

    }

    console.log("Birthday Landing Page Ready.");

});

/* ======================================================
   END PART 3.1C-2
====================================================== */