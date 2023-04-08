import { createContext, useState } from "react";

const MoviesCards = createContext();

const MovieContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [seats, setSeats] = useState([]);
    const [occupied, setOccupied] = useState([]);
    const [ticket, setTicket] = useState([]);

    return (
        <MoviesCards.Provider
            value={{
                user,
                setUser,
                session,
                setSession,
                seats,
                setSeats,
                occupied,
                setOccupied,
                ticket,
                setTicket,
            }}
        >
            {children}
        </MoviesCards.Provider>
    );
};

export { MoviesCards, MovieContext };
