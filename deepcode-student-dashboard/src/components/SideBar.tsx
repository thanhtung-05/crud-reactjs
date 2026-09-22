import { IoMdHome } from "react-icons/io";
import { FaBookReader } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { TiGroup } from "react-icons/ti";
const SideBar = () => {
  return (
    <div className="w-64 flex-col h-screen bg-gray-800 text-white p-4">
      <div className='flex items-center mb-4'>
        <IoMdHome className='mr-2' />
        Trang chu</div>
      <div className="flex items-center mb-4">
        <TiGroup className='mr-2' />
        Quan ly sinh vien</div>
      <div className="flex items-center mb-4">
        <FaBookReader className='mr-2' />
        Quan ly khoa hoc</div>
      <div className="flex items-center mb-4">
        <IoIosSettings className='mr-2' />
        Thiet lap</div>

    </div>
  )
}

export default SideBar
//rafce