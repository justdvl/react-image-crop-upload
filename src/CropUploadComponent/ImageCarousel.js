import React, { useState, useEffect, useCallback } from 'react';
import {
    Backdrop,
    Slide,
    GridListTile,
    GridList,
    makeStyles,
    Box,
    IconButton,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ClearIcon from '@material-ui/icons/Clear';
import classnames from 'classnames';

const useStyles = makeStyles((theme) => ({
    imageList: {
        overflow: 'auto',
        width: 610,
        flexWrap: 'nowrap',
        margin: '20px 0',
    },
    imageItem: {
        height: 121,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 0.3,
        '&.acitve': {
            opacity: 1,
        },
    },
    leftRightButton: {
        height: 500,
        width: 100,
    },
}));

const TIMEOUT = 400;

const ImageCarousel = ({ open, photos, current, setCarouselState }) => {
    const [index, setIndex] = useState(0);
    const [index2, setIndex2] = useState(0);
    const [slide, setSlide] = useState(false);
    const [slideDirection, setSlideDirection] = useState('left');
    const classes = useStyles();

    //idx is position of photo to slide to. If unknown, it's -1
    const goToNext = (direction, idx = 0) => {
        let x;
        if (slide) {
            x = index;
        } else {
            x = index2;
        }

        if (idx > -1) {
            if (idx < x) {
                direction = 'left';
            } else if (idx > x) {
                direction = 'right';
            } else {
                return;
            }
        }

        const newIndex =
            idx > -1
                ? idx
                : direction === 'left'
                ? (x - 1 + photos.length) % photos.length
                : (x + 1 + photos.length) % photos.length;

        if (!slide) {
            setIndex(newIndex);
        } else {
            setIndex2(newIndex);
        }
        const slideNow = slide;

        if (!slide) {
            if (direction === 'left') {
                direction = 'right';
            } else {
                direction = 'left';
            }
        }
        setSlideDirection(direction);
        setSlide(!slideNow); //slide is state altering between 2 Slide components
    };

    const keydownFunction = useCallback(
        (event) => {
            if (event.keyCode === 27) {
                setCarouselState(false);
            } else if (event.keyCode === 37 || event.keyCode === 100) {
                goToNext('left', -1);
            } else if (event.keyCode === 39 || event.keyCode === 102) {
                goToNext('right', -1);
            }
        },
        [goToNext, setCarouselState]
    );

    useEffect(() => {
        document.addEventListener('keydown', keydownFunction, false);

        return () => {
            document.removeEventListener('keydown', keydownFunction, false);
        };
    }, [keydownFunction]);

    useEffect(() => {
        setIndex(current);
    }, [current]);

    useEffect(() => {
        setSlide(open);
    }, [open]);

    return (
        <Backdrop
            open={open}
            style={{ zIndex: 999, padding: 30 }}
            onClick={() => setCarouselState(false)}
        >
            <IconButton
                style={{ position: 'absolute', top: 20, right: 20 }}
                onClick={() => setCarouselState(false)}
            >
                <ClearIcon size={150} style={{ color: '#fff' }} />
            </IconButton>
            <Box display="flex" flexDirection="column" width="100%">
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    position="relative"
                    width="100%"
                >
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            goToNext('left', -1);
                        }}
                        className={classes.leftRightButton}
                    >
                        <ArrowBackIosIcon
                            size={100}
                            style={{ color: '#fff' }}
                        />
                    </IconButton>
                    <div
                        style={{
                            position: 'relative',
                            width: 500,
                            height: 500,
                        }}
                    >
                        <div style={{ position: 'absolute' }}>
                            <Slide
                                direction={
                                    slideDirection === 'left' ? 'right' : 'left'
                                }
                                in={!slide}
                                timeout={TIMEOUT}
                            >
                                <Box
                                    height={500}
                                    width={500}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    <img
                                        src={photos[index2]}
                                        alt={`image${index2}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>
                            </Slide>
                        </div>
                        <div style={{ position: 'absolute' }}>
                            <Slide
                                direction={slideDirection}
                                in={slide}
                                timeout={TIMEOUT}
                            >
                                <Box
                                    height={500}
                                    width={500}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    <img
                                        src={photos[index]}
                                        alt={`image${index}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>
                            </Slide>
                        </div>
                    </div>
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            goToNext('right', -1);
                        }}
                        className={classes.leftRightButton}
                    >
                        <ArrowForwardIosIcon
                            size={100}
                            style={{ color: '#fff' }}
                        />
                    </IconButton>
                </Box>
                <Box mt={5} position="absolute" bottom={10}>
                    <GridList
                        cellHeight={121}
                        className={classes.imageList}
                        cols={5}
                    >
                        {photos.map((tile, idx) => (
                            <GridListTile
                                classes={{ tile: classes.imageItem }}
                                key={idx}
                                cols={1}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const x = slide ? index2 : index;
                                    if (x === idx) {
                                        // return;
                                    }
                                    goToNext(false, idx);
                                }}
                            >
                                <img
                                    src={tile}
                                    alt="your logo"
                                    className={classnames(
                                        classes.image,
                                        idx === index && 'acitve'
                                    )}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </Box>
            </Box>
        </Backdrop>
    );
};

export default ImageCarousel;
