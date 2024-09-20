import React, { useEffect, useState } from "react";
import TableComponent from "../Component/TableComponent";
import DropdownMenu from "../Component/DropdownMenu";
import SlidingModal from "../Component/SlidingModal";
import Curd from "./Component/Curd";
import { doGetLetter, doGetTemplate } from "../../../../api/apiAxios";
import { IconButton, TableCell } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import useCustomLoader from "@/hooks/useLoader";
import Loader from "../../../../../public/assets/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setLetterData, setLetterHtml } from "../../Redux/Latter";
import ShareModal from "./Component/ShareModal";
const Generate = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [isLoading, setLoader] = useCustomLoader(false);
  const [templateData, setTemplateData] = useState<any>([]);
  const [data, setData] = useState<any>(null);
  const { letterData } = useSelector((state: any) => state.letter);
   const [modalOpen, setModalOpen] = useState(false);
  // const [letterData, setLetterData] = useState<any>([]);
  const handleClick = (event: React.MouseEvent<HTMLElement>, row: any) => {
    setData({ ...data, id: row?.id });
    setAnchorEl(event.currentTarget);
    dispatch(setLetterHtml(row?.description));
  };
  const dispatch = useDispatch();
 
  useEffect(() => {
    const getData = async () => {
      setLoader(true);
      const res: any = await doGetLetter();
      if (res.status) {
        const _data = res?.data?.data?.filter?.((item: any) => {
          return item?.status !== 0;
        });
        dispatch(setLetterData(_data));
        setLoader(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      setLoader(true);
      const res: any = await doGetTemplate();
      if (res.status) {
        const _data = res?.data?.data?.filter?.((item: any) => {
          return item?.status !== 0;
        });
        setTemplateData(_data);
        setLoader(false);
      }
    };
    getData();
  }, []);
  const headers = [
    {
      dataIndex: "faculity_name",
      label: "Employee",
      render: (data: any) => {
        return (
          <>
            <span>{data?.faculity_name}</span>
          </>
        );
      },
    },
    {
      dataIndex: "templateID",
      label: "Letter Type",
      render: (data: any) => {
        const _data = templateData.filter((item: any) => {
          return item?.id === data?.templateID;
        });
        return (
          <>
            <span>{_data?.[0]?.title}</span>
          </>
        );
      },
    },
    {
      dataIndex: "created_at",
      label: "Created",
      render: (data: any) => {
        return (
          <>
            <span>
              {new Date(data?.created_at).toLocaleString("en-us", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </>
        );
      },
    },
    {
      dataIndex: "Action",
      label: "Action",
    },
  ];

  return (
    <>
      {!isLoading ? (
        <TableComponent
          headers={headers}
          data={letterData}
          modalOnPress={() => {
            setOpen(true);
            setData(null);
          }}
          menuOnPress={handleClick}
          open={open}
          buttonText="Add New"
        />
      ) : (
        <Loader />
      )}
      <SlidingModal
        open={open}
        onClose={handleClose}
        children={
          <>
            <Curd
              onClose={handleClose}
              data={data}
              handleOpenModal={() => {
                setModalOpen(true);
              }}
            />
          </>
        }
      />
      <DropdownMenu
        setAnchorEl={setAnchorEl}
        anchorEl={anchorEl}
        template={false}
        openModal={(value) => {
          setData({ ...data, pageName: value });
          setOpen(true);
        }}
        data={data}
      />
      <ShareModal
        isOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        data={data}
      />
    </>
  );
};

export default Generate;
