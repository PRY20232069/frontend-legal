import React from 'react';
import { RenderHighlightsProps, HighlightArea } from '@react-pdf-viewer/highlight';

interface RenderHighlightsPropsExtended extends RenderHighlightsProps {
    highlightAreas: HighlightArea[];
}

export const HighlightsRenderer: React.FC<RenderHighlightsPropsExtended> = ({ highlightAreas, ...props }) => {
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