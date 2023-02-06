import React, { Fragment, useState, useEffect, useRef } from "react";
import Breadcrumb from "../../../layout/breadcrumb/index";
import { useForm, Controller } from "react-hook-form";
import Dropzone from "react-dropzone-uploader";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Form,
} from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import Slider from "react-slick";
import { URL, SIMPLE_URL } from "../../../env";
import { useTranslation, } from "react-i18next";
import "./GalleryImages.css";

const GalleryImages = (props) => {
  const { t } = useTranslation();
  const trans = t;
  const [gallery, setGallery] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    control,
    formState: { errors },
  } = useForm({ shouldFocusError: true });


  const handleGalleryImages = ({ meta, file }, status, allFiles) => {
    if (status == "error_file_size") {
      let files_size_error = allFiles.find(
        (item) => item.file.name == file.name
      );
      files_size_error.remove();
      let files_array = allFiles.filter((item) => item.file.name != file.name);
      setValue("images", files_array);
      setError(
        "images",
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
      setValue("images", allFiles);
      setError("images", {
        shouldFocus: false,
      });
    }
  };

  const onSubmit = (data) => {

    const formData = new FormData();
    const images_array = [];
    if (data.images != undefined && data.images.length > 0) {
      data.images.map((item) => {
        formData.append("images[]", item.file);
      });
    }
    axios({
      method: "post",
      url: `${URL}/all_images_gal`,
      data: formData,
    }).then((response) => {
      if (response.data.success === true) {
        setGallery(response.data.data);
        toast.success(trans("successfull"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(trans("failed"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  useEffect(() => {
    const getData = () => {
      axios
        .get(`${URL}/get_all_images_gal`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token123"),
          },
        })
        .then((res) => {
          setGallery(res.data.data);
        })
        .catch((error) => {
          console.log("erorr", error);
        });
    };
    getData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const slider = useRef(null);

  return (
    <Fragment>
      {/* <Breadcrumb parent="Form" title={trans("Gallery Images")} /> */}

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CardHeader>
                <h5>{trans("Gallery Images")}</h5>
              </CardHeader> */}
              <CardBody>
                <Form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-row">
                    <Col md="12 mb-3">
                      {/* <Label htmlFor="validationCustom02">
                        {trans("Image Gallery")}
                      </Label> */}
                      <Controller
                        control={control}
                        name="images"
                        rules={{ required: false }}
                        render={() => (
                          <Dropzone
                            multiple={true}
                            canCancel={true}
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
                          // onSubmit={handleGallerySubmit}
                          />
                        )}
                      />
                      <span className="text-danger">
                        {errors.galleryimages?.type == "required"
                          ? trans("field is required")
                          : errors.images && errors.images.message}
                      </span>
                      <div className="valid-feedback">
                        {trans("Looks good!")}
                      </div>
                    </Col>
                  </div>
                  <Button color="success">{trans("Save")}</Button>
                </Form>
                <Row style={{ justifyContent: "center", marginTop: 20 }}>
                  {/* <Col
                    sm={1}
                    md={1}
                    xs={1}
                    style={{
                        padding: 0,
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                        marginTop: "-2%",
                    }}
                >
                    <ArrowBack
                        style={{ marginTop: "15%", cursor: 'pointer' }}
                        onClick={() => slider.current.slickPrev()}
                    />
                </Col> */}
                  <Col sm={12} md={12} xs={12}>
                    <Slider
                      ref={slider}
                      {...settings}
                      className="gallery_images_cont"
                    >
                      {gallery.map((item, index) => (
                        <div className="pr-1 col-9">
                          <img
                            className="gallery_images"
                            src={`${SIMPLE_URL}/images/all_gallery_images/${item.image}`}
                            alt="gallery_img"
                          />
                        </div>
                      ))}
                    </Slider>
                  </Col>
                  {/* <Col
                    sm={1}
                    md={1}
                    xs={1}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "-2%",
                        padding: 0,
                    }}
                >
                    <ArrowForward
                        style={{ marginTop: "15%", cursor: 'pointer' }}
                        onClick={() => slider.current.slickNext()}
                    />
                </Col> */}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default GalleryImages;
