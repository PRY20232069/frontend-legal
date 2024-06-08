// React PDF Viewer
import {
  LocalizationMap,
  Viewer,
  SpecialZoomLevel,
  Worker,
} from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

// Default Layout
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// Highlight
import {
  HighlightArea,
  RenderHighlightsProps,
  highlightPlugin,
} from "@react-pdf-viewer/highlight";
import "@react-pdf-viewer/highlight/lib/styles/index.css";
import { Trigger } from "@react-pdf-viewer/highlight";

// Location
import de_ES from "@react-pdf-viewer/locales/lib/es_ES.json";

// Page Navigation
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import { useEffect, useState } from "react";

// Tool Bar
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import type {
  ToolbarProps,
  ToolbarSlot,
  TransformToolbarSlot,
} from "@react-pdf-viewer/toolbar";

// PDF Utils
import { HighlightTermSearched } from "../../../shared/utils/pdf-utils";
import { HighlightsRenderer } from "./HighlightRenderer";
import React from "react";
import { TermResource } from "../../../resources/responses/TermResource";
import { HighlightNote } from "./HighlightNote";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

interface PDFViewerProps {
  fileUrl: string;
  badTerms: TermResource[];
}

interface CanShowBadTerms {
  documentLoaded: boolean;
  badTermsLoaded: boolean;
}

interface Note {
  id: number;
  interpretation: string;
  consumer_protection_law: string;
  highlightAreas: HighlightArea[];
  description: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl, badTerms }) => {
  const transform: TransformToolbarSlot = (slot: ToolbarSlot) => {
    const { NumberOfPages } = slot;

    return Object.assign({}, slot, {
      ...slot,
      Open: () => <></>,
      OpenMenuItem: () => <></>,
      Search: () => <></>,
      ShowSearchPopover: () => <></>,
      EnterFullScreen: () => <></>,
      EnterFullScreenMenuItem: () => <></>,
      SwitchTheme: () => <></>,
      SwitchThemeMenuItem: () => <></>,
      NumberOfPages: () => (
        <>
          / <NumberOfPages />
        </>
      ),
    });
  };

  const renderToolbar = (
    Toolbar: (props: ToolbarProps) => React.ReactElement
  ) => <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>;

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [],
    renderToolbar,
  });
  const { renderDefaultToolbar } =
    defaultLayoutPluginInstance.toolbarPluginInstance;
  const toolbarPluginInstance = toolbarPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin({
    enableShortcuts: true,
  });
  const [canShowBadTerms, setCanShowBadTerms] = useState<CanShowBadTerms>({
    documentLoaded: false,
    badTermsLoaded: false,
  });

  const [highlightAreas, setHighlightAreas] = React.useState<HighlightArea[]>(
    []
  );
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const noteEles: Map<number, HTMLElement> = new Map();

  useEffect(() => {
    setCanShowBadTerms({
      ...canShowBadTerms,
      badTermsLoaded: true,
    });
  }, [badTerms]);

  useEffect(() => {
    console.log("canShowBadTerms");
    console.log(canShowBadTerms);
    if (!canShowBadTerms.documentLoaded || !canShowBadTerms.badTermsLoaded) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      let allNewHighlightAreas: HighlightArea[] = [];
      let notes: Note[] = [];

      for (let i = 0; i < badTerms.length; i++) {
        const badTerm = badTerms[i].description;

        const newHighlightAreas = HighlightTermSearched(badTerm, i);

        if (newHighlightAreas.length === 0) {
          continue;
        }

        allNewHighlightAreas = [...allNewHighlightAreas, ...newHighlightAreas];

        notes = [
          ...notes,
          {
            id: i + 1,
            interpretation: badTerms[i].interpretation.replace("===", ""),
            highlightAreas: [newHighlightAreas[0]],
            description: `${badTerm.substring(0, 500)}${
              badTerm.length > 500 ? "..." : ""
            }`,
            consumer_protection_law: badTerms[i].consumer_protection_law,
          },
        ];
      }

      if (allNewHighlightAreas.length === 0) {
        console.log("No se encontraron cláusulas abusivas para resaltar");
      }

      setHighlightAreas(allNewHighlightAreas);
      setNotes(notes);
      setLoading(false);
    }, 4000);
  }, [canShowBadTerms]);

  const onDocumentLoad = () => {
    setCanShowBadTerms({
      ...canShowBadTerms,
      documentLoaded: true,
    });
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
      <div
        style={{
          border: "1px solid rgba(0, 0, 0, 0.3)",
          display: "flex",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div style={{ flex: "1 1 0", overflow: "auto" }}>
          <Viewer
            fileUrl={fileUrl}
            plugins={[
              defaultLayoutPluginInstance,
              highlightPluginInstance,
              pageNavigationPluginInstance,
              toolbarPluginInstance,
            ]}
            defaultScale={SpecialZoomLevel.PageFit}
            localization={de_ES as unknown as LocalizationMap}
            onDocumentLoad={onDocumentLoad}
          />
        </div>
        <div
          style={{
            borderLeft: "1px solid rgba(0, 0, 0, 0.3)",
            width: "25%",
            overflow: "auto",
            background: "#FCFCFC",
          }}
        >
          <Typography variant="body2" color="#193A32" sx={{ ml: 2, my: 1 }}>
            Comentarios
          </Typography>
          {loading ? (
            <div
              style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <CircularProgress color="primary" />
              <Typography
                variant="body2"
                color="primary"
                sx={{ mt: 2, fontWeight: "bold" }}
              >
                Cargando...
              </Typography>
            </div>
          ) : (
            <>
              {notes.length === 0 && (
                <div style={{ textAlign: "center" }}>
                  Tras analizar el contrato, no se hallaron cláusulas abusivas;
                  todas las disposiciones están en conformidad con las
                  normativas vigentes.
                </div>
              )}
              {notes.map((note) => {
                return (
                  <HighlightNote
                    key={note.id}
                    note={note}
                    jumpToHighlightArea={jumpToHighlightArea}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </Worker>
  );
};
