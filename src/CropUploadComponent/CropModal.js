import React, { useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { faUndo } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 766,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

    root: {
        width: 300,
    },
    margin: {
        height: theme.spacing(3),
    },
}));

const marks = [
    {
        value: -90,
        label: 'left',
    },
    { value: 0, label: 'original' },
    {
        value: 90,
        label: 'right',
    },
];

function valuetext(value) {
    return `${value}°C`;
}

export const CropModal = ({ src, cropper, image, setImage, sendToServer }) => {
    const [rotateDegree, setRotateDegree] = useState(0);
    const classes = useStyles();

    React.useEffect(() => {
        //to set preview to cropped image, several time just in case
        setTimeout(() => {
            onCrop();
        }, 1);
        setTimeout(() => {
            onCrop();
        }, 100);
        setTimeout(() => {
            onCrop();
        }, 600);
        setTimeout(() => {
            onCrop();
        }, 1500);
    }, []);

    const handleRotateChange = (v) => {
        setRotateDegree(v);
        cropper.current.rotate(v - rotateDegree);
        const dataURL = cropper.current.getCroppedCanvas().toDataURL();
        setImage((image) => ({ ...image, preview: dataURL }));
    };

    const onCrop = () => {
        const dataURL = cropper.current?.getCroppedCanvas()?.toDataURL();
        if (dataURL) {
            setImage((image) => ({ ...image, preview: dataURL }));
        }
    };

    const rotateRight = () => {
        handleRotateChange(Math.floor(rotateDegree / 90) * 90 + 90);
    };
    const rotateLeft = () => {
        handleRotateChange(Math.ceil(rotateDegree / 90) * 90 - 90);
    };

    return (
        <div className={classes.paper}>
            <div className="Cropper">
                <Typography
                    variant="h3"
                    style={{ marginBottom: 20, marginTop: 20 }}
                >
                    Please crop image:
                </Typography>
                <Cropper
                    ref={cropper}
                    src={src}
                    style={{ width: 700, height: 700 }}
                    rotatable
                    cropend={onCrop}
                    aspectRatio={1 / 1}
                    autoCropArea={1}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    placeContent: 'space-between',
                    width: 700,
                    marginTop: 20,
                }}
            >
                <div>
                    <label>
                        <Typography component="h5" variant="h5">
                            'Rotate image:
                        </Typography>
                        <div style={{ display: 'flex', marginTop: 15 }}>
                            <div
                                style={{ marginRight: 15, userSelect: 'none' }}
                                onClick={rotateLeft}
                            >
                                <FontAwesomeIcon
                                    icon={faUndo}
                                    style={{ color: '#333', cursor: 'pointer' }}
                                    size="3x"
                                />
                            </div>
                            <Slider
                                defaultValue={0}
                                value={rotateDegree}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider-custom"
                                step={1}
                                valueLabelDisplay="auto"
                                marks={marks}
                                min={-180}
                                max={180}
                                onChange={(e, v) => {
                                    handleRotateChange(v);
                                }}
                                style={{ width: 350 }}
                            />
                            <div
                                style={{ marginLeft: 15, userSelect: 'none' }}
                                onClick={rotateRight}
                            >
                                <FontAwesomeIcon
                                    icon={faRedo}
                                    style={{ color: '#333', cursor: 'pointer' }}
                                    size="3x"
                                />
                            </div>
                        </div>
                    </label>
                </div>

                <div
                    style={{
                        display: 'flex',
                        alignSelf: 'flex-end',
                        marginBottom: 10,
                        height: 50,
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={sendToServer}
                    >
                        Upload cropped image
                    </Button>
                </div>
            </div>
        </div>
    );
};
