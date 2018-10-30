import Typography from 'typography'

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.5,
  headerFontFamily: ['Nunito Sans', 'sans-serif'],
  bodyFontFamily: ['Georgia', 'serif'],
  scaleRatio: 2.5,
  googleFonts: [
    {
      name: 'Nunito Sans',
      styles: ['400', '400i', '800', '800i'],
    },
  ],
  overrideStyles: ({ rhythm }) => ({
    'h2,h3': {
      marginBottom: rhythm(1 / 2),
    },
  }),
})

export default typography
