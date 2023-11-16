// React PDF Viewer
import { LocalizationMap, Viewer, SpecialZoomLevel, Worker } from '@react-pdf-viewer/core';
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
import { useState } from 'react';

// PDF Utils
import { HighlightTermSearched, getAllTextForEachPage } from '../../../shared/utils/pdf-utils';
import { BadTerms } from '../saving';
import { HighlightsRenderer } from './HighlightRenderer';


export const PDFViewerContainer = (props: any) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const pageNavigationPluginInstance = pageNavigationPlugin({
        enableShortcuts: true,
    });

    const [highlightAreas, setHighlightAreas] = useState<HighlightArea[]>([]);

    const onDocumentLoad = () => {
        
        setTimeout(() => {
            getAllTextForEachPage();
        }, 1000);
        
        setTimeout(() => {
            // const newHighlightAreas = HighlightTermSearched(BadTerms);
            // setHighlightAreas([
            //     ...highlightAreas,
            //     ...newHighlightAreas,
            // ]);
        }, 2000);
    };



    const renderHighlights = (props: RenderHighlightsProps) => {
        return <HighlightsRenderer highlightAreas={highlightAreas} {...props} />;
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
                onDocumentLoad={onDocumentLoad}
            />
        </Worker>
    );
};