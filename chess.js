//HELPER METHODS-----------------------------------------------------------------------
function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

//CLASSES-----------------------------------------------------------------------------
function Game() {
    this.over = false;
}

function Player(color) {
    this.active = false;
    this.color = color;
}

function Piece(name, color, type, position, image) {
    this.name = name;
    this.color = color;
    this.type = type;
    this.position = position;
    this.active = false;
    this.image = image;
}

Piece.prototype.Move = function(gotoPosition) {
    //NEED TO VALIDATE THE MOVE!
    this.position = gotoPosition;
}

function Board() {}

Board.prototype.Draw = function(squares, pieces) {
    var row = 8;
    var board = "";
    for(var i = 0; i < squares.length; i++) {
        for(var j = 0; j < pieces.length; j++) {
            if(arraysEqual(squares[i].position, pieces[j].position)) {
                squares[i].piece = pieces[j];
            }
        }
        if(i % row == 0  && i > 0)
        {
            board += '<div style="clear:both;"></div>';
        }
        board += squares[i].Draw(squares[i].piece);
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
    var string = ""
    if(this.piece == null) {
        string = '<div id="' + this.name + '" class="Square" style="background:' + this.color + ';">&nbsp;</div>';
    } else {
        string = '<div id="' + this.name + '"  class="Square" style="background:' + this.color + ';color:' + this.piece.color + ';">' + this.piece.image + '</div>';
    }
    return string;
}

//APPLICATION TESTING------------------------------------------------------------------
//Make the pieces
var playerColor1 = "#F00";
var playerColor2 = "#00F";

var wKing    = new Piece('wKing',    playerColor1, 'king',   [4,7], '<img src="images/wKing.gif" alt="chess piece - king"/>');
var wQueen   = new Piece('wQueen',   playerColor1, 'queen',  [3,7], '<img src="images/wQueen.gif" alt="chess piece - queen"/>');
var wBishop1 = new Piece('wBishop1', playerColor1, 'bishop', [2,7], '<img src="images/wBishop.gif" alt="chess piece - bishop"/>');
var wBishop2 = new Piece('wBishop2', playerColor1, 'bishop', [5,7], '<img src="images/wBishop.gif" alt="chess piece - bishop"/>');
var wKnight1 = new Piece('wKnight1', playerColor1, 'knight', [1,7], '<img src="images/wKnight.gif" alt="chess piece - knight"/>');
var wKnight2 = new Piece('wKnight2', playerColor1, 'knight', [6,7], '<img src="images/wKnight.gif" alt="chess piece - knight"/>');
var wRook1   = new Piece('wRook1',   playerColor1, 'rook',   [7,7], '<img src="images/wRook.gif" alt="chess piece - rook"/>');
var wRook2   = new Piece('wRook2',   playerColor1, 'rook',   [0,7], '<img src="images/wRook.gif" alt="chess piece - rook"/>');

var wPawn1   = new Piece('wPawn1',   playerColor1, 'pawn',   [0,6], '<img src="images/wPawn.gif" alt="chess piece - pawn"/>');
var wPawn2   = new Piece('wPawn2',   playerColor1, 'pawn',   [1,6], '<img src="images/wPawn.gif" alt="chess piece - pawn"/>');
var wPawn3   = new Piece('wPawn3',   playerColor1, 'pawn',   [2,6], '<img src="images/wPawn.gif" alt="chess piece - pawn"/>');
var wPawn4   = new Piece('wPawn4',   playerColor1, 'pawn',   [3,6], '<img src="images/wPawn.gif" alt="chess piece - pawn"/>');
var wPawn5   = new Piece('wPawn5',   playerColor1, 'pawn',   [4,6], '<img src="images/wPawn.gif" alt="chess piece - pawn"/>');
var wPawn6   = new Piece('wPawn6',   playerColor1, 'pawn',   [5,6], '<img src="images/wPawn.gif" alt="chess piece - pawn"/>');
var wPawn7   = new Piece('wPawn7',   playerColor1, 'pawn',   [6,6], '<img src="images/wPawn.gif" alt="chess piece - pawn"/>');
var wPawn8   = new Piece('wPawn8',   playerColor1, 'pawn',   [7,6], '<img src="images/wPawn.gif" alt="chess piece - pawn"/>');

var bKing    = new Piece('bKing',    playerColor2, 'king',   [4,0], '<img src="images/bKing.gif" alt="chess piece - king"/>');
var bQueen   = new Piece('bQueen',   playerColor2, 'queen',  [3,0], '<img src="images/bQueen.gif" alt="chess piece - queen"/>');
var bBishop1 = new Piece('bBishop1', playerColor2, 'bishop', [2,0], '<img src="images/bBishop.gif" alt="chess piece - bishop"/>');
var bBishop2 = new Piece('bBishop2', playerColor2, 'bishop', [5,0], '<img src="images/bBishop.gif" alt="chess piece - bishop"/>');
var bKnight1 = new Piece('bKnight1', playerColor2, 'knight', [1,0], '<img src="images/bKnight.gif" alt="chess piece - knight"/>');
var bKnight2 = new Piece('bKnight2', playerColor2, 'knight', [6,0], '<img src="images/bKnight.gif" alt="chess piece - knight"/>');
var bRook1   = new Piece('bRook1',   playerColor2, 'rook',   [7,0], '<img src="images/bRook.gif" alt="chess piece - rook"/>');
var bRook2   = new Piece('bRook2',   playerColor2, 'rook',   [0,0], '<img src="images/bRook.gif" alt="chess piece - rook"/>');

var bPawn1   = new Piece('bPawn1',   playerColor2, 'pawn',   [0,1], '<img src="images/bPawn.gif" alt="chess piece - pawn"/>');
var bPawn2   = new Piece('bPawn2',   playerColor2, 'pawn',   [1,1], '<img src="images/bPawn.gif" alt="chess piece - pawn"/>');
var bPawn3   = new Piece('bPawn3',   playerColor2, 'pawn',   [2,1], '<img src="images/bPawn.gif" alt="chess piece - pawn"/>');
var bPawn4   = new Piece('bPawn4',   playerColor2, 'pawn',   [3,1], '<img src="images/bPawn.gif" alt="chess piece - pawn"/>');
var bPawn5   = new Piece('bPawn5',   playerColor2, 'pawn',   [4,1], '<img src="images/bPawn.gif" alt="chess piece - pawn"/>');
var bPawn6   = new Piece('bPawn6',   playerColor2, 'pawn',   [5,1], '<img src="images/bPawn.gif" alt="chess piece - pawn"/>');
var bPawn7   = new Piece('bPawn7',   playerColor2, 'pawn',   [6,1], '<img src="images/bPawn.gif" alt="chess piece - pawn"/>');
var bPawn8   = new Piece('bPawn8',   playerColor2, 'pawn',   [7,1], '<img src="images/bPawn.gif" alt="chess piece - pawn"/>');

var pieces = [wQueen, wKing, wBishop1, wBishop2, wKnight1, wKnight2, wRook1, wRook2, wPawn1, wPawn2, wPawn3, wPawn4, wPawn5, wPawn6, wPawn7, wPawn8,
              bQueen, bKing, bBishop1, bBishop2, bKnight1, bKnight2, bRook1, bRook2, bPawn1, bPawn2, bPawn3, bPawn4, bPawn5, bPawn6, bPawn7, bPawn8];
//setup the board
var white = '#FFF';
var black = '#000';
var gameboard = new Board();

//setup each square
var square1  = new Square('square1',  white, [0,0], null);
var square2  = new Square('square2',  black, [1,0], null);
var square3  = new Square('square3',  white, [2,0], null);
var square4  = new Square('square4',  black, [3,0], null);
var square5  = new Square('square5',  white, [4,0], null);
var square6  = new Square('square6',  black, [5,0], null);
var square7  = new Square('square7',  white, [6,0], null);
var square8  = new Square('square8',  black, [7,0], null);
var square9  = new Square('square9',  black, [0,1], null);
var square10 = new Square('square10', white, [1,1], null);
var square11 = new Square('square11', black, [2,1], null);
var square12 = new Square('square12', white, [3,1], null);
var square13 = new Square('square13', black, [4,1], null);
var square14 = new Square('square14', white, [5,1], null);
var square15 = new Square('square15', black, [6,1], null);
var square16 = new Square('square16', white, [7,1], null);
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
var square49 = new Square('square49', white, [0,6], null);
var square50 = new Square('square50', black, [1,6], null);
var square51 = new Square('square51', white, [2,6], null);
var square52 = new Square('square52', black, [3,6], null);
var square53 = new Square('square53', white, [4,6], null);
var square54 = new Square('square54', black, [5,6], null);
var square55 = new Square('square55', white, [6,6], null);
var square56 = new Square('square56', black, [7,6], null);
var square57 = new Square('square57', black, [0,7], null);
var square58 = new Square('square58', white, [1,7], null);
var square59 = new Square('square59', black, [2,7], null);
var square60 = new Square('square60', white, [3,7], null);
var square61 = new Square('square61', black, [4,7], null);
var square62 = new Square('square62', white, [5,7], null);
var square63 = new Square('square63', black, [6,7], null);
var square64 = new Square('square64', white, [7,7], null);

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
styles += '.Square  {float:left;width:100px;height:100px;text-align:center;border:1px solid #000;}';
styles += '.Square > img {padding-top: 20px;width: 60%;}';
styles += '</style>';

$('head').append(styles);

//Draw the board on the page
gameboard.Draw(squares, pieces);

//after initialization - when players begin interacting with the board
var pieceToMove;
$('#ChessBoard').on("click", ".Square", function() {
    var initPosition = [];
    var gotoPosition = [];
    for(var i = 0; i < squares.length; i++) {
        if(this.id == squares[i].name) {
            if(squares[i].piece != null && squares[i].piece.active == false) {
                initPosition = (squares[i].piece.position);
                squares[i].piece.active = true;
                pieceToMove = squares[i].piece;
                squares[i].piece = null;
            } else if(pieceToMove != null) {
                gotoPosition = (squares[i].position);
                pieceToMove.active = false;
                pieceToMove.Move(gotoPosition);
                for(var j = 0; j < pieces.length; j++) {
                    if(pieceToMove.name == pieces[j].name) {
                        pieces[j] = pieceToMove;
                    }
                }
                pieceToMove = null;
                gameboard.Draw(squares, pieces);
            }
        }
    }
});