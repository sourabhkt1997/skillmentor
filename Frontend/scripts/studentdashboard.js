let baseurl="https://skillmentor.onrender.com/"
let product=document.getElementById("product")
let userid=JSON.parse(localStorage.getItem("user"))||null
console.log(userid)
let logo=document.querySelector(".title")
 logo.addEventListener("click",()=>{
  window.location.href="../index.html"
})
const urlParams = new URLSearchParams(window.location.search);
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



//user display...................................
 
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


let container=document.getElementById("container")


fetch(`${baseurl}slot/allslotStudent/${userid._id}`,{
    method:"GET",
    headers:{
        "Content-Type":"application/json"
    }
})
.then((res)=>res.json())
.then((data)=>{
    console.log(data.msg)
    displaybooking(data.msg)
})



function displaybooking(data){
  const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
 const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    container.innerHTML=null
    let card=data.map((ele) => {
      let timestr=new Date(ele.meeting_time)
      let dateindex=timestr.getDate()
      let dayinded=timestr.getDay()
      let monthindex=timestr.getMonth()
      let yearindex=timestr.getFullYear()
      let hourindex=timestr.getHours()
      let minutesindex=timestr.getMinutes()
      let slotdate=`${dateindex}-${daysOfWeek[dayinded]}-${months[monthindex]}-${yearindex}`
      let slottime=`${hourindex}:${minutesindex}`
        return`
        <div class="card">
            <div class="teacherdetails">
                <div class="imgdiv"><img src="${ele.teacher_id.image}" alt="image"></div>
                <div class="deails">
                    <h4><span>Name:</span>${ele.teacher_id.name}</h4>
                    <p><span>Email:</span>${ele.teacher_id.email}</p>
                    <p><span>Subject:</span>${ele.teacher_id.subject}</p>
                    <p><span>Phone No:</span>${ele.teacher_id.phoneNo}</p>
                </div>
            </div>
            <div class="slotdetails">
                 <h4>booking info</h4>
                 <p class="slotdate"><span>Date:</span>${slotdate}</p>
                 <p class="slottime"><span>Time:</span>${slottime}</p>
            </div>
        </div>
    
        `
    });

    container.innerHTML=card.join("")
}