import React, { useState, useEffect, useCallback } from 'react';
import { Backdrop, Grow, Slide, GridListTile, GridList, makeStyles, Box, IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ClearIcon from '@material-ui/icons/Clear';
import classnames from 'classnames';

const useStyles = makeStyles((theme) => ({
  imageList: {
      overflow: 'auto',
      width: 610,
      flexWrap: 'nowrap',
      margin: '20px 0'
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
        opacity: 1
      }
  },
  leftButton: {
    position: 'absolute',
    left: 20,
    top: '50%'
  },
  rightButton: {
    position: 'absolute',
    right: 20,
    top: '50%'
  }
}));

const ImageCarousel = ({ open, photos, current, setCarouselState }) => {
  const [index, setIndex] = useState(0);
  const [slide, setSlide] = useState(false);
  const [slideDirection, setDirection] = useState('left')
  const classes = useStyles();

  const escFunction = useCallback((event) => {
    if(event.keyCode === 27) {
      setCarouselState(false)
    }
  }, [setCarouselState]);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  useEffect(() => {
    setIndex(current);
  }, [current]);

  useEffect(() => {
    setSlide(open);
  }, [open]);

  const goToLeft = () => {
    setSlide(false);

    setTimeout(() => {
      setIndex(index === 0 ? photos.length - 1 : (index - 1));
      setDirection('right');
      setSlide(true);
    }, 200);
  }

  const goToRight = () => {
    setSlide(false);

    setTimeout(() => {
      setIndex((index+1)%(photos.length));
      setDirection('left');
      setSlide(true);
    }, 200);
  }

  return (
    <Backdrop open={open} style={{ zIndex: 999, padding: 30 }}>
      <IconButton style={{ position: 'absolute', top: 20, right: 20 }} onClick={() => setCarouselState(false)}>
        <ClearIcon size={150} style={{ color: '#fff' }} />
      </IconButton>
      <Box display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <IconButton onClick={goToLeft} className={classes.leftButton}>
            <ArrowBackIosIcon size={100} style={{ color: '#fff' }} />
          </IconButton>
          <Slide direction={slideDirection} in={slide}>
            <Box height={500} width={500}>
              <img src={photos[index]} alt={`image${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
          </Slide>
          <IconButton onClick={goToRight} className={classes.rightButton}>
            <KeyboardArrowRightIcon size={100} style={{ color: '#fff' }} />
          </IconButton>
        </Box>
        <Box mt={5} position="absolute" bottom={10}>
          <GridList cellHeight={121} className={classes.imageList} cols={5}>
          {photos.map((tile, idx) => (
            <GridListTile classes={{ tile: classes.imageItem }} key={idx} cols={1} onClick={() => setIndex(idx)}>
              <img src={tile} alt="your logo" className={classnames(classes.image, idx === index && 'acitve' )}/>
            </GridListTile>))}
          </GridList>
        </Box>
      </Box>
    </Backdrop>
  )
};

export default ImageCarousel;
