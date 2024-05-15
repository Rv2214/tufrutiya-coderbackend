const newPasswordButton = document.querySelector("#newPasswordButton");

newPasswordButton.addEventListener("click", async () => {
  try {
    const token = document.querySelector("#token").value;

    const data = {
      newPassword: document.querySelector("#inputPassword").value,
    };
    const opts = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
     let response = await fetch(`/api/sessions/resetpassword/${token}`, opts);

    response = await response.json();
    if (response.statusCode === 201) {
      alert("Contraseña actualizada correctamente");
      location.replace("/");
    } else {
      alert("ERROR: " + response.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
