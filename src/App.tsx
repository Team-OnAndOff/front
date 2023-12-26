import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layouts'
import { Main } from '@/pages/home'
import { Chat } from '@/pages/chat'
import {
  MeetupList,
  Detail,
  RecruitsCreate,
  RecruitsEdit,
  RecruitsRegister,
  WantJoinList,
} from '@/pages/meeting'
import { Login, MyPage } from '@/pages/user'
import NotFound from '@/pages/NotFound'
import { ScrollToTop } from '@/utils'
import { PrivateRouter } from '@/components/common'

export default function App() {
  // 새로고침 시, scroll to top
  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0)
    }
  }, [])
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Layout />}>
            {/* 공통컴포넌트 샘플 */}
            {/* <Route path='/' element={<Example />} /> */}
            <Route path='/' element={<Main />} />
            <Route path='/meetup-lists/:categoryId' element={<MeetupList />} />
            <Route path='/details/:postId' element={<Detail />} />
            <Route element={<PrivateRouter />}>
              <Route path='/userinfo/:userId' element={<MyPage />} />
              <Route path='/recruits-create' element={<RecruitsCreate />} />
              <Route path='/recruits-edit' element={<RecruitsEdit />} />
              <Route path='/want-join/:meetingId' element={<WantJoinList />} />
              <Route
                path='/recruits-register/:postId'
                element={<RecruitsRegister />}
              />
              <Route path='/chat' element={<Chat />} />
            </Route>
            <Route path='/login' element={<Login />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
