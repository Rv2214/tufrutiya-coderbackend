// JavaScript para cerrar sesión cuando se hace clic en el botón
const logoutButton = document.querySelector("#logout");
logoutButton.addEventListener("click", async () => {
  try {
    const token = localStorage.getItem("token")
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" /*,  token */ },
    }
    let response = await fetch("/api/sessions/signout", opts) 
    response = await response.json();
    if(response.statusCode === 200) {
      alert("Se ha cerrado correctamente la sesion");
      localStorage.removeItem("token");
      location.replace("/");
    }else{
      alert("ERROR: " + response.message);
    }
  } catch (error) {
    alert(error.message);
  }
});

