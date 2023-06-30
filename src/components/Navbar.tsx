import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 dark:text-white p-4 flex gap-5 w-screen justify-center text-lg backdrop-blur-md backdrop-filter">
      <Link href="/">Home</Link>
      <Link href="/chat">Chat</Link>
    </nav>
  )
}

export default Navbar;