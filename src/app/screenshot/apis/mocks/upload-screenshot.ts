import { http, HttpResponse } from 'msw';

import { coreApi } from '@/infrastructure/net';
import { FileVerificationHelper } from '@/mocks/file-verification-helper';

import { SCREENSHOT_ENDPOINTS } from '../endpoints';
import { UploadScreenshotResponse } from '../upload-screenshot';

export const uploadScreenshotHandler = http.post(
  coreApi.defaults.baseURL + SCREENSHOT_ENDPOINTS.uploadScreenshot,
  async ({ request }) => {
    const formData = await request.formData();
    const image = formData.get('file') as File;

    // Validate required fields
    if (!image) {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'Missing required fields',
      });
    }

    // Validate file type
    if (!image.type.startsWith('image/')) {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'Invalid file type',
      });
    }

    try {
      // Verify blob is received correctly
      const arrayBuffer = await image.arrayBuffer();
      const processedBlob = new Blob([arrayBuffer], { type: image.type });
      const fileName = `mock-verify-${image.name}`;

      // Log detailed verification info
      FileVerificationHelper.logBlobInfo(image, processedBlob);

      // Download to browser's Downloads folder for immediate verification
      FileVerificationHelper.downloadBlobForVerification(
        processedBlob,
        fileName,
      );

      console.debug(
        'Screenshot verification complete - check Downloads folder',
      );
      console.debug('File saved as: ' + fileName);

      // Return mock response
      const response: UploadScreenshotResponse = {
        imageUrl: `/Downloads/${fileName}`,
      };

      return HttpResponse.json(response, { status: 200 });
    } catch (error) {
      console.error('Failed to process screenshot:', error);

      return new HttpResponse(null, {
        status: 500,
        statusText: 'Failed to save file',
      });
    }
  },
);
