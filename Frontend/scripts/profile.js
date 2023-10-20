let baseurl="https://skillmentor.onrender.com/"
// let baseurl="http://localhost:8600/"
let userid=JSON.parse(localStorage.getItem("user"))||null
// console.log(userid,"userid")
let logo=document.querySelector(".title")
 logo.addEventListener("click",()=>{
  window.location.href="../index.html"
})
const urlParams = new URLSearchParams(window.location.search);
const userDataParam = urlParams.get("userdata");
let imageDiv=document.getElementById("imageDiv")
imageDiv.innerHTML=`<img id="img" src=${userid.image}
alt="image">`
let userName=document.getElementById("user-detail-name")
userName.innerText=userid.name
 
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

 
document.getElementById('uploadButton').addEventListener('click', async (e) => {
  e.preventDefault()
  const imageInput = document.getElementById('imageInput');
  const file = imageInput.files[0];
   console.log(file)
  if (!file) {
      document.getElementById('message').innerText = 'Please select an image to upload.';
      return;
  }

  const formData = new FormData();
  formData.append('image', file);

  try {
      const response = await fetch(`${baseurl}user/upload/${userid._id}`, {
          method: 'PATCH',
          body: formData,
      });
      
      if (!response.ok) {
          const errorMessage = await response.text();
          document.getElementById('message').innerText = `Error: ${errorMessage}`;
          return;
      }
      const data = await response.json();
      document.getElementById('message').innerText = 'Image uploaded successfully!';
      console.log(data); // You can handle the response data as needed
  } catch (error) {
      console.error('An error occurred:', error);
      document.getElementById('message').innerText = 'An error occurred during file upload.';
  }
});

window.addEventListener("load",()=>{
  async function fetchUserImage() {
    try {
        const response = await fetch(`${baseurl}user/api/images/${userid._id}`);
        
        if (!response.ok) {
            const errorMessage = await response.text();
            console.error(`Error: ${errorMessage}`);
            return;
        }

        const userData = await response.json();
        console.log(userData)

        if(!userData.msg.uploadedimage){
          imageDiv.innerHTML=`<img id="img" src="${userData.msg.image}"
        alt="image">`
        }
        else{
        imageDiv.innerHTML=`<img id="img" src="data:image/jpeg;base64, ${userData.msg.uploadedimage}"
        alt="image">`
        }
        //  localStorage.setItem("user",JSON.stringify(userData.msg))
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Call the function to fetch and display the user image
fetchUserImage();
})





  

