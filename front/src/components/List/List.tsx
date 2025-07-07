'use client'

import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import styles from './List.module.css'
import Chart from '../Chart/Chart';

type DataNps = {
    product: string;
    commentary: string;
    score: number;
};

type ChartInfo = {
    total: number;
    nps: number | string;
    detratores: number;
    neutros: number;
    promotores: number;   
}

type FormData = {
  filter: string;
};

export default function List() {
    const [products, setProducts] = useState<string[]>([]);
    const [dataNps, setDataNps] = useState<DataNps[]>([]);
    const [chart, setChart] = useState<ChartInfo>()

    const { register, handleSubmit } = useForm<FormData>();

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('http://localhost:3001/nps');
            const dataJson = await res.json();
            setDataNps(dataJson)

            const getProducts: string[] = dataJson.map(({ product }: {product: string}) => product)
            setProducts([...new Set(getProducts)])
        }
        fetchData();
    }, []);

    const onSubmit = (data: FormData) => {
        const scores = dataNps.filter(d => d.product === data.filter).map(({score}) => score)
        const total = scores.length;
        const promotores = scores.filter((s) => s >= 4).length;
        const neutros = scores.filter((s) => s === 3).length;
        const detratores = scores.filter((s) => s <= 2).length;

        const nps = total ? ((promotores / total) * 100 - (detratores / total) * 100).toFixed(2) : 0;
        setChart({promotores, neutros, detratores, total, nps})
    };

    return <section className={styles.section}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <select {...register('filter')} id="filter">
                <option value="null">Nenhum</option>
                { products.map((p) => {
                   return <option value={p} key={p}>{p}</option>
                })}
        
            </select>

            <button type="submit" className={styles.button} data-testid="submit">Filtrar</button>
        </form>

        {chart?.total && chart?.total > 0 && 
            <>
                <div className={styles.infos}>
                    <p>Total respostas: {chart.total}</p>
                    <p>NPS: {chart.nps}</p>
                </div>
                <Chart {...chart}/>
            </>}
    </section>
}