import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function EditVehicleManufacturer() {

  const { id } = useParams();
  const { handleSubmit, register, setValue } = useForm();
  const { isPending, error, data, status } = useQuery({
    queryKey: ['vehicleManufacturerData', id],
    queryFn: async () => {
      console.log("Fetching vehicle manufacturer data for edit...")
      const response = await fetch(`https://bunelysiamongodbapi-production.up.railway.app/manufacturers/${id}`,
        {
          method: 'GET'
        }
      );

      return response.json();
    }
  });

  useEffect(() => {
    if (data) {
      setValue('brand_name', data.brand_name)
      setValue('company_name', data.company_name)
      setValue('year_founded', data.year_founded)
      setValue('founder', data.founder)
      setValue('current_ceo', data.current_ceo)
    }
    console.log('Fetched data', data)
  }, [data])

  return (
    <>
      <h1 className="text-2xl mb-5">Editng Vehicle Manufacturer with ID: {id}</h1>
      <form >
        <div className="mb-5">
          <input {...register('brand_name')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2xl p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Brand Name"></input>
      </div>
      <div className="mb-5">
        <input {...register('company_name')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2xl p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Company Name"></input>
      </div>
      <div className="mb-5">
        <input {...register('year_founded')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2xl p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Year Founded"></input>
      </div>
      <div className="mb-5">
        <input {...register('founder')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2xl p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Founder"></input>
      </div>
      <div className="mb-5">
        <input {...register('current_ceo')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2xl p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Current CEO"></input>
      </div>
      <div className="mb-5">
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Update Vehicle Manufacturer</button>
      </div>
    </form >
    </>


  );
}

export default EditVehicleManufacturer;