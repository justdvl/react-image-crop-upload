import React, { useState, useRef } from 'react';
import { CropModal } from './CropModal';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    })
);

const CropUploadComponent = ({
    onFileChange = () => {
        console.log('Please provide onFileChange function');
    },
    operation = 'upload',
}) => {
    const classes = useStyles();
    const [src, setSrc] = useState(null);
    const [image, setImage] = useState({ preview: undefined, file: null });
    const cropper = useRef();
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);

    const onChange = (e) => {
        //initial upload into img shown in modal
        e.preventDefault();
        let files;
        if (e.dataTransfer) files = e.dataTransfer.files;
        else if (e.target) files = e.target.files;
        const reader = new FileReader();
        reader.onload = () => {
            setSrc(reader.result);
            setImage({ preview: reader.result, file: files[0] });
            setOpen(true);
        };
        reader.readAsDataURL(files[0]);
    };

    const sendToServer = async () => {
        //cropped img from modal to server

        const formData = new FormData();
        let blob = await fetch(image.preview).then((r) => r.blob());
        formData.append('img-edit', blob);

        onFileChange(formData);
        setOpen(false);
    };

    if (open) {
        return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <div>
                    <Fade in={open}>
                        <div>
                            <CropModal
                                src={src}
                                cropper={cropper}
                                setImage={setImage}
                                image={image}
                                sendToServer={sendToServer}
                            />
                        </div>
                    </Fade>
                </div>
            </Modal>
        );
    }

    return (
        <div className="App">
            <div>
                <input
                    accept="image/*"
                    // className={classes.input}
                    id={`file-0-${operation}`}
                    multiple
                    type="file"
                    onChange={onChange}
                    name="myfile"
                    style={{ display: 'none' }}
                />
                <label htmlFor={`file-0-${operation}`}>
                    <Button
                        // @ts-ignore
                        variant="upload"
                        component="span"
                        size="small"
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload image
                    </Button>
                </label>
            </div>
        </div>
    );
};

export default CropUploadComponent;
