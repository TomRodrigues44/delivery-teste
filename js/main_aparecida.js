// --- IMAGENS, PRODUTOS, BAIRROS ---
const imagens = {
  salgados: {
    "Copo P - 10 unidades": "copo_p.jpg",
    "Copo M - 20 unidades": "copo_m.jpg",
    "Copo G - 30 unidades": "copo_g.jpg",
    "Meio Cento - 50 unidades": "meiocento.jpg",
    "Cento - 100 unidades": "cento.jpg"
  },
  bolos: {
    "Bolo de Milho": "milho.jpg",
    "Bolo Mesclado": "mesclado.jpg",
    "Bolo de Limão": "limao.jpg",
    "Bolo de Chocolate": "chocolate.jpg",
    "Bolo de Café": "cafe.jpg",
    "Bolo Romeu & Julieta": "romeo-e-julieta.jpg"
  },
  brigadeiros: {
    "Brigadeiro (unidade)": "brigadeiro.jpg",
    "Caixa com 06 unidades": "brigadeiro_06.jpg",
    "Caixa com 12 unidades": "brigadeiro_12.jpg"
  },
  bebidas: {
    "Coca-Cola 1L": "coca_1l.jpg",
    "Fanta Laranja 1L": "fanta_laranja_1l.jpg",
    "Guaraná 1L": "guarana_1l.jpg",
    "Coca-Cola (Lata)": "coca_lata.jpg",
    "Coca-Cola Zero (Lata)": "coca_zero_lata.jpg",
    "Guaraná (Lata)": "guarana_lata.jpg",
    "Fanta Laranja (Lata)": "fanta_laranja_lata.jpg",
    "Fanta Uva (Lata)": "fanta_uva_lata.jpg",
    "Água Mineral 500ml": "agua_mineral.jpg",
    "Suco Skinka 500ml": "skinka_laranja.jpg"
  }
};

let produtos = {};

async function carregarDoSupabase() {
  const res = await fetch("https://jlvumlkiecvmtldmgntl.supabase.co/rest/v1/produtos_aparecida", {
    method: "GET",
    headers: {
      "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsdnVtbGtpZWN2bXRsZG1nbnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMTk1ODcsImV4cCI6MjA2NTc5NTU4N30.o73mLA9EIdKYNDjAzDi2ENVi90JbCiOJMPnMIWRq-fw",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsdnVtbGtpZWN2bXRsZG1nbnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMTk1ODcsImV4cCI6MjA2NTc5NTU4N30.o73mLA9EIdKYNDjAzDi2ENVi90JbCiOJMPnMIWRq-fw"
    }
  });
  const dados = await res.json();
  console.log("🟨 Dados recebidos do Supabase:", dados);


  produtos = {};
  dados.forEach(p => {
    const cat = (p.categoria || '').trim().toLowerCase();
    if (!produtos[cat]) produtos[cat] = [];
    produtos[cat].push(p);
  });

  
  // Ordenar bebidas na ordem desejada
  const ordemDesejada = ['Coca-Cola 1L', 'Fanta Laranja 1L', 'Guaraná 1L', 'Coca-Cola (Lata)', 'Coca-Cola Zero (Lata)', 'Guaraná (Lata)', 'Fanta Laranja (Lata)', 'Fanta Uva (Lata)', 'Água Mineral 500ml', 'Suco Skinka 500ml'];
  
  // Ordenações personalizadas adicionais
  const ordemSalgados = ['Cento - 100 unidades', 'Meio Cento - 50 unidades', 'Copo G - 30 unidades', 'Copo M - 20 unidades', 'Copo P - 10 unidades'];
  const ordemBolos = ['Bolo de Milho', 'Bolo de Limão', 'Bolo de Chocolate', 'Bolo de Café', 'Bolo Romeu & Julieta', 'Bolo Mesclado'];
  const ordemBrigadeiros = ['Caixa com 12 unidades', 'Caixa com 06 unidades', 'Brigadeiro (unidade)'];

  if (produtos.salgados) {
    produtos.salgados.sort((a, b) => ordemSalgados.indexOf(a.nome) - ordemSalgados.indexOf(b.nome));
  }
  if (produtos.bolos) {
    produtos.bolos.sort((a, b) => ordemBolos.indexOf(a.nome) - ordemBolos.indexOf(b.nome));
  }
  if (produtos.brigadeiros) {
    produtos.brigadeiros.sort((a, b) => ordemBrigadeiros.indexOf(a.nome) - ordemBrigadeiros.indexOf(b.nome));
  }

  if (produtos.bebidas) {
    produtos.bebidas.sort((a, b) =>
      ordemDesejada.indexOf(a.nome) - ordemDesejada.indexOf(b.nome)
    );
  }

  renderizarProdutos();
}

