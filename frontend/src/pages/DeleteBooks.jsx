
import React, { useState } from "react"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { Link } from "react-router-dom"
import { useSnackbar } from "notistack"

function DeleteBooks() {

      const [loading, setLoading] = useState(false)
      const navigate = useNavigate();
      const { id } = useParams();

      const { enqueueSnackbar } = useSnackbar()
      const handleDeleteBook = () => {
            setLoading(true)
            axios.delete(`http://localhost:8000/books/${id}`)
                  .then(() => {
                        setLoading(false)
                        enqueueSnackbar('Book Deleted Successfully', { variant: 'success' })
                        navigate('/')
                  })
                  .catch((error) => {
                        setLoading(false)
                        console.log(error)
                        enqueueSnackbar('Some Error Happened', { variant: 'error' })
                  })
      }

      return (
            <div className=" p-4">
                  <BackButton />
                  <h1 className="text-3xl my-4">Delete Book</h1>
                  {
                        loading ? <Spinner /> : ''
                  }
                  <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
                        <h3 className="text-2xl">Are you sure you want to delete this book?
                              <button className="p-4 bg-red-600 text-white m-8" onClick={handleDeleteBook}>
                                    Yes, I Delete it
                              </button>

                              <Link to='/' >
                                    <button className="p-4 bg-gray-600 text-white m-8" >
                                          No, Daddy
                                    </button>
                              </Link>
                        </h3>
                  </div>
            </div>
      )
}

export default DeleteBooks