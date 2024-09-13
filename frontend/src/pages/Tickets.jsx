import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTickets, reset } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import TicketItem from '../components/TicketItem';

function Tickets() {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTickets());

    //unmount
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-3/4 px-4 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <BackButton url="/" />

      <h2 className="text-2xl font-semibold text-gray-800 dark:text-neutral-200 mb-2">
        Tickets
      </h2>
      <p className="mb-10 text-sm text-gray-600 dark:text-neutral-400">
        Review and manage your tickets below.
      </p>

      <div className="max-w-full overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-800 dark:border-neutral-700">
        <div className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
          <div className="px-6 py-3 text-sm font-semibold text-center text-gray-800 dark:text-neutral-200 grid grid-cols-4">
            <span>Date</span>
            <span>Product</span>
            <span>Status</span>
            <span>Action</span>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-neutral-700">
            {tickets.map((ticket) => (
              <TicketItem key={ticket._id} ticket={ticket} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tickets;
