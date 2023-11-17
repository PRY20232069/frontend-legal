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
import React from 'react';

interface PDFViewerProps {
    fileUrl: string;
}

interface Note {
    id: number;
    content: string;
    highlightAreas: HighlightArea[];
    quote: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const pageNavigationPluginInstance = pageNavigationPlugin({
        enableShortcuts: true,
    });

    const [highlightAreas, setHighlightAreas] = React.useState<HighlightArea[]>([]);

    const [notes, setNotes] = React.useState<Note[]>([]);
    const noteEles: Map<number, HTMLElement> = new Map();

    const onDocumentLoad = () => {

        // setTimeout(() => {
        //     getAllTextForEachPage();
        // }, 1000);

        setTimeout(() => {
            let allNewHighlightAreas: HighlightArea[] = [];
            let notes: Note[] = [];

            for (let i = 0; i < BadTerms.length; i++) {
                const badTerm = BadTerms[i];

                const newHighlightAreas = HighlightTermSearched(badTerm);
                allNewHighlightAreas = [...allNewHighlightAreas, ...newHighlightAreas];
                
                notes = [...notes, {
                    id: i + 1,
                    content: `Cláusula abusiva: ${i + 1}`,
                    highlightAreas: [ newHighlightAreas[0] ],
                    quote: badTerm.substring(0, 200),
                }];
            }

            setHighlightAreas(allNewHighlightAreas);
            setNotes(notes);
        }, 3000);
    };

    const jumpToNote = (note: Note) => {
        if (noteEles.has(note.id)) {
            noteEles.get(note.id)?.scrollIntoView();
        }
    };

    const renderHighlights = (props: RenderHighlightsProps) => {
        return <HighlightsRenderer highlightAreas={highlightAreas} {...props} />;
    };


    const highlightPluginInstance = highlightPlugin({
        renderHighlights,
        trigger: Trigger.None,
    });

    const { jumpToHighlightArea } = highlightPluginInstance;

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.3)', display: 'flex', height: '700px', overflow: 'hidden', }}>
                <div style={{ flex: '1 1 0', overflow: 'auto', }}>
                    <Viewer
                        fileUrl={fileUrl}
                        plugins={[defaultLayoutPluginInstance, highlightPluginInstance, pageNavigationPluginInstance]}
                        defaultScale={SpecialZoomLevel.PageFit}
                        localization={de_ES as unknown as LocalizationMap}
                        onDocumentLoad={onDocumentLoad}
                    />
                </div>
                <div style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.3)', width: '25%', overflow: 'auto', }}>
                    {notes.length === 0 && <div style={{ textAlign: 'center' }}>Tras analizar el contrato, no se hallaron cláusulas abusivas; todas las disposiciones están en conformidad con las normativas vigentes.</div>}
                    {notes.map((note) => {
                        return (
                            <div key={note.id} style={{ borderBottom: '1px solid rgba(0, 0, 0, .3)', cursor: 'pointer', padding: '8px', }} onClick={() => jumpToHighlightArea(note.highlightAreas[0])}>
                                <blockquote style={{ borderLeft: '2px solid rgba(0, 0, 0, 0.2)', fontSize: '.75rem', lineHeight: 1.5, margin: '0 0 8px 0', paddingLeft: '8px', textAlign: 'justify', }}>
                                    {note.quote}
                                </blockquote>
                                {note.content}
                            </div>
                        );
                    })}
                </div>
            </div>
        </Worker>
    );
};