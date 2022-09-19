

// input validation
function inputValidation() {
  var phoneno = /^\d{10}$/;

  var mailformat = /^\w+([\.-]?\w+)*[@gmail.com]*(\.\w{2,3})+$/;

  var email_val = document.getElementById("email").value;
  // if(!email_val.match(mailformat)){
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email_val)) {

     return true;
  }
  else{
    console.log("Mail Error")
    return false
  }

  if (document.getElementById("fname").value.length == 0) {
    return false;
  }
  if (document.getElementById("address").value.length < 4) {
    return false;
  }
  // if(!document.getElementById("phone").value.match(phoneno)){
  if (document.getElementById("phone").value.length < 10){
    console.log("Phone Error")
    return false;
  }
  return true;
}


// function to change tabs
function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the link that opened the tab
  document.getElementById(tabName).style.display = "block";
  document.getElementById("tbb").style.color ='green';
  evt.currentTarget.className += " active";
}




// <!-- listen to click on the button -->
document.getElementById("Sender").addEventListener("click", function(e){
    e.preventDefault();
    // validate the users input

    if (inputValidation()) {
      let information = {
        "full name":document.getElementById("fname").value,
        "email":document.getElementById("email").value,
        "phone":document.getElementById("phone").value,
        "address":document.getElementById("address").value,
      }
      console.log(information)

      $.ajax('http://127.0.0.1:5000/res', {
          type: 'POST',
          data: information,
          success: function (data, status, xhr) {
              alert('status: ' + status + ', data: ' + data)
          },
          error: function (jqXhr, textStatus, errorMessage) {
            console.log(JSON.parse(jqXhr))
              alert('Error' + errorMessage + jqXhr)
          }
      });


    }
    else{
      alert("Please Enter Correct Input")
    }
  })






// call the function to get all results on the page.
function testData(){

  console.log("Started Here")
  $.ajax({
    url: 'http://127.0.0.1:5000/',
    type: 'GET',
    data :{},
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer XXXXXXXXXXXXXXXXXXXXXXXX');
    },
    success: function (data) {

      console.log("Success")
      data = JSON.parse(data).data

      // add Data
      // the json data.
      const myData = data


      // Extract value from table header.
      let col = [];
      for (let i = 0; i < myData.length; i++) {
        for (let key in myData[i]) {
          if (col.indexOf(key) === -1) {
            col.push(key);
          }
        }
      }

      // Create table.
      const table = document.createElement("table");

      // Create table header row using the extracted headers above.
      let tr = table.insertRow(-1);

      for (let i = 0; i < col.length; i++) {
        let th = document.createElement("th");      // table header.
        th.innerHTML = col[i];
        tr.appendChild(th);
      }

      // add json data to the table as rows.
      for (let i = 0; i < myData.length; i++) {

        tr = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {
          let tabCell = tr.insertCell(-1);
          tabCell.innerHTML = myData[i][col[j]];
        }
      }

      // Now, add the newly created table with json data, to a container.
      const divShowData = document.getElementById('showData');
      divShowData.innerHTML = "";
      divShowData.appendChild(table);

    },
    error: function () {
      console.log("Error Occured")
      alert("An Error Occured While Loading Data")
      return "Error"
    },
    });

    // return data
}
