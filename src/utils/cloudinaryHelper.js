export default function extractPublicId(url) {
  const parts = url.split("/");
  const uploadIndex = parts.findIndex(part => part === "upload");
  const publicIdExt = parts.slice(uploadIndex + 2).join('/');

  return publicIdExt.substring(0, publicIdExt.lastIndexOf('.')) || publicIdExt;
}
