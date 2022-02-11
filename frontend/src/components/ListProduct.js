import {useEffect , useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
const ListProduct = () => {

    const [products,setProduct] = useState([]);

    useEffect(() =>{
        getProducts()
    },[])

    const getProducts = async () => {
        const res = await axios.get('http://localhost:5000/products/');
        setProduct(res.data);
    }
    const deleteProduct = async (id) => {
        const res = await axios.delete(`http://localhost:5000/products/${id}`);
        getProducts();
    }
    return (
        <div>
            <Link to="/addProduct" className="button is-primary mt-2">Tambah Product</Link>
            <table className="table table-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Harga</th>
                        <th>Dibuat tanggal</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { products.map((product,index) => (
                    <tr key={product.id}>
                        <th>{index+1}</th>
                        <th>{product.nama}</th>
                        <th>{new Intl.NumberFormat().format(product.harga)}</th>
                        <th>{product.createdAt}</th>
                        <th>
                            <Link to={`/editProduct/${product.id}`} className="button is-small is-info">Edit</Link>&nbsp;
                            <button onClick={() => deleteProduct(product.id)} className="button is-small is-danger">Delete</button>
                        </th>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListProduct