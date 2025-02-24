import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
function VehicleTable({ vehicles }) {

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const deleteManufacturerMutation = useMutation({
    mutationFn: async (manufacturerId) => {
      const response = await fetch(`https://bunelysiamongodbapi-production.up.railway.app/manufacturers/${manufacturerId}`,
        {
          method: 'DELETE'
        }
      );
      return response.json();

    },
    onSuccess: () => {
      queryClient.invalidateQueries(['vehicleManufacturerData']);
      toast.success("Vehicle Manufacturer Deleted!");
    },
    onError: () => {
      toast.error("Unable to delete record")
    }
  });

  const handleDelete = (manufacturerId) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      deleteManufacturerMutation.mutate(manufacturerId);
    }
  }
  return (
    <>
      <Link className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" to='/admin/vehicles/create'>Add New Vehicle Manufacturer</Link>
      <div className="m-3"><h1 className="text-xl">List of Vehicle Manufacturers</h1></div>
      <table className="w-full border-collapse border border-gray-200 mt-3">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Brand</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Company</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Year Founded</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Founder</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Current CEO</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(vehicle => {
            return (
              <tr key={vehicle._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{vehicle._id}</td>
                <td className="border border-gray-300 px-4 py-2">{vehicle.brand_name}</td>
                <td className="border border-gray-300 px-4 py-2">{vehicle.company_name}</td>
                <td className="border border-gray-300 px-4 py-2">{vehicle.year_founded}</td>
                <td className="border border-gray-300 px-4 py-2">{vehicle.founder}</td>
                <td className="border border-gray-300 px-4 py-2">{vehicle.current_ceo}</td>
                <td className="border border-gray-300 px-4 py-2 text-center space-x-1">
                  <button className="bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600">Details</button>
                  <button className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600" onClick={() => navigate(`/admin/vehicles/${vehicle._id}/edit`)}>Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600" onClick={() => handleDelete(vehicle._id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>

      </table>
      <ToastContainer />
    </>
  );
}

export default VehicleTable;