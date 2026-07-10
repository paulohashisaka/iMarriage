# iMarriage - Convite digital de casamento

Versão clara/pérola do **iMarriage**, convite digital premium para o casamento de **Angélica & Paulo**.

O visual desta variação foi inspirado em seda/cetim branco perolado: fundo off-white sofisticado, dobras visiveis criadas em CSS, brilho acetinado, textura fina de tecido, detalhes champagne/dourado, tipografia clássica e foto principal em preto e branco.

## Como abrir localmente

Você pode abrir o arquivo `index.html` diretamente no navegador.

Para uma experiência melhor durante o desenvolvimento, use a extensão **Live Server** no VS Code:

1. Abra a pasta do projeto no VS Code.
2. Clique com o botão direito em `index.html`.
3. Escolha **Open with Live Server**.

## Dados do casamento

- Casal: **Angélica & Paulo**
- Data: **25 de Dezembro de 2027**
- Horário: **19:00**
- Cerimônia: **Igreja Católica de Ota, Santa Clara**
- Recepção: **Honjo City Community Hall**
- Traje sugerido: **Esporte fino / social**
- Versículo da hero: **“E serão os dois uma só carne.” — Gênesis 2:24**

## Localizações

- Google Maps cerimônia: `https://maps.app.goo.gl/cNc5QZYiXHE6CQgB7`
- Google Maps recepção: `https://maps.app.goo.gl/vSqYRxVwocaszWQ68`

Os links ficam em `index.html`, na seção `#localizacao`.

## Imagens em assets/

A imagem principal da hero é:

- `assets/AngelicaePH100.png`

Outras fotos usadas:

- Nossa história: `assets/AngelicaePH_027.JPG`
- Galeria: `assets/AngelicaePH_040.JPG`
- Galeria: `assets/AngelicaePH_034.JPG`
- Galeria: `assets/AngelicaePH_008.JPG`
- Galeria: `assets/AngelicaePH_021.JPG`
- Galeria: `assets/AngelicaePH_033.JPG`

Para trocar fotos, edite o objeto `weddingConfig.images` em `script.js`.

### Adicionando ou removendo fotos da galeria

A galeria (seção `#galeria`) tem duas partes que precisam ficar em sincronia:

1. A lista `weddingConfig.images.gallery` em `script.js` — uma foto por linha.
2. Os blocos `<figure class="gallery-item reveal">` dentro de `.gallery-grid` em `index.html` — um bloco por foto, com `data-gallery-index` sequencial (`0`, `1`, `2`, ...).

**A quantidade de blocos no HTML precisa ser igual à quantidade de fotos na lista do `script.js`.** Se sobrar um bloco a mais no HTML, o script preenche esse espaço repetindo uma foto (calcula `índice % quantidade de fotos`), em vez de deixar vazio.

Se mudar a quantidade de fotos, o mosaico da galeria em `styles.css` (regras `.gallery-item:nth-child(...)` dentro do `.gallery-grid`, tanto a versão mobile quanto a de telas maiores a partir de `@media (min-width: 720px)`) também pode precisar de ajuste, já que os espaçamentos (`grid-column`/`grid-row`) foram desenhados para a quantidade atual de fotos.

## Countdown

A contagem regressiva usa:

```js
weddingDate: "2027-12-25T19:00:00"
```

Edite esse valor em `script.js` se a data ou horário mudar.

## Presentes

A seção **Presentes** segue o estilo japonês de casamento:

- Não há lista de presentes online.
- Não há Pix.
- Não há contribuição digital.
- No dia da celebração, haverá uma caixa para envelopes com contribuição em dinheiro.

O texto fica em `index.html`, na seção `#presentes`.

## Como editar cores

As cores principais ficam em `styles.css`, no `:root`:

```css
:root {
  --color-bg: #f7f4ee;
  --color-bg-soft: #fffdfa;
  --color-pearl: #eee7dd;
  --color-silk-shadow: rgba(166, 154, 140, 0.52);
  --color-silk-highlight: rgba(255, 255, 255, 0.95);
  --color-surface: rgba(255, 250, 244, 0.72);
  --color-card: rgba(255, 253, 249, 0.82);
  --color-text: #2b2723;
  --color-muted: #756b61;
  --color-gold: #b89b6a;
  --color-gold-soft: #d9c3a5;
  --color-line: rgba(184, 155, 106, 0.18);
}
```

`--color-gold` e `--color-gold-soft` controlam todos os detalhes dourado/champagne do site: eyebrows, bordas, botões, ícones, contagem regressiva, etc.

## Como editar textura/fundo

A sensação de seda/cetim branco é feita apenas com CSS, sem imagem externa. A versão atual foi intensificada para parecer mais com tecido de cetim branco/perolado, com dobras maiores, brilho mais presente e uma trama fina quase imperceptivel.

Edite em `styles.css`:

