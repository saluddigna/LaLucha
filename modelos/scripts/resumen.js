function startResumen(){
    $("#tuplas").empty();
    //console.log(global.data);
    if(global.data.cita.Estudios.length==1){
      if(global.data.IdSucursal=="1" && global.data.cita.TipoPago!=3){
        $("#rayaHumano-masto").addClass("active");
        $("#rayaHumano-papa").removeClass("active");
        $("#rayaHumano-densi").removeClass("active");
        var estudio = $("<td width='33%'> -" +  global.data.cita.Estudios[0].Nombre + "</td>)");
        var fecha = $("<td width='33%' align='center'>" + global.data.cita.Estudios[0].Fecha + " " +global.data.cita.Estudios[0].Hora+ "</td>)");
        var precio = $("<td width='33%' align='right'> $ 210.00 </td>)");
        $("#tuplas").append("<tr>");
        $("#tuplas").append(estudio);
        $("#tuplas").append(fecha);
        $("#tuplas").append(precio);
        $("#tuplas").append("</tr>");  
        $('#descuento').text("$ 0.00");  
        $('#totalP').text("$ 210.00"); 
        return;
      }
      else if(global.data.IdSucursal!="1" && global.data.cita.TipoPago!=3){
        $("#rayaHumano-masto").addClass("active");
        $("#rayaHumano-papa").removeClass("active");
        $("#rayaHumano-densi").removeClass("active");
        var estudio = $("<td width='33%'> -" +  global.data.cita.Estudios[0].Nombre + "</td>)");
        var fecha = $("<td width='33%' align='center'>" + global.data.cita.Estudios[0].Fecha + " " +global.data.cita.Estudios[0].Hora+ "</td>)");
        var precio = $("<td width='33%' align='right'> $ 220.00 </td>)");
        $("#tuplas").append("<tr>");
        $("#tuplas").append(estudio);
        $("#tuplas").append(fecha);
        $("#tuplas").append(precio);
        $("#tuplas").append("</tr>");  
        $('#descuento').text("$ 0.00");  
        $('#totalP').text("$ 220.00"); 
        return;
      }
      $("#rayaHumano-masto").addClass("active");
      $("#rayaHumano-papa").removeClass("active");
      $("#rayaHumano-densi").removeClass("active");
      var estudio = $("<td width='33%'> -" +  global.data.cita.Estudios[0].Nombre + "</td>)");
      var fecha = $("<td width='33%' align='center'>" + global.data.cita.Estudios[0].Fecha + " " +global.data.cita.Estudios[0].Hora+ "</td>)");
      var precio = $("<td width='33%' align='right'> $ 220.00 </td>)");
      $("#tuplas").append("<tr>");
      $("#tuplas").append(estudio);
      $("#tuplas").append(fecha);
      $("#tuplas").append(precio);
      $("#tuplas").append("</tr>");  
      $('#descuento').text("$ 70.00");  
      $('#totalP').text("$ 150.00");   
      return;
    }
    else if (global.data.cita.Estudios.length==2){
      $("#rayaHumano-masto").addClass("active");
      $("#rayaHumano-papa").addClass("active");
      $("#rayaHumano-densi").removeClass("active");

        var estudio = $("<td width='33%'> -" +  global.data.cita.Estudios[0].Nombre + "</td>)");
        var fecha = $("<td width='33%' align='center'>" + global.data.cita.Estudios[0].Fecha + " " +global.data.cita.Estudios[0].Hora+ "</td>)");
        var precio = $("<td width='33%' align='right'> $ 220.00 </td>)");
        $("#tuplas").append("<tr>");
        $("#tuplas").append(estudio);
        $("#tuplas").append(fecha);
        $("#tuplas").append(precio);
        $("#tuplas").append("</tr>");  
        estudio = $("<td width='33%'> -" +  global.data.cita.Estudios[1].Nombre + "</td>)");
        fecha = $("<td width='33%' align='center'>" + global.data.cita.Estudios[1].Fecha + " " +global.data.cita.Estudios[1].Hora+ "</td>)");
        precio = $("<td width='33%' align='right'> $ 150.00 </td>)");
        $("#tuplas").append("<tr>");
        $("#tuplas").append(estudio);
        $("#tuplas").append(fecha);
        $("#tuplas").append(precio);
        $("#tuplas").append("</tr>");  
        $('#descuento').text("$ 70.00");  
        $('#totalP').text("$ 300.00"); 
    }
    else if(global.data.cita.Estudios.length==3){

      $("#rayaHumano-masto").addClass("active");
      $("#rayaHumano-papa").addClass("active");
      $("#rayaHumano-densi").addClass("active");

      $("#tuplas").append("<tr>");
      $("#tuplas").append("<td> Paquete Mujer: </td>)");
      $("#tuplas").append("<td></td>");
      $("#tuplas").append($("<td width='33%' align='right'> $ 420.00 </td>)"));
      $("#tuplas").append("</tr>");
  
      $.each(global.data.cita.Estudios, function(index, value) {       

            var estudio = $("<td width='33%'> -" +  value.Nombre + "</td>)");
            var fecha = $("<td width='33%' align='center'>" + (value.Fecha!=undefined ? value.Fecha : "Elige fecha y hora") + " " + (value.Hora!=undefined ? value.Hora:"" )+ "</td>)");
            $("#tuplas").append("<tr>");
            $("#tuplas").append(estudio);
            $("#tuplas").append(fecha);
            $("#tuplas").append("<td></td>");
            $("#tuplas").append("</tr>"); 
      })
      $('#descuento').text("$ 40.00");  
      $('#totalP').text("$ 380.00");  
    }
  }