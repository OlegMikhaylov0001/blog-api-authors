import React from 'react';

function Header() {
  return (
    <header className='p-3'>
      <ul className="flex gap-5 max-w-screen-lg m-auto mb-5 mt-10">
        <li className="text-myColors-yellow mr-auto font-extrabold">
          <a href="##">Top 10 Articles</a>
        </li>
        <li className="text-myColors-yellow font-extrabold">
          <a href="##">Home</a>
        </li>
        <li className="text-myColors-yellow font-extrabold">
          <a href="##">Authors</a>
        </li>
        <li className="text-myColors-yellow font-extrabold">
          <a href="##">Contact</a>
        </li>
      </ul>
    </header>
  );
}

export default Header;
