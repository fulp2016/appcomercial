
function numero_perfiles_solicitantes()
{ 
	$('#inserta').empty();
	$('#empleo').empty();
	$('#practica').empty();
	$('#empresas').empty();
	var serviceURL = "http://www.fulp.es/servicesfulp/numero_perfiles_solicitantes.json";
	$.getJSON(serviceURL, function(data) {

			$('#inserta').append('<span>'+data.PERFILES_INSERTA+'</span>Inserta');
			$('#empleo').append('<span>'+data.PERFILES_EMPLEO+'</span>Empleo');
			$('#practica').append('<span>'+data.PERFILES_PRACTICA+'</span>Prácticas');

	});
	
	var serviceURL2 = "http://www.fulp.es/servicesfulp/numero_empresas_empleo.json";
	$.getJSON(serviceURL2, function(data2) {

			$('#empresas').append('<span>'+data2.NUMERO_EMPRESAS+'</span>Empresas');

	});
}

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

		var cad = '<table class="table table-hover" style="font-size:12px !important">'+
						'<thead>'+                                  
							'<tr>'+                                     
                                '<th>M</th>'+
								'<th>T15</th>'+
                                '<th>T16</th>'+
								'<th>ACU15</th>'+
								'<th>ACU16</th>'+                                   									  									  
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

function resumen_relaciones()
{
	
	var cad = '';
	$('#rel-fomalizadas').empty();
	var serviceURL = "http://www.fulp.es/servicesfulp/resumen_relaciones.json";
	$.getJSON(serviceURL, function(data) {
		
		cad = '<table class="table table-hover" style="font-size:12px !important">'+
				'<thead>'+                              
					'<tr>'+                                      
						'<th>TIPO</th>'+
						'<th>2015</th>'+                                     
						'<th>2016</th>'+                                    
					'</tr>'+
				'</thead>'+
				'<tbody>';
	
		$.each(data, function(index, dato) {
			
			cad = cad +
				'<tr>'+
					'<td>'+dato.TIPO+'</td>'+
					'<td>'+dato.ANTERIOR+'</td>'+
					'<td>'+dato.ACTUAL+'</td>'+
				'</tr>';
		});
		
		cad = cad +
				'</tbody>'+
			'</table>';
			
		$('#rel-fomalizadas').append(cad);		
	});
}

function evolucion_alta_solicitantes()
{
	var date = new Date();
	var mesact = date.getMonth()-1;
	var cad = '';
	$('#ev-alta-soli').empty();
	var serviceURL = "http://www.fulp.es/servicesfulp/evolucion_alta_solicitantes.json";
	$.getJSON(serviceURL, function(data) {
		
		cad = '<table class="table table-hover" style="font-size:12px !important">'+
				'<thead>'+                              
					'<tr>'+                                      
						'<th>MES</th>'+
						'<th>A&Ntilde;O</th>'+
						'<th>INSERTA</th>'+                                   
						'<th>EMPLEO</th>'+ 
						'<th>PR&Aacute;C</th>'+                               
					'</tr>'+
				'</thead>'+
				'<tbody>';
	
		$.each(data, function(index, dato) {
			if(dato.MES >= mesact)
			{
				cad = cad +
					'<tr>'+
						'<td>'+dato.MES+'</td>'+
						'<td>'+dato.EJERCICIO+'</td>'+
						'<td>'+dato.ALTA_INSERTA+'</td>'+
						'<td>'+dato.ALTA_EMPLEO+'</td>'+
						'<td>'+dato.ALTA_PRACTICA+'</td>'+
					'</tr>';
			}
		});
		
		cad = cad +
				'</tbody>'+
			'</table>';
			
		$('#ev-alta-soli').append(cad);		
	});
}

function evolucion_alta_empresas()
{
	var date = new Date();
	var mesact = date.getMonth()-1;
	var cad = '';
	$('#ev-alta-emp').empty();
	var serviceURL = "http://www.fulp.es/servicesfulp/evolucion_alta_empresas.json";
	$.getJSON(serviceURL, function(data) {
		
		cad = '<table class="table table-hover" style="font-size:12px !important">'+
				'<thead>'+                              
					'<tr>'+                                      
						'<th>MES</th>'+
						'<th>A&Ntilde;O</th>'+
						'<th>ONLINE</th>'+                                   
						'<th>TOTAL</th>'+                            
					'</tr>'+
				'</thead>'+
				'<tbody>';
	
		$.each(data, function(index, dato) {
			if(dato.MES >= mesact)
			{
				cad = cad +
					'<tr>'+
						'<td>'+dato.MES+'</td>'+
						'<td>'+dato.EJERCICIO+'</td>'+
						'<td>'+dato.ALTA_ONLINE+'</td>'+
						'<td>'+dato.TOTAL+'</td>'+
					'</tr>';
			}
		});
		
		cad = cad +
				'</tbody>'+
			'</table>';
			
		$('#ev-alta-emp').append(cad);		
	});
}
