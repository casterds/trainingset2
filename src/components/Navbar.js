import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {
    return ( 
        <div className='flex flex-row justify-between w-screen p-4 h-fit bg-hero' >
            <p className='text-2xl font-bold text-white'>💸 Sala3ied </p>
            <ConnectButton/>
        </div>
     );
}
 
export default Navbar;