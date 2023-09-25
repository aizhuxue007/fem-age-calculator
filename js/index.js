// Desired outcome: user inputs their birth date -> press submit -> calculate today - birthday = age -> out age to DOM

const dayInput = document.getElementById('day')
const monthInput = document.getElementById('month')
const yearInput = document.getElementById('year')

// add click listener to button that calls handleSubmit
document.getElementById('btn').addEventListener('click', (e) => handleSubmit(e))

// handleSubmit()
    // get values from day, month and year inputs
    // validatedInputs()
    // render(getAge(inputs...))
function handleSubmit(e) {
    e.preventDefault();
    console.log('in here')
    let day = dayInput.value;
    let month = monthInput.value;
    let year = yearInput.value;
    let validated = true; // validateInputs()
    if (validated) {
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


