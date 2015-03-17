<?php
     //Include phpFlickr
     require_once("phpFlickr-master/phpFlickr.php");

     $error=0;
     $f = null;

     //traitement des données
     if($_POST){
         if(!$_POST['name'] || !$_FILES["file"]["name"]){
             $error=1;
         }else{
             if ($_FILES["file"]["error"] > 0){
                 echo "Error: " . $_FILES["file"]["error"] . "<br />";
             }else if($_FILES["file"]["type"] != "image/jpg" && $_FILES["file"]["type"] != "image/jpeg" && $_FILES["file"]["type"] != "image/png" && $_FILES["file"]["type"] != "image/gif"){
                 $error = 3;
             }else if(intval($_FILES["file"]["size"]) > 525000){
                 $error = 4;
             }else{
                 $dir= dirname($_FILES["file"]["tmp_name"]);
                 $newpath=$dir."/".$_FILES["file"]["name"];
                 rename($_FILES["file"]["tmp_name"],$newpath);
                 //Instantiate phpFlickr
                 $status = uploadPhoto($newpath, $_POST["name"]);
                 if(!$status) {
                     $error = 2;
                 }
              }
          }
     }

     function uploadPhoto($path, $title) {
         $apiKey = "d94910ea3a87e262d42db388b4cb73c4";
         $apiSecret = "3533853b2a59546f";
         $permissions  = "write";
         $token        = "72157651344342186-80dc05424a709dd6";

         $f = new phpFlickr($apiKey, $apiSecret, true);
         $f->setToken($token);
         //le fichier est uploadé de manière asynchrone
         return $f->async_upload($path, $title);
     }
 ?>