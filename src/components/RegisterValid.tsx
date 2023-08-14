import {
  faCheck,
  faTimes,
  faInfoCircle,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef, useEffect, FormEvent } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');

type RegisterValidType = {
  isOpen: boolean;
  onRequestClose: () => void;
};

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function RegisterValid(props: RegisterValidType) {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userRef?.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log('result', result);
    console.log('user', user);

    setValidName(result);
    // console.log(result)
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Modal
      style={{
        overlay: {
          backgroundColor: 'rgba(43, 43, 43, 0.7)',
        },
        content: {
          backgroundColor: '#2B2B2B',
          padding: 0,
          height: 'max-content',
        },
      }}
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}>
      <section className="relative flex flex-col p-5 bg-myColors-bgBody gap-5 ">
      <FontAwesomeIcon className='absolute right-1.5 top-1.5 w-8 h-8' onClick={props.onRequestClose} icon={faXmark} style={{color: "#fdc500",}} />
        <p
          ref={userRef}
          className={
            errMsg ? 'errmsg text-red' : 'offscreen absolute opacity-0'
          }
          aria-live="assertive">
          {errMsg}
        </p>
        <div className="flex gap-10">
          <button className="text-white">Sing Up</button>
          <button className="text-white opacity-30">Sing In</button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col max-w-xs">
            <label className="text-white" htmlFor="username">
              Username:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !user ? 'hide' : 'invalid'}
              />
            </label>
            <input
              className="w-full bg-myColors-yellow rounded-full p-2"
              type="text"
              id="username"
              autoComplete="off"
              ref={userRef}
              onChange={(e) => setUser(e.target.value)}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              required
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby="uidnote"
            />
          </div>
          <p
            id="uidnote"
            className={`duration-200 ${
              userFocus && user && !validName ? 'instructions' : 'offscreen'
            }`}>
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
          <div className="flex flex-col max-w-xs">
            <label className="text-white" htmlFor="password">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !pwd ? 'hide' : 'invalid'}
              />
            </label>
            <input
              className="bg-myColors-yellow rounded-full p-2"
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={`duration-200 ${
                pwdFocus && !validPwd ? 'instructions' : 'offscreen'
              }`}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{' '}
              <span aria-label="exclamation mark">!</span>{' '}
              <span aria-label="at symbol">@</span>{' '}
              <span aria-label="hashtag">#</span>{' '}
              <span aria-label="dollar sign">$</span>{' '}
              <span aria-label="percent">%</span>
            </p>
          </div>
          <div className="flex flex-col max-w-xs">
            <label htmlFor="confirm_pwd" className="text-white">
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && matchPwd ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !matchPwd ? 'hide' : 'invalid'}
              />
            </label>
            <input
              className="bg-myColors-yellow rounded-full p-2"
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? 'false' : 'true'}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={`duration-200 ${
                matchFocus && !validMatch ? 'instructions' : 'offscreen'
              }`}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>
          </div>

          <button
            disabled={!validName || !validPwd || !validMatch ? true : false}
            className="text-white w-full bg-myColors-mainBlueBg rounded-full p-2">
            Sing Up
          </button>
        </form>
      </section>
    </Modal>
  );
}

export default RegisterValid;
