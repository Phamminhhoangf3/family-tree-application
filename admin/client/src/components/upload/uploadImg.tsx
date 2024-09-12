import React, { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Image, Typography, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { storage } from "~/FirebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { UploadFileStatus } from "antd/es/upload/interface";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

type UploadImageProps = {
  label: string;
  disabled?: boolean;
  onUploaded?: any;
  value: string | null;
  onRemove: any;
};

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadImage: React.FC<UploadImageProps> = ({
  label,
  disabled = false,
  onUploaded,
  onRemove,
  value,
}) => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (value) {
      setFileList([
        {
          uid: "1",
          name: "avatar",
          status: "done" as UploadFileStatus,
          url: value,
        },
      ]);
    }
  }, [value]);

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    newFileList.forEach((file) => {
      if (file.originFileObj) {
        handleUpload(file.originFileObj as FileType);
      }
    });
  };

  const handleUpload = (file: FileType) => {
    setLoading(true);
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      () => {},
      (error) => {
        console.error(error);
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setLoading(false);
          onUploaded(downloadURL);
          setFileList([
            {
              uid: file.uid,
              name: file.name,
              status: "done",
              url: downloadURL,
            },
          ]);
        });
      }
    );
  };

  const uploadButton = (
    <button
      disabled={loading}
      style={{ border: 0, background: "none" }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </button>
  );

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleRemove = () => {
    setFileList([]);
    onRemove();
  };

  return (
    <>
      <Typography.Text>{label}</Typography.Text>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={handleChange}
        beforeUpload={() => false}
        disabled={disabled || loading}
        maxCount={1}
        onPreview={handlePreview}
        onRemove={handleRemove}
      >
        {fileList.length >= 2 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default UploadImage;
