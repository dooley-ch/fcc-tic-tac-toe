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

    var _userIs = _ttt.CROSS;

    var _setXBtn = $("#set_x_button");
    var _setOBtn = $("#set_o_button");

    function _disableUserButtons () {
        _setXBtn.addClass("disabled");
        _setOBtn.addClass("disabled");
    }

    function _enableUserButtons () {
        _setXBtn.removeClass("disabled");
        _setOBtn.removeClass("disabled");
    }

    function _setUserToX () {
        _userIs = _ttt.CROSS;

        _setXBtn.removeClass("grey");
        _setXBtn.addClass("blue");

        _setOBtn.removeClass("blue");
        _setOBtn.addClass("grey");
    }

    function _setUserToO () {
        _userIs = _ttt.NAUGHT;

        _setXBtn.removeClass("blue");
        _setXBtn.addClass("grey");

        _setOBtn.removeClass("grey");
        _setOBtn.addClass("blue");
    }

    function _onCellClicked(e) {
        var cell = e.currentTarget.dataset.cell;

        _disableUserButtons();

        alert(cell);
    }

    /**
     * This function initializes the applicaiton
     *
     * @return {void}
     */
    function _init() {
        _setXBtn.click(_setUserToX);
        _setOBtn.click(_setUserToO);

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
