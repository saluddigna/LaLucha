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
modalInactividad=null;
intervaloMilisegundosInactividad=360000;
citasGratis=false;
// console.log(citasGratis)
startSocket();
// console.log(citasGratis)
console.log("bandera citas gratis: ",citasGratis)

try{
  dataUser=JSON.parse(sessionStorage.getItem('dataUser'));
}
catch{

}


idSesion="1dnni3hgu9iggbdktdlpfb19u4";
//conektaKey='key_fNdPxbPkqAt1xF1sYMgQF5w';
conektaKey='key_MpzazUMfWjk6XKS55qnEnNQ';

configUrl='https://b4f05a32b77f.ngrok.io/';
//configUrl='https://b903340e29bc.ngrok.io/';
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
  $(document).on("click", ".masto-cita.active", function(){
    var destino = $('#btnObtenerUbicacion');
    $('html, body').animate({ scrollTop: (destino.offset().top - 65) }, 500);
  });
  $(document).on("click", ".preguntas-titulo", function(){
    $(this).find("i").toggleClass("icono-right-open icono-down-open");
  })
  $(document).on("click", ".item-protocolo", function(){
    $(this).find("i").toggleClass("icono-mas-1 icono-minus");
  })
  console.log('dataUser',dataUser)
  $('#banner').load('./modelos/banner.html');
  $('#nav').load('./modelos/navbar.html');

  try{
    dataUser=JSON.parse(sessionStorage.getItem('dataUser'));
  }
  catch(e){
    //console.log(e);
  }
  //console.log('dataUser',dataUser)
  if(getUrlParameter('recovery')!=null){
    redirectLogin();
  }else if(getUrlParameter('token')!=null){
    body={idCita:getUrlParameter('token')}
    // //console.log(body)
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
    saveAnalytics('entrarPagina','PonElPecho','entrarEnCitas');
    removerClaseNav();
    $("#btnRegistro").addClass("active");
  }else if(nav==2){
    $('#seccion').load('./modelos/revista.html');
    saveAnalytics('entrarPagina','PonElPecho','entrarEnRevista');
    removerClaseNav();
    $("#btnRevista").addClass("active");
  }else if(nav==3){
    $('#seccion').load('./modelos/beneficiados.html',function(){
      startBeneficiados();
    });
    saveAnalytics('entrarPagina','PonElPecho','entrarEnBeneficiados');
    removerClaseNav();
    $("#btnPxBeneficiados").addClass("active");
  }else if(nav==4){
    if(!dataUser){
      redirectLogin();
      saveAnalytics('entrarPagina','PonElPecho','irInicioSesion');
    }
    else{
      irPerfil();
      saveAnalytics('entrarPagina','PonElPecho','volverPerfil');
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

async function irPerfil(parametro) { 
  $.when( agregarLoadingInputs() ).then(x=>{  
    $("#navCita4").addClass('active');
    $('#seccion').load('./modelos/perfil.html',function(){
      $("#MiPerfil").load('./modelos/componentes/miPerfil.html',function(){
        $("#sumarEstudios").load('./modelos/componentes/agregarEstudioImg.html',function(){
            clearInterval(modalInactividad);
            startPerfil();
            history.pushState(null, null, 'perfil');
        });
      });
      removerClaseNav();
      $("#btnLogIn").addClass("active");
    });
  });
}
function redirectLogin(){
  setTimeout(function() { quitarLoadingInputs(); }, 1000);
  $('#seccion').load('./modelos/logIn.html',function(){
    $("#ingresar").load('./modelos/componentes/ingresar.html',function(){
      clearInterval(modalInactividad);
      if(localStorage.getItem("cita_creada") == 1){
        localStorage.removeItem("cita_creada");
        history.pushState(null, null, 'perfil/cita-confirmada');
      }
      //console.log(getUrlParameter('recovery'));
      if(getUrlParameter('recovery')!=null){
          removerClaseNav();
          $("#btnLogIn").addClass("active");
          $("#contenedorLogIn").load('./modelos/componentes/nuevaPass.html',function(){
            //console.log('hola')
          });
        }
      });
    removerClaseNav();
    $("#btnLogIn").addClass("active");
  });
}

function olvidarContra(tipo){
  clearInterval(modalInactividad);
  if(tipo){
    $("#contenedorLogIn").load('./modelos/componentes/restablecer.html',function(){
    });
    saveAnalytics('entrarPagina','PonElPecho','Clic Olvidé mi contraseña');
  }else{
    $("#ingresar").load('./modelos/componentes/ingresar.html');
  }
}
function redirectRecuperada(){
  clearInterval(modalInactividad);
  $("#contenedorLogIn").load('./modelos/componentes/recuperada.html');
  saveAnalytics('entrarPagina','PonElPecho','Clic Recuperar Contraseña');
}
function redirectCambiarContra(){
  clearInterval(modalInactividad);
  $("#contenedorLogIn").load('./modelos/componentes/nuevaPassListo.html');
  saveAnalytics('entrarPagina','PonElPecho','cambiarContraseña');
}


async function quitarLoadingInputs(){
  await $(".overlay_loading").css("display", "none")
  return true
}

async function agregarLoadingInputs(){
  await $(".overlay_loading").css("display", "flex")
  return true
}

function scrollTop(element){
    if(element){
      $([document.documentElement, document.body]).animate({
        scrollTop: $(element).offset().top-150
      }, 500);
    }
}

function showModalSesion(){
  clearInterval(modalInactividad);
  saveAnalytics('aparecerModal','PonElPecho','ModalInactividad');
  $('#modalInatividad').modal({
    show: 'false'
  }); 
}
function inactividadSeguir(){
  modalInactividad = setInterval(showModalSesion, intervaloMilisegundosInactividad);
}

function inactividadAyuda(){
  clearInterval(modalInactividad);
}