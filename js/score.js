/**
 * Numbers of decimal digits to round to
 */
const scale = 1;

/**
 * Calculate the score awarded when having a certain percentage on a list level
 * @param {Number} rank Position on the list
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @param {Number} maxRank Total number of levels (defaults to 41)
 * @returns {Number}
 */
export function score(rank, percent, minPercent, maxRank = 48) {
    if (rank > maxRank) {
        return 0;
    }
    if (rank > 75 && percent < 100) {
        return 0;
    }

    // Smoother curve: Adjust the exponent (e.g., 1.5 or 2) to change how fast points drop off.
    // Higher exponent = holds higher points longer before dropping near the end.
    const curveExponent = 1.5; 
    
    // Calculates a smooth curve from 200 down to 1
    let baseScore = 199 * Math.pow((maxRank - rank) / (maxRank - 1), curveExponent) + 1;

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