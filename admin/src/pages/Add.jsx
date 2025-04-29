import React from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({token}) => {
  const [images, setImages] = React.useState([]);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [categories, setCategories] = React.useState([]);
  const [sizes, setSizes] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [inStock, setInStock] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleImageChange = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('categories', JSON.stringify(categories));
      formData.append('sizes', JSON.stringify(sizes));
      formData.append('tags', JSON.stringify(tags));
      formData.append('inStock', inStock);

      // Append images to formData with the correct field names
      images.forEach((image, index) => {
        if (image) {
          // Use the field names expected by the server: image1, image2, image3, image4
          formData.append(`image${index + 1}`, image);
        }
      });

      const response = await axios.post(`${backendUrl}/api/products/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
          token
        },
      });

      if(response.data.success){
        toast.success(response.data.message);
        setSuccess(true);

        setName('');
        setDescription('');
        setPrice('');
        setCategories([]);
        setSizes([]);
        setTags([]);
        setImages([]);
      }
      
      // Reset form after successful submission
      
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || 'Failed to add product');
      toast.error(error.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className='flex flex-col w-full items-start gap-3' onSubmit={handleSubmit}>
      {success && (
        <div className='w-full max-w-[500px] p-3 bg-green-100 text-green-800 rounded-md mb-3'>
          Product added successfully!
        </div>
      )}
      
      {error && (
        <div className='w-full max-w-[500px] p-3 bg-red-100 text-red-800 rounded-md mb-3'>
          {error}
        </div>
      )}
      
      <div>
        <p className='mb-2'>Upload Images (Required)</p>
        <div className='flex gap-2'>
          {[0,1,2,3].map((index) => (
            <label key={index} htmlFor={`image${index}`}>
              <img 
                className='w-20' 
                src={images[index] ? URL.createObjectURL(images[index]) : assets.upload_area} 
                alt={`Upload area ${index + 1}`} 
              />
              <input 
                type="file" 
                id={`image${index}`} 
                hidden 
                onChange={(e) => handleImageChange(e, index)} 
              />
            </label>
          ))}
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input 
          type="text" 
          className='w-full max-w-[500px] py-2 px-3' 
          placeholder='Type here'  
          required 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea 
          className='w-full max-w-[500px] py-2 px-3' 
          placeholder='Write content here'  
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Categories</p>
        <input 
          type="text" 
          className='w-full max-w-[500px] py-2 px-3' 
          placeholder='Enter categories separated by commas'
          value={categories.join(',')}
          onChange={(e) => setCategories(e.target.value.split(',').map(cat => cat.trim()))}
        />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Tags</p>
        <input 
          type="text" 
          className='w-full max-w-[500px] py-2 px-3' 
          placeholder='Enter tags separated by commas'
          value={tags.join(',')}
          onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
        />
      </div>

      <div>
        <p className='mb-2'>Product Price</p>
        <input 
          className='w-full px-3 py-2 sm:w-[120px]' 
          type="number" 
          placeholder='e.g. 25'
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div key={size}>
              <p 
                className={`px-3 py-1 cursor-pointer ${sizes.includes(size) ? 'bg-black text-white' : 'bg-slate-200'}`}
                onClick={() => {
                  if (sizes.includes(size)) {
                    setSizes(sizes.filter(s => s !== size));
                  } else {
                    setSizes([...sizes, size]);
                  }
                }}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input 
          type="checkbox" 
          id='inStock' 
          checked={inStock}
          onChange={(e) => setInStock(e.target.checked)}
        />
        <label className='cursor-pointer' htmlFor="inStock">In Stock</label>
      </div>

      <button 
        type='submit' 
        className={`w-28 py-3 mt-4 bg-black text-white ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Product'}
      </button>
    </form>
  )
}

export default Add