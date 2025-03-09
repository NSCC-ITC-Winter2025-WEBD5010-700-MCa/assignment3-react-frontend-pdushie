import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import VehicleManufacturerForm from "./VehicleManufacturerForm";

function CreateVehicleManufacturer() {

  const queryClient = useQueryClient(); // will be used to invalidate the cache to force a new fetch of updated data
  const navigate = useNavigate(); // will be used to navigate away from the CreateVehicle component when a new  vehicle manufacturer is created

  const createVehicleManufacturerMutation = useMutation({
    mutationFn: async (data) => {
      try{
        const response = await fetch(`${import.meta.env.VITE_VEHICLE_API_URL}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
          console.log("Data being sent POST", JSON.stringify(data))
          // solves the problem of the onError block not triggering
          if (!response.ok){
            throw err;
          }
        console.log(response.status)
        return response.json();
      } catch(err){
        //console.log("An error occured",err);
        throw err;
      }
      
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['vehicleManufacturerData']);
      toast.success("Vehicle Manufacturer Created!");
      setTimeout(() => navigate('/admin/vehicles'), 2500); // navigate to the /admin/vehicle route after 2.5 seconds

    },
    onError: (err) => {
      console.log(err)
      toast.error("An error occured creating vehicle manufacturer")
    }
  });

  const processData = (data) => {
    createVehicleManufacturerMutation.mutate(data);
  }

  return (
    <>
      <div className="m-3"><h2>Creating New Vehicle Manufacturer</h2></div>
      <VehicleManufacturerForm onDataCollected={processData} />
      <ToastContainer />
    </>
  );
}

export default CreateVehicleManufacturer;