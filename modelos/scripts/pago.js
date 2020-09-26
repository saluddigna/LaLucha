console.log('listo-pago');
Conekta.setPublicKey(conektaKey);

function startPago(){
  var dataConfirmacion=global.data;
  console.log(global.data)
  $('#nombrePX').text(dataConfirmacion.Nombre+' '+dataConfirmacion.Paterno+' '+dataConfirmacion.Materno);  
  $('#fechaNacPX').text(dataConfirmacion.FechaNacimiento);  
  $('#telefonoPX').text(dataConfirmacion.Telefono);  
  $('#correoPX').text(dataConfirmacion.CorreoElectronico);  
  $('#clinicaPX').text(global.dataClinica);  
}


function saveValuesPago(){
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
  // console.log(tokenParams)
}
var successResponseHandler = function(token) {
  global.data.cita.EstatusLaboratorio=false;
  global.data.cita.CondicionFolios=1000;
  global.data.cita.TipoPago=3;
  global.data.cita.TextoDeSuma="Total por obtener tu cita en línea:";
  // console.log(global.data);

  global.data.cita.DatosPago={
    Correo:global.data.CorreoElectronico,
    Nombre:$('#nameCard').val(),
    Precio:0,
    Referencia:"",
    Telefono:global.data.Telefono,
    Token:token.id,
    conektaTokenId:""
  }
  
  console.log(global.data);
  };

var errorResponseHandler = function(error) {
  console.log(error,'error')
};