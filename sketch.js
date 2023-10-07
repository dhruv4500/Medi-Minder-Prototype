var loginPage,appState;
var database,userData;

function preload(){

}

function setup(){
  createCanvas(windowWidth,windowHeight);

  loginPage=new Login()
  appState='login';

  if (appState=='login'){
    loginPage.display()
  }
    

}


function draw(){
  background("#eef0f9");

}