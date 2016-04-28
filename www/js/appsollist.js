var employees;

/*
$('#appsolListPage').bind('pageinit', function(event) {
	getDestacadosList();
});*/

/* function getYouTubeInfo(ruta) {
 
						$.getJSON("https://www.googleapis.com/youtube/v3/videos?id="+v+"&key=AIzaSyCRFtBQ4pANIXYaZapjjnaHNIeOVzPKwqY&part=snippet", function(data) {
					$.each(data.items, function(index, video) {
						 var id = video.id;
						 var title = video.snippet.title;
						 $('#destacadosList').append('<a href="https://www.youtube.com/watch?v=' + id + '"><li>' +
						'<img src="img/ico-youtube.png"> '+
						'<h4>' + title + '</h4>' +
						'</li></a>');
					});
				});			
        }*/

function getDestacadosList() {
	var serviceDestacadosURL = "http://www.fulp.es/servicesfulp/ofertas.json?uuid="+uuid;
	
	$.getJSON(serviceDestacadosURL, function(data) {
		$('#destacadosList a').remove();
		employees = data;
		var i=0;
		var m=0;
		$.each(employees, function(index, destacado) {
		var imagen='';		var descripcion = '';		var imgfav= '';		var fav = destacado.favorito;  var funfav= ''; var descripcion_tipo= '';
		
			if(destacado.tipo=='YOUTUBE')
			{
				var icono = "img/ico-youtube.png";
				var enlace = '<a href="' +destacado.enlace+ '">';
				if(destacado.descripcion_corta!=false)
				descripcion = '<p>' + destacado.descripcion_corta + '</p>';
				imagen = '<div class="imgcontent"><img src="'+destacado.imagen+'"></div>';		
			}
			else if(destacado.tipo=='INFOJOBS')
			{
				var icono = "img/ico-infojobs.png";
				var enlace =  '<a href="' +destacado.enlace+ '">';
				if(destacado.descripcion_corta!=false)
				descripcion = '<p>' + destacado.descripcion_corta + '</p>';
			}
			else if(destacado.tipo=='TERRAZA')
			{
				var icono = "img/ico-terraza.png";
				var enlace = '<a onclick="getDetalleTerraza('+destacado.id +');">';
				descripcion_tipo = '<p><i>Evento Terraza Fundaci&oacute;n</i></p>';
				if(destacado.descripcion_corta!=false)
				descripcion = '<p>' + destacado.descripcion_corta + '</p>';
				imagen = '<div class="imgcontent"><img src="http://www.fulp.es/FULP/terraza/imagenes/'+destacado.id+'.jpg"></div>';
			}
			else if(destacado.tipo=='CSOL')
			{
				var icono = "img/ico-curso.png";
				var enlace = '<a onclick="getDetalleSol('+destacado.id +');">';
				descripcion_tipo = '<p><i>Grupales y Talleres</i></p>';
				if(destacado.descripcion_corta!=false)
				descripcion = '<p>' + destacado.descripcion_corta + '</p>';
			}
			else if(destacado.tipo=='C')
			{
				var icono = "img/ico-empleo.png";
				var enlace = '<a onclick="getDetalleOferta('+destacado.id +');">';
				descripcion_tipo = '<p><i>Oferta de Empleo</i></p>';
				if(destacado.descripcion_corta!=false)
				descripcion = '<p>' + destacado.descripcion_corta + '</p>';
			}
			else if((destacado.tipo=='B')||(destacado.tipo=='F'))
			{
				var icono = "img/ico-beca.png";
				var enlace = '<a onclick="getDetalleOferta('+destacado.id +');">';
				descripcion_tipo = '<p><i>Oferta del Programa Inserta</i></p>';
				if(destacado.descripcion_corta!=false)
				descripcion = '<p>' + destacado.descripcion_corta + '</p>';
			}
			
			if(fav=='N')
			{
				imgfav='img/strellaoff.png';
				funfav= 'anadir_favorito(\''+destacado.tipo+'\',\''+destacado.id+'\',\''+ m +'\')';
			}
			else
			{
				imgfav='img/strellaon.png';
				funfav= 'eliminar_fav(\''+destacado.tipo+'\',\''+destacado.id+'\',\''+ m +'\')';
			}

			$('#destacadosList').append( '<a id="enlcfavorito'+ m +'" onclick="'+funfav+'"><img class="icofavorito" id="icofavorito'+ m +'" src="'+ imgfav +'"></a>'+
				enlace + '<li>' +
				'<div class="imagn"><img src="'+ icono +'"></div> '+
				'<div class="contn"><h4>' + destacado.titulo + '</h4>' +
				descripcion_tipo +
				descripcion + '</div>'+
				imagen +
				'</li></a>');
			m=m+1;
		});
		$('#destacadosList').listview('refresh');
		//$('#destacadosList').load();
	});
mostrarDestacados();	
}

