import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { HighlightArea } from '@react-pdf-viewer/highlight';

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
            <div>
                <span style={{ color: 'red' }}>¿Por qué esta cláusula puede perjudicarte?:</span>
                {note.interpretation}
            </div>
            <div>
                <span style={{ color: 'red' }}>Ley de protección al consumidor:</span>
                {note.consumer_protection_law}
            </div>
        </div>
    );
}




// export default function BasicAccordion() {
//     return (
//       <div>
//         <Accordion>
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             aria-controls="panel1a-content"
//             id="panel1a-header"
//           >
//             <Typography>Accordion 1</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//               malesuada lacus ex, sit amet blandit leo lobortis eget.
//             </Typography>
//           </AccordionDetails>
//         </Accordion>
//         <Accordion>
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             aria-controls="panel2a-content"
//             id="panel2a-header"
//           >
//             <Typography>Accordion 2</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//               malesuada lacus ex, sit amet blandit leo lobortis eget.
//             </Typography>
//           </AccordionDetails>
//         </Accordion>
//         <Accordion disabled>
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             aria-controls="panel3a-content"
//             id="panel3a-header"
//           >
//             <Typography>Disabled Accordion</Typography>
//           </AccordionSummary>
//         </Accordion>
//       </div>
//     );
//   }
