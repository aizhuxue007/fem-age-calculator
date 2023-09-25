// Desired outcome: user inputs their birth date -> press submit -> calculate today - birthday = age -> out age to DOM

const inputs = document.querySelectorAll('input')
const dayInput = document.getElementById('day')
const monthInput = document.getElementById('month')
const yearInput = document.getElementById('year')
const errorDayOutput = document.getElementById('input-error-day');
const errorMonthOutput = document.getElementById('input-error-month');
const errorYearOutput = document.getElementById('input-error-year');


// add click listener to button that calls handleSubmit
document.getElementById('btn').addEventListener('click', (e) => handleSubmit(e))

// handleSubmit()
    // get values from day, month and year inputs
    // validatedInputs()
    // render(getAge(inputs...))
function handleSubmit(e) {
    e.preventDefault();
    removeInputWarnings();
    let validated = validatedInputs()

    if (validated) {
        let day = dayInput.value;
        let month = monthInput.value;
        let year = yearInput.value;
        render(calculateAge(day, month, year))
    }
}

// getAge(day, month, year) 
    // today - (day, month, year) or time elapsed = age
    // return {days, months, years}
function calculateAge(day, month, year) {
    const dateStr = `${year}-${month}-${day}`;
    let today = new Date();
    let birthDay = new Date(dateStr);
    let daysDifference = (today.getTime() - birthDay.getTime())
    const aDayInMilliseconds = 1000 * 60 * 60 * 24;
    let totalDaysElapsed = daysDifference / aDayInMilliseconds;
    let yearInDays = 365;
    let agedYear = Math.floor(totalDaysElapsed / yearInDays)
    let agedMonth = Math.floor((totalDaysElapsed % yearInDays) / 30)
    let agedDay = Math.floor((totalDaysElapsed % yearInDays) % 30)
    return [agedYear, agedMonth, agedDay]
}

// validateInputs()
// Receive validation errors if:
//   - Any field is empty when the form is submitted
//   - The day number is not between 1-31
//   - The month number is not between 1-12
//   - The date is in the future
//   - The date is invalid e.g. 31/04/1991 (there are 30 days in April)

function warnEffect() {
    warnInput()
    warnOutput()
    warnLabel()
}

function warnInput() {
    let inpuTs = document.querySelectorAll('input')
    for (let i = 0; i < inpuTs.length; i++) {
        inpuTs[i].classList.add('input--warn-border')
    }
    
}

function warnOutput() {
    let outpuTs = document.querySelectorAll('.input > p')
    for (let i = 0; i < outpuTs.length; i++) {
        outpuTs[i].classList.add('input--warn-txt')
    } 
}

function warnLabel() {
    let labels = document.querySelectorAll('label')
    for (let i = 0; i < labels.length; i++) {
        labels[i].classList.add('input--warn-txt')
    }  
}

function removeInputWarnings() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove('input--warn')
    }
}

function renderEmptyFields() {
    let error = "This field is required"
    errorDayOutput.innerText = error;
    errorMonthOutput.innerText = error;
    errorYearOutput.innerText = error;
    warnEffect()
}

function renderDayOutOfBounds() {
    errorDayOutput.innerText = 'Day out of bounds.'
    warnEffect()
}

function renderMonthOutOfBounds() {
    errorMonthOutput.innerText = 'Month out of bounds.'
    warnEffect()
}

function renderInTheFuture() {
    errorYearOutput.innerText = 'Please enter present or past year.'
    warnEffect()
}

function renderError(txt) {
    const mainError = document.querySelector('.main-error-display')
    mainError.innerText = txt;
}

function checkDateError(date) {
    if ( Object.prototype.toString.call(date) === "[object Date]" ) {
        if ( !isNaN(date.getTime()) ) {
         renderError('Date is valid.');
         return false;
           // date is valid
        } else {
           renderError('Date is not valid.')
           return true;
        }
     } else {
        renderError('Date is not valid.')
        return true;
     }
}

function validatedInputs() {
    let day = parseInt(dayInput.value);
    let month = parseInt(monthInput.value);
    let year = parseInt(yearInput.value);
    let today = new Date()
    let date = `${year}-${month}-${day}`;
       
    if ((!day) || (!month) || (!year) ) {
        renderEmptyFields()
        return false;
    }
    if (!(day > 0 && day <= 31)) {
        renderDayOutOfBounds()
        return false;
    }
    if (!(month > 0 && month <= 12)) {
        renderMonthOutOfBounds()
        return false;
    }
    if (year > today.getFullYear()) {
        renderInTheFuture()
        return false;
    }
    if (checkDateError(date)) {
        return false
    }
    return true;
}

// render() 
    // outputYears = querySelector(.output-quantity)[0]
    // outputMonths = querySelector(.output-quantity)[1]
    // outputDayss = querySelector(.output-quantity)[2]
    // outputYears.innerText = years;
    // outputMonths.innerText = months;
    // outputDays.innerText = days;
function render(aged) {
    document.querySelectorAll('.output-quantity')[0].innerText = aged[0]
    document.querySelectorAll('.output-quantity')[1].innerText = aged[1]
    document.querySelectorAll('.output-quantity')[2].innerText = aged[2]
}


