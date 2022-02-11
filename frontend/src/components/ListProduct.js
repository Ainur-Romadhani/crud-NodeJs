import {useEffect , useState} from 'react'
import axios from 'axios';
const ListProduct = () => {

    const [products,setProduct] = useState([]);

    useEffect(() =>{
        getProducts()
    },[])

    const getProducts = async () => {
        const res = await axios.get('http://localhost:5000/products/');
        setProduct(res.data);
    }
    return (
        <div>
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
                            <button className="button is-small is-info">Edit</button>
                            <button className="button is-small is-danger">Delete</button>
                        </th>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListProduct