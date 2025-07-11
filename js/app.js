document.addEventListener("DOMContentLoaded", () => {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const renderProductos = () => {

       const url = ("https://dummyjson.com/products/category/laptops");
   

    fetch(url)
    .then((res) => res.json())
    .then((data) => {

        let contenidoProd = document.getElementById("section-productos");

        for (const producto of data.products){

            let tarjProduc = document.createElement("article");
            tarjProduc.classList.add("card-producto");

            let imgProduc  = document.createElement("img");
            imgProduc.src  = producto.images[0];
            imgProduc.alt  = producto.description;

            let titProduc  = document.createElement("h3");
            titProduc.classList.add("title-producto");
            titProduc.textContent = producto.title;


            let precioProd = document.createElement("p");
            precioProd.textContent = `$${producto.price}`;


            let btnAgregar = document.createElement("button");
            btnAgregar.textContent = "Agregar";

            btnAgregar.addEventListener("click", () => {
                Swal.fire({
                    title: `${producto.title} Producto agregado al carrito`,
                    icon: "success",
                    draggable: true,
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    background: "#115f69ff",
                    color: "#ffffff",
                });
                agregarProducto(producto);
                actualizarProductoAgreg();
            });

            tarjProduc.appendChild(imgProduc);
            tarjProduc.appendChild(titProduc);
            tarjProduc.appendChild(precioProd);
            tarjProduc.appendChild(btnAgregar);

            contenidoProd.appendChild(tarjProduc);
        };


    })
    .catch((err) => console.error("Ocurrió un error: ", err));
 
};

    const agregarProducto = (producto) => {
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

    const actualizarProductoAgreg = () => {
        
        const contadorCarrito = document.getElementById("contador-carrito");
        contadorCarrito.textContent = carrito.length;
    };

    renderProductos();
    actualizarProductoAgreg();
    
});
