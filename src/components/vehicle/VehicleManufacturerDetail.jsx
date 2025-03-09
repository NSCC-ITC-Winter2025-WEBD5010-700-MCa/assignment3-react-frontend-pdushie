import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

function VehicleManufacturerDetail() {

  const { id } = useParams();
  const { isPending, data, error} = useQuery({
    queryKey: ['vehicleManufacturer', id],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_VEHICLE_API_URL}/${id}`);
      return response.json();
    }
  });

  return (
    <>
    <h2 className="text-2xl">Viewing Details of {data?.company_name}</h2>
    <table className="w-[70%] border-collapse border border-gray-200 mt-3 mb-3">
            <tr className="hover:bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <td className="border border-gray-300 px-4 py-2">{data?._id}</td>
            </tr>
            <tr className="hover:bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Brand Name</th>
            <td className="border border-gray-300 px-4 py-2">{data?.brand_name}</td>
            </tr>
            <tr className="hover:bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Company Name</th>
            <td className="border border-gray-300 px-4 py-2">{data?.company_name}</td>
            </tr>
            <tr className="hover:bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Year Founded</th>
            <td className="border border-gray-300 px-4 py-2">{data?.year_founded}</td>
            </tr>
            <tr className="hover:bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Founder</th>
            <td className="border border-gray-300 px-4 py-2">{data?.founder}</td>
            </tr>
            <tr className="hover:bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Founder's Birth Year</th>
            <td className="border border-gray-300 px-4 py-2">{data?.birth_year}</td>
            </tr>
            <tr className="hover:bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Current CEO</th>
            <td className="border border-gray-300 px-4 py-2">{data?.current_ceo}</td>
            </tr>
            <tr className="hover:bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Currency</th>
            <td className="border border-gray-300 px-4 py-2">{data?.estimated_worth_currency}</td>
            </tr>
            <tr className="hover:bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Company's Estimated Worth</th>
            <td className="border border-gray-300 px-4 py-2">{data?.estimated_worth}</td>
            </tr>
      </table>
      <Link className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
       focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 text-center
       dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" to = '/admin/vehicles'>Go back to Vehicle Manufacturers List</Link>
    </>
  );
}

export default VehicleManufacturerDetail;