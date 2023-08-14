import React from 'react';

type HeaderType = {
  openModal: () => void;
};

function Header(props: HeaderType) {
  return (
    <header className="p-3">
      <ul className="flex gap-5 max-w-screen-lg m-auto mb-5 mt-10">
        <li
          onClick={props.openModal}
          className="text-myColors-yellow mr-auto font-extrabold">
          <button>Login</button>
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
