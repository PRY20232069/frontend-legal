import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IDocumentAnalysis from "../../interfaces/IDocumentAnalysis";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { ContainedButton } from "../shared/Material";
import { useTheme, useMediaQuery } from "@mui/material";

interface IDocument {
  data: IDocumentAnalysis;
  clauseSelected: number;
  setClauseSelected: (state: number) => void;
  pageSelected: number;
  setPageSelected: (state: number) => void;
  setOpenModalDetails: (state: boolean) => void;
}

const Document: React.FC<IDocument> = (props) => {
  const theme = useTheme();
  const isScreenWide = useMediaQuery(theme.breakpoints.down("md"));

  const handleButtons = (x: String) => {
    if (x === "back") {
      if (props.pageSelected > 1) {
        props.setPageSelected(props.pageSelected - 1);
      }
    } else if (x === "next") {
      if (props.pageSelected < props.data.num_pages) {
        props.setPageSelected(props.pageSelected + 1);
      }
    }

    props.setClauseSelected(-1);
  };

  return (
    <Box
      sx={{
        my: 3,
        mx: 4,
      }}
    >
      <Grid2
        container
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Grid2>
          <ContainedButton onClick={() => handleButtons("back")}>
            {"<"}
          </ContainedButton>
        </Grid2>
        <Grid2>
          <Typography
            sx={{
              ml: 4,
              mr: 1,
              pt: 0.5,
              px: 1,
              justifyContent: "center",
              backgroundColor: "white",
            }}
            variant="body2"
            color="text.secondary"
          >
            {props.pageSelected}
          </Typography>
        </Grid2>
        <Grid2>
          <Typography
            sx={{
              mr: 3,
              pt: 0.5,
              color: "white",
            }}
            variant="body2"
            color="text.secondary"
          >
            de {props.data.num_pages}
          </Typography>
        </Grid2>
        <Grid2>
          <ContainedButton onClick={() => handleButtons("next")}>
            {">"}
          </ContainedButton>
        </Grid2>
      </Grid2>
      <br />
      <Card sx={{}}>
        <CardContent sx={{ maxHeight: "75vh", overflowY: "auto" }}>
          <Typography
            variant="h6"
            component="div"
            style={{ textAlign: "center" }}
          >
            {props.data.title}
          </Typography>
          <br />
          {props.data.sentences.map((sentence, index) => (
            <React.Fragment key={index}>
              {sentence.page === props.pageSelected && (
                <>
                  {sentence.interpretation === "" ? (
                    <Typography variant="body2" color="text.secondary">
                      {sentence.description}
                    </Typography>
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ backgroundColor: "yellow", cursor: "pointer" }}
                      onClick={() => {
                        props.setClauseSelected(index);
                        if (isScreenWide) {
                          props.setOpenModalDetails(true);
                        }
                      }}
                    >
                      {sentence.description}
                    </Typography>
                  )}
                  <br />
                </>
              )}
            </React.Fragment>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Document;
