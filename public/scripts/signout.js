// JavaScript para cerrar sesión cuando se hace clic en el botón
const logoutButton = document.querySelector("#logout");
logoutButton.addEventListener("click", async () => {
  try {
    let response = await fetch("/api/sessions/signout", {
      method: "POST",
    });
    response = await response.json();
    if(response.statusCode === 200) {
      alert(response.message);
      location.replace("/");
    }else{
      alert("ERROR: " + response.message);
    }
  } catch (error) {
    alert(error.message);
  }
});

