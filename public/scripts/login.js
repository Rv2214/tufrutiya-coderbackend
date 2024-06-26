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
    if (response.statusCode === 200) {
      alert(`Usuario logeado correctamente`);
      location.replace("/products");
    } else {
      alert("ERROR: " + response.message);
    }
  } catch (error) {
    alert(error.message);
  }
});

const googleLoginButton = document.querySelector("#google-login");
googleLoginButton.addEventListener("click", async () => {
  try {
    let response = await fetch("/api/sessions/google");
    response = await response.json();
    window.location.href = response.redirectUrl;
  } catch (error) {
    alert("Error initiating Google login: " + error.message);
  }
});
