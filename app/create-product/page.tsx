import React from "react";

const CreateProductPage = () => {
  return ( <>
    
    <section className="relative w-full py-7">
      <div className="absolute left-0 top-0 -z-10 h-full w-full">
        <img src="/images/before-login-bg.png" className="h-full w-full object-cover object-center" alt="background" />
      </div>
      <div className="w-full relative z-10 m-auto px-4 max-w-[1540px]">
        <div className="flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-9/12">
            <div className="mb-3 w-full rounded-lg border border-solid border-gray-300 bg-white p-6 shadow-sm sm:p-4 lg:p-8">
              <div className="flex w-full flex-wrap">
                <div className="mb-4 w-full">
                  <div className="mt-2.5 w-full">
                    <label className="mb-3.5 block text-left text-lg font-medium capitalize leading-5 text-color-dark">
                      Basic Information
                    </label>
                  </div>
                </div>
                <div className="mb-3.5 w-full">
                  <div className="flex flex-wrap">
                    <div className="relative mb-4 w-full md:w-6/12 md:pr-3.5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-color-dark">Product Category</label>
                        <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus:outline-none">
                          <option value="">Shoes</option>
                          <option value="Cloths">Cloths</option>
                          <option value="Addidas">Electronics</option>
                        </select>
                      </div>
                    </div>
                    <div className="relative mb-4 w-full md:w-6/12 md:pl-3.5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-color-dark">Product Sub-Category</label>
                        <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus:outline-none">
                          <option value="">sneakers</option>
                          <option value="sneakers">sneakers</option>
                          <option value="Lofers">Lofers</option>
                        </select>
                      </div>
                    </div>
                    <div className="relative mb-4 w-full">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-color-dark">Product Name</label>
                        <input type="text" placeholder="Nike Air Force" className="!h-[48px] w-full rounded border border-gray-300 px-3 text-sm focus:outline-none placeholder:text-color-dark"/>
                      </div>
                    </div>
                    <div className="relative mb-4 w-full md:w-6/12 md:pr-3.5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-color-dark">Brand</label>
                        <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus:outline-none">
                          <option value="">Nike</option>
                          <option value="Nike">Nike</option>
                          <option value="Addidas">Addidas</option>
                          <option value="Puma">Puma</option>
                        </select>
                      </div>
                    </div>
                    <div className="relative mb-4 w-full md:w-6/12 md:pl-3.5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-color-dark">SKU No</label>
                        <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus:outline-none">
                          <option value="">SF1133569600-1</option>
                          <option value="SF1133569600-1">SF1133569600-1</option>
                          <option value="SF1133569600-1">SF1133569600-1</option>
                        </select>
                      </div>
                    </div>
                    <div className="relative mb-4 w-full">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-color-dark">Tag</label>
                        <p>Accordion</p>
                      </div>
                    </div>
                    <div className="relative mb-4 w-full">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-color-dark">Product Image</label>
                        <div className="w-full flex flex-wrap">
                          <div className="w-full sm:w-[50%] lg:w-[33.33%] xl:w-[22%] pr-2 mb-3">
                            <div className="relative m-auto flex h-48 w-full flex-wrap items-center justify-center border-2 border-solid border-gray-300 text-center rounded-xl">
                              <img src="/images/iphone.png"/>
                            </div>
                          </div>
                          <div className="w-full sm:w-[50%] lg:w-[33.33%] xl:w-[22%] px-2 mb-3">
                            <div className="relative m-auto flex h-48 w-full flex-wrap items-center justify-center border-2 border-dashed border-gray-300 text-center rounded-xl">
                              <div className="text-sm font-medium leading-4 text-color-dark">
                                <img src="/images/upload.png" className="m-auto mb-3" alt="camera"/>
                                <span>Drop your Image or </span>
                                <span className="text-blue-500">browse</span>
                                <p className="text-normal mt-1 text-xs leading-4 text-gray-300">
                                  (.jpg or .png only. Up to 16mb)
                                </p>
                              </div>

                              <input type="file" className="absolute w-full h-full rounded-full bg-red-200 opacity-0"/>
                            </div>
                          </div>
                          <div className="w-full sm:w-[50%] lg:w-[33.33%] xl:w-[22%] px-2 mb-3">
                            <div className="relative m-auto flex h-48 w-full flex-wrap items-center justify-center border-2 border-dashed border-gray-300 text-center rounded-xl">
                              <div className="text-sm font-medium leading-4 text-color-dark">
                                <img src="/images/video-square.png" className="m-auto mb-3" alt="camera"/>
                                <span>Drop your Image or </span>
                                <span className="text-blue-500">browse</span>
                                <p className="text-normal mt-1 text-xs leading-4 text-gray-300">
                                  (Up to 16mb)
                                </p>
                              </div>
                              <input type="file" className="absolute w-full h-full rounded-full bg-red-200 opacity-0"/>
                            </div>
                          </div>
                          <div className="w-full sm:w-[50%] lg:w-[33.33%] xl:w-[22%] px-2 mb-3">
                            <div className="relative m-auto flex h-48 w-full flex-wrap items-center justify-center border-2 border-dashed border-gray-300 text-center rounded-xl">
                              <div className="text-sm font-medium leading-4 text-color-dark">
                                <img src="/images/upload.png" className="m-auto mb-3" alt="camera"/>
                                <span>Drop your Image or </span>
                                <span className="text-blue-500">browse</span>
                                <p className="text-normal mt-1 text-xs leading-4 text-gray-300">
                                  (.jpg or .png only. Up to 16mb)
                                </p>
                              </div>

                              <input type="file" className="absolute w-full h-full rounded-full bg-red-200 opacity-0"/>
                            </div>
                          </div>
                          <div className="w-full sm:w-[50%] lg:w-[33.33%] xl:w-[12%] pl-2 mb-3">
                            <div className="relative m-auto flex h-48 w-full flex-wrap items-center justify-center border-2 border-dashed border-gray-300 text-center rounded-xl">
                              <div className="text-sm font-medium leading-4 text-color-dark">
                                <img src="/images/plus.png" className="m-auto mb-3" alt="camera"/>
                                <span>Add More </span>
                              </div>
                              <input type="file" className="absolute w-full h-full rounded-full bg-red-200 opacity-0"/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative mb-4 w-full md:w-6/12 md:pr-3.5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-color-dark">Product Price</label>
                        <div className="!h-[48px] w-full rounded border !border-gray-300 px-3 py-1 text-sm focus:outline-none flex items-center justify-start">
                          <div className="bg-[#F6F6F6] w-[32px] h-[34px] flex items-center justify-center mr-2">$</div>
                          <input type="text" placeholder="250.00" className="w-[calc(100%_-_2.5rem)] h-full focus:border-0 focus:outline-none focus:shadow-none placeholder:text-sm placeholder:font-normal placeholder:text-black"/>
                        </div>
                      </div>
                    </div>
                    <div className="relative mb-4 w-full md:w-6/12 md:pl-3.5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-color-dark">Offer Price</label>
                        <div className="!h-[48px] w-full rounded border !border-gray-300 px-3 py-1 text-sm focus:outline-none flex items-center justify-start">
                          <div className="bg-[#F6F6F6] w-[32px] h-[34px] flex items-center justify-center mr-2">$</div>
                          <input type="text" placeholder="250.00" className="w-[calc(100%_-_2.5rem)] h-full focus:border-0 focus:outline-none focus:shadow-none placeholder:text-sm placeholder:font-normal placeholder:text-black"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3 w-full rounded-lg border border-solid border-gray-300 bg-white p-6 shadow-sm sm:p-4 lg:p-8">
              <div className="flex w-full flex-wrap">
                <div className="mb-4 w-full">
                  <div className="mt-2.5 w-full">
                    <label className="mb-3.5 block text-left text-lg font-medium capitalize leading-5 text-color-dark">
                      Product Details
                    </label>
                  </div>
                </div>
                <div className="mb-3.5 w-full">
                  <div className="flex flex-wrap">
                    <div className="relative mb-4 w-full md:w-6/12 md:pr-3.5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-color-dark">Place of Origin</label>
                        <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus:outline-none">
                          <option value="">Select</option>
                          <option value="">Origin 1</option>
                          <option value="">Origin 2</option>
                        </select>
                      </div>
                    </div>
                    <div className="relative mb-4 w-full md:w-6/12 md:pl-3.5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-color-dark">Style</label>
                        <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus:outline-none">
                          <option value="">Select</option>
                          <option value="">Style 1</option>
                          <option value="">Style 2</option>
                        </select>
                      </div>
                    </div>
                    <div className="relative mb-4 w-full">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-color-dark">Color</label>
                        <p>Accordion</p>
                      </div>
                    </div>
                    <div className="relative mb-4 w-full">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-color-dark">Function</label>
                        <p>Accordion</p>
                      </div>
                    </div>
                    <div className="relative mb-4 w-full md:w-6/12 md:pr-3.5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-color-dark">Battery Life</label>
                        <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus:outline-none">
                          <option value="">Select</option>
                          <option value="">Battery Life 1</option>
                          <option value="">Battery Life 2</option>
                        </select>
                      </div>
                    </div>
                    <div className="relative mb-4 w-full md:w-6/12 md:pl-3.5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-color-dark">Screen</label>
                        <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus:outline-none">
                          <option value="">Select</option>
                          <option value="">Screen 1</option>
                          <option value="">Screen 2</option>
                        </select>
                      </div>
                    </div>
                    <div className="relative mb-4 w-full md:w-6/12 md:pr-3.5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-color-dark">Memory Size</label>
                        <select className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus:outline-none">
                          <option value="">Select</option>
                          <option value="">Memory Size 1</option>
                          <option value="">Memory Size 2</option>
                        </select>
                      </div>
                    </div>
                    <div className="relative mb-4 w-full md:w-6/12 md:pl-3.5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-color-dark">Model No</label>
                        <input type="text" placeholder='SF1133569600-1' className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus:outline-none"/>
                      </div>
                    </div>
                    <div className="relative mb-4 w-full md:w-6/12 md:pr-3.5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-color-dark">Brand Name</label>
                        <input type="text" placeholder='Enter brand name' className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus:outline-none"/>
                      </div>
                    </div>
                    <div className="relative mb-4 w-full md:w-6/12 md:pl-3.5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-color-dark">More Details</label>
                        <div className="grid gap-x-6 grid-cols-2">
                            <input type="text" placeholder='Attribute -e.g color' className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus:outline-none"/>
                            <input type="text" placeholder='value -e.g color' className="!h-[48px] w-full rounded border !border-gray-300 px-3 text-sm focus:outline-none"/>
                        </div>
                        <span className="text-sm font-normal text-[#7F818D]">Please fill in both attribute name & value ( e.g, color:Red)</span>
                      </div>
                    </div>
                    <div className="relative mb-4 w-full">
                      <div className="space-y-2">
                        <a href="#" className="text-sm font-semibold text-dark-orange flex items-center justify-start capitalize"><img src="/images/plus-orange.png" className="mr-2"/>add Custom Field</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3 w-full rounded-lg border border-solid border-gray-300 bg-white p-6 shadow-sm sm:p-4 lg:p-8">
              <div className="flex w-full flex-wrap">
                <div className="mb-4 w-full">
                  <div className="mt-2.5 w-full">
                    <label className="mb-3.5 block text-left text-lg font-medium capitalize leading-5 text-color-dark">
                      Description & Specification
                    </label>
                  </div>
                </div>
                <div className="mb-3.5 w-full">
                  <div className="flex flex-wrap">
                    <div className="relative mb-4 w-full">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-color-dark">Description</label>
                        <textarea className="!h-[200px] w-full rounded border !border-gray-300 px-3 py-1 text-sm focus:outline-none resize-none"></textarea>
                      </div>
                    </div>
                    <div className="relative mb-4 w-full">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-color-dark">Specification</label>
                        <textarea className="!h-[200px] w-full rounded border !border-gray-300 px-3 py-1 text-sm focus:outline-none resize-none"></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full inline-flex items-center justify-end mt-4 mb-4">
              <button className="text-lg font-bold text-[#7F818D] leading-6 py-4 px-4 bg-transparent rounded-sm mt-3">Save as Draft</button>
              <button className="text-lg font-bold text-white leading-6 py-4 px-10 bg-dark-orange rounded-sm mt-3">Continue</button>
            </div>
          </div>
          <div className="mb-12 w-full md:w-4/12 lg:w-3/12 pl-3">
            <div className="w-full rounded-lg border border-solid border-gray-300 bg-white shadow-sm p-2">
              <div className="w-full bg-[#F8F6F6] rounded-lg py-6 px-4">
                <h3 className="text-lg font-medium text-color-dark mb-1">Product Found</h3>
                <p className="text-sm font-normal text-[#7F818D]">Lorem ipsum dolor sit amet, </p>
              </div>
              <div className="w-full">
                <div className="w-full border border-solid border-gray-300 rounded-lg p-2 flex items-start mb-2">
                  <div className="w-[calc(100%_-_2rem)] flex items-center py-2">
                      <div className="w-[64px] h-[64px] border border-solid border-gray-300 flex items-center justify-center rounded-lg p-1">
                        <img src="/images/iphone.png" className="max-w-full max-h-full"/>
                      </div>
                      <div className="w-[calc(100%_-_4rem)] pl-3">
                        <p className="text-sm font-normal leading-4 text-[#1D77D1] mb-2.5">Lorem Ipsum is simply dummy text..</p>
                        <a href="#" className="text-xs font-normal text-[#464151] underline underline-offset-1">Remove</a>
                      </div>
                  </div>
                  <div className="w-[32px] h-auto flex justify-end">
                      <a href="#" className="w-[28px] h-[28px] bg-red-200 rounded-md flex items-center justify-center"><img src="/images/export.png"/></a>
                  </div>
                </div>
                <div className="w-full border border-solid border-gray-300 rounded-lg p-2 flex items-start mb-2">
                  <div className="w-[calc(100%_-_2rem)] flex items-center py-2">
                      <div className="w-[64px] h-[64px] border border-solid border-gray-300 flex items-center justify-center rounded-lg p-1">
                        <img src="/images/iphone.png" className="max-w-full max-h-full"/>
                      </div>
                      <div className="w-[calc(100%_-_4rem)] pl-3">
                        <p className="text-sm font-normal leading-4 text-[#1D77D1] mb-2.5">Lorem Ipsum is simply dummy text..</p>
                        <a href="#" className="text-xs font-normal text-[#464151] underline underline-offset-1">Remove</a>
                      </div>
                  </div>
                  <div className="w-[32px] h-auto flex justify-end">
                      <a href="#" className="w-[28px] h-[28px] bg-red-200 rounded-md flex items-center justify-center"><img src="/images/export.png"/></a>
                  </div>
                </div>
                <div className="w-full border border-solid border-gray-300 rounded-lg p-2 flex items-start mb-2">
                  <div className="w-[calc(100%_-_2rem)] flex items-center py-2">
                      <div className="w-[64px] h-[64px] border border-solid border-gray-300 flex items-center justify-center rounded-lg p-1">
                        <img src="/images/iphone.png" className="max-w-full max-h-full"/>
                      </div>
                      <div className="w-[calc(100%_-_4rem)] pl-3">
                        <p className="text-sm font-normal leading-4 text-[#1D77D1] mb-2.5">Lorem Ipsum is simply dummy text..</p>
                        <a href="#" className="text-xs font-normal text-[#464151] underline underline-offset-1">Remove</a>
                      </div>
                  </div>
                  <div className="w-[32px] h-auto flex justify-end">
                      <a href="#" className="w-[28px] h-[28px] bg-red-200 rounded-md flex items-center justify-center"><img src="/images/export.png"/></a>
                  </div>
                </div>
                <div className="w-full border border-solid border-gray-300 rounded-lg p-2 flex items-start mb-2">
                  <div className="w-[calc(100%_-_2rem)] flex items-center py-2">
                      <div className="w-[64px] h-[64px] border border-solid border-gray-300 flex items-center justify-center rounded-lg p-1">
                        <img src="/images/iphone.png" className="max-w-full max-h-full"/>
                      </div>
                      <div className="w-[calc(100%_-_4rem)] pl-3">
                        <p className="text-sm font-normal leading-4 text-[#1D77D1] mb-2.5">Lorem Ipsum is simply dummy text..</p>
                        <a href="#" className="text-xs font-normal text-[#464151] underline underline-offset-1">Remove</a>
                      </div>
                  </div>
                  <div className="w-[32px] h-auto flex justify-end">
                      <a href="#" className="w-[28px] h-[28px] bg-red-200 rounded-md flex items-center justify-center"><img src="/images/export.png"/></a>
                  </div>
                </div>
                <div className="w-full border border-solid border-gray-300 rounded-lg p-2 flex items-start mb-2">
                  <div className="w-[calc(100%_-_2rem)] flex items-center py-2">
                      <div className="w-[64px] h-[64px] border border-solid border-gray-300 flex items-center justify-center rounded-lg p-1">
                        <img src="/images/iphone.png" className="max-w-full max-h-full"/>
                      </div>
                      <div className="w-[calc(100%_-_4rem)] pl-3">
                        <p className="text-sm font-normal leading-4 text-[#1D77D1] mb-2.5">Lorem Ipsum is simply dummy text..</p>
                        <a href="#" className="text-xs font-normal text-[#464151] underline underline-offset-1">Remove</a>
                      </div>
                  </div>
                  <div className="w-[32px] h-auto flex justify-end">
                      <a href="#" className="w-[28px] h-[28px] bg-red-200 rounded-md flex items-center justify-center"><img src="/images/export.png"/></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    </>
  );
};

export default CreateProductPage;
