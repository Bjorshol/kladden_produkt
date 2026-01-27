import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 64,
  height: 64,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff',
          borderRadius: 14,
        }}
      >
        <div
          style={{
            fontSize: 44,
            fontWeight: 900,
            color: '#c9252c',
            lineHeight: 1,
          }}
        >
          K
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
