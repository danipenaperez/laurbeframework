var calendar = {

    e : 480,

    today:null,
    year:null,
    month:null,
    nextMonth:null,
    nextYear:null,

    r : [],
    i : [
        "January",
        "Feburary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"],
    daysArray : [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"],

//Aqui
    cal1:null,
    calHeader1 :null,
    weekline1 :null,
    datesBody1 :null,

    cal2 :null,
    calHeader2 :null,
    weekline2 :null,
    datesBody2 :null,

    bothCals :null,

    switchButton:null, 

    calendars :null, 


    clickedElement :null, 
    firstClicked :null, 
    secondClicked :null, 
    thirdClicked :null, 
    firstClick : false,
    secondClick : false,
    selected : {},
    init: function(){
        let $ =window.$;
        console.log(this);
        console.log('y es ');
        this.cal1 = $("#calendar_first");
        this.calHeader1 = this.cal1.find(".calendar_header");
        this.weekline1 = this.cal1.find(".calendar_weekdays");
        this.datesBody1 = this.cal1.find(".calendar_content");
    
        this.cal2 = $("#calendar_second");
        this.calHeader2 = this.cal2.find(".calendar_header");
        this.weekline2 = this.cal2.find(".calendar_weekdays");
        this.datesBody2 = this.cal2.find(".calendar_content");
    
        this.bothCals = $(".calendar");
    
        this.switchButton = this.bothCals.find(".calendar_header").find('.switch-month');
        this.calendars = {
            "cal1": {
                "name": "first",
                    "calHeader": this.calHeader1,
                    "weekline": this.weekline1,
                    "datesBody": this.datesBody1
            },
                "cal2": {
                "name": "second",
                    "calHeader": this.calHeader2,
                    "weekline": this.weekline2,
                    "datesBody": this.datesBody2
            }
        }

        //Maybe Start ?
        this.b();
        this.c(this.month, this.year, 0);
        this.c(this.nextMonth, this.nextYear, 1);

        //Set listeners 
        var self = this;
        this.switchButton.on("click", function () {
            let $ =window.$;
            var clicked = $(this);
            var generateCalendars = function (e) {
                var nextDatesFirst = self.getAdjacentMonth(self.month, self.year, e);
                var nextDatesSecond = self.getAdjacentMonth(self.nextMonth, self.nextYear, e);
                self.month = nextDatesFirst[0];
                self.year = nextDatesFirst[1];
                self.nextMonth = nextDatesSecond[0];
                self.nextYear = nextDatesSecond[1];
    
                self.c(self.month, self.year, 0);
                self.c(self.nextMonth, self.nextYear, 1);
            };
            if (clicked.attr("class").indexOf("left") != -1) {
                generateCalendars("previous");
            } else {
                generateCalendars("next");
            }
            self.clickedElement = self.bothCals.find(".calendar_content").find("div");
        });
    },

    c: function (passed_month, passed_year, calNum) {
        var calendar = calNum == 0 ? this.calendars.cal1 : this.calendars.cal2;
        this.makeWeek(calendar.weekline);
        calendar.datesBody.empty();
        var calMonthArray = this.makeMonthArray(passed_month, passed_year);
        var r = 0;
        var u = false;
        while (!u) {
            
            if (this.daysArray[r] == calMonthArray[0].weekday) {
                u = true
            } else {
                
                calendar.datesBody.append('<div class="blank"></div>');
                r++;
            }
        }
        for (var cell = 0; cell < 42 - r; cell++) { // 42 date-cells in calendar
            if (cell >= calMonthArray.length) {
                calendar.datesBody.append('<div class="blank"></div>');
            } else {
                var shownDate = calMonthArray[cell].day;
                var iter_date = new Date(passed_year, passed_month, shownDate);
                if (
                (
                (shownDate != this.today.getDate() && passed_month == this.today.getMonth()) || passed_month != this.today.getMonth()) && iter_date < this.today) {
                    var m = '<div class="past-date">';
                } else {
                    var m = this.checkToday(iter_date) ? '<div class="today">' : "<div>";
                }
                calendar.datesBody.append(m + shownDate + "</div>");
            }
        }

        var color = "#444444";
        calendar.calHeader.find("h2").text(this.i[passed_month] + " " + passed_year);
        calendar.weekline.find("div").css("color", color);
        calendar.datesBody.find(".today").css("color", "#00bdaa");

        // find elements (dates) to be clicked on each time
        // the calendar is generated
        var clicked = false;
        this.selectDates(this.selected);

        this.clickedElement = calendar.datesBody.find('div');
        let self =this;
        this.clickedElement.on("click", function () {
            clicked = $(this);
            var whichCalendar = calendar.name;

            if (self.firstClick && self.secondClick) {
                self.thirdClicked = self.getClickedInfo(clicked, calendar);
                var firstClickDateObj = new Date(self.firstClicked.year,
                    self.firstClicked.month,
                    self.firstClicked.date);
                var secondClickDateObj = new Date(self.secondClicked.year,
                    self.secondClicked.month,
                    self.secondClicked.date);
                var thirdClickDateObj = new Date(self.thirdClicked.year,
                    self.thirdClicked.month,
                    self.thirdClicked.date);
                if (secondClickDateObj > thirdClickDateObj && thirdClickDateObj > firstClickDateObj) {
                    self.secondClicked = self.thirdClicked;
                    // then choose dates again from the start :)
                    self.bothCals.find(".calendar_content").find("div").each(function () {
                        $(this).removeClass("selected");
                    });
                    self.selected = {};
                    self.selected[self.firstClicked.year] = {};
                    self.selected[self.firstClicked.year][self.firstClicked.month] = [self.firstClicked.date];
                    self.selected = self.addChosenDates(self.firstClicked, self.secondClicked, self.selected);
                } else { // reset clicks
                    self.selected = {};
                    self.firstClicked = [];
                    self.secondClicked = [];
                    self.firstClick = false;
                    self.secondClick = false;
                    self.bothCals.find(".calendar_content").find("div").each(function () {
                        $(this).removeClass("selected");
                    });
                }
            }
            if (!self.firstClick) {
                self.firstClick = true;
                self.firstClicked = self.getClickedInfo(clicked, calendar);
                self.selected[self.firstClicked.year] = {};
                self.selected[self.firstClicked.year][self.firstClicked.month] = [self.firstClicked.date];
            } else {
                self.secondClick = true;
                self.secondClicked = self.getClickedInfo(clicked, calendar);

                // what if second clicked date is before the first clicked?
                var firstClickDateObj = new Date(self.firstClicked.year,
                    self.firstClicked.month,
                    self.firstClicked.date);
                var secondClickDateObj = new Date(self.secondClicked.year,
                    self.secondClicked.month,
                    self.secondClicked.date);

                if (firstClickDateObj > secondClickDateObj) {

                    var cachedClickedInfo = self.secondClicked;
                    self.secondClicked = self.firstClicked;
                    self.firstClicked = cachedClickedInfo;
                    self.selected = {};
                    self.selected[self.firstClicked.year] = {};
                    self.selected[self.firstClicked.year][self.firstClicked.month] = [self.firstClicked.date];

                } else if (firstClickDateObj.getTime() == secondClickDateObj.getTime()) {
                    self.selected = {};
                    self.firstClicked = [];
                    self.secondClicked = [];
                    self.firstClick = false;
                    self.secondClick = false;
                    $(this).removeClass("selected");
                }


                // add between dates to [selected]
                self.selected = self.addChosenDates(self.firstClicked, self.secondClicked, self.selected);
            }
            self.selectDates(self.selected);
        });

    },
    selectDates: function (selected) {
        if (!$.isEmptyObject(selected)) {
            var dateElements1 = this.datesBody1.find('div');
            var dateElements2 = this.datesBody2.find('div');

            function highlightDates(passed_year, passed_month, dateElements) {
                if (passed_year in selected && passed_month in selected[passed_year]) {
                    var daysToCompare = selected[passed_year][passed_month];
                    for (var d in daysToCompare) {
                        dateElements.each(function (index) {
                            if (parseInt($(this).text()) == daysToCompare[d]) {
                                $(this).addClass('selected');
                            }
                        });
                    }

                }
            }

            highlightDates(this.year, this.month, dateElements1);
            highlightDates(this.nextYear, this.nextMonth, dateElements2);
        }
    },
    makeMonthArray: function (passed_month, passed_year) { // creates Array specifying dates and weekdays
        var e = [];
        for (var r = 1; r < this.getDaysInMonth(passed_year, passed_month) + 1; r++) {
            e.push({
                day: r,
                // Later refactor -- weekday needed only for first week
                weekday: this.daysArray[this.getWeekdayNum(passed_year, passed_month, r)]
            });
        }
        return e;
    },
    makeWeek: function (week) {
        week.empty();
        for (var e = 0; e < 7; e++) { 
            week.append("<div>" + this.daysArray[e].substring(0, 3) + "</div>")
        }
    },
    getDaysInMonth: function (currentYear, currentMon) {
        return (new Date(currentYear, currentMon + 1, 0)).getDate();
    },
    getWeekdayNum: function (e, t, n) {
        return (new Date(e, t, n)).getDay();
    },
    checkToday: function (e) {
        var todayDate = this.today.getFullYear() + '/' + (this.today.getMonth() + 1) + '/' + this.today.getDate();
        var checkingDate = e.getFullYear() + '/' + (e.getMonth() + 1) + '/' + e.getDate();
        return todayDate == checkingDate;

    },
    getAdjacentMonth: function (curr_month, curr_year, direction) {
        var theNextMonth;
        var theNextYear;
        if (direction == "next") {
            theNextMonth = (curr_month + 1) % 12;
            theNextYear = (curr_month == 11) ? curr_year + 1 : curr_year;
        } else {
            theNextMonth = (curr_month == 0) ? 11 : curr_month - 1;
            theNextYear = (curr_month == 0) ? curr_year - 1 : curr_year;
        }
        return [theNextMonth, theNextYear];
    },
    b: function () {
        this.today = new Date;
        this.year = this.today.getFullYear();
        this.month = this.today.getMonth();
        var nextDates = this.getAdjacentMonth(this.month, this.year, "next");
        this.nextMonth = nextDates[0];
        this.nextYear = nextDates[1];
    },
    getClickedInfo: function (element, calendar) {
            var clickedInfo = {};
            var clickedCalendar,
            clickedMonth,
            clickedYear;
            clickedCalendar = calendar.name;
            clickedMonth = clickedCalendar == "first" ? this.month : this.nextMonth;
            clickedYear = clickedCalendar == "first" ? this.year : this.nextYear;
            clickedInfo = {
                "calNum": clickedCalendar,
                    "date": parseInt(element.text()),
                    "month": clickedMonth,
                    "year": clickedYear
            }
            return clickedInfo;
    },
    addChosenDates: function (firstClicked, secondClicked, selected) {
        if (secondClicked.date > firstClicked.date || secondClicked.month > firstClicked.month || secondClicked.year > firstClicked.year) {

            var added_year = secondClicked.year;
            var added_month = secondClicked.month;
            var added_date = secondClicked.date;

            if (added_year > firstClicked.year) {
                // first add all dates from all months of Second-Clicked-Year
                selected[added_year] = {};
                selected[added_year][added_month] = [];
                for (var i = 1;
                i <= secondClicked.date;
                i++) {
                    selected[added_year][added_month].push(i);
                }

                added_month = added_month - 1;
                while (added_month >= 0) {
                    selected[added_year][added_month] = [];
                    for (var i = 1;
                    i <= getDaysInMonth(added_year, added_month);
                    i++) {
                        selected[added_year][added_month].push(i);
                    }
                    added_month = added_month - 1;
                }

                added_year = added_year - 1;
                added_month = 11; // reset month to Dec because we decreased year
                added_date = getDaysInMonth(added_year, added_month); // reset date as well

                // Now add all dates from all months of inbetween years
                while (added_year > firstClicked.year) {
                    selected[added_year] = {};
                    for (var i = 0; i < 12; i++) {
                        selected[added_year][i] = [];
                        for (var d = 1; d <= getDaysInMonth(added_year, i); d++) {
                            selected[added_year][i].push(d);
                        }
                    }
                    added_year = added_year - 1;
                }
            }

            if (added_month > firstClicked.month) {
                if (firstClicked.year == secondClicked.year) {
                    selected[added_year][added_month] = [];
                    for (var i = 1;
                    i <= secondClicked.date;
                    i++) {
                        selected[added_year][added_month].push(i);
                    }
                    added_month = added_month - 1;
                }
                while (added_month > firstClicked.month) {
                    selected[added_year][added_month] = [];
                    for (var i = 1;
                    i <= getDaysInMonth(added_year, added_month);
                    i++) {
                        selected[added_year][added_month].push(i);
                    }
                    added_month = added_month - 1;
                }
                added_date = getDaysInMonth(added_year, added_month);
            }

            for (var i = firstClicked.date + 1;
            i <= added_date;
            i++) {
                selected[added_year][added_month].push(i);
            }
        }
        return selected;
    }

}

export default calendar;