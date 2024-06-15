import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface HighlightNoteAccordionProps {
  title: string;
  content: string;
  bgColor: any;
}

export const HighlightNoteAccordion: React.FC<HighlightNoteAccordionProps> = ({
  title,
  content,
  bgColor,
}) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ backgroundColor: bgColor }}
      >
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ backgroundColor: bgColor }}>
        <Typography variant="body2">{content}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};
