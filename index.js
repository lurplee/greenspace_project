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
document.getElementById('submit-btn').addEventListener('click', function () {
    const ratings = {
        accessibility: Number(document.querySelector('input[name="rating_accessibility"]:checked')?.value),
        social_equity: Number(document.querySelector('input[name="rating_social_equity"]:checked')?.value),
        connection_to_nature: Number(document.querySelector('input[name="rating_connection_to_nature"]:checked')?.value),
        community_consideration: Number(document.querySelector('input[name="rating_community_consideration"]:checked')?.value),
        park_features: Number(document.querySelector('input[name="rating_park_features"]:checked')?.value),
    };

    if (Object.values(ratings).some(v => !v)) {
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

    localStorage.setItem('finalScore', weightedAvg.toFixed(2));
    window.location.href = 'results.html';
});