
//selecciono el valor del front
const selector = document.querySelector("#login");
selector.addEventListener("click", async () => {
  try {
    //construyo la variable data, toma los valores de email y password
    const data = {
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
    };
    //construyo las opciones que voy a pasarle como parametro al fetch  metodo headers y body
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    //construyo la variable para la respuesta que espera un fetch con un url y las opciones
    let response = await fetch("/api/sessions/login", opts);
    response = await response.json();
    console.log(response);
    //utilizo los metodos correspondientes para cerrar la sesion y volver la pagina de inicio 
    if (response.statusCode === 200) {
      alert(response.message);
      location.replace("/");
      //localStorage.setItem("token", response.token);
    } else {
      alert("ERROR: " + response.message);
    }
    /*     alert(response.message);
    response.session &&  */
  } catch (error) {
    alert(error.message);
  }
});

const googleLoginButton = document.querySelector("#google-login");
googleLoginButton.addEventListener("click", async () => {
  try {
    // Realiza una solicitud GET a la ruta de Google login
    let response = await fetch("/api/sessions/google");
    response = await response.json();
    // Redirige a la URL proporcionada por el servidor para iniciar sesión con Google
    window.location.href = response.redirectUrl;
  } catch (error) {
    alert("Error initiating Google login: " + error.message);
  }
});
