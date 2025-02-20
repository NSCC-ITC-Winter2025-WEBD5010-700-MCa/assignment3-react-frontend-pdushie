import { useQuery } from "@tanstack/react-query";
import BooksTable from "../components/BooksTable";
const Books = () => {

  const { isPending, error, data } = useQuery({
    queryKey: ['booksData'],
    queryFn: async () => {
      console.log('Fetching data')
      const response = await fetch('http://localhost:3000/books');
      return response.json()
      //return Promise.regect //simulates failed fetch
    },
    staleTime: Infinity
  })
  

  if (error) return <div>{`An error has occured: + ${error.message}`}</div>
  
return (
  <div>
    <h1 className="text-2xl font-bold">Books</h1>
    {
      isPending ? <div>Loading...</div> : <BooksTable books={data} />
    }
  </div>
);
  //return <BooksTable tableData={books}/>
};
export default Books;