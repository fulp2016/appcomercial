function evolucion_insertas_formalizados() 
{
	$('#ev-inserta').empty();
	var serviceURL = "http://www.fulp.es/servicesfulp/evolucion_inserta_formalizados.json";
	$.getJSON(serviceURL, function(data) {

		$('#ev-inserta').append( '<table class="table table-hover">'+                                 
									'<tr>'+                                     
                                      '<th>Mes</th>'+
									  '<th>TOTAL 15</th>'+
                                      '<th>TOTAL 16</th>'+
									  '<th>ACUM 15</th>'+
									  '<th>ACUM 16</th>'+                                   									  									  
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