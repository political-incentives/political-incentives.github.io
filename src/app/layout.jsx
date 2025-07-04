import { Footer, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import 'katex/dist/katex.min.css'
import LayoutBody from './LayoutBody'

export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
  title: {
    template: '%s'
  },
  description: 'Issue-Based Political Donations',
  applicationName: 'Issue-Based Political Donations',
  generator: 'Next.js',
  appleWebApp: {
    title: 'Issue-Based Political Donations'
  },
  other: {
    'msapplication-TileImage': '/ms-icon-144x144.png',
    'msapplication-TileColor': '#fff'
  },
  twitter: {
    site: 'https://political-incentives.github.io/'
  }
}

const banner = <div></div>
const navbar = (
  <Navbar
    logo={<b>Novel Issue-Based Donations</b>}
    // ... Your additional navbar options
  />
)
const footer = (
  <Footer>
    <a href="license/LICENSE.txt" target="_blank" rel="noopener noreferrer">
    <img
      src="images/by-nc-sa.png"
      alt="CC BY-NC-SA"
      style={{
        height: 20,
        verticalAlign: 'middle',
        marginRight: 8
      }}
    />
    </a>
    <a href="license/LICENSE.txt" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0 {new Date().getFullYear()} © Michael McCord.</a>
    
  </Footer>
)

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap();
  return (
    <html
      // Not required, but good for SEO
      lang="en"
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head
      // ... Your additional head options
      >
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
      </Head>
      <body>
        <LayoutBody banner={banner} navbar={navbar} footer={footer} pageMap={pageMap}>{children}</LayoutBody>
      </body>
    </html>
  )
}