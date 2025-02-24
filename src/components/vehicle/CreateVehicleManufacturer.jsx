import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
function CreateVehicleManufacturer() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const queryClient = useQueryClient(); // will be used to invalidate the cache to force a new fetch of updated data
  const navigate = useNavigate(); // will be used to navigate away from the CreateVehicle component when a new  vehicle manufacturer is created

  const createVehicleManufacturerMutation = useMutation({
    mutationFn: async (data) => {
      try{
        const response = await fetch('https://bunelysiamongodbapi-production.up.railway.app/manufacturers',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
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
  })

  return (
    <>
      <div className="m-3"><h2>Creating New Vehicle Manufacturer</h2></div>
      <form onSubmit={handleSubmit(createVehicleManufacturerMutation.mutate)}>
        <div className="mb-5">
          <input {...register('brand_name', { required: 'Title is required' })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2xl p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Brand Name"></input>
          {errors.brand_name && <p className="text-red-500 text-sm mt-1">{errors.brand_name.message}</p>}
        </div>
        <div className="mb-5">
          <input {...register('company_name', { required: 'Company name is required' })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2xl p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Company Name"></input>
          {errors.company_name && <p className="text-red-500 text-sm mt-1">{errors.company_name.message}</p>}
        </div>
        <div className="mb-5">
          <input {...register('year_founded', {
            required: 'Year founded is required', valueAsNumber: true,
            min: { value: 1800, message: 'Year must be equal to or greater than 1800' },
            max: { value: 2025, message: 'Year cannot be greater than current year' }
          })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2xl p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Year Founded"></input>
          {errors.year_founded && <p className="text-red-500 text-sm mt-1">{errors.year_founded.message}</p>}
        </div>
        <div className="mb-5">
          <input {...register('founder', { required: 'Founder is required' })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2xl p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Founder"></input>
          {errors.founder && <p className="text-red-500 text-sm mt-1">{errors.founder.message}</p>}
        </div>
        <div className="mb-5">
          <input {...register('current_ceo', { required: 'Current CEO is required' })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2xl p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Current CEO"></input>
        {errors.current_ceo && <p className="text-red-500 text-sm mt-1">{errors.current_ceo.message}</p>}
        </div>
        <div className="mb-5">
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Create Vehicle Manufacturer</button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default CreateVehicleManufacturer;