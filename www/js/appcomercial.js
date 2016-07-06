
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

function resumen_ofertas_publicadas()
{
	var cad = '';
	var p = '';	var c = ''; var b = ''; var f = ''; var total = 0;
	$('#res-ofertas-pub').empty();
	var serviceURL = "http://www.fulp.es/servicesfulp/resumen_ofertas_publicadas.json";
	$.getJSON(serviceURL, function(data) {
		
		cad = '<table class="table table-hover" style="font-size:12px !important">'+
				'<thead>'+                              
					'<tr>'+                                      
						'<th>PR&Aacute;CTICAS</th>'+
						'<th>EMPLEO</th>'+
						'<th>INSERTA FP</th>'+                                   
						'<th>INSERTA UNIV</th>'+ 
						'<th>TOTAL</th>'+ 						
					'</tr>'+
				'</thead>'+
				'<tbody>';
	
		$.each(data, function(index, dato) {
			if(dato.ID_TIPO_RELACION=='P'){p = dato.NUM;}
			else if(dato.ID_TIPO_RELACION=='C'){c = dato.NUM;}
			else if(dato.ID_TIPO_RELACION=='B'){b = dato.NUM;}
			else if(dato.ID_TIPO_RELACION=='F'){f = dato.NUM;}
			
			total = parseInt(total) + parseInt(dato.NUM);

		});
		
		cad = cad +
					'<tr>'+
						'<td>'+p+'</td>'+
						'<td>'+c+'</td>'+
						'<td>'+f+'</td>'+
						'<td>'+b+'</td>'+
						'<td>'+total+'</td>'+
					'<tr>'+
				'</tbody>'+
			'</table>';
			
		$('#res-ofertas-pub').append(cad);		
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
					'<div class="nombre-empresa">'+dato.NOMBRE_EMPRESA+' ['+dato.NIF+']</div>'+
					'</div>'+
					'<div class="enlace-empresa"><a data-role="button" onclick="ir_pagina_anadir('+dato.COD_ENTIDAD+','+dato.COD_UNIDAD+')"><img src="img/bmas.png"></a><a data-role="button" onclick="window.location.href=\'ficha_empresa.html?cod_entidad='+dato.COD_ENTIDAD+'&cod_unidad='+dato.COD_UNIDAD+'\'"><img src="img/bojo.png"></a></div>'+
					'</div>';
		});
		
		$('#list-empresas').append(cad);
	});
		
}

function ir_pagina_anadir(cod_entidad,cod_unidad)
{
	window.localStorage.setItem("pagina","anadir");
	window.location.href='ficha_empresa.html?cod_entidad='+cod_entidad+'&cod_unidad='+cod_unidad+'';
}