carregarDoSupabase();


// Lista de bairros EXEMPLO
let bairros = [
  { nome: "13 DE SETEMBRO", taxa: 13.00 },
  { nome: "13 DE S - HOSPITAL DA CRIANÇA", taxa: 15.00 },
  { nome: "31 DE MARÇO", taxa: 10.00 },
  { nome: "5 DE OUTUBRO", taxa: 12.00 },
  { nome: "6º BEC", taxa: 14.00 },
  { nome: "AEROPORTO", taxa: 15.00 },
  { nome: "AEROPORTO - HGR", taxa: 12.00 },
  { nome: "AEROPORTO - DETRAN-RR", taxa: 12.00 },
  { nome: "AEROPORTO - BASE AÉREA", taxa: 18.00 },
  { nome: "AEROPORTO INTERNACIONAL", taxa: 12.00 },
  { nome: "ALVORADA", taxa: 18.00 },
  { nome: "APARECIDA", taxa: 9.00 },
  { nome: "ASA BRANCA", taxa: 14.00 },
  { nome: "BAIRRO DOS ESTADOS", taxa: 11.00 },
  { nome: "BELA VISTA", taxa: 17.00 },
  { nome: "BURITIS", taxa: 13.00 },
  { nome: "CAÇARI", taxa: 12.00 },
  { nome: "CAÇARI GARDEN SHOP", taxa: 14.00 },
  { nome: "CAIMBÉ", taxa: 14.00 },
  { nome: "CALUNGÁ", taxa: 12.00 },
  { nome: "CAMBARÁ", taxa: 15.00 },
  { nome: "CANARINHO", taxa: 10.00 },
  { nome: "CARANÃ", taxa: 14.00 },
  { nome: "CAUAMÉ", taxa: 16.00 },
  { nome: "CAUAMÉ - PATIO RORAIMA", taxa: 18.00 },
  { nome: "CAUMÉ - LOT PÁTIO", taxa: 18.00 },
  { nome: "CENTENÁRIO", taxa: 15.00 },
  { nome: "CENTRO", taxa: 10.00 },
  { nome: "CIDADE SATÉLITE", taxa: 18.00 },
  { nome: "CIDADE SATÉLITE - VILA JARDIM", taxa: 20.00 },
  { nome: "CINTURÃO VERDE", taxa: 15.00 },
  { nome: "CJ. MANAÍRA", taxa: 20.00 },
  { nome: "CJ. CRUVIANA", taxa: 20.00 },
  { nome: "DETRAN-RR", taxa: 12.00 },
  { nome: "DISTRITO INDUSTRIAL", taxa: 17.00 },
  { nome: "DR. AIRTON ROCHA (PÉROLA)", taxa: 22.00 },
  { nome: "DR. SILVIO BOTELHO", taxa: 17.00 },
  { nome: "DR. SILVIO LEITE", taxa: 15.00 },
  { nome: "HGR", taxa: 12.00 },
  { nome: "JARDIM CARANÃ", taxa: 16.00 },
  { nome: "JARDIM EQUATORIAL", taxa: 20.00 },
  { nome: "JARDIM FLORESTA", taxa: 13.00 },
  { nome: "JARDIM PRIMAVERA", taxa: 15.00 },
  { nome: "JARDIM TROPICAL", taxa: 16.00 },
  { nome: "JOÃO DE BARRO", taxa: 25.00 },
  { nome: "JOQUEI CLUBE", taxa: 16.00 },
  { nome: "LAURA MOREIRA", taxa: 22.00 },
  { nome: "LAURA MOREIRA - LOT CABURAÍ", taxa: 22.00 },
  { nome: "LIBERDADE", taxa: 13.00 },
  { nome: "MECEJANA", taxa: 12.00 },
  { nome: "MECEJANA - 6ºBEC", taxa: 14.00 },
  { nome: "MONTE CRISTO", taxa: 22.00 },
  { nome: "MONTE DAS OLIVEIRAS", taxa: 18.00 },
  { nome: "MURILO TEIXEIRA", taxa: 20.00 },
  { nome: "MURILO TEIXEIRA - LOT. CABURAÍ", taxa: 22.00 },
  { nome: "NOVA CANAÃ", taxa: 16.00 },
  { nome: "NOVA CIDADE", taxa: 20.00 },
  { nome: "OLÍMPICO", taxa: 16.00 },
  { nome: "OPERÁRIO", taxa: 20.00 },
  { nome: "PARAVIANA", taxa: 12.00 },
  { nome: "PARQUE CAÇARI", taxa: 12.00 },
  { nome: "PEDRA PINTADA", taxa: 22.00 },
  { nome: "PINTOLÂNDIA", taxa: 17.00 },
  { nome: "PRICUMÃ", taxa: 13.00 },
  { nome: "PROF ARACELIS", taxa: 16.00 },
  { nome: "PSICULTURA", taxa: 16.00 },
  { nome: "QUARTÉIS EM GERAL", taxa: 16.00 },
  { nome: "RAIAR DO SOL", taxa: 17.00 },
  { nome: "SAID SALOMÃO", taxa: 24.00 },
  { nome: "SANTA CECÍLIA", taxa: 25.00 },
  { nome: "SANTA LUZIA", taxa: 17.00 },
  { nome: "SANTA TEREZA", taxa: 15.00 },
  { nome: "SÃO BENTO", taxa: 16.00 },
  { nome: "SÃO FRANCISCO", taxa: 10.00 },
  { nome: "SÃO PEDRO", taxa: 10.00 },
  { nome: "SÃO VICENTE", taxa: 12.00 },
  { nome: "SENADOR HÉLIO CAMPOS", taxa: 20.00 },
  { nome: "TANCREDO NEVES", taxa: 14.00 },
  { nome: "UFRR", taxa: 13.00 },
  { nome: "UNIÃO", taxa: 16.00 },
  { nome: "VILA PRIMAVERA", taxa: 22.00 }
];

