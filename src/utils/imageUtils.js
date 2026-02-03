/**
 * Converts a Google Drive preview link to a direct view link.
 * @param {string} url - The Google Drive URL.
 * @returns {string} - The direct view URL or the original URL if not a Google Drive link.
 */
export const getGoogleDriveDirectLink = (url) => {
  if (!url) return '';
  
  // Regex to extract file ID from Google Drive URL
  const fileIdMatch = url.match(/\/d\/(.+?)\//);
  
  if (fileIdMatch && fileIdMatch[1]) {
    const fileId = fileIdMatch[1];
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;

  }
  
  return url;
};
