function evolucion_insertas_formalizados() 
{
	$('#ev-inserta').empty();
	var serviceURL = "http://www.fulp.es/servicesfulp/evolucion_inserta_formalizados.json";
	$.getJSON(serviceURL, function(data) {

		$('#ev-inserta').append( '<table class="table table-hover">'+                                 
									'<tr>'+                                     
                                      '<td>Mes</td>'+
									  '<td>TOTAL 15</td>'+
                                      '<td>TOTAL 16</td>'+
									  '<td>ACUM 15</td>'+
									  '<td>ACUM 16</td>'+                                   									  									  
                                  '</tr>');
		
		$.each(data, function(index, dato) {
			
			$('#ev-inserta').append( '<tr>'+
                                  '<td>'+dato.MES+'</td>'+
								  '<td>'+dato.TOTAL_ANT+'</td>'+
								  '<td>'+dato.TOTAL_ACT+'</td>'+
								  '<td>'+'</td>'+
								  '<td>'+'</td>'+							  								  								    
								'</tr>');

		});
		
		$('#ev-inserta').append( '<tr>'+
                                  '<td><strong>TOTAL</strong></td>'+
								  '<td><strong></strong></td>'+
								  '<td><strong></strong></td>'+
								  '<td><strong></strong></td>'+
								  '<td><strong></strong></td>'+
								'</tr>'+
								'</table>');

	});
}