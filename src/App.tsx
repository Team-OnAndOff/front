import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout, AdminLayout } from '@/components/layouts'
import { Main } from '@/pages/home'
import { Chat } from '@/pages/chat'
import {
  MeetupList,
  Detail,
  RecruitsCreate,
  RecruitsEdit,
  RecruitsRegister,
} from '@/pages/meeting'
import { Login, MyPage } from '@/pages/user'
import NotFound from '@/pages/NotFound'
import {
  AdminLogin,
  AdminComplaint,
  AdminCategory,
  AdminEvent,
  AdminUser,
} from './pages/admin'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            {/* 공통컴포넌트 샘플 */}
            {/* <Route path='/' element={<Example />} /> */}
            <Route path='/' element={<Main />} />
            <Route path='/meetup-lists/:categoryId' element={<MeetupList />} />
            <Route path='/details/:postId' element={<Detail />} />
            <Route path='/userinfo/:userId' element={<MyPage />} />
            <Route path='/recruits-create' element={<RecruitsCreate />} />
            <Route path='/recruits-edit' element={<RecruitsEdit />} />
            <Route
              path='/recruits-register/:postId'
              element={<RecruitsRegister />}
            />
            <Route path='/login' element={<Login />} />
            <Route path='/chat' element={<Chat />} />
          </Route>

          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin' element={<AdminLayout />}>
            <Route path='users' element={<AdminUser />} />
            <Route path='events' element={<AdminEvent />} />
            <Route path='complaints' element={<AdminComplaint />} />
            <Route path='categories' element={<AdminCategory />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
