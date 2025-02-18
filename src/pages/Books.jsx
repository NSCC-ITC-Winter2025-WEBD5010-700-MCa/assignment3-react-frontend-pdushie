//import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BooksTable from "../components/BooksTable";
const Books = () => {

  const { isPending, error, data: books } = useQuery({
    queryKey: ['booksData'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/books');
      return response.json()
      //return Promise.regect //simulates failed fetch
    },
    staleTime: Infinity
  })

  if (isPending) return <div>Loading...</div>;

  //if (error) return <div>{`An error has occured: + ${error.message}`}</div>
  //const [number, setNumber] = useState(0);
  //const [books, setBooks] = useState([]);

  // useEffect(()=>{
  //   console.log("Hello from useEffect");
  // }, [number]);

  // useEffect(()=>{

  //   const fetchData = async ()=> {
  //     const response = await fetch('http://localhost:3000/books');
  //     const data = await response.json();
  //     console.log(data);
  //     setBooks(data);
  //   }

  //   fetchData()

  // },[])

  return <BooksTable tableData={books}/>
};
export default Books;