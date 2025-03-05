import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import BookForm from "./BookForm";
import { ToastContainer, toast } from "react-toastify";

function BookEdit() {
  const  { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {isPending, error, data} = useQuery({
    queryKey: ['books', id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/books/${id}`);
      return response.json()
    },
    onSuccess: (bookData) => {
      console.log(bookData)
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const editBookMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`http://localhost:3000/books/${id}`,
        {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        }
      )
      console.log("Runnnn")
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['booksData']);
      toast.success("Book Updated");
      setTimeout(()=>{
        navigate('/admin/books');
      }, 1500)
    }
  })

  const processData = (data) => {
    editBookMutation.mutate(data);
  }

  return (
      <div>
        <h2 className="text-2xl mb-5">Editing Book with ID: {data?.id}</h2>
        <BookForm onDataCollected={processData} initialData={data}/>
        <ToastContainer />
      </div>
      
     );
}

export default BookEdit;