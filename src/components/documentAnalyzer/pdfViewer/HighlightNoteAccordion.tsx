import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface HighlightNoteAccordionProps {
    title: string;
    content: string;
}

export const HighlightNoteAccordion: React.FC<HighlightNoteAccordionProps> = ({ title, content }) => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {content}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}