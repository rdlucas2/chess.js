//requires jquery

//Helper functions
function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

//Classes and methods
function Player(color, active) {
    this.active = active;
    this.color = color;
}

Player.prototype.GetActive = function() {
    for( var i=0; i<players.length; i++) {
        if(players[i].active) {
            this.color = players[i].color;
            this.active = players[i].active;
        }
    }
}

Player.prototype.ChangeActive = function(players) {
    if(players[0].active)
    {
        players[1].active = true;
        players[0].active = false;
    } else if(players[1].active)
    {
        players[0].active = true;
        players[1].active = false;
    }
}

function Piece(name, color, type, image) {
    this.name = name;
    this.color = color;
    this.type = type;
    this.active = false;
    this.image = image;
}

Piece.prototype.Move = function(currentSquare, lastSquareOfPiece) {
    for(var i=0; i<squares.length; i++) {
        if(currentSquare.name == squares[i].name) {
            //set the current squares new info in the array
            squares[i] = currentSquare;
        } else if(squares[i].piece != null && lastSquareOfPiece.piece.name == squares[i].piece.name) {
            //remove the piece from the square it came from
            squares[i].piece = null;
        }
    }
}

function GetPiece(pieceName) {
    var result = new Piece();
    for(var i=0; i<pieces.length; i++) {
        if(pieceName == pieces[i].name) {
            result = pieces[i];
        }
    }
    return result;
}

Piece.prototype.Click = function() {
    var lastPieceClicked = null;
    var lastSquareOfPiece = null;
    $('#ChessBoard').on("click", ".Square", function () {
        //Get the current player
        var currentPlayer = new Player();
        currentPlayer.GetActive();

        //get the current square
        var currentSquare = new Square();
        currentSquare.Get(this.id)

        //Get the clicked piece.
        var currentPiece = GetPiece($(this).children('.piece').attr('id'));

        var whiteKing = new King();
        whiteKing = GetPiece('wKing');

        var blackKing = new King();
        blackKing = GetPiece('bKing');

        //If this is the first time a piece is clicked, set it active, make it the last piece clicked.
        if(lastPieceClicked == null) {
            if(currentPlayer.active == true && currentPlayer.color == currentPiece.color) {
                currentPiece.active = true;
                lastPieceClicked = currentPiece;
                lastSquareOfPiece = currentSquare;
                $('#' + currentSquare.name).css('background', '#F00');
            }
        } else {
            if(lastSquareOfPiece.position == currentSquare.position) {
                //bad move - same square
                $('#' + lastSquareOfPiece.name).css('background', lastSquareOfPiece.color);
                lastPieceClicked = null;
                lastSquareOfPiece = null;
            } else if (lastPieceClicked.color == currentPiece.color) {
                //bad move - move to piece of same color
                $('#' + lastSquareOfPiece.name).css('background', lastSquareOfPiece.color);
                lastPieceClicked = null;
                lastSquareOfPiece = null;
            } else {
                lastPieceClicked.active = false;
                var validMove = false
                if ((whiteKing.inCheck() == true && currentPlayer.color == 'white') || (blackKing.inCheck() == true && currentPlayer.color == 'black')) {
                    //bad move - causes king to be in check - may want to move this check somewhere else or do it multiple times
                    console.log('not yet implemented');
                    validMove = false;
                } else {
                    //check if the move is ok based on the type of piece
                    validMove = lastPieceClicked.ValidateMove(currentSquare, lastSquareOfPiece);
                }
                if(validMove) {
                    currentSquare.piece = lastPieceClicked;
                    lastPieceClicked.Move(currentSquare,lastSquareOfPiece);
                    gameboard.Draw();
                    currentPlayer.ChangeActive(players);
                    lastPieceClicked = null;
                    lastSquareOfPiece = null;
                }
            }
        }
    });
}

Pawn.prototype = new Piece();

function Pawn() {
    Piece.apply(this, arguments);
    this.initialMove = true;
}

