<?php
/**
 * Created by PhpStorm.
 * User: Samsung
 * Date: 17/03/2015
 * Time: 00:02
 */
    

?>

<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Upload</title>
    <script src="jquery.min.js"></script> 
</head>
<body>



 <?php
     include('upload.php');
     ?>
<form  method="post" accept-charset="utf-8" enctype='multipart/form-data'>
         <p>Nom:  <input type="text" name="name" value="" ></p>
         <p>Photo: <input type="file" name="file"/></p>
        <p><input type="submit" value="Envoyer"></p>
</form>
</body>
</html>