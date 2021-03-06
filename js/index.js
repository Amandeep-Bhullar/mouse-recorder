// 1. When a user presses the record button, start recording actions
// 2. When recording, push an object with the important data to the array
//			- Clear the array before starting a new recording
// 3. Stop a recording by pressing the same button,then
//			- Print all of the position to the console using forEach: 123px 345px
// 4. Replay the recording by iterating through the Array and move a custom cursor 
//          to the position that was recorded

// few things for you to try to add to the mouse-recorder lab:
//5. Use a keyup event listener to start/stop the recording. event.code will show
//    you which key was pressed. Use that in a condition, within the handler callback,
// 	like if (event.code == e'Space'), for exampl

// 6.Slow down the mousemove event recording, so that not every event is logged. 
//	Try different thresholds to keep the stored data down, without compromising the
//	fluidity of the mouse. There are multiple way to do this, so do some planning and 
//	consideration before executing

// 7.Consider how you might also store other actions for replay, like keystrokes,
// 	movement of boxes (like drag/drop), etc.


//Global variables to reuse
let isRecording = false
let replaying = false
let mouseMoves = []   //an empty array which will hold subArray's elements on its indexes
const $startAndStop = document.getElementById('startAndStop')
const $replayRecording = document.getElementById('replayRecording')


//1. when the window will load $startAndStop button's placeholder will show Start Recording
window.addEventListener('load', () => {
	$startAndStop.innerHTML = "Start Recording";
})

let count = 0;
//on the event of mousemove, if the isRecording will be true then push the sub array into main mousemove array's indexes
window.addEventListener('mousemove', (event) => {
	count ++;
	// if recording is on, picks 1 in 2 movements captured
	if (isRecording && count%5==0) {
		// Record the data to the Array:
		const subArray = [event.clientX, event.clientY, event.timeStamp]
		mouseMoves.push({type: "move", val: subArray});
	}
})

const startStopFunction = () => {
	// Start/stop the recording
	if(!isRecording){
		isRecording=true;
		mouseMoves = []
		$startAndStop.innerHTML = "Stop Recording";
	}else{
		isRecording=false;
		$startAndStop.innerHTML = "Start Recording";
		mouseMoves.forEach(ele => {
			if(ele.type === "move")
				console.log(`mouse moved: ${ele.val[0]}px ${ele.val[1]}px`);
			else
				console.log(`key pressed: ${ele.val}`);
		});
	}
}
//calling the startStopFunction on the click event of startAndStop button
$startAndStop.addEventListener('click', startStopFunction)


//5.calling the startStopFunction while pressing the r key(keystrokes)  from the keyboard
window.addEventListener("keyup", event => {
	mouseMoves.push({type: "keyPressed", val: event.key});
	if(event.key === 'r'){
		startStopFunction()
	}
})
//6.Slow down the mousemove event recording
function sleep(time){
	return new Promise(r=>setTimeout(r, time));
}

//Global variables move a custom cursor to the position that was recorded
const cursor = document.getElementById("custCursor")
let currIndex = 0;
let xPos, yPos;
	
//Function named iterate()to move a custom cursor to the position that was recorded,
function iterate(){
	sleep(500)
	.then(()=>{
		if(mouseMoves[currIndex].type === "move"){
			xPos = mouseMoves[currIndex].val[0];
			yPos = mouseMoves[currIndex].val[1];
			cursor.style.left = `${xPos}px`;
			cursor.style.top = `${yPos}px`;
		}
		else{
			console.log(`key pressed: ${mouseMoves[currIndex].val}`)
		}
		currIndex ++;

		if(currIndex<mouseMoves.length)
			iterate();
	});
}
//replay button gives us data which we have recorded already with startAndStop button
$replayRecording.addEventListener('click', iterate);
