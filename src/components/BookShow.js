import { useState, useContext } from "react";
import BooksContext from "../context/books";
import BookEdit from "./BookEdit"

function BookShow ({book}){ 

const [showEdit, setShowEdit] = useState(false); // başlangıçta düzenleme formunu görüntülemek istemediğim için default olarak false yazdım

const {deleteBookById} = useContext(BooksContext)

const handleDeleteClick = () => { //kullanıcı buttona her tıkladığında silme işlemini çağırıyoruz.
deleteBookById(book.id); //silmek istediğimiz book id'sini aktaracağız. book propsunda silmek istediğimiz kitabın idsi var
};

const handleEditClick = () => {
setShowEdit(!showEdit); //showedit ne ise tersine çevir
};

const handleSubmit = () =>{
setShowEdit(false);

};
    
    let content = <h3>{book.title}</h3>; //content adında bir değişken oluşturuyoruz. let anahtar sözcüğü de bu değişkeni zaman içinde değiştirmemizi sağlayacak. daha sonra default olarak book.title'ı gösterecek    
    
    if(showEdit){ //daha sonra showedit doğru ise contentin değerini güncelleyeceğiz
    content = <BookEdit onSubmit={handleSubmit}  book={book}/>; //edit yaparken form sayfasında default olarak kitabın ismi gelsin diye book ={book} yazdık
    }

    return <div className="book-show">
        <img alt="books" src={`https://picsum.photos/seed/${book.id}/300/200`} />
        <div>{content}</div>
        <div className="actions">
        <button className="edit" onClick={handleEditClick}>Edit</button>
        <button className="delete" onClick={handleDeleteClick}>Delete</button>
        </div>
        </div>
}
export default BookShow;