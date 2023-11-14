const MIFUNCION = () => {
    const divs = document.getElementsByClassName("rpv-core__inner-page-container");
    
    let text = "";
    
    for (let i = 0; i < divs.length; i++) {
        const selectedDiv = divs[i];

        // encontrar divs dentro del selectedDiv con la clase rpv-core__text-layer. Ese div debe estar dentro del selectedDiv
        const textLayerDiv = selectedDiv.getElementsByClassName("rpv-core__text-layer")[0];

        // encontrar spans dentro del textLayerDiv con las clase rpv-core__text-layer-text. Filtra los elementos por tipo span y clase rpv-core__text-layer-text
        const spans = textLayerDiv.querySelectorAll("span.rpv-core__text-layer-text");            

        for (let j = 0; j < spans.length; j++) {
            const span = spans[j];
            // const text = span.textContent;

            text += span.textContent;
        }
    }
    console.log(text);
};

// useEffect(() => {
//     const timer = setTimeout(() => {
//         MIFUNCION();
//     }, 5000);

//     // Limpieza al desmontar
//     return () => clearTimeout(timer);
// }, []);


export const BadTerm = `Por la Cuenta Tarjeta el BANCO concederá al CLIENTE, previa evaluación y aprobación crediticia de éste, una línea de crédito revolvente (la “Línea de Crédito”) por la suma inicial que se señala en la Hoja Resumen. En dicha Cuenta Tarjeta se debitarán los importes de los consumos y operaciones realizados con la(s) Tarjeta(s), ya sea en el mismo BANCO, otros bancos (como por ejemplo la disposición de efectivo de la Línea de Crédito a través de la red de cajeros automáticos de otros bancos o uso de plataformas de otros bancos para el pago de servicios), establecimientos afiliados, medios digitales como internet o aplicativos móviles o medios diversos como banca por Internet, banca telefónica o tecnologías similares que el BANCO ponga a disposición del CLIENTE, observando los procedimientos operativos correspondientes. Además, en la Cuenta Tarjeta se cargarán los intereses compensatorios, intereses moratorios, y/o cualquier otro concepto que se pueda aplicar en caso de incumplimiento en el pago, siempre que la normativa vigente no lo restrinja, incluyendo lo establecido en el artículo 1341 y siguientes del Código Civil. En la Hoja Resumen correspondiente se detallan dichos conceptos, así como las comisiones y gastos a cargo del CLIENTE frente al BANCO. La Cuenta Tarjeta se rige, además, por las disposiciones del Reglamento de Tarjetas de Crédito y Débito aprobado mediante Resolución SBS No. 6523-2013 y sus modificatorias, y de manera supletoria, en lo que sea aplicable, las disposiciones de Cuenta Corriente incluidas en el contrato de Condiciones Generales de las cuentas y servicios del BANCO, el cual se encuentra a disposición del CLIENTE en las Oficinas del BANCO y en su página web (www.viabcp.- com), así como por las normas legales aplicables, las cuales el CLIENTE declara conocer, como por ejemplo el Reglamento de Gestión de Conducta de Mercado del Sistema Financiero aprobado mediante Resolución SBS No. 3274-2017 y el Código de Protección del Consumidor cuando resulten aplicables. El CLIENTE podrá realizar los consumos y operaciones admitidas para ser realizadas con Tarjetas de Crédito, así como la utilización de los servicios adicionales asociados a la Tarjeta, siempre que hayan sido previamente solicitados por el CLIENTE, salvo que se haya pactado límites individuales para cada una de las Tarjeta(s) o usuarios designados por el CLIENTE o que el BANCO y el CLIENTE, excepcionalmente y de acuerdo con lo señalado en la cláusula cuarta de este contrato, hubiera aceptado consumos por encima de la Línea de Crédito. El CLIENTE asume plena responsabilidad por los consumos y cargos correspondientes al uso de su Tarjeta y de las tarjetas adicionales y de los usuarios designados por él, obligándose a pagar tales consumos y cargos conforme a lo señalado en el Estado de Cuenta, salvo por los supuestos señalados en los numerales 2.1 a 2.10 de la Cláusula Segunda. El CLIENTE autoriza al BANCO a realizar cargos y/o extornos en la Cuenta Tarjeta, sin previo aviso, a fin de regularizar transacciones que pudiesen haber sido procesadas con error. El cargo y/o extorno serán informados al CLIENTE en su siguiente Estado de Cuenta.`;