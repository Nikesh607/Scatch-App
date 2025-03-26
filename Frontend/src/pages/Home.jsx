import React,{useState,useCallback} from 'react'
import Productlist from '../Components/Productlist'



const Home = () => {


    const [sortBy, setSortBy] = useState("")
    const [newcollection, setNewcollection] = useState(false)

    const handleSort = useCallback((e) => {
        setSortBy(e.target.value)
    }, [])

    const toggleNewCollection = useCallback(() => {
        setNewcollection(prev => !prev)
    }, [])

    return (
        <div className=' flex gap-7 mx-12 mr-40 '>
            <div className="left-container  my-6 py-3 pl-4 w-1/5 rounded-xl min-h-[calc(100vh-120px)] bg-[#e9eaed]">
                <div className='flex flex-col gap-72'>
                    <div className='flex flex-col gap-20'>
                        <div className='flex items-center'>
                            <label className='text-lg font-semibold'> Sort by :</label>
                            <select
                                className="py-1 rounded-md hover:bg-gray-200 w-28 text-center"
                                value={sortBy}
                                onChange={handleSort}
                            >
                                <option value="">Products</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="name">Name: A-Z</option>
                            </select>

                        </div>
                        <div>
                            <ul className='flex flex-col gap-1'>
                                <li className='hover:cursor-pointer' onClick={toggleNewCollection} >New collection</li>
                                <li className='hover:cursor-pointer'>All Products</li>
                                <li className='hover:cursor-pointer'>Discounted Products</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <p className='font-semibold'>Filter by:</p>
                        <ul className='text-[14px]'>
                            <li className='hover:cursor-pointer'>Availability</li>
                            <li className='hover:cursor-pointer'>Discounts</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* <div className="right-conatainer w-full flex gap-12 flex-wrap min-h-[calc(100vh-120px)]"> */}
                <Productlist sortBy={sortBy} newcollection={newcollection}/>

            {/* </div> */}
        </div>
    )
}

export default Home
