$(function () {
    var socket = io.connect();

    //Message Form
    var $chatWindowContainer = $('#chatWindowContainer');
    var $messageForm = $('#messageForm');
    var $messageTxt = $('#messageTxt');
    var $conversationMessages = $('#conversationMessages');

    //User Login Form
    var $loginFormContainer = $('#loginFormContainer');
    var $loginForm = $('#loginForm');
    var $onlineUsers = $('#onlineUsers');
    var $username = $('#username');

    $messageForm.submit(sendChat);

    // $messageTxt.on('keyup', function (e) {
    //     if (e.which == 13 || e.keyCode == 13) {
    //         //code to execute here
    //         console.log(e);            
    //         sendChat(e);
    //         return false;
    //     }
    //     return true;
    // });

    function sendChat(e) {
        e.preventDefault();
        //console.log('Send Clicked');
        socket.emit('send message', $messageTxt.val());
        $messageTxt.val('');
    }

    socket.on('new message', function (data) {
        var html = '';
        html += '<div class="well">';
        html += '<strong>' + data.userName + ': </strong>' + data.msgTxt;
        html += '</div>';
        $conversationMessages.append(html);
        scrollToBottom();
    });


    $loginForm.submit(function (e) {
        e.preventDefault();
        socket.emit('new user', $username.val(), function (data) {
            if (data) {
                $loginFormContainer.addClass('d-none');
                $chatWindowContainer.removeClass('d-none');
            }
        });
        $username.val('');
    });

    socket.on('get users', function (data) {
        var html = '';
        for (i = 0; i < data.length; i++) {
            html += '<li class="list-group-item">' + data[i] + '</li>'
        }
        $onlineUsers.html(html);
    })

});

function scrollToBottom() {
    $scrollableArea = $('#conversationMessages');
    $scrollableArea.scrollTop($scrollableArea[0].scrollHeight);
}
scrollToBottom();