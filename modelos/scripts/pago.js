

$(document).ready(function () {
  var dataConfirmacion=global.data;
  $('#nombrePX').text(dataConfirmacion.Nombre+' '+dataConfirmacion.Paterno+' '+dataConfirmacion.Materno);  
  $('#fechaNacPX').text(dataConfirmacion.FechaNacimiento);  
  $('#telefonoPX').text(dataConfirmacion.Telefono);  
  $('#correoPX').text(dataConfirmacion.CorreoElectronico);  
  $('#clinicaPX').text(global.dataClinica);  
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
};

function tipoPago(tipo){
  if(tipo==2){
    $("#pagoLinea").removeClass("active");
    $("#pagoClinica").addClass("active");
    $("#datosPagar").addClass("d-none");
  }else{
    $("#pagoLinea").addClass("active");
    $("#pagoClinica").removeClass("active");
    $("#datosPagar").removeClass("d-none");
  }
};