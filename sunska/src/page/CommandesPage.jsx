import Commandes from "../component/commandes/Commandes";
import Navbar  from "../component/Navbar";

const CommandesPage = () => {
    const listCommandes = [
        {
            id: 0,
            products: [
                {
                    name: 'Ricard 10L',
                    quantity: '2'
                },
                {
                    name: 'Cristaline 1L',
                    quantity: '168'
                },
                {
                    name: 'Cristaline 0,5L',
                    quantity: '500'
                }
            ]
        }
    ]
    return (
        <>
        <Navbar/>
        <Commandes />
        </>
    );
};

export default CommandesPage;