function listado_busqueda_anterior_empresas(cod_personal)
{ 
	$('#list-empresas').empty();
	var cad = '';
	var clase = 'l1';
	var serviceURL = "http://www.fulp.es/servicesfulp/listado_busqueda_anterior_empresas.json?cod_personal="+cod_personal;
	$.getJSON(serviceURL, function(data) {
		$.each(data, function(index, dato) {
			if(clase == 'l1'){clase = 'l2';} else {clase = 'l1';}
			cad = cad + '<div class="empresa '+ clase +'">'+
					'<div class="grupo">'+
					'<div class="nombre-empresa">'+dato.NOMBRE_EMPRESA+' ['+dato.NIF+']</div>'+
					'</div>'+
					'<div class="enlace-empresa"><a data-role="button" onclick="ir_pagina_anadir('+dato.COD_ENTIDAD+','+dato.COD_UNIDAD+')"><img src="img/bmas.png"></a><a data-role="button" onclick="window.location.href=\'ficha_empresa.html?cod_entidad='+dato.COD_ENTIDAD+'&cod_unidad='+dato.COD_UNIDAD+'\'"><img src="img/bojo.png"></a></div>'+
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
						'<th colspan="3"><a data-role="button" onclick="editar_contacto_empresa(\'\',\'\',\'\',\'\',\'\',\'\')" data-inline="true" id="edit-contac"><img width="20" src="img/anadir.png"></a>'+
						'Personas de contacto</th>'+
					'<tr>';
					
		$.each(data, function(index, dato) {
			if(clase == 'l1'){clase = 'l2';} else {clase = 'l1';}
			cad = cad + 
					'<tr>'+
						'<td colspan="2" class="titulo '+clase+'">'+
						'<a data-role="button" onclick="eliminar_contacto_entidad(\''+dato.ID_CONTACTO+'\')" data-inline="true" class="active" id="eliminar-cntc">X</a>'+
						'<a data-role="button" onclick="editar_contacto_empresa(\''+dato.ID_CONTACTO+'\',\''+dato.NOMBRE_CONTACTO+'\',\''+dato.DESCRIPCION_CONTACTO+'\',\''+dato.TELEFONO_CONTACTO.replace(/[-.]/gi,'')+'\',\''+dato.MOVIL_CONTACTO.replace(/[-.]/gi,'')+'\',\''+dato.EMAIL_CONTACTO+'\')" data-inline="true" id="edit-contac"><img width="20" src="img/ico-Editar.png"></a>'+
						dato.NOMBRE_CONTACTO+' <br> <span class="sub-dep">'+dato.DESCRIPCION_CONTACTO+'</span></td>'+
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

function editar_contacto_empresa(id,nombre,descrip,telef,movil,email)
{
	$('#editar-contacto-empresa').empty();
	if(id!='')
	{
		var cad = '<div>'+
					'<a data-role="button" onclick="document.getElementById(\'editar-contacto-empresa\').style.display=\'none\';" data-inline="true" class="active" id="cerrar-contc">X</a>'+
					'<table>'+
						'<tr>'+
							'<td>'+
								'<input type="hidden" value="'+id+'" id="id_contacto">'+
								'<input type="text" value="'+nombre+'" id="nombre_contacto" placeholder="NOMBRE">'+
							'</td>'+
						'</tr>'+
						'<tr>'+
							'<td>'+						
								'<input type="text" value="'+descrip+'" id="puesto_contacto" placeholder="PUESTO">'+
							'</td>'+
						'</tr>'+
						'<tr>'+
							'<td>'+	
								'<input type="tel" value="'+telef+'" id="telefono_contacto" placeholder="TEL&Eacute;FONO">'+
							'</td>'+
						'</tr>'+
						'<tr>'+
							'<td>'+	
								'<input type="tel" value="'+movil+'" id="movil_contacto" placeholder="MOVIL">'+
							'</td>'+
						'</tr>'+
						'<tr>'+
							'<td>'+	
								'<input type="email" value="'+email+'" id="email_contacto" placeholder="EMAIL">'+
							'</td>'+
						'</tr>'+
						'<tr>'+
							'<td>'+	
								'<input type="button" onclick="modificar_contacto_entidad()" value="GUARDAR" id="enviar_contacto">'+
							'</td>'+
						'</tr>'+
					'</table>'+	
				  '</div>';
	}
	else
	{
		var cad = '<div>'+
						'<a data-role="button" onclick="document.getElementById(\'editar-contacto-empresa\').style.display=\'none\';" data-inline="true" class="active" id="cerrar-contc">X</a>'+
					'<table>'+
						'<tr>'+
							'<td>'+
								'<input type="hidden" value="'+id+'" id="id_contacto">'+
								'<input type="text" id="nombre_contacto" placeholder="NOMBRE">'+
							'</td>'+
						'</tr>'+
						'<tr>'+
							'<td>'+						
								'<input type="text" id="puesto_contacto" placeholder="PUESTO">'+
							'</td>'+
						'</tr>'+
						'<tr>'+
							'<td>'+	
								'<input type="tel" id="telefono_contacto" placeholder="TEL&Eacute;FONO">'+
							'</td>'+
						'</tr>'+
						'<tr>'+
							'<td>'+	
								'<input type="tel" id="movil_contacto" placeholder="MOVIL">'+
							'</td>'+
						'</tr>'+
						'<tr>'+
							'<td>'+	
								'<input type="email" id="email_contacto" placeholder="EMAIL">'+
							'</td>'+
						'</tr>'+
						'<tr>'+
							'<td>'+	
								'<input type="button" onclick="anadir_contacto_entidad()" value="GUARDAR" id="enviar_contacto">'+
							'</td>'+
						'</tr>'+
					'</table>'+	
				  '</div>';
	}
	
	$('#editar-contacto-empresa').append(cad);	
		document.getElementById('editar-contacto-empresa').style.display='block';
}

function anadir_contacto_entidad()
{
	 var xmlhttp =new XMLHttpRequest();
	 xmlhttp.open("GET", "http://www.fulp.es/FULP/mensajesapp/registro_app.php?anadir_contacto=S&cod_entidad="+cod_entidad+"&cod_unidad="+cod_unidad+"&nombre="+document.getElementById('nombre_contacto').value+"&puesto="+document.getElementById('puesto_contacto').value+"&telef="+document.getElementById('telefono_contacto').value+"&movil="+document.getElementById('movil_contacto').value+"&email="+document.getElementById('email_contacto').value,false);
	 xmlhttp.send(null);
	 
	 location.reload(true);
}

function modificar_contacto_entidad()
{
	 var xmlhttp =new XMLHttpRequest();
	 xmlhttp.open("GET", "http://www.fulp.es/FULP/mensajesapp/registro_app.php?modificar_contacto=S&id="+document.getElementById('id_contacto').value+"&nombre="+document.getElementById('nombre_contacto').value+"&puesto="+document.getElementById('puesto_contacto').value+"&telef="+document.getElementById('telefono_contacto').value+"&movil="+document.getElementById('movil_contacto').value+"&email="+document.getElementById('email_contacto').value,false);
	 xmlhttp.send(null);
	 
	 location.reload(true);
}

function nueva_busqueda_empresa(cod_personal,cod_entidad,cod_unidad)
{
	 var xmlhttp =new XMLHttpRequest();
	 xmlhttp.open("GET", "http://www.fulp.es/FULP/mensajesapp/registro_app.php?cod_personal="+cod_personal+"&cod_entidad="+cod_entidad+"&cod_unidad="+cod_unidad+"&busquedaComercial=S",false);
	 xmlhttp.send(null);
}

function eliminar_contacto_entidad(id)
{
	var r = confirm("Seguro que deseas eliminarlo??");
	if(r == true) {
	 var xmlhttp =new XMLHttpRequest();
	 xmlhttp.open("GET", "http://www.fulp.es/FULP/mensajesapp/registro_app.php?eliminar_contacto=S&id="+id,false);
	 xmlhttp.send(null);
	 
	 location.reload(true);
	}
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
		
		
		/*var lineChartData =  = {
			labels : ['test'],
			datasets : [
				{
					label: "SUE",
				//	fillColor : "rgba(220,220,220,0.2)",
					strokeColor : "rgba(220,220,220,1)",
					pointColor : "rgba(220,220,220,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(220,220,220,1)",
					data : []
				}
				]

		}*/

	});
}

function obtener_acciones_entidad(a,b)
{
	$('#acciones-empresa').empty();
	var cad = '';
	var clase = 'l1';
	var i = 0;
	var estado = '';
	var bestado = '';
	var serviceURL = "http://www.fulp.es/servicesfulp/obt_acciones_entidad.json?cod_entidad="+a+"&cod_unidad="+b;
	$.getJSON(serviceURL, function(data) {
		cad = '<div data-role="collapsibleset" data-theme="a" data-content-theme="a">';
		$.each(data, function(index, dato) {
			var cad_tratado=''; 	var cad_participantes='';
			if(dato.CERRADA == 'S'){estado = '<span style="float:right; font-size:11px; color:#65B0E6;">CERRADA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';}
			else{estado = '<span style="float:right; font-size:11px; color:#63E23B;">ABIERTA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';}
			
			if(dato.ASUNTO_TRATADO != '') {cad_tratado='. <br>'+dato.ASUNTO_TRATADO;}
			if(dato.PARTICIPANTES_EMPRESA != '') {cad_participantes='. <br>'+dato.PARTICIPANTES_EMPRESA;}
			
			if(dato.CERRADA == 'S'){bestado='<a data-role="button" onclick="abrir_accion_entidad('+dato.ID_ACCION_ENTIDAD+')" data-inline="true" class="candado"><img src="img/lock.png"></a>'}
			else if(dato.CERRADA == 'N'){bestado='<a data-role="button" onclick="cerrar_accion_entidad('+dato.ID_ACCION_ENTIDAD+')" data-inline="true" class="candado"><img src="img/open.png"></a>'}
			cad = cad +
					'<div data-role="collapsible">'+
						'<h3 style="font-size:14px">'+dato.DESCRIPCION_TIPO_ACCION+'  <span style="float:right">'+dato.FECHA_INI+'</span> <br> <span style="font-size:11px; font-weight:normal;">'+ dato.RESPONSABLE_FULP+'</span> '+estado+'</h3>'+
						'<table>'+

							'<tr>'+
								'<td style="color:#E9530D">'+dato.ASUNTO+'</td>'+
							'</tr>'+
							'<tr>'+
								'<td>'+ dato.DESCRIPCION + cad_tratado + cad_participantes +'<br>'+bestado+
			
								'</td>'+
							'</tr>'+
						'</table>'+
					'</div>';
			i = i + 1;
		});
		cad = cad + '</div>';
		$('#acciones-empresa').append(cad);	
	});
}

function cerrar_accion_entidad(id)
{
	var r = confirm("Vas a cerrar la acción??");
	if(r == true) {
	 var xmlhttp =new XMLHttpRequest();
	 xmlhttp.open("GET", "http://www.fulp.es/FULP/mensajesapp/registro_app.php?cerrar_accion="+id,false);
	 xmlhttp.send(null);
	 
	 location.reload(true);
	}
}

function abrir_accion_entidad(id)
{
	 var xmlhttp =new XMLHttpRequest();
	 xmlhttp.open("GET", "http://www.fulp.es/FULP/mensajesapp/registro_app.php?abrir_accion="+id,false);
	 xmlhttp.send(null);
	 
	 location.reload(true);
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

function estados_conv_acuerdo(a,b)
{ 
	var cad = '';
	var txtbeca= '';
	var txtpract='';
	var serviceURL = "http://www.fulp.es/servicesfulp/estado_acuerdo_convenio.json?cod_entidad="+a+"&cod_unidad="+b+"";
	$.getJSON(serviceURL, function(data) {
		if(data.ESTADO_BECA=='S'){txtbeca='Vigente<br><img style="margin-top:5px" src="img/BECAconvenio.png" width="30">'}
		else if(data.ESTADO_BECA=='N'){txtbeca='No solicitado<br><img style="margin-top:5px" src="img/BECAnotiene.png" width="30">'}
		else if(data.ESTADO_BECA=='T'){txtbeca='En tramite<br><img style="margin-top:5px" src="img/BECAsolicitado.png" width="30">'}
		else if(data.ESTADO_BECA=='R'){txtbeca='Caducado<br><img style="margin-top:5px" src="img/BECAcaducada.png" width="30">'}
		
		if(data.ESTADO_PRACTICA=='S'){txtpract='Vigente<br><img style="margin-top:5px" src="img/PRACTconvenio.png" width="30">'}
		else if(data.ESTADO_PRACTICA=='N'){txtpract='No solicitado<br><img style="margin-top:5px" src="img/PRACTnotiene.png" width="30">'}
		else if(data.ESTADO_PRACTICA=='T'){txtpract='En tramite<br><img style="margin-top:5px" src="img/PRACTsolicitado.png" width="30">'}
		else if(data.ESTADO_PRACTICA=='R'){txtpract='Caducado<br><img style="margin-top:5px" src="img/PRACTcaducada.png" width="30">'}
		
		cad = '<div class="row" style="margin-bottom:5px;">'+
					'<div class="col-md-3">'+
						'<div class="sm-st clearfix">'+
							'<div class="sm-st-info">Acuerdo Inserta</span><br>'+txtbeca+'</div>'+
						'</div>'+
					'</div>'+
					'<div class="col-md-3">'+
						'<div class="sm-st clearfix">'+
							'<div class="sm-st-info">Convenio Pr&aacute;cticas</span><br>'+txtpract+'</div>'+
						'</div>'+
					'</div>'+
				'</div>';

		$('#acuerdo_convenio').append(cad);	
	});
}

function listado_ofertas_web(a)
{
	var cad = '';
	var clase = 'l1';
	$('#list-ofertas-web').empty();
	var serviceURL = "http://www.fulp.es/servicesfulp/listado_ofertas_publicadas.json?tipo="+a;
	$.getJSON(serviceURL, function(data) {
		cad = '<table style="width:100%" id="tab-ofertas">';	
		$.each(data, function(index, dato) {
			if(clase == 'l1'){clase = 'l2';} else {clase = 'l1';}
			cad = cad + 
					'<tr>'+
						'<td style="padding: 10px; line-height: 1.5em;" nowrap colspan="2" class="'+clase+'"><b>'+dato.EMPRESA+'</b><br>'+
						'<span style="font-size:10px;">['+dato.TIPO_RELACION+']</span>'+
						'<br><span style="font-size:10px;">Publicada desde '+dato.FECHA_INI_PUBLICACION+' al '+dato.FECHA_FIN_PUBLICACION+'</span>'+
						'<br>'+dato.ASUNTO+'</td>'+
					'</tr>';
		});
		cad = cad +
				'</table>';
		
		$('#list-ofertas-web').append(cad);			
	});
}

function obtener_evento_agenta()
{
	var cad = new Array(5);
	var vector =[];
	var i = 0;
	var serviceURL = "http://www.fulp.es/servicesfulp/acciones_agenda.json?cod_personal="+cod_personal;
	$.getJSON(serviceURL, function(data) {
		localStorage.setItem("vector_acciones", JSON.stringify(data));

	});
}

function detalle_accion(id)
{ 
	var cad = '';
	$('#contenido-detalle').empty();
	var serviceURL = "http://www.fulp.es/servicesfulp/obt_dato_acciones.json?id_accion="+id;
	$.getJSON(serviceURL, function(data) {
		cad = '<a data-role="button" onclick="document.getElementById(\'detalle-accion\').style.display=\'none\';" data-inline="true" class="active" id="cerrar-contc">X</a>'+
				'<div class="titulo">'+data.EMPRESA+'</div>'+
				'<div>'+data.DESCRIPCION_TIPO_ACCION+'</div>'+
				'<div>'+data.FECHA_INI+' '+data.HORA_INI+'</div>'+
				'<div>'+data.DESCRIPCION+'</div>';

		$('#contenido-detalle').append(cad);	
	});
	document.getElementById('detalle-accion').style.display='block';
}

function load_pie(cod_personal)
{alert(1);
	var cad_pie = '';
	
	/*cad_pie='<a onclick="window.location.href=\'dashboard.html\'" data-role="button" data-inline="true" id="mendest"><img src="img/binformes.png"></a>';
    cad_pie=cad_pie+'<a onclick="window.location.href=\'busq_empresas.html\'" data-role="button" data-inline="true" id="mencita"><img src="img/bdestacado.png"></a>';
    cad_pie=cad_pie+'<a onclick="window.location.href=\'ofertas_web.html\'" data-role="button" data-inline="true" id="menaviso"><img src="img/blista.png"></a>';
	cad_pie=cad_pie+'<a onclick="window.location.href=\'agenda.html\'" data-role="button" data-inline="true" id="menfav"><img src="img/bcita.png"></a>';*/

	$('#menu-pie').append(cad_pie);	
	//return cad_pie;
}

function obtener_permisos_usuario(cod_personal)
{	
	var dataString = "PermisosUsuario="+cod_personal;
		$.ajax({ 
            type: "POST",
            url: "http://www.fulp.es/FULP/mensajesapp/registro_app.php",
            data: dataString,
            success: function(data) {
				
				alert(data);
				
				}
				
            }
        });
}