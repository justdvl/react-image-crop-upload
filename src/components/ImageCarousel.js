import React, { useState, useEffect } from 'react';
import { Backdrop, Grow, GridListTile, GridList, makeStyles, Box, IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
  imageList: {
      overflow: 'auto',
      width: '90%',
      flexWrap: 'nowrap',
      margin: '20px 0'
  },
  imageItem: {
      height: 150,
      overflow: 'hidden',
  },
  image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
  }
}));

const ImageCarousel = ({ open, photos, current, setCarouselState }) => {
  const [index, setIndex] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    setIndex(current);
  }, [current]);

  return (
    <Backdrop open={open} style={{ zIndex: 999, padding: 30 }}>
      <IconButton style={{ position: 'absolute', top: 20, right: 20 }} onClick={() => setCarouselState(false)}>
        <ClearIcon size={150} style={{ color: '#fff' }} />
      </IconButton>
      <Box display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <IconButton onClick={() => setIndex(index === 0 ? photos.length - 1 : (index - 1) )}>
            <ArrowBackIosIcon size={100} style={{ color: '#fff' }} />
          </IconButton>
          <Grow in={true} style={{ transformOrigin: '0 0 0' }}>
            <Box maxHeight={500} maxWidth={500}>
              <img src={photos[index]} alt={`image${index}`} style={{ width: '100%', height: '100%' }} />
            </Box>
          </Grow>
          <IconButton onClick={() => setIndex((index+1)%(photos.length))}>
            <KeyboardArrowRightIcon size={100} style={{ color: '#fff' }} />
          </IconButton>
        </Box>
        <Box mt={5} position="absolute" bottom={10}>
          <GridList cellHeight={150} className={classes.imageList} cols={12}>
          {photos.map((tile, idx) => (
            <GridListTile classes={{ tile: classes.imageItem }} key={idx} cols={1} onClick={() => setIndex(idx)}>
              <img src={tile} alt="your logo" className={classes.image}/>
            </GridListTile>))}
          </GridList>
        </Box>
      </Box>
    </Backdrop>
  )
};

export default ImageCarousel;
