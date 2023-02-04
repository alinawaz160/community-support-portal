import React, { useEffect, useState } from "react";
import ProTable from "@ant-design/pro-table";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Button, IconButton } from "@mui/material";
import en_US from 'antd/locale/en_US';
import { ConfigProvider, Upload, message, Image } from 'antd';
import { ModalForm, ProFormSelect, ProFormText, ProFormTextArea } from "@ant-design/pro-form";
import { DeleteOutlineRounded, InboxOutlined } from "@mui/icons-material";
import axios from "axios";


function Project() {

  const [createModalVisible, handleModalVisible] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const { Dragger } = Upload;

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
    let image = ("img", JSON.stringify(imageFile));
    const hide = message.loading("Adding Project");
    try {
      const res = await fetch('/createProject', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          projectName: data.projectName,
          ngo: data.ngo,
          uploadDate: new Date(),
          description: data.description,
          isActive: data.isActive,
          image: image
        })
      })
      hide();
      if (res.status === 400 || !res) {
        message.error("Already exist ")
      } else {
        message.success("Registered Successfully");
      }
    } catch (error) {
      hide();
      message.error("Something went wrong");
      return false;
    }
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
      valueType: "avatar",
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
      render: (text, record, _, action) => [
        <Image
          width={100}
          src={`${record.image}`}
          fallback="data:image/png;base64,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"
        />
      ],
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
      render:(_,record)=>[
        <IconButton>
            <DeleteOutlineRounded/>
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
            async (params, sort, filter) =>{
              const res = await fetch('/getProjects',{
                method:"GET",
                headers:"application/json"
              })
              console.log(JSON.parse(res));
              return {
                data:[{...res}],
                success: res.ok,
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
          {/* <ProFormText
            rules={[
              {
                required: true,
                message: "Uplaod_Date ?",
              },
            ]}
            width="md"
            label="Uplaod_Date"
            name="date"
          /> */}
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