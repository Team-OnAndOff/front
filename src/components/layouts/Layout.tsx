import { Outlet } from "react-router-dom";
import { Header, Footer } from '@/components/layouts'


export default function Layout() {
  return <div>
    <Header />
    Layout
    <Outlet />
    <Footer />
  </div>;
}