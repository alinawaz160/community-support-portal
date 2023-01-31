import React, { useState } from "react";
import ProTable from "@ant-design/pro-table";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Button, Dialog, DialogContent, InputAdornment, TextField } from "@mui/material";
import en_US from 'antd/locale/en_US';
import { ConfigProvider, Upload } from 'antd';
import { Formik, Form } from "formik";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { ModalForm, ProFormSelect, ProFormText } from "@ant-design/pro-form";
import { InboxOutlined } from "@mui/icons-material";


function Project() {
  
  const [createModalVisible , handleModalVisible] = useState(false);
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
            console.log("onFinish")
            console.log("values")
            console.log(values)
            console.log("formData")
            let success = true;
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
            name="name"
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
                message: "Uplaod_Date ?",
              },
            ]}
            width="md"
            label="Uplaod_Date"
            name="date"
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
          {/* <Upload accept="image/*" multiple={false}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag image to upload</p>
              <p className="ant-upload-hint">lender logo.</p>
            </Upload> */}
          {/*<ProFormTextArea width="md" name="desc" />*/}
        </ModalForm>
      </ConfigProvider>
    </div>
  );
}

export default Project;