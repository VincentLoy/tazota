$(document).ready(principale) ;

function principale(){
    
    console.log("test requete photos");
    
    /* Requete permettant de recuperer toutes les photos dans differents format faites par l'utilisateur, son nom, sa position gps, et son lien */
    
    $.ajax({
	url:'https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=ea7d94db5e099cd59bc86a7460b563b1&user_id=131175339%40N05&extras=geo,url_sq,url_t, url_s, url_q, url_m, url_n, url_z, url_c, url_l, url_o, comments&format=json&nojsoncallback=1;',
	success: function(resultat)
				{
                    /*console.dir(resultat);*/
                    $(resultat.photos.photo).each(function(){
                            /* test */
                            /*
							console.log(this.title);
                            console.log(this.latitude);
                            console.log(this.longitude);*/
                        
                            /* affichage dans le html */
                            var img=("<img src='"+this.url_s+"' >");
                            var infos=('<p>titre: '+this.title+' latitude: '+this.latitude+' longitude: '+this.longitude+'</p>');
                            
                            var photoOriginale=('<a href="'+this.url_o+'" target="_blank"> photo originale</a>');
                        
                            /* creation d'un lien commentaire pour afficher les commentaires quand ils sont demandes */
                            var commentaires=('<a href="#" class="commentaires"> ses commentaires</a>');
                            
                            var li=$('<li data-id='+this.id+'>');
                            li.append(img);
                            li.append(infos);
                            li.append(photoOriginale);
                            li.append(commentaires);
                            
                            $("#gallerie").append(li);                                                             
    				});
				}
    });
}


/* cela ne se lance que lorsque la requete ajax est terminée */
$(document).ajaxComplete(function(){
    
    console.log("test ajax");
    
    $('.commentaires').on('click', affichCom);
    
});

function affichCom(){
    
        /* recupération de l'id de la photo qui est stocke dans le li dans un attribut data id */
        var idphoto=$(this).parent().data('id');
        console.log(idphoto);
        
        $.ajax({
	       url:'https://api.flickr.com/services/rest/?method=flickr.photos.comments.getList&api_key=ea7d94db5e099cd59bc86a7460b563b1&photo_id='+idphoto+'&format=json&nojsoncallback=1&auth_token=72157651388906202-cf9368145e8da944&api_sig=ee93a8e53a8b9daef51d88b1a75fff32',
	       success: function(resultat)
				{
                    console.dir(resultat);
                    /*
                    $(resultat.comments.comment).each(function(){
                        console.log(this._content);
                    });*/
				}
        });
    }

