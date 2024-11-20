import React from 'react'
import ProductGallery from '../productgallery/productgallery'

const PageContent = ({products,title}) => {
  return (
    <div id=''>
      <ProductGallery productsSet={products}/>
      </div>
  )
}

export default PageContent
