import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title'
import Product from '../components/Product'

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')

  const toggleCategory = (event) => {
    if(category.includes(event.target.value)){
      setCategory(prev => prev.filter(item => item !== event.target.value))
    }else{
      setCategory(prev => [...prev, event.target.value])
    }
  }

  const toggleSubCategory = (event) => {
    if(subCategory.includes(event.target.value)){
      setSubCategory(prev => prev.filter(item => item !== event.target.value))
    }else{
      setSubCategory(prev => [...prev, event.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    if (subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }
    setFilterProducts(productsCopy)

    // sort products
    sortProducts(productsCopy)
  }

  const sortProducts = (productsList) => {
    let productsCopy = productsList ? productsList.slice() : filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(productsCopy.sort((a, b) => a.price - b.price))
        break;
      case 'high-low':
        setFilterProducts(productsCopy.sort((a, b) => b.price - a.price))
        break;
      case 'newest':
        setFilterProducts(productsCopy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
        break;
      case 'rating':
        setFilterProducts(productsCopy.sort((a, b) => b.rating - a.rating))
        break;
      case 'popular':
        setFilterProducts(productsCopy.sort((a, b) => b.popularity - a.popularity))
        break;
        
      default:
        setFilterProducts(productsCopy);
        break;
    }
  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    if (filterProducts.length > 0) {
      sortProducts();
    }
  }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Optinos */}
      <div className='min-w-60 sticky top-24 left-0 max-h-screen overflow-y-auto'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2 text-text'>
          FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''} transition ease-in-out `} alt="" />
        </p>
        {/* Catagory Filter */}
        <div className={`border border-border bg-card pl-5 py-4 mt-6 rounded-lg shadow-md transition-all duration-200 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-lg text-primary font-semibold'>CATEGORIES</p>
          <div className='flex flex-col gap-3 text-sm font-light text-text'>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input type="checkbox" onChange={toggleCategory} className='w-4 h-4 accent-primary' value='Men' />
              <span className='text-base'>Men</span>
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input type="checkbox" onChange={toggleCategory} className='w-4 h-4 accent-primary' value='Women' />
              <span className='text-base'>Women</span>
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input type="checkbox" onChange={toggleCategory} className='w-4 h-4 accent-primary' value='Kids' />
              <span className='text-base'>Kids</span>
            </label>
          </div>
        </div>

        {/* Sub Catagory Filter */}
        <div className={`border border-border bg-card pl-5 py-4 my-5 rounded-lg shadow-md transition-transform duration-200 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-lg font-semibold text-secondary'>SUB-CATEGORY</p>
          <div className='flex flex-col gap-3 text-sm font-light text-text'>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input type="checkbox" onChange={toggleSubCategory} className='w-4 h-4 accent-secondary' value='Topwear' />
              <span className='text-base'>Topwear</span>
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input type="checkbox" onChange={toggleSubCategory} className='w-4 h-4 accent-secondary' value='Bottomwear' />
              <span className='text-base'>Bottomwear</span>
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input type="checkbox" onChange={toggleSubCategory} className='w-4 h-4 accent-secondary' value='Winterwear' />
              <span className='text-base'>Winterwear</span>
            </label>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product Sort */}
          <div className='relative inline-block text-left'>
            <div>
              <button onClick={() => setShowSortOptions(!showSortOptions)} className='inline-flex justify-between w-full rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-text hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500'>
                Sort Options
                <svg className={`ml-2 h-5 w-5 ${showSortOptions ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10l5 5 5-5H7z" />
                </svg>
              </button>
            </div>
            {showSortOptions && (
              <div className='absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-card ring-1 ring-black ring-opacity-5'>
                <div className='py-1' role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <button onClick={() => setSortType("popular")} className='block px-4 py-2 text-sm text-text hover:bg-gray-700 w-full text-left'>Sort by Popularity</button>
                  <button onClick={() => setSortType("low-high")} className='block px-4 py-2 text-sm text-text hover:bg-gray-700 w-full text-left'>Sort by Price (Low to High)</button>
                  <button onClick={() => setSortType("high-low")} className='block px-4 py-2 text-sm text-text hover:bg-gray-700 w-full text-left'>Sort by Price (High to Low)</button>
                  <button onClick={() => setSortType("newest")} className='block px-4 py-2 text-sm text-text hover:bg-gray-700 w-full text-left'>Sort by Newest Arrivals</button>
                  <button onClick={() => setSortType("rating")} className='block px-4 py-2 text-sm text-text hover:bg-gray-700 w-full text-left'>Sort by Customer Rating</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8'>
          {
            filterProducts.map((item, index) => (
              <Product key={index} id={item._id} name={item.name} price={item.price} image={item.images[0]} />
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Collection