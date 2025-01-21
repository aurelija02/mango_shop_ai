export const theme = {
  colors: {
    primary: '#FF8C00', // Vibrant Orange
    secondary: '#FFD700', // Golden Yellow
    accent: '#32CD32', // Lime Green
    background: '#FFF8DC', // Cream
    text: '#333333',
    white: '#FFFFFF'
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Open Sans', sans-serif"
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px'
  }
};

export const GlobalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Open+Sans:wght@400;600&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${theme.fonts.body};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
  }
`; 