import listData from './_list.json'; // Import your JSON array directly

const scale = 1;

export function score(rank, percent, minPercent) {
    // Automatically uses the total number of levels in your JSON file (41 currently)
    const maxRank = listData.length; //[cite: 1]

    if (rank > maxRank) {
        return 0;
    }
    
    if (rank > 75 && percent < 100) {
        return 0;
    }

    // Automatically scales so rank 1 = 200 points, and the final rank (41) = 1 point
    const b = Math.log(200) / Math.log(maxRank);
    let baseScore = 200 * Math.pow(rank, -b);

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