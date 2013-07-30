var intervalo;
var first_offset;
const desloc=1;//em px
const velocidade=4;//em px/segundo
const max_lim=120;//em px
var ultimapos=0;
var flag=1;
var frente=0;
var tras=0;

$(document).ready(function() {
	ultimapos=0;
	flag=1;
	frente=0;
	tras=0;
	flag=1;
	$bTras=$("#bTras"); $bFrente=$("#bFrente");
	$pTras=$("#pTras");
	$.get('php/manipuladorArquivos.php?nome=teste.txt&valor',function(retorno){
		if(retorno=="Erro"){
			//flag++;
			flag++;
			ultimapos=128;
			startup($bTras,$bFrente,$pTras);
		}else if(retorno!="Erro"){
			flag++;
			ultimapos=128;
			startup($bTras,$bFrente,$pTras);
		}else{
			alert("Erro ao identificar a posição do ladder!\n Reinicie a página!");
		}
	});
});

function startup(tras, frente, jobj){
	var cf = function(){continuos_frente(jobj,frente);};
	var ct = function(){continuos_tras(jobj,tras);};
	var luud = function(){ld(jobj);};
	tras.bind('touchstart',ct);
	frente.bind('touchstart',cf);
	tras.bind('mousedown',ct);
	frente.bind('mousedown',cf);
	tras.bind('mouseup', function(){parar();});
	frente.bind('mouseup', function(){parar();});
	tras.bind('touchend', function(){parar();});
	frente.bind('touchend', function(){parar();});
	jobj.bind('load', luud);
	ld(jobj);
}

function ld(jobj){
	//deve ser ativada com o load e nao com o pronto
	//porque com o pronto o jquery ainda nao sabe a posicao
	//de offset
	if(flag>2)//garante que nao passe duas vezes por este ponto deixando estavel o script
		return;
	first_offset = jobj.offset().left;
	if(ultimapos==null){
		jobj.css("left","100px");
	}else{
		jobj.css("left",ultimapos.toString()+"px");
	}
	//eh interessante considerar que o ladder sempre vai iniciar de uma posicao conhecida
	//No caso o maximo da excursao do atuador
	//pega o primeiro offset da imagem na pagina
	//eh importante para calibrar a funcao
}

function continuos_frente(jobj,pai){
	
	if(frente==0&&tras==0){
	parar(); //primeira coisa eh se certificar que o arduino parou o atuador
	pai.css("background-color","gray");
	$.get('php/proxy_instavel.php?command=3', function(retornoArduino) { 
		var n = retornoArduino.search("tras_continuos_ok");
		if(n>0){
			frente=1;
		var func = function(){vaiFrente(jobj,max_lim)};
			intervalo = setInterval(func,(desloc/velocidade)*1000);
		}else{
			parar();
			alert("Erro!!! Retorno:\n"+retornoArduino);
		}
	});
	pai.on("mouseout",function(){parar();});
	//as linhas abaixo devem ser desabilitadas, quando funcionando com arduino
	//var func = function(){vaiFrente(jobj,max_lim)};
	//intervalo = setInterval(func,(desloc/velocidade)*1000);
	}
}

function continuos_tras(jobj,pai){
	
	if(tras==0&&frente==0){
	parar(); //primeira coisa eh se certificar que o arduino parou o atuador
	pai.css("background-color","gray");
	$.get('php/proxy_instavel.php?command=2', function(retornoArduino) {
		var n = retornoArduino.search("frente_continuos_ok");
		if(n>0){
			tras=1;
			var func = function(){vaiTras(jobj,0)};
			intervalo = setInterval(func,(desloc/velocidade)*1000);
		}else{
			parar();
			alert("Erro!!! Retorno:\n"+retornoArduino);
		}
	});
	pai.on("mouseout",function(){parar();});
	//as linhas abaixo devem ser desabilitadas, quando funcionando com arduino
	//var func = function(){vaiTras(jobj,0)};
	//intervalo = setInterval(func,(desloc/velocidade)*1000);
	}
}

function parar(){
	$("#bFrente").css("background-color","white");
	$("#bTras").css("background-color","white");
	$.get('php/proxy_instavel.php?command=4', function(retornoArduino) {
		clearInterval(intervalo);
		var n = retornoArduino.search("stopped");
		if(n>0){
			frente=0;
			tras=0;
			//alert("oi");
		}else{
			alert("Erro!!! Retorno:\n"+retornoArduino);
		}
	});
	$("#bTras").off("mouseout");
	$("#bFrente").off("mouseout");
	pos=$("#pTras").offset().left;
	$.get('php/manipuladorArquivos.php?nome=teste.txt&valor='+pos,function(retorno){
		if(retorno!="Erro"){
			ultimapos=retorno;
		}else{
			alert("Erro ao identificar a posição do ladder");
		}
	});
}

//funcoes que controlam a animacao do ladder
function vaiFrente(jobj,limite){
		if(tras==0&&frente==1){
		posleft=jobj.offset().left-first_offset;
		if(posleft<limite){
			posleft10=posleft+desloc;
			if(posleft10>limite){		
				posleft10=limite;
			}
			jobj.css("left",posleft10.toString()+"px");
		}else{
			//alert("você não pode mais Avançar");
		}
		}
}

function vaiTras(jobj,limite){
		if(tras==1&&frente==0){
		posleft=jobj.offset().left-first_offset;
			//alert(posleft);
		if(posleft>limite){
			posleft10=posleft-desloc;
			if(posleft10<limite){		
				posleft10=limite;
			}
			jobj.css("left",posleft10.toString()+"px");
		}else{
			//alert("você não pode mais Recuar");
		}
		}
}