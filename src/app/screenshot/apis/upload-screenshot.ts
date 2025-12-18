import { DateTime } from 'luxon';

import { coreApi } from '@/infrastructure/net';

import { SCREENSHOT_ENDPOINTS } from './endpoints';

export type UploadScreenshotRequest = {
  image: Blob;
};

export type UploadScreenshotResponse = {
  imageUrl: string;
};

export const uploadScreenshot = async (
  data: UploadScreenshotRequest,
): Promise<UploadScreenshotResponse> => {
  const formData = new FormData();
  formData.append('file', data.image, `image-${DateTime.now().toISO()}.png`);

  const response = await coreApi.post(
    SCREENSHOT_ENDPOINTS.uploadScreenshot,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};
