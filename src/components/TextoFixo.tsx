interface textoFixoProps {
    frase: string;
}

function textoFixo({ frase }: textoFixoProps) {
    return <span>{frase}</span>;
}

export default textoFixo;
