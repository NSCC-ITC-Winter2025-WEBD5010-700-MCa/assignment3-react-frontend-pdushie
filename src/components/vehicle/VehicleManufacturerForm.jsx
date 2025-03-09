import { useForm } from "react-hook-form";
import { useEffect } from "react";

function VehicleManufacturerForm({onDataCollected, initialData}) {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const collectData = (data) => {
    onDataCollected(data);
  };

  useEffect(() => {
    if (initialData) {
      setValue('brand_name', initialData.brand_name)
      setValue('company_name', initialData.company_name)
      setValue('year_founded', initialData.year_founded)
      setValue('founder', initialData.founder)
      setValue('current_ceo', initialData.current_ceo)
    }
    console.log('Fetched data', initialData)
  }, [initialData]);

  return (
    <>
    <form onSubmit={handleSubmit(collectData)}>
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
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Submit Vehicle Manufacturer</button>
        </div>
      </form>
    </>
  );
}
export default VehicleManufacturerForm;