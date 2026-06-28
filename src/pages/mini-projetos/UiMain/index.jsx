import React, { useEffect, useRef } from 'react';
import styles from './UiMain.module.css';

export default function UiMain() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let desenhando = false;

        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';

        const iniciarDesenho = (e) => {
            desenhando = true;
            ctx.beginPath();
            ctx.moveTo(
                e.clientX - canvas.offsetLeft,
                e.clientY - canvas.offsetTop
            );
        };

        const desenhar = (e) => {
            if (!desenhando) return;
            ctx.lineTo(
                e.clientX - canvas.offsetLeft,
                e.clientY - canvas.offsetTop
            );
            ctx.stroke();
        };

        const pararDesenho = () => {
            desenhando = false;
        };

        canvas.addEventListener('mousedown', iniciarDesenho);
        canvas.addEventListener('mousemove', desenhar);
        canvas.addEventListener('mouseup', pararDesenho);
        canvas.addEventListener('mouseout', pararDesenho);

        return () => {
            canvas.removeEventListener('mousedown', iniciarDesenho);
            canvas.removeEventListener('mousemove', desenhar);
            canvas.removeEventListener('mouseup', pararDesenho);
            canvas.removeEventListener('mouseout', pararDesenho);
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>teste</h1>
                <h2 style={{ border: '20px solid blue' }}>batata</h2>
                <label htmlFor="oi">teste de label</label>
                <input id="oi" type="checkbox" style={{ border: '2px solid blue' }} /> oi
                <button>Teste</button>
                <canvas ref={canvasRef} style={{ border: '2px solid blue' }} width="400" height="300">teste</canvas>
            </div>
        </div>
    );
}
