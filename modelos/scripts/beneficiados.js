function startBeneficiados() {
    var beneficiados = getBeneficiados()
    console.log(beneficiados);
    var result = beneficiados;
    var myTable;

    myTable=$('#tablaBeneficiarios').DataTable({  
        sDom: 'lrtip',
        language: {
            "zeroRecords": "No se encontraron registros, intenta utilizar otro filtro...",
            "infoEmpty": "No se encontraron registros",
            paginate: {
                next: '<span class="glyphicon glyphicon-menu-right"></span>',
                previous: '<span class="glyphicon glyphicon-menu-left"></span>',
            }
        },
        "bLengthChange": false,
        "pagingType": "simple" ,
        "sPaginationType": "custom",
        "bAutoWidth": false,
        "scrollX": true,
        "ordering": false,    // Ordering (Sorting on Each Column)will Be Disabled
        "info": false,         // Will show "1 to n of n entries" Text at bottom
        "lengthChange": false, // Will Disabled Record number per page
        "data": result,
        "columns" : [
            { "data": "icono", render: getImg },
            { "data": "nombre" },
            { "data": "clinica" },
        ],
        drawCallback: function(){
            $('.paginate_button.next', this.api().table().container())          
               .on('click', function(){
               var info = myTable.page.info();
                  console.log(info) ;
                  $('.cdatatableDetails').remove();
                  $('.paginate_button.next').before($('<span>',{
                  'text':(info.page+1) +' de '+info.pages,
                  class:'cdatatableDetails'
                  }));
               });    
               $('.paginate_button.previous', this.api().table().container())          
               .on('click', function(){
                  var info = myTable.page.info();
                  console.log(info) ;
                  $('.cdatatableDetails').remove();
                  $('.paginate_button.next').before($('<span>',{
                  'text': (info.page+1) +' de '+info.pages,
                  class:'cdatatableDetails'
                  }));
               }); 
            }
    });
    var info = myTable.page.info();
    console.log(info) ;
    $('.cdatatableDetails').remove();
    $('.paginate_button.next').before($('<span>',{'text': (info.page+1) +' de '+info.pages,class:'cdatatableDetails'}));    


    $('#buscarPx').keyup(function(){
        myTable.search($(this).val()).draw() ;
        var info = myTable.page.info();
        console.log(info) ;
        $('.cdatatableDetails').remove();
        $('.paginate_button.next').before($('<span>',{'text': (info.pages>0? info.page+1 : 0) +' de '+info.pages,class:'cdatatableDetails'}));   
  })
}

function getImg(data, type, full, meta) {
    return '<img src="images/icono-en lista-paciente-beneficiada.svg" />';
}

