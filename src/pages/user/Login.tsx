import { Link } from 'react-router-dom'
import { Logo, KakaoLoginBtn, GoogleLoginBtn } from '@/assets/images'

export default function Login() {
  const handleKakaoBtnClick = () => {
    const url = `${
      import.meta.env.VITE_BACKEND_HOST
    }/api/auth/login/kakao?host=${
      import.meta.env.VITE_CLIENT_HOST
    }&redirectPath=&profilePath=/userinfo`
    window.location.href = url
  }

  const handleGoogleBtnClick = () => {
    const url = `${
      import.meta.env.VITE_BACKEND_HOST
    }/api/auth/login/google?host=${
      import.meta.env.VITE_CLIENT_HOST
    }&redirectPath=&profilePath=/userinfo`
    window.location.href = url
  }

  return (
    <div className='flex flex-col items-center justify-center w-full h-screen gap-y-10'>
      <Link to='/'>
        <img src={Logo} alt={Logo} className='w-[16rem]' />
      </Link>
      <h2 className='text-4xl font-bold smooth-color dark:text-white desktop:text-5xl break-keep text-black-color'>
        Login
      </h2>
      <h4 className='font-bold select-none smooth-color text-size-body break-keep text-black-color dark:text-dark-light-color dark:font-normal'>
        우리의 성장은 함께하는 여정에서 비로소 의미를 찾는다.
      </h4>
      {/* 로그인 버튼 */}
      <div className='flex flex-col items-center w-full smooth-color desktop:gap-y-5 gap-y-3'>
        <button className='rounded-button-radius' onClick={handleKakaoBtnClick}>
          <img
            className='object-cover smooth-color'
            src={KakaoLoginBtn}
            alt='카카오 소셜로그인 버튼'
          />
        </button>
        <button
          onClick={handleGoogleBtnClick}
          className='rounded-button-radius'
        >
          <img
            className='object-cover smooth-color'
            src={GoogleLoginBtn}
            alt='구글 소셜로그인 버튼'
          />
        </button>
        <Link to='/'>
          <p className='underline smooth-color text-black-color dark:text-dark-light-color dark:font-normal'>
            메인 페이지로 이동하기
          </p>
        </Link>
      </div>
      {/* 푸터 */}
      <footer className='flex flex-col items-center font-light border-dark-color w-84 text-size-subbody border-y gap-y-3'>
        <div className='py-2 text-center border-b smooth-color text-black-color dark:text-dark-light-color dark:font-light'>
          로그인하거나 회원으로 가입하시면
          <br />
          당사&nbsp;
          <a
            target='_blank'
            href='https://water-vulcanodon-65c.notion.site/1568078dfbad4bb2899df2b15c22e4ce?pvs=4'
            className='font-bold underline smooth-color text-black-color dark:text-white'
          >
            이용약관
          </a>
          &nbsp;및&nbsp;
          <a
            target='_blank'
            href='https://water-vulcanodon-65c.notion.site/73a58d0b9cac4d43a3ddba5cf7567c15?pvs=4'
            className='font-bold underline smooth-color text-black-color dark:text-white'
          >
            개인정보 보호정책
          </a>
          에 동의하시는 것으로 간주됩니다.
        </div>
        <div className='pb-2 text-center '>
          <p className='smooth-color dark:text-dark-light-color dark:font-light text-black-color'>
            All rights reserved.
            <br />
            Copyright (2015 - 2023) - kdt-sw-7-team05.elicecoding.com™
          </p>
        </div>
      </footer>
    </div>
  )
}
