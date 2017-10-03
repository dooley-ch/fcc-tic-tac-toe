define("tic-tac-toe", function (require, exports) {
    "use strict";

    var _ = require("lodash");

    // Holds a representation of the movements by the players in the game
    var _grid = [
        ["-", "-", "-"],
        ["-", "-", "-"], 
        ["-", "-", "-"]
    ];

    // User's mark
    var _usersMark = "X";

    // Indicates if game is finished
    var _gameOver = false;

    // The number of moves so far in the game
    var _moves = 0;

    // A reference to the callback function used to update the display
    var _updateCallback = null;

    // A reference to the callback function used to inform the user of the winner
    var _reportWinnerCallback = null;

    // reference to timer used to check for a winner
    var _checkWinnerInterval = null;

    // reference to timer used to make computer move
    var _computerMoveInterval = null;

    /**
     * Check's if someone has won the game
     * 
     * @param {string} userIs The user's mark: an X or an O 
     */
    function _isWinningRow(cell1, cell2, cell3) {
        if ((cell1 === "-") || (cell2 === "-") || (cell3 === "-")) {
            return false;
        }

        if ((cell1 === cell2) && (cell1 === cell3)) {
            return true;
        }

        return false;
    }

    /**
     * Check's if someone has won the game
     * 
     * @param {string} userIs The user's mark: an X or an O 
     */
    function _checkForWinner() {
        if (_gameOver) {
            return;
        }
        
        // Check first row
        if (_isWinningRow(_grid[0][0], _grid[0][1], _grid[0][2])) {
            if (_.isFunction(_reportWinnerCallback)) {
                _reportWinnerCallback(_grid[0][0]);
            }
            _gameOver = true;
            return true;
        }

        // Check second row
        if (_isWinningRow(_grid[1][0], _grid[1][1], _grid[1][2])) {
            if (_.isFunction(_reportWinnerCallback)) {
                _reportWinnerCallback(_grid[1][0]);
            }
            _gameOver = true;
            return true;
        }
    
        // Check thrid row
        if (_isWinningRow(_grid[2][0], _grid[2][1], _grid[2][2])) {
            if (_.isFunction(_reportWinnerCallback)) {
                _reportWinnerCallback(_grid[2][0]);
            }
            _gameOver = true;
            return true;
        }
    
        // Check first column
        if (_isWinningRow(_grid[0][0], _grid[1][0], _grid[2][0])) {
            if (_.isFunction(_reportWinnerCallback)) {
                _reportWinnerCallback(_grid[0][0]);
            }
            _gameOver = true;
            return true;
        }
    
        // Check second column
        if (_isWinningRow(_grid[0][1], _grid[1][1], _grid[2][1])) {
            if (_.isFunction(_reportWinnerCallback)) {
                _reportWinnerCallback(_grid[0][1]);
            }
            _gameOver = true;
            return true;
        }

        // Check thrid column
        if (_isWinningRow(_grid[0][2], _grid[1][2], _grid[2][2])) {
            if (_.isFunction(_reportWinnerCallback)) {
                _reportWinnerCallback(_grid[0][2]);
            }
            _gameOver = true;
            return true;
        }

        // Check diagonals 
        if (_isWinningRow(_grid[0][0], _grid[1][1], _grid[2][2])) {
            if (_.isFunction(_reportWinnerCallback)) {
                _reportWinnerCallback(_grid[0][0]);
            }
            _gameOver = true;
            return true;
        }

        if (_isWinningRow(_grid[0][2], _grid[1][1], _grid[0][2])) {
            if (_.isFunction(_reportWinnerCallback)) {
                _reportWinnerCallback(_grid[0][2]);
            }
            _gameOver = true;
            return true;
        }

        // Check if there is a draw
        if (_moves == 9) {
            if (_.isFunction(_reportWinnerCallback)) {
                _reportWinnerCallback("-");
            }
            _gameOver = true;
            return true;            
        }

        // No winner yet.
        return false;
    }

    /**
     * Calculate the computer's next move
     * 
     * @param {string} userIs The user's mark: an X or an O 
     */
    function _computerMove() {
        if (_gameOver) {
            return;
        }

        var computerMark = "O";

        if (_usersMark === "O") { computerMark = "X"; }

        if (_grid[1][1] === "-") {
            _grid[1][1] = computerMark;
            return;
        }

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (_grid[i][j] === "-") {
                    _grid[i][j] = computerMark;
                    return;
                }
            }
        }        
    }

    /**
     * Process the user's move
     * 
     * @param {string} move the coordinates of the cell clicked by the user 
     */
    function _userMove(move)
    {
        if (_gameOver) { return; }

        var coords = move.split("-");

        if (_grid[coords[0]][coords[1]] != "-") {
            return;
        }

        _grid[coords[0]][coords[1]] = _usersMark;

        if (_.isFunction(_updateCallback)) {
            _updateCallback(_grid);
        }

        _checkWinnerInterval = setInterval(_checkForWinnerCb, 200);
        _computerMoveInterval = setInterval(_computerMoveCb, 400);
    }

    /**
     * Callback to allow the computer to make a move
     * 
     */
    function _computerMoveCb() {
        _computerMove();
        if (_.isFunction(_updateCallback)) {
            _updateCallback(_grid);
        }
            
        _checkForWinner();

        clearInterval(_computerMoveInterval);
    }

    /**
     * Callback to check for a winner
     * 
     */
    function _checkForWinnerCb() {
        _checkForWinner();
        clearInterval(_checkWinnerInterval);
    }

    /**
     * Records a reference to the callback function to be used
     * to display the game state
     * 
     * @param {function} cb 
     */
    function _setUpdateCallback(cb) {
        _updateCallback = cb;
    }

    /**
     * Records a reference to the callback function to be used
     * to report the game winnder to the user
     * 
     * @param {function} cb 
     */
    function _setReportWinnerCallback(cb) {
        _reportWinnerCallback = cb;
    }

    /**
     * Sets the user's mark
     * 
     * @param {string} mark User's mark 
     */
    function _setUserMark(mark) {
        _usersMark = mark;
    }

    /**
     * Resets the game, ready to use again
     */
    function _reset() {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                _grid[i][j] = "-";
            }
        }

        if (_.isFunction(_updateCallback)) {
            _updateCallback(_grid);
        }

        _gameOver = false;
        _moves = 0;
    }

    exports.CROSS = "X";
    exports.NAUGHT = "O";
    exports.EMPTY = "-";

    exports.UserMove = function (move) {
        return _userMove(move);
    };
    exports.UpdateCallback = function (cb) {
        _setUpdateCallback(cb);
    };
    exports.ReportWinnerCallback = function (cb) {
        _setReportWinnerCallback(cb);
    };
    exports.Reset = function () {
        return _reset();
    };
    exports.SetUsersMark = function (mark) {
        return _setUserMark(mark);
    };
});