
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
			$('#practica').append('<span>'+data.PERFILES_PRACTICA+'</span>Pr&aacute;cticas');

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

function listado_empresas(a)
{ 
	$('#list-empresas').empty();
	var cad = '';
	var clase = 'l1';
	var serviceURL = "http://www.fulp.es/servicesfulp/listado_busqueda_empresas.json?txt="+a;
	$.getJSON(serviceURL, function(data) {
		$.each(data, function(index, dato) {
			if(clase == 'l1'){clase = 'l2';} else {clase = 'l1';}
			cad = cad + '<div class="empresa '+ clase +'">'+
					'<div class="grupo">'+
					'<div class="nombre-empresa">'+dato.NOMBRE_EMPRESA+'</div>'+
					'<div class="nif-empresa"><b>CIF:</b> '+dato.NIF+'</div>'+
					'</div>'+
					'<div class="enlace-empresa"><a data-role="button" onclick="window.location.href=\'ficha_empresa.html?cod_entidad='+dato.COD_ENTIDAD+'&cod_unidad='+dato.COD_UNIDAD+'\'"><img src="img/bdestacado.png"></a></div>'+
					'</div>';
		});
		
		$('#list-empresas').append(cad);
	});
		
}

function datos_ficha_empresas(a,b)
{ 
	$('#cabecera').empty();
	$('#ficha-empresas').empty();
	var cad = '';
	var clase = 'l1';
	var serviceURL = "http://www.fulp.es/servicesfulp/obtener_datos_entidad.json?cod_entidad="+a+"&cod_unidad="+b;
	$.getJSON(serviceURL, function(data) {
		
		cad = '<table class="tabla_empresa">'+
				'<tr>'+
					'<td class="titulo"><b>CIF</b></td>'+
					'<td>'+data.NIF+'</td>'+
				'</tr>'+
				'<tr>'+	
					'<td class="titulo"><b>Tipo: </b></td>'+
					'<td>'+data.DENOMINACION_TIPO_ENTIDAD+'</td>'+
				'</tr>'+
				'<tr>'+
					'<td class="titulo"><b> Tel&eacute;fonos: </b></td>'+
					'<td>'+data.TELEFONO1+' - '+data.TELEFONO2+'</td>'+
				'</tr>'+
				'<tr>'+
					'<td class="titulo"><b> E-mail: </b></td>'+
					'<td>'+data.EMAIL_NOTIFICACION+'</td>'+
				'</tr>'+
				'<tr>'+
					'<td class="titulo"> <b> Direcci&oacute;n: </b></td>'+
					'<td>'+data.DOMICILIO+'</td>'+
				'</tr>'+
				'<tr>'+
					'<td class="titulo"><b> Actividad: </b></td>'+
					'<td>'+data.DENOMINACION_ACTIVIDAD+'</td>'+
				'</tr>'+
				'<tr>'+	
					'<td class="titulo"><b>Web: </b></td>'+
					'<td>'+data.WEB+'</td>'+
					''+
				'</tr>'+
			'</table>';
		$('#cabecera').append(data.NOMBRE_EMPRESA);
		$('#ficha-empresas').append(cad);
	});
}

function obt_contactos_empresa(a,b)
{
	$('#contacto-empresa').empty();
	var cad = '';
	var clase = 'l1';
	var serviceURL = "http://www.fulp.es/servicesfulp/obtener_contactos_entidad.json?cod_entidad="+a+"&cod_unidad="+b;
	$.getJSON(serviceURL, function(data) {
				
			cad = '<table class="contactos_empresa">'+
					'<tr>'+
						'<th colspan="2">Personas de contacto</th>'+
					'<tr>';
					
		$.each(data, function(index, dato) {
			if(clase == 'l1'){clase = 'l2';} else {clase = 'l1';}
			cad = cad + 
					'<tr>'+
						'<td colspan="2" class="titulo '+clase+'">'+dato.NOMBRE_CONTACTO+' <br> <span class="sub-dep">'+dato.DESCRIPCION_CONTACTO+'</span></td>'+
					'</tr>'+
					'<tr>'+
						'<td class="'+clase+'">';
						
						if(dato.TELEFONO_CONTACTO){
							cad = cad + '<a data-inline="true"  href="tel:'+dato.TELEFONO_CONTACTO.replace(/[-.]/gi,'')+'">'+dato.TELEFONO_CONTACTO.replace(/[-.]/gi,'')+'</a>';
						}
						
						if((dato.TELEFONO_CONTACTO)&&(dato.MOVIL_CONTACTO)){cad = cad + '  &nbsp;&nbsp; ';}
						
						if(dato.MOVIL_CONTACTO){
							cad = cad + '<a data-inline="true"  href="tel:'+dato.MOVIL_CONTACTO.replace(/[-.]/gi,'')+'">'+dato.MOVIL_CONTACTO.replace(/[-.]/gi,'')+'</a>';
						}
						
						cad = cad + '</td>'+
						'<td class="'+clase+'">';
						
						if(dato.EMAIL_CONTACTO){
							cad = cad + '<a data-inline="true"  href="mailto:'+dato.EMAIL_CONTACTO+'">'+dato.EMAIL_CONTACTO+'</a>';
						}
						
						cad = cad + '</td>'+
					'</tr>';	
		});
		
			cad = cad +
					'</table>';
					
			$('#contacto-empresa').append(cad);	
	});
}	

