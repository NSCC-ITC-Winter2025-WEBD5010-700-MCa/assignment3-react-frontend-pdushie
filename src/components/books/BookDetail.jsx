import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";


function BookDetail() {
  const { id } = useParams();
  const { isPending, data, error } = useQuery({
    queryKey: ['book', id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/books/${id}`);
      return response.json();
    }
  });
  console.log(data)




  
  return (
    <>
    <h2 className="text-2xl ">Viewing Details for the Book {data?.title} </h2>
    <table className="w-full border-collapse border border-gray-200 mt-3 mb-3">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Author</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Year</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Genre</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Ratings</th>

          </tr>
        </thead>
        <tbody>
          
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{data?.id}</td>
                <td className="border border-gray-300 px-4 py-2">{data?.title}</td>
                <td className="border border-gray-300 px-4 py-2">{data?.author}</td>
                <td className="border border-gray-300 px-4 py-2">{data?.published_year}</td>
                <td className="border border-gray-300 px-4 py-2">{data?.genre}</td>
                <td className="border border-gray-300 px-4 py-2">{data?.ratings && data.ratings.length > 0 ? data.ratings[0] : 'No ratings'}</td>
              </tr>
        </tbody>

      </table>
      <Link className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
       focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 text-center
       dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" to = '/admin/books'>Go back to Book List</Link>
    </>
    
  );
}

export default BookDetail;