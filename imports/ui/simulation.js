import { Template } from 'meteor/templating';

import { Trials } from '../api/trials.js';

import './simulation.html';

Template.registerHelper('decodeHistogram', (obj) => {
    var result = [];
    for (var key in obj) result.push( { matches: obj[key]._id , frequency: obj[key].freq} );
    return result;
});

Template.simulation.onCreated(function bodyOnCreated() {
  this.average = new ReactiveVar();
  this.histogram = new ReactiveVar();
});

Template.simulation.helpers({
  avg() {
    const instance = Template.instance();
    return instance.average.get();
  },
  hist() {
    const instance = Template.instance();
    return instance.histogram.get();
  }
});

Template.simulation.events({
  'submit' (event, instance) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form elements
    const target = event.target;
    const num = Number(target.num.value);
    const pairs = Number(target.pairs.value);
    const turns = Number(target.turns.value);

    //Reset trials collection
    Meteor.call('trials.reset');

    //Run simulation
    instance.average.set('Calculating...');
    Meteor.call('trials.run', num, pairs, turns, function(error, data) {
        if (error) {
          console.log(error);
        }
        else {
          // Get the average number of matches in the simulation
          Meteor.call('trials.getAverage', (err, data) => {
            if (error)
              console.log(error);
            else
              instance.average.set(data.toFixed(3));
          });

          // Get the distribution of matches in the simulation
          Meteor.call('trials.getHistogram', (err, data) => {
            if (error)
              console.log(error);
            else {
              instance.histogram.set(data);
            }
          });
        }
    });
  },
});
