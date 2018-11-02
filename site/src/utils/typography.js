import Typography from 'typography'

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.5,
  headerFontFamily: ['Nunito Sans', 'sans-serif'],
  bodyFontFamily: ['Lora', 'Georgia', 'serif'],
  scaleRatio: 2.5,
  googleFonts: [
    {
      name: 'Nunito Sans',
      styles: ['400', '400i', '800', '800i'],
    },
    {
      name: 'Lora',
      styles: ['400', '400i', '700', '700i'],
    },
  ],
  blockMarginBottom: 0.5,
  overrideStyles: ({ rhythm }) => ({
    'h2,h3': {
      marginBottom: rhythm(1 / 3),
    },
  }),
})

export default typography
