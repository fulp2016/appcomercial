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

		var cad = '<table class="table table-hover">'+
						'<thead>'+                                  
							'<tr>'+                                     
                                '<th>Mes</th>'+
								'<th>TOTAL 15</th>'+
                                '<th>TOTAL 16</th>'+
								'<th>ACUM 15</th>'+
								'<th>ACUM 16</th>'+                                   									  									  
                            '</tr>'+
						'</thead>'+	
                        '<tbody>';

		$.each(data, function(index, dato) {
			
			if(dato.MES <= mesact)
			{
				acumact = parseInt(acumact) + parseInt(dato.TOTAL_ACT);
				acumant = parseInt(acumant) + parseInt(dato.TOTAL_ANT);
				
				var increm = ((parseInt(acumact)-parseInt(acumant))/parseInt(acumant)*100);
				
				var espincrem = '&nbsp;&nbsp;';
				var signinc = '';
				if (increm > 0){signinc = '+';}else{signinc = '';}
				if (increm.length == 1){espincrem='&nbsp;&nbsp;&nbsp;&nbsp;';}
				
				if(acumact>acumant){acumact=acumact + '<span class="label label-success">';}
				else if(acumact==acumant){acumact=acumact + '<span class="label label-warning">';}
				else {acumact=acumact + '<span class="label badge-danger">';}
				
				acumact = acumact + espincrem + signinc + Math.round(increm) + '% </span>';

			}
			else 
			{
				acumact = '';
				acumant = '';
			}
			
			cad = cad + '<tr>'+
                            '<td>'+dato.MES+'</td>'+
							'<td>'+dato.TOTAL_ANT+'</td>'+
							'<td>'+dato.TOTAL_ACT+'</td>'+
							'<td>'+acumant+'</td>'+
							'<td>'+acumact+'</td>'+							  								  								    
						'</tr>';
								
			total_act = parseInt(total_act) + parseInt(dato.TOTAL_ACT);
			total_ant = parseInt(total_ant) + parseInt(dato.TOTAL_ANT);

		});
		
		cad = cad +  '<tr>'+
                        '<td><strong>TOTAL</strong></td>'+
						'<td><strong>'+total_ant+'</strong></td>'+
						'<td><strong>'+total_act+'</strong></td>'+
						'<td><strong>'+acumant+'</strong></td>'+
						'<td><strong>'+acumact+'</strong></td>'+
					'</tr>'+
				'</tbody>'+  
			'</table>';
			
		$('#ev-inserta').append(cad);	

	});
}