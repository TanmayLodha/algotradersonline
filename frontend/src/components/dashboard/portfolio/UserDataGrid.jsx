import React from "react";
import {
  Card,
  CardContent,
  LinearProgress,
  Box,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridFooterContainer,
  GridFooter,
} from "@mui/x-data-grid";
import clsx from "clsx";

function CustomToolbar(props) {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  today = dd + "/" + mm + "/" + yyyy;

  return (
    <GridToolbarContainer
      {...props}
      sx={{ display: "flex", justifyContent: "space-between" }}>
      <GridToolbarExport
        csvOptions={{
          fileName: `Trades as of ${today}`,
          allColumns: true,
        }}
        sx={{ m: 1, p: 1, fontSize: "1rem" }}
      />
      <GridToolbarQuickFilter variant="outlined" sx={{ m: 1 }} />
    </GridToolbarContainer>
  );
}

function CustomNoRowsOverlay() {
  return (
    <Box
      sx={{
        m: 2,
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "600",
        fontSize: "2rem",
      }}>
      No Trades Made in this duration.
    </Box>
  );
}

const CustomFooter = () => {
  return (
    <GridFooterContainer>
      <Typography
        variant="subtitle2"
        sx={{ ml: 2, opacity: 0.7, fontSize: "0.8rem" }}>
        *Net P/L is calculated after subtracting extra charges. To get a
        detailed report, export this table by clicking the export button.
      </Typography>
      <GridFooter
        sx={{
          border: "none",
          mr: 2,
        }}
      />
    </GridFooterContainer>
  );
};

const UserDataGrid = ({ data }) => {
  const columns = [
    {
      field: "date",
      headerName: "Date",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "name",
      headerName: "Stock Name",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "signal",
      headerName: "Signal",
      headerClassName: "super-app-theme--header",
      flex: 1,
      hide: true,
    },
    {
      field: "start_time",
      headerName: "Trade started at",
      headerClassName: "super-app-theme--header",
      flex: 1,
      hide: true,
    },
    {
      field: "end_time",
      headerName: "Trade ended at",
      headerClassName: "super-app-theme--header",
      flex: 1,
      hide: true,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "buy_price",
      headerName: "Buy Price",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "sell_price",
      headerName: "Sell Price",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "target",
      headerName: "Target",
      headerClassName: "super-app-theme--header",
      flex: 1,
      hide: true,
    },
    {
      field: "stop_loss",
      headerName: "Stop loss",
      headerClassName: "super-app-theme--header",
      flex: 1,
      hide: true,
    },
    {
      field: "current_volume",
      headerName: "Volume when trade started",
      headerClassName: "super-app-theme--header",
      flex: 1,
      hide: true,
    },
    {
      field: "historical_volume",
      headerName: "Historical Volume",
      headerClassName: "super-app-theme--header",
      flex: 1,
      hide: true,
    },
    {
      field: "net_charges",
      headerName: "Net Charges",
      headerClassName: "super-app-theme--header",
      flex: 1,
      hide: true,
    },

    {
      field: "net_pl",
      headerName: "*Net P/L",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 100,
      cellClassName: (params) => {
        return clsx("super-app", {
          negative: params.value < 0,
          positive: params.value >= 0,
        });
      },
      valueFormatter: (params) => {
        const valueFormatted = Number(params.value).toLocaleString("en-IN", {
          maximumFractionDigits: 2,
        });
        return `₹ ${valueFormatted}`;
      },
    },
  ];
  return (
    <>
      <Card
        sx={{
          mt: 1,
          ml: 3,
          mb: 2,
          borderRadius: 3,
          boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.1)",
          transition: " all .15s ease-in-out",
          "& .super-app-theme--header": {
            fontSize: "1.2rem",
          },
          "& .super-app.negative": {
            color: "red",
          },
          "& .super-app.positive": {
            color: "green",
          },
        }}>
        <CardContent>
          <DataGrid
            autoHeight
            disableSelectionOnClick
            density="comfortable"
            rows={data}
            columns={columns}
            loading={false} //dynamic
            components={{
              Toolbar: CustomToolbar,
              LoadingOverlay: LinearProgress,
              NoRowsOverlay: CustomNoRowsOverlay,
              Footer: CustomFooter,
            }}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default UserDataGrid;