bairros.sort((a, b) => a.nome.localeCompare(b.nome));

function corrigirNomeBairro(input) {
  const texto = input.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  let melhor = null;
  let menorDistancia = Infinity;
  bairros.forEach(b => {
    const nome = b.nome.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const distancia = Math.abs(nome.length - texto.length);
    if (nome.includes(texto) || nome.startsWith(texto)) {
      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        melhor = b.nome;
      }
    }
  });
  return melhor;
}

window.atualizaTaxa = function() {
  let input = document.getElementById("bairroCliente").value;
  const corrigido = corrigirNomeBairro(input);
  if (corrigido) {
    document.getElementById("bairroCliente").value = corrigido;
    const achou = bairros.find(b => b.nome === corrigido);
    taxaAtual = achou ? achou.taxa : 0;
  } else {
    taxaAtual = 0;
    alert("Bairro não encontrado. Escolha um bairro válido da lista.");
    return;
    document.getElementById("bairroCliente").value = "";
  }
  document.getElementById("valor-taxa").innerText = taxaAtual.toFixed(2).replace(".", ",");
  document.getElementById("valor-total-final").innerText = carrinhoTotal().toFixed(2).replace(".", ",");
};


const saboresSalgado = [
  "Coxinha de Frango",
  "Croquete de Queijo/Presunto",
  "Bolinha de Pizza",
  "Travesseirinho de Carne",
  "Churros"
];

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
let taxaAtual = 0;

