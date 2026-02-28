const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!token || !user){
    window.location.href = "login.html";
} else if(user.role === "admin"){
    window.location.href = "admin.html";
} else {
    window.location.href = "orders.html";
}