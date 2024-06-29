import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
import BookTables from '../components/homes/BookTables';
import BookCards from '../components/homes/BookCards';
function Home() {

      const [books, setBooks] = useState([])
      const [loading, setLoading] = useState(false)
      const [showType, setShowType] = useState('table')

      useEffect(() => {
            setLoading(true)

            axios.get('http://localhost:8000/books')
                  .then((response) => {
                        setBooks(response.data.data)
                        setLoading(false)
                  })
                  .catch((error) => {
                        console.log("catch may error")
                        setLoading(true)
                  })

      }, [])


      return (
            <div className='p-4'>

                  <div className="flex justify-center items-center gap-x-4">
                        <button
                              className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                              onClick={() => setShowType('table')}
                        >
                              TABLE
                        </button>

                        <button
                              className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                              onClick={() => setShowType('card')}
                        >
                              CARD
                        </button>

                  </div>

                  <div className="flex justify-between items-center">
                        <h1 className='text-3xl my-8 '>Book List</h1>
                        <Link to="/books/create">
                              <MdOutlineAddBox className='text-sky-800 text-4xl' />
                        </Link>
                  </div>
                  {loading ? <Spinner /> : showType === 'table' ? <BookTables books={books} /> : <BookCards books={books} />}
            </div>
      )
}

export default Home