Pawn.prototype.ValidateMove = function(currentSquare, lastSquareOfPiece) {
    var validMove = false;
        if(this.color == "white") {
            //allow for moving 2 squares on first move
            if(this.initialMove) {
                if(currentSquare.position[1] == lastSquareOfPiece.position[1] - 2 && currentSquare.position[0] == lastSquareOfPiece.position[0] && currentSquare.piece == null) {
                    validMove = true;
                }
            }
            //normal move
            if(currentSquare.position[1] == lastSquareOfPiece.position[1] - 1 && currentSquare.position[0] == lastSquareOfPiece.position[0] && currentSquare.piece == null) {
                validMove = true;
            } else
            //taking a piece
            if(currentSquare.position[1] == lastSquareOfPiece.position[1] - 1 && currentSquare.piece != null && currentSquare.position[0] != lastSquareOfPiece.position[0]) {
                validMove = true;
            }
            //add logic for taking another pawn en passant
            //add logic for pawn promotion
        }
        if(this.color == "black") {
            //allow for moving 2 squares on first move
            if(this.initialMove) {
                if(currentSquare.position[1] == lastSquareOfPiece.position[1] + 2 && currentSquare.position[0] == lastSquareOfPiece.position[0] && currentSquare.piece == null) {
                    validMove = true;
                }
            }
            //normal move
            if(currentSquare.position[1] == lastSquareOfPiece.position[1] + 1 && currentSquare.position[0] == lastSquareOfPiece.position[0] && currentSquare.piece == null) {
                validMove = true;
            } else
            //taking a piece
            if(currentSquare.position[1] == lastSquareOfPiece.position[1] + 1 && currentSquare.piece != null && currentSquare.position[0] != lastSquareOfPiece.position[0]) {
                validMove = true;
            }
            //add logic for taking another pawn en passant
            //add logic for promotion
        }
    if(validMove) {
        this.initialMove = false;
    }
    return validMove;
}

Rook.prototype = new Piece();

function Rook() {
    Piece.apply(this, arguments);
    this.canCastle = true;
}

Rook.prototype.ValidateMove = function(currentSquare, lastSquareOfPiece) {
    var validMove = false;

    var rank = lastSquareOfPiece.position[0]; //x
    var file = lastSquareOfPiece.position[1]; //y
    var possible = [];
    var x = null;

    //look right
    for(var i=0; i<8; i++) {
        if(rank+i <= 7) {
            x = GetSquareByPosition([rank+i,file]);
            if(x.piece != null) {
                if(x.piece.color != this.color) {
                    possible.push(x.position);
                    i=8;
                }
                if(x.piece.color == this.color && x.piece != this) {
                    i=8;
                }
            } else if(x.piece == null) {
                possible.push(x.position);
            }
        }
    }

    //look left
    for(var i=0; i<8; i++) {
        if(rank-i >= 0) {
            x = GetSquareByPosition([rank-i,file]);
            if(x.piece != null) {
                if(x.piece.color != this.color) {
                    possible.push(x.position);
                    i=8;
                }
                if(x.piece.color == this.color && x.piece != this) {
                    i=8;
                }
            } else if(x.piece == null) {
                possible.push(x.position);
            }
        }
    }

    //look up
    for(var i=0; i<8; i++) {
        if(file+i <= 7) {
            x = GetSquareByPosition([rank,file+i]);
            if(x.piece != null) {
                if(x.piece.color != this.color) {
                    possible.push(x.position);
                    i=8;
                }
                if(x.piece.color == this.color && x.piece != this) {
                    i=8;
                }
            } else if(x.piece == null) {
                possible.push(x.position);
            }
        }
    }

    //look down
    for(var i=0; i<8; i++) {
        if(file-i >= 0) {
            x = GetSquareByPosition([rank,file-i]);
            if(x.piece != null) {
                if(x.piece.color != this.color) {
                    possible.push(x.position);
                    i=8
                }
                if(x.piece.color == this.color && x.piece != this) {
                    i=8;
                }
            } else if(x.piece == null) {
                possible.push(x.position);
            }
        }
    }

    var newPosition = [currentSquare.position[0], currentSquare.position[1]];

    for(var i=0; i<possible.length; i++) {
        var validMove = arraysEqual(newPosition, possible[i]);
        if(validMove) {
            this.canCastle = false;
            break;
        }
    }

    return validMove;
}

