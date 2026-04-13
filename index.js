// Animation code sourced from https://bootstrapexamples.com/@mason/interactive-star-rating
document.querySelectorAll('.star-rating:not(.readonly) label').forEach(star => {
    star.addEventListener('click', function () {
        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// Submit and calculate score - Created w/ help of ClaudeAI
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('submit-btn').addEventListener('click', function (e) {
            e.preventDefault();
        const parkName = document.getElementById('park-name').value.trim();

    if (!parkName) {
        alert('Please enter the name of the greenspace.');
        return;
    }

    const getRating = (name) => {
        const el = document.querySelector(`input[name="${name}"]:checked`);
        return el ? Number(el.value) : null;
    };

    const ratings = {
        accessibility: getRating("rating_accessibility"),
        social_equity: getRating("rating_social_equity"),
        connection_to_nature: getRating("rating_connection_to_nature"),
        community_consideration: getRating("rating_community_consideration"),
        park_features: getRating("rating_park_features"),
    };
    

    if (Object.values(ratings).some(v => v === null)) {
        alert('Please rate all categories before submitting.');
        return;
    }
    const weights = {
        accessibility: 0.250,
        social_equity: 0.252,
        connection_to_nature: 0.175,
        community_consideration: 0.163,
        park_features: 0.159,
    };

    const weightedAvg = Object.keys(ratings).reduce((sum, key) => {
        return sum + ratings[key] * weights[key];
    }, 0);

    localStorage.setItem('ratings', JSON.stringify(ratings));

    localStorage.setItem('parkName', parkName);
    localStorage.setItem('finalScore', weightedAvg.toFixed(2));
    window.location.href = 'results.html';
});
});