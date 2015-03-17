<?php
/**
 * Created by PhpStorm.
 * User: Vincent
 * Date: 16/03/2015
 * Time: 23:43
 */


/**
 * Class FlickrAPI
 */
class FlickrAPI {
    private $secret;
    private $key;

    /**
     * Constructor
     */
    public function __constructor() {

        //Ceci sont mes clé, il faudra en généré d'autres avec le compte flickr Tazota qui est a créer
        $this->key = "86fc49ca07f00a29ec1128afb54e73c2";
        $this->secret = "067e4f108da534c8";

    }

    /**
     * static function to send a new picture to the flickr account
     */
    public static function send($img) {

        //traitement de la photo + envoi sur flickr

    }
}