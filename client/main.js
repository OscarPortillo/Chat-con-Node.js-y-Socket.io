var socket = io.connect('http://192.168.1.106:6677', {'forceNew' : true});
socket.on('messages', function(data) {
    render(data);
});

function render(data) {
    var html = data.map(function(message, index) {
        return (`
            <div class="message">
                <strong> ${message.nickname} </strong>
                <br>
                Dice: <span> ${message.text} </span>
            </div>
        `);
    }).join('  ');
    var div_messages = document.getElementById('messages');
    div_messages.innerHTML = html;
    div_messages.scrollTop = div_messages.scrollHeight;
}

function addMessage(e) {
    var message = {
        nickname: $('#nickname').val(),
        text: $('#text').val(),
    };

    $('#nickname').css('display', 'none');
    $('#text').val('').empty();
    socket.emit('add-message', message);
    return false;
}
