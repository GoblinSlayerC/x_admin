<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<style>
		*{
			margin: 0;
			padding: 0;
		}
		html,body{
			height: 100%;
		}
		.background {
			width: 100%;
			height: 100%;
			z-index: -1;
			position: absolute;
			
		}
		.bg{
			background: url("public/1.jpg");
			background-repeat: no-repeat;
			height: 100%;
			width: 100%;
			background-size: 100%;
		}
		.front {
			z-index: 1;
			position: absolute;
		}
	</style>
</head>

<body class="bg">

</body>
</html>