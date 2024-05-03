"use client";
import React from "react";

const MySettingsPage = () => {
  return (
    <div className="my-settings-page">
      <div className="container m-auto px-3">
        <div className="my-settings-page-wrapper">
          <div className="my-settings-panel">
            <div className="card-item">
              <figure className="userInfo">
                <div className="image-container">
                  <img alt="image-icon" width="44" height="44" src="/_next/image?url=https%3A%2F%2Fpuremoon.s3.amazonaws.com%2Fpublic%2F3%2F1711547204716_review-1.png&amp;w=48&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fpuremoon.s3.amazonaws.com%2Fpublic%2F3%2F1711547204716_review-1.png&amp;w=96&amp;q=75 2x" src="/_next/image?url=https%3A%2F%2Fpuremoon.s3.amazonaws.com%2Fpublic%2F3%2F1711547204716_review-1.png&amp;w=96&amp;q=75" />
                </div>
                <figcaption>
                  <h5>Hello,</h5>
                  <h4>User Name</h4>
                </figcaption>
              </figure>
            </div>
            <div className="card-item">
              <ul className="menu-lists">
                <li>
                  <a href="" className="menu-links">
                    <span className="icon-container">
                      <svg xmlns="http://www.w3.org/2000/svg" id="Icon" enableBackground="new 0 0 96 96" height={512} viewBox="0 0 96 96" width={512}><path id="Product_Package" d="m90.895 25.211-42-21c-.563-.281-1.227-.281-1.789 0l-42 21c-.678.339-1.106 1.031-1.106 1.789v42c0 .758.428 1.45 1.105 1.789l42 21c.282.141.588.211.895.211s.613-.07.895-.211l42-21c.677-.339 1.105-1.031 1.105-1.789v-42c0-.758-.428-1.45-1.105-1.789zm-42.895-16.975 37.528 18.764-8.028 4.014-37.527-18.764zm13.5 30.778-37.528-18.764 11.528-5.764 37.528 18.764zm1.5 3.722 12-6v14.877l-3.838-2.741c-.435-.311-.979-.434-1.506-.343-.527.093-.996.392-1.301.832l-5.355 7.737zm-43.5-20.25 37.527 18.764-9.027 4.514-37.528-18.764zm-11.5 7.75 38 19v37.527l-38-19zm42 56.528v-37.528l9-4.5v18.764c0 .875.568 1.648 1.403 1.909.198.062.398.091.597.091.644 0 1.264-.312 1.645-.861l7.845-11.331 5.349 3.82c.61.435 1.412.494 2.077.15.665-.342 1.084-1.029 1.084-1.778v-20.764l9-4.5v37.527z" /></svg>
                    </span>
                    <span className="text-container">My Orders</span>
                    <span className="arow">
                      <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" enableBackground="new 0 0 128 128" height={512} viewBox="0 0 128 128" width={512}><path id="Down_Arrow_3_" d="m64 88c-1.023 0-2.047-.391-2.828-1.172l-40-40c-1.563-1.563-1.563-4.094 0-5.656s4.094-1.563 5.656 0l37.172 37.172 37.172-37.172c1.563-1.563 4.094-1.563 5.656 0s1.563 4.094 0 5.656l-40 40c-.781.781-1.805 1.172-2.828 1.172z" /></svg>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="" className="menu-links active">
                    <span className="icon-container">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-42 0 512 512.002"><path d="m210.351562 246.632812c33.882813 0 63.222657-12.152343 87.195313-36.128906 23.972656-23.972656 36.125-53.304687 36.125-87.191406 0-33.875-12.152344-63.210938-36.128906-87.191406-23.976563-23.96875-53.3125-36.121094-87.191407-36.121094-33.886718 0-63.21875 12.152344-87.191406 36.125s-36.128906 53.308594-36.128906 87.1875c0 33.886719 12.15625 63.222656 36.132812 87.195312 23.976563 23.96875 53.3125 36.125 87.1875 36.125zm0 0" /><path d="m426.128906 393.703125c-.691406-9.976563-2.089844-20.859375-4.148437-32.351563-2.078125-11.578124-4.753907-22.523437-7.957031-32.527343-3.308594-10.339844-7.808594-20.550781-13.371094-30.335938-5.773438-10.15625-12.554688-19-20.164063-26.277343-7.957031-7.613282-17.699219-13.734376-28.964843-18.199219-11.226563-4.441407-23.667969-6.691407-36.976563-6.691407-5.226563 0-10.28125 2.144532-20.042969 8.5-6.007812 3.917969-13.035156 8.449219-20.878906 13.460938-6.707031 4.273438-15.792969 8.277344-27.015625 11.902344-10.949219 3.542968-22.066406 5.339844-33.039063 5.339844-10.972656 0-22.085937-1.796876-33.046874-5.339844-11.210938-3.621094-20.296876-7.625-26.996094-11.898438-7.769532-4.964844-14.800782-9.496094-20.898438-13.46875-9.75-6.355468-14.808594-8.5-20.035156-8.5-13.3125 0-25.75 2.253906-36.972656 6.699219-11.257813 4.457031-21.003906 10.578125-28.96875 18.199219-7.605469 7.28125-14.390625 16.121094-20.15625 26.273437-5.558594 9.785157-10.058594 19.992188-13.371094 30.339844-3.199219 10.003906-5.875 20.945313-7.953125 32.523437-2.058594 11.476563-3.457031 22.363282-4.148437 32.363282-.679688 9.796875-1.023438 19.964844-1.023438 30.234375 0 26.726562 8.496094 48.363281 25.25 64.320312 16.546875 15.746094 38.441406 23.734375 65.066406 23.734375h246.53125c26.625 0 48.511719-7.984375 65.0625-23.734375 16.757813-15.945312 25.253906-37.585937 25.253906-64.324219-.003906-10.316406-.351562-20.492187-1.035156-30.242187zm0 0" /></svg>
                    </span>
                    <span className="text-container">Account Settings</span>
                    <span className="arow">
                      <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" enableBackground="new 0 0 128 128" height={512} viewBox="0 0 128 128" width={512}><path id="Down_Arrow_3_" d="m64 88c-1.023 0-2.047-.391-2.828-1.172l-40-40c-1.563-1.563-1.563-4.094 0-5.656s4.094-1.563 5.656 0l37.172 37.172 37.172-37.172c1.563-1.563 4.094-1.563 5.656 0s1.563 4.094 0 5.656l-40 40c-.781.781-1.805 1.172-2.828 1.172z" /></svg>
                    </span>
                  </a>
                  <div className="sub-menu-ul">
                    <div className="sub-menu-li">
                      <a href="" className="sub-menu-links">Profile Information</a>
                    </div>
                    <div className="sub-menu-li">
                      <a href="" className="sub-menu-links active">Manage Address</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="my-settings-content">
            <h2>Manage Address</h2>
            <div className="my-address-sec">
              <div className="card-item cart-items for-add">
                <div className="top-heading">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 add-new-address-btn border-none p-0 !normal-case shadow-none" type="button">
                    <img alt="add-icon" loading="lazy" width={14} height={14} decoding="async" data-nimg={1} src="/images/addbtn.svg" style={{ color: 'transparent' }} /> Add a new address </button>
                </div>
              </div>
              <div className="card-item selected-address">
                <div className="selected-address-lists">
                  <div role="radiogroup" aria-required="false" dir="ltr" className="grid gap-2" tabIndex={0} style={{ outline: 'none' }}>
                    <div className="selected-address-item flex gap-x-3">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 infocardbox" htmlFor={38}>
                        <div className="left-address-with-right-btn">
                          <div>
                            <h4 className="!mt-0">Vaughan Leblanc</h4>
                            <ul>
                              <li>
                                <p>
                                  <span className="icon-container">
                                    <img src="/images/phoneicon.svg" alt="" />
                                  </span>
                                  <span className="text-container">+19191213514</span>
                                </p>
                              </li>
                              <li>
                                <p>
                                  <span className="icon-container">
                                    <img src="/images/locationicon.svg" alt="" />
                                  </span>
                                  <span className="text-container">Obcaecati quia et il Inventore nesciunt, Sunt minima in exped, 5944, Culpa natus velit b</span>
                                </p>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <button type="button" id="radix-:r3:" aria-haspopup="menu" aria-expanded="false" data-state="closed">
                              <img alt="image-icon" loading="lazy" width={25} height={25} decoding="async" data-nimg={1} className="rounded-full" src="/images/custom-hover-dropdown-btn.svg" style={{ color: 'transparent' }} />
                            </button>
                          </div>
                        </div>
                      </label>
                    </div>
                    <div className="selected-address-item flex gap-x-3">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 infocardbox" htmlFor={37}>
                        <div className="left-address-with-right-btn">
                          <div>
                            <h4 className="!mt-0">Hector Burnett</h4>
                            <ul>
                              <li>
                                <p>
                                  <span className="icon-container">
                                    <img src="/images/phoneicon.svg" alt="" />
                                  </span>
                                  <span className="text-container">+17825053817</span>
                                </p>
                              </li>
                              <li>
                                <p>
                                  <span className="icon-container">
                                    <img src="/images/locationicon.svg" alt="" />
                                  </span>
                                  <span className="text-container">Earum rerum doloremq Consequatur voluptat, Non a aperiam enim n, 233, Lorem assumenda esse</span>
                                </p>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <button type="button" id="radix-:r6:" aria-haspopup="menu" aria-expanded="false" data-state="closed">
                              <img alt="image-icon" loading="lazy" width={25} height={25} decoding="async" data-nimg={1} className="rounded-full" src="/images/custom-hover-dropdown-btn.svg" style={{ color: 'transparent' }} />
                            </button>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySettingsPage;
