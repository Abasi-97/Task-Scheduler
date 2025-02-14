let start = document.querySelector('.start');
let circle = document.querySelector('.circle');
start.addEventListener('click',()=>{
    localStorage.setItem('countDays', JSON.stringify(true));
});
if(JSON.parse(localStorage.getItem('countDays'))){
    promiseGetter().then(value =>{
        let deg = 360 - (360/(value.totalNumberOfDays - parseInt(countDownDisplay.innerHTML)));
        console.log(deg);
        circle.style.background = `conic-gradient(yellow ${deg}deg, transparent 0deg)`;
    })
}