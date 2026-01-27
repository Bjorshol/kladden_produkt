import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Kladden - studentavis fra Innlandet'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#ffffff',
          color: '#2a2a2a',
          padding: 80,
        }}
      >
        <div
          style={{
            fontSize: 180,
            fontWeight: 900,
            lineHeight: 1,
            color: '#c9252c',
            marginBottom: 30,
          }}
        >
          K
        </div>
        <div style={{ fontSize: 72, fontWeight: 800, textAlign: 'center' }}>Kladden</div>
        <div style={{ fontSize: 40, fontWeight: 500, textAlign: 'center', marginTop: 14 }}>
          studentavis fra Innlandet
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
