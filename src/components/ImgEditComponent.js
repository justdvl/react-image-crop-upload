import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { GridListTile, GridList, Grow, IconButton, GridListTileBar } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import ModalImage from 'react-modal-image';

import Button from '@material-ui/core/Button';
import { Typography, Paper } from '@material-ui/core';
import CropUploadComponent from '../CropUploadComponent/CropUploadComponent';
import ImageCarousel from './ImageCarousel';
import { act } from 'react-dom/test-utils';

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
        imageList: {
            margin: '20px 0',
            width: 610
        },
        imageItem: {
            height: 121,
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            cursor: 'pointer'
        }
    })
);

export const ImgEditComponent = ({
    operation,
    onFileChange,
    onFileRemove,
    photoUrl,
    setPhotoUrl,
    uploading,
}) => {
    const classes = useStyles();
    const [carouselState, setCarouselState] = React.useState(false);
    const [activeImg, setActive] = React.useState(0);

    const openCarousel = (idx) => {
        setActive(idx);
        setCarouselState(true);
    }

    const deleteImage = (idx) => {
        const imageList = [...photoUrl];
        imageList.splice(idx, 1);
        setPhotoUrl(imageList);
    }

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Add images
            </Typography>
            <Paper style={{ display: 'flex', marginTop: 10 }}>
                <div className={classes.root}>
                    <CropUploadComponent
                        onFileChange={onFileChange}
                        onFileRemove={onFileRemove}
                        operation={operation}
                        photo={photoUrl}
                        setPhoto={setPhotoUrl}
                    />

                    {photoUrl && (
                        <Button
                            onClick={() => setPhotoUrl([])}
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
                    {photoUrl.length > 0 && (
                        <GridList cellHeight={121} className={classes.imageList} cols={5}>
                        {photoUrl.map((tile, idx) => (
                            <GridListTile classes={{ tile: classes.imageItem }} key={idx} cols={1} rows={1}>
                                <img src={tile} alt="your logo" className={classes.image} onClick={() => openCarousel(idx)} />
                                <GridListTileBar
                                    titlePosition="top"
                                    actionIcon={
                                        <IconButton className={classes.icon} onClick={() => deleteImage(idx)}  style={{ color: 'red' }}>
                                            <CancelIcon size={50} />
                                        </IconButton>
                                    }
                                    actionPosition="right"
                                    className={classes.titleBar}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
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
            {
                (<Grow in={carouselState}><ImageCarousel open={carouselState} photos={photoUrl} current={activeImg} setCarouselState={setCarouselState} /></Grow>)
            }
        </div>
    );
};
