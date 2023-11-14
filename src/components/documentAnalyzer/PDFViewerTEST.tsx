// React PDF Viewer
import { Button, Position, PrimaryButton, SpecialZoomLevel, Tooltip, Worker } from '@react-pdf-viewer/core';
import { LocalizationMap, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

// Default Layout
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Highlight
import { HighlightArea, RenderHighlightsProps, highlightPlugin } from '@react-pdf-viewer/highlight';
import '@react-pdf-viewer/highlight/lib/styles/index.css';
import { Trigger } from '@react-pdf-viewer/highlight';

// Location
import de_ES from '@react-pdf-viewer/locales/lib/es_ES.json';

// Page Navigation
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import { useEffect, useState } from 'react';


export const PDFViewerTEST = (props: any) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const pageNavigationPluginInstance = pageNavigationPlugin({
        enableShortcuts: true,
    });
    const [highlightAreas, setHighlightAreas] = useState<HighlightArea[]>([
        {
            // Reemplaza estos valores con los valores reales
            pageIndex: 0,
            left: 4.27,
            top: 15,
            width: 45,
            height: 10,
        },
        // Agrega más áreas de resaltado si es necesario
    ]);

    // const BadTerm = `Por la Cuenta Tarjeta el BANCO concederá al CLIENTE, previa evaluación y aprobación crediticia de éste, una línea de crédito revolvente (la “Línea de Crédito”) por la suma inicial que se señala en la Hoja Resumen. En dicha Cuenta Tarjeta se debitarán los importes de los consumos y operaciones realizados con la(s) Tarjeta(s), ya sea en el mismo BANCO, otros bancos (como por ejemplo la disposición de efectivo de la Línea de Crédito a través de la red de cajeros automáticos de otros bancos o uso de plataformas de otros bancos para el pago de servicios), establecimientos afiliados, medios digitales como internet o aplicativos móviles o medios diversos como banca por Internet, banca telefónica o tecnologías similares que el BANCO ponga a disposición del CLIENTE, observando los procedimientos operativos correspondientes. Además, en la Cuenta Tarjeta se cargarán los intereses compensatorios, intereses moratorios, y/o cualquier otro concepto que se pueda aplicar en caso de incumplimiento en el pago, siempre que la normativa vigente no lo restrinja, incluyendo lo establecido en el artículo 1341 y siguientes del Código Civil. En la Hoja Resumen correspondiente se detallan dichos conceptos, así como las comisiones y gastos a cargo del CLIENTE frente al BANCO. La Cuenta Tarjeta se rige, además, por las disposiciones del Reglamento de Tarjetas de Crédito y Débito aprobado mediante Resolución SBS No. 6523-2013 y sus modificatorias, y de manera supletoria, en lo que sea aplicable, las disposiciones de Cuenta Corriente incluidas en el contrato de Condiciones Generales de las cuentas y servicios del BANCO, el cual se encuentra a disposición del CLIENTE en las Oficinas del BANCO y en su página web (www.viabcp.- com), así como por las normas legales aplicables, las cuales el CLIENTE declara conocer, como por ejemplo el Reglamento de Gestión de Conducta de Mercado del Sistema Financiero aprobado mediante Resolución SBS No. 3274-2017 y el Código de Protección del Consumidor cuando resulten aplicables. El CLIENTE podrá realizar los consumos y operaciones admitidas para ser realizadas con Tarjetas de Crédito, así como la utilización de los servicios adicionales asociados a la Tarjeta, siempre que hayan sido previamente solicitados por el CLIENTE, salvo que se haya pactado límites individuales para cada una de las Tarjeta(s) o usuarios designados por el CLIENTE o que el BANCO y el CLIENTE, excepcionalmente y de acuerdo con lo señalado en la cláusula cuarta de este contrato, hubiera aceptado consumos por encima de la Línea de Crédito. El CLIENTE asume plena responsabilidad por los consumos y cargos correspondientes al uso de su Tarjeta y de las tarjetas adicionales y de los usuarios designados por él, obligándose a pagar tales consumos y cargos conforme a lo señalado en el Estado de Cuenta, salvo por los supuestos señalados en los numerales 2.1 a 2.10 de la Cláusula Segunda. El CLIENTE autoriza al BANCO a realizar cargos y/o extornos en la Cuenta Tarjeta, sin previo aviso, a fin de regularizar transacciones que pudiesen haber sido procesadas con error. El cargo y/o extorno serán informados al CLIENTE en su siguiente Estado de Cuenta.`;
    // const BadTerm = `El CLIENTE es responsable por el uso de la Tarjeta y de las tarjetas adicionales. El BANCO está facultado a cobrar toda suma cargada a la Cuenta Tarjeta, incluso en montos que excedan la Línea de Crédito otorgada, siempre que el BANCO y el CLIENTE hayan acordado la utilización en exceso de la línea de crédito (sobregiro) conforme a lo dispuesto en la Cláusula Cua rta. El control del uso de la Tarjeta y de las tarjetas adicionales corresponde y es de exclusiva responsabilidad del CLIENTE, pudiendo el BANCO disponer el bloqueo de las mismas cuando se supere el monto máximo de la Línea de Crédito asignada o suspender su utilización conforme a este contrato. El BANCO es responsable de las pérdidas por las operaciones realizadas en los siguientes casos, salvo cuando acredite la responsabilidad del CLIENTE: 2.1 Cuando las operaciones hayan sido realizadas luego del aviso que dé el CLIENTE sobre el extravío, sustracción, robo, hurto o uso no autorizado de su Tarjeta o de las tarjetas adicionales, o de la información que ellas contienen; 2.2 Por incumplimiento de lo dispuesto en el artículo 21 del Reglamento de Tarjetas de Crédito y Débito. 2.3 Cuando la Tarjeta o las tarjetas adicionales hayan sido objeto de clonación; 2.4 Si el canal o sistema puesto por el BANCO a disposición del CLIENTE para realizar la operación hubiese presentado defectos de funcionamiento; 2.5 Si el cajero automático puesto a disposición por el BANCO o algún tercero a disposición del CLIENTE para realizar la operación, o el ambiente en que dicho cajero automático opere, hubiese sido manipulado 2.6 Si se hubiese producido la suplantación del CLIENTE o de los usuarios de las tarjetas adicionales en las oficinas del BANCO; 2.7 Si se tratase de operaciones denominadas micropago; 2.8 Si las operaciones hubiesen sido realizadas luego del bloqueo o cancelación de la Línea de Crédito, o de la Tarjeta o de las tarjetas adicionales, o cuando estas hayan expirado; 2.9 Operaciones asociadas a servicios no solicitados o habilitados por el CLIENTE, relacionados a (a) Operaciones realizadas a través de internet; (b) Operaciones efectuadas en el exterior de forma presencial; (c) Disposición de efectivo otorgando al CLIENTE la posibilidad de elegir, para cada operación, si la disposición será financiada en cuotas, y de ser el caso, decir el número de cuotas; y (d) Sobregiro o exceso de la línea de crédito. 2.10 Si el esquema de autenticación del CLIENTE para la realización de estas operaciones no cumpla con los requerimientos mínimos de seguridad establecidos en la normativa vigente. De no estar conforme con los fundamentos del BANCO para no asumir responsabilidad por las operaciones efectuadas con su Tarjeta o con las tarjetas adicionales, el CLIENTE tiene a salvo su derecho de acudir a las instancias administrativas o judiciales para ejercer su derecho al reclamo. Nº Solicitud 1 De no estar conforme con los fundamentos del BANCO para no asumir responsabilidad por las operaciones efectuadas con su Tarjeta o con las tarjetas adicionales, el CLIENTE tiene a salvo su derecho de acudir a las instancias administrativas o judiciales para ejercer su derecho al reclamo.`;
    const BadTerm = `El CLIENTE autoriza que las condiciones pactadas en este contra- to, las comisiones, gastos, intereses compensatorios, intereses moratorios, y/o cualquier otro concepto que se pueda aplicar en caso de incumplimiento en el pago. 3 Siempre que la normativa vigente no lo restrinja, incluyendo lo establecido en el artículo 1341 y siguientes del Código Civil y conforme éstos sean indicados en la Hoja Resumen, podrán ser modificados unilateralmente por el BANCO, de acuerdo con lo dispuesto por el Reglamento de Gestión de Conducta de Mercado, debiendo comunicar ello al CLIENTE, en caso corresponda, con una anticipación de 45 días calendario, o cualquier otro plazo que las disposiciones legales establezcan. Entre otros supuestos y sin que se pueda considerar esta lista como limitativa, las modificaciones a que se refiere el párrafo anterior podrán ser efectuadas por el BANCO como consecuencia de (i) cambios en las condiciones de la economía nacional o internacional; (ii) cambios en el funcionamiento o tendencias de los mercados o la competencia; (iii) cambios en las políticas de gobierno o de Estado que afecten las condiciones del mercado; (iv) impacto de alguna disposición legal sobre costos, características, definición, rentabilidad o condiciones de los productos y servicios bancarios; (v) modificación de las características, definición, rentabilidad o condiciones de los productos por el BANCO; (vi) inflación o deflación; devaluación o revaluación de la moneda; (vii) campañas promocionales; (viii) evaluación crediticia del CLIENTE o de su empleador, de ser el caso; (ix) encarecimiento de los servicios prestados por terceros cuyos costos son trasladados al CLIENTE o de los costos de prestación de los productos y servicios ofrecidos por el BANCO; (x) crisis financiera; o (xi) hechos ajenos a la voluntad de las partes; conmoción social; desastres naturales; terrorismo; guerra; caso fortuito o fuerza mayor. De no estar conforme con tales modificaciones, el CLIENTE podrá resolver este contrato, debiendo para ello: (i) manifestar su disconformidad por escrito, (ii) resolver expresamente este contrato, y (iii) proceder al pago de todo saldo deudor u obligación que mantuviera pendiente frente al BANCO, para lo cual contará con el plazo indicado en la legislación vigente. En caso EL CLIENTE así lo requiera, EL BANCO le otorgará un plazo de 45 días, desde la fecha en que el CLIENTE comunique al BANCO su decisión de resolver este contrato, para que pueda encontrar otro mecanismo de financiamiento. Si las modificaciones estuvieren asociadas a la incorporación de servicios que no se encuentren directamente relacionados a la Tarjeta y que, por ende, no constituyan una condición para contratar, la negativa del CLIENTE no implicará una resolución de este contrato. El silencio del CLIENTE constituye aceptación expresa de las modificaciones informadas por el BANCO. Asimismo, la continuación en el uso de la Tarjeta por parte del CLIENTE, aun cuando haya manifestado su disconformidad, significará su total aceptación de las modificaciones informadas por el BANCO. Sin perjuicio de lo señalado en el párrafo anterior, en el caso de que la modificación se refiera a la ampliación de la Línea de Crédito, para que esta se haga efectiva el CLIENTE deberá dar su consentimiento expreso al BANCO. El CLIENTE dará su consentimiento expreso al BANCO, luego de ser debidamente identificado o autenticado por EL BANCO, a través de canales físicos (presenciales o remotos) o digitales que el BANCO ponga a disposición y comunique al CLIENTE. En caso el CLIENTE no de su consentimiento expreso, la ampliación no surtirá efecto alguno para el CLIENTE. Por su parte, el BANCO procederá con la reducción de la Línea de Crédito a solicitud expresa del cliente a través de canales físicos (presenciales o remotos) o digitales, siempre luego de la identificación o autenticación del CLIENTE. Asimismo, EL BANCO podrá reducir la Línea de Crédito como consecuencia de una modificación unilateral aplicada por EL BANCO como consecuencia de la aplicación de las normas prudenciales emitidas por la Superintendencia. El BANCO pondrá a disposición del CLIENTE la versión vigente de este contrato y las tarifas aplicables en todas sus oficinas, canales de atención al cliente y su página web (www.viabcp.com), por lo que el CLIENTE debe consultar, antes y cada vez que solicite un servicio, el costo del mismo. La realización de transacciones o servicios solicitados por el CLIENTE, presumirán que se ha informado a su satisfacción sobre su costo. El CLIENTE reconoce que los cambios que se introduzcan a este contrato por el BANCO le serán oponibles una vez que le hayan sido comunicados de conformidad con lo señalado en este contrato. Para comunicar las modificaciones referidas (i) a las tasas de interés (compensatorio o moratorio), y/o cualquier otro concepto que aplique por incumplimiento en el pago, siempre que la normativa no lo restrinja, incluyendo lo establecido en el artículo 1341 y siguientes del Código Civil, comisiones y gastos que generen mayores costos al CLIENTE; (ii) a la resolución del contrato por razón distinta al incumplimiento; (iii) a la limitación o exoneración de responsabilidad del BANCO; y/o (iv) a la incorporación de servicios que no se encuentren directamente relacionados con la Tarjeta, el BANCO usará medios de comunicación directa, tales como (a) mensajes en los estados de cuenta; (b) comunicaciones al domicilio del CLIENTE; (c) correos electrónicos; (d) llamadas telefónicas; (e) mensajes de texto (SMS); o (f) mensajería instantánea. Para comunicar modificaciones distintas a las señaladas en el párrafo anterior, campañas comerciales y cualquier otra información relacionada con las operaciones que el CLIENTE tenga con el BANCO, así como modificaciones que sean beneficiosas para el CLIENTE, el BANCO podrá utilizar medios de comunicación tales como avisos en (i) cualquiera de sus oficinas, (ii) su página web, (iii) mensajes a través de Banca por Internet, (iv) notas de cargo, de abono o vouchers de operaciones, en tanto el CLIENTE realice operaciones y el BANCO le envíe o entregue dichas comunicaciones; (v) sus cajeros automáticos, (vi) las redes sociales, o (vii) cualquier diario, periódico o revista de circulación nacional. En caso de existir diferencia en la información de las operaciones del CLIENTE, prevalecerá aquella que se encuentre registrada en el BANCO. De no estar conforme, el CLIENTE tiene a salvo su derecho de acudir a las instancias administrativas o judiciales para ejercer su derecho al reclamo.`;


    const HighlightTermSearched = () => {
        const spans = document.querySelectorAll("span.rpv-core__text-layer-text");
        const badTermWords = BadTerm.split(' ');

        for (let spanIndex = 0; spanIndex < spans.length; spanIndex++) {
            const span = spans[spanIndex] as HTMLElement;
            const text = span.textContent?.trim();

            if (text === undefined || text === null || text === '') continue;

            let textWords = text.split(' ');

            if (badTermWords[0] === textWords[0]) {
                let badTermWordIndex = 0, matchingSpanIndex = spanIndex;
                let mismatched = false;

                while (!mismatched && badTermWordIndex < badTermWords.length && matchingSpanIndex < spans.length) {
                    let matchingWordIndex = 0;

                    const matchingSpan = spans[matchingSpanIndex] as HTMLElement;
                    const matchingText = matchingSpan.textContent?.trim();
                    if (matchingText === undefined || matchingText === null || matchingText === '') { matchingSpanIndex++; continue; }
                    textWords = matchingText.split(' ');

                    while (badTermWordIndex < badTermWords.length && matchingWordIndex < textWords.length) {
                        if (badTermWords[badTermWordIndex] !== textWords[matchingWordIndex]) {
                            mismatched = true;
                            break;
                        }

                        badTermWordIndex++;
                        matchingWordIndex++;
                    }
                    matchingSpanIndex++;
                }

                if (badTermWordIndex === badTermWords.length) {
                    console.log('AQUÍ ESTÁ LA BUSQUEDA!!: ' + spanIndex);

                    let newHighlightAreas: HighlightArea[] = [];

                    for (let i = spanIndex; i < matchingSpanIndex; i++) {
                        const currentSpan = spans[i] as HTMLElement;
                        
                        const pageIndexString = currentSpan.parentElement!.parentElement!.parentElement!.getAttribute('aria-label')!;
                        const pageIndex = Number(pageIndexString.slice(-1)) - 1;

                        const left = currentSpan.style.left.slice(0, -1);
                        const top = currentSpan.style.top.slice(0, -1);

                        let width = currentSpan.offsetWidth;
                        const parentWidth = currentSpan.parentElement!.offsetWidth;
                        width = ((width / parentWidth) * 100);

                        let height = currentSpan.offsetHeight;
                        const parentHeight = currentSpan.parentElement!.offsetHeight;
                        height = (height / parentHeight) * 100;

                        newHighlightAreas.push({
                            pageIndex: pageIndex,
                            left: Number(left),
                            top: Number(top),
                            width: Number(width),
                            height: Number(height),
                        });
                    }

                    setHighlightAreas([
                        ...highlightAreas,
                        ...newHighlightAreas,
                    ]);
                    break;
                }
            }
        }
        console.log('FIN');

    }

    useEffect(() => {
        const timer = setTimeout(() => {
            HighlightTermSearched();
        }, 5000);

        // Limpieza al desmontar
        return () => clearTimeout(timer);
    }, []);




    const renderHighlights = (props: RenderHighlightsProps) => {
        return (
            <>
                {highlightAreas.map((area, index) => {
                    if (props.pageIndex !== area.pageIndex) {
                        return null;
                    }

                    const cssProperties = props.getCssProperties(area, props.rotation);

                    return (
                        <div
                            key={index}
                            style={{
                                ...cssProperties,
                                backgroundColor: 'rgba(255, 255, 0, 0.3)', // Color de resaltado
                                position: 'absolute',
                            }}
                        ></div>
                    );
                })}
            </>
        );
    };


    const highlightPluginInstance = highlightPlugin({
        renderHighlights,
        trigger: Trigger.None,
    });

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer
                fileUrl={props.pdfFile}
                plugins={[defaultLayoutPluginInstance, highlightPluginInstance, pageNavigationPluginInstance]}
                defaultScale={SpecialZoomLevel.PageFit}
                localization={de_ES as unknown as LocalizationMap}
            />;
        </Worker>
    );
};