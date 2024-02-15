import React from 'react';
import { useRouter, withRouter } from 'next/router';



const Header = (props) => {
   const Router = useRouter();
   const handleClick = (e, name) => {
      e.preventDefault()
      router.push("/"+name)
    }
   return (

      


      <header className='w-full'>
         <div className='w-full bg-dark-cyan'>
            <div className='container m-auto'>
               <div className='flex gap-x-2.5'>
                  <div className='w-1/3 text-sm text-white font-normal py-4'>
                     <p>Welcome to Martfury Online Shopping Store !</p>
                  </div>
                  <div className='w-2/3 text-sm text-white font-normal flex justify-end py-4'>
                     <ul className='flex justify-end'>
                        <li className='px-2 text-white text-sm font-normal border-r border-solid border-white'><a href="#">Store Location</a></li>
                        <li className='px-2 text-white text-sm font-normal border-r border-solid border-white'><a href="#">Track Your Order</a></li>
                        <li className='px-2 text-white text-sm font-normal border-r border-solid border-white'>
                           <select className='bg-transparent text-white border-0 focus:outline-none'>
                              <option className='bg-dark-cyan'>USD</option>
                              <option className='bg-dark-cyan'>INR</option>
                              <option className='bg-dark-cyan'>AUD</option>
                           </select>
                        </li>
                        <li className='px-2 pr-0 text-white text-sm font-normal'>
                           <select className='bg-transparent text-white border-0 focus:outline-none'>
                              <option className='bg-dark-cyan'>English</option>
                              <option className='bg-dark-cyan'>German</option>
                              <option className='bg-dark-cyan'>French</option>
                           </select>
                        </li>
                     </ul>
                  </div>
               </div>
               <div className='flex gap-x-2.5'>
               <div className='w-1/6 py-4 flex items-center'>
                     <a href="#">
                     <img src="images/logo.png" />
                     </a>
                  </div>
                  <div className='w-4/6 py-4 pr-4 flex items-center'>
                     <div className='w-auto h-11'>
                     <select className='w-full h-full focus:outline-none'>
                        <option>All</option>
                        <option>Apps & Games</option>
                        <option>Beauty</option>
                        <option>Car & Motorbike</option>
                        <option>Clothing & Accessories</option>
                        <option>Computers & Accessories</option>
                        <option>Electronics</option>
                        <option>Movies & TV Shows</option>
                     </select>
                     </div>
                     <div className='w-4/6 h-11 border-l border-solid border-indigo-200'>
                     <input type="search" className="form-control w-full h-full p-2.5 text-black focus:outline-none" placeholder="I’m shopping for..." />
                     </div>
                     <div className='w-1/6 h-11'>
                     <button type="button" className="btn w-full h-full bg-dark-orange text-white text-sm font-semibold">Search</button>
                     </div>
                  </div>
                  <div className='w-1/6 py-4 flex justify-end'>
                  <ul className='flex items-center justify-end gap-x-4'>
                     <li className='relative pt-0 pr-1 pb-3 pl-0 flex'>
                           <a className='flex flex-wrap items-center'>
                           <img src='images/wishlist.svg' />
                           <div className='w-6 h-6 rounded-full bg-dark-orange text-xs text-white font-bold flex items-center justify-center absolute bottom-0 right-0'>0</div>
                           </a>
                     </li>
                     <li className='relative pt-0 pr-1 pb-3 pl-0 flex'>
                           <a className='flex flex-wrap items-center'>
                           <img src='images/cart.svg' />
                           <div className='w-6 h-6 rounded-full bg-dark-orange text-xs text-white font-bold flex items-center justify-center absolute bottom-0 right-0'>0</div>
                           </a>
                     </li>
                     <li className='relative pt-0 pr-1 pb-3 pl-0 flex'>
                           <img src="images/login.svg" />
                           <a className='flex flex-wrap items-center text-sm text-white font-bold ml-1.5 flex flex-col items-start'>
                           <span onClick={() => Router.push("/login")}>Login </span><span onClick={() => Router.push("/register")}> Register</span>
                           </a>
                     </li>
                     </ul>
                  </div>
               </div>
               <div className='flex w-full'>
               <ul className='w-full flex items-center justify-between'>
                  <li className='flex py-5 text-white text-lg font-semibold uppercase'>
                     <a href='javascript:void(0);' className='flex gap-x-2'> <img src='images/menu-icon-home.svg'/> Home</a>
                  </li>
                  <li className='flex py-5 text-white text-lg font-semibold uppercase'>
                     <a href='javascript:void(0);' className='flex gap-x-2'> <img src='images/menu-icon-trending.svg'/> Trending & Hot Deals</a>
                  </li>
                  <li className='flex py-5 text-white text-lg font-semibold uppercase'>
                     <a href='javascript:void(0);' className='flex gap-x-2'> <img src='images/menu-icon-buy.svg'/> buygroup</a>
                  </li>
                  <li className='flex py-5 text-white text-lg font-semibold uppercase'>
                     <a href='javascript:void(0);' className='flex gap-x-2'> <img src='images/menu-icon-rfq.svg'/> rfq</a>
                  </li>
                  <li className='flex py-5 text-white text-lg font-semibold uppercase'>
                     <a href='javascript:void(0);' className='flex gap-x-2'> <img src='images/menu-icon-pos.svg'/> pos store</a>
                  </li>
                  <li className='flex py-5 text-white text-lg font-semibold uppercase'>
                     <a href='javascript:void(0);' className='flex gap-x-2'> <img src='images/menu-icon-service.svg'/> Service</a>
                  </li>
               </ul>
               </div>
            </div>
         </div>
         <div className='w-full border-b border-solid border-gray-300'>
            <div className='container m-auto'>
               <div className='flex'>
                  <div className='w-1/6 flex py-3'>
                     <img src='images/humberger-icon.svg'/>
                     <span className='text-lg font-normal capitalize text-color-dark mx-3'>All Categories</span>
                     <img src='images/humberger-down-icon.svg'/>
                  </div>
                  <div className='w-5/6 flex items-center justify-end'>
                    <ul className='flex items-center justify-end gap-x-4'>
                      <li className='text-lg font-normal capitalize py-1.5 text-light-gray'>
                          <a href="#" className='text-light-gray'>Buyer Central</a>
                      </li>
                      <li className='text-lg font-normal capitalize py-1.5 text-light-gray'>
                          <a href="#" className='text-light-gray'>Help Center</a>
                      </li>
                    </ul>
                  </div>
               </div>
            </div>
         </div>
      </header>

      

     

   );
}

export default withRouter(Header);