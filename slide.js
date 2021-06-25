// slideshow photos, descriptions, and credits

var i = 0; //the strting point 
var imames = [];
var time = 3000;

<img name="slide" width="400" height="200"></img>

// Images List
images[0] = 'photo1.jpg';
images[1] = 'photo2.jpg';
images[2] = 'photo3.jpg';
images[3] = 'photo4.jpg';
images[4] = 'photo5.jpg';
images[5] = 'photo6.jpg';
images[6] = 'photo7.jpg';
images[7] = 'photo8.jpg';

//function to hange images 

function changeImg(){
	document.hasChildNodes.src[i];

	if(i < images.length -1){
		i++;
	} else {
		i = 0;
	}

	setTimeout("changeImg()", time);
}

/**
 * Flip through x number of images.
 * negative number goes to backwards.
 * auto wraps number
 * if no x param passed, it will default to 1 (one picture to the right)
 * @param {number} x
 */
function flip(x = undefined) {
	// by default, flip +1 if nothing is passed in
	if (typeof x !== 'number') {
		return flip(1);
	}

	// calculate next index
	// i thought ((currentImg + x) % images.length) would have worked, but i guess javascript's modulo with negative numbers is wonky
	const nextIndex =
		(((currentImg + x) % images.length) + images.length) % images.length;
	setImage(nextIndex);
}

/**
 * Toogle or set autoplay
 * calling this function without the "set" param will toggle
 * @param {boolean} [set] set boolean of autoplay
 */
function setAutoplay(set = undefined) {
	autoplay = typeof set !== 'boolean' ? !autoplay : set;

	const icon = document.querySelector('#control-autoplay > i');
	if (autoplay) {
		autoplayInterval = setInterval(flip, autoplayDuration);
		icon.className = 'fas fa-pause';
		console.log('AUTOPLAY IS ON');
	} else {
		autoplayInterval && clearInterval(autoplayInterval);
		autoplayInterval = undefined;
		icon.className = 'fas fa-play';
		console.log('AUTOPLAY IS OFF');
	}
}

/**
 * Update indicators to show index of current image
 * @param {number} index
 */
function updateIndicator(index) {
	const indicatorParent = document.querySelector('#indicator');
	// remove all children - not very efficent... but it works
	indicatorParent.innerHTML = '';

	// add back children with appropicate indicator type and listener
	for (let i = 0; i < images.length; i++) {
		const indicator = document.createElement('i');
		indicator.className = `${i === index ? 'fas' : 'far'} fa-circle`;
		indicator.addEventListener('click', () => {
			setImage(i);
		});
		// i === index ? (indicator.style.color = "yellow") : null; // doesn't look great

		indicatorParent.appendChild(indicator);
	}
}

// respond to arrow keys
document.addEventListener('keydown', (e) => {
	switch (e.key) {
		case 'ArrowRight':
			flip(1);
			break;
		case 'ArrowLeft':
			flip(-1);
			break;
		case ' ':
			setAutoplay();
			break;
	}
});