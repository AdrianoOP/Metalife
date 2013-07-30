<?php

$sock = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
if(!socket_connect($sock,"192.168.1.15", 80)){
	echo("Unable to connect");
}

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
socket_close($sock);
//echo $valor[$pos+1];
?>