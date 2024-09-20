# bib

A browser implemented in browser

TODO:

1. LayoutObject/ Placed 类继承体系如何设计更合理，将 Placed 和 Layout放在一起，违反了interface segregation 原则，而且Column和PlacedColumn无法区分了
   1. Block / Column / Row
   1. PlacedBlock / PlacedColumn / PlacedRow
1. render should be extracted using visitor pattern
