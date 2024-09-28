(() => {
    // List of people that have already been bonked (Contains an entry for the person every time they've been bonked)
    const bonkList = `$(urlfetch json https://twitch.center/customapi/quote/list?token={{REPLACE_ENV_BONK_PUBLIC_KEY}}&no_id=1)`
        .split(`,`)

    // List of counts we've already tracked
    const userCounts = [];

    // Go through everyone in the list
    for (var i = 0; i < bonkList.length; i += 1) {
        const value = bonkList[i]
            // Strip new lines, they break (they break the commands)
            .replace('\n', '')
            // Make name lowercase so different uppercase/lowercase combos are for the same person
            .toLowerCase();

        // See if we already counted the person
        const existingIndex = userCounts.findIndex((entry) => entry[0] === value);

        if (existingIndex === -1) {
            // Haven't counted this person yet: Add new entry
            userCounts.push([value, 1])
        } else {
            // Have already counted this person: Increase existing counter
            userCounts[existingIndex][1] += 1;
        }
    }

    // Sort from the highest to lowest bonk count 
    userCounts.sort((a, b) => b[1] - a[1])

    // Build up the list of the first 3 people
    const out = userCounts.slice(0, 3).map((value, index) => {
        let suffix = "";

        // Pick the place number suffix
        if (index === 0) suffix = "st";
        if (index === 1) suffix = "nd";
        if (index === 2) suffix = "rd";

        // Create the actual person item (i.e 1st NAME - 3 times)
        return `${index + 1}${suffix} ${value[0]} \- ${value[1]} times`;
    }).join('  ');

    return `Bonkers Leaderboard -----|_| ${out}`
})();
