var player, iframe;
var $ = document.querySelector.bind(document);
/**
 * Simulate a click event.
 * @public
 * @param {Element} elem  the element to simulate a click on
 */
var simulateClick = function (elem) {
	// Create our event (with options)
	var evt = new MouseEvent('click', {
		bubbles: true,
		cancelable: true,
		view: window
	});
	// If cancelled, don't dispatch our event
	var canceled = !elem.dispatchEvent(evt);
};

document.addEventListener("onreadystatechange", function(){
  // check if the DOM is fully loaded
  if(document.readyState === "complete"){
    // remove the listener, to make sure it isn't fired in future
    document.removeEventListener("onreadystatechange", arguments.callee);
    var someLink = document.querySelector('button');
    simulateClick(someLink);
  }
});

// init player
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '200',
    width: '300',
    list: 'dQw4w9WgXcQ',
    listtype: 'playlist',
	  autoplay: true,
    fs: true,
    events: {
      'onReady': onPlayerReady
    }
  });
}

// when ready, wait for clicks
function onPlayerReady(event) {
  var player = event.target;
  iframe = $('#player');
  setupListener(); 
}

function setupListener (){
$('button').addEventListener('click', playFullscreen);
}

function playFullscreen (){
  player.playVideo();//won't work on mobile
  
  var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
  if (requestFullScreen) {
    requestFullScreen.bind(iframe)();
  }
}
