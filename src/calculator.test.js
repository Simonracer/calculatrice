import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Calculatrice from './Calculatrice.jsx';

describe('Calculatrice', () => {

    test('doit afficher 0 initialement', () => {
        render(<Calculatrice />);
        const affichage = screen.getByTestId('affichage');
        expect(affichage.textContent).toBe('0');
    });

    test('doit mettre à jour l\'affichage lorsqu\'on clique sur les boutons', () => {
        render(<Calculatrice />);
        const affichage = screen.getByTestId('affichage');

        fireEvent.click(screen.getByText('1'));
        expect(affichage.textContent).toBe('1');

        fireEvent.click(screen.getByText('+'));
        fireEvent.click(screen.getByText('2'));
        expect(affichage.textContent).toBe('1+2');

        fireEvent.click(screen.getByText('='));
        expect(affichage.textContent).toBe('3');
    });

    test('doit gérer la division par zéro', () => {
        render(<Calculatrice />);
        const affichage = screen.getByTestId('affichage');

        fireEvent.click(screen.getByText('1'));
        fireEvent.click(screen.getByText('/'));
        fireEvent.click(screen.getByText('0'));
        fireEvent.click(screen.getByText('='));
        expect(affichage.textContent).toBe('Erreur');
    });

    test('doit gérer la racine carrée des nombres négatifs', () => {
        render(<Calculatrice />);
        const affichage = screen.getByTestId('affichage');

        fireEvent.click(screen.getByText('±'));
        fireEvent.click(screen.getByText('9'));
        fireEvent.click(screen.getByText('√'));
        expect(affichage.textContent).toBe('Erreur');
    });

    test('doit effacer l\'affichage lorsque C est cliqué', () => {
        render(<Calculatrice />);
        const affichage = screen.getByTestId('affichage');

        fireEvent.click(screen.getByText('1'));
        fireEvent.click(screen.getByText('2'));
        fireEvent.click(screen.getByText('C'));
        expect(affichage.textContent).toBe('0');
    });

    test('doit gérer les calculs de pourcentage', () => {
        render(<Calculatrice />);
        const affichage = screen.getByTestId('affichage');

        fireEvent.click(screen.getByText('5'));
        fireEvent.click(screen.getByText('0'));
        fireEvent.click(screen.getByText('%'));
        expect(affichage.textContent).toBe('0.5');
    });
});





test('doit gérer le changement de signe', () => {
    render(<Calculatrice />);
    const affichage = screen.getByTestId('affichage');

    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('±'));
    expect(affichage.textContent).toBe('-5');
});

test('doit gérer les calculs de racine carrée', () => {
    render(<Calculatrice />);
    const affichage = screen.getByTestId('affichage');

    fireEvent.click(screen.getByText('9'));
    fireEvent.click(screen.getByText('√'));
    expect(affichage.textContent).toBe('3');
});

test('doit gérer les parenthèses', () => {
    render(<Calculatrice />);
    const affichage = screen.getByTestId('affichage');

    fireEvent.click(screen.getByText('('));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText(')'));
    fireEvent.click(screen.getByText('*'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));
    expect(affichage.textContent).toBe('10');
});

test('doit gérer les calculs décimaux', () => {
    render(<Calculatrice />);
    const affichage = screen.getByTestId('affichage');

    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('.'));
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('.'));
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('='));
    expect(affichage.textContent).toBe('4');
});

test('doit gérer la valeur de pi', () => {
    render(<Calculatrice />);
    const affichage = screen.getByTestId('affichage');

    fireEvent.click(screen.getByText('π'));
    fireEvent.click(screen.getByText('='));
    expect(affichage.textContent).toBe(String(Math.PI));
});

test('doit gérer les opérations consécutives', () => {
    render(<Calculatrice />);
    const affichage = screen.getByTestId('affichage');

    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('*'));
    fireEvent.click(screen.getByText('4'));
    fireEvent.click(screen.getByText('='));
    expect(affichage.textContent).toBe('14'); // L'expression '2+3*4' évalue à 14, pas à 20
});




test('doit gérer correctement la suppression d\'entrée (CE)', () => {
    render(<Calculatrice />);
    const affichage = screen.getByTestId('affichage');

    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('CE'));
    expect(affichage.textContent).toBe('12');
});

test('doit afficher une erreur pour une entrée invalide', () => {
    render(<Calculatrice />);
    const affichage = screen.getByTestId('affichage');

    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('='));
    expect(affichage.textContent).toBe('Erreur');
});

test('doit gérer la multiplication par zéro', () => {
    render(<Calculatrice />);
    const affichage = screen.getByTestId('affichage');

    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('*'));
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(screen.getByText('='));
    expect(affichage.textContent).toBe('0');
});

test('doit gérer la soustraction donnant des nombres négatifs', () => {
    render(<Calculatrice />);
    const affichage = screen.getByTestId('affichage');

    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('-'));
    fireEvent.click(screen.getByText('8'));
    fireEvent.click(screen.getByText('='));
    expect(affichage.textContent).toBe('-3');
});


test('doit gérer l\'addition avec des nombres négatifs', () => {
    render(<Calculatrice />);
    const affichage = screen.getByTestId('affichage');

    fireEvent.click(screen.getByText('±')); // Ajouter le signe négatif
    fireEvent.click(screen.getByText('5')); // Ajouter le nombre 5
    fireEvent.click(screen.getByText('+')); // Ajouter l'opérateur d'addition
    fireEvent.click(screen.getByText('8')); // Ajouter le nombre 8
    fireEvent.click(screen.getByText('='));
    expect(affichage.textContent).toBe('3'); // Le résultat de -5 + 8 est 3
});





test('doit gérer la division donnant un décimal', () => {
    render(<Calculatrice />);
    const affichage = screen.getByTestId('affichage');

    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('/'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));
    expect(affichage.textContent).toBe('2.5');
});

test('doit gérer plusieurs points décimaux dans un nombre', () => {
    render(<Calculatrice />);
    const affichage = screen.getByTestId('affichage');

    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('.'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('.'));
    fireEvent.click(screen.getByText('3'));
    expect(affichage.textContent).toBe('1.23'); // En supposant que votre calculatrice gère cela correctement
});

test('doit gérer la suppression de caractères de l\'entrée', () => {
    render(<Calculatrice />);
    const affichage = screen.getByTestId('affichage');

    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('CE'));
    expect(affichage.textContent).toBe('12');
});

test('doit gérer les calculs avec des parenthèses', () => {
    render(<Calculatrice />);
    const affichage = screen.getByTestId('affichage');

    fireEvent.click(screen.getByText('('));
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText(')'));
    fireEvent.click(screen.getByText('*'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));
    expect(affichage.textContent).toBe('9');
});

