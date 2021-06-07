$(document).ready(() => {
    var container = $("#product_container");
    var container2 = $("#product_container_2");
    var qtyTotal = $("#qty-total");
    var subtotal = $("#subtotal");
    var qtyCart = $("#qty");
    var cartList = $("#cart-list");
    if (token == null || token.length == 4) {
        flag = false

    } else {
        flag = true
    }
    getProducts().then((data) => {
        if (data.success) {
            var prods = ""
            data.products.forEach(element => {
                prods += card(element.id, element.name, element.description, element.price, element.sku, element.stock, element.categoryId, element.image);
            });
            container.html(prods)
            container2.html(prods)
            // Products Slick
            $('.products-slick').each(function () {
                var $this = $(this),
                    $nav = $this.attr('data-nav');

                $this.slick({
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    autoplay: true,
                    infinite: true,
                    speed: 300,
                    dots: false,
                    arrows: true,
                    appendArrows: $nav ? $nav : false,
                    responsive: [{
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    },
                    ]
                });
            });
        }

    });

    document.querySelector('#product_container').addEventListener('click', e => {
        action = e.target.id.split('-')
        if (action[0] === "see") {
            localStorage.setItem('productId', action[1])
            window.location.href = ("./producto.html")
        } else if (action[0] === "add") {
            if (flag) {
                var cart = "";
                var qtyProds = 0;
                var toPay = 0;
                addToCart(token, action[1], 1).then((response) => {
                    if (response.success) {
                        alert("Producto agregado al carrito")

                        $("#cart_buttons").css({ "display": "block" });
                        $("#summary").css({ "display": "block" });
                        response.products.forEach(element => {
                            qtyProds += element.qty
                            toPay += parseInt(element.product.price) * parseInt(element.qty)
                            cart += cardCart(element.product.name, element.product.price, element.qty, element.product.image,element.product.id);
                        });
                        if (qtyProds > 1) {
                            qtyTotal.text(qtyProds + " Artículos");
                        } else {
                            qtyTotal.text(qtyProds + " Artículo");
                        }
                        subtotal.text("Subtotal: $" + toPay + " .00")
                        qtyCart.text(qtyProds)
                        cartList.html(cart);
                    }

                });
            } else {
                alert("Para agregar productos al carrito, debes iniciar sesión primero")
            }

        }

    });

    document.querySelector('#product_container_2').addEventListener('click', e => {
        action = e.target.id.split('-')
        if (action[0] === "see") {
            localStorage.setItem('productId', action[1])
            window.location.href = ("./producto.html")
        } else if (action[0] === "add") {
            if (flag) {
                var cart = "";
                var qtyProds = 0;
                var toPay = 0;
                addToCart(token, action[1], 1).then((response) => {
                    if (response.success) {
                        alert("Producto agregado al carrito")

                        $("#cart_buttons").css({ "display": "block" });
                        $("#summary").css({ "display": "block" });
                        response.products.forEach(element => {
                            qtyProds += element.qty
                            toPay += parseInt(element.product.price) * parseInt(element.qty)
                            cart += cardCart(element.product.name, element.product.price, element.qty, element.product.image,element.product.id);
                        });
                        if (qtyProds > 1) {
                            qtyTotal.text(qtyProds + " Artículos");
                        } else {
                            qtyTotal.text(qtyProds + " Artículo");
                        }
                        subtotal.text("Subtotal: $" + toPay + " .00")
                        qtyCart.text(qtyProds)
                        cartList.html(cart);
                    }

                });
            } else {
                alert("Para agregar productos al carrito, debes iniciar sesión primero")
            }

        }

    });

});


const getProducts = async () => {
    return await $.ajax({
        method: "GET",
        url: 'http://localhost:5001/products',
        dataType: 'json',
        headers: { 'Access-Control-Allow-Origin': '*',"categoryId":0},
        accepts: 'application/json',
        success: (data, status) => {
            if (data) {
                return data;
            }
        }
    });
}

const card = (id, name, description, price, sku, stock, categoryId, image) => {
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


