import { Box } from "@mui/material";
import { DrawerHeader } from "../Material";

export const PageContainer = (props: any) => {
    return (
        <Box component="main" style={{ width: '100%' }}>
            <DrawerHeader />
            <div style={{ margin: '40px 70px' }}>
                {props.children}
            </div>
        </Box>
    );
};