$(document).ready(function () {
  $('#banner').load('../modelos/banner.html');
  $('#nav').load('../modelos/navbar.html');
  $('#seccion').load('../modelos/cita.html');

  
});

function seccion(nav){
  if(nav==1){
    $('#seccion').load('../modelos/cita.html');
    
    removerClaseNav();
    $("#btnRegistro").addClass("active");
  }else if(nav==2){
    $('#seccion').load('../modelos/revista.html');
    removerClaseNav();
    $("#btnRevista").addClass("active");
  }else if(nav==3){
    $('#seccion').load('../modelos/beneficiados.html');
    removerClaseNav();
    $("#btnPxBeneficiados").addClass("active");
  }else{
    $('#seccion').load('../modelos/logIn.html');
    removerClaseNav();
    $("#btnLogIn").addClass("active");
  }
}
function removerClaseNav(){
  $("#btnRegistro").removeClass("active");
  $("#btnRevista").removeClass("active");
  $("#btnPxBeneficiados").removeClass("active");
  $("#btnLogIn").removeClass("active");
}

