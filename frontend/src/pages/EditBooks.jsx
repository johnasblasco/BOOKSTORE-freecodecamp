
import React, { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useSnackbar } from "notistack"
const EditBooks = () => {

      const [title, setTitle] = useState('');
      const [author, setAuthor] = useState('');
      const [publishYear, setPublishYear] = useState('');
      const [loading, setLoading] = useState(false);

      const { enqueueSnackbar } = useSnackbar();

      const navigate = useNavigate();
      const { id } = useParams()

      useEffect(() => {
            setLoading(true)
            axios.get(`http://localhost:8000/books/${id}`)
                  .then((response) => {
                        console.log(response.data.data.publishYear)
                        setTitle(response.data.data.title)
                        setAuthor(response.data.data.author)
                        setPublishYear(response.data.data.publishYear)
                        setLoading(false)
                  })
                  .catch((error) => {
                        setLoading(false)
                        alert("An error happened")
                        console.log(error)
                  })
      }, [])

      const handleEditBook = () => {
            const data = {
                  title,
                  author,
                  publishYear,
            }
            setLoading(true);
            axios.put(`http://localhost:8000/books/${id}`, data)
                  .then(() => {
                        setLoading(false);
                        enqueueSnackbar('Book Updated Successfully', { variant: 'success' })
                        navigate('/');
                  })
                  .catch((error) => {
                        setLoading(false)
                        enqueueSnackbar('Some Error Happened', { variant: 'error' })
                        console.log(error)
                  })
      }



      return (
            <div className="p-4">
                  <BackButton />

                  <h1 className="text-3xl my-4">Edit Book</h1>
                  {loading ? <Spinner /> : ''}
                  <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                        <div className="my-4">
                              <label htmlFor="title" className="text-xl mr-4 text-gray-500">Title</label>
                              <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="border-2 border-gray-500 px-4 py-2 w-full"
                              />
                        </div>

                        <div className="my-4">
                              <label htmlFor="author" className="text-xl mr-4 text-gray-500">Author</label>
                              <input
                                    type="text"
                                    id="author"
                                    onChange={(e) => setAuthor(e.target.value)}
                                    value={author}
                                    className="border-2 border-gray-500 px-4 py-2 w-full"
                              />
                        </div>

                        <div className="my-4">
                              <label htmlFor="pekpek" className="text-xl mr-4 text-gray-500">Publish Year</label>
                              <input
                                    type="number"
                                    id="pekpek"
                                    value={publishYear}
                                    onChange={(e) => setPublishYear(e.target.value)}
                                    className="border-2 border-gray-500 px-4 py-2 w-full"
                              />
                        </div>

                        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
                              SAVE
                        </button>

                  </div>

            </div>
      )
}

export default EditBooks