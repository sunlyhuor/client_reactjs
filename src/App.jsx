import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { api } from './api/api'
import axios from "axios"

function App() {

    let [ tableName, setTableName ] = useState()
    let [ fileName, setFileName ] = useState()
    let [ isLoading, setIsLoading ] = useState(false)

    async function uploadToServer(e){
      e.preventDefault()
      if( tableName == undefined ){
        alert("Please Input Table Name after click submit")
      }
      if( fileName == "" ){
        alert("Please Choose excel file after click submit")
      }

      if( tableName && fileName ){
        let form = new FormData()
        form.append("file", fileName)
        form.append("fileName", tableName)
        try{
          setIsLoading(true)
          const res = await axios.post( `${api}/upload/`, form, {
            headers:{
              "Content-Type":"multipart/form-data"
            }
          } )
          alert( res.data )
        }catch(e){
          setIsLoading(true)
          alert("Please review your excel file!")
          setFileName(undefined)
          // console.log( e )
        }finally{
          setIsLoading(false)
        }
      }
    }

  return (
    <>
      <main>
          <h1 className='text-center p-5 text-5xl ' >Convert Exel To Database datas</h1>
          <section className='w-5/12 mx-auto' >
            <form onSubmit={ uploadToServer } className=' flex flex-col gap-[24px] my-[36px]' >  
              <input type="text" name="tableName" value={tableName} id="" onChange={e => setTableName( e.target.value ) } className='border border-2 text-xl p-2' placeholder='Table Name' />
              <input type="file" name="fileName" onChange={e => setFileName( e.target.files[0] )} className='text-xl p-2' accept='.xlsx'  id="" />
              {
                ( !isLoading )?(
                  <button className='p-2 bg-blue-400 text-white' >Submit</button>
                ):(
                  <h1 className='text-center text-3xl p-2' >Loading .....</h1>
                )
              }
            </form>
          </section>
      </main>
    </>
  )
}

export default App
