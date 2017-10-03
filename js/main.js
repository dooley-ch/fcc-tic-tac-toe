requirejs.config({
    shim : {
        semantic: {
            deps : ["jquery"]
        }
    },

    paths: {
        jquery: "libs/jquery/dist/jquery.min",
        lodash: "libs/lodash/dist/lodash.min",
        semantic: "libs/semantic/dist/semantic.min"
    }
});

define("main", function (require, exports) {
    "use strict";

    var $ = require("jquery");
    require("semantic");
    var _ttt = require("tic-tac-toe");

    // User's mark
    var _userIs = _ttt.CROSS;

    // A reference to the X selection button
    var _setXBtn = $("#set_x_button");

    // A reference to the Y selection button
    var _setOBtn = $("#set_o_button");

    // A reference to the reset button
    var _resetBtn = $("#reset_button");

    // A reference to the mobile template
    var _phoneTemplate = $("#phoneTemplate").html();

    // A reference to the desktop template
    var _computerTemplate = $("#computerTemplate").html();

    /**
     * Sets the user mark to X
     * 
     */
    function _setUserToX () {
        _userIs = _ttt.CROSS;

        _setXBtn.removeClass("grey");
        _setXBtn.addClass("blue");

        _setOBtn.removeClass("blue");
        _setOBtn.addClass("grey");

        _ttt.Reset();
        _ttt.SetUsersMark(_ttt.CROSS);
    }

    /**
     * Sets the user mark to O
     * 
     */
    function _setUserToO () {
        _userIs = _ttt.NAUGHT;

        _setXBtn.removeClass("blue");
        _setXBtn.addClass("grey");

        _setOBtn.removeClass("grey");
        _setOBtn.addClass("blue");

        _ttt.Reset();
        _ttt.SetUsersMark(_ttt.NAUGHT);
    }

    /**
     * Responds to the user clicking on a cell
     * 
     * @param {object} e 
     */
    function _onCellClicked(e) {
        var cell = e.currentTarget.dataset.cell;
        _ttt.UserMove(cell, _userIs);
    }

    /**
     * Changes the image in a given cell to the requested one
     * 
     * @param {string} cellId The html id of the cell to change 
     * @param {any} cellValue - the required image type: X, 0, ?
     */
    function _setCellImage(cellId, cellValue) {
        var img = "img/q.png";

        if (cellValue === _ttt.CROSS) {
            img = "img/x.png";
        }

        if (cellValue === _ttt.NAUGHT) {
            img = "img/o.png";
        }

        $(cellId).attr("src", img);
    }

    /**
     * Reset the game when the button is clicked
     * 
     */
    function _resetGame() {
        _ttt.Reset();
    }

    /**
     * Updates the page with the current status of the game
     * 
     * @param {array} grid 
     */
    function _updateDisplay(grid) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var cellValue = grid[i][j];
                var cellId = "#img-" + i + "-" + j;

                _setCellImage(cellId, cellValue);
            }
        }
    }

    /**
     * Tell the user who has won the game
     * 
     * @param {string} winner An X or an O, indicating who won 
     */
    function _reportWinner(winner) {
        if (winner === _ttt.EMPTY) {
            return alert("It's a draw!");
        }

        if (winner == _userIs) {
            return alert("Congratulations, you have won!");
        }

        alert("Commiserations, the computer wins");
    }

    /**
     * This function initializes the applicaiton
     *
     */
    function _init() {
        _ttt.UpdateCallback(_updateDisplay);
        _ttt.ReportWinnerCallback(_reportWinner);

        _setXBtn.click(_setUserToX);
        _setOBtn.click(_setUserToO);
        _resetBtn.click(_resetGame);

        $(".game-cell").click(_onCellClicked);
    }

    exports.init = function () {
        _init();
    };
});

requirejs(["main"], function (main) {
    "use strict";
    main.init();
});