- `body`: base off-white/perolada e reflexos radiais grandes.
- `body::before`: dobras organicas maiores, sombras peroladas e ondas principais do tecido.
- `body::after`: brilho acetinado em faixas longas e textura fina de trama.
- `.hero-text-panel`: fundo claro da hero com dobras e brilho integrados ao tecido.
- `.section`, `.section:nth-of-type(even)` e secoes como `.invitation`, `.countdown-section`, `.event-info`, `.location`, `.gifts`, `.faq` e `.final-cta`: camadas claras para manter o site inteiro dentro da sensacao de seda/cetim.

Para ajustar a intensidade da textura, altere no `:root`:

```css
--silk-fold-opacity: 1;
--silk-sheen-opacity: 0.92;
--silk-blur: 8px;
```

- Ajuste `--silk-fold-opacity` para controlar a intensidade das dobras.
- Ajuste `--silk-sheen-opacity` para controlar o brilho acetinado.
- Ajuste `--silk-blur` para controlar a nitidez das ondas: valores menores deixam as dobras mais definidas; valores maiores deixam o fundo mais difuso.

Para ajustar brilho e sombras do efeito de tecido, altere:

```css
--color-silk-highlight: rgba(255, 255, 255, 0.95);
--color-silk-shadow: rgba(166, 154, 140, 0.52);
```

Para ajustar as cores do fundo acetinado, altere `--color-bg`, `--color-bg-soft` e `--color-pearl`. Para manter legibilidade sobre o fundo, os cards, formulario, countdown e blocos de localizacao usam `--color-card` e `--color-surface` com transparencia leve e `backdrop-filter`.

## Onde editar dados e links

- Data visível da hero: `index.html`
- Cards do evento: `index.html`
- Links do Google Maps: `index.html`, seção `#localizacao`
- Versículo da hero: `index.html`, bloco `.hero-verse`
- Fotos: `script.js`, objeto `weddingConfig.images`
- Countdown: `script.js`, `weddingDate`
- Formulário RSVP: `script.js`, chave `storageKey` e lógica de `localStorage`

## Confirmações de presença (RSVP) chegando no Google Forms

O formulário `#rsvp-form` (em `index.html`) envia cada confirmação para um Google Form em segundo plano, além de salvar uma cópia no `localStorage` do navegador do convidado.

Isso é configurado em `script.js`, no objeto `weddingConfig.googleForm`:

```js
googleForm: {
  action: "https://docs.google.com/forms/d/e/SEU_ID/formResponse",
  fields: {
    name: "entry.913601345",
    guests: "entry.1637397982",
    phone: "entry.142333713",
    message: "entry.725774774",
  },
},
```

- `action`: link do Google Form trocando `/viewform` por `/formResponse`.
- `fields`: os códigos `entry.XXXXXXX` de cada pergunta do seu Form (ficam no HTML do Form; podem mudar se você recriar as perguntas).
- Se você recriar o Google Form do zero, os números de `entry.` mudam — é só pegar os novos e atualizar aqui.
- As respostas caem na aba "Respostas" do Form (e na planilha do Google Sheets vinculada, se você conectar uma). Para ser avisado por e-mail a cada nova resposta: na planilha de respostas, vá em **Ferramentas → Regras de notificação**.

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie `index.html`, `styles.css`, `script.js`, `README.md` e a pasta `assets/`.
3. Acesse **Settings > Pages**.
4. Em **Build and deployment**, selecione a branch principal.
5. Aguarde o GitHub gerar o link público.

## Notas de manutenção (2026-07-08)

Correções feitas em `styles.css` / `index.html`:

- Removido `-webkit-mask-image` de `.btn`: era um hack antigo do Safari que, em navegadores atuais, esmaecia as bordas do botão em vez de só corrigir o clipping do fundo. `background-clip: padding-box` já resolve isso sozinho.
- `.script-note` (frases em fonte cursiva) estava com o `font-size` travado por `.narrow p`, que tem especificidade maior. Foi criada a regra `.narrow p.script-note` para garantir que o tamanho definido realmente seja aplicado.
- As media queries `@media (max-width: 460px)` e `@media (max-width: 600px)` estavam na ordem errada: como as duas se aplicam ao mesmo tempo em telas ≤460px, a de 600px (que vinha depois no arquivo) sobrescrevia os ajustes pensados para telas bem pequenas. A ordem foi corrigida (600px antes de 460px) para que o bloco mais específico vença.
- Removida a classe `btn-on-dark` do botão "Ver detalhes" na hero: não existia nenhuma regra CSS para ela, então não tinha efeito nenhum.

## Próximos passos da V2

- Integrar RSVP com banco de dados real.
- Criar painel de confirmações para os noivos.
- Criar templates para outros casais.
- Adicionar versão em japonês.
- Otimizar imagens para carregamento mais rápido.
- Transformar o iMarriage em produto comercial com temas e painel administrativo.
