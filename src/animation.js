var off_screen = false;

function slide_piano() {
	var piano_container = document.getElementById("pianoBlock");
	
	if (off_screen == false) {
		var x_sofar = 0;
		//var yrot_sofar = 0;
		//var xrot_sofar = 0;
		var id = setInterval(move, .5);
		function move() {
			if (x_sofar == -80) {
				clearInterval(id);
			}
			else {
				x_sofar = x_sofar - .25;
				//yrot_sofar = yrot_sofar + .45;
				//xrot_sofar = xrot_sofar - .45;
				piano_container.style.transformOrigin = "50% 50%";
				piano_container.style.transform = "translate(" + x_sofar + "%)";
				//rotateX(" + xrot_sofar + "deg) rotateY(" + yrot_sofar + "deg)";
			}
		}
		off_screen = true;
	} else {
		var x_sofar = -80;
		//var yrot_sofar = 90;
		//var xrot_sofar = -90;
		var id = setInterval(move, .5);
		function move() {
			if (x_sofar == 0) {
				clearInterval(id);
			}
			else {
				x_sofar = x_sofar + .25;
				//yrot_sofar = yrot_sofar - .45;
				//xrot_sofar = xrot_sofar + .45;
				piano_container.style.transform = "translate(" + x_sofar + "%)"; 
				//rotateX(" + xrot_sofar + "deg) rotateY(" + yrot_sofar + "deg)";
			}
		}
		off_screen = false;
	}
}
