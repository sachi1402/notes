
import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
function App() {
  const url = 'http://localhost:3000/Notes'
  const [Notes, setNotes] = useState(null);
  
  const [formData, setFormData] = useState({
    input1: '',
    textarea1: '',
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    axios.get(url).then(res=>{
      // console.log(res.data)
      setNotes(res.data)
    }).catch(err => console.log('server unreachable '+err))
  }, []);

  let postnotes=(title,contant)=>{
    axios.post(url,{title,contant}).then(res => setNotes(e=>[...e,res.data[0]]))
    
  };
  let deletenote=(id)=>{
    // console.log(id)
    const data = {
      "id": id
    }
    console.log(data)
    axios.delete(url,{data}).then(res => setNotes([...res.data]))
  
  }
  return (
  
    <div className="App">
      <header className="Header"> <h1 className="title">NOTES</h1> </header>
      <div className="form_cont">
      <form>
      <div className="form_input contaner ">
        <div className='titlipbar'>
        <input
          type="text"
          id="input1"
          name="input1"
          maxLength="250"
          placeholder='Title of notes'
          value={formData.input1}
          onChange={handleInputChange}
        />
          <button  className='addbtn'type="submit" value="Submit" onClick={()=>postnotes( formData.input1, formData.textarea1)}>+</button>
          </div>
        <textarea
          id="textarea1"
          name="textarea1"
          placeholder='content...'
          value={formData.textarea1}
          onChange={handleInputChange}
        />
      </div>
    </form>
      </div>
      <div className="Notes_contaner">
      {
        Notes? Notes.map(note =>{
          return <div className="notes_item" key= {note.id}>
            <h4>{note.title}</h4>
            <p>{note.content}</p>
            <button onClick={()=>deletenote(note.id)}>del</button>

          </div>
        }):<div>wait</div>
      }
      </div>
    </div>
  );
}

export default App;
