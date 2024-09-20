import React, { useEffect, useState } from "react";
import TableComponent from "../Component/TableComponent";
import DropdownMenu from "../Component/DropdownMenu";
import SlidingModal from "../Component/SlidingModal";
import Curd from "./Component/Curd";
import { doGetTemplate } from "../../../../api/apiAxios";
import { MoreVert } from "@mui/icons-material";
import Loader from "../../../../../public/assets/Loader";
import useCustomLoader from "@/hooks/useLoader";
import { useDispatch, useSelector } from "react-redux";
import { setTemplateData } from "../../Redux/Latter";
import { IconButton } from "@mui/material";
const LetterTemplate = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isLoading, setLoader] = useCustomLoader(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState<any>(null);
  const { templateData } = useSelector((state: any) => state.letter);
  // const [templateData, setTemplateData] = useState<any>([]);
  const handleClick = (event: React.MouseEvent<HTMLElement>, row: any) => {
    setData({ ...data, id: row?.id });
    setAnchorEl(event.currentTarget);
    console.log(row);
  };
  const headers = [
    { dataIndex: "title", label: "Title" },
    {
      dataIndex: "Action",
      label: "Action",
      // className:"relative",
      // render: (data: any) => {
      //   return (
      //     <IconButton
      //       aria-label="more"
      //       aria-controls={open ? "long-menu" : undefined}
      //       aria-haspopup="true"
      //       onClick={(e) => handleClick(e, data?.id)}
           
      //     >
      //       <MoreVert />
      //     </IconButton>
      //   );
      // },
    },
  ];
  useEffect(() => {
    const getData = async () => {
      setLoader(true);
      const res: any = await doGetTemplate();
      if (res.status) {
        const _data = res?.data?.data?.filter?.((item: any) => {
          return item?.status !== 0;
        });
        dispatch(setTemplateData(_data));

        setLoader(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      {!isLoading ? (
        <TableComponent
          headers={headers}
          data={templateData}
          modalOnPress={() => {
            setOpen(true);
            setData(null);
          }}
          menuOnPress={handleClick}
          open={open}
          buttonText="Add Template"
        />
      ) : (
        <Loader />
      )}

      <SlidingModal
        open={open}
        onClose={handleClose}
        children={<Curd onClose={handleClose} data={data} />}
      />
      <DropdownMenu
        setAnchorEl={setAnchorEl}
        anchorEl={anchorEl}
        template
        openModal={(value) => {
          setData({ ...data, pageName: value });
          setOpen(true);
        }}
        data={data}
      />
    </>
  );
};

export default LetterTemplate;
