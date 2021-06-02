$(document).ready(()=>{
    var productName = $("#product_name");
    var productPrice =$("#product_price");
    var productStock =$("#product_stock");
    var productDes =$("#product_description");
    var cartList =$("#cart-list");
    var img =$("#img");
    var img2 =$("#img2");
    var addTo=$("#add-to-cart");
    var qtyAdd =$("#qty-picker");
    var subtotal =$("#subtotal");
    var qtyTotal =$("#qty-total");
    var qtyCart = $("#qty");
    var desc_prod =$("#desc_prod");

    var stock =0;
    productId = parseInt(localStorage.getItem('productId'));
    token = localStorage.getItem('tokenSession');

    getProduct(productId).then((response)=>{
        var product = response.products;
        productName.text(product.name);
        productPrice.text("$"+product.price+".00");
        stock = product.stock
        desc_prod.text(product.description)
        productStock.text(product.stock+" disponibles");
        productDes.text(product.description);
        img.attr('src',product.image)
        img2.attr('src',product.image)

    });

    if (token == null || token.length==4){
        console.log("Iniciar")
        flag=false
    
    }else{
        flag=true
    }

    addTo.click(()=>{
        if(flag){
            var qty=parseInt(qtyAdd.val())
            if (qty>0 && qty<stock){
                var cart ="";
                var qtyProds=0;
                var toPay=0;
                addToCart(token,productId,qty).then((response)=>{
                    if (response.success){
                        response.products.forEach(element => {
                            qtyProds +=element.qty
                            toPay +=parseInt(element.product.price)*parseInt(element.qty)
                            cart += cardCart(element.product.name,element.product.price,element.qty,element.product.image);
                        });
                        if (qtyProds>1){
                            qtyTotal.text(qtyProds+" Artículos");
                        }else{
                            qtyTotal.text(qtyProds+" Artículo");
                        }
                        subtotal.text("Subtotal: $"+toPay+" .00")
                        qtyCart.text(response.products.length)
                        cartList.html(cart);
                        $("#title").text("Confirmación");
                        $("#copy").text("Se ha agregado correctamente. Gracias por ser cool y hacerte notar.")
                    }
                });
            }else{
                alert("Ingresa una cantidad valida")
                $("#title").text("Error");
                $("#copy").text("Hubo un error al agregar el producto al carrito. Intenta de nuevo")
            }
        }

    });
    

});


const getProduct = (productId)=>{
    return $.ajax({
        method: "POST",
        url:'http://localhost:5001/products',
        dataType:'json',
        headers: { 'Access-Control-Allow-Origin':'*'},
        data:{productId:productId},
        accepts:'application/json',
        success:(data,status)=>{
            if (data){
                return data;
            }
        }
    });
}

const addToCart= (token,productId,qty)=>{
    return $.ajax({
        method: "POST",
        url:'http://localhost:5001/cart',
        dataType:'json',
        headers: { 'Access-Control-Allow-Origin':'*','token':token },
        data:{productId:productId,qty:qty},
        accepts:'application/json',
        success:(data,status)=>{
            return data;
        }
    });
}
