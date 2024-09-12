import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTicket, reset } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState('Laptop');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success('Ticket created successfully');
      navigate('/tickets');
    }
    dispatch(reset());
  }, [dispatch, isSuccess, isError, message, navigate]);

  if (isLoading) {
    return <Spinner />;
  }
  const onSubmit = (e) => {
    e.preventDefault();

    const ticketData = {
      product,
      description,
    };

    dispatch(createTicket(ticketData));
  };
  return (
    <>
      <BackButton />

      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
          Create New Ticket
        </h1>
        <p className="mt-1 text-gray-600 dark:text-neutral-400">
          Need Assistance? Create a ticket and get support today.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-12 flex flex-col grid gap-4 lg:gap-6"
        >
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            <section>
              <label
                htmlFor="name"
                className="text-left block mb-2 text-sm text-gray-700 font-medium dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                value={name}
                disabled
                className="py-3 px-4 block w-full rounded-lg text-sm border-blue-500 disabled:opacity-85 disabled:bg-blue-100"
              />
            </section>
            <section>
              <label
                htmlFor="email"
                className="text-left block mb-2 text-sm text-gray-700 font-medium dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-85 disabled:bg-blue-100"
              />
            </section>
          </div>
          <section>
            <label
              htmlFor="product"
              class="text-left block mb-2 text-sm text-gray-700 font-medium dark:text-white"
            >
              Product
            </label>
            <select
              class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:bg-neutral-100 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="Laptop">Laptop</option>
              <option value="Phone">Phone</option>
              <option value="Tablet">Tablet</option>
              <option value="Accessories">Accessories</option>
              Select a product
            </select>
          </section>
          <section>
            <label
              htmlFor="description"
              className="text-left block mb-2 text-sm text-gray-700 font-medium dark:text-white"
            >
              Description
            </label>
            <textarea
              placeholder="Overview of the issue"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:bg-neutral-100 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            />
          </section>
          <button
            type="submit"
            className="mt-6 grid w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            Submit
          </button>
          <p className="mt-3 text-center text-sm text-gray-500 dark:text-neutral-500">
            Our staff will get back to you as soon as they can
          </p>
        </form>
      </div>
    </>
  );
}
export default NewTicket;
