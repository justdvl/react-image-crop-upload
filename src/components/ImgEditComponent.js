import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ModalImage from 'react-modal-image';

import Button from '@material-ui/core/Button';
import { Typography, Paper } from '@material-ui/core';
import CropUploadComponent from '../CropUploadComponent/CropUploadComponent';

// interface ImgEditComponentProps {
//     operation: string;
//     onFileChange: any;
//     photoUrl: string;
//     setPhotoUrl: Function;
//     uploading: boolean;
// }

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: '180px',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        input: {
            display: 'none',
        },
    })
);

export const ImgEditComponent = ({
    operation,
    onFileChange,
    photoUrl,
    setPhotoUrl,
    uploading,
}) => {
    const classes = useStyles();

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Add images
            </Typography>
            <Paper style={{ display: 'flex', marginTop: 10 }}>
                <div className={classes.root}>
                    <CropUploadComponent
                        onFileChange={onFileChange}
                        operation={operation}
                    />

                    {photoUrl && (
                        <Button
                            onClick={() => setPhotoUrl('')}
                            // @ts-ignore
                            variant="delete"
                            component="span"
                            size="small"
                        >
                            Delete
                        </Button>
                    )}
                </div>
                <div style={{ fontSize: '2rem', marginTop: 13 }}>
                    {photoUrl && (
                        <ModalImage
                            small={photoUrl}
                            large={photoUrl}
                            alt="You logo"
                        />
                    )}
                    {uploading && (
                        <FontAwesomeIcon
                            icon={faSpinner}
                            style={{ color: 'blue' }}
                            spin
                        />
                    )}
                </div>
            </Paper>
        </div>
    );
};
