const socket = io();

socket.on("products", (data) => {
  data = data
    .map(
      (each) => `<div class="card mb-4" style="width: 20rem; height: 400px;">
  <img src="${each.photo}" class="card-img-top h-50" alt="frutas">
  <div class="card-body">
    <h5 class="card-title">${each.title}</h5>
    <p>Price: ${each.price}</p>
    <p>Stock: ${each.stock}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`
    )
    .join("");
  document.querySelector("#products").innerHTML = data;
});
