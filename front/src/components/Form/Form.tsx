'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import styles from './Form.module.css'

type FormData = {
  product: string;
  score: number;
  commentary: string;
};

export default function Form() {
    const [buttonScore, setButtonScore] = useState<number | null>(null)
    const { 
        register, 
        handleSubmit,
        setValue,
        reset,
        formState: { errors }, 
    } = useForm<FormData>();
    
    const onSubmit = async (data: FormData) => {
        await fetch('http://localhost:3001/nps', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...data }),
        });
        
        reset()
        setButtonScore(null)
    }

    const handleScoreClick = (i: number) => {
        setButtonScore(i);
        setValue('score', i, { shouldValidate: true });
    };


    return <section>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-testid="form">
            <label htmlFor="product">Produto</label>
            <input id="product" {...register('product', { required: 'Campo obrigatório' })} data-testid="product"/>
            {errors.product && <span>{errors.product.message}</span>}
            <label htmlFor="commentary">Comentário</label>
            <textarea id="commentary" {...register('commentary')} data-testid="commentary"/>
            <label htmlFor="score">De 0 a 5, quanto você avaliaria esse produto?</label>
            <div className={styles.buttons}>
                {[...Array(6)].map((_, i) => (
                <button
                    type="button"
                    id="score"
                    key={i}
                    className={`${styles.score} ${buttonScore === i ? styles.selected : ''}`}
                    onClick={() => handleScoreClick(i)}
                    data-testid={`score-${i}`}
                >
                    {i}
                </button>
                ))}
            </div>
            <input type="hidden" {...register('score', { required: 'Campo obrigatório' })} />
            {errors.score && <span>{errors.score.message}</span>}
            <button className={styles.submit} type='submit' data-testid="submit">Enviar</button>
        </form>
    </section>
}