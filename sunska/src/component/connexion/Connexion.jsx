
import "./Connexion.css"
const Connexion = () => {
    return (
        <div className="z-50">
            <form action="post" className="flex flex-col">
                <label for="login" className="font-bold mb-2">Identifiant</label>
                <input placeholder="Identifiant" type="text" id="login" required className="rounded-lg mb-4 p-2"/>
                <label for="password" className="font-bold mb-2">Mot de passe</label>
                <input placeholder="Mot de passe" type="password" id="password" required className="rounded-lg mb-4 p-2"/>
                <button formMethod="post" className="bg-bleugris hover:bg-bleugris text-white font-bold py-2 px-4 rounded w-min self-end">
                    Connexion
                </button>
            </form>
        </div>
    );
};

export default Connexion;