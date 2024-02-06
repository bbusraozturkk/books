import { useState, useContext } from "react"; // kullanıcının input içerisine girdiği metni takip edebilmek için oluşturuyorsun
import BooksContext from "../context/books";

function BookCreate ({onCreate}){
    const [title, setTitle] = useState('')
    const {createBook} = useContext (BooksContext);

    const handleChange = (event) => {//kullanıcı metin girişini değiştirdiğinde takip edecek veya çağıracak
    setTitle(event.target.value); // event.target.value ise genellikle bir input, textarea veya select gibi kullanıcıdan bilgi alınan elemanlardaki değeri temsil eder. Yani, kullanıcı metin girişini değiştirdiğinde, bu değeri alarak title state'ini güncellemiş oluyoruz.
    };

    const handleSubmit = (event) =>{
        event.preventDefault(); // formun gönderilmesi durumunda sayfanın yeniden yüklenmesini engellemek için 
        createBook(title);
        setTitle('')// input girişini create tuşuna bastıktan sonra temizlemeye yarar
    };

    return ( //kullanıcı input içerisinde enter tuşuna bastığında veya alttaki butona tıkladığında formda otomotik olarak bir gönderme olayını tetiklemek istiyoruz. bunu da yukarıdaki handleSubmit ile yapıcaz
        <div className="book-create">
            <h3>Add a Book</h3>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input className="input" value ={title} onChange={handleChange} />
                <button className="button" >Create!</button> 
            </form>
        </div>
    );
}
export default BookCreate;