import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { MdLocalGasStation } from "react-icons/md";
import { RiMailSendFill } from "react-icons/ri";

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row w-4/5 justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-md hover:shadow-gray-400 hover:-translate-y-1 transition ease-in-out">
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color} border-4 border-slate-500/50`}>
      {icon}
    </div>
  
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">
        {title}
      </h3>

      <p className="mt-1 text-white text-sm md:w-4/5">
        {subtitle}
      </p>
    </div>
  </div>
);

const Services = () => (
  <section id="services">
    <div className="flex w-full justify-center items-center gradient-bg-services">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
        <div className="flex-1 flex flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
            Services that we
            <br/>
            offer and continue to improve
          </h1>

          <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
            The best choice for transporting your ethereum, with our
            complicated and secure smart contract
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-start items-center">
          <ServiceCard
            color="bg-[#2952E3]"
            title="Security gurantee"
            icon={<BsShieldFillCheck fontSize={21} className="text-white"/>}
            subtitle="Security is guranteed. We always maintain your privacy and keep your information safe"
          />

          <ServiceCard
            color="bg-[#8945F8]"
            title="Low Gas Fees"
            icon={<MdLocalGasStation fontSize={21} className="text-white"/>}
            subtitle="Your gas are as low as possible. We use special techniques to keep gas fees to a minimum"
          />

          <ServiceCard
            color="bg-[#F84550]"
            title="Fastest transactions"
            icon={<RiMailSendFill fontSize={21} className="text-white"/>}
            subtitle="Speedy delivery is assured. We use an optimized server and smart contract to accelerate transactions"
          />
        </div>
      </div>
    </div>
  </section>
);

export default Services;