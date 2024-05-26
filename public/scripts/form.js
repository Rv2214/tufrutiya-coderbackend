document.addEventListener("DOMContentLoaded", () => {
  const newProductButton = document.querySelector("#newProduct");

  newProductButton.addEventListener("click", async () => {
    try {
      const data = {
        title: document.querySelector("#title").value,
        photo: document.querySelector("#photo").value,
        stock: parseInt(document.querySelector("#stock").value),
        price: parseFloat(document.querySelector("#price").value),
      };

      const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };

      let response = await fetch("/api/products", opts);
      response = await response.json();

      if (response.statusCode === 201) {
        alert("Product created successfully!");
      } else {
        alert("Error creating product: " + response.message);
      }
    } catch (error) {
      alert("Error creating product: " + error.message);
    }
  });
});

