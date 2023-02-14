import { useState } from "react";

import styles from "./App.module.css";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Footer from "./components/Footer";
import Cookie from "./components/Cookie";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontSize: "1.3rem",
}));

function App() {
  const [points, setPoints] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [multiplierPrice, setMultiplierPrice] = useState(50);

  const [cookieMultiplier, setCookieMultiplier] = useState(1);
  const [cookieMultiplierPrice, setCookieMultiplierPrice] = useState(250);

  const round = (num) => {
    return Number((Math.round(num * 10) / 10).toFixed(1));
  };

  const cookieMultiplierHandler = () => {
    if (points >= cookieMultiplierPrice) {
      setPoints(round(points) - round(cookieMultiplierPrice));
      setCookieMultiplierPrice(round(cookieMultiplierPrice) * 4);
      setCookieMultiplier(cookieMultiplier + 1);
    } else {
      alert("Sorry, you do not have enough points");
    }
  };

  const multiplierHandler = () => {
    if (points >= multiplierPrice) {
      setPoints(round(points) - round(multiplierPrice));
      setMultiplierPrice(round(multiplierPrice) * 1.5);
      setMultiplier(multiplier + 0.5);
    } else {
      alert("Sorry, you do not have enough points");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.App}>
        <header className={styles.header}>
          <h1>Cookie Clicker</h1>

          <Cookie
            pts={points}
            sPoints={setPoints}
            multi={multiplier}
            cookieMulti={cookieMultiplier}
          />
          <p className={styles.instructions}>
            Click on the image to earn <strong>cookies</strong>
          </p>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 2 }}
            divider={<Divider orientation="vertical" flexItem />}
            mb="50px"
          >
            <Item className={styles.item}>Cookies: {round(points)}</Item>
            <Item className={styles.item}>Multiplier: {multiplier}x</Item>
            <Item className={styles.item}>
              Cookie Multiplier: {cookieMultiplier}x
            </Item>
          </Stack>

          <Stack
            spacing={2}
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Button
              variant="contained"
              onClick={multiplierHandler}
              style={{
                textTransform: "none",
                display: "block",
                fontSize: "1.25rem",
                lineHeight: "1.5",
              }}
            >
              Click Multiplier<br></br>
              <span className={styles.upgradePrice}>
                ({round(multiplierPrice)} Cookies)
              </span>
            </Button>
            <Button
              variant="contained"
              onClick={cookieMultiplierHandler}
              style={{
                textTransform: "none",
                display: "block",
                fontSize: "1.25rem",
                lineHeight: "1.5",
              }}
              disabled={cookieMultiplier === 4 ? true : false}
            >
              New Cookie<br></br>
              <span className={styles.upgradePrice}>
                {cookieMultiplier === 4
                  ? "(MAX)"
                  : `(${round(cookieMultiplierPrice)} Cookies)`}
              </span>
            </Button>
          </Stack>
        </header>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
