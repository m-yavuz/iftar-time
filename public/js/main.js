function setCookie(name, value, daysToLive) {
    var cookie = name + "=" + encodeURIComponent(value);

    if (typeof daysToLive === "number") {
        /* Sets the max-age attribute so that the cookie expires
        after the specified number of days */
        cookie += "; max-age=" + (daysToLive * 24 * 60 * 60);

        document.cookie = cookie;
    }
}

function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");

    // Loop through the array elements
    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");

        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if (name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }

    // Return null if not found
    return null;
}

function ramadanTable() {
    var rows = [];
    var firstDay = new Date('2021-04-12T00:00:00');
    //var firstDay = new Date('2021-01-01T00:00:00');

    for (var i = 1; i < 31; i++) {
        var currentDay = new Date(firstDay);
        currentDay.setDate(currentDay.getDate() + i);

        var result = getPrayerTime(currentDay);
        rows.push({
            id: i,
            IsPast: result.IsPast,
            DayHijri: result.DayHijri,
            Day: result.Day,
            Fajer: result.Fajer,
            Dhuhr: result.Dhuhr,
            Asr: result.Asr,
            Maghrib: result.Maghrib,
            Isha: result.Isha
        })
    }

    return rows;
}

function rowStyle(row, index) {
    if (row.IsPast) {
        return {
            css: { 'background-Color': 'rgba(0,0,0,.15)' }
        }
    }

    return {
        classes: ''
    }
}

function cellStyleMain(value, row, index) {
    if (row.IsPast) {
        return {
            css: { 'background-Color': 'rgba(0,0,0,.15)' }
        }
    }
    return {
        css: { 'background-Color': 'rgba(0,0,0,.10)' }
    }
}