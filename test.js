const monthDisplay = document.querySelector('.month');
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const weeks = ['Sun','mon','tue','wed','thu','fri','sat'];
for(i = 0; i < months.length; i++){
    
    weeks.forEach(week=>process.stdout.write(`${week}\t`));
    console.log('\n');
    let rowCount = 1;
    let dayNum = 1
    for(let k = 0; k < weeks.length; k++){
        let date = new Date(`2024-${months[i]}-${dayNum}`);
        let day = date.getDay();
        if(day === k){
            process.stdout.write(`${dayNum}\t`);
            dayNum++;
        }else{
            process.stdout.write(`${''}\t`);

        }
        if(months[i] === 'February' && (date.getFullYear(date)/4 && (dayNum > 28) || dayNum>29)){
            dayNum = '';
        }
        if(isThirtyOneDays(months[i]) && dayNum>31){
            dayNum = '';
        }
        if(isThirtyDays(months[i]) && dayNum>30){
            dayNum = '';
        }
    }
    console.log('\n');
    rowCount++;
}
    
