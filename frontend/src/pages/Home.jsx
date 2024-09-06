import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';
function Home() {
  return (
    <div>
      <section className="">
        <h1 className="text-3xl">What do you need help with?</h1>
        <p>Please choose from an option below</p>
      </section>

      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle /> Create New Ticket
      </Link>

      <Link to="/tickets" className="btn btn-block">
        <FaTicketAlt /> View my Tickets
      </Link>
    </div>
  );
}

export default Home;
