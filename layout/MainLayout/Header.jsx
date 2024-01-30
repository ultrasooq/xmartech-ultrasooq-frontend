import React  from 'react';
import { withRouter } from 'next/router';



const Header = (props) => {
   return (
      <header className="header">
         <div className="container">
			   <div className="row">
               <div className="col-lg-12 header_top">
                  <div className="row">
                     <div className="col-lg-4 header_top_left">
                        <p>Welcome to Martfury Online Shopping Store !</p>
                     </div>
                     <div className="col-lg-8 header_top_right">
                        <ul>
                           <li><a href="#">Store Location</a></li>
                           <li><a href="#">Track Your Order</a></li>
                           <li>
                              <select>
                                 <option>USD</option>
                                 <option>INR</option>
                                 <option>AUD</option>
                              </select>
                           </li>
                           <li>
                              <select>
                                 <option>English</option>
                                 <option>German</option>
                                 <option>French</option>
                              </select>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
               <div className="col-lg-12 header_middle">
                  <div className="row">
                     <div className="col-lg-3 logo">
                        <img src="images/logo.png"/>
                     </div>
                     <div className="col-lg-6 header_search_bar">
                        <form>
                           <div className="search_bar_left">
                              <div className="search_dropdown">
                                 <select>
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
                           </div>
                           <div className="search_bar_middle">
                              <input type="search" className="form-control" placeholder="I’m shopping for..."/>
                           </div>
                           <div className="search_bar_right">

                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </header>
   );
}

export default withRouter(Header);