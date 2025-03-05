import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";


function BookDetail() {
  const { id } = useParams();
  const { isPending, data, error } = useQuery({
    queryKey: ['book', id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/books/${id}`);
      return response.json();
    }
  });

  const books = data;

  
  return (
    <>
    <h2 className="text-2xl ">Viewing Book Detail for {books?.title} </h2>
    <table className="w-full border-collapse border border-gray-200 mt-3">
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
          {books.map(book => {
            return (
              <tr key={book.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{book.title}</td>
                <td className="border border-gray-300 px-4 py-2">{book.author}</td>
                <td className="border border-gray-300 px-4 py-2">{book.published_year}</td>
                <td className="border border-gray-300 px-4 py-2">{book.genre}</td>
                <td className="border border-gray-300 px-4 py-2">{book.ratings && book.ratings.length > 0 ? book.ratings[0] : 'No ratings'}</td>
              </tr>
            );
          })}
        </tbody>

      </table>
    </>
    
  );
}

export default BookDetail;