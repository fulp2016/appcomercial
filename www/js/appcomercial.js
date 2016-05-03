function evolucion_insertas_formalizados() 
{
	var date = new Date();
	var mesact = date.getMonth()+1;
	var acumact = 0;
	var acumant = 0;
	var total_act = 0;
	var total_ant = 0;
	var total_acumact = 0;
	var total_acumant = 0;
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
		alert(mesact);
		$.each(data, function(index, dato) {
			
			/*if(dato.MES < mesact)
			{
				acumact = parseint(acumact) + parseint(dato.TOTAL_ACT);
				//acumant = acumact + dato.TOTAL_ANT;
			}
			/*else 
			{
				acumact = '';
				acumant = '';
			}*/
			
			$('#ev-inserta').append( '<tr>'+
                                  '<td>'+dato.MES+'</td>'+
								  '<td>'+dato.TOTAL_ANT+'</td>'+
								  '<td>'+dato.TOTAL_ACT+'</td>'+
								  '<td>'+acumant+'</td>'+
								  '<td>'+acumact+'</td>'+							  								  								    
								'</tr>');
								
			/*total_act = total_act + dato.TOTAL_ACT;	
			total_ant = total_ant + dato.TOTAL_ANT;
			total_acumact = total_acumact + acumact;
			total_acumant = total_acumant + acumant;*/

		});
		
		$('#ev-inserta').append( '<tr>'+
                                  '<td><strong>TOTAL</strong></td>'+
								  '<td><strong>'+total_ant+'</strong></td>'+
								  '<td><strong>'+total_act+'</strong></td>'+
								  '<td><strong>'+total_acumact+'</strong></td>'+
								  '<td><strong>'+total_acumact+'</strong></td>'+
								'</tr>'+ 
								'</table>');

	});
}