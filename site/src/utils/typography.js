import Typography from 'typography'

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.666,
  headerFontFamily: [
    'Nunito Sans',
    'Helvetica Neue',
    'Segoe UI',
    'Helvetica',
    'Arial',
    'sans-serif',
  ],
  bodyFontFamily: ['Georgia', 'serif'],
  googleFonts: [
    {
      name: 'Nunito Sans',
      styles: ['400', '400i', '800', '800i'],
    },
  ],
})

export default typography
