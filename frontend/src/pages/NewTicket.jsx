import { useState } from 'react';
import { useSelector } from 'react-redux';

function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState('validate error');
  const [description, setDescription] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name"> Customer name</label>
          <input className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email"> Customer email</label>
          <input className="form-control" value={email} disabled />
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product"> Product </label>
            <select
              className="form-control"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="Laptop">Laptop</option>
              <option value="Phone">Phone</option>
              <option value="Tablet">Tablet</option>
              <option value="Accessories">Accessories</option>
              Select a product
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea
              className="form-control"
              placeholder="Description"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <form-group>
            <button className="btn btn-block">Submit</button>
          </form-group>
        </form>
      </section>
    </>
  );
}
export default NewTicket;
