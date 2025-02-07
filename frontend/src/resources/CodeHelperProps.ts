interface CodeHelperProps {
    displayCodeHelper: boolean;
    handleRunCode: () => void; // Assuming this is a function
    outputFromAPI: string | ''; // Assuming output is a string or null
    SetLanguage: (language: string) => void; // Function to set the language
    language: string | ''; // Function to set the language
}

export default CodeHelperProps