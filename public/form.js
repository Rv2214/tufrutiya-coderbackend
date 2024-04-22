const socket = io();

document.querySelector("#newProduct").addEventListener('click', (event)=>{
    event.preventDefault()
    const title = document.querySelector("#title").value;
    const photo = document.querySelector("#photo").value;
    const price = document.querySelector("#price").value;
    const stock = document.querySelector("#stock").value;
    const data = {}
    title && (data.title = title);
    photo && (data.photo = photo);
    price && (data.price = price);
    stock && (data.stock = stock);
    socket.emit("new product", data);
    socket.on("product created", (message) => alert(message));
})
