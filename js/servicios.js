//request
function getClinicas() {
    var arrClinicas = [];
    $.ajax({
        type: 'GET',
        url: configUrl+'clinica/allClinicas',
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', sesion);
        },
        async: false,
        success: function (response) {
            arrClinicas = response;
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
    return arrClinicas;
};

function getEstados() {
    var arrEstados = [];

    $.ajax({
        type: 'GET',
        url: configUrl+'clinica/estados',
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', sesion);
        },
        async: false,
        success: function (response) {
            arrEstados = response;
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });

    return arrEstados;
};

function getHorarios(body) {
    var arrHorarios = [];

    $.ajax({
        type: 'POST',
        url: configUrl+'Citas/Citas2/HorariosDisponibles2',
        contentType: 'application/json',
        data: JSON.stringify(body),
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', sesion);
        },
        async: false,
        success: function (response) {
            arrHorarios = response;
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
    if(arrHorarios.estatus){
        arrHorarios.horarios[0].Horarios.map(x=>
        {
            var index=x.Hora.indexOf("-");
            x.Hora=x.Hora.substring(0,index);
        }
        )
        return arrHorarios.horarios[0].Horarios;
    }
    else{
        alert(arrHorarios.mensaje);
        return [];
    }
};


function getEstudio(idEstudio,idSucursal) {
    var arrEstudio = [];
    $.ajax({
        type: 'GET',
        url: configUrl+'Citas/Citas2/SubEstudiosPorSucursal?idEstudio='+idEstudio+'&idSucursal='+idSucursal+'&filtro=1&busqueda=&origen=0',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', sesion);
        },
        async: false,
        success: function (response) {
            arrEstudio = response;
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });

    return arrEstudio;
};

function Registro(data) {
    var resp = [];
    $.ajax({
        type: 'POST',
        url: configUrl+'registro',
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', sesion);
        },
        async: false,
        success: function (response) {
            resp=response;
            // arrEstudio = response;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            resp=jqXHR.responseJSON.msj;
            console.log(jqXHR);
        }
    });
    return resp;
};


function LoginService(data) {
    var resp = [];
    $.ajax({
        type: 'POST',
        url: configUrl+'login',
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', sesion);
        },
        async: false,
        success: function (response) {
            resp=response;
            // arrEstudio = response;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR,textStatus,errorThrown)
        }
    });
    return resp;
};

function recuperarContra(){
    var resp = [];
    $.ajax({
        type: 'POST',
        url: configUrl+'paciente/recuperar',
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', sesion);
        },
        async: false,
        success: function (response) {
            resp=response;
            // arrEstudio = response;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR,textStatus,errorThrown)
        }
    });
    return resp;
    
}

function cambiarContra(){
    var resp = [];
    $.ajax({
        type: 'POST',
        url: configUrl+'paciente/recuperar/segundopaso',
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', sesion);
        },
        async: false,
        success: function (response) {
            resp=response;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR,textStatus,errorThrown)
        }
    });
    return resp;
    
}

function ReagendarCita(body){
    var resp = [];
    $.ajax({
        type: 'POST',
        url: configUrl+'cita/reagendar',
        contentType: 'application/json',
        data: JSON.stringify(body),
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', sesion);
        },
        async: false,
        success: function (response) {
            resp=response;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR,textStatus,errorThrown)
        }
    });
    return resp;
}

function agregarEstudiosService(body){
    console.log(JSON.stringify(body))
    var resp = [];
    $.ajax({
        type: 'POST',
        url: configUrl+'estudios/registrar',
        contentType: 'application/json',
        data: JSON.stringify(body),
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', sesion);
        },
        async: false,
        success: function (response) {
            resp=response;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR,textStatus,errorThrown)
        }
    });
    return resp;
}

function cancelarCitaService(body){
    console.log(JSON.stringify(body))
    var resp = [];
    $.ajax({
        type: 'POST',
        url: configUrl+'cita/cancelar',
        contentType: 'application/json',
        data: JSON.stringify(body),
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', sesion);
        },
        async: false,
        success: function (response) {
            resp=response;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR,textStatus,errorThrown)
        }
    });
    return resp;
}

