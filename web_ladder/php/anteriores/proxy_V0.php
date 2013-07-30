<?php
/*Este Script PHP esta fazendo papel de proxy entre um evento na pagina HTML
e o arduino.
O script "escuta" as requisicoes do HTML atraves de uma requisicao do tipo GET
com o seguinte padrao ?command=x&params=a:b:c:d
Sendo x os comandos que os usuarios querem usar e params os parametros pra aquele comando
caso haja mais de um parametro, este deve ser separado por dois pontos

A resposta eh dada pelo arduino em formato de resposta web HTTP 200 etc.
*/
$T0=microtime();

$T0=explode(" ",$T0);

$T1=$T0[0]+$T0[1];

$sock = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
if(!socket_connect($sock,"192.168.1.15", 80)){
	echo("Unable to connect");
}
$T0=microtime();

$T0=explode(" ",$T0);

$T2=$T0[0]+$T0[1];

echo ($T2-$T1)*1000;
echo "ms<br/>";




$T0=microtime();

$T0=explode(" ",$T0);

$T1=$T0[0]+$T0[1];

$tipo=$_GET['command'];
$buf = "GET /?".$tipo." HTTP 1.0"; // pedido para o cliente


$len = strlen($buf);

$bytes_sent = socket_write($sock, $buf, $len);
if ($bytes_sent == -1)
        echo('An error occured while sending to the socket');
else if ($bytes_sent != $len)
        echo($bytes_sent . ' bytes have been sent instead of the ' . $len . ' bytes expected');

		$valor=-100;
		
$valor=socket_read($sock, 100);

while($valor==-100);

echo $valor;

$pos=strpos($valor,"=");

$T0=microtime();

$T0=explode(" ",$T0);

$T2=$T0[0]+$T0[1];

echo ($T2-$T1)*1000;
echo "ms<br/>";


socket_close($sock); //fecha a comunicacao via socket com o arduino extremamente rapido
?>