import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import Dashboard from "./Dashboard"



const Layout = () => {
  return (
    <div className='flex'>
     <Sidebar/>
      <div
        className="grow ml-16 md:ml-64 h-screen lg:h-screen bg-gray-100 text-gray-900
      dark:bg-gray-900 dark:text-white"
      >
        <Navbar />
        <div>
          <Dashboard />
        </div>
      </div>
    </div>
  )
}

export default Layout
