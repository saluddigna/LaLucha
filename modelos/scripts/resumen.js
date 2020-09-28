function startResumen(){
    $("#tuplas").empty();
    if(global.data.cita.Estudios.length==1){
      var estudio = $("<td width='33%'> -" +  global.data.cita.Estudios[0].Nombre + "</td>)");
      var fecha = $("<td width='33%' align='center'>" + global.data.cita.Estudios[0].Fecha + " " +global.data.cita.Estudios[0].Hora+ "</td>)");
      var precio = $("<td width='33%' align='right'> $ 150.00 </td>)");
      $("#tuplas").append("<tr>");
      $("#tuplas").append(estudio);
      $("#tuplas").append(fecha);
      $("#tuplas").append(precio);
      $("#tuplas").append("</tr>");  
      $('#totalP').text("$ 150.00");  
  
    }
    else if (global.data.cita.Estudios.length==2){
      $.each(global.data.cita.Estudios, function(index, value) {              
        var estudio = $("<td width='33%'> -" +  value.Nombre + "</td>)");
        var fecha = $("<td width='33%' align='center'>" + value.Fecha + " " + value.Hora+ "</td>)");
        var precio = $("<td width='33%' align='right'> $ 150.00 </td>)");
        $("#tuplas").append("<tr>");
        $("#tuplas").append(estudio);
        $("#tuplas").append(fecha);
        $("#tuplas").append(precio);
        $("#tuplas").append("</tr>");
      })  
      $('#totalP').text("$ 300.00"); 
    }
    else if(global.data.cita.Estudios.length==3){
      $("#tuplas").append("<tr>");
      $("#tuplas").append("<td> Paquete Mujer: </td>)");
      $("#tuplas").append("<td></td>");
      $("#tuplas").append($("<td width='33%' align='right'> $ 380.00 </td>)"));
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
      $('#totalP').text("$ 380.00");  
    }
  }