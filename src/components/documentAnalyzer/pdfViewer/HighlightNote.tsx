import * as React from 'react';
import { HighlightArea } from '@react-pdf-viewer/highlight';
import { HighlightNoteAccordion } from './HighlightNoteAccordion';

interface HighlightNote {
    id: number;
    interpretation: string;
    consumer_protection_law: string;
    highlightAreas: HighlightArea[];
    description: string;
}

interface HighlightNoteProps {
    note: HighlightNote;
    jumpToHighlightArea: (highlightArea: HighlightArea) => void;
}

export const HighlightNote: React.FC<HighlightNoteProps> = ({ note, jumpToHighlightArea }) => {
    return (
        <div key={note.id} style={{ borderBottom: '1px solid rgba(0, 0, 0, .3)', cursor: 'pointer', padding: '8px', }}
            onClick={() => jumpToHighlightArea({
                ...note.highlightAreas[0],
                top: note.highlightAreas[0].top - 0.8,
            })}
        >
            <blockquote style={{ borderLeft: '2px solid rgba(0, 0, 0, 0.2)', fontSize: '.75rem', lineHeight: 1.5, margin: '0 0 8px 0', paddingLeft: '8px', textAlign: 'justify', }}>
                {note.description}
            </blockquote>
            <HighlightNoteAccordion title='¿Por qué esta cláusula puede perjudicarte?' content={note.interpretation} />
            <HighlightNoteAccordion title='Ley de protección al consumidor' content={note.consumer_protection_law} />
        </div>
    );
}