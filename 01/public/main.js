$(function() {
    'use strict';

    var socket = io();

    var username;

    var $loginPane = $('.pane-login');
    var $mainPane = $('.pane-main');
    var $usernameInput = $('#login-username-input');
    var $usernameView = $('#main-username-view');
    var $newTaskInput = $('#new-task-input');

    var todoItemTemplate = $("#todo-item-template").html();

    function switchToMainPane() {
        $usernameView.text($usernameInput.val());
        $loginPane.hide();
        $mainPane.show();
    }

    function onEnterPressed($inputField, callback) {
        $inputField.keypress(function(e) {
            if(e.which == 13) {
                callback(e);
            }
        });
    }

    function showNewTask(data) {
        var newTaskNode = swig.render(todoItemTemplate, {
            locals: data
        });
        $('.tasks').append(newTaskNode);
    }

    onEnterPressed($usernameInput, function() {
        username = $usernameInput.val();
        socket.emit('login', username);
        switchToMainPane();
    });

    onEnterPressed($newTaskInput, function() {
        var newTask = $newTaskInput.val();
        socket.emit('new task', newTask);
    });

    socket.on('new task', function (data) {
        showNewTask(data);
    });
});