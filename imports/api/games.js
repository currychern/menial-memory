import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Games = new Mongo.Collection('games');

if (Meteor.isServer) {
  Meteor.methods({
    'games.play' (pairs, turns) {
      check(pairs, Number);
      check(turns, Number);

      deck = Meteor.call('games.initialize', pairs);
      deck = Meteor.call('games.randomize', deck);

      // Check if the game has been played before
      game = Meteor.call('games.check', deck, turns);

      // If the game has not been played before
      if (!game) {
        match = Meteor.call('games.calculate', deck, turns);
        game = Meteor.call('games.insert', deck, turns, match);
      }
      return game;
    },

    'games.initialize' (pairs) {
      check(pairs, Number);

      var array = [];
      for (let i = 0; i < pairs; i++) {
        array.push(i);
        array.push(i);
      }
      return array;
    },
    'games.randomize' (array) {
      check(array, Array);

      return _.shuffle(array);
    },
    'games.check' (array, turns) {
      check(array, Array);
      check(turns, Number);

      game = Games.findOne({array: array, turns: turns});

      return game;
    },
    'games.calculate' (deck, turns) {
      let index = 0;
      let match = 0;
      let turn = 0;
      let turned = [];

      while (turn < turns && index < deck.length) {
        let current = deck[index];
        index++;

        // If the first card has a matching turned card
        if (turned.indexOf(current) >= 0){
          match++;
        }
        else {
          turned.push(current);

          let next = deck[index];
          index++;

          // If the second card has a matching turned card
          if (turned.indexOf(next) >= 0) {
            // If next turn is still valid
            if (current == next || turn + 1 < turns){
              match++;
              if (current != next)
                turn++;
            }
          }
          else {
            turned.push(next);
          }
        }
        turn++;
      }
      return match;
    },
    'games.insert' (array, turns, matches) {
      check(array, Array);
      check(turns, Number);
      check(matches, Number);

      gameId = Games.insert({
        array,
        turns,
        matches,
        createdAt: new Date(),
      });

      game = Games.findOne({_id: gameId});

      return game;
    }
  });
}
