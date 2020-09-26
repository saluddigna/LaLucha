global={};
global.data={}
global.data.cita={};
global.data.cita.Estudios=[];
global.clinicas=[];
global.estados=[];
global.dataClinica=[];
mastografia=null;
densitometria=null;
papanicolao=null;
global.perfil={};

idSesion="1dnni3hgu9iggbdktdlpfb19u4";
conektaKey='key_MpzazUMfWjk6XKS55qnEnNQ';

configUrl='https://la-lucha-sd-beta.herokuapp.com/';
sesion='Basic bGFsdWNoYXNkOll2RF4mSGlCNmQ4N2FeWlh4d0Vo';

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

$(document).on("click", ".movilNav", function(){
  $("#movilNav").toggleClass("d-flex");
})

function irPerfil(parametro) {
	$('#seccion').load('./modelos/perfil.html');
	console.log(parametro);
}