// 1. When a user presses the record button, start recording actions
// 2. When recording, push an object with the important data to the array
//			- Clear the array before starting a new recording
// 3. Stop a recording by pressing the same button,then
//			- Print all of the position to the console using forEach: 123px 345px
// 4. Replay the recording by iterating through the Array and move a custom cursor to the position that was recorded

let isRecording = false
let mouseMoves = []
const $startAndStop = document.getElementById('startAndStop')
const $replayRecording = document.getElementById('replayRecording')

window.addEventListener('mousemove', (event) => {
	//console.dir(event);
	if (isRecording) {
		// Record the data to the Array:
		const subArray = [event.clientX, event.clientY, event.timeStamp]
		mouseMoves.push(subArray);
	}
})

$startAndStop.addEventListener('click', () => {
	// Start/stop the recording
	//isRecording = !isRecording;
	if(!isRecording){
		isRecording=true;
		mouseMoves = []
	}else{
		isRecording=false;
		mouseMoves.forEach(ele => {
			console.log(`${ele[0]}px ${ele[1]}px`);
		});
	}
})

$replayRecording.addEventListener('click', (event) => {
	// Replay recording
	event.clientX = mouseMoves[0][0];
	event.clientY = mouseMoves[0][1];
})
