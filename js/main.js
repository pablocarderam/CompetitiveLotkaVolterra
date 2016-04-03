// JavaScript Document PetriDish main, by pablo cr. TO DO: genome and phylogeny line visualization, selective antibiotics

function mainLoop() {
	if (!killSwitch) { // if killswitch off...
        // update population time series
		var newPop = rK4_2D(popA.length*tStep, tStep, dA_dt, popA[popA.length-1], dB_dt, popB[popB.length-1]);
		popA.push(newPop[0]);
		popB.push(newPop[1]);

		if (newPop[0]>maxA) {
			maxA = newPop[0];
		}
		if (popB[popB.length-1]>maxB) {
			maxB = newPop[1];
		}

		if (viewMode == TIME_SERIES) { // If viewmode is time series
            drawTimeSeries();
        }
        else if (viewMode == ISOCLINES) { // else if viewmode is isoclines
            drawIsoclines();
        }

		if (!killSwitch) {
			gLoop = setTimeout(mainLoop, 1000/fps); // loop the main loop
		}
	}
}

function tsBtnHandler() {
	viewMode = TIME_SERIES;
	if (killSwitch) {
		document.getElementById("run-pause").value = "Run";
	}
	else {
		document.getElementById("run-pause").value = "Pause";
	}
	drawTimeSeries();
}

function isoBtnHandler() {
	viewMode = ISOCLINES;
	if (killSwitch) {
		document.getElementById("run-pause").value = "Run";
	}
	else {
		document.getElementById("run-pause").value = "Pause";
	}
	drawIsoclines();
}

function runPause() {
	if (killSwitch) {
		killSwitch = false;
		document.getElementById("run-pause").value = "Pause";
		mainLoop();
	}
	else {
		killSwitch = true;
		document.getElementById("run-pause").value = "Run";
	}
}

function restart() {
	killSwitch = true;
	document.getElementById("run-pause").value = "Run";
	popA = [popA0];
	popB = [popB0];
	maxA = popA0;
	maxB = popB0;// init vars

	ctx.fillStyle = "#FFFFFF"; // erase stage
	ctx.fillRect(0, 0, centerX*2, centerY*2);

    if (viewMode == TIME_SERIES) { // If viewmode is time series
        drawTimeSeries();
    }
    else if (viewMode == ISOCLINES) { // else if viewmode is isoclines
        drawIsoclines();
    }

	gLoop = setTimeout(init, 1000/10); // pause before starting (fixes restart bug)
}

function init() {
	killSwitch = true;
	document.getElementById("run-pause").value = "Run";
	mainLoop();
}

restart();
