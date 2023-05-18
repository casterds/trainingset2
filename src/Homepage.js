import React from 'react';
import Framework from '@superfluid-finance/sdk-core';
import Footer from './components/Footer';

const Homepage = () => {
    return ( 
        <div className='flex flex-col items-center justify-center w-screen h-screen text-white bg-hero' >
            <label className='text-5xl font-extrabold text-white' >💸 Salaried.xyz</label>
            <label className='mt-2 mb-10 text-xl font-medium' >Payment Streams tooling for web3 Organizations</label>
            <div className='flex flex-row w-[60%] h-fit justify-between mt-10' >
                <div className='flex flex-col w-[30%] h-full p-4 border-2 border-opacity-20 rounded-xl border-white' >
                    <p className='mb-3 text-xl font-semibold'>Batch Transactions 📦</p>
                    <p>Wrap up transactions of 50 members over 12 months into a single transaction and start streaming</p>
                </div>
                <div className='flex flex-col w-[30%] h-full p-4 border-2 border-opacity-20 rounded-xl border-white' >
                    <p className='mb-3 text-xl font-semibold'>Under-collateral Loans 🤝</p>
                    <p>Payment stream recepients enjoy P2P undercollateral lending based on their streaming amount</p>
                </div>
                <div className='flex flex-col w-[30%] h-full p-4 border-2 border-opacity-20 rounded-xl border-white' >
                    <p className='mb-3 text-xl font-semibold'>Editable Rates ⬆⬇</p>
                    <p>Change your streaming rates the way you like. Pay yourself per days, weeks or months</p>
                </div>
            </div>
                <p className='text-2xl font-bold mt-14' >Get Started with Streaming</p>
                <div className='flex flex-row mt-5 h-fit w-fit'  >
                    <a href='/Onboarding' ><button className='p-3 text-xl font-medium bg-white rounded-full text-slate-900' >Onboard as Organization 🌐</button></a>
                    <a href='/individual' ><button className='p-3 ml-4 text-xl font-medium bg-white rounded-full text-slate-900' >Onboard as an Individual 👤 </button></a>
                </div>
            <Footer/>
        </div>  
     );
}
 
export default Homepage;