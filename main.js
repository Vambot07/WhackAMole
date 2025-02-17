const cursor = document.querySelector('.cursor')
const holes = [...document.querySelectorAll('.hole')]
const scoreEl = document.querySelector('.score span')
const btnStart = document.querySelector('.btn-start')
const btnPause = document.querySelector('.btn-pause')

let score = 0;
let isRunning = false;
let isPaused = false;
let timer = null;
let moleImg = null;

const sound = new Audio("assets/smash.mp3")
const sound2 = new Audio("assets/click_button.mp3")

btnStart.addEventListener('click',()=>{
    
    

    if(!isRunning){
       sound2.play();
       btnStart.textContent = "Stop";
       btnPause.style.display = 'flex';
       isRunning = true;
       run();
    }
    else{
        sound2.play();
        btnStart.textContent = "Start";
        isRunning = false;
        btnPause.style.display = "none";
        scoreEl.innerHTML = "00";
        score = 0;
        isPaused = false;
        stop();
        
    }

});


btnPause.addEventListener("click", ()=>{

    if(!isPaused){
        sound2.play();
        btnPause.textContent = "Resume";
        isPaused = true;
        stop();
    }
    else{
        sound2.play();
        btnPause.textContent = "Pause";
        isPaused = false;
        run();
    }

})

function stop(){
    clearTimeout(timer);
    if(moleImg && moleImg.parentElement){
        moleImg.parentElement.removeChild(moleImg);
    }
}




function run(){

    if (!isRunning || isPaused) return;

    const i = Math.floor(Math.random() * holes.length);
    const hole = holes[i];

    const img = document.createElement('img');
    img.classList.add('mole')
    img.src = "assets/mole.png";
    moleImg = img;

    hole.appendChild(img);

    timer = setTimeout(() =>{
        if(hole.contains(img)) hole.removeChild(img);
        if(isRunning) run();
    },1500);


    img.addEventListener('click', () =>{
    
        score += 10;
        scoreEl.textContent = score;
        sound.play();
        img.src = "assets/mole-whacked.png"
        img.style.pointerEvents = "none";
        clearTimeout(timer);
        timer = setTimeout(() =>{
            if(hole.contains(img)) hole.removeChild(img);
            if(isRunning) run();
        },500);

    });
    

}





window.addEventListener('mousemove', (e) =>{
    cursor.style.top = e.pageY + 'px',
    cursor.style.left = e.pageX + 'px'
})

window.addEventListener('mousedown', () =>{
    cursor.classList.add('active')
})

window.addEventListener('mouseup', () =>{
    cursor.classList.remove('active')
})


