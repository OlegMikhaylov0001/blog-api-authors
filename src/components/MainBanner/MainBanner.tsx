import React from 'react';

function MainBanner() {
  return (
    <section className='p-3 pb-10'>
      <div className="border-solid border-2 border-myColors-yellow rounded-[60px] max-w-screen-lg m-auto">
        <h1 className="text-myColors-blackMainBanner text-[100px] sm:text-[120px]  md:text-[270px] uppercase font-h1">
          Blog
        </h1>
      </div>
    </section>
  );
}

export default MainBanner;
