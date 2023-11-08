import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import IDocumentAnalysis from "../../interfaces/IDocumentAnalysis";

interface IModalDetails {
  open: boolean;
  setOpen: (state: boolean) => void;
  data: IDocumentAnalysis;
  clauseSelected: number;
  setClauseSelected: (state: number) => void;
}

const ModalDetails: React.FC<IModalDetails> = (props) => {
  return (
    <Dialog onClose={() => props.setOpen(false)} open={props.open}>
      <DialogContent>
        {props.clauseSelected >= 0 && (
          <>
            <Typography variant="body2" color="text.secondary">
              {props.data.sentences[props.clauseSelected].interpretation}
            </Typography>
            <br />
            <Typography variant="body2" color="red">
              {
                props.data.sentences[props.clauseSelected]
                  .consumer_protection_law
              }
            </Typography>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetails;