function historial_ucefe_empresa(a,b)
{  
	var cad = '';
	var clase = 'l1';
	var tbecas = 0; var tpractica = 0; var tpcurri = 0; var tcat = 0; var tsbeca = 0; var tspract = 0; var tsempleo = 0; 
	$('#ucefe-empresa').empty();	
	var serviceURL = "http://www.fulp.es/servicesfulp/historial_ucefe_empresas.json?cod_entidad="+a+"&cod_unidad="+b;
	$.getJSON(serviceURL, function(data) {
		
		cad = '<table class="table table-hover" style="font-size:12px !important">'+
					'<thead>'+ 
					'<tr>'+
						'<td class="titulo"></td>'+
						'<td class="titulo">INSERTA</td>'+
						'<td class="titulo">PRACT</td>'+
						'<td class="titulo">P.CURRI.</td>'+
						'<td class="titulo">CATALIZA</td>'+
						'<td class="titulo">S.INSERTA</td>'+
						'<td class="titulo">S.PR&Aacute;CT</td>'+
						'<td class="titulo">S.EMPLEO</td>'+
					'</tr>'+
					'</thead>'+
					'<tbody>';	
		
		$.each(data, function(index, dato) {
			
			if(clase == 'l1'){clase = 'l2';} else {clase = 'l1';}
			cad = cad +
					'<tr>'+
						'<td class="'+clase+'">'+dato.EJERCICIO+'</td>'+
						'<td class="'+clase+'">'+dato.BECAS+'</td>'+
						'<td class="'+clase+'">'+dato.PRACTICAS+'</td>'+
						'<td class="'+clase+'">'+dato.PCURRICULARES+'</td>'+
						'<td class="'+clase+'">'+dato.BECAS_CATALIZA+'</td>'+
						'<td class="'+clase+'">'+dato.SOLICITUDES_BECAS+'</td>'+
						'<td class="'+clase+'">'+dato.SOLICITUDES_PRACTICAS+'</td>'+
						'<td class="'+clase+'">'+dato.SOLICITUDES_EMPLEO+'</td>'+
					'<tr>';
					
				tbecas = parseInt(tbecas) + parseInt(dato.BECAS);
				tpractica = parseInt(tpractica) + parseInt(dato.PRACTICAS);
				tpcurri = parseInt(tpcurri) + parseInt(dato.PCURRICULARES);
				tcat = parseInt(tcat) + parseInt(dato.BECAS_CATALIZA);
				tsbeca = parseInt(tsbeca) + parseInt(dato.SOLICITUDES_BECAS);
				tspract = parseInt(tspract) + parseInt(dato.SOLICITUDES_PRACTICAS);
				tsempleo = parseInt(tsempleo) + parseInt(dato.SOLICITUDES_EMPLEO);
		});
		
		cad = cad +
				'<tr>'+
					'<td><strong>TOTAL</strong></td>'+
					'<td><strong>'+tbecas+'</strong></td>'+
					'<td><strong>'+tpractica+'</strong></td>'+
					'<td><strong>'+tpcurri+'</strong></td>'+
					'<td><strong>'+tcat+'</strong></td>'+
					'<td><strong>'+tsbeca+'</strong></td>'+
					'<td><strong>'+tspract+'</strong></td>'+
					'<td><strong>'+tsempleo+'</strong></td>'+
				'<tr>';
		
		cad = cad + '<tbody>'+
				'</table>';
				
		$('#ucefe-empresa').append(cad);			
	});
}

