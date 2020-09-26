var cita = 0;
var paso = 0;

$(document).ready(function () {
  $("#infoCita").load("./modelos/componentes/infoCita.html", function () {});
  $("#formCita").load("./modelos/componentes/formCita.html", function () {
    paso = 1;
    setPaso();
		cambioPaso();
		//$("#citas").load("./modelos/componentes/pago.html");
  });
  $("#ingresar").load("./modelos/componentes/ingresar.html");
  $("#MiPerfil").load("./modelos/componentes/miPerfil.html");
  $(document).on("blur", ".cajas-texto .input-sd", function () {
    console.log("Hola?");
    if ($(this).val() != "") {
      $(this).addClass("valido");
    } else {
      $(this).removeClass("valido");
    }
  });
});

function seguientePaso() {
  if(paso<3){
    paso++;
    setPaso();
    cambioPaso();
  }  
}

function anteriorPaso() {
  if(paso>1){
    paso--;
    setPaso();
    cambioPaso();
  }  
}


function setPaso() {
  var text = paso + " de 3";
  console.log(text)
  $("#pag").text(text);
}

function cambioPaso(){
  console.log(paso);
  if(paso == 1) {
    getValues();
    console.log(global.data);
    $("#citas").load("./modelos/componentes/citaPaquetes.html");
  } 
  else if (paso == 2) {
    getValues();
    console.log(global.data);
    $("#citas").load("./modelos/componentes/citaPaciente.html");
  } else if (paso == 3) {
    $("#citas").load("./modelos/componentes/pago.html");
  }else if(paso==4){
    getTokenConekta();
  }
}