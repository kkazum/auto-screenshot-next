import { useInteractJS } from '../../lib/hooks/useInteractJS';
import { Box, Typography } from '@mui/material';
import { ImageInfo } from '../../lib/types/ImageInfo';

type ImageAreaProps = {
  imageInfo: ImageInfo;
};

type DraggableImageProps = ImageAreaProps['imageInfo'][number] & { left: number };

export const ImageArea: React.VFC<ImageAreaProps> = ({ imageInfo }) => {
  return (
    <Box position={'relative'}>
      {imageInfo.map((info, i) => (
        <DraggableImage key={i} {...info} left={i * 320} />
      ))}
    </Box>
  );
};

const DraggableImage: React.VFC<DraggableImageProps> = ({ image, px, left }) => {
  const { ref, style } = useInteractJS({ height: 'auto' });
  return (
    <Box
      ref={ref}
      style={{
        ...style,
        left,
      }}
    >
      <Typography>{px}px</Typography>
      <img
        src={`data:image/png;base64,${image}`}
        style={{
          maxWidth: '100%',
          height: 'auto',
          width: 'auto',
        }}
      />
    </Box>
  );
};
