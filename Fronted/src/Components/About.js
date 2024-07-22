// import React, {useContext, useEffect} from 'react'
import React from 'react'
import foto from './book.webp';

// import noteContext from './context/notes/noteContext'

const About = () => {

  // const a = useContext(noteContext) 
  // useEffect(() => {
  //   a.update();
  //    // eslint-disable-next-line
  // }, [])


  return (
    <div>
        <>
        {/* <h1>This is About {a.state.name} and class is {a.state.class}</h1>

     */}
     <div className="d-flex flex-column justify-content-center align-items-center flex-wrap">
  <img src={foto} className="img-fluid mt-4" alt="Notebook" style={{ maxHeight: '350px', width: '100%', height: 'auto' }} />
  <div className="text-center">
    <p>
      A notebook, typically associated with writing and note-taking, can also refer to a portable computer designed for personal use. 
      In the context of a paper notebook, it usually contains lined or blank pages for writing, drawing, and recording information. 
      For a digital notebook, such as those used in programming or data science, it often refers to software like Jupyter Notebook, 
      which allows for the integration of code, text, and visualizations in an interactive document.
    </p>
  </div>
</div>

        </>
      
    </div>
  )
}

export default About
