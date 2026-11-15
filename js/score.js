import listData from '../data/_list.json';

/**
 * Numbers of decimal digits to round to
 */
const scale = 1;

/**
 * Calculate the score awarded when having a certain percentage on a list level
 * @param {Number} rank Position on the list
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @returns {Number}
 */
export function score(rank, percent, minPercent) {
    // Automatically uses the total number of levels from your _list.json file
    const maxRank = listData.length;

    if (rank > maxRank) {
        return 0;
    }
    if (rank > 75 && percent < 100) {
        return 0;
    }

    // Automatically scales so Rank 1 = 200 points and the final rank = 1 point
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