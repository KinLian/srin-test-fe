import { Alert, Button, Col, Row, Typography } from "antd";
import { MainLayout } from "../../../components/layout";
import { useGet, useSend } from "../../../hooks";
import { urlPhone, urlSinglePhone } from "../../../const/apiUrl";
import { InputWithTitle } from "../../../components/content";
import { useMemo, useRef, useState } from "react";
import type { PhoneType } from "../../../types";
import { useNavigate, useParams } from "react-router";
const { Title } = Typography;

const inputTitles: string[] = [
  "Model",
  "Price",
  "Processor",
  "RAM",
  "Battery",
  "Display",
  "Camera",
  "Card",
  "OS",
];

function PhoneFormPage() {
  // External Hooks
  const { id = "" } = useParams();
  const navigate = useNavigate();

  // Component Hooks
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const isEditPage = !!id;

  // Custom Hooks
  const { data } = useGet<PhoneType>(urlSinglePhone(id));
  const {
    call: addPhone,
    isLoading: isLoadingAdd,
    isSuccess: isSuccessAdd,
    isFailed: isFailedAdd,
  } = useSend("POST");
  const {
    call: updatePhone,
    isLoading: isLoadingUpdate,
    isSuccess: isSuccessUpdate,
    isFailed: isFailedUpdate,
  } = useSend("PUT");

  //Functions
  function validate(phone: Omit<PhoneType, "id">) {
    const isInvalidForm = phone["model"] === "";
    setIsInvalid(isInvalidForm);
    return isInvalidForm;
  }

  function sendData() {
    if (formRef && formRef.current) {
      // Read Form
      const formData = new FormData(formRef.current);
      const json: { [key: string]: FormDataEntryValue } = {};

      for (const [key, val] of formData.entries()) {
        json[key] = val;
      }
      const isInvalidForm = validate(json);
      if (!isInvalidForm) {
        if (isEditPage) updatePhone(urlSinglePhone(id), json, { onSuccess });
        else addPhone(urlPhone, json, { onSuccess });
      }
    }
  }

  function onSuccess() {
    setTimeout(() => {
      navigate("/phone");
    }, 3000);
  }

  // Constant Vars
  const isLoading = isLoadingAdd || isLoadingUpdate;
  const isSuccess = isSuccessAdd || isSuccessUpdate;
  const isFailed = isFailedAdd || isFailedUpdate;
  const isDataAvailable = Boolean((isEditPage && data) || !isEditPage);

  // Components
  const status = useMemo(() => {
    if (isLoading) return <Alert type="info" message="Loading" />;
    else if (isSuccess) return <Alert type="success" message="Success" />;
    else if (isFailed) return <Alert type="error" message="Failed" />;
    else if (isInvalid)
      return <Alert type="error" message="Model should not be empty" />;
    else return <Alert type="info" message="Not yet to be send" />;
  }, [isLoading, isSuccess, isFailed, isInvalid]);

  return (
    <MainLayout gap="1rem" isLoading={!isDataAvailable}>
      {isDataAvailable && (
        <>
          <Title style={{ textAlign: "center" }}>
            {isEditPage ? "Edit" : "Add"} Phone
          </Title>
          {status}
          <form ref={formRef} >
            <Row gutter={[24, 24]}>
              {inputTitles.map((it: string, idx) => (
                <Col key={idx} span={12}>
                  <InputWithTitle
                    title={it}
                    type="text"
                    name={it.toLowerCase()}
                    defaultValue={data?.[it.toLowerCase() as keyof PhoneType]}
                  />
                </Col>
              ))}
            </Row>
            <Button
              size="large"
              variant="solid"
              color="blue"
              loading={isLoading}
              style={{ marginTop: "2rem", width: "100%" }}
              onClick={sendData}
            >
              Submit
            </Button>
          </form>
        </>
      )}
    </MainLayout>
  );
}

export default PhoneFormPage;
