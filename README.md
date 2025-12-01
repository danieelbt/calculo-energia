# Cálculo de Energia

Uma aplicação web (PWA) para estimar consumo energético, custo mensal e simular economia com energia solar, com dicas práticas para reduzir o consumo doméstico e empresarial.

---

## Descrição do Problema

O aumento do custo da energia elétrica e o impacto ambiental do uso de fontes não renováveis motivaram a criação deste app. Muitas pessoas e pequenos empreendimentos não têm ferramentas simples para estimar o consumo e avaliar rapidamente se a adoção de painéis solares é viável. O app ajuda a preencher essa lacuna com cálculos diretos e sugestões práticas.

---

## Justificativa

- Relevância: Promove economia de energia na residência e no comércio, reduzindo gastos e promovendo eficiência energética.
- Vínculo com os Objetivos de Desenvolvimento Sustentável (ODS):
  - ODS 7 — Energia Acessível e Limpa: auxilia na adoção de fontes renováveis (simulação de geração solar).
  - ODS 11 — Cidades e Comunidades Sustentáveis: contribui para práticas de consumo consciente e redução de impactos urbanos.
  - ODS 13 — Ação contra a Mudança Global do Clima: ao incentivar redução do consumo e adoção de solar, reduz emissões indiretas.

---

## Público-Alvo

- Cidadãos residenciais que desejam entender sua conta de energia e caminhos para economizar.
- Pequenos comércios que buscam reduzir custos operacionais com consumo elétrico.
- Estudantes e profissionais interessados em noções práticas de energia e economia.
- Tomadores de decisão locais e instaladores de sistemas fotovoltaicos que precisam de uma ferramenta simples de simulação rápida.

---

## Objetivos do App

- Calcular o consumo mensal (kWh) de qualquer equipamento a partir de potência (W) e horas/dia.
- Estimar o custo mensal (R$) dado a tarifa informada pelo usuário.
- Simular a quantidade de painéis necessários e estimar economia mensal e anual para determinada compensação em kWh.
- Fornecer sugestões práticas para redução de consumo baseadas em faixas de consumo.
- Ser utilizável offline (PWA) com cache dos arquivos principais e instalação no dispositivo do usuário.

---

## Tipo de Aplicação

- Aplicação: PWA (Progressive Web App)
  - Possui `manifest.json` e `service worker` (`sw.js`) para permitir instalação e funcionamento offline parcial.
  - Não exige backend — todos os cálculos são feitos no cliente.

---

## Instalação e Uso (Passo a passo)

### Requisitos prévios
- Um navegador moderno com suporte a Service Worker (ex.: Chrome, Edge, Firefox, Safari — versões recentes recomendadas).

### Teste rápido (local)
- Opção 1: Acessar o site
  1. Acessar o site através do link: `https://danieelbt.github.io/calculo-energia/`
    - Observação 1: Nos navegadores modernos costuma aparecer um popup ao abrir o site para que possa instalar e usar como PWA.
    - Observação 2: o PWA pode ser usado offline nos recursos em cache (HTML/CSS/JS), enquanto a CDN do Chart.js exige internet para carregar o gráfico se não estiver em cache.

- Opção 2: Clonar o projeto
  1. Baixe/clone o repositório localmente.
  2. Abra o arquivo `index.html` em seu navegador.

### Como usar
- Na tela principal, insira a potência (W) e horas/dia de um equipamento, depois defina a tarifa em R$/kWh para obter:
  - Consumo mensal em kWh.
  - Custo mensal em R$.
  - Sugestões de economia baseadas no consumo.

- Na simulação de energia solar, informe o kWh a compensar e a tarifa para obter:
  - Número estimado de painéis necessários.
  - Economia mensal e anual (estimadas).
  - Gráfico de economia (para os próximos 10 anos).

## Requisitos do Sistema

- Sistemas Operacionais:
  - Qualquer SO moderno que rode um navegador compatível (Windows 10/11, macOS, Linux, Android, iOS com Safari moderno) — o app é independente do SO, pois roda no navegador.

- Navegadores recomendados:
  - Google Chrome (v80+ recomendado)
  - Microsoft Edge (Chromium) v80+
  - Mozilla Firefox v70+
  - Safari 11+ (algumas limitações no suporte a PWA podem ocorrer no iOS)

- Dependências:
  - Chart.js (carregado via CDN, usado apenas para gráficos em `pages/solar.html`).
  - Service Worker e Cache API (já implementados em `sw.js`).

---

- O aplicativo é inteiramente front-end e não armazena dados em servidor.
