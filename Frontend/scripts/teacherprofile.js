let baseurl="https://skillmentor.onrender.com/"

let teacherId=localStorage.getItem("teacherid")
console.log(teacherId,"teacherid")
let container=document.getElementById("container")
let userid=JSON.parse(localStorage.getItem("user"))||null
console.log(userid,"userid")

fetch(`${baseurl}user/appointedtutor?id=${teacherId}`)
.then((res)=>res.json())
.then((data)=>{
    render(data.msg)
    console.log(data,"jj")
})


function render(element){
 
    let card=` <div id="card">
    <div id="imgdiv">
        <img src="${element[0].image}"alt="image">
    </div>
    <div id="detailsdiv">
       <p id="name"><span>Name:</span>${element[0].name}</p>
       <p id="email"><span>Email:</span>${element[0].email}</p>
       <p id="subject"><span>Subject:</span>${element[0].subject}</p>
       <p id="qualifications"><span>qualifications:</span>${element[0].qualifications}</p>
       <p id="about"><span>about:</span>${element[0].about}</p>
    </div>
</div>`
container.innerHTML=card

}




const urlParams = new URLSearchParams(window.location.search);
let logo=document.querySelector(".title")
 logo.addEventListener("click",()=>{
  window.location.href="../index.html"
})
const userDataParam = urlParams.get("userdata");
 
  if(!userid){
  if (userDataParam) {
    try {
      const userData = JSON.parse(decodeURIComponent(userDataParam));
      const userName = userData.name
      role=userData.role
      userdisplay(userName,role)
      let userID=userData._id
      localStorage.setItem("user",JSON.stringify(userData))
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }
}
else{
  userdisplay(userid.name,userid.role)
   
}


function userdisplay(username,role){
    let userdisplay=document.querySelector(".userdisplay")
    let hamberger=document.querySelector(".hamberger")
    let accountdropdown=document.querySelector(".accountdropdown")
    let count1=0
    if(username){
      document.querySelector(".loginbutton").classList.add("loginbuttonIflogin")
      document.querySelector(".tutorlogin").classList.add("tutorloginIflogin")
      userdisplay.classList.add("userdisplayIflogin")
      hamberger.classList.add("hambergerIflogin")
      let firstletter=username[0].toUpperCase()
      userdisplay.innerHTML=`<h1 class="firstletter">${firstletter}</h1>`
      document.querySelector(".account").classList.add("accountIflogin")
      hamberger.addEventListener("click",()=>{
        count1++
        console.log(count1%2)
        if(count1%2!=0){
        if(role.includes("tutor")){
        accountdropdown.innerHTML=`
        <div><a href="./pages/studentdashboard.html" style="text-decoration: none;">student dashboard</a> </div>
        <div><a href="./pages/showappointment.html" style="text-decoration: none;">tutor dashboard</a> </div>
        <div> <a href="./pages/teachers.html" style="text-decoration: none;">Find tutor</a> </div>
        <div> <a href="./pages/profile.html" style="text-decoration: none;">My profile</a> </div>
        <div class="logout">Log Out</div>
        `
        }
        else{
          accountdropdown.innerHTML=`
          <div><a href="./pages/studentdashboard.html" style="text-decoration: none;">student dashboard</a> </div>
        <div> <a href="./pages/teachers.html" style="text-decoration: none;">Find tutor</a> </div>
        <div> <a href=./pages/giveprivateclass.html?${urlParams} style="text-decoration: none;">be a tutor</a> </div>
        <div> <a href="./pages/profile.html" style="text-decoration: none;">My profile</a> </div>
        <div class="logout">Log Out</div>
        `
        }
    
        let logout=document.querySelector(".logout")
        logout.addEventListener("click",()=>{
          localStorage.removeItem("user")
          window.location.href="../index.html"
        })
    
        }
        else{
         accountdropdown.innerHTML=null
        }
      })
    }
    else{
      document.querySelector(".loginbutton").classList.remove("loginbuttonIflogin")
      document.querySelector(".tutorlogin").classList.remove("tutorloginIflogin")
      userdisplay.classList.remove("userdisplayIflogin")
      hamberger.classList.remove("hambergerIflogin")
      document.querySelector(".account").classList.remove("accountIflogin")
    }
    }
    // ...............................................

    // navbar colorchange on scroll.......
window.addEventListener("scroll",()=>{
  if(window.scrollY>100){
    document.querySelector(".nav").classList.add("onscrollnav")
    document.querySelector(".loginbutton").classList.add("loginbuttononscroll")
    document.querySelector(".tutorlogin").classList.add("loginbuttononscroll")
    
  }
  else{
    document.querySelector(".nav").classList.remove("onscrollnav")
    document.querySelector(".loginbutton").classList.remove("loginbuttononscroll")
    document.querySelector(".tutorlogin").classList.remove("loginbuttononscroll")
    
  }
})
// ..........................................


// ********calender*********
const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");


 
// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
 const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        //  if(dayIndex==i&&)
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;

    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
     
    fetch(`${baseurl}slot/allslotTeacher/${teacherId}`)
    .then((res)=>res.json())
    .then((data)=>{
      let filtered=data.msg.filter((ele)=>ele.teacherId!==userid._id)
      showslot(filtered)
    })
function showslot(data){
  let temparry=null
  data.forEach((slots)=>{
    g=new Date(slots.meeting_time)
    const dateindex = g.getDate();
    let dayindex=g.getDay()
    let yearindex=g.getYear()
    let monthindex=g.getMonth()
    let ym=currentDate.innerText
    let yerselectd=1900+yearindex
    let monthselected=months[monthindex]
    let yearmonth=monthselected+" "+yerselectd
    let liElements=daysTag.querySelectorAll("li")
    liElements.forEach((ele)=>{
        if(parseInt(ele.innerText)==dateindex && ym==yearmonth&&ele.classList[0]!=="inactive" ){
         let slotstr= JSON.parse(ele.getAttribute("slot"))||[]
         slotstr.push(slots)
         ele.setAttribute("slot",JSON.stringify(slotstr))
          ele.classList.add("slots")   
      }

    })
   
  })
  let liElements=daysTag.querySelectorAll("li")
  let slottimeselect=document.getElementById("selectslottime")
  liElements.forEach((ele)=>{

      ele.addEventListener("click",()=>{
        liElements.forEach((tag)=>{
          tag.classList.remove("click")
        })
        ele.classList.add("click")
       let getAttributevalue=ele.getAttribute("slot")
       let y=JSON.parse(getAttributevalue)
         let options=y.map((slotitems)=>{
            slottimeselect.innerHTML=`<option value="" selected disabled>selet Time</option>`
           let meetingdate=slotitems.meeting_time
           const dateObject = new Date(meetingdate);
           const hours = dateObject.getHours();
           const minutes = dateObject.getMinutes();
           let timeofslot=`${hours}:${minutes}`
           console.log(timeofslot)
            
           return `
           <option data-slot=${JSON.stringify(slotitems)} class="time" value="${timeofslot}">${timeofslot}</option>
           `
         })
         slottimeselect.innerHTML+=options.join("")

         slottimeselect.addEventListener("change",()=>{
          const selectedOption = slottimeselect.options[slottimeselect.selectedIndex];
           let slotData=JSON.parse(selectedOption.getAttribute("data-slot"))
           console.log(slotData)
           let slotmsgtime=new Date(slotData.meeting_time)
           const dateObject = new Date(slotmsgtime);
           const date= dateObject.getDate()
           const year=dateObject.getFullYear()
           const month=months[dateObject.getMonth()]
           const day=daysOfWeek[dateObject.getDay()]
           const hours = dateObject.getHours();
           const minutes = dateObject.getMinutes();
           let timeofslot=`Time:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
           let datestring=`date:${date}-${month}-${day}`
            document.getElementById("slotbookmsg").innerText=`Slot Selected is ${datestring} ${timeofslot}`
           let submit=document.getElementById("submit")
           submit.addEventListener("click",()=>{
            document.getElementById("comfirmmsg").innerText="Click payment buttom to proceed"
            fetch(`${baseurl}payment/create/orderId`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ amount:500, currency: 'INR' }),
          })
          .then(response => response.json())
          .then((data) => {
            let orderid=data.orderId
            console.log(data.orderId)
            var options = {
              "key": "rzp_test_Z99U0SZoCtKEXg", // Enter the Key ID generated from the Dashboard
              "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
              "currency": "INR",
              "name": "Acme Corp",
              "description": "Test Transaction",
              "image": "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202303/upi-sixteen_nine.jpg?size=948:533",
              "order_id": orderid, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
              "handler": function (response){
                  // alert(response.razorpay_payment_id);
                  // alert(response.razorpay_order_id);
                  // alert(response.razorpay_signature)
                    fetch(`${baseurl}slot/bookSlot/${slotData._id}`,{
                      method:"PATCH",
                      headers:{
                        "Content-Type":"application/json"
                      },
                      body:JSON.stringify({studentid:userid._id})
                    })
                    .then((res)=>res.json())
                    .then((data)=>{
                      console.log(data)
                    })
                  var settings = {
                    "url": "payment/api/payment/verify",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                      "Content-Type": "application/json"
                    },
                    "data": JSON.stringify({response})
                  }
              },
              "theme": {
                  "color": "#3399cc"
              }
          };
          var rzp1 = new Razorpay(options);
          rzp1.on('payment.failed', function (response){
                  alert(response.error.code);
                  alert(response.error.description);
                  alert(response.error.source);
                  alert(response.error.step);
                  alert(response.error.reason);
                  alert(response.error.metadata.order_id);
                  alert(response.error.metadata.payment_id);
          });
          document.getElementById('rzp-button1').addEventListener("click", (event) => {
            console.log("Button Clicked");
            rzp1.open();
            event.preventDefault();
        });
        
          
             })
           
           
           })

         })
         
   })
  

})

  
   
}



// let g="Thu Sep 1 2023 01:54:40 GMT+0530 (India Standard Time)"

}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }

    

        renderCalendar(); // calling renderCalendar function
    });
});




