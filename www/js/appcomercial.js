function evolucion_insertas_formalizados() 
{
	var date = new Date();
	var mesact = date.getMonth()+1;
	var acumact = 0;
	var acumant = 0;
	var cad_act = '';
	var total_act = 0;
	var total_ant = 0;
	var total_acumact = 0;
	var total_acumant = 0;
	var cad_acumact = '';
	var cad_acumant = ''
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
				if(dato.TOTAL_ACT>dato.TOTAL_ANT){cad_act = dato.TOTAL_ACT + ' <span class="label label-success">&uarr;</span>';}
				else if(dato.TOTAL_ACT==dato.TOTAL_ANT){cad_act = dato.TOTAL_ACT + ' <span class="label label-warning">=</span>';}
				else{cad_act = dato.TOTAL_ACT + ' <span class="label badge-danger">&darr;</span>';}
				
				acumact = parseInt(acumact) + parseInt(dato.TOTAL_ACT);
				acumant = parseInt(acumant) + parseInt(dato.TOTAL_ANT);
				cad_acumant = acumant;
				var increm = ((parseInt(acumact)-parseInt(acumant))/parseInt(acumant)*100);
				
				var espincrem = '&nbsp;&nbsp;';
				var signinc = '';
				if (increm > 0){signinc = '+';}else{signinc = '';}
				if (increm.length == 1){espincrem='&nbsp;&nbsp;&nbsp;&nbsp;';}
				
				if(acumact>acumant){cad_acumact=acumact + espincrem + '<span class="label label-success">';}
				else if(acumact==acumant){cad_acumact=acumact + espincrem + '<span class="label label-warning">';}
				else {cad_acumact=acumact + espincrem + '<span class="label badge-danger">';}
				
				cad_acumact = cad_acumact + signinc + Math.round(increm) + '% </span>';

			}
			else 
			{
				cad_acumact = '';
				cad_acumant = '';
				cad_act = dato.TOTAL_ACT;
			}
			
			cad = cad + '<tr>'+
                            '<td>'+dato.MES+'</td>'+
							'<td>'+dato.TOTAL_ANT+'</td>'+
							'<td>'+cad_act+'</td>'+
							'<td>'+cad_acumant+'</td>'+
							'<td>'+cad_acumact+'</td>'+							  								  								    
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