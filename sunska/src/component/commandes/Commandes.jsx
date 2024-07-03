import React, { useState } from 'react';

const Commandes = () => {
    let enCours = true;

    const [test, setTest] = useState(enCours);
    
    const handle = () => {
        let selectedOption = document.querySelector(
          'input[name="commandes-type-radio"]:checked'
        ).value;
        console.log(selectedOption);
        if (selectedOption === "passees") {
            setTest(false);
        } else {
            setTest(true);
        }
      }
    return (
        <>
        <h1>Commandes</h1>
        <div className="flex flex-row w-fit ring-2 ring-bleugris rounded-3xl">
            <div class="flex items-center">
                <input id="commandes-en-cours" name="commandes-type-radio" type="radio" onChange={handle} checked={test} value="enCours" class="hidden peer text-blue-600 bg-gray-100 border-gray-300"/>
                <label for="commandes-en-cours" class="p-2 text-sm font-medium rounded-l-3xl bg-gray-200 cursor-pointer peer-checked:bg-orange peer-checked:cursor-default">Commandes en cours</label>
            </div>
            {/* <div class="flex items-center">
                <input id="commandes-test" name="commandes-type-radio" type="radio" value="" class="hidden peer text-blue-600 bg-gray-100 border-gray-300"/>
                <label for="commandes-test" class="p-2 text-sm font-medium bg-gray-200 cursor-pointer peer-checked:bg-orange peer-checked:cursor-default">Commandes test</label>
            </div> */}
            <div class="flex items-center ">
                <input id="commandes-en-passees" name="commandes-type-radio" type="radio" onChange={handle} checked={!test} value="passees" class="hidden peer text-blue-600 bg-gray-100 border-gray-300"/>
                <label for="commandes-en-passees" class="p-2 text-sm font-medium rounded-r-3xl bg-gray-200 cursor-pointer peer-checked:bg-orange peer-checked:cursor-default">Commandes passées</label>
            </div>
        </div>
        </>
    );
};

export default Commandes;

//Mettre Input frère de div