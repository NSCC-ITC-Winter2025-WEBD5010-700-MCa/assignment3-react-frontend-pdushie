import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import BookForm from "./BookForm";

function BookCreate () {

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const collectData = (data) => {
    console.log(errors)
  }

  const createBookMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch('http://localhost:3000/books', {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(data)
      })
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['booksData']);
      toast.success("Book Created");
      setTimeout(()=>{
        navigate('/admin/books');
      }, 3000)
      
    }
  })

  return (
    <div>
      <h2>Create New Book</h2>
      <BookForm />
    <ToastContainer />
    </div>
    
   );
}

export default BookCreate;