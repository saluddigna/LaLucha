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
    // console.log(arrHorarios);
    if(arrHorarios.estatus)
        return arrHorarios.horarios[0].Horarios;
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
