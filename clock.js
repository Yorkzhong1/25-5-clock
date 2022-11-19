
//-------------------------------variables--------------------------------------------
let breaktime=5
let sessiontime=25
let timeinseconds=1500
let timeleft=secondstotime()
let timerstatus="Session"


//-------------------------------states--------------------------------------------
let timeruning=false
let firstcount=true
let nIntervId; //the interval ID has to be saved outside the timer function, or it won't be accessed by other function



//-------------------------------timer functions-------------------------------------

function timer() {
  // check if an interval has already been set up
  if (!nIntervId) {
    nIntervId = setInterval(countdown, 1000);
  }
}

function countdown() {
    if(timeinseconds>0){
    timeinseconds-=1
    timeleft=secondstotime()
    synctime()
    let timedisplayed=document.getElementById("time-left").innerText
    if(timedisplayed=="00:00"){
      play()
      if(timerstatus=="Session"){
        breaksession()
      }else{session()}
    }
  }}

function start_stop() {
    if(timeruning){
         clearInterval(nIntervId);
  // release our intervalID from the variable
        nIntervId = null;
        timeruning=false
    }else {
        if(firstcount){
        timeinseconds=sessiontime*60
        firstcount=false
      }
        timer()
        timeruning=true;
    }
}

function breaksession(){
  timeinseconds=breaktime*60
  timer()
  timeruning=true
  timerstatus="Break"
  document.getElementById("timer-label").innerText=timerstatus
}

function session(){
  timeinseconds=sessiontime*60
  timer()
  timeruning=true
  timerstatus="Session"
  document.getElementById("timer-label").innerText=timerstatus
}
//-------------------------------sound functions-------------------------------------
function play(){
  document.getElementById("beep").play()
}



//-------------------------------reset/ sync time/ translate seconds to time functions--------------------------------------------
function secondstotime(){  //This function translate time in seconds to mm:ss format in string
  let mm=Math.floor(timeinseconds/60)
  let ss=timeinseconds%60
  let mminstring=(mm/100).toFixed(2).slice(2)
  let ssinstring=(ss/100).toFixed(2).slice(2)
  console.log(mminstring,ssinstring)
  let timeleft=mminstring+":"+ssinstring
  return timeleft
}

function synctime(){  //This function sync the current time in three display field
    document.getElementById("break-length").innerText=breaktime
    document.getElementById("session-length").innerText=sessiontime
    document.getElementById("time-left").innerText=timeleft
  }

function reset(){  //this function reset the time to original state
  timeinseconds=1500
  breaktime=5
  sessiontime=25
  timerstatus="Session"
  document.getElementById("timer-label").innerText=timerstatus

  if(timeruning){
       clearInterval(nIntervId);
      nIntervId = null;
      timeruning=false
  }

  timeleft=secondstotime()
  synctime()
  let audio=document.getElementById("beep")
  audio.pause();
  audio.currentTime = 0;

}


//-------------------------------control functions--------------------------------------------
function breakincrement(){
  if(breaktime<60){breaktime+=1}
  document.getElementById("break-length").innerText=breaktime
}

function breakdecrement(){
  if(breaktime>1){breaktime-=1}
  document.getElementById("break-length").innerText=breaktime
}
function sessionincrement(){
  if(sessiontime<60){sessiontime+=1}
  document.getElementById("session-length").innerText=sessiontime
}

function sessiondecrement(){
  if(sessiontime>1){
  sessiontime-=1}
  document.getElementById("session-length").innerText=sessiontime
}
