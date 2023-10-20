let baseurl="https://skillmentor.onrender.com/"
let userid=JSON.parse(localStorage.getItem("user"))||null
console.log(userid)


const urlParams = new URLSearchParams(window.location.search);
const userDataParam = urlParams.get("userdata");
 
  if(!userid){
  if (userDataParam) {
    try {
      const userData = JSON.parse(decodeURIComponent(userDataParam));
      const userName = userData.name
      let role=userData.role
      let appointed=userData.appointed
      userdisplay(userName,role,appointed)
      let userID=userData._id
      localStorage.setItem("user",JSON.stringify(userData))
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }
}
else{
  userdisplay(userid.name,userid.role,userid.appointed)
   
}


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







//user display...................................
 
function userdisplay(username,role,appointed){
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
    if(role.includes("tutor")&&appointed==true){
      console.log("yes")
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
    <div><a href=./pages/profile.html style="text-decoration: none;">My profile</a></div>
    <div class="logout">Log Out</div>
    `
    }

    let logout=document.querySelector(".logout")
    logout.addEventListener("click",()=>{
      localStorage.removeItem("user")
      window.location.href="./index.html"
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

let subjectSelection=document.querySelector(".subject-selection")

let subjectDropdown=document.querySelector(".subject-dropdown")
let count=0
subjectSelection.addEventListener("click",()=>{
  count++
  console.log(count)
  if(count%2!=0){
    console.log(5)
    subjectDropdown.classList.add("subject-dropdown-visible")
  }
  else{
    subjectDropdown.classList.remove("subject-dropdown-visible")
  }
})


// ...........search..........//


let search=document.getElementById("search")
let searchdropdown=document.querySelector(".subject-dropdown")
search.addEventListener("input",()=>{
    searchdropdown.innerHTML=null
    let searchword=search.value
    
    
    fetch(`${baseurl}user/search?subject=${searchword}`)

    .then(res=>res.json())
      .then(data=>{
    console.log(data)
      data.msg.forEach(element => {
        let worddiv=document.createElement("div")
        worddiv.setAttribute("id","worddiv")
        worddiv.addEventListener("click",()=>{
            localStorage.setItem("element",element._id)
            window.location.href="./pages/teacher.html"
        })
         let word=document.createElement("h5")
         word.innerText=`${element.name} (${element.subject})`
         worddiv.append(word)
         searchdropdown.append(worddiv)
         console.log(searchword)
        let x=false
        if(searchword){
         x=true
         }
         console.log(x)
         if(x==false){
        searchdropdown.innerHTML=null
          }
      });
    
    })
    

    
})
  


