const user_dp = document.querySelector(".user_dp");
const side_menu = document.getElementById("side_menu");
user_dp.addEventListener("mouseover", (e) => {
  side_menu.style.left = "0%";
  side_menu.style.transition = "all cubic-bezier(0.19, 1, 0.22, 1) 1s";
});
const remove = document.getElementById("remove");
remove.addEventListener("click" , (e)=>{
    side_menu.style.left = "-15vmax"
})
