import NoteContext from "./noteContext";

import { useState } from "react";


const NoteState = (props)=>{

    // const s1 = {
    //     "name":"Yuvraj",
    //     "class":"BE Done"
    // }

    // const [state, setState] = useState(s1);

    // const update = ()=>{
    //     setTimeout(() =>{
    //         setState({
    //             "name":"Ankit",
    //             "class":"12 Science Done"
    //         })
    //     }, 2000)
    // }
    const host = "http://localhost:5000";
    const notesInitial = [
        // {
        //     "_id": "666ad02df55032e8d8d0c637",
        //     "User": "66692f9e242c2d1645a4da78",
        //     "title": "Your Title",
        //     "description": "A valid description with at least 5 characters",
        //     "tag": "Optional Tag",
        //     "date": "2024-06-13T10:55:41.709Z",
        //     "__v": 0
        //   }
        
        ]

        const getNotes = async (title,description,tag) => {

          const response =  await fetch(`${host}/notes/fetchallnotes`,{
            method:'GET',
            headers:{
              'Content-Type':'application/json',
              'auth-token': localStorage.getItem('token')
            }
          });
          const json = await response.json();
          console.log(json);
          setNotes(json);
        


        }

        const [notes, setNotes] = useState(notesInitial)

        const addNote = async (title,description,tag) => {

          const response = await fetch(`${host}/notes/addnote`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')   
                    },
            body: JSON.stringify({ title, description, tag })
          });

          const note = await response.json();
          setNotes(notes.concat(note))
          // console.log(json);
      
          

          //api call
          console.log("Adding a new note")

          

        }

        
        const deleteNote = async (id)=>{

          const response = await fetch(`${host}/notes/deletenote/${id}`,{
            method:'DELETE',
            headers:{
              'Content-Type':'application/json',
              'auth-token': localStorage.getItem('token')
            }
      
          });
          const json = await response.json();
          console.log(json);

          console.log("Deleting the note with id" + id);
          const newNotes = notes.filter((note)=>{return note._id!==id})
          setNotes(newNotes)

          
        }

        
        const editNote = async  (id,title,description,tag)=>{

          const response = await fetch(`${host}/notes/updatenote/${id}`,{
            method:'PUT',
            headers:{
              'Content-Type':'application/json',
              'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
          });
          const json = response.json();
          console.log(json);

          
          let newNotes = JSON.parse(JSON.stringify(notes))
          for (let index = 0; index < newNotes.length; index++){
            const element = newNotes[index];
            if(element._id === id){
              newNotes[index].title = title;
              newNotes[index].description = description;
              newNotes[index].tag = tag;
              break;
            }

          }
          console.log(id);
          console.log(newNotes);

          setNotes(newNotes);


          
        }





        

    return (
        // <NoteContext.Provider value={{state:state, update:update}}>
        <NoteContext.Provider  value= {{notes, setNotes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        
         </NoteContext.Provider>


    )
}

export default NoteState;