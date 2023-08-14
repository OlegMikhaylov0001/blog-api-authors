import React, { RefObject, useEffect, useState } from 'react';
import './App.css';
import { getData } from './request';
import Header from './components/header/Header';
import MainBanner from './components/MainBanner/MainBanner';
import AuthorsCard from './components/AuthorsCard';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { DateTime } from 'luxon';
import StaticPage from './components/StaticPage';
import Footer from './components/Footer/Footer';
import RegisterValid from './components/RegisterValid';
import Modal from 'react-modal';
type PostsArrayType = {
  userId: string;
  id: string;
  title: string;
  body: string;
};

type ImagesArrayType = {
  id: string;
  download_url: string;
};

type RandomUsersArrayType = {
  login: {
    uuid: string;
  };
  name: { first: string; last: string };
  location: {
    city: string;
  };
  picture: {
    large: string;
    thumbnail: string;
  };
  registered: {
    date: string;
  };
};

function App() {
  const [posts, setPosts] = useState<Array<PostsArrayType>>([]);
  const [images, setImages] = useState<Array<ImagesArrayType>>([]);
  const [randomUsers, setRandomUsers] = useState<Array<RandomUsersArrayType>>(
    []
  );
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLElement>(
    {
      initial: 0,
      slides: {
        perView: 1,
        origin: 'center',
      },
      loop: true,
      breakpoints: {
        '(min-width: 640px': {
          slides: {
            perView: 2,
            spacing: 10,
          },
        },
        '(min-width: 1024px)': {
          slides: {
            perView: 3,
            spacing: 15,
            origin: 'center',
          },
        },
      },
    },
    []
  );

  const [sliderUsersPostRef, instanceUsersPostRef] = useKeenSlider<HTMLElement>(
    {
      initial: 0,
      slides: {
        perView: 1,
      },
      loop: true,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    []
  );

  useEffect(() => {
    getData().then(({ posts, images, randomUsers }) => {
      setPosts(posts);
      setImages(images);
      setRandomUsers(randomUsers.results);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    instanceRef?.current?.update();
    instanceUsersPostRef?.current?.update();
  }, [randomUsers, instanceRef, instanceUsersPostRef]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div className="App">
      <Header openModal={openModal} />
      <RegisterValid isOpen={modalIsOpen} onRequestClose={closeModal} />
      <MainBanner />
      <section className="bg-myColors-mainBlueBg p-[30px] sm:p-[100px]">
        <h3 className="font-h1 text-5xl text-myColors-yellow mb-5">
          The Authors
        </h3>
        <p className="text-xl text-white mb-16">
          Meet our creative geniuses who keep you at the edge of your seat with
          their captivating articles!
        </p>
        {randomUsers.length && (
          <ul ref={sliderRef} className="keen-slider max-w-[1000px] m-auto">
            {randomUsers.map((user, i) => (
              <li className="keen-slider__slide" key={i}>
                <AuthorsCard
                  variant={i % 2 ? 'rounded-[30px]' : 'rounded-full'}
                  name={user?.name}
                  location={user?.location}
                  picture={user?.picture}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
      <StaticPage />
      <section className="p-8 sm:p-[100px]">
        <ul ref={sliderUsersPostRef} className="keen-slider">
          {posts.map((post) => {
            const image = images[Number(post.id)];
            const author = randomUsers[Number(post.id)];
            const divStyle = {
              backgroundImage: `url(${image?.download_url})`,
            };
            const date = DateTime.fromISO(author?.registered.date);
            return (
              <li key={post.id} className="keen-slider__slide m-h-[675px]">
                <div
                  className="rounded-lg max-w-[1250px] w-full max-h[833px] bg-center bg-cover bg-no-repeat pl-[5%] pr-[5%] pt-[80%] sm:pt-[35%] pb-[5%] relative"
                  style={divStyle}>
                  <div className="absolute top-0 left-0 w-0 h-0 border-solid border-r-black border-b-black border-l-[#2B2B2B] border-t-[#2B2B2B] border-[35px]"></div>
                  <div className="backdrop-blur-sm flex flex-col border-solid border-[0.5px] border-white p-5 gap-5">
                    <p className="text-white text-start">{post.body}</p>
                    <div className="flex gap-4 flex-col items-center sm:flex-row">
                      <div className="grid grid-cols-avatar gap-2 w-fit items-center">
                        <p className="text-white text-xs col-span-full text-left">
                          Written By
                        </p>
                        <img
                          className="rounded-full w-6"
                          src={author?.picture.thumbnail}
                          alt={author?.name.first}
                        />
                        <p className="text-white text-sm">
                          {author?.name.first}
                          {author?.name.last}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 justify-between">
                        <p className="text-white text-xs">Published on</p>
                        <p className="text-white text-sm">
                          {date
                            .setLocale('en')
                            .toLocaleString(DateTime.DATE_FULL)}
                        </p>
                      </div>
                      <a
                        className="p-2 rounded-full border-solid border-2 border-white w-fit text-white h-fit ml-auto"
                        href="##">
                        #startup
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {loaded && instanceUsersPostRef.current && (
          <div className="dots flex p-3 justify-center gap-1">
            {Array.from({
              length: instanceUsersPostRef.current.slides.length,
            }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  instanceUsersPostRef.current?.moveToIdx(idx);
                }}
                className={`dot w-2 h-2 rounded-full p-1 ${
                  currentSlide === idx
                    ? 'active bg-myColors-yellow'
                    : ' bg-[#c5c5c5] '
                }`}></button>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}

export default App;
