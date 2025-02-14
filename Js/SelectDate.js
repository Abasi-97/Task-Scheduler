let add = document.querySelector('.add');
let cells = document.querySelectorAll('td');
add.addEventListener('click',(e)=>{
    addBtnClicked = true;
    e.target.style.display = 'none';
    console.log(addBtnClicked)
    console.log(inputField.value);
    taskGeneraor();
    const taskContainer = document.querySelector('.task-container');
    taskContainer.innerHTML = inputField.value;
    deleteFunc();
    countDownDisplay.innerHTML = parseInt(numberOfDays(currentDate,clickedDate));
    let timeStamp = {
        totalNumberOfDays: parseInt(countDownDisplay.innerHTML),
        destinationDate: clickedDate,
        savedTask: inputField.value
    }
    instruction.innerHTML = 'Task selected'
    console.log(typeof(timeStamp.destinationDate))
    localStorage.setItem('timeFrames', JSON.stringify(timeStamp));
    inputField.style.display = 'none';
});