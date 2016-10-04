define(function(require){
    // Function to check if the date UTC falls during Daylight Savings
    // 2nd Sunday in March - 1st Sunday in November
    // @ 7am UTC which is 2AM Eastern
    // @ 6am UTC (end) which is 2AM Eastern
    _isDaylightSavingsTime = function (localDate) {
        var SUNDAY = 0;

        var dstStart = new Date();
        dstStart.setUTCHours(7, 0, 0, 0);
        dstStart.setUTCMonth(2); // March
        dstStart.setUTCDate(1);
        // Find the first Sunday in March        
        while (dstStart.getDay() != SUNDAY) {
            dstStart.setUTCDate(dstStart.getUTCDate() + 1);
        }
        // Add 1 week (2nd sunday in March) - start of daylight savings time
        dstStart.setUTCDate(dstStart.getUTCDate() + 7);

        var dstEnd = new Date();
        dstEnd.setUTCHours(6, 0, 0, 0);
        dstEnd.setUTCMonth(10); // November
        dstEnd.setUTCDate(1);
        // Find the first sunday in November
        // (End of Daylight Savings Time)
        while (dstEnd.getDay() != SUNDAY) {
            dstEnd.setUTCDate(dstEnd.getUTCDate() + 1);
        }

        // Convert all times to UTC so we can check that the current time
        // falls between DST start and end times.
        var timeUTC = new Date(localDate.getUTCFullYear(),
            localDate.getUTCMonth(),
            localDate.getUTCDate(),
            localDate.getUTCHours(),
            localDate.getUTCMinutes(),
            localDate.getUTCSeconds());
        var startUTC = new Date(dstStart.getUTCFullYear(),
            dstStart.getUTCMonth(),
            dstStart.getUTCDate(),
            dstStart.getUTCHours(),
            dstStart.getUTCMinutes(),
            dstStart.getUTCSeconds());
        var endUTC = new Date(dstEnd.getUTCFullYear(),
            dstEnd.getUTCMonth(),
            dstEnd.getUTCDate(),
            dstEnd.getUTCHours(),
            dstEnd.getUTCMinutes(),
            dstEnd.getUTCSeconds());

        // If the current time falls between the start and end times
        // then DaylightSavingsTime is true.
        if (timeUTC > startUTC && timeUTC < endUTC)
            return true;

        return false;
    }

    return {
        IsDaylightSavingsTime: function(localDate){
            return _isDaylightSavingsTime(localDate);
        }
    }
});