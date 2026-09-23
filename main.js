const inBlocksPerSecond = document.querySelector('#in-blocks-per-second');

inBlocksPerSecond.addEventListener('input', (e) => {
    const outBlocksPerSecond = document.querySelector('.out-blocks-per-second');
    outBlocksPerSecond.value = inBlocksPerSecond.value;

    updateCropFeverList();

});

const calcRollsUntilTrigger = (percentage) => 1 / (percentage / 100);

const calcTimeUntilTrigger = (rollsPerSecond, rollsUntilTrigger) => rollsUntilTrigger / rollsPerSecond;

const convertSecondsToMinutes = (timeInSeconds) => {
    let minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    if (minutes >= 60) {
        const hours = convertMinutesToHours(minutes);
        minutes = minutes % 60;

        return `${formatSingleDigit(hours)}:${formatSingleDigit(minutes)}:${formatSingleDigit(seconds)}`
    }

    return `${formatSingleDigit(minutes)}:${formatSingleDigit(seconds)}`;
}

const convertMinutesToHours = (timeInMinutes) => {
    const hours = Math.floor(timeInMinutes / 60);
    return hours;
}

const formatSingleDigit = (digit) => (digit < 10) ? '0' + digit : digit;

const updateCropFeverList = () => {
    const list = document.querySelectorAll('.crop-fever-list>li')
    const inValueBlocksPerSecond = inBlocksPerSecond.value;

    list.forEach((element, index) => {
        const enchantmentLevel = element.querySelector('.enchantment-level');
        const timeToProc = element.querySelector('.time-to-proc');

        const cropFeverPercentage = Number(`0.00${index + 1}`);
        const rollsUntilTrigger = calcRollsUntilTrigger(cropFeverPercentage);
        const secondsToProc = calcTimeUntilTrigger(inValueBlocksPerSecond, rollsUntilTrigger);

        enchantmentLevel.textContent = index + 1;
        timeToProc.textContent = convertSecondsToMinutes(secondsToProc);

    })
}

inBlocksPerSecond.dispatchEvent(new Event('input'))