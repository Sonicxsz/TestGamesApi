import '../styles/globals.css'
import NextNProgress from 'nextjs-progressbar';


function MyApp({ Component, pageProps }) {
    
    return  <>
        <NextNProgress
            color="#29D"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
        />
        <Component {...pageProps} />
    </>
  
  
}

export default MyApp
