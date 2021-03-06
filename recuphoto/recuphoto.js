$(document).ready(principale) ;

function principale(){
    
    console.log("test requete photos");
    /* appel de la requete permettant d'afficher les photos de l'utilisateur Z'win */
    afficherPhotosFlickr();
    
    /* appel de la requete permettant d'afficher toutes les photos et les classes par note */
    sortPhotosByFavs();

}

function afficherPhotosFlickr(){
    /* Requete permettant de recuperer toutes les photos dans differents formats faites par l'utilisateur, son nom, sa position gps, et son lien */
    
    $.ajax({
	url:'https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=d94910ea3a87e262d42db388b4cb73c4&user_id=131175339%40N05&extras=geo,url_sq,url_t, url_s, url_q, url_m, url_n, url_z, url_c, url_l, url_o, comments&format=json&nojsoncallback=1;',
	success: function(resultat)
				{
                    /*console.dir(resultat);*/
                    $(resultat.photos.photo).each(function(){
                            /* test */
                            /*
							console.log(this.title);
                            console.log(this.latitude);
                            console.log(this.longitude);*/
                        
                            /* definition des éléments à afficher dans le html */
                            var img=("<img src='"+this.url_s+"' >");
                            var infos=('<p>titre: '+this.title+' latitude: '+this.latitude+' longitude: '+this.longitude+'</p>');
                            
                            var photoOriginale=('<a href="'+this.url_o+'" target="_blank"> photo originale</a>');
                        
                            /* creation d'un lien commentaire pour afficher les commentaires quand ils sont demandes */
                            var commentaires=('<a href="#" class="commentaires"> ses commentaires</a>');
                            var notes=('<a href="#" class="notes"> voir le nombre de favoris</a>');
                            
                            /* stockage de l'id dans un data pour pouvoir l'utiliser pour les commentaires et votes */
                            var li=$('<li data-id='+this.id+'>');
                        
                            /* ajout dans le html */
                            li.append(img);
                            li.append(infos);
                            li.append(photoOriginale);
                            li.append(commentaires);
                            li.append(notes);
                            
                            $("#gallerie").append(li);                                                             
    				});
				}
    });
}

/* cela ne se lance que lorsque la requete ajax est terminée */
$(document).ajaxComplete(function(){
    
    /* event click */
    $('.commentaires').on('click', affichCom);
    $('.notes').on('click', affichnbFavoris);
    
});

function affichCom(){
    
        /* recupération de l'id de la photo qui est stocke dans le li dans un attribut data id */
        var idphoto=$(this).parent().data('id');
        console.log(idphoto);
        
        $.ajax({
	       url:'https://api.flickr.com/services/rest/?method=flickr.photos.comments.getList&api_key=d94910ea3a87e262d42db388b4cb73c4&photo_id='+idphoto+'&format=json&nojsoncallback=1',
	       success: function(resultat)
				{
                    /*console.dir(resultat);*/
                    var ul=$('<ul>');
                    $(resultat.comments.comment).each(function(){
                        console.log(this.authorname);
                        console.log(this.datecreate);
                        console.log(this._content);
                        
                        /* l'api renvoie une date de type timestamp donc il faut la convertir */
                        var date=convertirTimeStamp(this.datecreate);
                        
                        var li=$('<li>');
                        var h2=('<h2> nom:'+this.authorname+' date: '+date+'</h2>');
                        var p=('<p>'+this._content+'</p>');
                        
                        li.append(h2);
                        li.append(p);
                        ul.append(li);
                        $('#commentaire_content').html(ul);
                    });
				}
        });
}

function convertirTimeStamp(timestamp){
    
    /* on cree une date de type date avec le timestamp */
    var date = new Date(timestamp*1000);
    
    /*recuperer du jour mois annees contenu dans l'objet date*/
    var jours = date.getDate();
    var mois= date.getMonth()+1;
    var annees= date.getFullYear();
    
    console.log(jours);
    console.log(mois);
    console.log(annees);
    
    /* on recupere les heures et les minutes */
    var hours = date.getHours();
    
    var minutes = "0" + date.getMinutes();
    
    /* la date renvoyée est de type 15h47 */
    var formattedTime = jours+'/'+mois+'/'+annees+' à '+hours + ':' + minutes.substr(minutes.length-2);
    
    return formattedTime;
}


function affichnbFavoris(){
    
        var idphoto=$(this).parent().data('id');
        console.log(idphoto);    
        
        /* requete permettant de recuperer le nombre de personnes qui ont mis cette photo en favoris */
        $.ajax({
	       url:'https://api.flickr.com/services/rest/?method=flickr.photos.getFavorites&api_key=d94910ea3a87e262d42db388b4cb73c4&photo_id='+idphoto+'&format=json&nojsoncallback=1',
	       success: function(resultat)
				{
                    /*console.dir(resultat);*/
                    
                    /* recuperation de l'attribut qui contient la taille du tableau */
                    nbAvis=resultat.photo.person.length;
                    console.log(nbAvis);
                    
                    var p=('<p>'+nbAvis+' favoris</p>');
                    $('#favoris').html(p);
				}
        });
}


function sortPhotosByFavs(){
    /* cette fonction est independante des autres elle va rerécuperer les photos et couple la methode pour afficher le nombre de favoris*/
    
    
    $.ajax({
	url:'https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=d94910ea3a87e262d42db388b4cb73c4&user_id=131175339%40N05&sort=interestingness-desc&extras=url_sq,url_t, url_s, url_q, url_m, url_n, url_z, url_c, url_l, url_o, comments&format=json&nojsoncallback=1;',
	success: function(resultat)
				{
                  console.log(resultat);
                  var ul=$('<ul>');
                  $(resultat.photos.photo).each(function(){
                      
                    var img=$("<img src='"+this.url_s+"' >"); 
                    console.log(img);
                    var li=$('<li>');
                    li.append(img);
                    ul.append(li);
                      
                  });
                    $("#best").append(ul);
				}
    });
}