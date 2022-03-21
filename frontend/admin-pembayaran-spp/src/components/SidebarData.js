import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';
import * as FcIcons from 'react-icons/fc';
import * as HiIcons from 'react-icons/hi';
import Logout from './Logout';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: 'Managenent',
    path: '#',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Petugas',
        path: '/petugas',
        icon: <BsIcons.BsFillPersonLinesFill/>,
        cName: 'sub-nav'
      },
      {
        title: 'Kelas',
        path: '/kelas',
        icon: <MdIcons.MdClass />,
        cName: 'sub-nav'
      },
      {
        title: 'Spp',
        path: '/spp',
        icon: <FaIcons.FaMoneyCheck />
      },
      {
        title: 'Siswa',
        path: '/siswa',
        icon: <BsIcons.BsFillFileEarmarkPersonFill />
      },
      {
        title: 'Pembayaran',
        path: '/pembayaran',
        icon: <FcIcons.FcMoneyTransfer/>
      }
    ]
  },
  {
    title: 'Laporan',
    path: '/laporan',
    icon: <HiIcons.HiDocumentReport />,
  },
  {
    title: <Logout/>,
    path: '',
    icon: <AiIcons.AiOutlineLogout/>,
  }

];

