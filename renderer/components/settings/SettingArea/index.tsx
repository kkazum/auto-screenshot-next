import React, { useState, useContext } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { SettingListTable } from './SettingListTable';
import CircularProgress from '@mui/material/CircularProgress';
import { ImageInfo } from '../../../lib/types/ImageInfo';
import { ImageArea } from '../../shared/ImageArea';
import { DispatchContext } from '../../../lib/context';
import { SUCCESS_SAVE_SCREEN_SHOT_MESSAGE } from '../../../lib/messages';
import { actions } from '../../../lib/context/reducer';

export const SettingArea: React.VFC = () => {
  //撮影処理中かどうか
  const [isProcessing, setIsProcessing] = useState(false);
  //撮影された画像のデータ
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);
  const dispatch = useContext(DispatchContext);

  const downloadImages = (imageInfo: ImageInfo) => {
    new Promise((resolve) => {
      resolve(
        imageInfo.map(({ image, px, url }) => {
          const element = document.createElement('a');
          element.href = `data:image/png;base64,${image}`;
          element.download = `${px}-${url}.png`;
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        })
      );
    }).then(() => {
      dispatch(actions.showSnackbar(SUCCESS_SAVE_SCREEN_SHOT_MESSAGE));
    });
  };
  return (
    <Box>
      <Typography variant="h4" sx={{ py: 2 }}>
        スクリーンショット自動撮影
      </Typography>
      {isProcessing ? (
        <CircularProgress />
      ) : (
        <>
          {!!imageInfo?.length ? (
            <Box>
              <Button onClick={() => setImageInfo([])}>トップに戻る</Button>
              <Button onClick={() => downloadImages(imageInfo)}>保存する</Button>
              <ImageArea imageInfo={imageInfo} />
            </Box>
          ) : (
            <SettingListTable setIsProcessing={setIsProcessing} setImageInfo={setImageInfo} />
          )}
        </>
      )}
    </Box>
  );
};
