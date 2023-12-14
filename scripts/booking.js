document.addEventListener('DOMContentLoaded', function () {
    let dailyRate = 35; // default daily rate
    let numberOfDaysSelected = 0; // initialize the number of days selected
    let totalCost = 0; // initialize the total cost
    let clickedDays = []; // an array to store clicked days

    /********* function to initialize variables when the page is loaded *********/
    function initializeVariables() {
        numberOfDaysSelected = 0;
        totalCost = 0;
        clickedDays = [];
        updateCost(); // update the cost display
    }

    /********* function to update the total cost based on the number of days and rate *********/
    function updateCost() {
        if(numberOfDaysSelected > 0)
        {
            totalCost = dailyRate * numberOfDaysSelected;
            console.log(totalCost)
        }
        else
        {
            totalCost = 0;
            console.log("it went to else", totalCost)
            document.getElementById('calculated-cost').innerHTML = 0
        }
        console.log(numberOfDaysSelected)
        console.log(totalCost)
        console.log(numberOfDaysSelected)
        document.getElementById('calculated-cost').innerHTML = totalCost
        
    }

    function handleDayClick(dayElement) {
        const dayId = dayElement.id;
        const dayOfWeek = getDayOfWeek(dayId); // Assuming you have a function to get the day of the week from the dayId
    
        // Check if the day is a valid day of the week
        const validDaysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        if (!dayElement.classList.contains('clicked') && validDaysOfWeek.includes(dayOfWeek)) { // i put this validation because when clear is clicked the numberof day selecter returns 1 reference geeksforgeeks
            dayElement.classList.add('clicked');
            numberOfDaysSelected += 1;
            clickedDays.push(dayId); // store the ID of the clicked day https://www.geeksforgeeks.org/javascript-array-push-method/
        }
    
        updateCost();
    }
    //https://www.geeksforgeeks.org/javascript-string-methods/
    function getDayOfWeek(dayId) {
        const parts = dayId.split('-');
        if (parts.length > 1) {
            return parts[1].toLowerCase();
        }
        return dayId.toLowerCase();
    }

    function clearDays() {
        const clickedDays = document.querySelectorAll('.blue-hover.clicked');
        clickedDays.forEach(day => {
            if (!day.classList.contains('small-button')) { // Exclude full/half buttons
                day.classList.remove('clicked');
            }
        });
        numberOfDaysSelected = 0;
        updateCost();
    }
    function setHalfDayRate() {
        dailyRate = 20;
        document.getElementById('half').classList.add('clicked'); 
        document.getElementById('full').classList.remove('clicked');
        updateCost();
    }
    function setFullDayRate() {
        dailyRate = 35;
        document.getElementById('full').classList.add('clicked');
        document.getElementById('half').classList.remove('clicked');
        updateCost();
    }
    const clearButton = document.getElementById('clear-button');
    if (clearButton) {  
        clearButton.addEventListener('click', clearDays);
    }
    const fullDayButton = document.getElementById('full');
    if (fullDayButton) {
        fullDayButton.addEventListener('click', setFullDayRate);
    }
    const halfDayButton = document.getElementById('half');
    if (halfDayButton) {
        halfDayButton.addEventListener('click', setHalfDayRate);
    }
    const dayElements = document.querySelectorAll('.blue-hover');
    dayElements.forEach(day => {
        day.addEventListener('click', function () {
            handleDayClick(day);
        });
    });
    initializeVariables();
});
