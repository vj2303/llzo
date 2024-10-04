import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const Sidebar = ({ onSelect }) => {
  const [services, setServices] = useState([])

  const fetchServices = async() => {
    try {
      const res = await axios({
        method: "post",
        baseURL: `${process.env.NEXT_PUBLIC_TEST_HOST}/api/v1`,
        url: "/salon/details",
        params: {
          // main_category_id: 18,
          salon_id: 811
        }
      })
      setServices(res.data.sub_categories.services)
    } catch (error) {
      console.log(error);
      alert("Could not fetch services")
    }
  }

  useEffect(()=>{
    fetchServices()
  }, [])


  return (
    <div className="w-1/4 bg-gray-100 border-r-4 border-r-gray-200">
      {services.map((service) => (
        <div key={service.name} className="mb-2 flex">
          <button
            onClick={() => onSelect(service.name)}
            className="flex text-[12px] text-center flex-col items-center w-full rounded hover:bg-gray-200"
          >
            <Image src={service.image_url} alt="logo icon" width="50" height="50" className="rounded-full" />

            <div className=" text-[12px] text-center sm:text-[18px]">{service.name} <span className="sm:text-[18px] text-center">({service.count})</span>  </div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;