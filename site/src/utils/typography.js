import Typography from 'typography'

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.5,
  scaleRatio: 2.6,
  blockMarginBottom: 1,
  headerFontFamily: ['Nunito Sans', 'sans-serif'],
  bodyFontFamily: ['Lora', 'Georgia', 'serif'],
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
  overrideStyles: ({ rhythm }) => ({
    h2: {
      paddingTop: rhythm(1 / 4),
      paddingBottom: '6px',
      borderBottom: '1px solid #efefef',
      marginTop: rhythm(1 / 2),
      marginBottom: rhythm(1 / 3),
    },
    'h1,h3,h4,h5,h6': {
      marginTop: rhythm(1 / 2),
      marginBottom: rhythm(1 / 3),
    },
  }),
})

export default typography