// --- RENDERIZAÇÃO DE PRODUTOS ---
function criarCard(produto, categoria) {
  let imgFile = imagens[categoria]?.[produto.nome] || "sem-imagem.png";
  const estaAtivo = produto.ativo;

  return `<div class="card-produto ${!estaAtivo ? 'inativo' : ''}">
    <img src="assets/img/${imgFile}" alt="${produto.nome}">
    <div class="nome">${produto.nome}</div>
    <div class="preco">R$ ${produto.preco.toFixed(2)}</div>
    <button ${!estaAtivo ? 'disabled' : ''} onclick="${estaAtivo ? `adicionarProduto('${categoria}','${produto.nome.replace(/'/g, "\'")}',${produto.preco})` : ''}">
      Adicionar
    </button>
  </div>`;
}

function renderizarProdutos() {
  document.getElementById("salgados-list").innerHTML = (produtos["salgados"] || []).map(p => criarCard(p, "salgados")).join("");
  document.getElementById("bolos-list").innerHTML = (produtos["bolos"] || []).map(p => criarCard(p, "bolos")).join("");
  document.getElementById("brigadeiros-list").innerHTML = (produtos["brigadeiros"] || []).map(p => criarCard(p, "brigadeiros")).join("");
  document.getElementById("bebidas-list").innerHTML = (produtos["bebidas"] || []).map(p => criarCard(p, "bebidas")).join("");
}


// --- CARRINHO ---
function atualizarCarrinho() {
  const qtd = carrinho.reduce((a, b) => a + (b.qtd || 1), 0);
  document.getElementById("carrinho-qtd").innerText = qtd;
  document.getElementById("carrinho-qtd-mob").innerText = `(${qtd})`;
  let total = carrinho.reduce((acc, item) => acc + item.preco * (item.qtd || 1), 0);
  document.getElementById("carrinho-total-mob").innerText = `R$ ${total.toFixed(2)}`;
  let html = '';
  carrinho.forEach((item, idx) => {
    html += `<div class="carrinho-item">
      <div>
        <div class="carrinho-item-nome">${item.nome}</div>
        ${item.sabores ? `<div class="carrinho-item-sabores"><b>Sabores:</b> ${item.sabores.join(', ')}</div>` : ''}
      </div>
      <div>R$ ${item.preco.toFixed(2)}</div>
      <button class="carrinho-remove" onclick="removerItemCarrinho(${idx})">×</button>
    </div>`;
  });
  document.getElementById("carrinho-itens").innerHTML = html || "<p style='text-align:center;color:#c5a76b'>Carrinho vazio.</p>";
  document.getElementById("carrinho-total").innerText = `Subtotal: R$ ${total.toFixed(2)}`;
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}
function removerItemCarrinho(idx) {
  carrinho.splice(idx, 1);
  atualizarCarrinho();
}
window.toggleCarrinho = function(abrir = null) {
  const sidebar = document.getElementById("carrinho-sidebar");
  if (abrir === true) sidebar.classList.add("aberto");
  else if (abrir === false) sidebar.classList.remove("aberto");
  else sidebar.classList.toggle("aberto");
  atualizarCarrinho();
}
function atualizarMobileCarrinho() {
  if (window.innerWidth < 700) document.getElementById("carrinho-mobile").style.display = "flex";
  else document.getElementById("carrinho-mobile").style.display = "none";
}
function ocultarCarrinhoMobile() {
  var el = document.getElementById("carrinho-mobile");
  if (el) el.style.display = "none";
}
function mostrarCarrinhoMobile() {
  var el = document.getElementById("carrinho-mobile");
  if (el && window.innerWidth < 700) el.style.display = "flex";
}
window.addEventListener('resize', atualizarMobileCarrinho);
document.addEventListener('DOMContentLoaded', atualizarMobileCarrinho);

// --- ADIÇÃO PRODUTO ---
window.adicionarProduto = function(categoria, nome, preco) {
  if (categoria === "salgados") abrirModalSabores(nome, preco);
  else {
    carrinho.push({ categoria, nome, preco, qtd: 1 });
    atualizarCarrinho();
  }
};

// --- NOVO MODAL DE SABORES (POR CLIQUE) ---
function abrirModalSabores(nome, preco) {
  const modal = document.getElementById("modal-sabores");
  if (!modal) {
    console.error("Modal de sabores não encontrado!");
    return;
  }

  document.getElementById("modal-produto-nome").textContent = nome;
  let saboresContagem = new Map(saboresSalgado.map(sabor => [sabor, 0]));
  const maxSabores = 5;

  const renderSabores = () => {
    let totalSelecionados = Array.from(saboresContagem.values()).reduce((a, b) => a + b, 0);
    let html = saboresSalgado.map(sabor => {
      const qtd = saboresContagem.get(sabor);
      const desabilitado = totalSelecionados >= maxSabores && qtd === 0;
      return `
        <div class="sabor-linha sabor-clickable ${desabilitado ? 'desabilitado' : ''}" data-sabor="${sabor}">
          <span>${sabor}</span>
          ${qtd > 0 ? `<span class="contador">×${qtd}</span>` : ''}
        </div>
      `;
    }).join("");
    document.getElementById("modal-sabores-lista").innerHTML = html;

    document.querySelectorAll('.sabor-linha.sabor-clickable').forEach(el => {
      if (el.classList.contains('desabilitado')) return;
      el.addEventListener('click', function() {
        const sabor = el.getAttribute('data-sabor');
        let qtdAtual = saboresContagem.get(sabor);
        let totalAtual = Array.from(saboresContagem.values()).reduce((a, b) => a + b, 0);
        if (qtdAtual < 5 && totalAtual < maxSabores) {
          saboresContagem.set(sabor, qtdAtual + 1);
        } else if (qtdAtual > 0) {
          saboresContagem.set(sabor, qtdAtual - 1);
        }
        renderSabores();
      });
    });
  };

  renderSabores();
  modal.style.display = "flex";

  // Eventos fora da função inicial para evitar escopo
  const adicionarButton = document.getElementById("modal-adicionar");
  if (adicionarButton) {
    adicionarButton.onclick = function() {
      let totalSelecionados = Array.from(saboresContagem.values()).reduce((a, b) => a + b, 0);
      if (totalSelecionados < 1) {
        alert("Escolha pelo menos 1 sabor!");
        return;
      }
      let sabores = [];
      saboresSalgado.forEach(sabor => {
        for (let i = 0; i < saboresContagem.get(sabor); i++) {
          sabores.push(sabor);
        }
      });
      carrinho.push({ categoria: "salgados", nome, preco, sabores, qtd: 1 });
      modal.style.display = "none";
      atualizarCarrinho();
      console.log("Item adicionado ao carrinho:", { nome, preco, sabores });
    };
  } else {
    console.error("Botão 'Adicionar' não encontrado no modal!");
  }

  const cancelarButton = document.getElementById("modal-cancelar");
  if (cancelarButton) {
    cancelarButton.onclick = function() {
      console.log("Botão Cancelar no modal de sabores clicado");
      modal.style.display = "none";
    };
  } else {
    console.error("Botão 'Cancelar' não encontrado no modal de sabores!");
  }
}

// --- CHECKOUT ---
function abrirCheckout() {
  console.log("Abrindo checkout, carrinho:", carrinho);
  if (!carrinho.length) {
    alert("Carrinho vazio.");
    return;
  }
  document.getElementById("carrinho-sidebar").classList.remove("aberto");
  const modal = document.getElementById("modal-checkout");
  if (modal) {
    modal.style.display = "flex";
    ocultarCarrinhoMobile();
    document.body.classList.add('modal-aberta');
    let dl = document.getElementById("lista-bairros");
    dl.innerHTML = bairros.map(b => `<option value="${b.nome}"></option>`).join("");
    document.getElementById("bairroCliente").value = "";
    document.getElementById("valor-taxa").innerText = "0,00";
    document.getElementById("valor-total-final").innerText = carrinhoTotal().toFixed(2);
  }
}

function fecharCheckout() {
  console.log("Fechando checkout");
  const modal = document.getElementById("modal-checkout");
  if (modal) {
    modal.style.display = "none";
    mostrarCarrinhoMobile();
    document.body.classList.remove('modal-aberta');
  }
}

function carrinhoTotal() {
  return carrinho.reduce((acc, item) => acc + item.preco * (item.qtd || 1), 0) + (taxaAtual || 0);
}

window.atualizaTaxa = function() {
  const bairro = document.getElementById("bairroCliente").value.trim();
  const achou = bairros.find(b => b.nome.toLowerCase() === bairro.toLowerCase());
  taxaAtual = achou ? achou.taxa : 0;
  document.getElementById("valor-taxa").innerText = taxaAtual.toFixed(2).replace(".", ",");
  document.getElementById("valor-total-final").innerText = carrinhoTotal().toFixed(2).replace(".", ",");
}


// --- ASSOCIAÇÃO DE EVENTOS AO CHECKOUT ---
document.addEventListener('DOMContentLoaded', function() {
  const cancelarButton = document.querySelector('#modal-checkout .modal-buttons button:first-child');
  if (cancelarButton) {
    cancelarButton.onclick = function() {
      console.log("Botão Cancelar no checkout clicado");
      fecharCheckout();
    };
  } else {
    console.error("Botão 'Cancelar' não encontrado no modal de checkout!");
  }
});

// --- MÁSCARA AUTOMÁTICA TELEFONE ---

const telInput = document.getElementById('telCliente');
if (telInput) {
  telInput.addEventListener('input', function(e) {
    let v = this.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 0) v = '(' + v;
    if (v.length > 3) v = v.slice(0, 3) + ') ' + v.slice(3);
    if (v.length > 10) v = v.slice(0, 10) + '-' + v.slice(10);
    this.value = v;
  });
}

// --- AGRUPAR ITENS POR CATEGORIA ---
function agruparItensPorCategoria(lista) {
  const agrupados = {};
  lista.forEach(item => {
    if (!agrupados[item.categoria]) agrupados[item.categoria] = [];
    agrupados[item.categoria].push(item);
  });
  return agrupados;
}


// --- FINALIZAÇÃO / ENVIO WHATSAPP (via botão direto) ---
document.addEventListener('DOMContentLoaded', function () {
  const enviarButton = document.getElementById("btn-enviar-pedido");
  if (enviarButton) {
    enviarButton.addEventListener("click", async function (e) {
      e.preventDefault();
  const nome = document.getElementById("nomeCliente").value.trim();
const tel = document.getElementById("telCliente").value.trim();
const end = document.getElementById("enderecoCliente").value.trim();
let bairro = document.getElementById("bairroCliente").value.trim();
const formaPgto = document.getElementById("formaPagamento").value;
const obs = document.getElementById("observacaoCliente").value.trim();
const valorTroco = document.getElementById("valorTroco").value.trim();

if (!nome || !tel || !end || !bairro || !formaPgto) {
  alert("Preencha todos os campos!");
  return;
}

// Corrigir o bairro digitado
const corrigido = corrigirNomeBairro(bairro);
if (!corrigido) {
  alert("Bairro não encontrado. Escolha um bairro válido da lista.");
  return;
} else {
  bairro = corrigido;
  document.getElementById("bairroCliente").value = corrigido;
}

      const achou = bairros.find(b => b.nome.toLowerCase() === bairro.toLowerCase());
      taxaAtual = achou ? achou.taxa : 0;
      const senha = Math.floor(Math.random() * 900 + 100);
      const agrupados = agruparItensPorCategoria(carrinho);

      let cabecalho = `*Empório das Coxinhas - Aparecida*
