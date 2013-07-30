var first_offset;

$(document).ready(function() {
    $bTras=$("#bTras"); $bFrente=$("#bFrente");
	$bTras.html("<<"); $bFrente.html(">>");
	var max_lim = -140;
	$("#pFrente").load(function(){
		//deve ser ativida com o load e nao com o pronto
		//porque com o pronto o jquery ainda nao sabe a posicao
		//de offset
		first_offset = $("#pFrente").offset().left;
		//eh interessante considerar que o ladder sempre vai iniciar de uma posicao conhecida
		//No caso o maximo da excursao do atuador
		//pega o primeiro offset da imagem na pagina
		//eh importante para calibrar a funcao
	});
	
	$bTras.click(function(){
		//alert("entrei bTras!");
        	vaiTras($("#pFrente"),max_lim);
	});
	$bFrente.click(function(){
		//alert("entrei bFrente");
        	vaiFrente($("#pFrente"),0);
	});
});

function vaiFrente(jobj,limite){
	posleft=jobj.offset().left-first_offset;
    	//alert(posleft);
	if(posleft<limite){
		posleft10=posleft+10;
		if(posleft10>limite){		
			posleft10=limite;
		}
        	//alert(posleft10.toString());
		jobj.css("left",posleft10.toString()+"px");
	}else{
		//alert("você não pode mais Avançar");
	}
}

function vaiTras(jobj,limite){
	posleft=jobj.offset().left-first_offset;
    	//alert(posleft);
	if(posleft>limite){
		posleft10=posleft-10;
		if(posleft10<limite){		
			posleft10=limite;
		}
        //alert(posleft10);
		jobj.css("left",posleft10.toString()+"px");
	}else{
		//alert("você não pode mais Recuar");
	}
}