<?php  
// Start the session since phpFlickr uses it but does not start it itself
session_start();

// Require the phpFlickr API
require_once('phpFlickr-master/phpFlickr.php');

// Create new phpFlickr object: new phpFlickr('[API Key]','[API Secret]')
$flickr = new phpFlickr('d94910ea3a87e262d42db388b4cb73c4','3533853b2a59546f', true);

// Authenticate;  need the "IF" statement or an infinite redirect will occur
if(empty($_GET['frob'])) {
	$flickr->auth('write'); // redirects if none; write access to upload a photo
}
else {
	// Get the FROB token, refresh the page;  without a refresh, there will be "Invalid FROB" error
	$flickr->auth_getToken($_GET['frob']);
	header('Location: flickr.php');
	exit();
}


// Send an image sync_upload(photo, title, desc, tags)
// The returned value is an ID which represents the photo
$result = $flickr->sync_upload('test.jpg','Un Titre', 'Une description', 'tag1,tag2');
?>
