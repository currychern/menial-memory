Menial Memory

Started: May 28, 2016
Author: Curry Chern

Github: https://github.com/currychern/menial-memory
================================================================================

This project generates simulations of memory, the card-matching game.

The user enters the following parameters:
  Trials:   the number of games played in the simulation (100 trials means simulating 100 games)
  Pairs:    the number of matching pairs in this game of memory (4 pairs is 8 cards)
  Turns:    the number of turns alloted per game, a turn consists of flipping a card
            (card A) and then subsequently flipping a second card (card B)

The simulation returns the following:
  Average:    the average number of matches across all simulations
  Frequency:  the number of trials that were found to have x matches

--------------------------------------------------------------------------------

Example - Trials: 2, Pairs: 4, Turns: 3

  Trial 1 - [0, 0, 2, 1, 2, 3, 1, 3]
    Turn 1: 0, 0 [index 0, 1] flipped --> match
    Turn 2: 2, 1 [index 2, 3] flipped --> no match
    Turn 3: 2, 2 [index 4, 2] flipped --> match
  Trial 1 --> 2 match

  Trial 2 - [3, 2, 1, 2, 0, 1, 3, 0]
    Turn 1: 3, 2 [index 0, 1] flipped --> no match
    Turn 2: 1, 2 [index 2, 3] flipped --> no match
    Turn 3: 2, 2 [index 3, 1] flipped --> match
  Trial 2 --> 1 match

  Average:    1.5 matches
  Frequency:  1 match --> 1
              2 match --> 1
