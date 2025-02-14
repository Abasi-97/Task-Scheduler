let date = new Date();
const currentDate = date;
let year = date.getFullYear();
let month = date.getMonth();
let yearDisplay = document.querySelector('.year');
const monthDisplay = document.querySelector('.month');
let inputField = document.querySelector('input');
let table = document.querySelector('table');
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const weekdays = document.querySelectorAll('th');
const previous = document.querySelector('.previous');
let instruction = document.querySelector('h3');
let dateSelected = false;
let input = document.querySelector('.input');
let removeElements = false;
const next = document.querySelector('.next');
let container = document.querySelector('.countdown');
let clickedDate = 0;
let countDownDisplay = document.querySelector('.count-down');
let addBtnClicked = false;
let taskGeneraor = () =>{
    let display = document.createElement('div');
    let deleteBtn = document.createElement('button');
    let taskContainer = document.createElement('div');
    display.classList = 'task-console';
    container.appendChild(display);
    taskContainer.classList = 'task-container';
    display.appendChild(taskContainer);
    deleteBtn.classList = 'delete-btn';
    deleteBtn.innerHTML = 'Delete';
    display.appendChild(deleteBtn);
}
let numberOfDays = (day1,day2) =>{
    let sumOfDays = 0
    let daysInaYear = 365;
    if(day1.getFullYear()<day2.getFullYear()){//if there is difference between years
        for(let i = day1.getFullYear()+1; i < day2.getFullYear(); i++){
            if(i%4===0){
                daysInaYear = 366;
            }
            sumOfDays += daysInaYear;
        }
        for(let i = day1.getMonth()+1; i < 12; i++){
            sumOfDays += new Date(day1.getFullYear(),i+1,0).getDate();
        }
        for(let i = 0; i < day2.getMonth(); i++){
            sumOfDays += new Date(day2.getFullYear(),i+1,0).getDate();
        }
        return sumOfDays + (new Date(day1.getFullYear(),day1.getMonth()+1,0).getDate() - day1.getDate()) + (day2.getDate() - 1);
    }else if((day1.getMonth()!=day2.getMonth())&&day1.getFullYear()===day2.getFullYear()){
        for(let i = day1.getMonth()+1; i < day2.getMonth(); i++){
            sumOfDays+=new Date(day1.getFullYear(),i+1,0).getDate();
        }
        for(let i = 0; i < day2.getMonth(); i++){
            sumOfDays += new Date(day2.getFullYear(),i+1,0).getDate();
        }
    }else{
        return day2.getDate() - day1.getDate();
    }
    return sumOfDays+(new Date(day1.getFullYear(),day1.getMonth()+1,0).getDate()-(day1.getDate())+1) + ((day2.getDate()-1)+1); 
}
function deleteFunc (){
    const deleteBtn = document.querySelector('.delete-btn');
    deleteBtn.addEventListener('click',(e)=>{
        e.target.parentElement.remove();
        localStorage.clear();
        addBtnClicked = false;
        dateSelected = false;
        location.reload();
        console.log('clicked')
        //add.style.display = 'block';
    });
}
let promiseGetter = (()=>{
    return new Promise((resolve,reject)=>{
        if(localStorage.getItem('timeFrames')){
            resolve(JSON.parse(localStorage.getItem('timeFrames')));
        }else{
            reject("local storage empty")
        }
    }); 
});
const monthDaysGenerator = (month =>{ //function to generate table and dates for each cell
    yearDisplay.innerHTML = year;
    monthDisplay.innerHTML = month;
    let dayNum = 1;
    let rowNum = 6;
    do {
        let row = document.createElement('tr');
        table.appendChild(row);
        for(let i = 0; i < weekdays.length; i++){
            let cell = document.createElement('td');
            row.appendChild(cell);
            date = new Date(`${year}-${month}-${dayNum}`);
            let day = date.getDay();
            if(day === i && dayNum === date.getDate()){
                cell.innerHTML = dayNum;
                dayNum++;
            }else{
                cell.innerHTML = '';
            }
        }
    } while (--rowNum);
    const genCells = document.querySelectorAll('td');
    genCells.forEach(cell=>{
        cell.addEventListener('click',(e)=>{
            if(e.target.innerHTML===''){
                instruction.innerHTML = 'please select a valid date';
            }else if((year === currentDate.getFullYear() && months.indexOf(month) === currentDate.getMonth()) && parseInt(e.target.innerHTML)<currentDate.getDate()){
                instruction.innerHTML = 'Please select a date later than the current date';
            }else if(months.indexOf(month)<currentDate.getMonth()&&year === currentDate.getFullYear()){
                instruction.innerHTML = 'Please make sure month is the same as today\'s month';
            }else if(year<currentDate.getFullYear()){
                instruction.innerHTML = 'Please make sure year is not earlier than today\'s year';
            }else if(dateSelected === true){
                e.target.disabled = true;
            }else{
                e.target.style.backgroundColor = 'red';
                instruction.innerText = 'Add task';
                input.style.display = 'flex';
                cell.style.color = 'white';
                dateSelected = true;
                clickedDate = new Date(`${year}-${month}-${parseInt(e.target.innerHTML)}`);
            }});
        if(parseInt(cell.innerHTML) === currentDate.getDate() && month === months[currentDate.getMonth()] && year === currentDate.getFullYear()){
            cell.style.backgroundColor = 'blue';
            cell.style.color = 'white';
        }
        promiseGetter().then(value =>{
            let parsedDate = new Date (value.destinationDate)
            if((parseInt(cell.innerHTML) === parsedDate.getDate())&&year===parsedDate.getFullYear()&&month===months[parsedDate.getMonth()]){
                cell.style.backgroundColor = 'red';
                cell.style.color = 'white';
                dateSelected = true;
                inputField.style.display = 'none';
                instruction.innerHTML = 'Task added';
            }
            countDownDisplay.innerHTML = parseInt(numberOfDays(currentDate,parsedDate));  
        }).catch(message =>{
            console.log(message)
        });
    })
});
monthDaysGenerator(months[month]);
next.addEventListener('click',()=>{
    month++;
    if(month>months.length-1){
        month = 0;
        year++;
    }
    console.log(month);
    let row = document.querySelectorAll('tr');
    for(let i = 1; i<row.length; i++){
        row[i].remove();
    }
    monthDaysGenerator(months[month]);
});
previous.addEventListener('click',()=>{
    month--;
    if(month < 0){
        month = 11;
        year--;
    }
    let row = document.querySelectorAll('tr');
    for(let i = 1; i<row.length; i++){
        row[i].remove();
    }
    monthDaysGenerator(months[month])
});
promiseGetter().then(value=>{
    taskGeneraor();
    const taskContainer = document.querySelector('.task-container');
    taskContainer.innerHTML = value.savedTask;
    deleteFunc();
}).catch(message=>{
    console.log(message)
});