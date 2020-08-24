import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, GridList, GridListTile,
    IconButton, Paper, Typography
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import classnames from 'classnames';
import * as React from 'react';
import LightBox from 'react-awesome-lightbox';
import "react-awesome-lightbox/build/style.css";
import CropUploadComponent from './CropUploadComponent';



// interface ImgMasterProps {
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
            width: 610,
        },
        imageItem: {
            height: 121,
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            cursor: 'pointer',
        },
        tilebar: {
            background: '#00000000',
        },
        imageTile: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.3,
            '&.acitve': {
                opacity: 1,
            },
        },
    })
);

export const ImgMaster = ({
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
    };

    const keydownFunction = React.useCallback(
        (event) => {
            console.log(photoUrl.length);

            if (event.keyCode === 37 || event.keyCode === 100) {
                console.log('activeImg', activeImg, photoUrl.length);
                const newIndex = activeImg === 0 ? photoUrl.length - 1 : activeImg - 1;
                console.log('index', newIndex);
                setActive(newIndex);
            } else if (event.keyCode === 39 || event.keyCode === 102) {
                console.log('activeImg', activeImg, activeImg === (photoUrl.length - 1));
                const newIndex = activeImg === (photoUrl.length - 1) ? 0 : activeImg + 1;
                console.log('index', newIndex);
                setActive(newIndex);
            }
        },
        [activeImg, setActive, photoUrl]
    );

    React.useEffect(() => {
        document.addEventListener('keydown', keydownFunction, false);

        return () => {
            document.removeEventListener('keydown', keydownFunction, false);
        };
    }, [keydownFunction]);

    const deleteImage = (idx) => {
        if (window.confirm('Really delete?')) {
            const imageList = [...photoUrl];
            imageList.splice(idx, 1);
            setPhotoUrl(imageList);
        }
    };
    console.log(photoUrl.length);
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
                        <GridList
                            cellHeight={121}
                            className={classes.imageList}
                            cols={5}
                        >
                            {photoUrl.map((tile, idx) => (
                                <GridListTile
                                    classes={{ tile: classes.imageItem }}
                                    key={idx}
                                    cols={1}
                                    rows={1}
                                >
                                    <img
                                        src={tile}
                                        alt="your logo"
                                        className={classes.image}
                                        onClick={() => openCarousel(idx)}
                                    />

                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: -7,
                                            right: -7,
                                        }}
                                    >
                                        <IconButton
                                            className={classes.icon}
                                            onClick={() => deleteImage(idx)}
                                            style={{ color: 'red' }}
                                        >
                                            <CancelIcon size={50} />
                                        </IconButton>{' '}
                                    </div>
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
                carouselState && <>
                    <LightBox
                        startIndex={activeImg}
                        onClose={() => setCarouselState(!carouselState)}
                        images={photoUrl.map((url, index) => ({ url, title: `image${index}` }))}
                    />
                    <Box mt={5} position="absolute" bottom={10} style={{ zIndex: 9999999 }}>
                        <GridList
                            cellHeight={121}
                            className={classes.imageList}
                            cols={5}
                        >
                            {photoUrl.map((tile, idx) => (
                                <GridListTile
                                    classes={{ tile: classes.imageItem }}
                                    key={idx}
                                    cols={1}
                                    onClick={() => {
                                        console.log('id', idx);
                                        setActive(idx);
                                        setCarouselState(false);
                                        setTimeout(() => {
                                            setCarouselState(true);
                                        }, 100);
                                    }}
                                >
                                    <img
                                        src={tile}
                                        alt="your logo"
                                        className={classnames(
                                            classes.imageTile,
                                            idx === activeImg && 'acitve'
                                        )}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </Box>
                </>}
        </div>
    );
};
