import React from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import CropUploadComponent from './CropUploadComponent/CropUploadComponent';
import { ImgEditComponent } from './components/ImgEditComponent';

export const theme = createMuiTheme({});

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <h1>Crop, rotate, upload.</h1>

                <div>
                    <ImgEditComponent
                        photoUrl={
                            'http://www.geneva.info/images/geneva-travel-pic-1.jpg'
                        }
                        onFileChange={() => {
                            console.log(
                                'this function will upload 1 image to api'
                            );
                        }}
                        onFileRemove={() => {
                            console.log(
                                'this function will send remove 1 image to api'
                            );
                        }}
                    />
                </div>
            </ThemeProvider>
        </div>
    );
}

export default App;
