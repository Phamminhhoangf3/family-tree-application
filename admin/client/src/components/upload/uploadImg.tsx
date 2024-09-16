import React, { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Image, Typography, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { UploadFileStatus } from "antd/es/upload/interface";
import { uploadImage } from "~/services/apis/upload";

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
    const formData = new FormData();
    newFileList.forEach((file) => {
      if (file?.originFileObj) {
        formData.append("image", file.originFileObj);
      }
    });
    handleUpload(formData);
  };

  const handleUpload = async (formData) => {
    try {
      setLoading(true);
      const res = await uploadImage(formData);
      if (res?.status === 200) {
        const imageUrl = res?.data?.imageUrl;
        if (imageUrl) {
          onUploaded(imageUrl);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
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
