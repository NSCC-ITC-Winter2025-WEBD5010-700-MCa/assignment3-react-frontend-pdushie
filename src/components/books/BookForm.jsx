import { useForm } from 'react-hook-form';


export default function BookForm({ onDataCollected }) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    
    return (<>
        <form onSubmit={handleSubmit(onDataCollected)}>
            <div className="mb-5">
                <input {...register('title', { required: 'Title is required' })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2xl p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Title"></input>
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>
            <div className="mb-5">
                <input {...register('author', { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2xl p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Author"></input>
                {errors.author && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>
            <div className="mb-5">
                <input {...register('published_year', { required: true, valueAsNumber: true, min: { value: 1700, message: 'Year must be greater than 1700' } })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2xl p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Year"></input>
            </div>
            <div className="mb-5">
                <input {...register('genre', { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2xl p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Genre"></input>
            </div>
            <div className="mb-5">
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Create Book</button>
            </div>
        </form>
    </>
    )
}