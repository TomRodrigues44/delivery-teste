const SUPABASE_URL = 'https://jlvumlkiecvmtldmgntl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsdnVtbGtpZWN2bXRsZG1nbnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMTk1ODcsImV4cCI6MjA2NTc5NTU4N30.o73mLA9EIdKYNDjAzDi2ENVi90JbCiOJMPnMIWRq-fw';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let produtos = [];

// INIT
document.addEventListener('DOMContentLoaded', async () => {
  const { data } = await supabaseClient.auth.getSession();
  if (!data.session) return location.href = 'login.html';

  if (data.session.user.email !== 'tom.santanna@gmail.com') {
    document.getElementById('tabRelatorios').style.display = 'none';
  }

  document.querySelectorAll('.tablink').forEach(btn => {
    btn.addEventListener('click', () => abrirAba(btn.dataset.aba, btn));
  });

  document.getElementById('btnSalvar').addEventListener('click', salvarNoSupabase);
  document.getElementById('btnLogout').addEventListener('click', logout);
  document.getElementById('btnPedidos').addEventListener('click', carregarPedidos);
  document.getElementById('btnRelatorios').addEventListener('click', carregarRelatorios);

  carregarProdutos();
});

function abrirAba(id, btn){
  document.querySelectorAll('.tabcontent').forEach(d => d.style.display = 'none');
  document.getElementById(id).style.display = 'block';
  document.querySelectorAll('.tablink').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

async function logout(){
  await supabaseClient.auth.signOut();
  location.href = 'login.html';
}

// ===== PRODUTOS =====
async function carregarProdutos(){
  const { data, error } = await supabaseClient.from('produtos_aparecida').select('*');
  if (error) return alert(error.message);
  produtos = data;
  renderProdutos();
}

function renderProdutos(){
  const tbody = document.getElementById('tbodyProdutos');
  tbody.innerHTML = '';

  produtos.forEach(p => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${p.nome}</td>
      <td>${p.categoria}</td>
      <td><input type="number" step="0.01" value="${p.preco}"></td>
      <td>${p.ativo ? 'Disponível' : 'Indisponível'}</td>
      <td><button class="btn ${p.ativo?'inativo':'ativo'}">${p.ativo?'Ocultar':'Ativar'}</button></td>
    `;

    tr.querySelector('input').addEventListener('change', e => {
      p.preco = parseFloat(e.target.value);
    });

    tr.querySelector('button').addEventListener('click', () => {
      p.ativo = !p.ativo;
      renderProdutos();
    });

    tbody.appendChild(tr);
  });
}

async function salvarNoSupabase(){
  const { error } = await supabaseClient.from('produtos_aparecida').upsert(produtos);
  alert(error ? error.message : 'Salvo com sucesso!');
}

// ===== HISTÓRICO =====
async function carregarPedidos(){
  const { data, error } = await supabaseClient
    .from('pedidos_aparecida')
    .select('*')
    .order('criado_em', { ascending:false });

  if (error) return alert(error.message);

  const tbody = document.getElementById('tbodyPedidos');
  tbody.innerHTML = '';

  data.forEach(p => {
    tbody.innerHTML += `
      <tr>
        <td>${p.nome||''}</td>
        <td>${p.tel||''}</td>
        <td>${p.bairro||''}</td>
        <td>${p.forma_pagamento||''}</td>
        <td>R$ ${(p.total||0).toFixed(2)}</td>
        <td>${new Date(p.criado_em).toLocaleString('pt-BR')}</td>
      </tr>
    `;
  });
}

// ===== RELATÓRIOS =====
async function carregarRelatorios(){
  await carregarRel('relatorio_vendas_por_dia', 'relDia');
  await carregarRel('relatorio_vendas_por_mes', 'relMes');
  await carregarRel('relatorio_por_pagamento', 'relPagto');
}

async function carregarRel(view, target){
  const { data } = await supabaseClient.from(view).select('*');
  const tbody = document.getElementById(target);
  tbody.innerHTML = '';
  data?.forEach(r => {
    tbody.innerHTML += `
      <tr>
        <td>${r.loja}</td>
        <td>${r.dia || r.mes || r.forma_pagamento}</td>
        <td>${r.qtd_pedidos}</td>
        <td>R$ ${(r.total_vendido||0).toFixed(2)}</td>
      </tr>
    `;
  });
}
