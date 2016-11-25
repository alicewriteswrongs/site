import React from 'react'
import { pages } from '../data'

export const Markdown = ({ md }) => {
  return (
    <div
      className='markdown'
      dangerouslySetInnerHTML={{ __html: md }}
    />
  )
}

export const Page = ({ pageName }) => <Markdown md={pages[pageName].body} />

const index = (name, linker, data) => (
  <div>
    <Page pageName={name} />
    <div className="link-list">
      { linker(data) }
    </div>
  </div>
)

export const IndexPage = ({
  indexRegex,
  pageContentName,
  linker,
  data,
  children,
  location: { pathname },
}) => (
  <div className="single-column">
    { pathname.match(indexRegex) ? index(pageContentName, linker, data) : children }
  </div>
)
