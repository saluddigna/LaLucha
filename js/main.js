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
dataUser=JSON.parse(sessionStorage.getItem('dataUser'));

idSesion="1dnni3hgu9iggbdktdlpfb19u4";
conektaKey='key_MpzazUMfWjk6XKS55qnEnNQ';

configUrl='https://la-lucha-sd-beta.herokuapp.com/';
sesion='Basic bGFsdWNoYXNkOll2RF4mSGlCNmQ4N2FeWlh4d0Vo';

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
  }
};

$(document).ready(function () {
  $('#banner').load('../modelos/banner.html');
  $('#nav').load('../modelos/navbar.html');
  console.log(dataUser);
  console.log(getUrlParameter('recovery'));

  if(getUrlParameter('recovery')!=null){
    $('#seccion').load('../modelos/logIn.html',function(){
      removerClaseNav();
      $("#btnLogIn").addClass("active");
      $("#contenedorLogIn").load("../modelos/componentes/nuevaPass.html",function(){
        console.log('hola')
      });
    });
  }else if(!dataUser){
    $('#seccion').load('../modelos/logIn.html',function(){
      removerClaseNav();
      $("#btnLogIn").addClass("active");
    });
  }
  else{
    irPerfil();
  }

  
  
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
  }else if(nav==5){
    if(!dataUser){
      $('#seccion').load('../modelos/logIn.html',function(){
        removerClaseNav();
        $("#btnLogIn").addClass("active");
      });
    }
    else
      irPerfil();
    }
  else{
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
  $("#btnPerfil").removeClass("active");

}

$(document).on("click", ".movilNav", function(){
  $("#movilNav").toggleClass("d-flex");
})

function irPerfil(parametro) { 
	$('#seccion').load('./modelos/perfil.html',function(){
    removerClaseNav();
    $("#btnPerfil").addClass("active");
  });
}

  // 
