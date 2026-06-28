import React, { useState } from 'react';
import styles from './Calculadora.module.css';

export default function Calculadora() {
    const [resultado, setResultado] = useState('');

    const insert = (num) => {
        setResultado((prev) => prev + num);
    };

    const clean = () => {
        setResultado('');
    };

    const back = () => {
        setResultado((prev) => prev.substring(0, prev.length - 1));
    };

    const calcular = () => {
        if (resultado) {
            try {
                // Using eval is discouraged, but we'll use a safer approach or just keep it simple since it's a calculator.
                // eslint-disable-next-line no-eval
                setResultado(String(eval(resultado)));
            } catch (e) {
                setResultado('Erro');
            }
        } else {
            setResultado('Nada...');
        }
    };

    return (
        <div className={styles.fundo}>
            <div className={styles.calculadora}>
                <h1>Calculadora</h1>
                <p id={styles.resultado}>{resultado}</p>
                <table>
                    <tbody>
                        <tr>
                            <td><button className={styles.botao} onClick={clean}>C</button></td>
                            <td>
                                <button className={styles.botao} onClick={back}>
                                    <img src="/calculadora_imagens/dell.svg" alt="Dell" style={{ width: '25px', transform: 'translateY(4px) translateX(0px)' }} />
                                </button>
                            </td>
                            <td><button className={styles.botao} onClick={() => insert('/')}>/</button></td>
                            <td>
                                <button className={styles.botao} onClick={() => insert('*')}>
                                    <img src="/calculadora_imagens/multi.svg" alt="Multi" style={{ width: '15px' }} />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td><button className={styles.botao} onClick={() => insert('7')}>7</button></td>
                            <td><button className={styles.botao} onClick={() => insert('8')}>8</button></td>
                            <td><button className={styles.botao} onClick={() => insert('9')}>9</button></td>
                            <td><button className={styles.botao} onClick={() => insert('-')}>-</button></td>
                        </tr>
                        <tr>
                            <td><button className={styles.botao} onClick={() => insert('4')}>4</button></td>
                            <td><button className={styles.botao} onClick={() => insert('5')}>5</button></td>
                            <td><button className={styles.botao} onClick={() => insert('6')}>6</button></td>
                            <td><button className={styles.botao} onClick={() => insert('+')}>+</button></td>
                        </tr>
                        <tr>
                            <td><button className={styles.botao} onClick={() => insert('1')}>1</button></td>
                            <td><button className={styles.botao} onClick={() => insert('2')}>2</button></td>
                            <td><button className={styles.botao} onClick={() => insert('3')}>3</button></td>
                            <td rowSpan="2"><button className={styles.botao} style={{ height: '106px' }} onClick={calcular}>=</button></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><button className={styles.botao} style={{ width: '106px' }} onClick={() => insert('0')}>0</button></td>
                            <td><button className={styles.botao} onClick={() => insert('.')}>.</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
