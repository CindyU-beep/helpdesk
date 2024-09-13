import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice';
import { getNotes, createNote } from '../features/notes/noteSlice';
import NoteItem from '../components/NoteItem';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const customStyles = {
  content: {
    width: '80%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
};

Modal.setAppElement('#root');

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.tickets
  );
  const {
    notes,
    isLoading: notesIsLoading,
    isError: notesIsError,
  } = useSelector((state) => state.notes);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, ticketId, isError, message]);

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }

  if (isError || notesIsError) {
    return <h3> Something went wrong </h3>;
  }
  //close ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success('Ticket closed successfully');
    navigate('/tickets');
  };

  //toggle modal
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  //close note
  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ noteText, ticketId }));
    closeModal();
  };
  return (
    <div className="w-3/4 mx-auto">
      <div className=" ticket-page">
        <header className="ticket-header">
          <BackButton url="/tickets" />
          <h2>
            Ticket ID: {ticket._id}
            <span className={`status status-${ticket.status}`}>
              {ticket.status}
            </span>
          </h2>
          <h3>
            Date Submitted:{' '}
            {new Date(ticket.createdAt).toLocaleDateString('en-US')}
          </h3>
          <h3>Product: {ticket.product}</h3>
          <hr />
          <div className="ticket-desc">
            <h4>Description of Issue</h4>
            <p>{ticket.description}</p>
          </div>
        </header>
        {/* add note button */}
        {ticket.status !== 'closed' && (
          <button onClick={openModal} className="btn">
            <FaPlus /> Add Note
          </button>
        )}
        {/* modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Add Note"
        >
          <h2>Add Note</h2>
          <form onSubmit={onNoteSubmit}>
            <div className="form-group">
              <textarea
                name="noteText"
                id="noteText"
                className="form-control"
                placeholder="Note text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
        {ticket.status !== 'closed' && (
          <button className="btn btn-block btn-danger" onClick={onTicketClose}>
            Close Ticket
          </button>
        )}
      </div>
    </div>
  );
}

export default Ticket;
