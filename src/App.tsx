import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layouts";
import { Main } from "@/pages/home";
import { Chat } from "@/pages/chat";
import { Crew, Challenge, Detail, RecruitsCreate, RecruitsEdit, RecruitsRegister } from "@/pages/meeting";
import { Login, MyPage } from "@/pages/user";
import NotFound from "@/pages/NotFound";

export default function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>

          <Route path='/' element={<Main />} />
          <Route path='/crews/:categoryId' element={<Crew />} />
          <Route path='/challenges/:categoryId' element={<Challenge />} />
          <Route path='/details/:postId' element={<Detail />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/recruits-create' element={<RecruitsCreate />} />
          <Route path='/recruits-edit' element={<RecruitsEdit />} />
          <Route path='/recruits-register/:postId' element={<RecruitsRegister />} />
          <Route path='/login' element={<Login />} />
          <Route path='/chat' element={<Chat />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </>;
}
