<?php
/*Este Script PHP ira manipular um arquivo de configuracoes txt apenas para posicoes no script em java
*/
clearstatcache();
$filename=$_GET['nome'];
$value=$_GET['valor'];
if($value!=null){
	$file=fopen($filename,"w");//abre o arquivo para escrita
	if(!$file){
		echo("Erro");
	}else{
		if(!fwrite($file,$value))
			echo("Erro");
		fclose($file);
	}
}
else{
	if(file_exists($filename)){
		$file=fopen($filename,"r");//abre o arquivo para escrita
		if(!$file){
			echo("Erro");
		}else{
			$lido = fread($file,100);
			if($lido!=''&&$lido!=null)
				echo $lido;
				else
				echo("Erro");
			fclose($file);
		}
	}else{
		echo("Erro");
	}
}
?>