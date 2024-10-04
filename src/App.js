import { useState } from 'react';
import './App.css';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function App() {
  const [authorName, setAuthorName] = useState("");
  const [bookName, setBookName] = useState("");
  const [BooksList,setBooksList] = useState([]);
  const AuthorChange = (e) =>{
    setAuthorName(e.target.value);
    
  }
  const BookChange = (e) =>{
    setBookName(e.target.value);
  }
  const AddBookButton = () =>{
    const BookId = Math.floor(Math.random()*10000);
    const Book = {Id : BookId, AuthorName : authorName, BookName : bookName};
    setBooksList([...BooksList,Book]);
    console.log(BooksList);
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
              <TableCell component="th" scope="row">{row.AuthorName}</TableCell>
              <TableCell component="th" scope="row">{row.BookName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default App;