Knight.prototype = new Piece();

function Knight() {
    Piece.apply(this, arguments);
}

Knight.prototype.ValidateMove = function(currentSquare, lastSquareOfPiece) {
    var validMove = false;

    var rank = lastSquareOfPiece.position[0];
    var file = lastSquareOfPiece.position[1];
    var possible = [];
    var x = null;

    //up 2 right 1
    if(rank+1 <= 7 && file+2 <= 7) {
        possible.push([rank+1,file+2]);
    }

    //up 2 left 1
    if(rank-1 >= 0 && file+2 <= 7) {
        possible.push([rank-1,file+2]);
    }

    //left 2 up 1
    if(rank-2 >= 0 && file+1 <= 7) {
        possible.push([rank-2,file+1]);
    }

    //left 2 down 1
    if(rank-2 >= 0 && file-1 >= 0) {
        possible.push([rank-2,file-1]);
    }

    //right 2 up 1
    if(rank+2 <= 7 && file+1 <= 7) {
        possible.push([rank+2,file+1]);
    }

    //right 2 down 1
    if(rank+2 <= 7 && file-1 >= 0) {
        possible.push([rank+2,file-1]);
    }

    //down 2 right 1
    if(rank+1 <= 7 && file-2 >= 0) {
        possible.push([rank+1,file-2]);
    }

    //down 2 left 1
    if(rank-1 >= 0 && file-2 >= 0) {
        possible.push([rank-1,file-2]);
    }

    var newPosition = [currentSquare.position[0], currentSquare.position[1]];

    for(var i=0; i<possible.length; i++) {
        validMove = arraysEqual(newPosition, possible[i]);
        if(validMove){
            break;
        }
    }

    return validMove;
}

Bishop.prototype = new Piece();

function Bishop() {
    Piece.apply(this, arguments);
}

Bishop.prototype.ValidateMove = function(currentSquare, lastSquareOfPiece) {
    var validMove = false;

    //can move "infinitely" in any diagonal direction except if occupied by a piece - must remain on same color

    console.log('not yet implemented');
    validMove = true;

    return validMove;
}

Queen.prototype = new Piece();

function Queen() {
    Piece.apply(this, arguments);
}

Queen.prototype.ValidateMove = function(currentSquare, lastSquareOfPiece) {
    var validMove = false;

    //can move "infinitely" in any direction except if occupied by a piece

    console.log('not yet implemented');
    validMove = true;

    return validMove;
}

King.prototype = new Piece();

function King() {
    Piece.apply(this, arguments);
    this.canCastle = true;
    this.checkmated = false;
}

King.prototype.ValidateMove = function(currentSquare, lastSquareOfPiece) {
    var validMove = false;

    //logic for castling (if click on rook of same color - set new position)

    //logic for moving 1 square in any direction - and does not put king in check

    console.log('not yet implemented');
    validMove = true;

    if(validMove) {
        this.canCastle = false;
    }
    return validMove;
}

King.prototype.inCheck = function() {
    //is the king in check or checkmate?
    console.log('not yet implemented');
    return false;
}


function Board(squares, pieces) {
    this.squares = squares;
    this.pieces = pieces;
}

Board.prototype.Draw = function() {
    var row = 8;
    var board = "";
    for(var i = 0; i < this.squares.length; i++) {
        if(i % row == 0  && i > 0)
        {
            board += '<div style="clear:both;"></div>';
        }
        board += this.squares[i].Draw(this.squares[i].piece);
        $('#ChessBoard').html(board);
    }
}

function Square(name, color, position, piece) {
    this.name = name;
    this.color = color;
    this.position = position;
    this.piece = piece;
}

Square.prototype.Draw = function() {
    var string = "";
    if(this.piece == null) {
        string = '<div id="' + this.name + '" class="Square" style="background:' + this.color + ';">&nbsp;</div>';
    } else {
        string = '<div id="' + this.name + '"  class="Square" style="background:' + this.color + ';">' + this.piece.image + '</div>';
    }
    return string;
}

