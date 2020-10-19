//request
function showError(){
    try{
        $("#errorSitio").show();
    }catch(e){}
}

function hideError(){
    try{
        $("#errorSitio").hide();
    }
    catch(e){}
}

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
            hideError();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            showError();
        }
    });
    console.log("respuesta getclincas:",arrClinicas)
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
            hideError();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            showError();
        }
    });
    console.log("respuesta getEstados:",arrEstados)
    return arrEstados;
};


function getBeneficiados() {
    var result = [];
    $.ajax({
        type: 'GET',
        url: configUrl+'paciente/beneficiados',
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', sesion);
        },
        async: false,
        success: function (response) {
            result = response;
            hideError();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            showError();
        }
    });
    console.log("respuesta getBeneficiados:",result)
    return result;
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
            hideError();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            showError();
        }
    });
    //console.log(arrHorarios);
    if(arrHorarios.estatusAPI && arrHorarios.estatus){
        arrHorarios.horarios[0].Horarios.map(x=>
        {
            var index=x.Hora.indexOf("-");
            x.Hora=x.Hora.substring(0,index);
        }
        )
        return arrHorarios.horarios[0].Horarios;
    }
    else{
        console.log(arrHorarios.mensaje);
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
            // Papanicolaou
            if(response.data[0].EstudioID == 4){
                var arreglo_papa = [];
                response.data.forEach(function(value, index){
                    var subestudio = value.Descripcion.toUpperCase();
                    if(subestudio.indexOf("LIQUIDA") > 0){
                        arreglo_papa.push(value);
                    }
                })

                response.data = arreglo_papa;
            }

            arrEstudio = response;
            hideError();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            showError();
        }
    });
    console.log("respuesta getEstudios:",arrEstudio)
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
            hideError();
            // arrEstudio = response;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            resp=jqXHR.responseJSON.msj;
            console.log(jqXHR);
            showError();

        }
    });
    console.log("respuesta Registro:",resp)
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
    console.log("respuesta Login:",resp)
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
    console.log("respuesta recuperarContra:",resp)
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
    console.log("respuesta cambiar contra:",resp)
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
            resp=null
            console.log(jqXHR,textStatus,errorThrown)
        }
    });
    console.log("respuesta Reagendar:",resp)
    return resp;
}

function agregarEstudiosService(body){
    //console.log(JSON.stringify(body))
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
    console.log("respuesta AgregarEstudios:",resp)
    return resp;
}

function cancelarCitaService(body){
    //console.log(JSON.stringify(body))
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
    console.log("respuesta cancelarCitaService:",resp)
    return resp;
}



function getPerfil(body){
    // //console.log(JSON.stringify(body))
    var resp = [];
    $.ajax({
        type: 'POST',
        url: configUrl+'paciente/perfil',
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
    console.log("respuesta getPerfil:",resp)
    return resp;
}

function loginFromUrlService(body){
    // //console.log(JSON.stringify(body))
    var resp = [];
    $.ajax({
        type: 'POST',
        url: configUrl+'paciente/cita/loginporcita',
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
    console.log("respuesta loginFromUrlService:",resp)
    return resp;
}


function validaCorreoService(body){
    console.log(JSON.stringify(body))
    var resp = [];
    $.ajax({
        type: 'POST',
        url: configUrl+'paciente/verificar/correo',
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
    console.log("respuesta validaCorreo:",resp)
    return resp;
}

