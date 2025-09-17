document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab-link');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            contents.forEach(content => {
                if (content.id === tabId) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });

    // BMI Calculator
    document.getElementById('bmiForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const height = parseFloat(document.getElementById('bmiHeight').value);
        const weight = parseFloat(document.getElementById('bmiWeight').value);
        const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
        const resultEl = document.getElementById('bmiResult');
        resultEl.innerHTML = `<h3>Your BMI: ${bmi}</h3><canvas id="bmiChart"></canvas>`;
        createBmiChart(bmi);
    });

    // BMR Calculator
    document.getElementById('bmrForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const age = parseInt(document.getElementById('bmrAge').value);
        const gender = document.getElementById('bmrGender').value;
        const height = parseFloat(document.getElementById('bmrHeight').value);
        const weight = parseFloat(document.getElementById('bmrWeight').value);
        let bmr;
        if (gender === 'male') {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }
        const resultEl = document.getElementById('bmrResult');
        resultEl.innerHTML = `<h3>Your BMR: ${bmr.toFixed(2)} calories/day</h3>`;
    });

    // TDEE Calculator
    document.getElementById('tdeeForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const age = parseInt(document.getElementById('tdeeAge').value);
        const gender = document.getElementById('tdeeGender').value;
        const height = parseFloat(document.getElementById('tdeeHeight').value);
        const weight = parseFloat(document.getElementById('tdeeWeight').value);
        const activityLevel = parseFloat(document.getElementById('activityLevel').value);
        let bmr;
        if (gender === 'male') {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }
        const tdee = bmr * activityLevel;
        const resultEl = document.getElementById('tdeeResult');
        resultEl.innerHTML = `<h3>Your TDEE: ${tdee.toFixed(2)} calories/day</h3>`;
    });

    // 1RM Calculator
    document.getElementById('oneRmForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const weight = parseFloat(document.getElementById('oneRmWeight').value);
        const reps = parseInt(document.getElementById('oneRmReps').value);
        const oneRm = weight * (1 + (reps / 30));
        const resultEl = document.getElementById('oneRmResult');
        resultEl.innerHTML = `<h3>Your Estimated 1RM: ${oneRm.toFixed(2)} kg</h3>`;
    });

    function createBmiChart(bmi) {
        const ctx = document.getElementById('bmiChart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Underweight', 'Normal', 'Overweight', 'Obese'],
                datasets: [{
                    data: [18.5, 6.4, 5, 5], // Ranges: <18.5, 18.5-24.9, 25-29.9, >30
                    backgroundColor: ['#3498db', '#2ecc71', '#f1c40f', '#e74c3c'],
                }]
            },
            options: {
                rotation: -90,
                circumference: 180,
                cutout: '70%',
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                }
            }
        });
    }
});
