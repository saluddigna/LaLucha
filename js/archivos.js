var cita = 0;
var paso=1;

$(document).ready(function () {
    $('#infoCita').load('./modelos/componentes/infoCita.html',function(){});
    $('#formCita').load('./modelos/componentes/formCita.html',function(){
		setPaso();
	});
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

function setPaso() {
	var text = paso + " de 3";
	$('#pag').text(text);  
}

function realizarCita(){
    if(paso==1){
		getValues();
		paso++;
		setPaso();

		console.log(global.data)
        $('#citas').load('./modelos/componentes/pago.html');
	}
	else if(paso==2){
		getTokenConekta();
	}
};