function obtener_acciones_entidad(a,b)
{
	$('#acciones-empresa').empty();
	var cad = '';
	var clase = 'l1';
	var i = 0;
	var estado = '';
	var serviceURL = "http://www.fulp.es/servicesfulp/obt_acciones_entidad.json?cod_entidad="+a+"&cod_unidad="+b;
	$.getJSON(serviceURL, function(data) {
		cad = '<div data-role="collapsibleset" data-theme="a" data-content-theme="a">';
		$.each(data, function(index, dato) {
			var cad_tratado=''; 	var cad_participantes='';
			if(dato.CERRADA == 'S'){estado = '<span style="float:right; font-size:11px; color:#65B0E6;">CERRADA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';}
			else{estado = '<span style="float:right; font-size:11px; color:#63E23B;">ABIERTA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';}
			
			if(dato.ASUNTO_TRATADO != '') {cad_tratado='. <br>'+dato.ASUNTO_TRATADO;}
			if(dato.PARTICIPANTES_EMPRESA != '') {cad_participantes='. <br>'+dato.PARTICIPANTES_EMPRESA;}
			cad = cad +
					'<div data-role="collapsible">'+
						'<h3 style="font-size:14px">'+dato.DESCRIPCION_TIPO_ACCION+'  <span style="float:right">'+dato.FECHA_INI+'</span> <br> <span style="font-size:11px; font-weight:normal;">'+ dato.RESPONSABLE_FULP+'</span> '+estado+'</h3>'+
						'<p><table>'+

							'<tr>'+
								'<td style="color:#E9530D">'+dato.ASUNTO+'</td>'+
							'</tr>'+
							'<tr>'+
								'<td>'+ dato.DESCRIPCION + cad_tratado + cad_participantes +'</td>'+
							'</tr>'+
						'</table></p>'+
					'</div>';
			i = i + 1;
		});
		cad = cad + '</div>';
		$('#acciones-empresa').append(cad);	
	});
}

function opciones_acciones()
{
	var cad = '';
	var serviceURL = "http://www.fulp.es/servicesfulp/listado_tipo_acciones.json";
	$.getJSON(serviceURL, function(data) {
		cad = '<option value="">TIPO ACCIÓN</option>';
		$.each(data, function(index, dato) {

			cad = cad +
				'<option value="'+dato.ID_ACCION+'">'+dato.DESCRIPCION+'</option>';

		});
		$('#tipo_accion').append(cad);	
	});
}

function opciones_personal()
{
	var cad = '';
	var selected = '';
	var serviceURL = "http://www.fulp.es/servicesfulp/listado_personal.json";
	$.getJSON(serviceURL, function(data) {
		cad = '<option value="">RESPONSABLE</option>';
		$.each(data, function(index, dato) {
			if(dato.COD_PERSONAL==cod_personal){selected='selected';}else {selected='';}
			cad = cad +
				'<option '+selected+' value="'+dato.COD_PERSONAL+'">'+dato.NOMBRE_PERSONAL+'</option>';

		});
		$('#cod_responsable').append(cad);	
	});
}

function crear_nueva_accion()
{
	 var xmlhttp =new XMLHttpRequest();
	 xmlhttp.open("GET", "http://www.fulp.es/FULP/mensajesapp/registro_app.php?anadir_accion=S&cod_entidad="+cod_entidad+"&cod_unidad="+cod_unidad+"&tipo="+document.getElementById('tipo_accion').value+"&fecha_ini="+document.getElementById('fecha_ini').value+"&hora_ini="+document.getElementById('hora_ini').value+"&asunto="+document.getElementById('asunto').value+"&descripcion="+document.getElementById('descripcion').value+"&cod_responsable="+document.getElementById('cod_responsable').value+"&cod_personal="+cod_personal,false);
	 xmlhttp.send(null);
	 
	 location.reload(true);
}

function servicios_act_empresa(a,b)
{ 
	var cad = '';
	var serviceURL = "http://www.fulp.es/servicesfulp/servicios_empresa_actuales.json?cod_entidad="+a+"&cod_unidad="+b+"";
	$.getJSON(serviceURL, function(data) {
		cad = '<div class="row" style="margin-bottom:5px;">'+
					'<div class="col-md-3">'+
						'<div class="sm-st clearfix">'+
							'<div class="sm-st-info" id="inserta">'+data.OFERTAS_PUBLICADAS+'<br>Ofertas<br>Publicadas</div>'+
						'</div>'+
					'</div>'+
					'<div class="col-md-3">'+
						'<div class="sm-st clearfix">'+
							'<div class="sm-st-info"  id="empleo">'+data.BECAS_ACTUAL+'<br>Inserta<br>Actuales</div>'+
						'</div>'+
					'</div>'+
					'<div class="col-md-3">'+
						'<div class="sm-st clearfix">'+
							'<div class="sm-st-info" id="practica">'+data.PRACTICAS_ACTUAL+'<br>Pr&aacute;cticas<br>Actuales</div>'+
						'</div>'+
					'</div>'+
				'</div>';

		$('#servicios_actuales').append(cad);	
	});
}


