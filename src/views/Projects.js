import React, { useEffect, useState } from "react";
import ProTable from "@ant-design/pro-table";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Button, IconButton } from "@mui/material";
import en_US from 'antd/locale/en_US';
import { ConfigProvider, Upload, message, Image, Form } from 'antd';
import { ModalForm, ProFormSelect, ProFormText, ProFormTextArea } from "@ant-design/pro-form";
import { DeleteOutlineRounded, InboxOutlined } from "@mui/icons-material";
import axios from "axios";
import moment from "moment";

function Project() {

  const [createModalVisible, handleModalVisible] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const { Dragger } = Upload;
  const [form] = Form.useForm();

  const props = {
    name: "file",
    multiple: false,
    beforeUpload(file) {
      const isImage = file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg";
      if (!isImage) {
        message.error(`${file.name} is not a image`);
      }

      setImageFile(file);
      return false;
    },
    onChange(info) {
      //setfileList(info.fileList);
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleAdd = async (data, imageFile) => {
    console.log("Adding Project");
    const formData = new FormData();
    formData.append("projectName", data.projectName);
    formData.append("ngo", data.ngo);
    formData.append("uploadDate", new Date().toISOString());
    formData.append("description", data.description);
    formData.append("isActive", data.isActive);
    formData.append("image", imageFile);
    try {
      const res = await axios.post('/createProject', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res.status === 400 || !res) {
        message.error("Already exist ")
      } else {
        message.success("Registered Successfully");
      }
    } catch (error) {
      message.error("Something went wrong");
      return false;
    }
    form.resetFields();
    return true;
  };
  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      valueType: "text",
    },
    {
      title: "NGO",
      dataIndex: "ngo",
      valueType: "text",
    },
    {
      title: "Uploaded ON",
      dataIndex: "uploadDate",
      render:(text , record , _,action)=>moment(record.uploadDate).format('MMMM D, YYYY'),
    },
    {
      title: "Description",
      dataIndex: "description",
      valueType: "text",
    },
    {
      title: "Image",
      dataIndex: "image",
      valueType: "avatar",
      render: (text, record, _, action) => {
        console.log(text, record, action);
        return [
          <Image
            width={50}
            src={`${record.image}`}
          />
        ];
      },
    },
    {
      title: "isActive",
      dataIndex: "isActive",
      hideInForm: true,
      valueEnum: {
        true: {
          text: "acitve",
          status: "Success",
        },
        false: {
          text: "inActive",
          status: "Error",
        },
      },
    },
    {
      title: "Options",
      dataIndex: "option",
      valueType: "option",
      render: (_, record) => [
        <IconButton>
          <DeleteOutlineRounded />
        </IconButton>
      ],
    },
  ]

  return (

    <div>
      <ConfigProvider locale={en_US}>
        <ProTable
          style={{ margin: "4rem" }}
          headerTitle={"Projects"}
          rowKey="id"
          search={{
            labelWidth: 120,
          }}
          request={
            async (params, sort, filter) => {
              try {
                const response = await fetch('/getProjects', {
                  method: "GET",
                  headers: { "Content-Type": "application/json" }
                })
                const json = await response.json();
                console.log(json);
                return {
                  data: json,
                  success: response.status === 200
                };
              } catch (error) {
                console.error(error);
                return {
                  data: [],
                  success: false
                };
              }
            }
          }
          // search={false}
          toolBarRender={() => {
            return [
              <Button
                style={{ background: "skyblue" }}
                type="primary"
                key="primary"
                onClick={() => {
                  handleModalVisible(true);
                }}
              >
                <AddOutlinedIcon /> New
              </Button>,
            ]
          }
          }
          columns={columns}
        />
        <ModalForm
          title={"Add Project"}
          width={"400px"}
          visible={createModalVisible}
          onVisibleChange={handleModalVisible}
          onFinish={async (values) => {
            let success = await handleAdd(values, imageFile);
            if (success) {
              handleModalVisible(false);
            }
          }}
          form={form}
        >
          <ProFormText
            rules={[
              {
                required: true,
                message: "Project Name ?",
              },
            ]}
            width="md"
            label="Project Name"
            name="projectName"
          />
          <ProFormText
            rules={[
              {
                required: true,
                message: "NGO ?",
              },
            ]}
            width="md"
            label="NGO"
            name="ngo"
          />
          <ProFormText
            rules={[
              {
                required: true,
                message: "Description ?",
              },
            ]}
            width="md"
            label="Description"
            name="description"
          />
          <ProFormSelect
            name="isActive"
            label="Active"
            options={["Yes", "No"]}
            placeholder="Select a Status"
            rules={[{ required: true, message: "Please select Active Status!" }]}
          />
          <Dragger accept="image/*" {...props} multiple={false}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag image to upload</p>
          </Dragger>
        </ModalForm>
      </ConfigProvider>
    </div>
  );
}

export default Project;