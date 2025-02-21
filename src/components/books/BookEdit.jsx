import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

function BookEdit() {
  const  { id } = useParams();
  const { register, handleSubmit, formState: {errors}, setValue } =  useForm();

  const {isPending, error, data} = useQuery({
    queryKey: ['books', id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/books/${id}`);
      return response.json()
    },
    onSuccess: (bookData) => {
      console.log(bookData)
    }
  })

  useEffect(() => {
    console.log(data)
    // pre-populate the form
    if(data){
      setValue('title', data.title)
      setValue('author', data.author)
      setValue('published_year', data.published_year)
      setValue('genre', data.genre)
    }
  }, [data])
  return (
      <div>
        <h2 className="text-2xl mb-5">Editing Book with ID: {data?.id}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
          <input {...register('title', {required: 'Title is required'})} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2xl p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Title"></input>
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>
          <div className="mb-5">
          <input {...register('author', {required: true})} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2xl p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Author"></input>
          {errors.author && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>
          <div className="mb-5">
          <input {...register('published_year', {required: true, valueAsNumber: true, min: {value: 1700, message: 'Year must be greater than 1700'}})} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2xl p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Year"></input>
          </div>
          <div className="mb-5">
          <input {...register('genre', {required: true})} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2xl p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Genre"></input>
          </div>
          <div className="mb-5">
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Update Book</button>
          </div>
      </form>
      </div>
      
     );
}

export default BookEdit;