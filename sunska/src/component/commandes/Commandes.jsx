const Commandes = () => {
    return (
        <>
        <p>Commandes</p>
        <div className="flex flex-roww-fit">
            <div class="flex items-center">
                <input id="commandes-en-cours" name="commandes-type-radio" type="radio" value=""class="hidden peer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                <label for="commandes-en-cours" class="p-2 text-sm font-medium  border-2 rounded-l-3xl peer-checked:bg-gray-200">Commandes en cours</label>
            </div>
            <div class="flex items-center ">
                <input id="commandes-en-passees"checked name="commandes-type-radio" type="radio" value="" class="hidden peer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                <label for="commandes-en-passees" class="p-2 text-sm font-medium border-2 rounded-r-3xl border-l-0 peer-checked:bg-gray-200">Commandes passées</label>
            </div>
        </div>
        </>
    );
};

export default Commandes;

//Mettre Input frère de div