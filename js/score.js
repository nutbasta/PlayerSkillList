/**
 * Numbers of decimal digits to round to
 */
const scale = 1;

/**
 * Total number of levels on the list (Rank 500 will give 1 point)
 */
const maxRank = 500;

/**
 * Calculate the score awarded when having a certain percentage on a list level
 * @param {Number} rank Position on the list
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @returns {Number}
 */
export function score(rank, percent, minPercent) {
    if (rank > maxRank) {
        return 0;
    }
    
    // Optional: If you still want to restrict non-100% completions past a certain rank,
    // you can adjust this threshold (e.g., rank > 75 or rank > 200) or remove it entirely.
    if (rank > 75 && percent < 100) {
        return 0;
    }

    // Calculate the decay exponent dynamically so that:
    // Rank 1 = 200 points, and Rank maxRank = 1 point
    const b = Math.log(200) / Math.log(maxRank);
    let baseScore = 200 * Math.pow(rank, -b);

    // Apply percentage scaling relative to minPercent
    let score = baseScore * ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));

    score = Math.max(0, score);

    if (percent != 100) {
        return round(score - score / 3);
    }

    return Math.max(round(score), 0);
}

export function round(num) {
    if (!('' + num).includes('e')) {
        return +(Math.round(num + 'e+' + scale) + 'e-' + scale);
    } else {
        var arr = ('' + num).split('e');
        var sig = '';
        if (+arr[1] + scale > 0) {
            sig = '+';
        }
        return +(
            Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) +
            'e-' +
            scale
        );
    }
}