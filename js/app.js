function calcular() {
  const potencia = Number(document.getElementById("potencia").value);
  const horas = Number(document.getElementById("horas").value);
  const tarifa = Number(document.getElementById("tarifa").value);

  const consumo = (potencia * horas * 30) / 1000;
  const custo = consumo * tarifa;

  document.getElementById("resultado").innerHTML =
    `Consumo mensal: <b>${consumo.toFixed(2)} kWh</b><br>
     Custo mensal: <b>R$ ${custo.toFixed(2)}</b>`;

  const sugestoes = gerarSugestoes(consumo);
  const sugestoesEl = document.getElementById("sugestoes");
  if (sugestoesEl) {
    if (sugestoes.length === 0) {
      sugestoesEl.innerHTML = "";
    } else {
      sugestoesEl.innerHTML = '<h4>Sugestões:</h4>' +
        '<ul>' + sugestoes.map(s => `<li>${s}</li>`).join('') + '</ul>';
    }
  }
}

function simularSolar() {
  const kwh = Number(document.getElementById("compensar").value);

  if (!kwh || kwh <= 0) {
    document.getElementById("resultadoSolar").innerHTML =
      'Por favor, insira um valor válido de kWh.';
    return;
  }

  const producaoMensalPorPainel = 40;
  const tarifa = Number(document.getElementById("tarifa").value);
  const fioB = 0.30;

  const paineis = Math.ceil(kwh / producaoMensalPorPainel);

  const economiaMensal = (tarifa - fioB) * kwh;
  const economiaAnual = economiaMensal * 12;

  document.getElementById("resultadoSolar").innerHTML = `
     Painéis necessários: <b>${paineis}</b><br>
     Economia mensal: <b>R$ ${economiaMensal.toFixed(2)}</b><br>
     Economia anual: <b>R$ ${economiaAnual.toFixed(2)}</b>
  `;

  // Agora geramos a simulação complexa
  const dados = gerarDadosEconomiaComplexa(kwh, tarifa, fioB);

  gerarGraficoEconomiaComplexa(dados);
}

function gerarDadosEconomiaComplexa(kwh, tarifaInicial, fioB) {
  const producaoMensalPorPainel = 40;
  const paineis = Math.ceil(kwh / producaoMensalPorPainel);

  const anos = 10;
  const economiaAnual = [];

  let tarifa = tarifaInicial;
  let eficiencia = 1; // 100%

  for (let ano = 1; ano <= anos; ano++) {

    // degradação anual de 0,5%
    eficiencia *= 0.995;

    // reajuste tarifário de 8% ao ano
    if (ano > 1) tarifa *= 1.08;

    let economiaAno = 0;

    for (let mes = 0; mes < 12; mes++) {

      // sazonalidade solar
      const fatorSazonal = 1 + Math.sin((mes / 12) * Math.PI * 2) * 0.15;

      const geracaoMes = producaoMensalPorPainel * paineis * eficiencia * fatorSazonal;

      const compensado = geracaoMes * (tarifa - fioB);
      economiaAno += compensado;
    }

    economiaAnual.push({
      ano,
      valor: economiaAno
    });
  }

  return economiaAnual;
}

let chartEconomia = null;

function gerarGraficoEconomiaComplexa(dados) {
  const ctx = document.getElementById("graficoEconomia");

  if (chartEconomia) chartEconomia.destroy();

  chartEconomia = new Chart(ctx, {
    type: "line",
    data: {
      labels: dados.map(d => `Ano ${d.ano}`),
      datasets: [{
        label: "Economia anual (R$)",
        data: dados.map(d => d.valor),
        borderWidth: 2,
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function gerarSugestoes(kwh) {
  let sugestoes = [];

  if (kwh <= 120) {
    sugestoes.push("Seu consumo está baixo! Continue usando equipamentos eficientes.");
    sugestoes.push("Aproveite luz natural para economizar ainda mais.");
  }

  if (kwh > 120 && kwh <= 250) {
    sugestoes.push("Consumo moderado. Pequenas mudanças podem reduzir sua conta.");
    sugestoes.push("Evite banhos longos no chuveiro elétrico.");
  }

  if (kwh > 250 && kwh <= 450) {
    sugestoes.push("Consumo alto. Verifique aparelhos antigos ou com defeito.");
    sugestoes.push("Evite deixar aparelhos em stand-by.");
  }

  if (kwh > 450) {
    sugestoes.push("Consumo muito alto! Vale considerar energia solar.");
    sugestoes.push("Ar-condicionado e chuveiro elétrico são grandes vilões.");
  }

  return sugestoes;
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
