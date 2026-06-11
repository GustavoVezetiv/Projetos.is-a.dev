# Legacy (arquivos fora do contexto do site)

Estes arquivos **não fazem parte** da landing page romântica, mas foram
**preservados** aqui em vez de apagados:

- `heart.py` — script Python (turtle) que desenha um coração. Roda no Python,
  não no navegador. A mesma ideia já existe na web em `src/js/heart.js`.
- `XP/` — simulador de portfólio de investimentos (Tailwind + Chart.js).
  Projeto completamente separado, sem relação com "Músicas e Flores".
- `teste-anthropic-stub.js` — antigo `FloresVaso/teste.js`. Era só um stub
  quebrado da API da Anthropic (`new Anthropic({...})`), nunca usado por
  nenhuma página.
- `root-antigo/` — o `style.css` e o `script.js` antigos da raiz. Foram
  substituídos pelos arquivos organizados em `src/css/` e `src/js/`. O
  `script.js` antigo tinha a função `toggleMode` duplicada e a variável `img`
  não declarada; o `style.css` antigo tinha o `max-width` sem `;`.

Pode apagar esta pasta quando quiser — nada no site depende dela.
