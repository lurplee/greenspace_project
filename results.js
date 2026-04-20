const parkName = localStorage.getItem('parkName');
const score = Number(localStorage.getItem('finalScore'));

document.getElementById('final-score').textContent = score.toFixed(2);

// Score label + badge
let label = '';
if (score >= 4.5) label = 'Exceptional';
else if (score >= 3.5) label = 'Good';
else if (score >= 2.5) label = 'Fair';
else if (score >= 1.5) label = 'Below Average';
else label = 'Poor';

document.getElementById('score-badge').textContent = label;

// Progress bar fill
const percent = (score / 5) * 100;
document.getElementById('progress-fill').style.width = percent + "%";

// Breakdown (you need to STORE ratings first — see next section)
const breakdownData = JSON.parse(localStorage.getItem('ratings'));

const weights = { 
    accessibility: 0.25,
    social_equity: 0.252,
    connection_to_nature: 0.175,
    community_consideration: 0.163,
    park_features: 0.159,
};

const labels = {
    accessibility: "Accessibility",
    social_equity: "Social Equity",
    connection_to_nature: "Connection to Nature",
    community_consideration: "Community Consideration",
    park_features: "Park Features & Amenities",
};

const container = document.getElementById('breakdown');

Object.keys(breakdownData).forEach(key => {
    const rating = breakdownData[key];
    const weighted = (rating * weights[key]).toFixed(3);
    const percent = (rating / 5) * 100;

    const row = document.createElement('div');
    row.className = 'row';

    row.innerHTML = `
        <div class="row-header">
            <span>${labels[key]}</span>
            <span>${rating}/5 × ${(weights[key] * 100).toFixed(1)}% = ${weighted}</span>
        </div>
        <div class="bar">
            <div class="bar-fill" style="width:${percent}%"></div>
        </div>
    `;

    container.appendChild(row);
});