// to save a data inside the local storage, data should be in string format. 
// As localStorage saves data in the form of key-value pair, but it will give error if we send the multiple datas like array of objects etc.
// So if we want to save multiple entries in local storage then we have to use JSON.

// why are we using arrow function inside the addeventListeners callback fuctions ?
// Bcoz we can pass an event which will give and manupulate the properties of the Html Node

let form = document.querySelector('form');
let main = document.querySelector('.main');

form.addEventListener("submit", (event)=>{
    let name = event.target.uname.value;
    let email = event.target.email.value;
    let phone = event.target.phone.value;
    var checkStatus = 0;
    // Null handle operator

    var userData = JSON.parse(localStorage.getItem("userDetails"))??[];

   for(let v of userData){
      if(v.email==email || v.phone == phone) {       checkStatus=1;
        break;
     }
   }
    if(checkStatus==1) alert("Email or Phone ALready exist");
    else {
    userData.push({
       'name':name,
       'email' : email,
       'phone' : phone 
    });

    localStorage.setItem("userDetails",JSON.stringify(userData));
     event.target.reset();
    }
     displayData();
    event.preventDefault();  // prevent from page refreshing
});


let displayData = () =>{
    let userData = JSON.parse(localStorage.getItem("userDetails"))??[];
    let finalData = '';
    userData.forEach((element,i) => {
        finalData+= `<div class="items">
          <span onclick ='deleteData(${i})'>&times;</span>
          <h5>Name</h5>
          <div>${element.name}</div>

          <h5>Email</h5>
          <div>${element.email}</div>

          <h5>Phone</h5>
          <div>${element.phone}</div>
        </div>`
    });
    main.innerHTML= finalData;
    console.log(finalData);
}

function deleteData(i){
    let userData = JSON.parse(localStorage.getItem("userDetails"))??[];
    userData.splice(i,1);  // deleting the Card

    // Again updating the Local Storage

    localStorage.setItem("userDetails",JSON.stringify(userData));
    displayData(); 
}

displayData();   // we opne this site tomorrow than also we can see the output i.e it is works on page refresh method.


// locolStorage.clearAll 
