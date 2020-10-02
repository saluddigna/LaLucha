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
dataUser=null
try{
  dataUser=JSON.parse(sessionStorage.getItem('dataUser'));
}
catch{

}


idSesion="1dnni3hgu9iggbdktdlpfb19u4";
conektaKey='key_fNdPxbPkqAt1xF1sYMgQF5w';

configUrl='https://la-lucha-sd.herokuapp.com/';
sesion='Basic bGFsdWNoYXNkOll2RF4mSGlCNmQ4N2FeWlh4d0Vo';



getUrlParameter = function getUrlParameter(sParam) {
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

$(function (a) {
  (a.datepicker.regional.es = {
      closeText: "Cerrar",
      prevText: "&#x3c;Ant",
      nextText: "Sig&#x3e;",
      currentText: "Hoy",
      monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      dayNames: ["Domingo", "Lunes", "Martes", "Mi&eacute;rcoles", "Jueves", "Viernes", "S&aacute;bado"],
      dayNamesShort: ["Dom", "Lun", "Mar", "Mi&eacute;", "Juv", "Vie", "S&aacute;b"],
      dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "S&aacute;"],
      weekHeader: "Sm",
      dateFormat: "dd-mm-yy",
      firstDay: 1,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: "",
  }),
      a.datepicker.setDefaults(a.datepicker.regional.es);
});

$(document).ready(function () {
  console.log('dataUser',dataUser)
  $('#banner').load('./modelos/banner.html');
  $('#nav').load('./modelos/navbar.html');

  try{
    dataUser=JSON.parse(sessionStorage.getItem('dataUser'));
  }
  catch(e){
    console.log(e);
  }
  console.log('dataUser',dataUser)
  if(getUrlParameter('recovery')!=null){
    redirectLogin();
  }else if(getUrlParameter('token')!=null){
    body={idCita:getUrlParameter('token')}
    // console.log(body)
    dataUser=loginFromUrlService(body);
    sessionStorage.clear();  
    sessionStorage.setItem('dataUser', JSON.stringify(dataUser));
    irPerfil();
  }
  else if(!dataUser){
    seccion(1);
    }
    else{
      irPerfil()
    }
});

function seccion(nav){
  if(nav==1){
    $('#seccion').load('./modelos/cita.html'); 
    removerClaseNav();
    $("#btnRegistro").addClass("active");
  }else if(nav==2){
    $('#seccion').load('./modelos/revista.html');
    removerClaseNav();
    $("#btnRevista").addClass("active");
  }else if(nav==3){
    $('#seccion').load('./modelos/beneficiados.html');
    removerClaseNav();
    $("#btnPxBeneficiados").addClass("active");
  }else if(nav==4){
    if(!dataUser){
      redirectLogin();
    }
    else{
      irPerfil();
    }
  }
  else{
    redirectLogin();
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
  $("#navCita4").addClass('active');
	$('#seccion').load('./modelos/perfil.html',function(){
    $("#MiPerfil").load('./modelos/componentes/miPerfil.html',function(){
      $("#sumarEstudios").load('./modelos/componentes/agregarEstudioImg.html',function(){
      startPerfil();
      });
    });
    removerClaseNav();
    $("#btnLogIn").addClass("active");
  });
}
function redirectLogin(){
  $('#seccion').load('./modelos/logIn.html',function(){
    $("#ingresar").load('./modelos/componentes/ingresar.html',function(){
      console.log(getUrlParameter('recovery'));
      if(getUrlParameter('recovery')!=null){
          removerClaseNav();
          $("#btnLogIn").addClass("active");
          $("#contenedorLogIn").load('./modelos/componentes/nuevaPass.html',function(){
            console.log('hola')
          });
        }
      });
    removerClaseNav();
    $("#btnLogIn").addClass("active");
  });
}

function olvidarContra(tipo){
  if(tipo){
    $("#contenedorLogIn").load('./modelos/componentes/restablecer.html',function(){
    });
  }else{
    $("#ingresar").load('./modelos/componentes/ingresar.html');
  }
}
function redirectRecuperada(){
  $("#contenedorLogIn").load('./modelos/componentes/recuperada.html');
}
function redirectCambiarContra(){
  $("#contenedorLogIn").load('./modelos/componentes/nuevaPassListo.html');
}


function quitarLoadingInputs(){
  $(".overlay_loading").css("display", "none")
}

function agregarLoadingInputs(){
  $(".overlay_loading").css("display", "flex")
}
