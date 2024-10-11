let list = document.querySelectorAll('.list .item');

list.forEach(item => {
  item.addEventListener('click', function(event) {
    if (event.target.classList.contains('add')) {
      const itemNew = item.cloneNode(true);
      let existsInCart = false;

      let cartItems = document.querySelectorAll('.cart .item');
      cartItems.forEach(cart => {
        if (cart.getAttribute('data-key') == itemNew.getAttribute('data-key')) {
          existsInCart = true;
          cart.classList.add('danger');
          setTimeout(function() {
            cart.classList.remove('danger');
          }, 1000);
        }
      });

      if (!existsInCart) {
        document.querySelector('.listCart').appendChild(itemNew);
      }
    }
  });
});

function removeItem(key) {
  let cartItems = document.querySelectorAll('.cart .item');
  cartItems.forEach(item => {
    if (item.getAttribute('data-key') == key) {
      item.remove();
      return;
    }
  });
}

 function finalizePurchase() {

    // Obter os itens do carrinho

    const cartItems = document.querySelectorAll('.listCart .item');


    // Verificar se há itens no carrinho

    if (cartItems.length > 0) {

      // Criar uma mensagem de confirmação

      const confirmationMessage = 'Você deseja finalizar a compra com os seguintes itens:\n';


      // Iterar sobre os itens do carrinho e adicionar à mensagem de confirmação

      cartItems.forEach(item => {

        confirmationMessage += `* ${item.getAttribute('data-name')}\n`;

      });


      // Mostrar a mensagem de confirmação

      alert(confirmationMessage);


      // Limpar o carrinho

      cartItems.forEach(item => {

        item.remove();

      });

    } else {

      alert('O carrinho está vazio!');

    }

  }