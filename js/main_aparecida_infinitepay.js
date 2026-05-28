// --- FINALIZAÇÃO / ENVIO PARA INFINITEPAY ---
// Este arquivo substitui a função de envio do pedido para integrar com a InfinitePay

document.addEventListener('DOMContentLoaded', function () {
  const enviarButton = document.getElementById("btn-enviar-pedido");
  if (enviarButton) {
    // Remover evento anterior se existir
    const novoBotao = enviarButton.cloneNode(true);
    enviarButton.parentNode.replaceChild(novoBotao, enviarButton);

    novoBotao.addEventListener("click", async function (e) {
      e.preventDefault();

      const nome = document.getElementById("nomeCliente").value.trim();
      const tel = document.getElementById("telCliente").value.trim();
      const end = document.getElementById("enderecoCliente").value.trim();
      let bairro = document.getElementById("bairroCliente").value.trim();
      const formaPgto = document.getElementById("formaPagamento").value;
      const obs = document.getElementById("observacaoCliente").value.trim();

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

      // Gerar senha e order_nsu únicos
      const senha = Math.floor(Math.random() * 900 + 100);
      const orderNsu = `pedido-${Date.now()}-${senha}`;

      // Calcular total
      let total = carrinho.reduce((acc, item) => acc + item.preco * (item.qtd || 1), 0);
      let totalPedido = total + taxaAtual;

      // Preparar itens para a InfinitePay (preço em centavos)
      const itemsInfinitePay = carrinho.map(item => ({
        quantity: item.qtd || 1,
        price: Math.round((item.preco * (item.qtd || 1)) * 100), // Converter para centavos
        description: item.nome
      }));

      // Adicionar taxa de entrega como item
      itemsInfinitePay.push({
        quantity: 1,
        price: Math.round(taxaAtual * 100), // Converter para centavos
        description: "Taxa de Entrega"
      });

      // Preparar payload para a InfinitePay
      const payloadInfinitePay = {
        handle: "emporiodascoxinhas1",
        order_nsu: orderNsu,
        redirect_url: "https://delivery-aparecida.emporiodascoxinhas.com.br/pagamento-concluido.html",
        customer: {
          name: nome,
          phone_number: tel.replace(/\D/g, '').length === 11 ? '+55' + tel.replace(/\D/g, '') : '+55' + '9' + tel.replace(/\D/g, '')
        },
        address: {
          street: end,
          neighborhood: bairro
        },
        items: itemsInfinitePay
      };

      // Salvar pedido no Supabase antes de redirecionar
      try {
        const supabaseResponse = await fetch("https://jlvumlkiecvmtldmgntl.supabase.co/rest/v1/pedidos_aparecida", {
          method: "POST",
          headers: {
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsdnVtbGtpZWN2bXRsZG1nbnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMTk1ODcsImV4cCI6MjA2NTc5NTU4N30.o73mLA9EIdKYNDjAzDi2ENVi90JbCiOJMPnMIWRq-fw",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsdnVtbGtpZWN2bXRsZG1nbnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMTk1ODcsImV4cCI6MjA2NTc5NTU4N30.o73mLA9EIdKYNDjAzDi2ENVi90JbCiOJMPnMIWRq-fw",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            senha,
            order_nsu: orderNsu,
            nome,
            tel,
            endereco: end,
            bairro,
            forma_pagamento: formaPgto,
            observacao: obs,
            itens: carrinho,
            taxa_entrega: taxaAtual,
            total: totalPedido,
            status_pagamento: 'pendente',
            criado_em: new Date().toISOString()
          })
        });

        if (!supabaseResponse.ok) {
          throw new Error("Erro ao salvar pedido no Supabase");
        }
      } catch (err) {
        console.error("Erro ao salvar pedido no Supabase:", err);
        alert("Erro ao processar pedido. Tente novamente.");
        return;
      }

      // Criar checkout na InfinitePay
      try {
        const infinitePayResponse = await fetch("https://api.checkout.infinitepay.io/links", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payloadInfinitePay)
        });

        const infinitePayData = await infinitePayResponse.json();

        if (infinitePayData.url) {
          // Limpar carrinho e fechar modal
          fecharCheckout();
          carrinho = [];
          localStorage.setItem('carrinho', JSON.stringify([]));
          atualizarCarrinho();
          taxaAtual = 0;

          // Redirecionar para o checkout da InfinitePay
          window.location.href = infinitePayData.url;
        } else {
          throw new Error("Erro ao criar checkout na InfinitePay");
        }
      } catch (err) {
        console.error("Erro ao criar checkout na InfinitePay:", err);
        alert("Erro ao processar pagamento. Tente novamente.");
      }
    });
  }
});