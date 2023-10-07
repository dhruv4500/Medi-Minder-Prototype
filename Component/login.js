class Login{
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
        this.passwordBox = createInput("").attribute('placeholder','Password').class('loginTextBox').attribute('type','password');

        this.loginButton = createButton("Login").class('loginButton')
        this.forgetPassText = createA('#', 'Forgot Password?').class('loginPageForgetPassText')

        this.line = createButton("").class('loginPageLine')

        this.googleLoginButton = createButton("Sign in with Google").class('googleLoginButton')

        this.signUpText = createElement('h5').class('loginPageSignUpText')

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

        this.welcomeMsg.html('Welcome To Medi Minder!')

        this.loginArea.child(this.loginCredentialArea);
        this.loginCredentialArea.child(this.welcomeMsg)
        this.loginArea.position(0,0)

        this.smalltext.html('Please Login To Your Account')
        this.loginCredentialArea.child(this.smalltext)

    
        this.loginCredentialArea.child(this.usernameBox)
        this.loginCredentialArea.child(this.passwordBox)
        this.loginCredentialArea.child(this.forgetPassText)
        this.loginCredentialArea.child(this.loginButton)
        this.loginCredentialArea.child(this.loading)

        this.loading.hide()

        const usernameBoxWidth = this.usernameBox.width;
        this.loginButton.style('width', `${usernameBoxWidth}px`);
        this.loading.style('width', `${usernameBoxWidth}px`);

        this.loginCredentialArea.child(this.line)
        this.line.style('width', `${usernameBoxWidth+180}px`);

        this.loginCredentialArea.child(this.googleLoginButton)

        this.loginCredentialArea.child(this.signUpText)
        this.signUpText.html("Don't Have an Account? <a id='loginPageSignUpTextAnchorTag' href='#'>Sign Up</a> Today!")

        document.getElementById('loginPageSignUpTextAnchorTag').addEventListener('click',()=>{
          window.location.href='signup.html'
        })

        this.loginArea.child(this.imageArea)
        this.imageArea.child(this.temp)

        this.imageArea.child(this.imageDiv)
        this.imageDiv.child(this.logoImage)
        

        this.loginButton.mousePressed(()=>{
            var username=this.usernameBox.value();
            var password = this.passwordBox.value();

            if(username.trim() === ''){
                swal("Invalid Username", "Please Provide Valid Username.","error");
            }else if(password.trim() === ''){
                swal("Invalid Password", "Please Provide Valid Password.","error");
            }else{

                this.usernameBox.elt.disabled=true;
                this.passwordBox.elt.disabled=true;
                this.loginButton.hide()
                this.loading.show()               
                this.googleLoginButton.elt.disabled=true
                this.signUpText.hide()

                this.customAuthentication(username, password);
                


            }

            
        })

        this.googleLoginButton.mousePressed(()=>{
                this.usernameBox.elt.disabled=true;
                this.passwordBox.elt.disabled=true;
                this.loginButton.hide()
                this.loading.show()
                this.signUpText.hide()
                

                this.signInWithGoogle()
        })
        
    }

    signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      
      firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
          // This gives you access to the Google user data (e.g., result.user)
          console.log("Google sign-in successful:", result.user);
          // Redirect to the main app or perform other actions as needed
          window.location.href = 'dashboard.html';
        })
        .catch((error) => {
          // Handle errors here
          alert("Could Not Sign In. Try Again")
          window.location.reload()
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Google sign-in error:", errorCode, errorMessage);
          
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
            window.location.href='dashboard.html'
            appState='reminders'
            localStorage.setItem('email',username)
            this.nextPhase()
          })
          .catch((error) => {
            // Authentication failed, handle errors here
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Invalid Email or Password")

            window.location.reload()

            console.error("Authentication Error:", errorCode, errorMessage);
            // Display an error message to the user or perform other actions as needed
           
        })
          .finally(() => {
            // Hide the loading button when the authentication process is done
            
            
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
        this.forgetPassText.hide()

        this.line.hide()

        this.googleLoginButton.hide()

        this.signUpText.hide()

        this.imageArea.hide()
        this.logoImage.hide()
        this.imageDiv.hide()

        this.loading.hide()

        
      }
      

}
