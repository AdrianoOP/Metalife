var intervalo;
var first_offset;
const desloc=1;//em px
const velocidade=30;//em px/segundo
const max_lim=-140;//em px

$(document).ready(function() {

    $bTras=$("#bTras"); $bFrente=$("#bFrente");
	$bTras.html("<<<"); $bFrente.html(">>>");
	$pTras=$("#pTras");
	startup($bTras,$bFrente,$pTras);
	
	$pTras.load(function(){
		//deve ser ativida com o load e nao com o pronto
		//porque com o pronto o jquery ainda nao sabe a posicao
		//de offset
		first_offset = $pTras.offset().left;
		$pTras.css("z-index","1000");
		$pTras.css("left",(first_offset/2+160).toString()+"px");
		//eh interessante considerar que o ladder sempre vai iniciar de uma posicao conhecida
		//No caso o maximo da excursao do atuador
		//pega o primeiro offset da imagem na pagina
		//eh importante para calibrar a funcao
	});
	//$bTras.click(function(){
		//$.get('php/proxy_instavel.php?command=0', function(data) {
		//	alert(data);
		//});
        //vaiTras($("#pFrente"),max_lim);
		//alert("click");
	//});
	//$bFrente.click(function(){
		//$.get('php/proxy_instavel.php?command=1', function(data) {
		//	alert(data);
		//});
        //vaiFrente($("#pFrente"),0);
		//alert("click");
	//});
	//$bTras.mousedown(function(){
		//$.get('php/proxy_instavel.php?command=2', function(data) {
		//	alert(data);
		//});
        //vaiTras_linear($("#pFrente"),max_lim);
	//});
	//$bFrente.mousedown(function(){
		//$.get('php/proxy_instavel.php?command=3', function(data) {
		//	alert(data);
		//});
        //vaiFrente_linear($("#pFrente"),0);
	//});
	//$(document).mouseup(function(){
			
	//});
	
});

function startup(tras, frente, jobj){
	var cf = function(){continuos_frente(jobj);};
	var ct = function(){continuos_tras(jobj);};
	tras.bind('touchstart',ct);
	frente.bind('touchstart',cf);
	tras.bind('mousedown',ct);
	frente.bind('mousedown',cf);
	tras.bind('mouseup', function(){parar();});
	frente.bind('mouseup', function(){parar();});
	tras.bind('touchend', function(){parar();});
	frente.bind('touchend', function(){parar();});
}

function continuos_frente(jobj){
	clearInterval(intervalo);
	var func = function(){vaiFrente(jobj,max_lim*(-1))};
	intervalo = setInterval(func,(desloc/velocidade)*1000);
}

function continuos_tras(jobj){
	clearInterval(intervalo);
	var func = function(){vaiTras(jobj,max_lim)};
	intervalo = setInterval(func,(desloc/velocidade)*1000);
}
function parar(){
	clearInterval(intervalo);
}


//funcoes que controlam a animacao do ladder
function vaiFrente(jobj,limite){
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

function vaiTras(jobj,limite){
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