// let baseurl = "http://localhost:8600/user/";
let baseurl="https://skillmentor.onrender.com/"
let product=document.getElementById("product")
let userid=JSON.parse(localStorage.getItem("user"))||null
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



const form = document.getElementById("userForm");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const qualifications = document.getElementById("qualifications").value;
    const experience = document.getElementById("experience").value;
    const phoneNo = document.getElementById("phoneNo").value;
    const city = document.getElementById("city").value;
    const subject = document.getElementById("subject").value;
    const about = document.getElementById("about").value;
    let price=document.getElementById("price").value
    const payload = { qualifications, experience, phoneNo, city, subject,price, about };
    console.log(payload)
    fetch(`${baseurl}user/addteacher/${userid._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then((data) =>{
        document.getElementById("msg").innerText=data.msg
        console.log(data)
        userid.role.push("tutor")
        localStorage.setItem("user",JSON.stringify(userid))
        setTimeout(()=>{
          window.location.href="../index.html"
        })
    })
    .catch(error => console.error("Error:", error));
  });
