// JavaScript Document, graph functions

function drawTimeSeries() {
    maxP = Math.max(maxA,maxB);
    var time = new Array(popA.length);
    var maxT = time.length;
    var propA = new Array(maxT);
    var propB = new Array(maxT);
    for (var i = 0; i < maxT; i++) {
        propA[i] = centerY*2*(1-popA[i]/maxP);
        propB[i] = centerY*2*(1-popB[i]/maxP);
        time[i] = centerX*2*i/maxT;
    }
    clearStage();
    graphData(time,propA,'#339900');
    graphData(time,propB,'#FF0000');
    drawAxis("Tiempo",0,maxT,"Población",0,maxP);
}

function drawIsoclines() {
    if (alphaBA == 0 || alphaAB == 0) {
        clearStage();
        ctx.fillStyle = "#000000"; // erase stage
        ctx.fillText("No se pueden graficar nulclinas", centerX-60, centerY-20);
        ctx.fillText("para los casos alfa_AB=0 y alfa_BA=0", centerX-70, centerY);
        ctx.fillText("(incluyendo el modelo logístico).", centerX-60, centerY+20);
    }
    else {
        maxX = Math.max(maxA,kA,kB/alphaBA);
        maxY = Math.max(maxB,kB,kA/alphaAB);
        var propA = new Array(popA.length);
        var propB = new Array(popB.length);
        for (var i = 0; i < propA.length; i++) {
            propA[i] = centerY*2*(popA[i]/maxX); // on X axis
            propB[i] = centerY*2*(1-popB[i]/maxY);
        }
        clearStage();
        ctx.lineWidth = 2;
    	ctx.lineCap = 'round';
    	ctx.lineJoin = 'round';

    	ctx.strokeStyle = '#FF0000'; // draw A isocline
        ctx.beginPath();
        ctx.moveTo(0, centerY*2*(1-kB/maxY)); // move line from last point...
        ctx.lineTo(centerX*2*(kB/alphaBA)/maxX, centerY*2); // ...to next
    	ctx.stroke();

        ctx.strokeStyle = '#339900'; // draw B isocline
        ctx.beginPath();
        ctx.moveTo(0, centerY*2*(1-(kA/alphaAB)/maxY)); // move line from last point...
        ctx.lineTo(centerX*2*kA/maxX, centerY*2); // ...to next
    	ctx.stroke();

        ctx.strokeStyle = '#FF9900'; // draw initial point
        ctx.fillStyle = '#FF9900';
        ctx.beginPath();
        ctx.arc(centerX*2*popA0/maxX, centerY*2*(1-popB0/maxY), 2, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
        graphData(propA,propB,'#FF9900'); // Graph path of population

        drawAxis("Población A",0,maxX,"Población B",0,maxY);
    }
}

function dA_dt(t,A,B) {
    return rA*A*(1-((A+alphaAB*B)/kA));
}

function dB_dt(t,A,B) {
    return rB*B*(1-((B+alphaBA*A)/kB));
}

function rK4_2D(t, dt, f1, x1, f2, x2) {
    var k1_1 = f1(t, x1, x2);
    var k2_1 = f2(t, x1, x2);

    var k1_2 = f1(t + dt/2, x1 + k1_1 * dt/2, x2 + k2_1 * dt/2);
    var k2_2 = f2(t + dt/2, x1 + k1_1 * dt/2, x2 + k2_1 * dt/2);

    var k1_3 = f1(t + dt/2, x1 + k1_2 * dt/2, x2 + k2_2 * dt/2);
    var k2_3 = f2(t + dt/2, x1 + k1_2 * dt/2, x2 + k2_2 * dt/2);

    var k1_4 = f1(t + dt, x1 + k1_3 * dt, x2 + k2_3 * dt);
    var k2_4 = f2(t + dt, x1 + k1_3 * dt, x2 + k2_3 * dt);

    var x1Next = x1 + dt/6 * (k1_1 + 2*k1_2 + 2*k1_3 + k1_4);
    var x2Next = x2 + dt/6 * (k2_1 + 2*k2_2 + 2*k2_3 + k2_4);

    return [x1Next, x2Next];
}


function clearStage() {
    ctx.fillStyle = "#FFFFFF"; // erase stage
	ctx.fillRect(0, 0, centerX*2, centerY*2);
}

function drawAxis(xLab,minX,maxX,yLab,minY,maxY) { // draw scale
    ctx.fillStyle = '#000000'; // write scale
	for (var i=0; i<=5; i++) {
		ctx.fillText(Math.round((i*1/5*(maxX-minX)-minX) * 100) / 100, 2*centerX *i* 1/5, 2*centerX-10);
	}
    for (var i=0; i<=5; i++) {
		ctx.fillText(Math.round((i*1/5*(maxY-minY)-minY) * 100) / 100, 10, 2*centerY * (1-i*1/5));
	}
    ctx.fillText(yLab, 10, 10);
    ctx.fillText(xLab, 1.75*centerX, 2*centerY-10);
}

function graphData(dataX,dataY,color) { // draw population and resource graphs
	ctx.lineWidth = 2;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';

	ctx.strokeStyle = color; // draw curve
	ctx.beginPath();
	for (var i=1; i<dataX.length; i++) {
		ctx.moveTo(dataX[i-1],dataY[i-1]); // move line from last point...
		ctx.lineTo(dataX[i],dataY[i]); // ...to next
	}
    ctx.stroke();
}

// Setter methods
function updateFps(newVal) {
	fps = parseFloat(newVal);
}

function updatePopA0(newVal) {
	popA0 = parseFloat(newVal);
}

function updatePopB0(newVal) {
	popB0 = parseFloat(newVal);
}

function updateKA(newVal) {
	kA = parseFloat(newVal);
}

function updateKB(newVal) {
	kB = parseFloat(newVal);
}

function updateRA(newVal) {
	rA = parseFloat(newVal);
}

function updateRB(newVal) {
	rB = parseFloat(newVal);
}

function updateAlphaAB(newVal) {
	alphaAB = parseFloat(newVal);
}

function updateAlphaBA(newVal) {
	alphaBA = parseFloat(newVal);
}

function updateTStep(newVal) {
	tStep = parseFloat(newVal);
}

function logBtnHandler(newVal) {
    alphaAB = 0;
    alphaBA = 0;
    document.getElementById('alpha_ABField').value = 0;
    document.getElementById('alpha_BAField').value = 0;
}
