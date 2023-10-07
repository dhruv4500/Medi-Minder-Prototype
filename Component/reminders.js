var reminderPage,appState;
var userData,database,email;
var reqMail;
var items;
var htmlArea,finalArea;

function preload(){

}

function setup(){
  createCanvas(windowWidth,windowHeight);
  database = firebase.database();
  reminderPage=new Reminder()
  appState='reminder';
  
  email = localStorage.getItem('email');
  reqMail = email.slice(0,-4);

  if (appState=='reminder'){
    reminderPage.getReminderData();
    reminderPage.display()
  }



}


function draw(){
  background("#eef0f9");

}

class Reminder{
    constructor(){

        this.header = createDiv().class('container-fluid')
        this.area=createDiv().class('container-fluid')
        this.modal=createDiv()
    }

    display(){
        this.modal.hide();
        this.header.html(`
        <div class='dbHeader row'>
        <div class="col-md-3">
            <h1 class='dbHeaderTitle'>Medi Minder</h1>
            <h3 class='dbHeaderTagline'>Innovative Solutions for Smarter Healthcare</h3>
            </div>
            <div class="col-md-9 dbSecDiv">
                <a href="../dashboard.html" class="normal">Dashboard</a>
                <a href="../reminders.html" class="normal active">Reminders</a>
                <a href="#" class="normal" onclick="alert('Coming Soon..')">Prescription</a>
                <a href="#" class="normal" onclick="alert('Coming Soon..')">E-Connect</a>
                <a href="#" class="normal" onclick="alert('Coming Soon..')">Conselling</a>
                <a href="#" class="normal" onclick="alert('Coming Soon..')">Shop</a>
                <a href="#" class="normal" onclick="alert('Devoloping Soon..')">Settings</a>
                <a href="../index.html" class="normal">Sign Out</a>
            </div>
        </div>
    </div>
        `)
        this.header.position(0,0)

        this.area.position(0,70);
        // this.area.html(`
        // <div class="container-fluid remArea">

        //         <div class="reminderHead container-fluid">

        //             <h2 class="remHeading">Reminders</h2>
        //             <p class="warnTxt">Edit your daily reminders below.  Select reminder to delete/view. Reminders that no longer are in your prescriptions are deleted automatically.</p>

        //         </div>
        //         <div class="remAr container">
        //             <div class="reminderTitles">

        //                 <h1 class="ido">S.No</h1>
        //                 <h1 class="ido">Reminder</h1>
        //                 <h1 class="ido">Time</h1>
        //                 <h1 class="ido">Days</h1>
        //                 <h1 class="ido">Auto Defined?</h1>

        //             </div>
        //         <div class="updateListOfReminders">`+finalArea+`

        //         </div>

        //         </div>

        //     </div>
        // `)

        this.area.html(`
        <div class="container-fluid remArea">

                 <div class="reminderHead container-fluid">

                     <h2 class="remHeading">Reminders</h2>
                     <p class="warnTxt">See your daily reminders below. Reminders that no longer are in your prescriptions are deleted automatically.</p>

                 </div>
                <table class='remAr container'>
                    <tr class='reminderTitles sticky-top'>
                    <th class="ido">S.No</th>
                    <th class="ido">Reminder</th>
                    <th class="ido">Time</th>
                    <th class="ido">Days</th>
                    <th class="ido">Auto Defined?</th>
                    </tr>
                    
                    <tr><td>&nbsp;</td></tr>`+
                    // <tr class='ite'>
                    //     <td class="iteText">temp</td>
                    //     <td class="iteText">temp</td>
                    //     <td class="iteText">temp</td>
                    //     <td class="iteText">temp</td>
                    //     <td class="iteText">temp</td>
                    // </tr>
                    finalArea+`
                    
                </table>
                <div class='addButtonDiv container'>
                    <button type='button' data-bs-toggle="modal" data-bs-target="#myModal" class="reminderAddButton" id="addNewButton"><p class='remABText'>Add/Edit</p></button>
                </div>
                </div>

                <!-- The Modal -->
                <div class="modal fade" id="myModal">
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                
                      <!-- Modal Header -->
                      <div class="modal-header">
                        <h4 class="modal-title">Add/Edit Reminder</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                      </div>
                
                      <!-- Modal body -->
                      <div class="modal-body">
                        Feature Coming Soon...
                      </div>
                
                      <!-- Modal footer -->
                      <div class="modal-footer">
                        <button type="button" class="btn btn-danger" id='closeButtonMod' data-bs-dismiss="modal">Close</button>
                      </div>
                
                    </div>
                  </div>
                </div>

        `)

        document.getElementById('closeButtonMod').addEventListener('click', () => {
            location.reload()
        });

    }

    getReminderData(){

        var tempData;
        //const totalIterations = database.ref('user/' + reqMail + '/reminders/totalNum');
        //console.log(reqMail)
        const totalIterations = database.ref('user/dhruvgarg2005@gmail/reminders/totalNum');

        totalIterations.once('value').then((snapshot) => {
        tempData = snapshot.val();
        return Promise.all(
            Array.from({ length: tempData }, (_, i) => {
            // Step 2: Retrieve each reminder
            const dataRef = database.ref('user/dhruvgarg2005@gmail/reminders/' + (i + 1)).once('value');
            return dataRef;
            })
        );
        }).then((reminderSnapshots) => {
        // Step 3: Process the retrieved reminders
        const listOfRem = [];

        reminderSnapshots.forEach((snapshot) => {
            const reminderData = snapshot.val();
            listOfRem.push(reminderData);
        });
        // Now 'listOfRem' contains all the reminders
        //console.log(listOfRem);
        localStorage.setItem('remList', JSON.stringify(listOfRem)); // Make sure to stringify before storing in localStorage
        }).catch((error) => {
        console.error(error);
        });

        // Retrieving data from localStorage
        const lists = localStorage.getItem('remList');
        items=JSON.parse(lists)
        console.log(items); // Parse the stored JSON to get the array back




        // Formatting HTML
        const htmlArea = [];
        for (let i = 0; i < items.length; i++) {
        const reminder = items[i];
        // const tempAreaVar = `<div class="ite">
        //     <h1 class="iteText"><span class='col-md-3'</span></h1>
        //     <h1 class="iteText"><span class='col-md-3'></span></h1>
        //     <h1 class="iteText"><span class='col-md-3'></span></h1>
        //     <h1 class="iteText"><span class='col-md-3'></span></h1>
        //     <h1 class="iteText"><span class='col-md-3'></span></h1>        
        // </div>`;
        // htmlArea.push(tempAreaVar);

        const tempAreaVar = `
        <tr class='ite'>
                        <td class="iteText">${reminder.no}</td>
                        <td class="iteText">${reminder.reminder}</td>
                        <td class="iteText">${reminder.time}</td>
                        <td class="iteText">${reminder.days}</td>
                        <td class="iteText">${reminder.auto}</td>
                    </tr>
                    <tr><td style='font-size:10px'>&nbsp;</td></tr>
        `;
htmlArea.push(tempAreaVar);
        }

        // Join the HTML elements into a single string
        finalArea = htmlArea.join('');


}

    updateReminderData(){
        
        const newData = {
            'hello': '3',
            'getLost': 'okay'
          };
          
          const updateRef = database.ref('temp'); // Replace with your database path
          
          updateRef.set(newData)
            .then(() => {
              console.log('Data updated successfully');
            })
            .catch((error) => {
              console.error('Error updating data:', error);
            });
    }
}