import { ImageResponse } from "next/og";

export const alt = "Total Alarme — Monitoramento de alarmes 24h";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#e30613",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>total alarme</div>
        <div style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.1, marginTop: 24, maxWidth: 920 }}>
          Sua segurança merece presença quando realmente importa.
        </div>
        <div style={{ fontSize: 28, marginTop: 28, opacity: 0.92 }}>
          Monitoramento 24h · Atendimento tático · Barra Velha e região
        </div>
      </div>
    ),
    { ...size }
  );
}
