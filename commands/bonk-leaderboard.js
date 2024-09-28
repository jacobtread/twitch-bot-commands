(() => {
    // List of people that have already been bonked (Contains an entry for the person every time they've been bonked)
    const bonkList = `$(urlfetch json https://twitch.center/customapi/quote/list?token={{REPLACE_ENV_BONK_PUBLIC_KEY}}&no_id=1)`
        .split(`,`)

    const userCounts = [];

    for (var i = 0; i < bonkList.length; i += 1) {
        const value = bonkList[i]
            // Strip new lines, they break the eval
            .replace('\n', '')
            .toLowerCase();
        const existingIndex = userCounts.findIndex((entry) => entry[0] === value);

        if (existingIndex === -1) {
            // Add new entry
            userCounts.push([value, 1])
        } else {
            // Increase existing counter
            userCounts[existingIndex][1] += 1;
        }
    }

    userCounts.sort((a, b) => b[1] - a[1])

    const out = userCounts.slice(0, 3).map((value, index) => {
        let suffix = "";
        if (index === 0) suffix = "st";
        if (index === 1) suffix = "nd";
        if (index === 2) suffix = "rd";

        return `${index + 1}${suffix} ${value[0]} \- ${value[1]} times`;
    }).join('  ');



    return `Bonkers Leaderboard -----|_| ${out}`
})();