function getFavoritosList() {
	var serviceFavoritoURL = "http://www.fulp.es/servicesfulp/favoritos.json?uuid="+uuid;

	$.getJSON(serviceFavoritoURL, function(data) {
		$('#favoritosList a').remove();
		employees = data;
		var i=0;
		var m=0;
		$.each(employees, function(index, favorito) {
		var imagen='';		var descripcion = '';		var imgfav= '';		var fav = favorito.favorito;  var funfav= ''; var descripcion_tipo='';
		
			if(favorito.tipo=='YOUTUBE')
			{
				var icono = "img/ico-youtube.png";
				var enlace = '<a href="' +favorito.enlace+ '">';
				if(favorito.descripcion_corta!=false)
				descripcion = '<p>' + favorito.descripcion_corta + '</p>';
				imagen = '<div class="imgcontent"><img src="'+destacado.imagen+'"></div>';		
			}
			else if(favorito.tipo=='INFOJOBS')
			{
				var icono = "img/ico-infojobs.png";
				var enlace =  '<a href="' +favorito.enlace+ '">';
				if(favorito.descripcion_corta!=false)
				descripcion = '<p>' + favorito.descripcion_corta + '</p>';
			}
			else if(favorito.tipo=='TERRAZA')
			{
				var icono = "img/ico-terraza.png";
				var enlace = '<a onclick="getDetalleTerraza('+favorito.id +');">';
				descripcion_tipo = '<p><i>Eveto Terraza Fundaci&oacute;n</i></p>';
				if(favorito.descripcion_corta!=false)
				descripcion = '<p>' + favorito.descripcion_corta + '</p>';
				imagen = '<div class="imgcontent"><img src="http://www.fulp.es/FULP/terraza/imagenes/'+favorito.id+'.jpg"></div>';
			}
			else if(favorito.tipo=='CSOL')
			{
				var icono = "img/ico-curso.png";
				var enlace = '<a onclick="getDetalleSol('+favorito.id +');">';
				descripcion_tipo = '<p><i>Grupales y Talleres</i></p>';
				if(favorito.descripcion_corta!=false)
				descripcion = '<p>' + favorito.descripcion_corta + '</p>';
			}
			else if(favorito.tipo=='C')
			{
				var icono = "img/ico-empleo.png";
				var enlace = '<a onclick="getDetalleOferta('+favorito.id +');">';
				descripcion_tipo = '<p><i>Oferta de Empleo</i></p>';
				if(favorito.descripcion_corta!=false)
				descripcion = '<p>' + favorito.descripcion_corta + '</p>';
			}
			else if((favorito.tipo=='B')||(favorito.tipo=='F'))
			{
				var icono = "img/ico-beca.png";
				var enlace = '<a onclick="getDetalleOferta('+favorito.id +');">';
				descripcion_tipo = '<p><i>Oferta del Programa Inserta</i></p>';
				if(favorito.descripcion_corta!=false)
				descripcion = '<p>' + favorito.descripcion_corta + '</p>';
			}
			
			if(fav=='N')
			{
				imgfav='img/strellaoff.png';
				funfav= 'anadir_favorito(\''+favorito.tipo+'\',\''+favorito.id+'\',\''+ m +'\')';
			}
			else
			{
				imgfav='img/strellaon.png';
				funfav= 'eliminar_fav2(\''+favorito.tipo+'\',\''+favorito.id+'\',\''+ m +'\')';
			}

			$('#favoritosList').append( '<a id="enlcfavorito'+ m +'" onclick="'+funfav+'"><img class="icofavorito" id="icofavorito'+ m +'" src="'+ imgfav +'"></a>'+
				enlace + '<li>' +
				'<div class="imagn"><img src="'+ icono +'"></div> '+
				'<div class="contn"><h4>' + favorito.titulo + '</h4>' +
				descripcion_tipo +
				descripcion + '</div>'+
				imagen +
				'</li></a>');
			m=m+1;
		});
		$('#favoritosList').listview('refresh');
		//$('#favoritosList').load();
	});
mostrarFavoritos();	
}

