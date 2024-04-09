import React, {useState, useEffect} from "react";
import { createRoot } from "react-dom/client";
import { TextField, Button, Typography } from '@mui/material';

const Options: React.FC = () => {
  const [apiUrl, setApiUrl] = useState<string>(''); // State to hold the API URL
  const [savedMessage, setSavedMessage] = useState<string>(''); // State 

  // Load saved configuration when component mounts
  useEffect(() => {
    // Retrieve saved API URL from storage
    const savedApiUrl = localStorage.getItem('flomoApiUrl');
    if (savedApiUrl) {
      setApiUrl(savedApiUrl); // Update apiUrl state with saved value
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // Event handler for form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Handle the API URL (e.g., save it to local storage)
    localStorage.setItem('flomoApiUrl', apiUrl);
    console.log('API URL saved:', apiUrl);
    setSavedMessage('API address saved!');
    setTimeout(() => {
      setSavedMessage(''); // Clear the saved message after a delay
    }, 3000); // Clear message after 3 seconds
    // Additional logic: send apiUrl to backend, etc.
  };

  // Event handler for input field change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiUrl(event.target.value); // Update apiUrl state with input value
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
    <Typography variant="h5" gutterBottom>
      flomo api
    </Typography>
    {savedMessage && (
      <Typography variant="body1" style={{ color: 'green' }}>
        {savedMessage}
      </Typography>
    )}
    <form onSubmit={handleSubmit}>
      <TextField
        label="API Address"
        variant="outlined"
        fullWidth
        value={apiUrl}
        onChange={handleInputChange}
        required
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </form>
  </div>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);
