let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function renderizarCarrinho() {
  const lista = document.getElementById('lista-carrinho');
  if (carrinho.length === 0) {
    lista.innerHTML = '<p>Seu carrinho está vazio.</p>';
    document.getElementById('total').innerHTML = '';
    return;
  }
  let html = '<ul>';
  let total = 0;
  carrinho.forEach((item, idx) => {
    total += item.preco;
    html += `<li>
      <strong>${item.nome}</strong> - R$ ${item.preco.toFixed(2)}`;
    if (item.sabores) {
      html += `<br><small>Sabores: ${item.sabores.join(', ')}</small>`;
    }
    html += ` <button onclick="removerItem(${idx})">Remover</button>
    </li>`;
  });
  html += '</ul>';
  lista.innerHTML = html;
  document.getElementById('total').innerHTML = `<h3>Total: R$ ${total.toFixed(2)}</h3>`;
}
window.removerItem = function(idx) {
  carrinho.splice(idx, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  renderizarCarrinho();
}

document.getElementById('finalizar-pedido').addEventListener('submit', function(e) {
  e.preventDefault();
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }
  const form = new FormData(this);
  const nome = form.get('nome');
  const telefone = form.get('telefone');
  const endereco = form.get('endereco');

  let msg = `*Pedido Empório das Coxinhas*

Cliente: ${nome}
Fone: ${telefone}
Endereço: ${endereco}

*Itens:*
`;
  carrinho.forEach((item, idx) => {
    msg += `${idx+1}. ${item.nome} - R$ ${item.preco.toFixed(2)}`;
    if (item.sabores) msg += `\n   Sabores: ${item.sabores.join(', ')}`;
    msg += '\n';
  });
  const total = carrinho.reduce((s, item) => s+item.preco, 0);
  msg += `\nTotal: R$ ${total.toFixed(2)}`;
  const zap = '5599999999999'; // <--- coloque aqui o número do Empório
  const url = `https://wa.me/${zap}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
  localStorage.removeItem('carrinho');
  setTimeout(() => location.href = 'index.html', 2000);
});

renderizarCarrinho();
