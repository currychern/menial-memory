Menial Memory

Started: May 28, 2016
Author: Curry Chern

Github: https://github.com/currychern/menial-memory
================================================================================

This project generates simulations of memory, the card-matching game.

The user enters the following parameters:
  Trials:   the number of games played in the simulation (100 trials means simulating 100 games)
  Pairs:    the number of matching pairs in this game of memory (4 pairs are 8 cards)
  Turns:    the number of turns alloted per game, a turn consists of flipping a card
            (card A) and then subsequently flipping a second card (card B)

The simulation returns the following:
  Average:    the average number of matches across all simulations
  Frequency:  the number of trials that were found to have x matches

--------------------------------------------------------------------------------

Example - Trials: 2, Pairs: 4, Turns: 3

  Trial 1 - [A, A, C, B, C, D, B, D]
    Turn 1: A, A [index 0, 1] flipped --> match
    Turn 2: C, B [index 2, 3] flipped --> no match
    Turn 3: C, C [index 4, 2] flipped --> match
  Trial 1 --> 2 match

  Trial 2 - [D, C, B, C, A, B, D, A]
    Turn 1: D, C [index 0, 1] flipped --> no match
    Turn 2: B, C [index 2, 3] flipped --> no match
    Turn 3: C, C [index 3, 1] flipped --> match
  Trial 2 --> 1 match

  Average:    1.5 matches
  Frequency:  1 match --> 1
              2 match --> 1
