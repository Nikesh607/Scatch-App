import React from 'react'
import { useState } from "react";
import { NavLink,} from 'react-router-dom';
import axiosInstance from '../config/axios.config';

const Create_product = () => {

  const [Image, setImage] = useState()
  const [Name, setName] = useState("")
  const [Price, setPrice] = useState("")
  const [Discount, setDiscount] = useState("")
  const [Bgcolor, setBgcolor] = useState("")
  const [Panelcolor, setPanelcolor] = useState("")
  const [Textcolor, setTextcolor] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData()
    formdata.append('image', Image);
    formdata.append('name', Name);
    formdata.append('price', Price);
    formdata.append('discount', Discount);
    formdata.append('bgcolor', Bgcolor);
    formdata.append('panelcolor', Panelcolor);
    formdata.append('textcolor', Textcolor);

    console.log(formdata)

    try {
      const response = await axiosInstance.post('/owners/createproduct', formdata);
    
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
    }
        
  };


  return (

    <div className='flex gap-7 mx-16 mr-40 my-6'>
      <div className="left-container w-1/5 min-h-[calc(100vh-120px)]">
        <ul className='flex flex-col gap-2'>
          <NavLink to="/owner" className={({ isActive }) =>
            isActive ? 'hover:cursor-pointer px-2' : 'hover:cursor-pointer'
          }>All Products</NavLink>
          <NavLink to="/orders" className={({ isActive }) =>
            isActive ? 'hover:cursor-pointer ' : 'hover:cursor-pointer px-2'
          }>Orders</NavLink>
          <NavLink to="/owner/addproduct" className={({ isActive }) =>
            isActive ? 'hover:cursor-pointer bg-slate-200 border rounded-full px-2 w-[170px]' : 'hover:cursor-pointer'
          }>Create New Products</NavLink>
        </ul>
      </div>
      <div className="right-conatainer w-full flex gap-12 flex-wrap min-h-[calc(100vh-120px)]">
        <main className="w-full bg-white px-8 shadow ml-4 ">
          <h2 className="text-xl font-bold mb-4">Create New Product</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Product Details</h3>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Product Image</label>
                <input
                  name="image"
                  type="file"
                  className="py-2 px-4 rounded"
                  onChange={(e) => {
                    console.log(e.target.files[0])
                    setImage(e.target.files[0])
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="name"
                  type="text"
                  placeholder="Product Name"
                  className="border p-2 rounded w-full"
                  value={Name}
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                />
                <input
                  name="price"
                  type="text"
                  placeholder="Product Price"
                  className="border p-2 rounded w-full"
                  value={Price}
                  onChange={(e) => {
                    setPrice(e.target.value)
                  }}
                />
                <input
                  name="discount"
                  type="text"
                  placeholder="Discount Price"
                  className="border p-2 rounded w-full"
                  value={Discount}
                  onChange={(e) => {
                    setDiscount(e.target.value)
                  }}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Panel Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="bgcolor"
                  type="text"
                  placeholder="Background Color"
                  className="border p-2 rounded w-full"
                  value={Bgcolor}
                  onChange={(e) => {
                    setBgcolor(e.target.value)
                  }}
                />
                <input
                  name="panelcolor"
                  type="text"
                  placeholder="Panel Color"
                  className="border p-2 rounded w-full"
                  value={Panelcolor}
                  onChange={(e) => {
                    setPanelcolor(e.target.value)
                  }}
                />
                <input
                  name="textcolor"
                  type="text"
                  placeholder="Text Color"
                  className="border p-2 rounded w-full"
                  value={Textcolor}
                  onChange={(e) => {
                    setTextcolor(e.target.value)
                  }}
                />
              </div>
            </div>
            <input
              className="px-5 py-2 rounded mt-3 bg-blue-500 text-white cursor-pointer"
              type="submit"
              value="Create New Product"
            />
          </form>
        </main>
      </div>
    </div>

  )
}

export default Create_product
