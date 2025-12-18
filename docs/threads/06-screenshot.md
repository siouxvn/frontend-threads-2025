---
nav: Threads
order: 6
---

# Take high quality screenshots of videos

```jsx
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Button, Flex } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import { screenshotService } from 'ft2025/infrastructure/screenshot';
import { uploadScreenshot } from 'ft2025/app/screenshot';
import { setupApiMocks } from 'ft2025/mocks/api-mocks';

export default () => {
  const contentRef = useRef(null);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    setupApiMocks().then(() => alive && setReady(true));
    return () => {
      alive = false;
    };
  }, []);

  const takeScreenshot = useCallback(async () => {
    if (!contentRef.current || !ready) {
      console.debug("It's not ready to take the screenshot");
      return;
    }

    const canvas = await screenshotService.captureScreenshot(
      contentRef.current,
      {
        targetWidth: 3840,
      },
    );

    const blob = await screenshotService.convertToBlob(canvas);

    await uploadScreenshot({ image: blob });
  }, [ready]);

  return (
    <Flex vertical gap="middle" align="center">
      <Button
        type="primary"
        icon={<CameraOutlined />}
        onClick={() => takeScreenshot()}
      >
        {'Take a screenshot'}
      </Button>
      <div ref={contentRef}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/JlRs78QS-2w?si=ms-AKW2HBfOD1PKo"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </Flex>
  );
};
```