Square.prototype.Get = function(squareName) {
    for(var i=0; i<squares.length; i++) {
        if(squareName == squares[i].name) {
            this.name = squares[i].name;
            this.color = squares[i].color;
            this.position = squares[i].position;
            this.piece = squares[i].piece;
        }
    }
}

function GetSquareByPosition(squarePosition) {
    var result = new Square();
    var position = [];
    position[0] = squarePosition[0];
    position[1] = squarePosition[1];

    for(var i=0; i<squares.length; i++) {
        var x = arraysEqual(squares[i].position, position)
        if(x) {
            result.name = squares[i].name;
            result.color = squares[i].color;
            result.position = squares[i].position;
            result.piece = squares[i].piece;
        }
    }
    return result;
}

//Make the pieces
var wKing    = new King('wKing',    'white', 'king',   '<img class="piece" id="wKing" src="images/wKing.gif" alt="chess piece - wking"/>');
var wQueen   = new Queen('wQueen',   'white', 'queen',  '<img class="piece" id="wQueen" src="images/wQueen.gif" alt="chess piece - wqueen"/>');
var wBishop1 = new Bishop('wBishop1', 'white', 'bishop', '<img class="piece" id="wBishop1" src="images/wBishop.gif" alt="chess piece - wbishop"/>');
var wBishop2 = new Bishop('wBishop2', 'white', 'bishop', '<img class="piece" id="wBishop2" src="images/wBishop.gif" alt="chess piece - wbishop"/>');
var wKnight1 = new Knight('wKnight1', 'white', 'knight', '<img class="piece" id="wKnight1" src="images/wKnight.gif" alt="chess piece - wknight"/>');
var wKnight2 = new Knight('wKnight2', 'white', 'knight', '<img class="piece" id="wKnight2" src="images/wKnight.gif" alt="chess piece - wknight"/>');
var wRook1   = new Rook('wRook1',   'white', 'rook',   '<img class="piece" id="wRook1" src="images/wRook.gif" alt="chess piece - wrook"/>');
var wRook2   = new Rook('wRook2',   'white', 'rook',   '<img class="piece" id="wRook2" src="images/wRook.gif" alt="chess piece - wrook"/>');

var wPawn1   = new Pawn('wPawn1',   'white', 'pawn',   '<img class="piece" id="wPawn1" src="images/wPawn.gif" alt="chess piece - wpawn"/>');
var wPawn2   = new Pawn('wPawn2',   'white', 'pawn',   '<img class="piece" id="wPawn2" src="images/wPawn.gif" alt="chess piece - wpawn"/>');
var wPawn3   = new Pawn('wPawn3',   'white', 'pawn',   '<img class="piece" id="wPawn3" src="images/wPawn.gif" alt="chess piece - wpawn"/>');
var wPawn4   = new Pawn('wPawn4',   'white', 'pawn',   '<img class="piece" id="wPawn4" src="images/wPawn.gif" alt="chess piece - wpawn"/>');
var wPawn5   = new Pawn('wPawn5',   'white', 'pawn',   '<img class="piece" id="wPawn5" src="images/wPawn.gif" alt="chess piece - wpawn"/>');
var wPawn6   = new Pawn('wPawn6',   'white', 'pawn',   '<img class="piece" id="wPawn6" src="images/wPawn.gif" alt="chess piece - wpawn"/>');
var wPawn7   = new Pawn('wPawn7',   'white', 'pawn',   '<img class="piece" id="wPawn7" src="images/wPawn.gif" alt="chess piece - wpawn"/>');
var wPawn8   = new Pawn('wPawn8',   'white', 'pawn',   '<img class="piece" id="wPawn8" src="images/wPawn.gif" alt="chess piece - wpawn"/>');

