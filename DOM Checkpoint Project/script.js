

Number.prototype.to_$ = function () {
  return "$" + parseFloat( this ).toFixed(2);
};
String.prototype.strip$ = function () {
  return this.split("$")[1];
};

var app = {

  shipping : 5.00,

  removeProduct: function () {
    "use strict";

    var item = $(this).closest(".shopping-cart--list-item");

    item.addClass("closing");
    window.setTimeout( function () {
      item.remove();
      app.updateTotals();
    }, 500); // Timeout for css animation
  },

  addProduct: function () {
    "use strict";

    var qtyCtr = $(this).prev(".product-qty"),
        quantity = parseInt(qtyCtr.html(), 10) + 1;

    app.updateProductSubtotal(this, quantity);
  },

  subtractProduct: function () {
    "use strict";

    var qtyCtr = $(this).next(".product-qty"),
        num = parseInt(qtyCtr.html(), 10) - 1,
        quantity = num <= 0 ? 0 : num;

    app.updateProductSubtotal(this, quantity);
  },

  updateProductSubtotal: function (context, quantity) {
    "use strict";

    var ctr = $(context).closest(".product-modifiers"),
        productQtyCtr = ctr.find(".product-qty"),
        productPrice = parseFloat(ctr.data("product-price")),
        subtotalCtr = ctr.find(".product-total-price"),
        subtotalPrice = quantity * productPrice;

    productQtyCtr.html(quantity);
    subtotalCtr.html( subtotalPrice.to_$() );

    app.updateTotals();
  },

  updateTotals: function () {
    "use strict";

    var products = $(".shopping-cart--list-item"),
        subtotal = 0,
        shipping;

    for (var i = 0; i < products.length; i += 1) {
      subtotal += parseFloat( $(products[i]).find(".product-total-price").html().strip$() );
    }

    shipping = (subtotal > 0 && subtotal < (100 / 1.06)) ? app.shipping : 0;

    $("#subtotalCtr").find(".cart-totals-value").html( subtotal.to_$() );
    $("#taxesCtr").find(".cart-totals-value").html( (subtotal * 0.06).to_$() );
    $("#totalCtr").find(".cart-totals-value").html( (subtotal * 1.06 + shipping).to_$() );
    $("#shippingCtr").find(".cart-totals-value").html( shipping.to_$() );
  },

  attachEvents: function () {
    "use strict";

    $(".product-remove").on("click", app.removeProduct);
    $(".product-plus").on("click", app.addProduct);
    $(".product-subtract").on("click", app.subtractProduct);
    $('.like-btn').on('click', function() {
      $(this).toggleClass('is-active');
    });
  },
};

app.attachEvents();