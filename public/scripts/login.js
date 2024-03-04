const selector = document.querySelector("#login");
selector.addEventListener("click", async () => {
  try {
    const data = {
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/sessions/login", opts);
    response = await response.json();
    console.log(response);
    if (response.statusCode === 200) {
      alert(response.message);
      location.replace("/");
      localStorage.setItem("token", response.token);
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
