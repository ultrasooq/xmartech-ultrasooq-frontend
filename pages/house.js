import Image from 'next/image'
// import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'

// const inter = Inter({ subsets: ['latin'] })

export default function House() {
  const router = useRouter()
  const handleClick = (e, name) => {
    e.preventDefault()
    router.push("/"+name)
  }
  return (
    <main
      className={`flex min-h-screen flex-col justify-between p-24 `}
    >
      
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
         <div className='w-full border-b border-solid border-slate-800'>
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

      <section className="w-100 py-8">
  <div className="container px-4 mx-auto">
    <div className="px-7 py-6 bg-indigo-500 rounded">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 pt-6 mb-10 md:mb-0">
          <h3 className="mb-1 text-2xl font-bold text-white">
            <span className="text-green-300">Try For Free</span>
            <span>New Features</span>
          </h3>
          <p className="mb-8 md:mb-16 text-sm font-medium text-indigo-100">No charge for seven days</p>
          <a className="flex items-center text-white font-medium" href="#">
            <svg className="mr-1" width="12" height="14" viewbox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.92 6.62C11.8724 6.49725 11.801 6.38511 11.71 6.29L6.71 1.29C6.61676 1.19676 6.50607 1.1228 6.38425 1.07234C6.26243 1.02188 6.13186 0.995911 6 0.995911C5.7337 0.995911 5.4783 1.1017 5.29 1.29C5.19676 1.38324 5.1228 1.49393 5.07234 1.61575C5.02188 1.73758 4.99591 1.86814 4.99591 2C4.99591 2.2663 5.1017 2.5217 5.29 2.71L8.59 6H1C0.734784 6 0.48043 6.10536 0.292893 6.2929C0.105357 6.48043 0 6.73479 0 7C0 7.26522 0.105357 7.51957 0.292893 7.70711C0.48043 7.89465 0.734784 8 1 8H8.59L5.29 11.29C5.19627 11.383 5.12188 11.4936 5.07111 11.6154C5.02034 11.7373 4.9942 11.868 4.9942 12C4.9942 12.132 5.02034 12.2627 5.07111 12.3846C5.12188 12.5064 5.19627 12.617 5.29 12.71C5.38296 12.8037 5.49356 12.8781 5.61542 12.9289C5.73728 12.9797 5.86799 13.0058 6 13.0058C6.13201 13.0058 6.26272 12.9797 6.38458 12.9289C6.50644 12.8781 6.61704 12.8037 6.71 12.71L11.71 7.71C11.801 7.6149 11.8724 7.50275 11.92 7.38C12.02 7.13654 12.02 6.86346 11.92 6.62Z" fill="#D7D5F8"></path>
            </svg>
            <span>Check demo</span>
          </a>
        </div>
        <div className="w-full md:w-1/2 flex items-center">
          <img className="mx-auto h-48" src="artemis-assets/images/chart-folder.png" alt=""/>
        </div>
      </div>
    </div>
  </div>
</section>

      <div className="space-y-5">
        <div className="p-3 bg-white shadow rounded-lg" onClick={(e)=> handleClick(e, "house")}>
          <h3 className="text-xs border-b">font-sans</h3>
          <p className="font-sans">
            House Page
          </p>
        </div>
        <div className="p-3 bg-white shadow rounded-lg" onClick={(e)=> handleClick(e, "home")}>
          <h3 className="text-xs border-b">font-serif</h3>
          <p className="font-serif">
          project page
          </p>
        </div>
        <div className="p-3 bg-white shadow rounded-lg">
          <h3 className="text-xs border-b">font-mono</h3>
          <p className="font-mono">
            The quick brown fox jumps over the lazy dog.
          </p>
        </div>
      </div>

      
      <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-2 dark:bg-slate-800">
        <img className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="./classic.jpg" alt="" width="384" height="512" />
        <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
          <blockquote>
            <p className="text-lg font-medium">
              “Tailwind CSS is the only framework that I've seen scale
              on large teams. It’s easy to customize, adapts to any design,
              and the build size is tiny.”
            </p>
          </blockquote>
          <figcaption className="font-medium">
            <div className="text-sky-500 dark:text-sky-400">
              Sarah Dayan
            </div>
            <div className="text-slate-700 dark:text-slate-500">
              Staff Engineer, Algolia
            </div>
          </figcaption>
        </div>
      </figure>

      <div className="flex font-sans ">
        <div className="flex-none w-56 relative">
          <img src="./classic.jpg" alt="" className="absolute inset-0 w-full h-full object-cover rounded-lg" loading="lazy" />
        </div>
        <form className="flex-auto p-6">
          <div className="flex flex-wrap">
            <h1 className="flex-auto font-medium text-slate-900">
              Kids Jumpsuit
            </h1>
            <div className="w-full flex-none mt-2 order-1 text-3xl font-bold text-violet-600">
              $39.00
            </div>
            <div className="text-sm font-medium text-slate-400">
              In stock
            </div>
          </div>
          <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
            <div className="space-x-2 flex text-sm font-bold">
              <label>
                <input className="sr-only peer" name="size" type="radio" value="xs" checked />
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-violet-400 peer-checked:bg-violet-600 peer-checked:text-white">
                  XS
                </div>
              </label>
              <label>
                <input className="sr-only peer" name="size" type="radio" value="s" />
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-violet-400 peer-checked:bg-violet-600 peer-checked:text-white">
                  S
                </div>
              </label>
              <label>
                <input className="sr-only peer" name="size" type="radio" value="m" />
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-violet-400 peer-checked:bg-violet-600 peer-checked:text-white">
                  M
                </div>
              </label>
              <label>
                <input className="sr-only peer" name="size" type="radio" value="l" />
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-violet-400 peer-checked:bg-violet-600 peer-checked:text-white">
                  L
                </div>
              </label>
              <label>
                <input className="sr-only peer" name="size" type="radio" value="xl" />
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-violet-400 peer-checked:bg-violet-600 peer-checked:text-white">
                  XL
                </div>
              </label>
            </div>
          </div>
          <div className="flex space-x-4 mb-5 text-sm font-medium">
            <div className="flex-auto flex space-x-4">
              <button className="h-10 px-6 font-semibold rounded-full bg-violet-600 text-white" type="submit">
                Buy now
              </button>
              <button className="h-10 px-6 font-semibold rounded-full border border-slate-200 text-slate-900" type="button">
                Add to bag
              </button>
            </div>
            <button className="flex-none flex items-center justify-center w-9 h-9 rounded-full text-violet-600 bg-violet-50" type="button" aria-label="Like">
              <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-slate-500">
            Free shipping on all continental US orders.
          </p>
        </form>
      </div>

      <div className="flex font-serif">
        <div className="flex-none w-52 relative">
          <img src="./classic.jpg" alt="" className="absolute inset-0 w-full h-full object-cover rounded-lg" loading="lazy" />
        </div>
        <form className="flex-auto p-6">
          <div className="flex flex-wrap items-baseline">
            <h1 className="w-full flex-none mb-3 text-2xl leading-none text-slate-900">
              DogTooth Style Jacket
            </h1>
            <div className="flex-auto text-lg font-medium text-slate-500">
              $350.00
            </div>
            <div className="text-xs leading-6 font-medium uppercase text-slate-500">
              In stock
            </div>
          </div>
          <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
            <div className="space-x-1 flex text-sm font-medium">
              <label>
                <input className="sr-only peer" name="size" type="radio" value="xs" checked />
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-slate-500 peer-checked:bg-slate-100 peer-checked:text-slate-900">
                  XS
                </div>
              </label>
              <label>
                <input className="sr-only peer" name="size" type="radio" value="s" />
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-slate-500 peer-checked:bg-slate-100 peer-checked:text-slate-900">
                  S
                </div>
              </label>
              <label>
                <input className="sr-only peer" name="size" type="radio" value="m" />
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-slate-500 peer-checked:bg-slate-100 peer-checked:text-slate-900">
                  M
                </div>
              </label>
              <label>
                <input className="sr-only peer" name="size" type="radio" value="l" />
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-slate-500 peer-checked:bg-slate-100 peer-checked:text-slate-900">
                  L
                </div>
              </label>
              <label>
                <input className="sr-only peer" name="size" type="radio" value="xl" />
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-slate-500 peer-checked:bg-slate-100 peer-checked:text-slate-900">
                  XL
                </div>
              </label>
            </div>
          </div>
          <div className="flex space-x-4 mb-5 text-sm font-medium">
            <div className="flex-auto flex space-x-4 pr-4">
              <button className="flex-none w-1/2 h-12 uppercase font-medium tracking-wider bg-slate-900 text-white" type="submit">
                Buy now
              </button>
              <button className="flex-none w-1/2 h-12 uppercase font-medium tracking-wider border border-slate-200 text-slate-900" type="button">
                Add to bag
              </button>
            </div>
            <button className="flex-none flex items-center justify-center w-12 h-12 text-slate-300 border border-slate-200" type="button" aria-label="Like">
              <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-slate-500">
            Free shipping on all continental US orders.
          </p>
        </form>
      </div>

      <div className="flex p-6 font-mono">
        <div className="flex-none w-48 mb-10 relative z-10 before:absolute before:top-1 before:left-1 before:w-full before:h-full before:bg-teal-400">
          <img src="./classic.jpg" alt="" className="absolute z-10 inset-0 w-full h-full object-cover rounded-lg" loading="lazy" />
        </div>
        <form className="flex-auto pl-6">
          <div className="relative flex flex-wrap items-baseline pb-6 before:bg-black before:absolute before:-top-6 before:bottom-0 before:-left-60 before:-right-6">
            <h1 className="relative w-full flex-none mb-2 text-2xl font-semibold text-white">
              Retro Shoe
            </h1>
            <div className="relative text-lg text-white">
              $89.00
            </div>
            <div className="relative uppercase text-teal-400 ml-3">
              In stock
            </div>
          </div>
          <div className="flex items-baseline my-6">
            <div className="space-x-3 flex text-sm font-medium">
              <label>
                <input className="sr-only peer" name="size" type="radio" value="xs" checked />
                <div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
                  XS
                </div>
              </label>
              <label>
                <input className="sr-only peer" name="size" type="radio" value="s" />
                <div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
                  S
                </div>
              </label>
              <label>
                <input className="sr-only peer" name="size" type="radio" value="m" />
                <div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
                  M
                </div>
              </label>
              <label>
                <input className="sr-only peer" name="size" type="radio" value="l" />
                <div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
                  L
                </div>
              </label>
              <label>
                <input className="sr-only peer" name="size" type="radio" value="xl" />
                <div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
                  XL
                </div>
              </label>
            </div>
          </div>
          <div className="flex space-x-2 mb-4 text-sm font-medium">
            <div className="flex space-x-4">
              <button className="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black" type="submit">
                Buy now
              </button>
              <button className="px-6 h-12 uppercase font-semibold tracking-wider border border-slate-200 text-slate-900" type="button">
                Add to bag
              </button>
            </div>
            <button className="flex-none flex items-center justify-center w-12 h-12 text-black" type="button" aria-label="Like">
              <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
            </button>
          </div>
          <p className="text-xs leading-6 text-slate-500">
            Free shipping on all continental US orders.
          </p>
        </form>
      </div>
    </main>
  )
}
