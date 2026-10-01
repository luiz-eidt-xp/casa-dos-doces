# Casa dos Doces — Landing page

Landing page single-page em HTML, CSS e JavaScript puro para uma confeitaria artesanal em Dourados/MS.

## Estrutura

- `index.html` — página única com Hero, Sobre, Diferenciais, Como funciona, Depoimentos, Galeria, FAQ, Contato, CTA e Footer.
- `styles/` — variáveis, reset, estilos, animações e responsividade.
- `js/` — WhatsApp, menu mobile, scroll reveal com stagger, formulário, accordion FAQ e parallax leve do hero.
- `imgs/` — logo, favicon, hero, OG image, ícones e imagens de apoio.

## Assets

- `imgs/hero.webp` — imagem principal do hero.
- `imgs/og-image.webp` — imagem para Open Graph/social sharing.
- `imgs/logo.svg` — logo principal.
- `imgs/favicon.svg` — favicon.
- `imgs/sobre/` — imagens de apoio da seção Sobre.
- `imgs/gallery/` — seis imagens leves para a galeria.

## Configuração antes da publicação

1. Em `js/whatsapp.js`, substitua `5500000000000` pelo número real de WhatsApp no formato internacional, somente números.
2. No footer de `index.html`, substitua `https://www.instagram.com/` pelo perfil real do Instagram.
3. Revise textos de atendimento, disponibilidade e condições comerciais antes da publicação.

## Requisitos técnicos

- Navegação por âncoras com scroll suave.
- Menu mobile acessível.
- FAQ com `<details>` e JavaScript leve para fechar outros itens abertos.
- Formulário gera mensagem de orçamento no WhatsApp.
- Imagens da galeria abrem em nova aba, sem lightbox complexo.
- Animações respeitam `prefers-reduced-motion`.
- Layout responsivo para 320px, 375px, 768px e desktop.

## Nota de performance

O projeto foi estruturado sem dependências JavaScript externas e com imagens lazy-loaded onde apropriado. O score final de Lighthouse depende também do servidor, cache, compressão, fontes e ambiente de publicação; portanto deve ser medido no domínio final antes da entrega em produção.
