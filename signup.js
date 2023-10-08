var signPage,appState;
var database,userData;

function preload(){

}

function setup(){
  createCanvas(windowWidth,windowHeight);

  signPage=new Signup()
  appState='signup';

  signPage.display()

    

}


function draw(){
  background("#eef0f9");

}

class Signup{
    constructor(){
        this.header = createDiv().class('loginHeader')
        this.headerTitle = createElement('h1').class('loginHeaderTitle')
        this.headerTagline = createElement('h3').class('loginHeaderTagline')
        this.welcomeMsg = createElement('h1').class('loginWelcomMsg')
        this.mainArea=createDiv().class('loginMainArea container-fluid')
        this.loginArea = createDiv().class('LoginArea row')
        this.loginCredentialArea = createDiv().class('loginCredentialArea col-sm-6 container-fluid')
        this.smalltext = createElement('h5').class('loginSmallText')

        this.usernameBox = createInput("").attribute('placeholder', 'Email').class('loginTextBox');
        this.passwordBox = createInput("").attribute('placeholder','Create Password').class('loginTextBox').attribute('type','password');

        this.loginButton = createButton("Sign Up").class('loginButton')
        this.imageArea = createDiv().class('loginPageImageArea col-sm-6')
        this.logoImage=createImg('Images/logo.png').class('loginPageLogoImage')
        this.imageDiv=createDiv().class('loginPageImageDiv')

        this.loading=createButton('<span class=\'spinner-grow spinner-grow-sm\'></span>&nbsp; Loading..').class('loginPageLoadingButton')


    }

     display(){
        this.mainArea.child(this.loginArea)
        this.mainArea.position(0,0)
        this.header.child(this.headerTitle);
        this.header.child(this.headerTagline)
        this.headerTitle.html('Medi Minder')
        this.headerTagline.html('Innovative Solutions for Smarter Healthcare')
        this.header.position(0,0)

        this.welcomeMsg.html('Sign Up For Medi Minder!')

        this.loginArea.child(this.loginCredentialArea);
        this.loginCredentialArea.child(this.welcomeMsg)
        this.loginArea.position(0,0)

        this.smalltext.html('Welcome! Please enter your email and create a password below')
        this.loginCredentialArea.child(this.smalltext)

    
        this.loginCredentialArea.child(this.usernameBox)
        this.loginCredentialArea.child(this.passwordBox)
        this.loginCredentialArea.child(this.loginButton)
        this.loginCredentialArea.child(this.loading)

        this.loading.hide()

        const usernameBoxWidth = this.usernameBox.width;
        this.loginButton.style('width', `${usernameBoxWidth}px`);
        this.loading.style('width', `${usernameBoxWidth}px`);

        this.loginArea.child(this.imageArea)
        this.imageArea.child(this.temp)

        this.imageArea.child(this.imageDiv)
        this.imageDiv.child(this.logoImage)
        

        this.loginButton.mousePressed(async ()=>{
            var username=this.usernameBox.value();
            var password = this.passwordBox.value();

            if(username.trim() === ''){
                swal("Invalid Username", "Please Provide Valid Username.","error");
            }else if(!username.includes('@')){
                swal("Invalid Email", "Please provide valid email address","error");
            }else if(!username.includes('.')){
                swal("Invalid Email", "Please provide valid email address","error");
            }else if(password.trim() === ''){
                swal("Invalid Password", "Please provide valid Password","error");
            }else if(password.length<6){
                swal("Invalid Password", "Password Length must be minimum of 6 characters!","warning");
            }else{
                this.usernameBox.elt.disabled=true;
                this.passwordBox.elt.disabled=true;

                this.loginButton.hide()
                this.loading.show()
                this.customSignup(username,password)
                //this.customAuthentication(username, password);
                


            }

            
        })
        
    }

    customSignup(email, password) {
        // Use Firebase email and password authentication to create a new user
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signup successful, you can handle user data here
            const user = userCredential.user;
            console.log("User signed up:", user);
      
            // Redirect to the main app or perform other actions as needed
            // In this example, we'll redirect to the dashboard.html page
            //window.location.href = 'index.html';
            this.customAuthentication(email, password);
          })
          .catch((error) => {
            // Signup failed, handle errors here
            alert("Error Creating Account. Please Try Again!")
            window.location.reload();
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Error: " + errorMessage);
      
            console.error("Signup Error:", errorCode, errorMessage);
            // Display an error message to the user or perform other actions as needed
          });
      }

      customAuthentication(username, password) {
        // Use Firebase email and password authentication
        firebase.auth().signInWithEmailAndPassword(username, password)
          .then((userCredential) => {
            // Authentication successful, you can handle user data here
            const user = userCredential.user;
            console.log("User:", user);
            // Redirect to the main app or perform other actions as needed
            this.feedUserData(user);
          })
          .catch((error) => {
            // Authentication failed, handle errors here
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Invalid Email or Password")

            console.error("Authentication Error:", errorCode, errorMessage);
            // Display an error message to the user or perform other actions as needed
            window.location.reload();
        })
          .finally(() => {
            // Hide the loading button when the authentication process is done
            window.location.href='dashboard.html'
            appState='reminders'
            localStorage.setItem('email',username)
            this.nextPhase()
            
          });
      }
      
      feedUserData(user){
        userData=user
      }
      
      nextPhase(){
        this.header.hide()
        this.headerTitle.hide()
        this.headerTagline.hide()
        this.welcomeMsg.hide()
        this.mainArea.hide()
        this.loginArea.hide()
        this.loginCredentialArea.hide()
        this.smalltext.hide()

        this.usernameBox.hide()
        this.passwordBox.hide()

        this.loginButton.hide()
        this.imageArea.hide()
        this.logoImage.hide()
        this.imageDiv.hide()

        this.loading.hide()

        
      }
      

}
