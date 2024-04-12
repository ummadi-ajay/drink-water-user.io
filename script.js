let totalLiters = 2;
let consumedLiters = 0;
const cupSize = 0.25; // 250ml

function updateDisplay() {
    const remainingLiters = (totalLiters - consumedLiters).toFixed(2);
    document.getElementById('liters').innerText = `${remainingLiters}L`;

    const remainedCircle = document.querySelector('.remained');
  
    const fillPercentage = (consumedLiters / totalLiters) * 100;
    remainedCircle.style.backgroundImage = `conic-gradient(#28a745 ${fillPercentage}%, #fff ${fillPercentage}% 100%)`;

    const cupsToFill = Math.ceil(totalLiters / cupSize);
    const cupsContainer = document.getElementById('cupsContainer');
    cupsContainer.innerHTML = ''; // Clear existing cups
    for (let i = cupsToFill - 1; i >= 0; i--) {
        const cup = document.createElement('div');
        cup.className = 'cup cup-small';
        cup.innerText = `${cupSize * 1000} ml`; // Convert liters to milliliters
        if (i >= Math.ceil(remainingLiters / cupSize)) {
            cup.classList.add('disabled');
        } else {
            cup.classList.remove('disabled');
        }
        cup.addEventListener('click', addWater);
        cupsContainer.appendChild(cup);
    }

    if (consumedLiters >= totalLiters) {
        remainedCircle.classList.add('cup-filled');
        document.getElementById('message').innerText = 'You have completed your water goal!';
        document.querySelectorAll('.cup-small').forEach(cup => {
            cup.classList.add('disabled');
        });
        document.getElementById('message').style.display = 'block';
    } else {
        remainedCircle.classList.remove('cup-filled');
        document.getElementById('message').style.display = 'none';
    }
}

function addWater(event) {
    if (!event.target.classList.contains('disabled')) {
        consumedLiters += cupSize;
        
        event.target.style.backgroundColor = '#28a745';
        event.target.style.color = '#fff';
        
        updateDisplay();
    }
}

document.getElementById('setGoal').addEventListener('click', function() {
    const newGoal = parseFloat(document.getElementById('goalInput').value);
    if (newGoal > 0) {
        totalLiters = newGoal;
        consumedLiters = 0;
        document.getElementById('goal').innerText = newGoal;
        updateDisplay();
    } else {
        alert('Please enter a valid goal!');
    }
});

updateDisplay();


















