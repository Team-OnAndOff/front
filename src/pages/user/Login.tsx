import Logo from '@/assets/images/Logo.svg'
import kakao_login_btn from '@/assets/images/kakao_login_btn.png'
import google_login_btn from '@/assets/images/google_login_btn.png'
//import { useLocation } from 'react-router-dom'

export default function Login() {
  /* Header에서 로그인 탭을 눌러서 로그인 페이지로 왔을시에 로그인 페이지 오기전
    url을 넘겨주게 설정하려하는데 이렇게 하면 url으로 직접 로그인 페이지로 왔을때는
    값이 undefined라서 어떻게 처리해야할지 고민중....
  */
  // const location = useLocation()
  // const redirectPath = location.state.path
  // console.log(redirectPath)
  const handleKakaoBtnClick = () => {
    /*url을 
    `${
      import.meta.env.VITE_BACKEND_HOST
    }/api/auth/login/kakao?host=http://localhost:5173/&redirectPath=/details/1&profilePath=/userinfo/
    이런식으로 변경 예정 
    신규 회원이라면 서버에서 redirectPath(로그인한 이전 페이지)는 무시하고 /userinfo/:userId에 해당하게 이동.
    기존에 로그인한 회원이라면 redirectPath로 이동하게 설정 예정 
    */
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
    <div className='flex flex-col items-center justify-center w-full h-full gap-y-10'>
      <img src={Logo} alt={Logo} className='w-[16rem]' />
      <h2 className='text-4xl font-bold transition-all duration-1000 ease-in-out desktop:text-5xl break-keep text-black-color'>
        Login
      </h2>
      <h4 className='font-bold select-none text-size-body break-keep text-black-color'>
        우리의 성장은 함께하는 여정에서 비로소 의미를 찾는다.
      </h4>

      {/* 로그인 버튼 */}
      <div className='flex flex-col items-center w-full mt-10 transition-all duration-1000 ease-in-out desktop:gap-y-5 gap-y-3'>
        <button className='rounded-button-radius' onClick={handleKakaoBtnClick}>
          <img
            className='object-cover transition-all duration-1000 ease-in-out'
            src={kakao_login_btn}
            alt={kakao_login_btn}
          />
        </button>
        <button
          onClick={handleGoogleBtnClick}
          className='rounded-button-radius'
        >
          <img
            className='object-cover transition-all duration-1000 ease-in-out'
            src={google_login_btn}
            alt={google_login_btn}
          />
        </button>
      </div>

      {/* 푸터 */}
      <footer className='flex flex-col items-center font-light border-dark-color w-80 text-size-subbody border-y gap-y-3'>
        <div className='py-2 text-center border-b'>
          로그인하거나 회원으로 가입하시면 당사
          <a
            target='_blank'
            href='https://water-vulcanodon-65c.notion.site/1568078dfbad4bb2899df2b15c22e4ce?pvs=4'
            className='font-bold underline'
          >
            &nbsp;이용약관
          </a>
          &nbsp;및
          <a
            target='_blank'
            href='https://water-vulcanodon-65c.notion.site/73a58d0b9cac4d43a3ddba5cf7567c15?pvs=4'
            className='font-bold underline'
          >
            &nbsp;개인정보 보호정책
          </a>
          에 동의하시는 것으로 간주됩니다.
        </div>
        <div className='pb-2 text-center'>
          <p>
            All rights reserved.
            <br />
            Copyright (2015 - 2023) - ONandOFF.com™
          </p>
        </div>
      </footer>
    </div>
  )
}
