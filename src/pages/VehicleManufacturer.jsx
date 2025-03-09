import { useQuery } from "@tanstack/react-query";
import { Outlet, useLocation } from "react-router-dom";
import VehicleTable from "../components/vehicle/VehicleTable";

function VehicleManufacturer() {

  const currentLocation = useLocation();
  //console.log(currentLocation);

  const { isPending, error, data } = useQuery({
    queryKey: ['vehicleManufacturerData'],
    queryFn: async () => {
      console.log('Fetching Vehicle data...');
      const response = await fetch(`${import.meta.env.VITE_VEHICLE_API_URL}`);
      return response.json();
    },
    staleTime: Infinity
  });

  if (error) return <div>{`An error has occurred: + ${error} `}</div>

  return (
    <>
      {currentLocation.pathname === '/admin/vehicles' ?
        isPending ? <div>Loading ...</div> : <VehicleTable vehicles={data} />
        :
        <Outlet />}

    </>

  );
}

export default VehicleManufacturer;