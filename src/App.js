import { useState } from 'react';
import './App.css';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function App() {
  const [authorName, setAuthorName] = useState("");
  const [bookName, setBookName] = useState("");
  const [BooksList,setBooksList] = useState([]);
  const [editById,setEditById] = useState({Id : "",AuthorName : "",BookName :"",cond:true});
  const AuthorChange = (e) =>{
    setAuthorName(e.target.value);
    
  }
  const BookChange = (e) =>{
    setBookName(e.target.value);
  }
  const AddBookButton = () =>{
    const BookId = Math.floor(Math.random()*10000);
    const Book = {Id : BookId, AuthorName : authorName, BookName : bookName, cond : true};
    setBooksList([...BooksList,Book]);
  }
  const EditBookButton = (e) =>{
    const id = Number(e.target.id);
    const list = BooksList.find((book)=>book.Id===id);
    setEditById({Id : list.Id,AuthorName : list.AuthorName, BookName : list.BookName,cond : false});
  }
  const SaveBookButton = (e) =>{
    const id = Number(e.target.id);
    const index = BooksList.findIndex((book)=>book.Id===id);
    const list = BooksList;
    setEditById({...editById,cond : true});
    list.splice(index,1,editById);
    setBooksList(list);
  }
  const UpdateChangeBook = (e) =>{
    setEditById({...editById,BookName : e.target.value});
  }
  const UpdateChangeAuthor = (e) =>{
    setEditById({...editById,AuthorName : e.target.value});
  }
  const DeleteBookButton = (e) =>{
    const id = Number(e.target.id);
    const index = BooksList.findIndex((book)=>book.Id===id);
    const list = BooksList;
    setEditById({...editById,cond : true});
    list.splice(index,1);
    setBooksList(list);
  }
  return (
    <div className="App">
      <h1>Book Stall</h1>
      <input type='text' value={authorName} placeholder='Author Name' onChange={AuthorChange}/><br/>
      <input type='text' value={bookName} placeholder='Book Name' onChange={BookChange}/><br/>
      <button onClick={AddBookButton}>Add Book</button>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Author Name</TableCell>
            <TableCell>Book Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {BooksList.map((row) => (
            <TableRow
              key={row.Id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.Id}</TableCell>
              {
                editById.cond ?   <TableCell component="th" scope="row">{row.AuthorName}</TableCell> : row.Id===editById.Id ?
                <TableCell component="th" scope="row"><input type='text' value={editById.AuthorName} onChange={UpdateChangeAuthor}/></TableCell> : 
                <TableCell component="th" scope="row">{row.AuthorName}</TableCell> 
              }
               {
                editById.cond ?   <TableCell component="th" scope="row">{row.BookName}</TableCell> : row.Id===editById.Id ?
                <TableCell component="th" scope="row"><input type='text' value={editById.BookName} onChange={UpdateChangeBook} /></TableCell> : 
                <TableCell component="th" scope="row">{row.BookName}</TableCell> 
              }
              <TableCell component="th" scope="row">
                <Button onClick={EditBookButton} id={row.Id}>Edit</Button>
                <Button onClick={SaveBookButton} id={row.Id}>Save</Button>
                <Button onClick={DeleteBookButton} id={row.Id}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default App;