function getCitaForm() {
	
	mostrarCita();
}


function getAvisosList() {

	var serviceFavoritoURL = "http://www.fulp.es/servicesfulp/avisos.json?regId="+regId;
	
	$.getJSON(serviceFavoritoURL, function(data) {
		$('#avisosList li').remove();
		employees = data;

		var i=0;
		$.each(employees, function(index, aviso) {
			var clase='';
			if((aviso.tipo=='B')||(aviso.tipo=='F'))
			{
				var icono = "img/ico-beca.png";
				var enlace = '<a onclick="getDetalleOferta('+aviso.id +');">';
				var finenlace = '</a>';
			}
			else if(aviso.tipo=='C')
			{
				var icono = "img/ico-empleo.png";
				var enlace = '<a onclick="getDetalleOferta('+aviso.id +');">';
				var finenlace = '</a>';
			}
			else if(aviso.tipo=='A')
			{
				var icono = "img/ico-aviso.png";
				var enlace = '';
				var finenlace = '';
			}
			else if(aviso.tipo=='T')
			{
				var icono = "img/ico-terraza.png";
				var enlace = '<a onclick="getDetalleTerraza('+aviso.id +');">';
				var finenlace = '</a>';
			}
			else if(aviso.tipo=='S')
			{
				var icono = "img/ico-ico-curso.png";
				var enlace = '<a onclick="getDetalleSol('+aviso.id +');">';
				var finenlace = '</a>';
			}

			if(aviso.visto=='N'){clase = 'nuevo';}

			$('#avisosList').append( enlace +'<li class="'+ clase +'">' + 
				'<div class="imagn"><img src="'+icono+'"></div> '+
				'<div class="contn">' +
				'<p>'+aviso.aviso + '</p>'+ 
				'</div>' +
				'</li>'+ finenlace);
		});
		$('#avisosList').listview('refresh');
	});
	mostrarAvisos();
	
}

