import { getCurrentHostName } from '@/lib/db'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document'
 
class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & { hostName?: string }> {
    const originalRenderPage = ctx.renderPage

    const host = ctx.req?.headers?.host
    const hostName = await getCurrentHostName(host)
 
    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      })
     
    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx)
 
    return {...initialProps, hostName } 
  }
 
  render() {
    return (
      // @ts-expect-error
      <Html lang="en" data-host={`${this.props?.hostName}`}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
 
export default MyDocument