import {useEffect , useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import Swal from 'sweetalert2'
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
       await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
            //  axios.delete(`http://localhost:5000/products/${id}`);
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
        
       await getProducts();
    }
    return (
        <div>
            <Link to="/addProduct" className="button is-primary mt-2">Tambah Product</Link>
            <table id="example" className="table table-striped is-fullwidth">
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