function getDetalleOferta(id) { 
	
	mostrarDetalle();
	$('#titulo').empty();
	$('#dgenerales').empty();
	$('#descripcion').empty();
	var serviceURL2 = "http://www.fulp.es/servicesfulp/oferta.json?id="+id;
	$.getJSON(serviceURL2, function(data) {
			var entidad=''; var contrato = ''; var jornada = ''; var salario = ''; var tipo = '';
		//$.each(data, function(index, oferta) {
			if(data.anonima=='N'){entidad='<p>' + data.entidad + '</p>';}
			if((data.tipo='B')||(data.tipo='B')){ tipo = '<p><i>Oferta del Programa Inserta</i></p>';}
			else if(data.tipo='C'){tipo = '<p><i>Oferta de Empleo</i></p>'}
			
			$('#titulo').append('<h4>'+data.asunto+'</h4>' + tipo + entidad);
			
			if ((data.contrato)&&(data.contrato!='No especificado')) {
				contrato ='<p><strong>Contrato:</strong> ' + data.contrato + '</p>';
			}
			if ((data.jornada)&&(data.jornada!='No especificado')) {
				jornada ='<p><strong>Jornada:</strong> ' + data.jornada + '</p>';
			}
			if ((data.salario)&&(data.salario!='No especificado')) {
				salario ='<p><strong>Salario:</strong> ' + data.salario + '</p>';
			}
			
			$('#dgenerales').append(contrato + jornada + salario);
			
			$('#descripcion').append("<h5>Descripci&oacute;n</h5><p>"+data.descripcion.replace(/(?:\r\n|\r|\n)/g, '<br />')+"</p>");
			
			$("#enloferta").attr("href","http://www.fulp.es/oferta/"+data.enlace);
			
			
		//});
		//$('#actionList').listview('refresh');
	});
}

function getDetalleTerraza(id) { 
	
	mostrarTerraza();
	$('#tituloT').empty();
	$('#dgeneralesT').empty();
	$('#descripcionT').empty();
	var serviceURL2 = "http://www.fulp.es/servicesfulp/terraza.json?id="+id;
	$.getJSON(serviceURL2, function(data) {
	
			$('#tituloT').append('<h4>'+data.titulo+'</h4><p>'+data.fecha_inicio+'</p>');
			
			$("#imgterraza").attr("src","http://www.fulp.es/FULP/terraza/imagenes/"+data.id+".jpg");
			
			$('#descripcionT').append("<h5>Descripci&oacute;n</h5><p>"+data.descripcion.replace(/(?:\r\n|\r|\n)/g, '<br />')+" <h5>Lugar de celebraci&oacute;n:</h5><p>"+data.lugar+"</p>");
			
			$("#enlterraza").attr("href","http://www.fulp.es/evento/"+data.enlace);

		//$('#actionList').listview('refresh');
	});
}

function getDetalleSol(id) { 
	
	mostrarSol();
	$('#tituloS').empty();
	$('#dgeneralesS').empty();
	$('#descripcionS').empty();
	var serviceURL2 = "http://www.fulp.es/servicesfulp/terraza.json?id="+id;
	$.getJSON(serviceURL2, function(data) {
	
			$('#tituloS').append('<h4>'+data.titulo+'</h4><p>'+data.periodo+'</p>');
			
			$('#descripcionS').append("<h5>Descripci&oacute;n</h5><p>"+data.descripcion+"</p> <h5>Lugar de celebraci&oacute;n:</h5><p>"+data.lugar+"</p>");
			
			document.getElementById("codcursoinfo").value=id;

		//$('#actionList').listview('refresh');
	});
}

function getItinerarioList() {
	var serviceFavoritoURL = "http://www.fulp.es/servicesfulp/itinerario.json?cod_personal="+cod_personal;

		$.getJSON(serviceFavoritoURL, function(data) {
			$('#itinerarioList li').remove();
	
			if(data == null)
			{
			$('#itinerarioList').append( '<a onclick="getCitaForm()"><li>' +
				'<div class="imagn"><img src="img/ico-tutoria.png"></div> '+
				'<div class="contn"><h4>Para acceder al itinerario debes ser usuario del SOL</h4>' +
				'<p>Solicita tu cita aqui</p></div>'+
				'</li></a>');
			}
			else
			{
			employees = data;
				var i=0;
				$.each(employees, function(index, itinerario) {
				var icoiti='';
					if(itinerario.tipo == 'T') {icoiti='img/ico-tutoria.png';}
					else if(itinerario.tipo == 'C') {icoiti='img/ico-curso.png';}
					$('#itinerarioList').append( '<li>' +
						'<div class="imagn"><img src="'+icoiti+'"></div> '+
						'<div class="contn"><h4>' + itinerario.nombre_accion + '</h4>' +
						'<p>Del '+itinerario.fecha_inicio + ' al '+itinerario.fecha_fin+'</p></div>'+
						'</li>');
				});
			}
			$('#itinerarioList').listview('refresh');
		});
	
mostrarItinerario();	
}

