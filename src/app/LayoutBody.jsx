'use client'
import { useRef } from 'react'
import PrintButton from './PrintButton'
import { Layout } from 'nextra-theme-docs'
import { usePageTitle } from './PageTitleContext'

const LayoutBody = ({ children, banner, navbar, footer, pageMap}) => {
  const contentRef = useRef(null);
  const title = usePageTitle();
  return (
    <>
      <PrintButton contentRef={contentRef} title={title} />
      <Layout
        banner={banner}
        navbar={navbar}
        pageMap={pageMap}
        docsRepositoryBase="https://github.com/political-incentives/political-incentives.github.io/tree/main/content"
        footer={footer}
      >
        <div ref={contentRef}>{children}</div>
      </Layout>
    </>
  )
}

export default LayoutBody
