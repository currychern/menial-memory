import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Games } from './games.js';

export const Trials = new Mongo.Collection('trials');

if (Meteor.isServer) {
  Meteor.methods({
    'trials.run' (num, pairs, turns) {
      check(num, Number);
      check(pairs, Number);
      check(turns, Number);

      for (let i = 0; i < num; i++) {
        game = Meteor.call('games.play', pairs, turns);
        Meteor.call('trials.insert', game);
      }
    },

    'trials.insert' (game) {
      check(game, Object);

      Trials.insert({
        ref_id: game._id,
        array: game.array,
        turns: game.turns,
        matches: game.matches,
        createdAt: new Date()
      });
    },
    'trials.reset' () {
      Trials.remove({});
    },

    'trials.getAverage' () {
      return Trials.aggregate([
        { $group: { _id: null, avg: { $avg: "$matches" } } }
      ])[0].avg;
    },
    'trials.getHistogram' () {
      return Trials.aggregate([
          { $group: { _id: "$matches", freq: { $sum: 1 } } }
      ]);
    },
  });
}