function getSesionForm() {

	if((cod_personal!='')&&(cod_personal!='0'))
	{
		cerrar_sesion();
		cod_personal = '';
		window.localStorage.setItem("cod_personal", cod_personal);
		$("#meniniciar").attr("onClick","getSesionForm();");
		alert('Sesión cerrada correctamente');
	}
	mostrarSesion();
}

function mostrarDestacados()
{
	
  $("#cabecera").attr("class","naranja");
  $("#imgcab").attr("src","img/cab_descatado.png");
  $('#contenedorDestacados').show();
  $('#contenedorFavoritos').hide();
  $('#contenedorCita').hide();
  $('#contenedorAvisos').hide();
  $('#contenedorSesion').hide();
  $('#contenedorDetalle').hide();
  $('#contenedorItinerario').hide();
  $('#contenedorTerraza').hide();
  $('#contenedorSol').hide();
}

function mostrarFavoritos()
{
  $("#cabecera").attr("class","blanco");
  $("#imgcab").attr("src","img/cab_favorito.png");
  $('#contenedorDestacados').hide();
  $('#contenedorFavoritos').show();
  $('#contenedorCita').hide();
  $('#contenedorAvisos').hide();
  $('#contenedorSesion').hide();
  $('#contenedorDetalle').hide();
  $('#contenedorItinerario').hide();
  $('#contenedorTerraza').hide();
  $('#contenedorSol').hide();
}


function mostrarCita()
{
  $("#cabecera").attr("class","blanco");
  $("#imgcab").attr("src","img/cab_cita.png");
  $('#contenedorDestacados').hide();
  $('#contenedorFavoritos').hide();
  $('#contenedorCita').show();
  $('#contenedorAvisos').hide();
  $('#contenedorSesion').hide();
  $('#contenedorDetalle').hide();
  $('#contenedorItinerario').hide();
  $('#contenedorTerraza').hide();
  $('#contenedorSol').hide();
}

function mostrarAvisos()
{
  $("#cabecera").attr("class","blanco");
  $("#imgcab").attr("src","img/cab_alertas.png");
  $('#contenedorDestacados').hide();
  $('#contenedorFavoritos').hide();
  $('#contenedorCita').hide();
  $('#contenedorAvisos').show();
  $('#contenedorSesion').hide();
  $('#contenedorDetalle').hide();
  $('#contenedorItinerario').hide();
  $('#contenedorTerraza').hide();
  $('#contenedorSol').hide();
  
  //setTimeout(avisosVistos(),10000);
}


function mostrarSesion()
{
  $("#cabecera").attr("class","blanco");
  $("#imgcab").attr("src","img/cab_inicio.png");
  $('#contenedorDestacados').hide();
  $('#contenedorFavoritos').hide();
  $('#contenedorCita').hide();
  $('#contenedorAvisos').hide();
  $('#contenedorSesion').show();
  $('#contenedorDetalle').hide();
  $('#contenedorItinerario').hide();
  $('#contenedorTerraza').hide();
  $('#contenedorSol').hide();
}

function mostrarDetalle()
{
  $("#cabecera").attr("class","naranja");
  $("#imgcab").attr("src","img/cab_oferta.png");
  $('#contenedorDestacados').hide();
  $('#contenedorFavoritos').hide();
  $('#contenedorCita').hide();
  $('#contenedorAvisos').hide();
  $('#contenedorSesion').hide();
  $('#contenedorDetalle').show();
  $('#contenedorItinerario').hide();
  $('#contenedorTerraza').hide();
  $('#contenedorSol').hide();
}

