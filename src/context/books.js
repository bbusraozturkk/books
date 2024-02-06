import { createContext, useState } from "react";
import axios from "axios";

const BooksContext = createContext();

function Provider({children}){

    const [books, setBooks]= useState([]);

    const fetchBooks = async () =>{
    const response = await axios.get('http://localhost:3001/books')
    setBooks(response.data);
    };

    const editBookById = async (id,newTitle) =>{

        const response = await axios.put('http://localhost:3001/books/'+id,{
            title: newTitle
        });
    
     
    
         const updatedBooks = books.map((book)=>{
         if (book.id === id){
            return {...book,...response.data};
         }
         return book;
         });
    
        setBooks(updatedBooks);
    
        };
    
        const deleteBookById = async (id) =>{
    
            await axios.delete('http://localhost:3001/books/'+id);
    
            const updatedBooks = books.filter((book) => { //bir diziden bir nesneyi kaldırmak için filter fonksiyonu kullanılır.
                 return book.id !== id;
            });
            setBooks(updatedBooks);
        };
    
        const createBook = async (title) => { // bu bir handle event ve kullanıcının createBook componentine girdiği başlığı title ile argüman olarak alır
        
          const response = await axios.post('http://localhost:3001/books',{
             title
          });
       
          const updatedBooks = [
         ...books, //mevcut bütün kitapları buraya ekler
         response.data
        ];
        
        setBooks(updatedBooks) //güncellenmiş kitapları alır ve setBooks'a aktararak state'i günceller
    
        console.log('need to add book with:',title);
        };

       const valueToShare = {
        books,
        deleteBookById,
        editBookById,
        createBook,
        fetchBooks
       };

return <BooksContext.Provider value={valueToShare}>{children}</BooksContext.Provider>

};

export {Provider}
export default BooksContext;