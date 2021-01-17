function prayerName(prayer) {
    if (prayer == adhan.Prayer.Fajr) {
        return "Fajr";
    } else if (prayer == adhan.Prayer.Sunrise) {
        return "Sunrise";
    } else if (prayer == adhan.Prayer.Dhuhr) {
        return "Dhuhr";
    } else if (prayer == adhan.Prayer.Asr) {
        return "Asr";
    } else if (prayer == adhan.Prayer.Maghrib) {
        return "Maghrib";
    } else if (prayer == adhan.Prayer.Isha) {
        return "Isha";
    } else if (prayer == adhan.Prayer.None) {
        return "None";
    }
}

var cityName = "اسطنبول";
var lat = 41.01;
var lng = 28.9603;


function AppViewModel() {

    this.City = ko.observable();
    this.Date = ko.observable();
    this.DateHijri = ko.observable();

    this.Time = ko.observable();

    this.Fajr = ko.observable();
    this.FajrMoment = ko.observable();

    this.Sunrise = ko.observable();
    this.SunriseMoment = ko.observable();

    this.Dhuhr = ko.observable();
    this.DhuhrMoment = ko.observable();

    this.Asr = ko.observable();
    this.AsrMoment = ko.observable();

    this.Maghrib = ko.observable();
    this.MaghribMoment = ko.observable();

    this.Isha = ko.observable();
    this.IshaMoment = ko.observable();
    this.CurrentPrayerTime = ko.observable();

    this.IftarRemaining = ko.observable();

    this.IsFasting = ko.observable();

    this.calc = function() {
        var date = new Date();
        var coordinates = new adhan.Coordinates(lat, lng);

        var params = adhan.CalculationMethod.Turkey();
        var prayerTimes = new adhan.PrayerTimes(coordinates, date, params);

        this.Time(moment(date).format('h:mm:ss A'));
        this.City(cityName);

        this.Date(moment(date).format('YYYY/M/D - MMM'));
        this.DateHijri(moment(date).format('iYYYY/iM/iD - iMMM'));

        this.Fajr(moment(prayerTimes.fajr).local().format('h:mm A'));

        this.FajrMoment(moment(prayerTimes.fajr).fromNow());

        this.Sunrise(moment(prayerTimes.sunrise).local().format('h:mm A'));
        this.SunriseMoment(moment(prayerTimes.sunrise).fromNow());

        this.Dhuhr(moment(prayerTimes.dhuhr).local().format('h:mm A'));
        this.DhuhrMoment(moment(prayerTimes.dhuhr).fromNow());

        this.Asr(moment(prayerTimes.asr).local().format('h:mm A'));
        this.AsrMoment(moment(prayerTimes.asr).fromNow());

        this.Maghrib(moment(prayerTimes.maghrib).local().format('h:mm A'));
        this.MaghribMoment(moment(prayerTimes.maghrib).fromNow());

        this.Isha(moment(prayerTimes.isha).local().format('h:mm A'));
        this.IshaMoment(moment(prayerTimes.isha).fromNow());

        this.CurrentPrayerTime(prayerName(prayerTimes.currentPrayer()));

        var fastingTime = moment(prayerTimes.maghrib).diff(moment(prayerTimes.fajr));
        var maghribDiff = moment(prayerTimes.maghrib).diff(moment(date));

        var decrease = ((fastingTime - maghribDiff) / fastingTime) * 100;
        var decreaseValue = parseFloat(decrease).toFixed(2);

        decreaseValue = Math.min(decreaseValue, 100);
        decreaseValue = Math.max(decreaseValue, 0);

        this.IftarRemaining(decreaseValue + '%');

        if (moment(date) >= moment(prayerTimes.fajr) && moment(date) <= moment(prayerTimes.maghrib)) {
            this.IsFasting(true);
        } else {
            this.IsFasting(false);
        }
    };
};

function getPrayerTime(day) {
    var coordinates = new adhan.Coordinates(lat, lng);
    var params = adhan.CalculationMethod.Turkey();
    var prayerTimes = new adhan.PrayerTimes(coordinates, day, params);

    return {
        IsPast: moment(day).diff(moment(new Date())) < 0,
        Day: moment(day).local().format('D MMM'),
        DayHijri: moment(day).local().format('iD iMMM'),
        Fajer: moment(prayerTimes.fajr).local().format('h:mm'),
        Dhuhr: moment(prayerTimes.dhuhr).local().format('h:mm'),
        Asr: moment(prayerTimes.asr).local().format('h:mm'),
        Maghrib: moment(prayerTimes.maghrib).local().format('h:mm'),
        Isha: moment(prayerTimes.isha).local().format('h:mm')

    }

};


function loadRmadanTable() {
    $('#bigTable').bootstrapTable('load', ramadanTable());
}

function changeCity(item) {
    cityName = item.text;
    lat = item.lat;
    lng = item.lng;
    setCookie("id", item.id, 30);
    setCookie("lat", lat, 30);
    setCookie("lng", lng, 30);
    viewModel.calc();
}