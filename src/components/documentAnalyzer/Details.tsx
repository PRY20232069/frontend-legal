import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IDocumentAnalysis from "../../interfaces/IDocumentAnalysis";
import InfoIcon from "@mui/icons-material/Info";

interface IDetails {
  data: IDocumentAnalysis;
  clauseSelected: number;
  setClauseSelected: (state: number) => void;
}

const Details: React.FC<IDetails> = (props) => {
  return (
    <Box
      sx={{
        mt: 11,
        mb: 3,
        mx: 2,
      }}
    >
      <Card sx={{ minHeight: "75vh" }}>
        <CardContent>
          {props.clauseSelected >= 0 ? (
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
          ) : (
            <div style={{ textAlign: "center" }}>
              <InfoIcon sx={{ color: "grey" }} />
              <Typography variant="body2" color="text.secondary">
                Cuando selecicones una cláusula abusiva, se mostrará la
                información detallada.
              </Typography>
            </div>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Details;
