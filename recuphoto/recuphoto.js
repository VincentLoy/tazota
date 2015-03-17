$(document).ready(principale) ;

function principale(){
    console.log("youhou");
    $.ajax({
	url:'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ea7d94db5e099cd59bc86a7460b563b1&user_id=131175339%40N05&format=json&nojsoncallback=1&auth_token=72157651388906202-cf9368145e8da944&api_sig=7d986f69ee4e77fb58c6b3b5ecf81d51',
	success: function(resultat)
				{
                    $(resultat.photos.photo).each(function(){
							console.log(this.title);
    				});
				}
    });
}