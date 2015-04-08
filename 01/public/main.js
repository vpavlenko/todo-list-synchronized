$(function() {
    'use strict';

    var username;

    var $loginPane = $('.pane-login');
    var $mainPane = $('.pane-main');
    var $usernameInput = $('#login-username-input');
    var $usernameView = $('#main-username-view');

    function switchToMainPane() {
        $usernameView.text($usernameInput.val());
        $loginPane.hide();
        $mainPane.show();
    }

    $usernameInput.keypress(function(e) {
        if(e.which == 13) {
            username = $usernameInput.val();
            switchToMainPane();
        }
    });
});