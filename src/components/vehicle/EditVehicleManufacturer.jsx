import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import VehicleManufacturerForm from "./VehicleManufacturerForm";

function EditVehicleManufacturer() {

  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending, error, data, status } = useQuery({
    queryKey: ['vehicleManufacturerData', id],
    queryFn: async () => {
      console.log("Fetching vehicle manufacturer data for edit...")
      const response = await fetch(`${import.meta.env.VITE_VEHICLE_API_URL}/${id}`,
        {
          method: 'GET'
        }
      );
      return response.json();
    }
  });

  const editVehicleManufacturerMutation = useMutation({
    mutationFn: async (data)=> {
      const response = await fetch(`${import.meta.env.VITE_VEHICLE_API_URL}/${id}`,
          {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
          }
        );

        console.log("Data being sent", JSON.stringify(data));
        console.log(response);
        return response.json();
},
onSuccess: () => {
  queryClient.invalidateQueries(['vehicleData']);
  toast.success("Vehicle Manufacturer Updated");
  setTimeout(() => navigate('/admin/vehicles'), 2000);
},
onError: (error) => {
  console.error("Error updating vehicle manufacturer:", error);
  toast.error("An error occured updating vehicle manufacturer")
}
});

const processData = (data) => {
  editVehicleManufacturerMutation.mutate(data);
}

  return (
    <>
      <h1 className="text-2xl mb-5">Editng Vehicle Manufacturer with ID: {id}</h1>
      <VehicleManufacturerForm onDataCollected={processData} initialData={data}/>
    <ToastContainer />
    </>


  );
}

export default EditVehicleManufacturer;