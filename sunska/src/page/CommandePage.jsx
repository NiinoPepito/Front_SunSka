import { useParams } from "react-router-dom";
import Commande from "../component/commande/Commande";
import Navbar from "../component/Navbar";

const CommandePage = () => {
    return (
        <>
        <Navbar/>
        <Commande id={useParams().id}/>
        </>
    );
};

export default CommandePage;