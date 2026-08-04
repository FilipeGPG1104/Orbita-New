import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_VIDEO_URL } from "../lib/constants";

/**
 * BoomerangVideoBg
 * -----------------------------------------------------------------------
 * Fundo de vídeo do hero. Comportamento:
 *
 * 1. Toca o vídeo original uma vez (sem loop nativo).
 * 2. Enquanto toca, captura cada frame em um <canvas> escondido
 *    (via requestVideoFrameCallback, com fallback para requestAnimationFrame).
 * 3. Quando o vídeo termina, troca o <video> por um <canvas> visível e
 *    reproduz os frames capturados em "ping-pong": avança até o último
 *    frame, depois volta até o primeiro, repetindo para sempre — dando
 *    o efeito de "boomerang" (vai e volta suavemente).
 * -----------------------------------------------------------------------
 */
export function BoomerangVideoBg() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLCanvasElement[]>([]);
  const lastTimeRef = useRef(-1);
  const rafRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);

  /** Captura o frame atual do vídeo em um canvas offscreen, com largura limitada a 960px. */
  const captureFrame = useCallback(() => {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0) return;
    if (video.currentTime === lastTimeRef.current) return; // evita duplicar o mesmo frame
    lastTimeRef.current = video.currentTime;

    const captureWidth = 960;
    const scale = captureWidth / video.videoWidth;
    const w = captureWidth;
    const h = Math.round(video.videoHeight * scale);

    const off = document.createElement("canvas");
    off.width = w;
    off.height = h;
    const ctx = off.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, w, h);
    framesRef.current.push(off);
  }, []);

  // Fase 1: tocar o vídeo e capturar frames enquanto ele roda.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let stopped = false;

    const scheduleCapture = () => {
      if (stopped) return;
      if (typeof video.requestVideoFrameCallback === "function") {
        video.requestVideoFrameCallback(() => {
          captureFrame();
          scheduleCapture();
        });
      } else {
        rafRef.current = requestAnimationFrame(() => {
          captureFrame();
          scheduleCapture();
        });
      }
    };

    const onPlay = () => scheduleCapture();

    const onEnded = () => {
      stopped = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (framesRef.current.length > 1) setReady(true);
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("ended", onEnded);

    video.muted = true;
    video.playsInline = true;
    video.play().catch(() => {
      /* autoplay pode ser bloqueado até haver interação — sem problema, o
         vídeo continua visível parado no primeiro frame */
    });

    return () => {
      stopped = true;
      video.removeEventListener("play", onPlay);
      video.removeEventListener("ended", onEnded);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [captureFrame]);

  // Fase 2: quando os frames estiverem prontos, reproduzir em ping-pong a 30fps.
  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || frames.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = frames[0].width;
    canvas.height = frames[0].height;

    let index = 0;
    let direction = 1; // 1 = avançando, -1 = voltando
    const fps = 30;
    const interval = 1000 / fps;

    const draw = () => {
      const frame = frames[index];
      if (frame) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
      }
      index += direction;
      if (index >= frames.length - 1) {
        index = frames.length - 1;
        direction = -1;
      } else if (index <= 0) {
        index = 0;
        direction = 1;
      }
    };

    const id = setInterval(draw, interval);
    return () => clearInterval(id);
  }, [ready]);

  return (
    <div className="absolute inset-0 z-0 scale-[1.15] origin-top overflow-hidden bg-[#191919]">
      <video
        ref={videoRef}
        src={HERO_VIDEO_URL}
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        className="w-full h-full object-cover object-top"
        style={{ display: ready ? "none" : "block" }}
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover object-top"
        style={{ display: ready ? "block" : "none" }}
      />
      {/* Véu branco sutil para garantir contraste do texto sobre o vídeo */}
      <div className="absolute inset-0 bg-white/10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white/90 via-white/20 to-transparent pointer-events-none" />
    </div>
  );
}
