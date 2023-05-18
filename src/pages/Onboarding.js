import React from "react";

const Onboarding = () => {
	return (
		<div className="flex flex-col items-center justify-around w-screen h-screen bg-hero">
			<div className="flex flex-col items-center ">
				<label className="text-6xl italic font-semibold text-white ">
					join the community,
				</label>
				<label className="text-6xl italic font-semibold text-white ">
					change the future
				</label>
				<p className="mt-6 text-xl text-white"> Get your salaries Sala3ied </p>

				<a href="/mintdao">
					<button className="px-5 py-2 text-xl bg-white text-slate-900 rounded-xl mt-14 ">
						Mint your SBT
					</button>
				</a>
			</div>
		</div>
	);
};
export default Onboarding;
