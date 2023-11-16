import { HighlightArea } from "@react-pdf-viewer/highlight";

export const getAllTextForEachPage = () => {
    const divs = document.getElementsByClassName("rpv-core__inner-page-container");

    for (let i = 0; i < divs.length; i++) {
        let text = "";
        const selectedDiv = divs[i];

        // encontrar divs dentro del selectedDiv con la clase rpv-core__text-layer. Ese div debe estar dentro del selectedDiv
        const textLayerDiv = selectedDiv.getElementsByClassName("rpv-core__text-layer")[0];

        if (textLayerDiv === undefined) continue;
        // encontrar spans dentro del textLayerDiv con las clase rpv-core__text-layer-text. Filtra los elementos por tipo span y clase rpv-core__text-layer-text
        const spans = textLayerDiv.querySelectorAll("span.rpv-core__text-layer-text");

        for (let j = 0; j < spans.length; j++) {
            const span = spans[j];
            // const text = span.textContent;

            text += span.textContent;
        }
        // console.log(text);
    }
};

export const HighlightTermSearched = (BadTerm: string): HighlightArea[] => {
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

                let newHighlightAreas: HighlightArea[] = [];

                for (let i = spanIndex; i < matchingSpanIndex; i++) {
                    const currentSpan = spans[i] as HTMLElement;

                    const pageIndexString = currentSpan.parentElement!.parentElement!.parentElement!.getAttribute('aria-label')!;
                    const pageIndex = Number(pageIndexString.slice(-1)) - 1;

                    const left = currentSpan.style.left.slice(0, -1);
                    const top = currentSpan.style.top.slice(0, -1);

                    let transform = window.getComputedStyle(currentSpan).transform;
                    let scaleX = (!transform || transform === 'none') ? 1 : Number(transform.split('(')[1].split(',')[0]);
                    
                    let width = currentSpan.offsetWidth * scaleX;

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

                return newHighlightAreas
            }
        }
    }
    console.log('FIN');
    return [];
}