var bKing    = new King('bKing',    'black', 'king',   '<img class="piece" id="bKing" src="images/bKing.gif" alt="chess piece - bking"/>');
var bQueen   = new Queen('bQueen',   'black', 'queen',  '<img class="piece" id="bQueen" src="images/bQueen.gif" alt="chess piece - bqueen"/>');
var bBishop1 = new Bishop('bBishop1', 'black', 'bishop', '<img class="piece" id="bBishop1" src="images/bBishop.gif" alt="chess piece - bbishop"/>');
var bBishop2 = new Bishop('bBishop2', 'black', 'bishop', '<img class="piece" id="bBishop2" src="images/bBishop.gif" alt="chess piece - bbishop"/>');
var bKnight1 = new Knight('bKnight1', 'black', 'knight', '<img class="piece" id="bKnight1" src="images/bKnight.gif" alt="chess piece - bknight"/>');
var bKnight2 = new Knight('bKnight2', 'black', 'knight', '<img class="piece" id="bKnight2" src="images/bKnight.gif" alt="chess piece - bknight"/>');
var bRook1   = new Rook('bRook1',   'black', 'rook',   '<img class="piece" id="bRook1" src="images/bRook.gif" alt="chess piece - brook"/>');
var bRook2   = new Rook('bRook2',   'black', 'rook',   '<img class="piece" id="bRook2" src="images/bRook.gif" alt="chess piece - brook"/>');

var bPawn1   = new Pawn('bPawn1',   'black', 'pawn',   '<img class="piece" id="bPawn1" src="images/bPawn.gif" alt="chess piece - bpawn"/>');
var bPawn2   = new Pawn('bPawn2',   'black', 'pawn',   '<img class="piece" id="bPawn2" src="images/bPawn.gif" alt="chess piece - bpawn"/>');
var bPawn3   = new Pawn('bPawn3',   'black', 'pawn',   '<img class="piece" id="bPawn3" src="images/bPawn.gif" alt="chess piece - bpawn"/>');
var bPawn4   = new Pawn('bPawn4',   'black', 'pawn',   '<img class="piece" id="bPawn4" src="images/bPawn.gif" alt="chess piece - bpawn"/>');
var bPawn5   = new Pawn('bPawn5',   'black', 'pawn',   '<img class="piece" id="bPawn5" src="images/bPawn.gif" alt="chess piece - bpawn"/>');
var bPawn6   = new Pawn('bPawn6',   'black', 'pawn',   '<img class="piece" id="bPawn6" src="images/bPawn.gif" alt="chess piece - bpawn"/>');
var bPawn7   = new Pawn('bPawn7',   'black', 'pawn',   '<img class="piece" id="bPawn7" src="images/bPawn.gif" alt="chess piece - bpawn"/>');
var bPawn8   = new Pawn('bPawn8',   'black', 'pawn',   '<img class="piece" id="bPawn8" src="images/bPawn.gif" alt="chess piece - bpawn"/>');

var pieces = [wQueen,   wKing,    wBishop1, wBishop2,
              wKnight1, wKnight2, wRook1,   wRook2,
              wPawn1,   wPawn2,   wPawn3,   wPawn4,
              wPawn5,   wPawn6,   wPawn7,   wPawn8,
              bQueen,   bKing,    bBishop1, bBishop2,
              bKnight1, bKnight2, bRook1,   bRook2,
              bPawn1,   bPawn2,   bPawn3,   bPawn4,
              bPawn5,   bPawn6,   bPawn7,   bPawn8];

//setup each square
var white = 'white';
var black = 'black';

var square1  = new Square('square1',  white, [0,0], bRook1);
var square2  = new Square('square2',  black, [1,0], bKnight1);
var square3  = new Square('square3',  white, [2,0], bBishop1);
var square4  = new Square('square4',  black, [3,0], bQueen);
var square5  = new Square('square5',  white, [4,0], bKing);
var square6  = new Square('square6',  black, [5,0], bBishop2);
var square7  = new Square('square7',  white, [6,0], bKnight2);
var square8  = new Square('square8',  black, [7,0], bRook2);

var square9  = new Square('square9',  black, [0,1], bPawn1);
var square10 = new Square('square10', white, [1,1], bPawn2);
var square11 = new Square('square11', black, [2,1], bPawn3);
var square12 = new Square('square12', white, [3,1], bPawn4);
var square13 = new Square('square13', black, [4,1], bPawn5);
var square14 = new Square('square14', white, [5,1], bPawn6);
var square15 = new Square('square15', black, [6,1], bPawn7);
var square16 = new Square('square16', white, [7,1], bPawn8);

