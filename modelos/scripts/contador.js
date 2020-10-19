

let data = {
    query: {}
}
var socket = io("https://socket-lucha.herokuapp.com/", data)


function startSocket(){
socket.on('MastoGratis', function (payload) {
    console.log((payload))
    $("#mastosEntregadas").text((payload.numeroMasto).toString())
    $("#mastoEntregar").text((payload.MastosAEntregar).toString())
})
}
$(document).ready(function () {
    startSocket();
});