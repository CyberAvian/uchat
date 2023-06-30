import { type PropsWithChildren } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  )
}

export default Layout;