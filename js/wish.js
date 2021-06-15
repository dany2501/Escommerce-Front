

$(document).ready(() => {

    token = localStorage.getItem('tokenSession');
    productId = localStorage.getItem('productId');
    var wish = $("#cart_wish");
    var cart = "";
    var qtyProds = 0;
    var toPay = 0;
    var cartList = $("#cart-list");
    var subtotal = $("#subtotal");
    var qtyTotal = $("#qty-total");
    var deleteProd = $("#delete");
    var qtyWish = $("#qty-wish");
    if (token == null || token.length == 4) {
        flag = false
       /* $("#no_products").text("Inicia sesión para agregar productos")
        $("#cart_buttons").css({ "display": "none" });*/

    } else {
        flag = true
        //$("#no_products").text("Parece que no hay nada por aquí. ¡Agrega productos!")
    }
    wish.click(()=>{
        localStorage.setItem('cartType',2);
        window.location.href ="Carrito.html";
    });

    getCart(token,2).then((response) => {
        if (response.success && response.products != null && response.products != 0) {

            response.products.forEach(element => {
                qtyProds += element.qty
            });
            //subtotal.text("Subtotal: $" + toPay + ".00")
            qtyWish.text(qtyProds)
            //cartList.html(cart);
        } else {
            $("#summary").css({ "display": "none" });
            $("#cart_buttons").css({ "display": "none" });
        }
    });

    document.querySelector('#cart-list').addEventListener('click',e =>{
        action = e.target
        if(action.id != "" && action.id != null){
            deleteProductCart(token,action.id).then((response)=>{
                console.log(response)
                if (response != null){
                    if(response.success){
                        alert("Producto eliminado")
                        window.location.reload()
                    }else{
                        alert(response.error.message)
                    }
                }
            });
        }
    });

});