var square17 = new Square('square17', white, [0,2], null);
var square18 = new Square('square18', black, [1,2], null);
var square19 = new Square('square19', white, [2,2], null);
var square20 = new Square('square20', black, [3,2], null);
var square21 = new Square('square21', white, [4,2], null);
var square22 = new Square('square22', black, [5,2], null);
var square23 = new Square('square23', white, [6,2], null);
var square24 = new Square('square24', black, [7,2], null);

var square25 = new Square('square25', black, [0,3], null);
var square26 = new Square('square26', white, [1,3], null);
var square27 = new Square('square27', black, [2,3], null);
var square28 = new Square('square28', white, [3,3], null);
var square29 = new Square('square29', black, [4,3], null);
var square30 = new Square('square30', white, [5,3], null);
var square31 = new Square('square31', black, [6,3], null);
var square32 = new Square('square32', white, [7,3], null);

var square33 = new Square('square33', white, [0,4], null);
var square34 = new Square('square34', black, [1,4], null);
var square35 = new Square('square35', white, [2,4], null);
var square36 = new Square('square36', black, [3,4], null);
var square37 = new Square('square37', white, [4,4], null);
var square38 = new Square('square38', black, [5,4], null);
var square39 = new Square('square39', white, [6,4], null);
var square40 = new Square('square40', black, [7,4], null);

var square41 = new Square('square41', black, [0,5], null);
var square42 = new Square('square42', white, [1,5], null);
var square43 = new Square('square43', black, [2,5], null);
var square44 = new Square('square44', white, [3,5], null);
var square45 = new Square('square45', black, [4,5], null);
var square46 = new Square('square46', white, [5,5], null);
var square47 = new Square('square47', black, [6,5], null);
var square48 = new Square('square48', white, [7,5], null);

var square49 = new Square('square49', white, [0,6], wPawn1);
var square50 = new Square('square50', black, [1,6], wPawn2);
var square51 = new Square('square51', white, [2,6], wPawn3);
var square52 = new Square('square52', black, [3,6], wPawn4);
var square53 = new Square('square53', white, [4,6], wPawn5);
var square54 = new Square('square54', black, [5,6], wPawn6);
var square55 = new Square('square55', white, [6,6], wPawn7);
var square56 = new Square('square56', black, [7,6], wPawn8);

var square57 = new Square('square57', black, [0,7], wRook1);
var square58 = new Square('square58', white, [1,7], wKnight1);
var square59 = new Square('square59', black, [2,7], wBishop1);
var square60 = new Square('square60', white, [3,7], wQueen);
var square61 = new Square('square61', black, [4,7], wKing);
var square62 = new Square('square62', white, [5,7], wBishop2);
var square63 = new Square('square63', black, [6,7], wKnight2);
var square64 = new Square('square64', white, [7,7], wRook2);

var squares = [  square1,  square2,  square3,  square4,  square5,  square6,  square7,  square8,
                 square9,  square10, square11, square12, square13, square14, square15, square16,
                 square17, square18, square19, square20, square21, square22, square23, square24,
                 square25, square26, square27, square28, square29, square30, square31, square32,
                 square33, square34, square35, square36, square37, square38, square39, square40,
                 square41, square42, square43, square44, square45, square46, square47, square48,
                 square49, square50, square51, square52, square53, square54, square55, square56,
                 square57, square58, square59, square60, square61, square62, square63, square64
             ];

//add the styles
var styles = '<style type="text/css">';
styles += '#ChessBoard {color:#F00;width:416px;height:416px;}';
styles += '.Square  {float:left;width:50px;height:50px;text-align:center;border:1px solid #000;}';
styles += '.Square > img {padding-top: 10px;width: 60%;}';
styles += '.Square:hover {box-shadow: 0 0 10px 10px rgba(0,0,255,0.6) inset; border:1px solid #00F;}';
styles += '</style>';

$('head').append(styles);

//Draw the board on the page
var gameboard = new Board(squares, pieces);
gameboard.Draw();
var pieceToMove = new Piece();
pieceToMove.Click();

//Get player info (static for now - may add name from user input and more later)
var player1 = new Player('white', true);
var player2 = new Player('black', false);
var players = [player1, player2];