import { AppProvider } from '../context'
import '../styles/globals.css'
import '../styles/chat.css'
function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )

}

export default MyApp
