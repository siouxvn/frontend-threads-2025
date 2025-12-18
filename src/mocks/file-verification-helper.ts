/**
 * Helper utilities for verifying file uploads in browser environment
 */

export class FileVerificationHelper {
  /**
   * Save blob to browser's Downloads folder for manual verification
   */
  static downloadBlobForVerification(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Log detailed blob information for debugging
   */
  static logBlobInfo(file: File, processedBlob?: Blob): void {
    const info = {
      name: file.name,
      originalSize: file.size,
      processedSize: processedBlob?.size || 0,
      type: file.type,
      sizeMatch: processedBlob ? file.size === processedBlob.size : false,
      timestamp: new Date().toISOString(),
    };

    console.debug('Blob upload verification:', info);
  }
}
