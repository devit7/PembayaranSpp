import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';



export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
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
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Kelas',
        path: '/kelas',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Spp',
        path: '/spp',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Siswa',
        path: '/siswa',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Pembayaran',
        path: '/pembayaran',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Messages',
    path:"/",
    icon: <FaIcons.FaEnvelopeOpenText />,
  }

];