Av. Santos Dumont n 1064-A, Aparecida
CNPJ: 27.099.732/0001-37
Tel: (95) 99155-0102
========================
*Novo Pedido | SENHA: ${senha}*`;

      let dadosCliente = `
*Cliente:* ${nome}
*Telefone:* ${tel}
*Endereço:* ${end}
*Bairro:* ${bairro}
*Forma de Pagamento:* ${formaPgto}
${formaPgto === "Dinheiro" && valorTroco ? `*Troco para:* R$ ${parseFloat(valorTroco).toFixed(2)}` : ""}
------------------------------
*Taxa de entrega:* R$ ${taxaAtual.toFixed(2)}
------------------------------
${obs ? `*Observações:* ${obs}` : ""}`

      let itensFormatados = "";
      const ordemCategorias = ['salgados', 'bolos', 'brigadeiros', 'bebidas'];
      const nomesCategorias = { salgados: "SALGADOS", bolos: "BOLOS", brigadeiros: "BRIGADEIROS", bebidas: "BEBIDAS" };
      ordemCategorias.forEach(cat => {
        if (agrupados[cat]) {
          itensFormatados += `\n*${nomesCategorias[cat]}*\n`;
          agrupados[cat].forEach(item => {
            itensFormatados += `*• ${item.nome}*`;
            if (item.preco) itensFormatados += `  -  R$ ${item.preco.toFixed(2)}`;
            itensFormatados += `\n`;
            if (item.sabores) {
              itensFormatados += `    Sabores:\n`;
              item.sabores.forEach(sabor => {
                itensFormatados += `      - ${sabor}\n`;
              });
            }
          });
        }
      });

      let total = carrinho.reduce((acc, item) => acc + item.preco * (item.qtd || 1), 0);
      let totalPedido = total + taxaAtual;
      let trocoTexto = "";
      if (formaPgto === "Dinheiro" && valorTroco) {
        const trocoPara = parseFloat(valorTroco);
        const diferenca = trocoPara - totalPedido;
        if (diferenca < 0) {
          alert("O valor do troco é menor que o total do pedido!");
          return;
        }
        trocoTexto = `\n*Troco:* R$ ${diferenca.toFixed(2)}`;
      }
      let totalFormat = `------------------------\n*Total:* R$ ${totalPedido.toFixed(2)}${trocoTexto}`;

      let corpoPedido = `${cabecalho}\n${dadosCliente}\n\n*Itens:*\n${itensFormatados}${totalFormat}`;

      let urlZap = "https://wa.me/5595991550102?text=" + encodeURIComponent(corpoPedido);
      window.open(urlZap, "_blank");

      // Salvar no Supabase (Histórico de pedidos - Aparecida)
      try {
        await fetch("https://jlvumlkiecvmtldmgntl.supabase.co/rest/v1/pedidos_aparecida", {
          method: "POST",
          headers: {
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsdnVtbGtpZWN2bXRsZG1nbnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMTk1ODcsImV4cCI6MjA2NTc5NTU4N30.o73mLA9EIdKYNDjAzDi2ENVi90JbCiOJMPnMIWRq-fw",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsdnVtbGtpZWN2bXRsZG1nbnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMTk1ODcsImV4cCI6MjA2NTc5NTU4N30.o73mLA9EIdKYNDjAzDi2ENVi90JbCiOJMPnMIWRq-fw",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            senha,
            nome,
            tel,
            endereco: end,
            bairro,
            forma_pagamento: formaPgto,
            observacao: obs,
            itens: carrinho,
            taxa_entrega: taxaAtual,
            total: totalPedido,
            criado_em: new Date().toISOString()
          })
        });
      } catch (err) {
        console.error("Erro ao salvar pedido no Supabase (Aparecida):", err);
      }


      // Ações executadas somente após sucesso:
      fecharCheckout();
      carrinho = [];
      localStorage.setItem('carrinho', JSON.stringify([]));
      atualizarCarrinho();
      taxaAtual = 0;
    });
  }
});

// --- EXIBE CAMPO DE TROCO AUTOMATICAMENTE (REMOVIDO - NAO USA MAIS DINHEIRO) ---
// Campo de troco foi removido pois agora so aceita pagamentos online (PIX/Cartao)


// --- BLOQUEIO POR HORÁRIO DE FUNCIONAMENTO ---
// TEMPORARIAMENTE DESATIVADO PARA TESTES
// Reativar após concluir todos os avanços

/*
function verificaHorarioFuncionamento() {
  const agora = new Date();
  const diaSemana = agora.getDay(); // 0 = Domingo, 6 = Sábado
  const horaAtual = agora.getHours();
  const minutosAtuais = agora.getMinutes();
  const totalMinutos = horaAtual * 60 + minutosAtuais;

  // Horários válidos: segunda a sexta (manhã e tarde), sábado (somente tarde)
  const periodoManha = { inicio: 8 * 60, fim: 10 * 60 + 30 };       // 08:00 - 10:30
  const periodoTarde = { inicio: 13 * 60 + 30, fim: 18 * 60 + 45 }; // 13:30 - 18:45

  let emHorario = false;

  if (diaSemana >= 1 && diaSemana <= 5) {
    // Segunda a sexta: manhã ou tarde
    emHorario = (totalMinutos >= periodoManha.inicio && totalMinutos <= periodoManha.fim) ||
                (totalMinutos >= periodoTarde.inicio && totalMinutos <= periodoTarde.fim);
  } else if (diaSemana === 6) {
    // Sábado: somente tarde
    emHorario = (totalMinutos >= periodoTarde.inicio && totalMinutos <= periodoTarde.fim);
  }

  const aviso = document.getElementById("aviso-fechado");
  const btnFinalizar = document.querySelector(".finalizar-btn");

  if (!emHorario) {
    if (aviso) aviso.style.display = "block";
    if (btnFinalizar) btnFinalizar.disabled = true;
  } else {
    if (aviso) aviso.style.display = "none";
    if (btnFinalizar) btnFinalizar.disabled = false;
  }
}
document.addEventListener("DOMContentLoaded", verificaHorarioFuncionamento);
*/
