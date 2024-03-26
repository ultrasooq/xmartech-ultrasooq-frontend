const ImageFormat = {
  imageCheck(str) {
    if (
      str === "png" ||
      str === "jpg" ||
      str === "jpeg" ||
      str === "PNG" ||
      str === "JPG" ||
      str === "JPEG"
    ) {
      return true;
    } else {
      return false;
    }
  },
  fileUploadExtentionCheck(str) {
    if (
      str === "png" ||
      str === "jpg" ||
      str === "jpeg" ||
      str === "pdf" ||
      str === "PNG" ||
      str === "JPG" ||
      str === "JPEG" ||
      str === "PDF"
    ) {
      return true;
    } else {
      return false;
    }
  },
  fileUploadSize(fileSize) {
    //10 MB
    if (
      fileSize === "" ||
      fileSize === null ||
      fileSize === undefined ||
      fileSize > 10485760
    ) {
      return false;
    } else {
      return true;
    }
  },
  fileUploadSizeForProfilePhoto(fileSize) {
    //10 MB
    //4MB--> 4194304
    if (
      fileSize === "" ||
      fileSize === null ||
      fileSize === undefined ||
      fileSize > 10485760
    ) {
      return false;
    } else {
      return true;
    }
  },
  fileForRoster(str) {
    //For Roster
    if (
      str === "xls" ||
      str === "xlsx" ||
      str === "csv" ||
      str === "XLS" ||
      str === "XLSX" ||
      str === "CSV"
    ) {
      return true;
    } else {
      return false;
    }
  },
  fileUploadSizeForRoster(fileSize) {
    //10MB //For Roster
    if (
      fileSize === "" ||
      fileSize === null ||
      fileSize === undefined ||
      fileSize > 10485760
    ) {
      return false;
    } else {
      return true;
    }
  },
};
export default ImageFormat;
