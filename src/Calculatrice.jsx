import React, { useState } from 'react';
import { evaluate } from 'mathjs'; // Assurez-vous d'installer mathjs avec 'npm install mathjs'

function Calculatrice() {
    // État pour stocker l'entrée de l'utilisateur
    const [entree, setEntree] = useState('');
    // État pour indiquer si le calcul est effectué
    const [estCalcule, setEstCalcule] = useState(false);
    // État pour indiquer si le calcul vient d'être effectué
    const [vientDeCalculer, setVientDeCalculer] = useState(false);

    // Fonction pour gérer l'entrée de l'utilisateur
    const gererEntree = (valeur) => {
        // Si le calcul est effectué et l'entrée est un opérateur, ajouter l'opérateur à l'entrée
        if (estCalcule && estOperateur(valeur)) {
            setEntree(entree + valeur);
        } else if (valeur === '.') { // Sinon, si la valeur est un point, ajouter le point si le dernier nombre n'en contient pas déjà un
            const dernierNombre = entree.split(/[-+*/]/).pop();
            if (!dernierNombre.includes('.')) {
                setEntree((estCalcule ? '' : entree) + valeur);
            }
        } else { // Sinon, ajouter la valeur à l'entrée
            setEntree((estCalcule ? '' : entree) + valeur);
        }
        setEstCalcule(false); // Réinitialiser estCalcule à false
    };

    // Fonction pour vérifier si un caractère est un opérateur
    const estOperateur = (char) => {
        return ['+', '-', '*', '/'].includes(char);
    };

    // Fonction pour effacer l'entrée
    const gererEffacer = () => {
        setEntree('');
        setEstCalcule(false);
    };

    // Fonction pour effectuer le calcul
    const gererCalculer = () => {
        try {
            // Vérifier si l'entrée contient une division par zéro
            if (entree.includes('/0')) {
                throw new Error('Division par zero');
            }
            // Évaluer l'expression et mettre à jour l'entrée avec le résultat
            setEntree(evaluate(entree.replace('--', '+')).toString());
            setEstCalcule(true); // Indiquer que le calcul est effectué
        } catch (error) {
            setEntree('Erreur'); // En cas d'erreur, afficher 'Erreur'
        }
    };

    // Fonction pour supprimer le dernier caractère de l'entrée
    const gererSupprimerDernierCaractere = () => {
        setEntree(entree.slice(0, -1));
        // Si l'entrée est 'Erreur', réinitialiser estCalcule à false
        if (entree === 'Erreur') {
            setEstCalcule(false);
        }
    };

    // Fonction pour calculer la racine carrée
    const gererRacineCarree = () => {
        try {
            // Évaluer l'entrée
            const nombre = evaluate(entree);
            // Vérifier si le nombre est négatif
            if (nombre < 0) {
                setEntree('Erreur'); // Afficher 'Erreur' si le nombre est négatif
            } else {
                // Calculer la racine carrée du nombre et mettre à jour l'entrée
                setEntree(Math.sqrt(nombre).toString());
            }
            setVientDeCalculer(true); // Indiquer que le calcul vient d'être effectué
        } catch (error) {
            setEntree('Erreur');
            setVientDeCalculer(false); // Indiquer que le calcul n'a pas été effectué
        }
    };

    // Fonction pour calculer le pourcentage
    const gererPourcentage = () => {
        try {
            // Calculer le pourcentage de l'entrée et mettre à jour l'entrée
            setEntree((evaluate(entree) / 100).toString());
            setVientDeCalculer(true); // Indiquer que le calcul vient d'être effectué
        } catch (error) {
            setEntree('Erreur');
            setVientDeCalculer(false); // Indiquer que le calcul n'a pas été effectué
        }
    };

    // Fonction pour changer le signe de l'entrée
    const gererChangementSigne = () => {
        // Si l'entrée est vide ou le dernier caractère est un opérateur, ajouter un signe négatif à l'entrée
        if (entree === '' || estOperateur(entree.slice(-1))) {
            setEntree(entree + '-');
        } else {
            // Sinon, changer le signe de l'entrée en ajoutant un signe négatif au début
            setEntree('-' + entree);
        }
    };

    // Fonction pour ajouter la constante PI à l'entrée
    const gererPi = () => {
        if (vientDeCalculer) {
            // Si le calcul vient d'être effectué, remplacer l'entrée par la constante PI
            setEntree(Math.PI.toString());
            setEstCalcule(false); // Réinitialiser estCalcule à false
        } else if (!entree || ['+', '-', '*', '/'].includes(entree.slice(-1))) {
            // Si l'entrée est vide ou le dernier caractère est un opérateur, ajouter la constante PI à l'entrée
            setEntree(entree + Math.PI.toString());
        } else {
            // Sinon, ajouter la constante PI avec un opérateur de multiplication
            setEntree(entree + '*' + Math.PI.toString());
        }
    };

    // Composant de bouton réutilisable
    const Bouton = ({ children, onClick, ariaLabel }) => (
        <button onClick={onClick} aria-label={ariaLabel || children} className="button">
            {children}
        </button>
    );

    return (
        <>
            <div style={{ textAlign: 'center', fontFamily: 'Arial' }}>
                <h1>CALCULATRICE</h1>
            </div>
            <style>
                {`
        .calculatrice {
            width: 380px;
            height: 415px;
            margin: 0 auto; /* Centre horizontalement */
            margin-top: 50px; /* Marge en haut pour centrer verticalement */
            padding: 20px;
            background-color: #333; /* Fond foncé */
            color: #fff; /* Texte blanc */
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            font-family: Arial, sans-serif;
        }

        .affichage {
            background-color: #444; /* Fond de l'affichage un peu plus foncé */
            border-radius: 5px;
            padding: 10px;
            margin-bottom: 20px;
            text-align: right;
            font-size: 24px;
        }

        .boutons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
        }

        .button {
            padding: 10px;
            font-size: 26px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            background-color: #666; /* Boutons plus foncés */
            color: #fff; /* Texte blanc */
            border: none;
            outline: none;
        }

        .button:hover {
            background-color: #555; /* Légèrement plus foncé au survol */
        }

        .button:active {
            background-color: #444; /* Encore plus foncé en cliquant */
        }
    `}
            </style>
            <div className="calculatrice">
                <div className="affichage" data-testid="affichage">{entree || '0'}</div>
                <div className="boutons">
                    {/* Ligne 1 */}
                    <Bouton onClick={() => gererEntree('(')} ariaLabel="Ouvrir Parenthèse">(</Bouton>
                    <Bouton onClick={() => gererEntree(')')} ariaLabel="Fermer Parenthèse">)</Bouton>
                    <Bouton onClick={gererPourcentage} ariaLabel="Pourcentage">%</Bouton>
                    <Bouton onClick={gererSupprimerDernierCaractere} ariaLabel="Effacer Entrée">CE</Bouton>

                    {/* Ligne 2 */}
                    <Bouton onClick={() => gererEntree('7')} ariaLabel="Sept">7</Bouton>
                    <Bouton onClick={() => gererEntree('8')} ariaLabel="Huit">8</Bouton>
                    <Bouton onClick={() => gererEntree('9')} ariaLabel="Neuf">9</Bouton>
                    <Bouton onClick={() => gererEntree('/')} ariaLabel="Diviser">/</Bouton>

                    {/* Ligne 3 */}
                    <Bouton onClick={() => gererEntree('4')} ariaLabel="Quatre">4</Bouton>
                    <Bouton onClick={() => gererEntree('5')} ariaLabel="Cinq">5</Bouton>
                    <Bouton onClick={() => gererEntree('6')} ariaLabel="Six">6</Bouton>
                    <Bouton onClick={() => gererEntree('*')} ariaLabel="Multiplier">*</Bouton>

                    {/* Ligne 4 */}
                    <Bouton onClick={() => gererEntree('1')} ariaLabel="Un">1</Bouton>
                    <Bouton onClick={() => gererEntree('2')} ariaLabel="Deux">2</Bouton>
                    <Bouton onClick={() => gererEntree('3')} ariaLabel="Trois">3</Bouton>
                    <Bouton onClick={() => gererEntree('-')} ariaLabel="Moins">-</Bouton>

                    {/* Ligne 5 */}
                    <Bouton onClick={() => gererEntree('0')} ariaLabel="Zéro">0</Bouton>
                    <Bouton onClick={() => gererEntree('.')} ariaLabel="Décimal">.</Bouton>
                    <Bouton onClick={gererCalculer} ariaLabel="Égal" className="egal">=</Bouton>
                    <Bouton onClick={() => gererEntree('+')} ariaLabel="Plus" className="plus">+</Bouton>

                    {/* Ligne 6 */}
                    <Bouton onClick={gererEffacer} ariaLabel="Effacer">C</Bouton>
                    <Bouton onClick={gererRacineCarree} ariaLabel="Racine Carrée">√</Bouton>
                    <Bouton onClick={gererChangementSigne} ariaLabel="Changer de Signe">±</Bouton>
                    <Bouton onClick={gererPi} ariaLabel="Pi">π</Bouton>
                </div>
            </div>
        </>
    );
}

export default Calculatrice;
