import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import BookForm from "./BookForm";

function BookEdit() {
  const  { id } = useParams();
  const { register, handleSubmit, formState: {errors}, setValue } =  useForm();
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
    }
  });

  const editBookMutation = useMutation({
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/books/${id}`,
        {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        }
      )
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['booksData']);
      navigate('/admin/books');
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
  const processData = (data) => {
    editBookMutation.mutate(data);
  }

  return (
      <div>
        <h2 className="text-2xl mb-5">Editing Book with ID: {data?.id}</h2>
        <BookForm />
      </div>
      
     );
}

export default BookEdit;