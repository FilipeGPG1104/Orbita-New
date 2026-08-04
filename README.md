# OrbitaNew — Site institucional

Landing page da OrbitaNew: React + TypeScript + Vite + Tailwind CSS.

## Como rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

Para gerar a versão de produção (arquivos estáticos prontos para hospedar):

```bash
npm run build
```

Os arquivos ficam em `dist/`.

## Antes de publicar, ajuste isto

Tudo em `src/lib/constants.ts`:

- `WHATSAPP_NUMBER` — hoje está com um número de exemplo. Troque pelo
número real da OrbitaNew (código do país + DDD + número, só dígitos).
- `WEEKLY_AVAILABILITY` — horários oferecidos no agendamento, por dia
da semana (segunda a sexta têm listas diferentes, refletindo os
horários em que vocês ficam ocupados).
- `INSTAGRAM_URL` / `HERO_VIDEO_URL` — já configurados, mas fica fácil
de trocar se precisar.



## Estrutura de pastas

```
src/
  main.tsx              → ponto de entrada, monta <App /> na página
  App.tsx                → junta todas as seções, na ordem em que aparecem
  index.css              → import do Tailwind + estilos globais mínimos

  components/
    Navbar.tsx            → menu fixo no topo
    Hero.tsx              → 1ª dobra: vídeo de fundo + título + painel "o que fazemos"
    BoomerangVideoBg.tsx   → lógica do vídeo em loop "vai e volta" do hero
    SectionHeader.tsx      → cabeçalho (etiqueta + título + subtítulo) reusado nas seções
    Services.tsx           → seção "Serviços" (#servicos)
    Portfolio.tsx          → seção "Portfólio" (#portfolio) — hoje com placeholders "Em breve"
    About.tsx              → seção "Sobre" (#sobre)
    Booking.tsx            → seção "Agendar" (#agendar) — calendário + envio pro WhatsApp
    Footer.tsx              → rodapé com Instagram e navegação
    Logo.tsx                → ícone da marca (usado na navbar e no portfólio)

  lib/
    constants.ts           → todas as configurações "de negócio" (ver acima)
    dateUtils.ts            → funções de data usadas no calendário de agendamento
    useBrandFonts.ts        → garante que as fontes da marca sejam carregadas
    types.ts                 → tipos TypeScript compartilhados
    global.d.ts               → tipagem extra para a API de captura de vídeo

  assets/
    logo-icon.png           → só o símbolo da marca (usado na navbar)
    logo-full.png            → logo completa com o nome (usada no rodapé)
```



## Como adicionar projetos ao portfólio

Por enquanto a seção `#portfolio` (`src/components/Portfolio.tsx`) mostra
3 cards "Em breve". Quando tiver projetos reais para mostrar, troque o
bloco de placeholders por uma lista de projetos (nome, imagem, link) e
renderize cards de verdade no lugar.

## Sobre o "rate limit" do agendamento

O formulário de agendamento (`Booking.tsx`) impede que a mesma pessoa
envie duas solicitações em menos de 3 minutos (`RATE_LIMIT_MS`, em
`constants.ts`), usando o `localStorage` do navegador. Isso evita
cliques duplicados/spam acidental, mas **não é uma proteção de
servidor** — alguém com intenção de fazer spam de verdade pode
contornar isso (ex: limpando os dados do navegador ou usando outro
navegador). Se no futuro vocês tiverem um backend próprio, o ideal é
mover esse limite para lá (por IP, por exemplo).

Também existe um campo "honeypot" invisível no formulário: campos
assim costumam ser preenchidos por bots automáticos de spam, mas não
aparecem para pessoas reais — quando ele vem preenchido, o envio é
silenciosamente ignorado.