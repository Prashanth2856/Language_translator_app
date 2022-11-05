import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Translator.css";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";

const Translator = () => {
  const [text, setText] = useState("");
  const [selectedLang, setSelectedLang] = useState("");
  const [outputText, setOutputText] = useState("");

  const languagesCode = [
    {
      label: "Telugu",
      value: "te",
    },
    {
      label: "Hindi",
      value: "hi",
    },
    {
      label: "Kannada",
      value: "kn",
    },
    {
      label: "Urdu",
      value: "ur",
    },
  ];

  useEffect(() => {
    const Search = async () => {
      const { data } = await axios.post(
        `https://translation.googleapis.com/language/translate/v2`,
        {},
        {
          params: {
            q: text,
            target: selectedLang,
            key: "AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM",
          },
        }
      );
      const translatedText = data.data.translations[0].translatedText;
      setOutputText(translatedText);
    };
    if (selectedLang && text) {
      const timeOut = setTimeout(() => {
        Search();
      }, 500);
      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [text, selectedLang]);

  return (
    <div>
      <h1 className="header">
        {" "}
        <span>Language</span> <span>Translator</span> <span>App</span>{" "}
      </h1>
      <TextField
        inputProps={{
          style: { fontSize: "1.5rem" },
        }}
        InputLabelProps={{
          style: { fontSize: "1.3rem", color:"red" },
        }}
        id="outlined-basic"
        label="Enter your input text here..!"
        variant="outlined"
        sx={{ width: "50%", marginBottom: "10px" }}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <FormControl style={{ margin: "auto", width: "7%" }}>
        <InputLabel id="demo-simple-select-label" style={{color: "green", fontWeight: "bold"}}>Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedLang}
          label="Language"
          onChange={(e) => setSelectedLang(e.target.value)}
        >
          {languagesCode.map((lang) => (
            <MenuItem key={lang.value} value={lang.value}>
              {lang.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="outputText">
        <h2>{outputText}</h2>
      </div>
    </div>
  );
};

export default Translator;
