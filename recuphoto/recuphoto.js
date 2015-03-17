$(document).ready(principale) ;

function principale(){
    console.log("youhou");
    $.ajax({
	url:'https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=ea7d94db5e099cd59bc86a7460b563b1&user_id=131175339%40N05&extras=geo,url_sq,url_t, url_s, url_q, url_m, url_n, url_z, url_c, url_l, url_o&format=json&nojsoncallback=1;',
	success: function(resultat)
				{
                    console.dir(resultat);
                    $(resultat.photos.photo).each(function(){
							console.log(this.title);
                            console.log(this.latitude);
                            console.log(this.longitude);
                            var img=("<img src='"+this.url_s+"' >");
                            var infos=('<p>titre: '+this.title+' latitude: '+this.latitude+' longitude: '+this.longitude+'</p>');
                            var li=$('<li>');
                            li.append(img);
                            li.append(infos);
                            $("#gallerie").append(li);
                            
    				});
				}
    });
}
