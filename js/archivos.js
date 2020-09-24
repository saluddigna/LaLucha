var cita = 0;

$(document).ready(function () {
    $('#infoCita').load('./modelos/componentes/infoCita.html');
    $('#formCita').load('./modelos/componentes/formCita.html');
    $('#ingresar').load('./modelos/componentes/ingresar.html');
    $(document).on("blur", ".cajas-texto .input-sd", function(){
			console.log('Hola?');
			if ($(this).val() != "") {
					$(this).addClass("valido");
			} else {
					$(this).removeClass("valido");
			}
	})
});

// function realizarCita(tipo){
//     if(tipo){
//         $('#citas').load('./modelos/componentes/pago.html');
//     }
// };
