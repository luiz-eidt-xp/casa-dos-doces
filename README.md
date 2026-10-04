# Casa dos Doces — Landing page

Landing page single-page em HTML, CSS e JavaScript puro para uma confeitaria artesanal em Dourados/MS.

> OBS: Isso é um site para uma empresa fictícia, não existe, é só uma demonstração.

## Estrutura

- `index.html` — página única com Hero, Sobre, Diferenciais, Como funciona, Depoimentos, Galeria, FAQ, Contato, CTA e Footer.
- `styles/` — `variables.css` (design tokens), `reset.css`, `style.css` (componentes e seções), `animations.css` e `responsive.css`.
- `js/` — WhatsApp, menu mobile, scroll reveal + header + link ativo, formulário, accordion FAQ e parallax leve do hero.
- `imgs/` — logo, favicon, hero, OG image, ícones e imagens de apoio.

## Assets

- `imgs/hero.webp` — imagem principal do hero.
- `imgs/og-image.webp` — imagem para Open Graph/social sharing.
- `imgs/logo.svg` — logo principal.
- `imgs/favicon.svg` — favicon.
- `imgs/icons/` — `menu.svg`, `whatsapp.svg`, `instagram.svg`.
- `imgs/sobre/` — imagens de apoio da seção Sobre.
- `imgs/gallery/` — seis imagens leves para a galeria (`galeria-01.webp` a `galeria-06.webp`).

## Design system (resumo)

- **Cores:** paleta original (`--primary`, `--accent`, `--cream`…). Tons derivados com contraste AA: `--rose-text`, `--danger`, `--whatsapp`.
- **Tipografia:** Playfair Display (títulos, com itálico), Poppins (texto), Dancing Script (assinaturas). Escala fluida via `clamp()`.
- **Raios:** `--r-sm`, `--r-md`, `--r-lg`, `--r-pill`. **Sombras:** `--shadow-sm/md/btn`, sempre discretas.
- **Breakpoints:** 1100px (menu lateral), 900px (tablet), 640px (celular), 400px (telas muito pequenas).
- **Linguagem visual:** o "arco" (janela de vitrine) do Hero e a moldura deslocada da seção Sobre usam o mesmo contorno rosé.

## Notas de acessibilidade

- Menu mobile com `inert`/`aria-hidden` apenas no modo mobile, foco preso no menu aberto, ESC e botão de fechar.
- Foco visível em todos os elementos interativos; `prefers-reduced-motion` respeitado (inclui o parallax).
- Conteúdo visível mesmo sem JavaScript (o efeito de reveal só ativa com JS).

## Nota de performance

O projeto não usa dependências JavaScript externas e carrega imagens com lazy-loading onde apropriado (a imagem do hero tem `fetchpriority="high"` e preload). O score final de Lighthouse depende também do servidor, cache, compressão, fontes e ambiente de publicação; portanto deve ser medido no domínio final antes da entrega em produção.

> Dica: `imgs/logo.svg` tem ~680 KB porque embute um PNG. Se o peso importar, vale exportar uma versão otimizada do logo (sem alterar o desenho).
