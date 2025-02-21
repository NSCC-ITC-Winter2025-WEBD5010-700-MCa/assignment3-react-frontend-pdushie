import { useQuery } from "@tanstack/react-query";
function VehicleManufacturer() {

  const { isPending, error, data: vehicles } = useQuery({
    queryKey: ['vehicleData'],
    queryFn: async () => {
      console.log('Fetching Vehicle data...');
      const response = await fetch('http://localhost:4000/manufacturers');
      return response.json();
    }
  });

  if (error) return <div>{`An error has occurred: + ${error} `}</div>

  return (
    <>
      <h1 className="text-xl">Vehicle Manufacturer Page</h1>
      {isPending ? <div>Loading ...</div> :
        <div>{vehicles.map(vehicle => {
          return <li key={vehicle?._id}>{vehicle?.brand_name}</li>
        })}</div>}
    </>

  );
}

export default VehicleManufacturer;