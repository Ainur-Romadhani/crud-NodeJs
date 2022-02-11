import ListProduct from "./components/ListProduct";

function App() {
  return (
    <div className="container">
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <h2><b>List Product</b></h2>
          <ListProduct />
        </div>
      </div>
    </div>
  );
}

export default App;
