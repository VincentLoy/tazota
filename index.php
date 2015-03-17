<?php
/**
 * Created by PhpStorm.
 * User: Samsung
 * Date: 17/03/2015
 * Time: 00:02
 */
    var_dump($_FILES);

    if(1=1 /* Un traitement */) {

        //on se connecte a l'API et on envoi la photo envoyée
        $api = new FlickrAPI();

        $api::send($img);
    }

?>

<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>testUpload</title>
</head>
<body>
<form action method="post">
    <input type="file" id="pict_upl" name="pict"/>
    <button type="submit">Envoyer</button>
</form>
</body>
</html>