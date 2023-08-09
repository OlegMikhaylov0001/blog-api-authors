import React from 'react';

type AuthorsCardProps = {
  name: { first: string; last: string };
  location: {
    city: string;
  };
  picture: {
    large: string;
  };
  variant: 'rounded-[30px]' | 'rounded-full';
};

const AuthorsCard: React.FC<AuthorsCardProps> = (props) => {
  // console.log('props', props);

  return (
    <div
      className={`flex flex-col items-center justify-center font-medium  bg-myColors-authorsItem max-w-[320px] h-[320px] ${props.variant}`}>
      <img
        className="w-20 h-20 rounded-full mb-5"
        src={props.picture?.large}
        alt=""
      />
      <p className="text-myColors-yellow text-xl font-h1 uppercase">
        {props.name?.first} {props.name?.last}
      </p>
      <p className="text-white">{props.location?.city}</p>
    </div>
  );
};

export default AuthorsCard;
