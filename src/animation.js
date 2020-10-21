var off_screen = false;

function slidePiano() {
	var inst_container = document.getElementById("instrumentBlock");
	var slide_x        = 100;
	
	if (off_screen == false) {
		var x_sofar = 0;
		var id = setInterval(move, .5);
		function move() {
			if (x_sofar == -slide_x) {
				clearInterval(id);
			} else {
				x_sofar = x_sofar - .25;
				inst_container.style.transform = "translate(" + x_sofar + "%)";
			}
		}
		off_screen = true;
	} else {
		var x_sofar = -slide_x;
		var id = setInterval(move, .5);
		function move() {
			if (x_sofar == 0) {
				clearInterval(id);
			} else {
				x_sofar = x_sofar + .25;
				inst_container.style.transform = "translate(" + x_sofar + "%)"; 
			}
		}
		off_screen = false;
	}
}
