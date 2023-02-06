/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import { Col, Button, Form, Label } from "reactstrap";
import Dropzone from "react-dropzone-uploader";
import { toast } from "react-toastify";
import { URL, SIMPLE_URL } from "../../../env";
import { useTranslation, } from "react-i18next";
import SweetAlert from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  GalleryImagesGetDataAction,
  GalleryImages_SubmitLoading,
  GalleryImagesSaveDataAction,
  Delete_GalleryImagesDataAction,
} from "../../../redux/SettingsPanel/PurchaseModule/GalleryImages/actions"
import { Spinner } from "react-bootstrap";

const GalleryImages = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const dispatch = useDispatch();

  const ImageGallery = useSelector((state) => state.getGalleryImages)
  const [AllFiles, setAllFiles] = useState(null);

  // const [ImageGallery, setImageGallery] = useState([]);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
    control,
    reset,
  } = useForm({ shouldFocusError: true });

  useEffect(() => {
    if (ImageGallery.galleryImages == null) {
      dispatch(GalleryImagesGetDataAction())
    }
  }, []);

  useEffect(() => {
    if (ImageGallery && ImageGallery.galleryImagesLength != ImageGallery.tempArrLength) {
      dispatch(GalleryImagesGetDataAction())
    }
  }, [ImageGallery]);

  const deleteGalleryImage = (id, product_id) => {
    SweetAlert.fire({
      title: trans("Are you sure?"),
      text: trans("Once deleted, you will not be able to recover it!"),
      icon: "error",
      showCancelButton: true,
      cancelButtonText: trans("Cancel"),
      confirmButtonText: trans("Delete"),
      reverseButtons: true,
    }).then(async (result) => {
      if (result.value) {
        dispatch(Delete_GalleryImagesDataAction(id, trans))
      }
    });
  };

  const handleGalleryImages = ({ meta, file }, status, allFiles) => {
    if (status == "error_file_size") {
      let files_size_error = allFiles.find(
        (item) => item.file.name == file.name
      );
      files_size_error.remove();
      let files_array = allFiles.filter((item) => item.file.name != file.name);
      setValue("imagegallery", files_array);
      setError(
        "imagegallery",
        {
          type: "string",
          message: trans("Maximum file size is 2 MB for each file."),
        },
        {
          shouldFocus: true,
        }
      );
    }
    if (status == "done") {
      setValue("imagegallery", allFiles);
      setAllFiles(allFiles);
      setError("imagegallery", {
        shouldFocus: false,
      });
    }
  };

  const onSubmit = (data) => {
    const form_data = new FormData();
    if (data.imagegallery != undefined && data.imagegallery.length > 0) {
      data.imagegallery.map((item) => {
        form_data.append("imagegallery[]", item.file);
      });
    }
    dispatch(GalleryImages_SubmitLoading())
    dispatch(GalleryImagesSaveDataAction(form_data, AllFiles, trans))
  };

  return (
    <Fragment>
      <Form
        className="needs-validation"
        noValidate=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-row">
          <Col md="12 mb-3">
            <Label htmlFor="validationCustom02">{trans("Image Gallery")}</Label>
            <Dropzone
              maxFiles={8}
              multiple={true}
              canCancel={false}
              minSizeBytes={0}
              maxSizeBytes={2000000}
              accept="image/*"
              inputContent={trans("Drop Gallery Images")}
              styles={{
                dropzone: { height: 300 },
                dropzoneActive: { borderColor: "green" },
              }}
              getUploadParams={({ meta }) => {
                return { url: "https://httpbin.org/post" };
              }}
              onChangeStatus={handleGalleryImages}
              {...register("imagegallery")}
            />
            <span className="text-danger">{errors.imagegallery && errors.imagegallery.message}</span>
          </Col>
        </div>
        <Button color="success" disabled={ImageGallery.submitLoading == true} style={{ position: 'relative', overflow: 'hidden', minWidth: 140 }}>
          {
            ImageGallery.submitLoading === true && (
              <span style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'FFFFFF50', }}>
                <Spinner
                  animation="border"
                  variant="dark"
                  style={{
                    height: 20, width: 20
                  }}
                />
              </span>
            )
          }
          {trans("Save")}
        </Button>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            paddingTop: 10,
          }}
        >
          {ImageGallery && ImageGallery.galleryImages &&
            ImageGallery.galleryImages.length > 0 &&
            ImageGallery.galleryImages.map((gallery, i) => {
              return (
                <div>
                  <div
                    className="mx-1"
                    style={{
                      position: "relative",
                      padding: 10,
                      border: "1px solid lightgray",

                      height: "12pc",
                    }}
                  >
                    <img
                      src={
                        SIMPLE_URL + `/images/CSVGalleryImages/${gallery.image}`
                      }
                      width={100}
                      alt={gallery.image}
                      style={{
                        marginTop: 20,
                        height: "-webkit-fill-available",
                      }}
                    />
                    <span
                      className="fa fa-trash"
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        background: "white",
                        color: "red",
                        cursor: "pointer",
                        fontSize: 16,
                      }}
                      onClick={() =>
                        deleteGalleryImage(gallery.id, gallery.product_id)
                      }
                    ></span>
                    <span
                      className="fa fa-file-text-o"
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 30,
                        background: "white",
                        color: "green",
                        cursor: "pointer",
                        fontSize: 16,
                      }}
                      onClick={(event) => {
                        var text = gallery.image;
                        navigator.clipboard.writeText(text).then((_) => {
                          toast.success(trans("Image name copied"), 5000);
                        });
                      }}
                    ></span>
                  </div>
                </div>
              );
            })}
        </div>
      </Form>
    </Fragment>
  );
};

export default GalleryImages;
