# Cold Creative Form — Formulário Inteligente Premium

Formulário com validação em tempo real, máscaras brasileiras, feedback visual avançado e design glassmorphism de elite. Construído com padrões profissionais inspirados em Apple, Stripe e Vercel.

## Estrutura do Projeto

frontend/
├── public/images/
├── src/
│ ├── assets/
│ │ ├── styles/
│ │ │ ├── global.css
│ │ │ ├── components.css
│ │ │ └── animations.css
│ │ └── js/
│ │ ├── main.js
│ │ ├── validators.js
│ │ ├── masks.js
│ │ └── utils.js
│ ├── pages/
│ │ └── index.html
│ └── components/
│ ├── InputField.js
│ ├── FormGroup.js
│ ├── FeedbackMessage.js
│ └── Button.js
├── index.html
└── README.md


## Funcionalidades

- Validação em tempo real com debounce
- Máscara de telefone brasileiro: (XX) XXXXX-XXXX
- Validação de email dinâmica
- Label flutuante nos inputs
- Bordas dinâmicas com estados: default, focus, erro, sucesso
- Feedback visual instantâneo com ícones e mensagens
- Botão com estados: default, hover, loading, success
- Glassmorphism em todos os campos
- Contador de caracteres na mensagem
- Totalmente responsivo e acessível

## Campos

| Campo     | Validação                          | Máscara              |
|-----------|------------------------------------|----------------------|
| Nome      | Obrigatório, mínimo 2 caracteres   | Letras apenas        |
| Email     | Formato válido de email            | Validação dinâmica   |
| Telefone  | Formato brasileiro completo        | (XX) XXXXX-XXXX      |
| Mensagem  | Mínimo 10 caracteres               | Contador visual      |

## Tecnologias

- HTML5 semântico
- CSS3 (Custom Properties, Grid, Flexbox, Glassmorphism)
- JavaScript ES6+ modular vanilla
- Tipografia: Poppins + Montserrat (Google Fonts)
- Zero dependências externas

## Como Executar

```bash
cd cold-creative-form/frontend
npx live-server .

Aviso
Este é um site criado para fins educacionais e testes. As imagens utilizadas são para efeito de demonstração e estudos, provenientes de bancos de imagens gratuitos (Unsplash). Esta não é uma aplicação real.

Licença
Desenvolvido Alex Santos © 2026