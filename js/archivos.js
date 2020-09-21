var cita = 0;

$(document).ready(function () {
    $('#infoCita').load('./modelos/componentes/infoCita.html');
    $('#formCita').load('./modelos/componentes/formCita.html');
    $('#ingresar').load('./modelos/componentes/ingresar.html');
    
});

function realizarCita(tipo){
    if(tipo){
        $('#citas').load('./modelos/componentes/pago.html');
    }
};
realizarCita(true);