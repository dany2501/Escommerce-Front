$(document).ready(()=>{
    var user = $("#user");
    var email = $("#email");
    var logout = $("#logout");
    var container =$("#product_container");
    var cartList =$("#cart-list");
    var qtyCart = $("#qty");
    var subtotal =$("#subtotal");
    var qtyTotal =$("#qty-total");
    var flag = false;
    token = localStorage.getItem('tokenSession');
    
    getProducts().then((data)=>{
        if (data.success){
            var prods=""
            data.products.forEach(element => {
                prods +=card(element.id,element.name,element.description,element.price,element.sku,element.stock,element.categoryId,element.image);
            });
            container.html(prods)
        }

    });

    
    
    if (token == null || token.length==4){
        console.log("Iniciar")
        flag=false

    }else{
        flag=true
        getDataClient(token).then((data)=>{
            console.log("Client info")
            console.log(data)
        });
        logout.text("Cerrar Sesión");
        var cart ="";
        var qtyProds=0;
        var toPay=0;
        getCart(token).then((response)=>{
            response.products.forEach(element => {
                qtyProds +=element.qty
                toPay +=parseInt(element.product.price)
                cart += cardCart(element.product.name,element.product.price,element.qty,element.image);
            });
            if (qtyProds>1){
                qtyTotal.text(qtyProds+" Artículos");
            }else{
                qtyTotal.text(qtyProds+" Artículo");
            }
            subtotal.text("Subtotal: $"+toPay+" .00")
            qtyCart.text(response.products.length)
            cartList.html(cart);
        });
    }

    logout.click(()=>{
        if (flag){
            closeSession(token).then((data)=>{
                if (data){
                    localStorage.removeItem('tokenSession');
                    user.val("")
                    email.val("")
                    alert("Haz cerrado sesión")
                    window.location.replace("./index.html");
                }
            });
        }else{
            window.location.replace("./login.html")
        }
    });
    

    document.querySelector('#product_container').addEventListener('click', e => {
        action = e.target.id.split('-')
        console.log(action[0])
        console.log(action[1])
        if (action[0]==="see"){
            localStorage.setItem('productId',action[1])
            window.location.replace("./producto.html")
        }else if(action[0]==="add"){
            console.log("Add to cart")
            if (flag){
                var cart ="";
                var qtyProds=0;
                var toPay=0;
                addToCart(token,action[1],1).then((response)=>{
                    response.products.forEach(element => {
                        qtyProds +=element.qty
                        toPay +=parseInt(element.product.price)
                        cart += cardCart(element.product.name,element.product.price,element.qty,element.image);
                    });
                    if (qtyProds>1){
                        qtyTotal.text(qtyProds+" Artículos");
                    }else{
                        qtyTotal.text(qtyProds+" Artículo");
                    }
                    subtotal.text("Subtotal: $"+toPay+" .00")
                    qtyCart.text(response.products.length)
                    cartList.html(cart);
                });
            }
                
        }

    });

   
})

const getCart=(token)=>{
    return $.ajax({
        method: "GET",
        url:'http://localhost:5001/cart',
        dataType:'json',
        headers: { 'Access-Control-Allow-Origin':'*','token':token },
        accepts:'application/json',
        success:(data,status)=>{
            return data;
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

const closeSession = (token)=>{
    return $.ajax({
        method: "GET",
        url:'http://localhost:5001/logout',
        dataType:'json',
        headers: { 'Access-Control-Allow-Origin':'*','token':token },
        accepts:'application/json',
        success:(data,status)=>{
            if (data){
                return data;
            }
        }
    })
}

const getDataClient = (token)=>{
    return $.ajax({
        method: "GET",
        url:'http://localhost:5001/login',
        dataType:'json',
        headers: { 'Access-Control-Allow-Origin':'*','token':token },
        accepts:'application/json',
        success:(data,status)=>{
            console.log("response")
            client = data.client
            user.append(data.client.name)
            email.append(data.client.email)
            return data;
        }
    });
}


const getProducts = ()=>{
    return $.ajax({
        method: "GET",
        url:'http://localhost:5001/products',
        dataType:'json',
        headers: { 'Access-Control-Allow-Origin':'*'},
        accepts:'application/json',
        success:(data,status)=>{
            if (data){
                return data;
            }
        }
    });
}

const card = (id,name,description,price,sku,stock,categoryId,image)=>{
    return (` <!-- product -->
    <div class="product" >
        <div class="product-img">
            <img src=${image} alt="">
            <div class="product-label">
                <span class="new">Novedades</span>
            </div>
        </div>
        <div class="product-body" >
            <p class="product-category">${categoryId} </p>
                <h3 class="product-name">${name}</h3>
            <h3 class="product-name">${sku}</h3>

            <h4 class="product-price">$${price}.00</h4>
            <div class="product-rating">
                
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-half-o" aria-hidden="true"></i>
                
                
            </div>
            <div class="product-btns">
                <button class="add-to-wishlist" id="Add"><i class="fa fa-heart-o"></i><span class="tooltipp">Añadir a deseos</span></button>
                <button class="quick-view" id=see-${id}><i class="fa fa-eye" id=see-${id}></i><span class="tooltipp">ver</span></button>
            </div>
        </div>
        <div class="add-to-cart">
            <button class="add-to-cart-btn" id=add-${id}><i class="fa fa-shopping-cart"></i> Añadir al carrito</button>
        </div>
    </div>
    <!-- /product -->`)
}

const cardCart = (name,price,qty,img)=>{
    finalPrice = parseInt(price)*parseInt(qty)
    return (`<div class="product-widget">
        <div class="product-img">
            <img src="./img/unoclasico.jpg" alt="">
        </div>
        <div class="product-body">
            <h3 class="product-name">${name}</h3>
            <h4 class="product-price"><span class="qty">${qty}x</span>$${finalPrice}.00</h4>
        </div>
        <button class="delete"><i class="fa fa-close"></i></button>
    </div>`)
}