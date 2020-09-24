function agregarPapa(){
  $("#pktPapa").toggle("d-none");
};
function agregarPKT(){
  $("#pktMujer").toggle("d-none");
};

$(document).ready(function () {

});

function getTokenConekta(){
  Conekta.setPublicKey("key_MpzazUMfWjk6XKS55qnEnNQ");
  var tokenParams = {
    card: {
      number: $('#numCard').val(),
      name: $('#nameCard').val(),
      exp_year: $('#aaaa').val(),
      exp_month: $('#mm').val(),
      cvc: $('#ccv').val(),     
    }
  };
  Conekta.Token.create(tokenParams, successResponseHandler, errorResponseHandler);
  var successResponseHandler = function(token) {
    console.log(token)
  };
  var errorResponseHandler = function(error) {
    console.log(error)
  };
  console.log(tokenParams)
}