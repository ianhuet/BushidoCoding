'use strict';

var rp = require('request-promise');


function schedule() {
  this.attendeeCount = 0;
  this.attendees     = [];
  this.name          = null;
  this.startDate     = null;
}
schedule.prototype.setAttendeeCount = function(v) {
  this.attendeeCount = v;
}
schedule.prototype.setAttendees = function(v) {
  this.attendees = v;
}
schedule.prototype.setName = function(v) {
  this.name = v;
}
schedule.prototype.setStartDate = function(v) {
  this.startDate = v;
}



function transformData(data) {

  let dateSet, dates, lSchedule, attendees;

  let countrySort = [];
  let ctryPeople = [];

  // sort into country based subsets of ctryPeople
  for(var x=0; x<data.length; x++) {
    ctryPeople = countrySort[data[x].country] || [];
    ctryPeople.push(data[x]);
    countrySort[data[x].country] = ctryPeople;
  }

  // loop through each country and find attendee overlap
  for (var c in countrySort) {

    dateSet = countrySort[c].map(p => p.availableDates);
    dates = dateSet.shift().filter(function(v) {
      return dateSet.every(function(a) {
        return a.indexOf(v) !== -1;
      });
    });

    lSchedule = new schedule();
    // lSchedule.setName(c);
    lSchedule.name = c;

    if(dates.length > 0) {
      lSchedule.setAttendeeCount(countrySort[c].length);
      lSchedule.setAttendees(countrySort[c].map(p => p.email));
      lSchedule.setStartDate(dates[0]);
    }

    countries.push(lSchedule);
  }

  let result = {
    'countries': countries
  }
  return result;
}

function sendAttendeeList(data) {
  var options = {
      method: 'POST',
      uri: 'https://candidate.hubteam.com/candidateTest/v2/results?userKey=ba5fd9dfe194dfd4e6a17f43f50f',
      body: data,
      json: true
  };
   
  rp(options)
      .then(function (parsedBody) {
          console.log('POST done: ' + parsedBody);
      })
      .catch(function (err) {
          console.log('POST fail: ' + err);
      });
}

function getSurveyResults() {
  var options = {
    uri: 'https://candidate.hubteam.com/candidateTest/v2/partners?userKey=ba5fd9dfe194dfd4e6a17f43f50f',
    transform: function (body){
      return JSON.parse(body);
    }
  };

  return rp(options)
  .then(function(data){
    return transformData(data.partners);
  })
  .then(function(data){
    sendAttendeeList(data)
  });
}


getSurveyResults();
