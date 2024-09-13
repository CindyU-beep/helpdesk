import React from 'react';
import { Link } from 'react-router-dom';

function TicketItem({ ticket }) {
  return (
    <div className="px-6 py-4 grid grid-cols-4 gap-4 items-center text-sm text-gray-800 dark:text-neutral-200">
      <span>{new Date(ticket.createdAt).toLocaleString()}</span>
      <span>{ticket.product}</span>
      <span>
        <span
          className={`py-1 px-3 inline-flex items-center text-xs font-medium rounded-full ${
            {
              new: 'bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-500',
              closed:
                'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500',
              pending:
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-500',
            }[ticket.status] ||
            'bg-gray-100 text-gray-800 dark:bg-gray-500/10 dark:text-gray-500'
          }`}
        >
          {ticket.status}
        </span>
      </span>
      <span>
        <Link
          to={`/ticket/${ticket._id}`}
          className="py-1.5 px-4 inline-flex items-center text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          View
        </Link>
      </span>
    </div>
  );
}

export default TicketItem;
