// Tipagem extra para a API requestVideoFrameCallback, usada pelo fundo de
// vídeo em BoomerangVideoBg.tsx. Ainda não faz parte do lib.dom.d.ts padrão
// do TypeScript em todas as versões, então declaramos aqui manualmente.
interface HTMLVideoElement {
  requestVideoFrameCallback?: (callback: (now: number, metadata: unknown) => void) => number;
}
