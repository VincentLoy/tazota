$(document).ready(principale) ;

function principale(){
    console.log("youhou");
    $.ajax({
	url:'https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=ea7d94db5e099cd59bc86a7460b563b1&user_id=131175339%40N05&extras=geo&format=json&nojsoncallback=1;',
	success: function(resultat)
				{
                    console.dir(resultat);
                    /*
                    $(resultat.photos.photo).each(function(){
							console.log(this.latitude);
    				});*/
				}
    });
}
