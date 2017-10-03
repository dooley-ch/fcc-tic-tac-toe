define("tic-tac-toe", function (require, exports) {
    "use strict";

    var _ = require("lodash");

    // Holds a representation of the movements by the players in the game
    var _gridFlags = [
        ["-", "-", "-"],
        ["-", "-", "-"], 
        ["-", "-", "-"]
    ];

    // A reference to the callback function used to update the display
    var _updateCallback = null;

    // A reference to the callback function used to inform the user of the winner
    var _reportWinnerCallback = null;

    /**
     * Check's if someone has won the game
     * 
     * @param {string} userIs The user's mark: an X or an O 
     */
    function _checkForWinner(userIs) {
        return false;
    }

    /**
     * Calculate the computer's next move
     * 
     * @param {string} userIs The user's mark: an X or an O 
     */
    function _computerMove(userIs) {
    }

    /**
     * Process the user's move
     * 
     * @param {string} move the coordinates of the cell clicked by the user 
     * @param {string} userIs the users mark: an X or an O
     */
    function _userMove(move, userIs)
    {
        var coords = move.split("-");

        if (_gridFlags[coords[0]][coords[1]] != "-") {
            return;
        }

        _gridFlags[coords[0]][coords[1]] = userIs;

        if (_.isFunction(_updateCallback)) {
            _updateCallback(_gridFlags);
        }

        if (!_checkForWinner(userIs)) {
            _computerMove(userIs);
            _checkForWinner(userIs);
        }
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
     * Resets the game, ready to use again
     */
    function _reset() {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                _gridFlags[i][j] = "-";
            }
        }

        if (_.isFunction(_updateCallback)) {
            _updateCallback(_gridFlags);
        }
    }

    exports.CROSS = "X";
    exports.NAUGHT = "O";
    exports.EMPTY = "-";

    exports.UserMove = function (move, userIs) {
        return _userMove(move, userIs);
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
});