function mostrarItinerario()
{
  $("#cabecera").attr("class","blanco");
  $("#imgcab").attr("src","img/cab_itinerario.png");
  $('#contenedorDestacados').hide();
  $('#contenedorFavoritos').hide();
  $('#contenedorCita').hide();
  $('#contenedorAvisos').hide();
  $('#contenedorSesion').hide();
  $('#contenedorDetalle').hide();
  $('#contenedorItinerario').show();
  $('#contenedorTerraza').hide();
  $('#contenedorSol').hide();
}

function mostrarTerraza()
{
  $("#cabecera").attr("class","naranja");
  $("#imgcab").attr("src","img/cab_terraza.png");
  $('#contenedorDestacados').hide();
  $('#contenedorFavoritos').hide();
  $('#contenedorCita').hide();
  $('#contenedorAvisos').hide();
  $('#contenedorSesion').hide();
  $('#contenedorDetalle').hide();
  $('#contenedorItinerario').hide();
  $('#contenedorTerraza').show();
  $('#contenedorSol').hide();
}

function mostrarSol()
{
  $("#cabecera").attr("class","naranja");
  $("#imgcab").attr("src","img/cab_curso.png");
  $('#contenedorDestacados').hide();
  $('#contenedorFavoritos').hide();
  $('#contenedorCita').hide();
  $('#contenedorAvisos').hide();
  $('#contenedorSesion').hide();
  $('#contenedorDetalle').hide();
  $('#contenedorItinerario').hide();
  $('#contenedorTerraza').hide();
  $('#contenedorSol').show();
}

function cerrar_sesion(){	 
	 var xmlhttp =new XMLHttpRequest();
	 xmlhttp.open("GET", "http://www.fulp.es/FULP/mensajesapp/registro_app.php?uuid="+uuid+"&cerrar=S",false);
	 xmlhttp.send(null);	
	 $("#binicio").attr("src","img/binicio.png");
}

function change(a)
{
	//document.getElementById("pagina").value=a;
	pagina = a;
	window.localStorage.setItem("pagina", pagina);
	document.getElementById('irpagina').submit();
}

function anadir_favorito(tipo,codigo,id){	 
	 var xmlhttp =new XMLHttpRequest();
	 xmlhttp.open("GET", "http://www.fulp.es/FULP/mensajesapp/registro_app.php?uuid="+uuid+"&tipo="+tipo+"&codigo="+codigo+"&newfavorito=S",false);
	 xmlhttp.send(null);	
	 $("#icofavorito"+id).attr("src","img/strellaon.png");
	 $("#enlcfavorito"+id).attr("onclick",'eliminar_fav(\''+tipo+'\',\''+codigo+'\',\''+ id +'\')'); 
}

function eliminar_fav(tipo,codigo,id){	 
	 var xmlhttp =new XMLHttpRequest();
	 xmlhttp.open("GET", "http://www.fulp.es/FULP/mensajesapp/registro_app.php?uuid="+uuid+"&tipo="+tipo+"&codigo="+codigo+"&nofavorito=S",false);
	 xmlhttp.send(null);	
	 $("#icofavorito"+id).attr("src","img/strellaoff.png");
	 $("#enlcfavorito"+id).attr("onclick",'anadir_favorito(\''+tipo+'\',\''+codigo+'\',\''+ id +'\')'); 
	 
}

function eliminar_fav2(tipo,codigo,id){	 
	 var xmlhttp =new XMLHttpRequest();
	 xmlhttp.open("GET", "http://www.fulp.es/FULP/mensajesapp/registro_app.php?uuid="+uuid+"&tipo="+tipo+"&codigo="+codigo+"&nofavorito=S",false);
	 xmlhttp.send(null);	
	 
	 getFavoritosList();
}

function avisosVistos(){	 
	 var xmlhttp =new XMLHttpRequest();
	 xmlhttp.open("GET", "http://www.fulp.es/FULP/mensajesapp/registro_app.php?regId="+regId+"&avisovisto=S",false);
	 xmlhttp.send(null);	
}
